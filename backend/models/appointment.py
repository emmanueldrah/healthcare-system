from sqlalchemy import Column, String, DateTime, ForeignKey, Text, Enum
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from ..database import Base
import enum

class AppointmentStatus(enum.Enum):
    PENDING = "PENDING"
    CONFIRMED = "CONFIRMED"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"
    NO_SHOW = "NO_SHOW"

class AppointmentType(enum.Enum):
    WALK_IN = "WALK_IN"
    SCHEDULED = "SCHEDULED"
    FOLLOW_UP = "FOLLOW_UP"
    EMERGENCY = "EMERGENCY"

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    patient_id = Column(UUID(as_uuid=True), ForeignKey("patients.id"), nullable=False)
    doctor_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)

    appointment_date = Column(DateTime, nullable=False)
    reason = Column(Text, nullable=True)
    type = Column(Enum(AppointmentType), default=AppointmentType.SCHEDULED)
    status = Column(Enum(AppointmentStatus), default=AppointmentStatus.PENDING)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)
