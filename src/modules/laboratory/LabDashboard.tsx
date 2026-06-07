import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FlaskConical, Search, MoreVertical, ClipboardList, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';

const LabDashboard = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');

  const { data: requests, isLoading } = useQuery({
    queryKey: ['lab-requests', activeTab],
    queryFn: async () => {
      const status = activeTab === 'pending' ? 'PENDING' : 'COMPLETED';
      const response = await axios.get(`http://localhost:8767/api/v1/laboratory/requests?status=${status}`);
      return response.data;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Laboratory Dashboard</h1>
          <p className="text-gray-500">Manage lab requests, samples, and results.</p>
        </div>
        <div className="flex bg-white border rounded-lg p-1 shadow-sm">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${activeTab === 'pending' ? 'bg-primary text-white' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Pending Requests
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${activeTab === 'completed' ? 'bg-primary text-white' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Completed Results
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient name or request ID..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b text-xs uppercase text-gray-500 font-semibold">
                <th className="px-6 py-4">Request Date</th>
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Tests Requested</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading requests...</td></tr>
              ) : requests?.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No {activeTab} requests found.</td></tr>
              ) : requests?.map((req: any) => (
                <tr key={req.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium">{format(new Date(req.created_at), 'dd MMM yyyy, hh:mm a')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-gray-800">{req.patient_name}</p>
                    <p className="text-xs text-gray-400">ID: {req.id.substring(0, 8)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">Multiple Tests</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      req.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="bg-accent hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                      Enter Results
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

export default LabDashboard;
