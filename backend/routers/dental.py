from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from ..models.dental import DentalToothRecord, DentalProcedure
from ..schemas.dental import (
    DentalToothRecordCreate, DentalToothRecordResponse,
    DentalProcedureCreate, DentalProcedureResponse
)
import uuid

router = APIRouter()

@router.get("/patients/{patient_id}/chart", response_model=List[DentalToothRecordResponse])
def get_patient_dental_chart(patient_id: UUID, db: Session = Depends(get_db)):
    return db.query(DentalToothRecord).filter(DentalToothRecord.patient_id == patient_id).all()

@router.post("/records", response_model=DentalToothRecordResponse)
def update_tooth_record(record_data: DentalToothRecordCreate, db: Session = Depends(get_db)):
    record = db.query(DentalToothRecord).filter(
        DentalToothRecord.patient_id == record_data.patient_id,
        DentalToothRecord.tooth_number == record_data.tooth_number
    ).first()

    if record:
        record.condition = record_data.condition
        record.notes = record_data.notes
    else:
        record = DentalToothRecord(**record_data.dict())
        db.add(record)

    db.commit()
    db.refresh(record)
    return record

@router.post("/procedures", response_model=DentalProcedureResponse)
def record_procedure(proc_data: DentalProcedureCreate, db: Session = Depends(get_db)):
    new_proc = DentalProcedure(**proc_data.dict())
    db.add(new_proc)
    db.commit()
    db.refresh(new_proc)
    return new_proc

@router.get("/patients/{patient_id}/procedures", response_model=List[DentalProcedureResponse])
def get_patient_procedures(patient_id: UUID, db: Session = Depends(get_db)):
    return db.query(DentalProcedure).filter(DentalProcedure.patient_id == patient_id).order_by(DentalProcedure.created_at.desc()).all()
