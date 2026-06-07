from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from uuid import UUID

class DiagnosisBase(BaseModel):
    icd10_code: str
    description: str
    is_primary: bool = False

class DiagnosisCreate(DiagnosisBase):
    consultation_id: Optional[UUID] = None

class DiagnosisResponse(DiagnosisBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True

class ConsultationBase(BaseModel):
    patient_id: UUID
    doctor_id: UUID
    appointment_id: Optional[UUID] = None
    weight: Optional[float] = None
    height: Optional[float] = None
    bmi: Optional[float] = None
    bp_systolic: Optional[int] = None
    bp_diastolic: Optional[int] = None
    temperature: Optional[float] = None
    pulse: Optional[int] = None
    respiratory_rate: Optional[int] = None
    oxygen_saturation: Optional[int] = None
    chief_complaint: Optional[str] = None
    history_presenting_illness: Optional[str] = None
    examination_findings: Optional[str] = None
    treatment_plan: Optional[str] = None
    status: str = "OPEN"

class ConsultationCreate(ConsultationBase):
    pass

class ConsultationResponse(ConsultationBase):
    id: UUID
    created_at: datetime
    diagnoses: List[DiagnosisResponse] = []

    class Config:
        from_attributes = True
