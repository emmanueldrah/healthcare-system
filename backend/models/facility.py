from sqlalchemy import Column, String, Enum, DateTime, Boolean, Integer
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from ..database import Base
import enum

class FacilityMode(enum.Enum):
    CLINIC = "CLINIC"
    HOSPITAL = "HOSPITAL"
    DENTAL = "DENTAL"
    PHARMACY = "PHARMACY"

class Facility(Base):
    __tablename__ = "facilities"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    logo_path = Column(String, nullable=True)
    address = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    email = Column(String, nullable=True)
    ghs_registration = Column(String, nullable=True)
    nhis_provider_code = Column(String, nullable=True)
    mode = Column(Enum(FacilityMode), nullable=False)
    is_setup = Column(Boolean, default=False)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)
