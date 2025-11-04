import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminDashboardLayout = () => {
  const location = useLocation();
  const { adminName, hospitalId } = location.state || {};

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar adminName={adminName} />
      <main className="flex-1 p-6">
        {/* Pass context to nested routes */}
        <Outlet context={{ hospitalId, adminName }} />
      </main>
    </div>
  );
};

export default AdminDashboardLayout;
