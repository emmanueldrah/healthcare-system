import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserPlus, Search, MoreVertical, Phone, Calendar, User } from 'lucide-react';
import { format, differenceInYears } from 'date-fns';

const PatientList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const { data: patients, isLoading } = useQuery({
    queryKey: ['patients', searchTerm],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:8767/api/v1/patients/?search=${searchTerm}`);
      return response.data;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Patient Records</h1>
          <p className="text-gray-500">View and manage electronic medical records.</p>
        </div>
        <button className="bg-accent hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center shadow-sm transition-colors">
          <UserPlus className="w-5 h-5 mr-2" /> Register New Patient
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, patient ID or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b text-xs uppercase text-gray-500 font-semibold">
                <th className="px-6 py-4">Patient Name</th>
                <th className="px-6 py-4">Patient ID</th>
                <th className="px-6 py-4">Age / Gender</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {isLoading ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">Loading patients...</td></tr>
              ) : patients?.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">No patients found.</td></tr>
              ) : patients?.map((patient: any) => (
                <tr
                  key={patient.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/patients/${patient.id}`)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center font-bold overflow-hidden">
                        {patient.photo_path ? (
                          <img src={patient.photo_path} alt="" />
                        ) : (
                          <User className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold text-gray-800">{patient.full_name}</p>
                        {patient.allergies && (
                           <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold uppercase">Allergies</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-gray-600">{patient.patient_id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700">
                      {differenceInYears(new Date(), new Date(patient.dob))} YRS / {patient.gender}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-xs text-gray-500">
                      <Phone className="w-3 h-3 mr-2" /> {patient.phone || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      patient.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {patient.is_active ? 'Active' : 'Inactive'}
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

export default PatientList;
