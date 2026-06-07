from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime, date
from uuid import UUID

class DrugBase(BaseModel):
    name: str
    generic_name: Optional[str] = None
    brand: Optional[str] = None
    category: Optional[str] = None
    unit: str
    current_stock: int = 0
    reorder_level: int = 10
    price_per_unit: int = 0

class DrugResponse(DrugBase):
    id: UUID
    class Config:
        from_attributes = True

class PrescriptionItemBase(BaseModel):
    drug_id: UUID
    dosage: str
    frequency: str
    duration: str
    instructions: Optional[str] = None
    quantity_prescribed: int

class PrescriptionCreate(BaseModel):
    patient_id: UUID
    doctor_id: UUID
    consultation_id: Optional[UUID] = None
    items: List[PrescriptionItemBase]

class PrescriptionResponse(BaseModel):
    id: UUID
    patient_id: UUID
    doctor_id: UUID
    status: str
    created_at: datetime
    class Config:
        from_attributes = True
