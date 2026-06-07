from sqlalchemy import Column, String, DateTime, ForeignKey, Text, Integer, JSON
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from ..database import Base

class DentalToothRecord(Base):
    __tablename__ = "dental_tooth_records"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    patient_id = Column(UUID(as_uuid=True), ForeignKey("patients.id"), nullable=False)
    tooth_number = Column(Integer, nullable=False) # 1-32 for adult, 51-70 for pediatric

    condition = Column(String, nullable=True) # Cavity, Missing, Filled, etc.
    notes = Column(Text, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class DentalProcedure(Base):
    __tablename__ = "dental_procedures"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    patient_id = Column(UUID(as_uuid=True), ForeignKey("patients.id"), nullable=False)
    consultation_id = Column(UUID(as_uuid=True), ForeignKey("consultations.id"), nullable=True)

    procedure_name = Column(String, nullable=False)
    tooth_numbers = Column(JSON, nullable=True) # List of teeth involved
    cost = Column(Integer, default=0)
    notes = Column(Text, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
