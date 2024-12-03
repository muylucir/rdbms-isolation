from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.api import api_router
from .database import engine, Base
from .middleware.tenant import TenantMiddleware


app = FastAPI(
    title="Multi-tenant E-Commerce API Schema per Tenant",
    description="FastAPI E-Commerce Application with Multi-tenancy",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*", "x-tenant-id"],  # x-tenant-id 헤더 허용
)

app.add_middleware(TenantMiddleware)

app.include_router(api_router, prefix="/api")