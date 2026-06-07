import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FileBarChart, Download, TrendingUp, Users, FlaskConical, Pill } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const Reports = () => {
  const data = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 2000 },
    { name: 'Apr', revenue: 2780 },
    { name: 'May', revenue: 1890 },
  ];

  const pieData = [
    { name: 'Consultation', value: 400 },
    { name: 'Pharmacy', value: 300 },
    { name: 'Laboratory', value: 300 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
          <p className="text-gray-500">Comprehensive overview of facility performance.</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center shadow-md">
          <Download className="w-4 h-4 mr-2" /> Export PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-accent" /> Revenue Trend (Last 5 Months)
            </h3>
            <div className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={data}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} />
                   <XAxis dataKey="name" />
                   <YAxis />
                   <Tooltip />
                   <Bar dataKey="revenue" fill="#1e3a5f" radius={[4, 4, 0, 0]} />
                 </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center">
              <FileBarChart className="w-5 h-5 mr-2 text-accent" /> Revenue Distribution
            </h3>
            <div className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={pieData}
                     innerRadius={60}
                     outerRadius={80}
                     paddingAngle={5}
                     dataKey="value"
                   >
                     {pieData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                     ))}
                   </Pie>
                   <Tooltip />
                 </PieChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: "Patients Seen", val: "1,240", icon: Users },
           { label: "Lab Tests", val: "450", icon: FlaskConical },
           { label: "Drugs Dispensed", val: "3,100", icon: Pill },
         ].map((s, i) => (
           <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-dashed text-center">
              <s.icon className="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm font-bold text-gray-500 uppercase">{s.label}</p>
              <p className="text-2xl font-black text-primary">{s.val}</p>
           </div>
         ))}
      </div>
    </div>
  );
};

export default Reports;
