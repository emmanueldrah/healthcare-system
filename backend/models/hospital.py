from sqlalchemy import Column, String, DateTime, ForeignKey, Text, Integer, Enum
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from ..database import Base
import enum

class Ward(Base):
    __tablename__ = "wards"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    type = Column(String, nullable=False) # General, Maternity, Paediatric, ICU, Surgical
    capacity = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

class Bed(Base):
    __tablename__ = "beds"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    ward_id = Column(UUID(as_uuid=True), ForeignKey("wards.id"), nullable=False)
    bed_number = Column(String, nullable=False)
    status = Column(String, default="AVAILABLE") # AVAILABLE, OCCUPIED, RESERVED, MAINTENANCE
    created_at = Column(DateTime, default=datetime.utcnow)

class Admission(Base):
    __tablename__ = "admissions"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    patient_id = Column(UUID(as_uuid=True), ForeignKey("patients.id"), nullable=False)
    bed_id = Column(UUID(as_uuid=True), ForeignKey("beds.id"), nullable=False)
    doctor_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)

    admission_date = Column(DateTime, default=datetime.utcnow)
    discharge_date = Column(DateTime, nullable=True)
    diagnosis = Column(Text, nullable=True)
    status = Column(String, default="ADMITTED") # ADMITTED, DISCHARGED

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Theatre(Base):
    __tablename__ = "theatre_sessions"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    patient_id = Column(UUID(as_uuid=True), ForeignKey("patients.id"), nullable=False)
    surgeon_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)

    procedure_name = Column(String, nullable=False)
    scheduled_at = Column(DateTime, nullable=False)
    status = Column(String, default="SCHEDULED") # SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED

    pre_op_notes = Column(Text, nullable=True)
    intra_op_notes = Column(Text, nullable=True)
    post_op_notes = Column(Text, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
