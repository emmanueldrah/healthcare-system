import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ShieldCheck, Calendar, Filter, FileText, Download, CheckCircle2 } from 'lucide-react';

const NHISClaims = () => {
  const { data: claims, isLoading } = useQuery({
    queryKey: ['nhis-claims'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:8767/api/v1/billing/nhis-claims');
      return response.data;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">NHIS Claims Management</h1>
          <p className="text-gray-500">Generate monthly claim batches for submission to NHIA.</p>
        </div>
        <button className="bg-primary hover:bg-blue-900 text-white px-4 py-2 rounded-lg font-medium flex items-center shadow-sm">
          <Plus className="w-5 h-5 mr-2" /> New Claim Batch
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
          <div className="flex items-center space-x-2">
             <button className="text-xs font-bold bg-primary text-white px-3 py-1.5 rounded-lg shadow-sm font-bold uppercase">All Batches</button>
             <button className="text-xs font-bold text-gray-500 hover:bg-gray-100 px-3 py-1.5 rounded-lg uppercase">Submitted</button>
             <button className="text-xs font-bold text-gray-500 hover:bg-gray-100 px-3 py-1.5 rounded-lg uppercase">Paid</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b text-xs uppercase text-gray-500 font-semibold">
                <th className="px-6 py-4">Claim Month</th>
                <th className="px-6 py-4">Visits Count</th>
                <th className="px-6 py-4">Total Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading claims...</td></tr>
              ) : claims?.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No NHIS claims generated yet.</td></tr>
              ) : claims?.map((claim: any) => (
                <tr key={claim.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                       <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                       <span className="text-sm font-bold text-gray-800">{claim.month}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {claim.total_visits} visits
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-black text-gray-800">GHS {(claim.total_amount / 100).toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 uppercase">
                      {claim.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-accent p-1.5 transition-colors">
                      <Download className="w-5 h-5" />
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

export default NHISClaims;

function Plus({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
    </svg>
  );
}
