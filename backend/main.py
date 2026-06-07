from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .routers import setup, auth, patients, staff, appointments, consultations, laboratory, pharmacy, dental, hospital, billing, reports
from .middleware.mode_guard import ModeGuardMiddleware

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(ModeGuardMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok", "project": settings.PROJECT_NAME}

# Routers
app.include_router(setup.router, prefix=settings.API_V1_STR + "/setup", tags=["setup"])
app.include_router(auth.router, prefix=settings.API_V1_STR + "/auth", tags=["auth"])
app.include_router(staff.router, prefix=settings.API_V1_STR + "/staff", tags=["staff"])
app.include_router(patients.router, prefix=settings.API_V1_STR + "/patients", tags=["patients"])
app.include_router(appointments.router, prefix=settings.API_V1_STR + "/appointments", tags=["appointments"])
app.include_router(consultations.router, prefix=settings.API_V1_STR + "/consultations", tags=["consultations"])
app.include_router(laboratory.router, prefix=settings.API_V1_STR + "/laboratory", tags=["laboratory"])
app.include_router(pharmacy.router, prefix=settings.API_V1_STR + "/pharmacy", tags=["pharmacy"])
app.include_router(dental.router, prefix=settings.API_V1_STR + "/dental", tags=["dental"])
app.include_router(hospital.router, prefix=settings.API_V1_STR + "/hospital", tags=["hospital"])
app.include_router(billing.router, prefix=settings.API_V1_STR + "/billing", tags=["billing"])
app.include_router(reports.router, prefix=settings.API_V1_STR + "/reports", tags=["reports"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8767)
