from sqlalchemy import create_engine, event, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from .context.tenant import get_current_tenant_id
from fastapi import HTTPException
from contextlib import contextmanager

SQLALCHEMY_DATABASE_URL = "postgresql://<Replace with your PostgreSQL database credentials>@<Replace with your PostgreSQL database endpoint>"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_size=20,
    max_overflow=30,
    pool_timeout=30,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def set_tenant_schema(connection) -> None:
    """커넥션의 스키마를 현재 테넌트에 맞게 설정"""
    tenant_id = get_current_tenant_id()
    if not tenant_id:
        raise HTTPException(
            status_code=500,
            detail="Tenant context not set"
        )
    
    schema_name = tenant_id
    connection.execute(text(f"SET search_path TO {schema_name}, public"))

@contextmanager
def tenant_session():
    """테넌트 컨텍스트를 관리하는 세션 제공"""
    session = SessionLocal()
    try:
        # 초기 연결 시 스키마 설정
        connection = session.connection()
        set_tenant_schema(connection)
        
        # 트랜잭션 이벤트 리스너 추가
        @event.listens_for(session, 'after_transaction_create')
        def after_transaction_create(session, transaction):
            if transaction.parent is None:  # 최상위 트랜잭션만
                set_tenant_schema(session.connection())
                
        yield session
        
    finally:
        # 이벤트 리스너 제거
        event.remove(session, 'after_transaction_create', after_transaction_create)
        session.close()

def get_db():
    """FastAPI 의존성 주입을 위한 데이터베이스 세션 제공"""
    with tenant_session() as session:
        yield session
