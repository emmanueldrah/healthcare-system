from pydantic import BaseModel
from typing import Optional, List
from datetime import date, datetime
from uuid import UUID

class PatientBase(BaseModel):
    full_name: str
    dob: date
    gender: str
    phone: Optional[str] = None
    address: Optional[str] = None
    nationality: Optional[str] = None
    religion: Optional[str] = None
    emergency_name: Optional[str] = None
    emergency_phone: Optional[str] = None
    blood_group: Optional[str] = None
    allergies: Optional[str] = None
    chronic_conditions: Optional[str] = None
    past_surgeries: Optional[str] = None
    family_history: Optional[str] = None
    nhis_number: Optional[str] = None
    nhis_card_type: Optional[str] = None
    nhis_expiry: Optional[date] = None
    is_active: bool = True

class PatientCreate(PatientBase):
    pass

class PatientResponse(PatientBase):
    id: UUID
    patient_id: str
    created_at: datetime

    class Config:
        from_attributes = True
