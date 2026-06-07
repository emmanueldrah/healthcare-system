from sqlalchemy import Column, String, DateTime, ForeignKey, Text, Float, Integer, Boolean
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from ..database import Base

class Consultation(Base):
    __tablename__ = "consultations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    patient_id = Column(UUID(as_uuid=True), ForeignKey("patients.id"), nullable=False)
    doctor_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    appointment_id = Column(UUID(as_uuid=True), ForeignKey("appointments.id"), nullable=True)

    # Vitals
    weight = Column(Float, nullable=True) # kg
    height = Column(Float, nullable=True) # cm
    bmi = Column(Float, nullable=True)
    bp_systolic = Column(Integer, nullable=True)
    bp_diastolic = Column(Integer, nullable=True)
    temperature = Column(Float, nullable=True)
    pulse = Column(Integer, nullable=True)
    respiratory_rate = Column(Integer, nullable=True)
    oxygen_saturation = Column(Integer, nullable=True)

    # Clinical Notes
    chief_complaint = Column(Text, nullable=True)
    history_presenting_illness = Column(Text, nullable=True)
    examination_findings = Column(Text, nullable=True)
    treatment_plan = Column(Text, nullable=True)

    status = Column(String, default="OPEN") # OPEN, COMPLETED

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)

class Diagnosis(Base):
    __tablename__ = "diagnoses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    consultation_id = Column(UUID(as_uuid=True), ForeignKey("consultations.id"), nullable=False)
    icd10_code = Column(String, nullable=False)
    description = Column(String, nullable=False)
    is_primary = Column(Boolean, default=False)

    created_at = Column(DateTime, default=datetime.utcnow)
