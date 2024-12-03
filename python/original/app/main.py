from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.api import api_router
from .database import engine, Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="E-Commerce API",
    description="FastAPI E-Commerce Application",
    version="1.0.0"
)

# CORS 미들웨어 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")