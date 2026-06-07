from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID
from ..database import get_db
from ..models.appointment import Appointment
from ..models.patient import Patient
from ..models.user import User
from ..schemas.appointment import AppointmentCreate, AppointmentResponse
import uuid

router = APIRouter()

@router.get("/", response_model=List[AppointmentResponse])
def get_appointments(db: Session = Depends(get_db)):
    appointments = db.query(Appointment).filter(Appointment.deleted_at == None).all()
    results = []
    for appt in appointments:
        patient = db.query(Patient).filter(Patient.id == appt.patient_id).first()
        doctor = db.query(User).filter(User.id == appt.doctor_id).first() if appt.doctor_id else None

        appt_resp = AppointmentResponse.from_orm(appt)
        appt_resp.patient_name = patient.full_name if patient else "Unknown"
        appt_resp.doctor_name = doctor.full_name if doctor else "Unassigned"
        results.append(appt_resp)
    return results

@router.post("/", response_model=AppointmentResponse)
def create_appointment(appt_data: AppointmentCreate, db: Session = Depends(get_db)):
    new_appt = Appointment(**appt_data.dict())
    db.add(new_appt)
    db.commit()
    db.refresh(new_appt)
    return new_appt

@router.patch("/{appt_id}/status")
def update_status(appt_id: UUID, status: str, db: Session = Depends(get_db)):
    appt = db.query(Appointment).filter(Appointment.id == appt_id).first()
    if not appt:
        raise HTTPException(status_code=404, detail="Appointment not found")
    appt.status = status
    db.commit()
    return {"success": True}
