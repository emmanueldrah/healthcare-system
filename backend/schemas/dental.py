from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from uuid import UUID

class DentalToothRecordBase(BaseModel):
    tooth_number: int
    condition: Optional[str] = None
    notes: Optional[str] = None

class DentalToothRecordCreate(DentalToothRecordBase):
    patient_id: UUID

class DentalToothRecordResponse(DentalToothRecordBase):
    id: UUID
    class Config:
        from_attributes = True

class DentalProcedureBase(BaseModel):
    procedure_name: str
    tooth_numbers: Optional[List[int]] = None
    cost: int = 0
    notes: Optional[str] = None

class DentalProcedureCreate(DentalProcedureBase):
    patient_id: UUID
    consultation_id: Optional[UUID] = None

class DentalProcedureResponse(DentalProcedureBase):
    id: UUID
    created_at: datetime
    class Config:
        from_attributes = True
