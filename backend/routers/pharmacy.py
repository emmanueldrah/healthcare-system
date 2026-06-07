from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID
from ..database import get_db
from ..models.pharmacy import Drug, Prescription, PrescriptionItem
from ..models.patient import Patient
from ..schemas.pharmacy import DrugResponse, PrescriptionCreate, PrescriptionResponse
import uuid

router = APIRouter()

# Drugs / Inventory
@router.get("/drugs", response_model=List[DrugResponse])
def get_drugs(db: Session = Depends(get_db)):
    return db.query(Drug).filter(Drug.deleted_at == None).all()

@router.post("/drugs", response_model=DrugResponse)
def create_drug(drug_data: DrugResponse, db: Session = Depends(get_db)):
    new_drug = Drug(**drug_data.dict(exclude={"id"}))
    db.add(new_drug)
    db.commit()
    db.refresh(new_drug)
    return new_drug

# Prescriptions
@router.post("/prescriptions", response_model=PrescriptionResponse)
def create_prescription(p_data: PrescriptionCreate, db: Session = Depends(get_db)):
    new_p = Prescription(
        patient_id=p_data.patient_id,
        doctor_id=p_data.doctor_id,
        consultation_id=p_data.consultation_id
    )
    db.add(new_p)
    db.flush()

    for item in p_data.items:
        new_item = PrescriptionItem(
            prescription_id=new_p.id,
            **item.dict()
        )
        db.add(new_item)

    db.commit()
    db.refresh(new_p)
    return new_p

@router.get("/prescriptions", response_model=List[PrescriptionResponse])
def get_prescriptions(status: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Prescription)
    if status:
        query = query.filter(Prescription.status == status)
    return query.order_by(Prescription.created_at.desc()).all()

@router.post("/prescriptions/{p_id}/dispense")
def dispense_prescription(p_id: UUID, db: Session = Depends(get_db)):
    items = db.query(PrescriptionItem).filter(PrescriptionItem.prescription_id == p_id).all()
    for item in items:
        drug = db.query(Drug).filter(Drug.id == item.drug_id).first()
        if drug:
            if drug.current_stock < item.quantity_prescribed:
                 raise HTTPException(status_code=400, detail=f"Insufficient stock for {drug.name}")
            drug.current_stock -= item.quantity_prescribed
            item.quantity_dispensed = item.quantity_prescribed

    p = db.query(Prescription).filter(Prescription.id == p_id).first()
    p.status = "DISPENSED"
    db.commit()
    return {"success": True}
