from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.billing import Bill
from ..models.patient import Patient
from ..models.consultation import Consultation
from weasyprint import HTML
import io

router = APIRouter()

@router.get("/revenue")
def get_revenue_report(db: Session = Depends(get_db)):
    bills = db.query(Bill).filter(Bill.status == "PAID").all()
    total = sum(b.total_amount for b in bills)
    return {"total_revenue": total, "count": len(bills)}

@router.get("/patients-stats")
def get_patient_stats(db: Session = Depends(get_db)):
    total = db.query(Patient).count()
    return {"total_patients": total}

@router.get("/generate-pdf/{bill_id}")
def generate_bill_pdf(bill_id: str, db: Session = Depends(get_db)):
    # Simple HTML template for PDF
    html_content = f"""
    <html>
        <head><style>body {{ font-family: sans-serif; }} h1 {{ color: #1e3a5f; }}</style></head>
        <body>
            <h1>MediCore Invoice</h1>
            <p>Invoice ID: {bill_id}</p>
            <p>Status: PAID</p>
            <hr/>
            <p>Thank you for choosing MediCore.</p>
        </body>
    </html>
    """
    pdf = HTML(string=html_content).write_pdf()
    return Response(content=pdf, media_type="application/pdf")
