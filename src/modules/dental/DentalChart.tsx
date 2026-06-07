import api from '../../config/api';
import React, { useState } from 'react';
import { Activity, ShieldAlert, Save, Info } from 'lucide-react';

const DentalChart = () => {
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);

  // Adult teeth 1-32
  const upperTeeth = Array.from({ length: 16 }, (_, i) => i + 1);
  const lowerTeeth = Array.from({ length: 16 }, (_, i) => 32 - i);

  const Tooth = ({ num }: { num: number }) => (
    <div
      onClick={() => setSelectedTooth(num)}
      className={`relative w-12 h-16 border-2 flex flex-col items-center justify-center cursor-pointer transition-all rounded-lg ${
        selectedTooth === num ? 'border-accent bg-blue-50 shadow-md ring-2 ring-blue-100' : 'border-gray-200 hover:border-blue-200'
      }`}
    >
      <span className="text-[10px] font-bold text-gray-400 absolute top-1">{num}</span>
      <svg className="w-8 h-8 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M7 3C7 3 4 5 4 12C4 19 12 21 12 21C12 21 20 19 20 12C20 5 17 3 17 3H7Z" />
        <path d="M12 21V12" />
      </svg>
      {/* Visual indicators for conditions could go here */}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Interactive Dental Chart</h1>
          <p className="text-gray-500">Select a tooth to record conditions or procedures.</p>
        </div>
        <div className="flex space-x-2">
           <button className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center shadow-md">
             <Save className="w-4 h-4 mr-2" /> Save Chart
           </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <div className="space-y-12">
          {/* Upper Arch */}
          <div className="space-y-2">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest text-center">Upper Arch (Maxillary)</p>
            <div className="flex justify-center space-x-1">
              {upperTeeth.map(num => <Tooth key={num} num={num} />)}
            </div>
          </div>

          {/* Lower Arch */}
          <div className="space-y-2">
            <div className="flex justify-center space-x-1">
              {lowerTeeth.map(num => <Tooth key={num} num={num} />)}
            </div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest text-center">Lower Arch (Mandibular)</p>
          </div>
        </div>

        {selectedTooth && (
          <div className="mt-12 bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-200 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-accent text-white rounded-xl flex items-center justify-center text-2xl font-black shadow-lg">
                  {selectedTooth}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Tooth #{selectedTooth} Details</h3>
                  <p className="text-gray-500">Record condition and planned treatment for this tooth.</p>
                </div>
              </div>
              <button onClick={() => setSelectedTooth(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
               <div className="space-y-4">
                 <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Tooth Condition</label>
                 <select className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-accent bg-white shadow-sm">
                   <option>Healthy / Normal</option>
                   <option>Cavity (Caries)</option>
                   <option>Missing</option>
                   <option>Impacted</option>
                   <option>Filled</option>
                   <option>Root Canal</option>
                   <option>Extraction Recommended</option>
                   <option>Crown / Bridge</option>
                 </select>
               </div>
               <div className="space-y-4">
                 <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Clinical Notes</label>
                 <textarea className="w-full border rounded-xl p-3 h-24 outline-none focus:ring-2 focus:ring-accent bg-white shadow-sm" placeholder="Additional observations..."></textarea>
               </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center">
            <Info className="w-4 h-4 mr-2 text-accent" /> Chart Legend
          </h3>
          <div className="space-y-2">
            <div className="flex items-center text-xs">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div> <span>Decayed (Caries)</span>
            </div>
            <div className="flex items-center text-xs">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div> <span>Filled</span>
            </div>
            <div className="flex items-center text-xs">
              <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div> <span>Missing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DentalChart;
