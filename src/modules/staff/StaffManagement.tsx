import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { UserPlus, Search, MoreVertical, BadgeCheck, Mail, Phone } from 'lucide-react';

const StaffManagement = () => {
  const { data: staff, isLoading } = useQuery({
    queryKey: ['staff'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:8767/api/v1/staff/');
      return response.data;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Staff Management</h1>
          <p className="text-gray-500">Manage all facility personnel and their roles.</p>
        </div>
        <button className="bg-accent hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center shadow-sm transition-colors">
          <UserPlus className="w-5 h-5 mr-2" /> Add Staff Member
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, ID or role..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent outline-none"
            />
          </div>
          <div className="flex space-x-2">
            <select className="border rounded-lg px-3 py-2 text-sm outline-none">
              <option>All Roles</option>
              <option>Doctor</option>
              <option>Nurse</option>
              <option>Pharmacist</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b text-xs uppercase text-gray-500 font-semibold">
                <th className="px-6 py-4">Staff Member</th>
                <th className="px-6 py-4">ID & Role</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading staff data...</td></tr>
              ) : staff?.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No staff members found.</td></tr>
              ) : staff?.map((member: any) => (
                <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                        {member.full_name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold text-gray-800">{member.full_name}</p>
                        <p className="text-xs text-gray-400">{member.specialization || 'General'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-700">{member.staff_id}</p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      {member.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-xs text-gray-500 mb-1">
                      <Mail className="w-3 h-3 mr-2" /> {member.email || 'N/A'}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Phone className="w-3 h-3 mr-2" /> {member.phone || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      member.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {member.status}
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

export default StaffManagement;
