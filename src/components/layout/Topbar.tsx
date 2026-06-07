import React from 'react';
import { Bell, User, Search, LogOut } from 'lucide-react';

const Topbar = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b">
      <div className="flex items-center bg-gray-100 rounded-md px-3 py-1.5 w-96">
        <Search className="w-4 h-4 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search patients, appointments..."
          className="bg-transparent border-none focus:ring-0 text-sm w-full"
        />
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-400 hover:text-accent relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center space-x-3 border-l pl-4">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-700">Dr. Kofi Mensah</p>
            <p className="text-xs text-gray-400">Super Admin</p>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-gray-500" />
          </div>
          <button className="p-2 text-gray-400 hover:text-red-500">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
