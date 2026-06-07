import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Bed, User, Plus, Search, Activity, MoreVertical, LayoutGrid } from 'lucide-react';

const WardManagement = () => {
  const { data: wards, isLoading: wardsLoading } = useQuery({
    queryKey: ['wards'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:8767/api/v1/hospital/wards');
      return response.data;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Ward & Inpatient Management</h1>
          <p className="text-gray-500">Monitor bed occupancy and manage patient admissions.</p>
        </div>
        <button className="bg-accent hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center shadow-sm">
          <Plus className="w-5 h-5 mr-2" /> Admit Patient
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {wardsLoading ? (
           <div className="col-span-full py-12 text-center text-gray-500 font-medium">Loading ward data...</div>
        ) : wards?.length === 0 ? (
           <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-dashed font-medium">No wards configured yet.</div>
        ) : wards?.map((ward: any) => (
          <div key={ward.id} className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
               <div className="flex items-center">
                 <div className="p-2 bg-blue-100 text-blue-600 rounded-lg mr-3">
                   <LayoutGrid className="w-5 h-5" />
                 </div>
                 <div>
                   <h3 className="font-bold text-gray-800">{ward.name}</h3>
                   <p className="text-xs text-gray-400 uppercase font-black">{ward.type} Ward</p>
                 </div>
               </div>
               <div className="text-right">
                 <p className="text-xs text-gray-400 font-bold">OCCUPANCY</p>
                 <p className="text-sm font-black text-accent">0 / {ward.capacity}</p>
               </div>
            </div>
            <div className="p-6 grid grid-cols-4 md:grid-cols-6 gap-3">
               {/* This would actually fetch beds for this ward */}
               {Array.from({ length: ward.capacity }).map((_, i) => (
                 <div key={i} className="flex flex-col items-center p-3 border rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                    <Bed className="w-6 h-6 text-gray-300" />
                    <span className="text-[10px] font-bold text-gray-500 mt-1">B-{i+1}</span>
                 </div>
               ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WardManagement;
