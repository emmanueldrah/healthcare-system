from pydantic import BaseModel
from typing import Optional, List
from datetime import date, datetime
from uuid import UUID

class StaffBase(BaseModel):
    full_name: str
    gender: Optional[str] = None
    dob: Optional[date] = None
    role: str
    specialization: Optional[str] = None
    qualification: Optional[str] = None
    license_number: Optional[str] = None
    employment_date: Optional[date] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    status: str = "ACTIVE"

class StaffCreate(StaffBase):
    username: Optional[str] = None
    password: Optional[str] = None

class StaffResponse(StaffBase):
    id: UUID
    staff_id: str
    user_id: Optional[UUID] = None
    created_at: datetime

    class Config:
        from_attributes = True
