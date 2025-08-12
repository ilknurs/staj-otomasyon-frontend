import React from 'react';
import Sidebar from './sidebar';
import Navbar from './navbar';

export default function DashboardLayout({ userName, children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar userName={userName} />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
