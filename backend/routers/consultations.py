from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from ..models.consultation import Consultation, Diagnosis
from ..schemas.consultation import ConsultationCreate, ConsultationResponse, DiagnosisCreate
import uuid

router = APIRouter()

@router.post("/", response_model=ConsultationResponse)
def create_consultation(cons_data: ConsultationCreate, db: Session = Depends(get_db)):
    new_cons = Consultation(**cons_data.dict())
    db.add(new_cons)
    db.commit()
    db.refresh(new_cons)
    return new_cons

@router.get("/{cons_id}", response_model=ConsultationResponse)
def get_consultation(cons_id: UUID, db: Session = Depends(get_db)):
    cons = db.query(Consultation).filter(Consultation.id == cons_id).first()
    if not cons:
        raise HTTPException(status_code=404, detail="Consultation not found")

    diagnoses = db.query(Diagnosis).filter(Diagnosis.consultation_id == cons_id).all()
    cons.diagnoses = diagnoses
    return cons

@router.post("/{cons_id}/diagnoses")
def add_diagnosis(cons_id: UUID, diag_data: DiagnosisCreate, db: Session = Depends(get_db)):
    new_diag = Diagnosis(**diag_data.dict(exclude={"consultation_id"}), consultation_id=cons_id)
    db.add(new_diag)
    db.commit()
    return {"success": True}

@router.get("/patient/{patient_id}", response_model=List[ConsultationResponse])
def get_patient_consultations(patient_id: UUID, db: Session = Depends(get_db)):
    return db.query(Consultation).filter(Consultation.patient_id == patient_id).order_by(Consultation.created_at.desc()).all()
