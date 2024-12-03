from fastapi import Request, HTTPException
from ..context.tenant import set_current_tenant


class TenantMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        tenant_id = request.headers.get("x-tenant-id")
        if not tenant_id:
            raise HTTPException(status_code=400, detail="x-tenant-id header is required")
        
        set_current_tenant_id(tenant_id)
        response = await call_next(request)
        return response