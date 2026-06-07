import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Package, Search, Plus, MoreVertical, AlertTriangle, ArrowUpDown, Tag } from 'lucide-react';

const InventoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: drugs, isLoading } = useQuery({
    queryKey: ['drugs', searchTerm],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:8767/api/v1/pharmacy/drugs`);
      return response.data;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Drug & Supplies Inventory</h1>
          <p className="text-gray-500">Monitor stock levels, reorder points, and expiry dates.</p>
        </div>
        <button className="bg-accent hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center shadow-sm transition-colors">
          <Plus className="w-5 h-5 mr-2" /> Add New Drug
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mr-4">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Items</p>
              <p className="text-xl font-black text-gray-800">{drugs?.length || 0}</p>
            </div>
         </div>
         <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mr-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Low Stock</p>
              <p className="text-xl font-black text-red-600">0</p>
            </div>
         </div>
         {/* More stats if needed */}
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by drug name, generic or category..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b text-xs uppercase text-gray-500 font-semibold">
                <th className="px-6 py-4">Drug Name & Generic</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Stock Level</th>
                <th className="px-6 py-4">Unit Price</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading inventory...</td></tr>
              ) : drugs?.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No drugs found in inventory.</td></tr>
              ) : drugs?.map((drug: any) => (
                <tr key={drug.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-gray-800">{drug.name}</p>
                      <p className="text-xs text-gray-400 italic">{drug.generic_name || 'No generic name'}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                      <Tag className="w-3 h-3 mr-1" /> {drug.category || 'General'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                       <span className={`font-black text-sm ${drug.current_stock <= drug.reorder_level ? 'text-red-600' : 'text-green-600'}`}>
                         {drug.current_stock}
                       </span>
                       <span className="text-xs text-gray-400 ml-1">/{drug.unit}</span>
                    </div>
                    {drug.current_stock <= drug.reorder_level && (
                       <p className="text-[10px] text-red-500 font-bold uppercase mt-0.5 animate-pulse">Low Stock Alert</p>
                    )}
                  </td>
                  <td className="px-6 py-4 font-mono text-sm">
                    GHS {(drug.price_per_unit / 100).toFixed(2)}
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

export default InventoryManagement;
