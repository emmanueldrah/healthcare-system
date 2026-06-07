import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './modules/auth/Login';
import Dashboard from './modules/dashboard/Dashboard';
import SetupWizard from './modules/setup/SetupWizard';
import DashboardLayout from './components/layout/DashboardLayout';
import StaffManagement from './modules/staff/StaffManagement';
import PatientList from './modules/patients/PatientList';
import PatientProfile from './modules/patients/PatientProfile';
import AppointmentCalendar from './modules/appointments/AppointmentCalendar';
import ConsultationRoom from './modules/consultations/ConsultationRoom';
import LabDashboard from './modules/laboratory/LabDashboard';
import DentalChart from './modules/dental/DentalChart';
import PrescriptionQueue from './modules/pharmacy/PrescriptionQueue';
import InventoryManagement from './modules/inventory/InventoryManagement';
import WardManagement from './modules/inpatient/WardManagement';
import SurgeryScheduling from './modules/theatre/SurgeryScheduling';
import InvoiceForm from './modules/billing/InvoiceForm';
import NHISClaims from './modules/nhis/NHISClaims';
import Reports from './modules/reports/Reports';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/setup',
    element: <SetupWizard />,
  },
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'staff',
        element: <StaffManagement />,
      },
      {
        path: 'patients',
        element: <PatientList />,
      },
      {
        path: 'patients/:id',
        element: <PatientProfile />,
      },
      {
        path: 'appointments',
        element: <AppointmentCalendar />,
      },
      {
        path: 'consultations/:id',
        element: <ConsultationRoom />,
      },
      {
        path: 'laboratory',
        element: <LabDashboard />,
      },
      {
        path: 'dental',
        element: <DentalChart />,
      },
      {
        path: 'pharmacy',
        element: <PrescriptionQueue />,
      },
      {
        path: 'inventory',
        element: <InventoryManagement />,
      },
      {
        path: 'inpatient',
        element: <WardManagement />,
      },
      {
        path: 'theatre',
        element: <SurgeryScheduling />,
      },
      {
        path: 'billing',
        element: <InvoiceForm />,
      },
      {
        path: 'nhis',
        element: <NHISClaims />,
      },
      {
        path: 'reports',
        element: <Reports />,
      },
      // Other module routes will go here
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
