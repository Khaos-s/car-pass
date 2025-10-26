import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Admindashboard/Sidebar';

export function Navigation() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        /* Custom scrollbar for a cleaner look */
        .sidebar { scrollbar-width: thin; scrollbar-color: #3b82f6 #f3f4f6; }
        .sidebar::-webkit-scrollbar { width: 6px; }
        .sidebar::-webkit-scrollbar-thumb { background-color: #3b82f6; border-radius: 3px; }
        .sidebar::-webkit-scrollbar-track { background-color: #f3f4f6; }
        .active-dashboard { position: relative; background-color: #2563eb; }
        .active-dashboard::after { content: ''; position: absolute; top: 0; right: 0; width: 1rem; height: 100%; background-color: #fff; z-index: 10; }
      `}</style>

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-64'}`}>
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}