from pydantic import BaseModel
from typing import Optional

class FacilitySetup(BaseModel):
    name: str
    address: str
    phone: str
    email: str
    ghs_registration: Optional[str] = None
    nhis_provider_code: Optional[str] = None
    mode: str

class AdminSetup(BaseModel):
    full_name: str
    username: str
    password: str
