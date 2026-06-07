from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from uuid import UUID
from ..models.appointment import AppointmentStatus, AppointmentType

class AppointmentBase(BaseModel):
    patient_id: UUID
    doctor_id: Optional[UUID] = None
    appointment_date: datetime
    reason: Optional[str] = None
    type: AppointmentType = AppointmentType.SCHEDULED
    status: AppointmentStatus = AppointmentStatus.PENDING

class AppointmentCreate(AppointmentBase):
    pass

class AppointmentResponse(AppointmentBase):
    id: UUID
    created_at: datetime
    patient_name: Optional[str] = None
    doctor_name: Optional[str] = None

    class Config:
        from_attributes = True
