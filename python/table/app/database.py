from sqlalchemy import create_engine, event, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from .context.tenant import get_current_tenant_id
from fastapi import HTTPException
from contextlib import contextmanager

SQLALCHEMY_DATABASE_URL = "postgresql://postgres:asdf0010@saas.cluster-cmqieknflqka.ap-northeast-2.rds.amazonaws.com/multitenantdb"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_size=20,
    max_overflow=30,
    pool_timeout=30,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def add_tenant_filter(session: Session) -> None:
    """Add tenant filter to all queries"""
    tenant_id = get_current_tenant_id()
    if not tenant_id:
        raise HTTPException(
            status_code=500,
            detail="Tenant context not set"
        )

    @event.listens_for(session, 'do_orm_execute')
    def do_orm_execute(execute_state):
        if not execute_state.is_select:
            return
            
        if not execute_state.statement.column_descriptions:
            return
            
        model = execute_state.statement.column_descriptions[0]['type']
        if hasattr(model, 'tenant_id'):
            execute_state.statement = execute_state.statement.where(
                model.tenant_id == tenant_id
            )

@contextmanager
def tenant_session():
    """테넌트 컨텍스트를 관리하는 세션 제공"""
    session = SessionLocal()
    try:
        # 테넌트 필터 이벤트 리스너 추가
        add_tenant_filter(session)
        yield session
    finally:
        # 정리 작업
        if hasattr(session, '_sa_event_listeners'):
            for event_name, listeners in session._sa_event_listeners.items():
                for listener in listeners:
                    event.remove(session, event_name, listener)
        session.close()

def get_db():
    """FastAPI 의존성 주입을 위한 데이터베이스 세션 제공"""
    with tenant_session() as session:
        yield session