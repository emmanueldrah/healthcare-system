import api from '../../config/api';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CreditCard, Search, Plus, MoreVertical, Printer, Filter, ShieldCheck, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

const InvoiceForm = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'paid'>('all');

  const { data: bills, isLoading } = useQuery({
    queryKey: ['bills'],
    queryFn: async () => {
      const response = await api.get('/billing/bills');
      return response.data;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Billing & Payments</h1>
          <p className="text-gray-500">Manage patient invoices, insurance claims, and revenue.</p>
        </div>
        <button className="bg-accent hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center shadow-sm">
          <Plus className="w-5 h-5 mr-2" /> Create New Bill
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-l-4 border-l-blue-500">
            <p className="text-xs text-gray-400 font-bold uppercase mb-1">Total Revenue (Today)</p>
            <p className="text-2xl font-black text-gray-800">GHS 0.00</p>
         </div>
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-l-4 border-l-yellow-500">
            <p className="text-xs text-gray-400 font-bold uppercase mb-1">Outstanding Balance</p>
            <p className="text-2xl font-black text-gray-800">GHS 0.00</p>
         </div>
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-l-4 border-l-green-500">
            <p className="text-xs text-gray-400 font-bold uppercase mb-1">NHIS Pending Claims</p>
            <p className="text-2xl font-black text-gray-800">GHS 0.00</p>
         </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by invoice # or patient name..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b text-xs uppercase text-gray-500 font-semibold">
                <th className="px-6 py-4">Date & Invoice #</th>
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading bills...</td></tr>
              ) : bills?.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No invoices found.</td></tr>
              ) : bills?.map((bill: any) => (
                <tr key={bill.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-gray-800">{format(new Date(bill.created_at), 'dd MMM yyyy')}</p>
                    <p className="text-xs text-gray-400 font-mono">INV-{bill.id.substring(0, 8).toUpperCase()}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Patient #{bill.patient_id.substring(0, 8)}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-black text-gray-800">GHS {(bill.total_amount / 100).toFixed(2)}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Payable: GHS {(bill.patient_payable / 100).toFixed(2)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      bill.status === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {bill.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="text-gray-400 hover:text-accent p-1.5">
                      <Printer className="w-5 h-5" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 p-1.5">
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

export default InvoiceForm;
