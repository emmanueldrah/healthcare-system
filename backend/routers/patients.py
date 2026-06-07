from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID
from datetime import datetime
from ..database import get_db
from ..models.patient import Patient
from ..schemas.patient import PatientCreate, PatientResponse
import uuid

router = APIRouter()

@router.get("/", response_model=List[PatientResponse])
def get_patients(
    skip: int = 0,
    limit: int = 100,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Patient).filter(Patient.deleted_at == None)
    if search:
        query = query.filter(
            (Patient.full_name.ilike(f"%{search}%")) |
            (Patient.patient_id.ilike(f"%{search}%")) |
            (Patient.phone.ilike(f"%{search}%"))
        )
    return query.offset(skip).limit(limit).all()

@router.post("/", response_model=PatientResponse)
def create_patient(patient_data: PatientCreate, db: Session = Depends(get_db)):
    # Auto-generate Patient ID: PAT-2025-001
    year = datetime.now().year
    count = db.query(Patient).count()
    patient_id = f"PAT-{year}-{count+1:04d}"

    new_patient = Patient(
        **patient_data.dict(),
        patient_id=patient_id
    )
    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)
    return new_patient

@router.get("/{patient_id}", response_model=PatientResponse)
def get_patient(patient_id: UUID, db: Session = Depends(get_db)):
    patient = db.query(Patient).filter(Patient.id == patient_id, Patient.deleted_at == None).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient

@router.put("/{patient_id}", response_model=PatientResponse)
def update_patient(patient_id: UUID, patient_data: PatientCreate, db: Session = Depends(get_db)):
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    for key, value in patient_data.dict().items():
        setattr(patient, key, value)

    db.commit()
    db.refresh(patient)
    return patient
