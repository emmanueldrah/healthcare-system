from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from uuid import UUID

class BillItemBase(BaseModel):
    description: str
    quantity: int = 1
    unit_price: int
    total_price: int
    is_nhis_covered: bool = False

class BillCreate(BaseModel):
    patient_id: UUID
    items: List[BillItemBase]

class BillResponse(BaseModel):
    id: UUID
    patient_id: UUID
    total_amount: int
    patient_payable: int
    status: str
    created_at: datetime
    class Config:
        from_attributes = True

class PaymentCreate(BaseModel):
    bill_id: UUID
    amount: int
    method: str
    transaction_id: Optional[str] = None

class NHISClaimResponse(BaseModel):
    id: UUID
    month: str
    total_visits: int
    total_amount: int
    status: str
    class Config:
        from_attributes = True
