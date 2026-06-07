from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID
from ..database import get_db
from ..models.hospital import Ward, Bed, Admission, Theatre
from ..schemas.hospital import (
    WardResponse, BedResponse,
    AdmissionCreate, AdmissionResponse,
    TheatreResponse
)
import uuid

router = APIRouter()

# Inpatient Routes
@router.get("/wards", response_model=List[WardResponse])
def get_wards(db: Session = Depends(get_db)):
    return db.query(Ward).all()

@router.get("/beds", response_model=List[BedResponse])
def get_beds(ward_id: Optional[uuid.UUID] = None, db: Session = Depends(get_db)):
    query = db.query(Bed)
    if ward_id:
        query = query.filter(Bed.ward_id == ward_id)
    return query.all()

@router.post("/admissions", response_model=AdmissionResponse)
def admit_patient(adm_data: AdmissionCreate, db: Session = Depends(get_db)):
    bed = db.query(Bed).filter(Bed.id == adm_data.bed_id).first()
    if not bed or bed.status != "AVAILABLE":
        raise HTTPException(status_code=400, detail="Bed not available")

    new_adm = Admission(**adm_data.dict())
    bed.status = "OCCUPIED"
    db.add(new_adm)
    db.commit()
    db.refresh(new_adm)
    return new_adm

# Theatre Routes
@router.get("/theatre", response_model=List[TheatreResponse])
def get_theatre_sessions(db: Session = Depends(get_db)):
    return db.query(Theatre).all()

@router.post("/theatre", response_model=TheatreResponse)
def schedule_surgery(theatre_data: TheatreResponse, db: Session = Depends(get_db)):
    new_session = Theatre(**theatre_data.dict(exclude={"id"}))
    db.add(new_session)
    db.commit()
    db.refresh(new_session)
    return new_session
