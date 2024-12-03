from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.api import api_router
from .database import engine, Base
from .middleware.tenant import TenantMiddleware


app = FastAPI(
    title="Multi-tenant E-Commerce API Shared schema",
    description="FastAPI Multi-tenant E-Commerce Application",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add tenant middleware


app.include_router(api_router, prefix="/api")