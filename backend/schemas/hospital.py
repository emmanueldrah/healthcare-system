from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from uuid import UUID

class WardBase(BaseModel):
    name: str
    type: str
    capacity: int

class WardResponse(WardBase):
    id: UUID
    class Config:
        from_attributes = True

class BedResponse(BaseModel):
    id: UUID
    ward_id: UUID
    bed_number: str
    status: str
    class Config:
        from_attributes = True

class AdmissionCreate(BaseModel):
    patient_id: UUID
    bed_id: UUID
    doctor_id: UUID
    diagnosis: Optional[str] = None

class AdmissionResponse(BaseModel):
    id: UUID
    patient_id: UUID
    bed_id: UUID
    admission_date: datetime
    status: str
    class Config:
        from_attributes = True

class TheatreBase(BaseModel):
    patient_id: UUID
    surgeon_id: UUID
    procedure_name: str
    scheduled_at: datetime
    status: str = "SCHEDULED"

class TheatreResponse(TheatreBase):
    id: UUID
    class Config:
        from_attributes = True
