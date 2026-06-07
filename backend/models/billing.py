from sqlalchemy import Column, String, DateTime, ForeignKey, Text, Integer, Boolean
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from ..database import Base

class Bill(Base):
    __tablename__ = "bills"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    patient_id = Column(UUID(as_uuid=True), ForeignKey("patients.id"), nullable=False)

    total_amount = Column(Integer, default=0) # in pesewas
    nhis_amount = Column(Integer, default=0)
    patient_payable = Column(Integer, default=0)

    status = Column(String, default="DRAFT") # DRAFT, ISSUED, PARTIAL, PAID, CANCELLED

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class BillItem(Base):
    __tablename__ = "bill_items"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    bill_id = Column(UUID(as_uuid=True), ForeignKey("bills.id"), nullable=False)

    description = Column(String, nullable=False)
    quantity = Column(Integer, default=1)
    unit_price = Column(Integer, nullable=False)
    total_price = Column(Integer, nullable=False)
    is_nhis_covered = Column(Boolean, default=False)

class Payment(Base):
    __tablename__ = "payments"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    bill_id = Column(UUID(as_uuid=True), ForeignKey("bills.id"), nullable=False)

    amount = Column(Integer, nullable=False)
    method = Column(String, nullable=False) # CASH, MOMO, NHIS, BANK
    transaction_id = Column(String, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)

class NHISClaim(Base):
    __tablename__ = "nhis_claims"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    month = Column(String, nullable=False) # e.g. "2025-01"

    total_visits = Column(Integer, default=0)
    total_amount = Column(Integer, default=0)

    status = Column(String, default="DRAFT") # DRAFT, SUBMITTED, APPROVED, REJECTED, PAID
    rejection_reason = Column(Text, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
