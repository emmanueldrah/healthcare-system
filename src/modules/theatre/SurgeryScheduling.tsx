import api from '../../config/api';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Scissors, Calendar, User, Plus, Clock, MoreVertical, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';

const SurgeryScheduling = () => {
  const { data: sessions, isLoading } = useQuery({
    queryKey: ['theatre-sessions'],
    queryFn: async () => {
      const response = await api.get('/hospital/theatre');
      return response.data;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Theatre / Surgery Scheduling</h1>
          <p className="text-gray-500">Manage surgical procedures and operating room schedules.</p>
        </div>
        <button className="bg-accent hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center shadow-sm">
          <Plus className="w-5 h-5 mr-2" /> Schedule Surgery
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
          <div className="flex items-center space-x-2">
             <button className="text-xs font-bold bg-primary text-white px-3 py-1.5 rounded-lg">UPCOMING</button>
             <button className="text-xs font-bold text-gray-500 hover:bg-gray-100 px-3 py-1.5 rounded-lg">COMPLETED</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b text-xs uppercase text-gray-500 font-semibold">
                <th className="px-6 py-4">Scheduled Date & Time</th>
                <th className="px-6 py-4">Procedure</th>
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Surgeon</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {isLoading ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">Loading schedule...</td></tr>
              ) : sessions?.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">No surgeries scheduled.</td></tr>
              ) : sessions?.map((s: any) => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-2" />
                      <div>
                         <p className="text-sm font-bold text-gray-800">{format(new Date(s.scheduled_at), 'hh:mm a')}</p>
                         <p className="text-xs text-gray-400">{format(new Date(s.scheduled_at), 'dd MMM yyyy')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-700">
                    {s.procedure_name}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <p className="text-sm font-medium text-gray-700">Patient #{s.patient_id.substring(0,8)}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    Dr. Member
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {s.status}
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
      </div>
    </div>
  );
};

export default SurgeryScheduling;
