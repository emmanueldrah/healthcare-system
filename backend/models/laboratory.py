from sqlalchemy import Column, String, DateTime, ForeignKey, Text, Float, Boolean, Integer
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from ..database import Base

class LabTestCatalog(Base):
    __tablename__ = "lab_test_catalog"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    category = Column(String, nullable=True) # e.g. Hematology, Biochemistry
    unit = Column(String, nullable=True)
    normal_range_min = Column(Float, nullable=True)
    normal_range_max = Column(Float, nullable=True)
    price = Column(Integer, default=0) # in pesewas

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class LabRequest(Base):
    __tablename__ = "lab_requests"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    patient_id = Column(UUID(as_uuid=True), ForeignKey("patients.id"), nullable=False)
    doctor_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    consultation_id = Column(UUID(as_uuid=True), ForeignKey("consultations.id"), nullable=True)

    status = Column(String, default="PENDING") # PENDING, IN_PROGRESS, COMPLETED, CANCELLED
    notes = Column(Text, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)

class LabResult(Base):
    __tablename__ = "lab_results"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    request_id = Column(UUID(as_uuid=True), ForeignKey("lab_requests.id"), nullable=False)
    test_id = Column(UUID(as_uuid=True), ForeignKey("lab_test_catalog.id"), nullable=False)
    technician_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)

    result_value = Column(String, nullable=False)
    is_abnormal = Column(Boolean, default=False) # Auto-flagged in UI/Logic
    reference_range = Column(String, nullable=True) # Snapshot of range at time of test

    comments = Column(Text, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
