from sqlalchemy import Column, String, DateTime, Boolean, Date, Text, Integer
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from ..database import Base

class Patient(Base):
    __tablename__ = "patients"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    patient_id = Column(String, unique=True, index=True, nullable=False) # Auto-generated
    full_name = Column(String, nullable=False)
    dob = Column(Date, nullable=False)
    gender = Column(String, nullable=False)

    # Contact Info
    phone = Column(String, nullable=True)
    address = Column(String, nullable=True)
    nationality = Column(String, nullable=True)
    religion = Column(String, nullable=True)

    # Emergency Contact
    emergency_name = Column(String, nullable=True)
    emergency_phone = Column(String, nullable=True)

    # Medical Info
    blood_group = Column(String, nullable=True)
    allergies = Column(Text, nullable=True) # Flagged in red in UI
    chronic_conditions = Column(Text, nullable=True)
    past_surgeries = Column(Text, nullable=True)
    family_history = Column(Text, nullable=True)

    # NHIS Info
    nhis_number = Column(String, nullable=True)
    nhis_card_type = Column(String, nullable=True)
    nhis_expiry = Column(Date, nullable=True)

    photo_path = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)
