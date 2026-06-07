from sqlalchemy import Column, String, DateTime, ForeignKey, Text, Integer, Date
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from ..database import Base

class Drug(Base):
    __tablename__ = "drugs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    generic_name = Column(String, nullable=True)
    brand = Column(String, nullable=True)
    category = Column(String, nullable=True)
    unit = Column(String, nullable=False) # tablets, ml, etc.

    current_stock = Column(Integer, default=0)
    reorder_level = Column(Integer, default=10)
    price_per_unit = Column(Integer, default=0)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)

class Prescription(Base):
    __tablename__ = "prescriptions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    patient_id = Column(UUID(as_uuid=True), ForeignKey("patients.id"), nullable=False)
    doctor_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    consultation_id = Column(UUID(as_uuid=True), ForeignKey("consultations.id"), nullable=True)

    status = Column(String, default="PENDING") # PENDING, DISPENSED, PARTIAL, CANCELLED

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class PrescriptionItem(Base):
    __tablename__ = "prescription_items"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    prescription_id = Column(UUID(as_uuid=True), ForeignKey("prescriptions.id"), nullable=False)
    drug_id = Column(UUID(as_uuid=True), ForeignKey("drugs.id"), nullable=False)

    dosage = Column(String, nullable=False)
    frequency = Column(String, nullable=False)
    duration = Column(String, nullable=False)
    instructions = Column(Text, nullable=True)

    quantity_prescribed = Column(Integer, nullable=False)
    quantity_dispensed = Column(Integer, default=0)
