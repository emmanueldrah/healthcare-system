from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from uuid import UUID

class LabTestCatalogBase(BaseModel):
    name: str
    category: Optional[str] = None
    unit: Optional[str] = None
    normal_range_min: Optional[float] = None
    normal_range_max: Optional[float] = None
    price: int = 0

class LabTestCatalogResponse(LabTestCatalogBase):
    id: UUID
    class Config:
        from_attributes = True

class LabRequestBase(BaseModel):
    patient_id: UUID
    doctor_id: UUID
    consultation_id: Optional[UUID] = None
    notes: Optional[str] = None
    status: str = "PENDING"

class LabRequestCreate(LabRequestBase):
    test_ids: List[UUID]

class LabRequestResponse(LabRequestBase):
    id: UUID
    created_at: datetime
    patient_name: Optional[str] = None
    doctor_name: Optional[str] = None
    class Config:
        from_attributes = True

class LabResultBase(BaseModel):
    request_id: UUID
    test_id: UUID
    result_value: str
    comments: Optional[str] = None

class LabResultCreate(LabResultBase):
    pass

class LabResultResponse(LabResultBase):
    id: UUID
    test_name: Optional[str] = None
    is_abnormal: bool
    reference_range: Optional[str] = None
    created_at: datetime
    class Config:
        from_attributes = True
