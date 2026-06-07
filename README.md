# SUCCESS ABOVE DREAMS (SAD) - MediCore

MediCore is a professional Healthcare Management System (HMS) built for the Ghanaian market, supporting Clinics, Hospitals, Dental Clinics, and Pharmacies.

## Key Features

- **Dynamic Facility Modes**: The entire system adapts its UI and API based on the selected mode (Clinic, Hospital, Dental, Pharmacy).
- **Comprehensive EMR**: Patient history, timeline, and **prominent red allergy alerts**.
- **Interactive Dental Chart**: SVG-based charting for adult and pediatric dental procedures.
- **Ghana NHIS Integration**: Built-in support for NHIS billing and monthly claim batching.
- **Laboratory Automation**: Auto-flagging of abnormal lab results in red.
- **Inpatient & Theatre**: Ward occupancy management and surgery scheduling for hospitals.
- **Offline-First Desktop App**: Bundled PostgreSQL and FastAPI for a reliable offline experience.
- **Web-Ready**: Dockerized for easy server deployment.

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Zustand, TanStack Query, Lucide Icons, Recharts.
- **Backend**: FastAPI (Python 3.11), SQLAlchemy 2.0, Alembic (Migrations), WeasyPrint (PDF).
- **Desktop Packaging**: Electron, Electron Builder.
- **Database**: PostgreSQL 15.

## Installation & Setup

### 1. Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL 15 (if running in Dev/Web mode)

### 2. Development (Web/API)
```bash
# Backend
cd backend
pip install -r requirements.txt
python main.py

# Frontend
npm install
npm run dev
```

### 3. Desktop Development
```bash
npm run electron:dev
```

### 4. Production Build
```bash
# Build Windows Installer
npm run dist:win

# Build Linux AppImage
npm run dist:linux
```

## Facility Mode Configuration
During the first launch, the Setup Wizard will prompt you to select a facility type. **This selection is permanent** and cannot be changed without a system reset by a Super Admin.

## Port Assignments
- **MediCore API**: 8767
- **Frontend Dev**: 5173

---
© 2025 Success Above Dreams. Designed for Excellence in Healthcare.
