from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.facility import Facility, FacilityMode
from ..models.user import User
from ..schemas.setup import FacilitySetup, AdminSetup
from passlib.context import CryptContext

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.get("/status")
def get_setup_status(db: Session = Depends(get_db)):
    facility = db.query(Facility).first()
    if not facility:
        return {"is_setup": False}
    return {"is_setup": facility.is_setup, "mode": facility.mode, "name": facility.name}

@router.post("/complete")
def complete_setup(facility_data: FacilitySetup, admin_data: AdminSetup, db: Session = Depends(get_db)):
    existing_facility = db.query(Facility).first()
    if existing_facility and existing_facility.is_setup:
        raise HTTPException(status_code=400, detail="System already setup")

    # Create Facility
    new_facility = Facility(
        name=facility_data.name,
        address=facility_data.address,
        phone=facility_data.phone,
        email=facility_data.email,
        ghs_registration=facility_data.ghs_registration,
        nhis_provider_code=facility_data.nhis_provider_code,
        mode=FacilityMode[facility_data.mode],
        is_setup=True
    )
    db.add(new_facility)

    # Create Super Admin
    hashed_password = pwd_context.hash(admin_data.password)
    admin_user = User(
        username=admin_data.username,
        hashed_password=hashed_password,
        full_name=admin_data.full_name,
        role="SUPER_ADMIN"
    )
    db.add(admin_user)

    db.commit()
    return {"success": True, "message": "Setup completed successfully"}
