from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from ..database import SessionLocal
from ..models.facility import Facility

class ModeGuardMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Allow setup and health endpoints always
        if "/setup" in request.url.path or "/health" in request.url.path or "/auth" in request.url.path:
            return await call_next(request)

        db = SessionLocal()
        facility = db.query(Facility).first()
        db.close()

        if not facility:
            return await call_next(request) # Should probably redirect to setup or allow setup

        mode = facility.mode.value
        path = request.url.path

        # Block inpatient/theatre for non-hospital modes
        if ("/inpatient" in path or "/theatre" in path) and mode != "HOSPITAL":
            raise HTTPException(status_code=403, detail=f"Module not available in {mode} mode")

        # Block dental for non-dental modes
        if "/dental" in path and mode != "DENTAL":
            raise HTTPException(status_code=403, detail=f"Module not available in {mode} mode")

        # Pharmacy only mode blocks many things
        if mode == "PHARMACY":
            allowed_paths = ["/pharmacy", "/inventory", "/billing", "/patients", "/reports", "/nhis", "/staff"]
            is_allowed = any(p in path for p in allowed_paths)
            if not is_allowed and path != "/api/v1/": # Base path check
                 raise HTTPException(status_code=403, detail="Module not available in PHARMACY mode")

        return await call_next(request)
