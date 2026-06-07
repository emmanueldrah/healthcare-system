import api from '../../config/api';
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
  ResponsiveContainer
} from 'recharts';
import { useFacilityStore } from '../../config/facilityMode';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const Dashboard = () => {
  const { mode, facilityName } = useFacilityStore();

  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
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
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Welcome back, {facilityName}</h1>
          <p className="text-gray-500 font-medium mt-1">Real-time facility overview and operations.</p>
        </div>
        <div className="flex space-x-3">
           <Button variant="outline" className="rounded-2xl h-12 shadow-sm border-gray-100">
             <Calendar className="w-4 h-4 mr-2" /> Schedule
           </Button>
           <Button variant="accent" className="rounded-2xl h-12 shadow-blue-100 px-6">
             <PlusCircle className="w-4 h-4 mr-2" /> Quick Action
           </Button>
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
          <Card key={i} className="p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-default group">
            <div className={`w-14 h-14 bg-${s.color}-50 text-${s.color}-600 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
              <s.icon className="w-7 h-7" />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">{s.label}</p>
            <p className="text-3xl font-black text-gray-900 mt-1">{s.val}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Chart */}
         <Card className="lg:col-span-2 border-none shadow-xl shadow-gray-100/50">
            <CardHeader
              title="Patient Throughput"
              subtitle="Analysis of patient flow throughout the day"
              icon={TrendingUp}
            />
            <div className="p-8">
               <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: '800', fill: '#94a3b8'}} dy={15} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: '800', fill: '#94a3b8'}} />
                      <Tooltip
                        cursor={{fill: '#f8fafc'}}
                        contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '12px'}}
                      />
                      <Bar dataKey="patients" fill="#0ea5e9" radius={[8, 8, 0, 0]} barSize={45} />
                    </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>
         </Card>

         {/* Quick Actions / Recent */}
         <div className="lg:col-span-1 space-y-8">
            <div className="bg-primary p-10 rounded-[2.5rem] text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden">
               <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
               <h3 className="text-2xl font-black mb-6 tracking-tight">Shortcuts</h3>
               <div className="space-y-4">
                  <button className="w-full bg-white/10 hover:bg-white/20 p-5 rounded-3xl flex items-center transition-all group">
                    <div className="p-3 bg-white/10 rounded-2xl mr-4 group-hover:bg-accent group-hover:text-white transition-colors">
                      <UserPlus className="w-5 h-5" />
                    </div>
                    <span className="font-black text-sm uppercase tracking-wider">Register Patient</span>
                  </button>
                  <button className="w-full bg-white/10 hover:bg-white/20 p-5 rounded-3xl flex items-center transition-all group">
                    <div className="p-3 bg-white/10 rounded-2xl mr-4 group-hover:bg-accent group-hover:text-white transition-colors">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <span className="font-black text-sm uppercase tracking-wider">New Consultation</span>
                  </button>
               </div>
            </div>

            <Card className="p-8 border-none shadow-xl shadow-gray-100/50">
               <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs mb-6">Recent Activity</h3>
               <div className="space-y-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-start">
                       <div className="w-3 h-3 bg-accent rounded-full mt-1.5 mr-4 shadow-lg shadow-blue-200"></div>
                       <div>
                         <p className="text-sm font-black text-gray-800">New Patient Entry</p>
                         <p className="text-xs text-gray-400 font-bold uppercase mt-0.5">10 mins ago</p>
                       </div>
                    </div>
                  ))}
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
