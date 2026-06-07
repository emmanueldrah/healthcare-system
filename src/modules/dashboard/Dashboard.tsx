import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  Users,
  Calendar,
  Clock,
  TrendingUp,
  AlertCircle,
  Activity,
  PlusCircle,
  Stethoscope,
  UserPlus
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { useFacilityStore } from '../../config/facilityMode';

const Dashboard = () => {
  const { mode, facilityName } = useFacilityStore();

  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // Mock data for demo
      return {
        todayPatients: 24,
        appointments: 12,
        pendingLabs: 5,
        revenue: "GHS 1,450.00"
      };
    }
  });

  const chartData = [
    { name: '08:00', patients: 4 },
    { name: '10:00', patients: 10 },
    { name: '12:00', patients: 15 },
    { name: '14:00', patients: 8 },
    { name: '16:00', patients: 6 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Welcome back, {facilityName}</h1>
          <p className="text-gray-500 font-medium mt-1">Here is what's happening at your facility today.</p>
        </div>
        <div className="flex space-x-3">
           <button className="bg-white border-2 border-gray-100 text-gray-700 px-4 py-2 rounded-xl font-bold flex items-center hover:bg-gray-50 transition-all shadow-sm">
             <Calendar className="w-4 h-4 mr-2" /> Schedule
           </button>
           <button className="bg-accent text-white px-6 py-2 rounded-xl font-bold flex items-center hover:bg-blue-600 transition-all shadow-lg shadow-blue-100">
             <PlusCircle className="w-4 h-4 mr-2" /> Quick Action
           </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Today's Patients", val: stats?.todayPatients, icon: Users, color: "blue" },
          { label: "Appointments", val: stats?.appointments, icon: Clock, color: "yellow" },
          { label: "Pending Labs", val: stats?.pendingLabs, icon: Activity, color: "red" },
          { label: "Revenue Today", val: stats?.revenue, icon: TrendingUp, color: "green" },
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 bg-${s.color}-50 text-${s.color}-600 rounded-xl flex items-center justify-center mb-4`}>
              <s.icon className="w-6 h-6" />
            </div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{s.label}</p>
            <p className="text-2xl font-black text-gray-900 mt-1">{s.val}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Chart */}
         <div className="lg:col-span-2 bg-white p-8 rounded-3xl border shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-gray-800">Patient Flow</h3>
               <select className="text-xs font-bold bg-gray-50 border-none rounded-lg focus:ring-0">
                 <option>Today</option>
                 <option>Last 7 Days</option>
               </select>
            </div>
            <div className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={chartData}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                   <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 'bold', fill: '#9ca3af'}} dy={10} />
                   <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 'bold', fill: '#9ca3af'}} />
                   <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                   <Bar dataKey="patients" fill="#0ea5e9" radius={[6, 6, 0, 0]} barSize={40} />
                 </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Quick Actions / Recent */}
         <div className="lg:col-span-1 space-y-6">
            <div className="bg-primary p-8 rounded-3xl text-white shadow-xl">
               <h3 className="text-xl font-bold mb-4">Quick Shortcuts</h3>
               <div className="space-y-3">
                  <button className="w-full bg-blue-800/50 hover:bg-blue-800 p-4 rounded-2xl flex items-center transition-colors">
                    <UserPlus className="w-5 h-5 mr-3 text-blue-300" />
                    <span className="font-bold text-sm">Register Patient</span>
                  </button>
                  <button className="w-full bg-blue-800/50 hover:bg-blue-800 p-4 rounded-2xl flex items-center transition-colors">
                    <Stethoscope className="w-5 h-5 mr-3 text-blue-300" />
                    <span className="font-bold text-sm">Start Consultation</span>
                  </button>
               </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border shadow-sm">
               <h3 className="font-bold text-gray-800 mb-4">Recent Activity</h3>
               <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-start">
                       <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3"></div>
                       <div>
                         <p className="text-sm font-bold text-gray-800">New Patient Registered</p>
                         <p className="text-xs text-gray-400">10 minutes ago</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
