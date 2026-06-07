from sqlalchemy import Column, String, DateTime, Boolean, ForeignKey, Date
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from ..database import Base

class Staff(Base):
    __tablename__ = "staff"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    staff_id = Column(String, unique=True, index=True, nullable=False) # Auto-generated
    full_name = Column(String, nullable=False)
    gender = Column(String, nullable=True)
    dob = Column(Date, nullable=True)
    role = Column(String, nullable=False)
    specialization = Column(String, nullable=True)
    qualification = Column(String, nullable=True)
    license_number = Column(String, nullable=True)
    employment_date = Column(Date, nullable=True)
    phone = Column(String, nullable=True)
    email = Column(String, nullable=True)
    address = Column(String, nullable=True)
    photo_path = Column(String, nullable=True)
    status = Column(String, default="ACTIVE") # ACTIVE, INACTIVE, ON_LEAVE

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)
