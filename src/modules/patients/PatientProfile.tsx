import api from '../../config/api';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  ArrowLeft,
  AlertTriangle,
  Calendar,
  Phone,
  MapPin,
  Clock,
  FileText,
  FlaskConical,
  Pill,
  History,
  Activity
} from 'lucide-react';
import { format, differenceInYears } from 'date-fns';

const PatientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: patient, isLoading } = useQuery({
    queryKey: ['patient', id],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:8767/api/v1/patients/${id}`);
      return response.data;
    }
  });

  if (isLoading) return <div className="p-8 text-center">Loading patient profile...</div>;
  if (!patient) return <div className="p-8 text-center text-red-500">Patient not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button onClick={() => navigate('/patients')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Patient Profile</h1>
      </div>

      {/* Critical Allergy Banner */}
      {patient.allergies && (
        <div className="bg-red-600 text-white p-4 rounded-xl shadow-lg flex items-center animate-pulse">
          <AlertTriangle className="w-8 h-8 mr-4 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-lg uppercase tracking-wider">Known Allergies / Flags</h3>
            <p className="text-red-50">{patient.allergies}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Info Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex flex-col items-center text-center pb-6 border-b">
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center font-bold text-4xl text-gray-400 mb-4 border-4 border-white shadow-md overflow-hidden">
                {patient.photo_path ? <img src={patient.photo_path} alt="" /> : patient.full_name.charAt(0)}
              </div>
              <h2 className="text-xl font-bold text-gray-900">{patient.full_name}</h2>
              <p className="text-accent font-mono font-medium">{patient.patient_id}</p>
              <div className="flex mt-3 space-x-2">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full">{patient.gender}</span>
                <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full">{differenceInYears(new Date(), new Date(patient.dob))} Years</span>
              </div>
            </div>

            <div className="pt-6 space-y-4">
              <div className="flex items-center text-sm">
                <Calendar className="w-4 h-4 text-gray-400 mr-3" />
                <span className="text-gray-500 mr-2">DOB:</span>
                <span className="font-medium">{format(new Date(patient.dob), 'dd MMM yyyy')}</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="w-4 h-4 text-gray-400 mr-3" />
                <span className="text-gray-500 mr-2">Phone:</span>
                <span className="font-medium">{patient.phone || 'N/A'}</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="w-4 h-4 text-gray-400 mr-3" />
                <span className="text-gray-500 mr-2">Address:</span>
                <span className="font-medium text-right ml-auto">{patient.address || 'N/A'}</span>
              </div>
              <div className="flex items-center text-sm">
                <ShieldCheck className="w-4 h-4 text-gray-400 mr-3" />
                <span className="text-gray-500 mr-2">NHIS:</span>
                <span className="font-medium">{patient.nhis_number || 'None'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <Activity className="w-4 h-4 mr-2 text-accent" /> Clinical Information
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Blood Group</p>
                <p className="text-lg font-bold text-red-600">{patient.blood_group || 'Unknown'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Chronic Conditions</p>
                <p className="text-sm font-medium">{patient.chronic_conditions || 'None recorded'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Timeline & Modules */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <History className="w-5 h-5 mr-2 text-accent" /> Medical Timeline
              </h3>
              <div className="flex space-x-2">
                <button className="text-xs font-bold bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors">ALL</button>
                <button className="text-xs font-bold text-gray-400 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">VISITS</button>
                <button className="text-xs font-bold text-gray-400 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">LABS</button>
              </div>
            </div>

            <div className="relative border-l-2 border-gray-100 ml-4 pl-8 space-y-8 pb-4">
               {/* Placeholder for visits */}
               <div className="text-center py-12">
                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
                   <Clock className="w-8 h-8 text-gray-300" />
                 </div>
                 <p className="text-gray-400">No medical history found for this patient yet.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;

function ShieldCheck({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}
