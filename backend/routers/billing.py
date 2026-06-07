from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID
from ..database import get_db
from ..models.billing import Bill, BillItem, Payment, NHISClaim
from ..schemas.billing import BillCreate, BillResponse, PaymentCreate, NHISClaimResponse
import uuid

router = APIRouter()

@router.post("/bills", response_model=BillResponse)
def create_bill(bill_data: BillCreate, db: Session = Depends(get_db)):
    total = sum(item.total_price for item in bill_data.items)
    nhis_total = sum(item.total_price for item in bill_data.items if item.is_nhis_covered)

    new_bill = Bill(
        patient_id=bill_data.patient_id,
        total_amount=total,
        nhis_amount=nhis_total,
        patient_payable=total - nhis_total
    )
    db.add(new_bill)
    db.flush()

    for item in bill_data.items:
        db.add(BillItem(bill_id=new_bill.id, **item.dict()))

    db.commit()
    db.refresh(new_bill)
    return new_bill

@router.get("/bills", response_model=List[BillResponse])
def get_bills(db: Session = Depends(get_db)):
    return db.query(Bill).order_by(Bill.created_at.desc()).all()

@router.post("/payments")
def record_payment(pay_data: PaymentCreate, db: Session = Depends(get_db)):
    new_pay = Payment(**pay_data.dict())
    db.add(new_pay)

    # Simple logic: if payment matches payable, mark as paid
    bill = db.query(Bill).filter(Bill.id == pay_data.bill_id).first()
    if bill:
        total_paid = sum(p.amount for p in db.query(Payment).filter(Payment.bill_id == bill.id).all()) + pay_data.amount
        if total_paid >= bill.patient_payable:
            bill.status = "PAID"

    db.commit()
    return {"success": True}

@router.get("/nhis-claims", response_model=List[NHISClaimResponse])
def get_nhis_claims(db: Session = Depends(get_db)):
    return db.query(NHISClaim).all()
