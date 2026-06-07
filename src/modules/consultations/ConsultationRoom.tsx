import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import {
  Save,
  Stethoscope,
  Activity,
  ClipboardList,
  FilePlus,
  Search,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const ConsultationRoom = () => {
  const { id: patientId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'vitals' | 'notes' | 'diagnosis'>('vitals');

  const [vitals, setVitals] = useState({
    weight: '',
    height: '',
    bp_systolic: '',
    bp_diastolic: '',
    temperature: '',
    pulse: '',
    oxygen_saturation: ''
  });

  const [notes, setNotes] = useState({
    chief_complaint: '',
    history_presenting_illness: '',
    examination_findings: '',
    treatment_plan: ''
  });

  const { data: patient } = useQuery({
    queryKey: ['patient', patientId],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:8767/api/v1/patients/${patientId}`);
      return response.data;
    }
  });

  const calculateBMI = () => {
    if (vitals.weight && vitals.height) {
      const h = parseFloat(vitals.height) / 100;
      const w = parseFloat(vitals.weight);
      return (w / (h * h)).toFixed(1);
    }
    return 'N/A';
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-primary text-white p-3 rounded-xl shadow-md">
            <Stethoscope className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">New Consultation</h1>
            <p className="text-gray-500 font-medium">Patient: {patient?.full_name} ({patient?.patient_id})</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border text-gray-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-50 transition-colors shadow-sm">
            Save Draft
          </button>
          <button className="bg-accent text-white px-8 py-2 rounded-lg font-bold hover:bg-blue-600 transition-colors shadow-lg flex items-center">
            Complete Consultation <CheckCircle className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>

      {patient?.allergies && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex items-center shadow-sm">
          <AlertCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
          <p className="text-red-700 font-bold">ALLERGY ALERT: {patient.allergies}</p>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden min-h-[600px] flex flex-col">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('vitals')}
            className={`flex-1 py-4 text-sm font-bold flex items-center justify-center border-b-2 transition-colors ${activeTab === 'vitals' ? 'border-accent text-accent bg-blue-50' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}
          >
            <Activity className="w-4 h-4 mr-2" /> VITALS & MEASUREMENTS
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex-1 py-4 text-sm font-bold flex items-center justify-center border-b-2 transition-colors ${activeTab === 'notes' ? 'border-accent text-accent bg-blue-50' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}
          >
            <ClipboardList className="w-4 h-4 mr-2" /> CLINICAL NOTES
          </button>
          <button
            onClick={() => setActiveTab('diagnosis')}
            className={`flex-1 py-4 text-sm font-bold flex items-center justify-center border-b-2 transition-colors ${activeTab === 'diagnosis' ? 'border-accent text-accent bg-blue-50' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}
          >
            <FilePlus className="w-4 h-4 mr-2" /> DIAGNOSIS & PLAN
          </button>
        </div>

        <div className="p-8 flex-1 overflow-y-auto">
          {activeTab === 'vitals' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="space-y-6">
                 <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b pb-2">Physical</h3>
                 <div className="space-y-4">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                     <input type="number" step="0.1" className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-accent" placeholder="0.0" />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                     <input type="number" step="0.1" className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-accent" placeholder="0" />
                   </div>
                   <div className="bg-gray-50 p-4 rounded-xl border border-dashed text-center">
                     <p className="text-xs text-gray-500 font-bold uppercase mb-1">Calculated BMI</p>
                     <p className="text-2xl font-black text-primary">{calculateBMI()}</p>
                   </div>
                 </div>
               </div>

               <div className="space-y-6">
                 <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b pb-2">Vital Signs</h3>
                 <div className="space-y-4">
                   <div className="grid grid-cols-2 gap-2">
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Systolic (mmHg)</label>
                       <input type="number" className="w-full border rounded-lg p-2.5 outline-none" placeholder="120" />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Diastolic (mmHg)</label>
                       <input type="number" className="w-full border rounded-lg p-2.5 outline-none" placeholder="80" />
                     </div>
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Temperature (°C)</label>
                     <input type="number" step="0.1" className="w-full border rounded-lg p-2.5 outline-none" placeholder="36.5" />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Pulse (bpm)</label>
                     <input type="number" className="w-full border rounded-lg p-2.5 outline-none" placeholder="72" />
                   </div>
                 </div>
               </div>

               <div className="space-y-6">
                 <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b pb-2">Respiratory</h3>
                 <div className="space-y-4">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Resp. Rate (cpm)</label>
                     <input type="number" className="w-full border rounded-lg p-2.5 outline-none" placeholder="16" />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">SPO2 (%)</label>
                     <input type="number" className="w-full border rounded-lg p-2.5 outline-none" placeholder="98" />
                   </div>
                 </div>
               </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-8">
               <div className="space-y-2">
                 <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Chief Complaint</label>
                 <textarea className="w-full border rounded-xl p-4 min-h-[100px] outline-none focus:ring-2 focus:ring-accent" placeholder="What is the patient reporting?"></textarea>
               </div>
               <div className="space-y-2">
                 <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">History of Presenting Illness</label>
                 <textarea className="w-full border rounded-xl p-4 min-h-[150px] outline-none focus:ring-2 focus:ring-accent" placeholder="Provide more context on the complaint..."></textarea>
               </div>
               <div className="space-y-2">
                 <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Physical Examination Findings</label>
                 <textarea className="w-full border rounded-xl p-4 min-h-[150px] outline-none focus:ring-2 focus:ring-accent" placeholder="What were your clinical findings?"></textarea>
               </div>
            </div>
          )}

          {activeTab === 'diagnosis' && (
            <div className="space-y-8">
               <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center">
                    <Search className="w-5 h-5 mr-2 text-accent" /> Diagnosis (ICD-10)
                  </h3>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" className="w-full pl-12 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-accent shadow-sm" placeholder="Search for ICD-10 codes or disease names..." />
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center border-2 border-dashed">
                    <p className="text-gray-400 text-sm">No diagnoses added yet. Search and select from above.</p>
                  </div>
               </div>

               <div className="space-y-2">
                 <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Treatment Plan</label>
                 <textarea className="w-full border rounded-xl p-4 min-h-[150px] outline-none focus:ring-2 focus:ring-accent" placeholder="Describe the treatment plan, drugs to prescribe, labs to request..."></textarea>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultationRoom;
