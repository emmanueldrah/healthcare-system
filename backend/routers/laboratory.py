from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID
from ..database import get_db
from ..models.laboratory import LabRequest, LabResult, LabTestCatalog
from ..models.patient import Patient
from ..models.user import User
from ..schemas.laboratory import (
    LabRequestCreate, LabRequestResponse,
    LabResultCreate, LabResultResponse,
    LabTestCatalogResponse
)
import uuid

router = APIRouter()

@router.get("/catalog", response_model=List[LabTestCatalogResponse])
def get_catalog(db: Session = Depends(get_db)):
    return db.query(LabTestCatalog).all()

@router.post("/requests", response_model=LabRequestResponse)
def create_lab_request(req_data: LabRequestCreate, db: Session = Depends(get_db)):
    new_req = LabRequest(
        patient_id=req_data.patient_id,
        doctor_id=req_data.doctor_id,
        consultation_id=req_data.consultation_id,
        notes=req_data.notes
    )
    db.add(new_req)
    db.flush()

    # Create empty results for each test
    for test_id in req_data.test_ids:
        catalog_item = db.query(LabTestCatalog).filter(LabTestCatalog.id == test_id).first()
        if catalog_item:
            ref_range = f"{catalog_item.normal_range_min} - {catalog_item.normal_range_max} {catalog_item.unit}"
            new_res = LabResult(
                request_id=new_req.id,
                test_id=test_id,
                result_value="PENDING",
                reference_range=ref_range
            )
            db.add(new_res)

    db.commit()
    db.refresh(new_req)
    return new_req

@router.get("/requests", response_model=List[LabRequestResponse])
def get_lab_requests(status: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(LabRequest).filter(LabRequest.deleted_at == None)
    if status:
        query = query.filter(LabRequest.status == status)

    requests = query.order_by(LabRequest.created_at.desc()).all()
    for req in requests:
        patient = db.query(Patient).filter(Patient.id == req.patient_id).first()
        req.patient_name = patient.full_name if patient else "Unknown"
    return requests

@router.get("/requests/{req_id}/results", response_model=List[LabResultResponse])
def get_results_by_request(req_id: UUID, db: Session = Depends(get_db)):
    results = db.query(LabResult).filter(LabResult.request_id == req_id).all()
    for res in results:
        test = db.query(LabTestCatalog).filter(LabTestCatalog.id == res.test_id).first()
        res.test_name = test.name if test else "Unknown"
    return results

@router.patch("/results/{res_id}")
def update_lab_result(res_id: UUID, value: str, comments: Optional[str] = None, db: Session = Depends(get_db)):
    res = db.query(LabResult).filter(LabResult.id == res_id).first()
    if not res:
        raise HTTPException(status_code=404, detail="Result not found")

    res.result_value = value
    res.comments = comments

    # Auto-flagging logic
    test = db.query(LabTestCatalog).filter(LabTestCatalog.id == res.test_id).first()
    if test and test.normal_range_min is not None and test.normal_range_max is not None:
        try:
            val = float(value)
            if val < test.normal_range_min or val > test.normal_range_max:
                res.is_abnormal = True
            else:
                res.is_abnormal = False
        except ValueError:
            pass # Not a number, maybe text-based result

    db.commit()

    # Check if all results for the request are done
    all_results = db.query(LabResult).filter(LabResult.request_id == res.request_id).all()
    if all(r.result_value != "PENDING" for r in all_results):
        req = db.query(LabRequest).filter(LabRequest.id == res.request_id).first()
        req.status = "COMPLETED"
        db.commit()

    return {"success": True}
