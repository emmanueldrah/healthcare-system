import api from '../../config/api';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  MoreVertical,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Plus
} from 'lucide-react';
import { format } from 'date-fns';

const AppointmentCalendar = () => {
  const [view, setView] = useState<'list' | 'calendar'>('list');

  const { data: appointments, isLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: async () => {
      const response = await api.get('/appointments/');
      return response.data;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Appointments & Scheduling</h1>
          <p className="text-gray-500">Manage patient visits and doctor availability.</p>
        </div>
        <button className="bg-accent hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center shadow-sm transition-colors">
          <Plus className="w-5 h-5 mr-2" /> Book Appointment
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
          <div className="flex bg-white border rounded-lg p-1">
            <button
              onClick={() => setView('list')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${view === 'list' ? 'bg-primary text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              List View
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${view === 'calendar' ? 'bg-primary text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Calendar
            </button>
          </div>

          <div className="flex space-x-2">
            <input
              type="date"
              className="border rounded-lg px-3 py-1.5 text-sm outline-none"
              defaultValue={format(new Date(), 'yyyy-MM-dd')}
            />
          </div>
        </div>

        {view === 'list' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b text-xs uppercase text-gray-500 font-semibold">
                  <th className="px-6 py-4">Time & Date</th>
                  <th className="px-6 py-4">Patient</th>
                  <th className="px-6 py-4">Doctor</th>
                  <th className="px-6 py-4">Reason</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {isLoading ? (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">Loading appointments...</td></tr>
                ) : appointments?.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">No appointments scheduled for today.</td></tr>
                ) : appointments?.map((appt: any) => (
                  <tr key={appt.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="p-2 bg-blue-50 rounded-lg text-accent mr-3">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-800">{format(new Date(appt.appointment_date), 'hh:mm a')}</p>
                          <p className="text-xs text-gray-400">{format(new Date(appt.appointment_date), 'dd MMM yyyy')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <User className="w-4 h-4 text-gray-400 mr-2" />
                        <p className="text-sm font-medium text-gray-700">{appt.patient_name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {appt.doctor_name}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-500 truncate max-w-xs">{appt.reason || 'Routine Checkup'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appt.status)}`}>
                        {appt.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-gray-400">
            <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-gray-200" />
            <p className="text-lg font-medium">Interactive Calendar View</p>
            <p className="text-sm">This module is being expanded with a full calendar widget.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCalendar;
