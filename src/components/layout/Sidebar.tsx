import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Stethoscope,
  Activity,
  Pill,
  FlaskConical,
  CreditCard,
  Bed,
  Scissors,
  UserCog,
  Package,
  FileBarChart,
  ShieldCheck
} from 'lucide-react';
import { useFacilityStore } from '../../config/facilityMode';
import clsx from 'clsx';

const Sidebar = () => {
  const { mode, facilityName } = useFacilityStore();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/', modes: ['CLINIC', 'HOSPITAL', 'DENTAL', 'PHARMACY'] },
    { name: 'Patients', icon: Users, path: '/patients', modes: ['CLINIC', 'HOSPITAL', 'DENTAL', 'PHARMACY'] },
    { name: 'Appointments', icon: Calendar, path: '/appointments', modes: ['CLINIC', 'HOSPITAL', 'DENTAL'] },
    { name: 'Consultations', icon: Stethoscope, path: '/consultations', modes: ['CLINIC', 'HOSPITAL', 'DENTAL'] },
    { name: 'Dental Chart', icon: Activity, path: '/dental', modes: ['DENTAL'] },
    { name: 'Pharmacy', icon: Pill, path: '/pharmacy', modes: ['CLINIC', 'HOSPITAL', 'DENTAL', 'PHARMACY'] },
    { name: 'Laboratory', icon: FlaskConical, path: '/laboratory', modes: ['CLINIC', 'HOSPITAL'] },
    { name: 'Inpatient', icon: Bed, path: '/inpatient', modes: ['HOSPITAL'] },
    { name: 'Theatre', icon: Scissors, path: '/theatre', modes: ['HOSPITAL'] },
    { name: 'Billing', icon: CreditCard, path: '/billing', modes: ['CLINIC', 'HOSPITAL', 'DENTAL', 'PHARMACY'] },
    { name: 'Inventory', icon: Package, path: '/inventory', modes: ['CLINIC', 'HOSPITAL', 'DENTAL', 'PHARMACY'] },
    { name: 'NHIS Claims', icon: ShieldCheck, path: '/nhis', modes: ['CLINIC', 'HOSPITAL', 'DENTAL', 'PHARMACY'] },
    { name: 'Staff', icon: UserCog, path: '/staff', modes: ['CLINIC', 'HOSPITAL', 'DENTAL', 'PHARMACY'] },
    { name: 'Reports', icon: FileBarChart, path: '/reports', modes: ['CLINIC', 'HOSPITAL', 'DENTAL', 'PHARMACY'] },
  ];

  const filteredMenu = menuItems.filter(item => mode && item.modes.includes(mode));

  return (
    <div className="flex flex-col w-64 bg-primary text-white h-screen">
      <div className="flex items-center justify-center h-20 shadow-md border-b border-gray-700">
        <img src="/resources/icons/icon.png" alt="SAD Logo" className="w-10 h-10 mr-2" />
        <h1 className="text-xl font-bold uppercase tracking-wider">{facilityName}</h1>
      </div>
      <nav className="flex-grow overflow-y-auto mt-4">
        {filteredMenu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                "flex items-center px-6 py-3 text-gray-300 hover:bg-accent hover:text-white transition-colors duration-200",
                isActive && "bg-accent text-white"
              )
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span className="text-sm font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700 text-xs text-center text-gray-400">
        MediCore v1.0.0
      </div>
    </div>
  );
};

export default Sidebar;
