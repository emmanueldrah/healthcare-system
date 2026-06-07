from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models.staff import Staff
from ..models.user import User
from ..schemas.staff import StaffCreate, StaffResponse
from passlib.context import CryptContext
import uuid

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.get("/", response_model=List[StaffResponse])
def get_staff(db: Session = Depends(get_db)):
    return db.query(Staff).all()

@router.post("/", response_model=StaffResponse)
def create_staff(staff_data: StaffCreate, db: Session = Depends(get_db)):
    # Simple auto-ID for demo
    count = db.query(Staff).count()
    staff_id = f"STF-{count+1:03d}"

    user_id = None
    if staff_data.username and staff_data.password:
        hashed_password = pwd_context.hash(staff_data.password)
        new_user = User(
            username=staff_data.username,
            hashed_password=hashed_password,
            full_name=staff_data.full_name,
            role=staff_data.role
        )
        db.add(new_user)
        db.flush()
        user_id = new_user.id

    new_staff = Staff(
        **staff_data.dict(exclude={"username", "password"}),
        staff_id=staff_id,
        user_id=user_id
    )
    db.add(new_staff)
    db.commit()
    db.refresh(new_staff)
    return new_staff
