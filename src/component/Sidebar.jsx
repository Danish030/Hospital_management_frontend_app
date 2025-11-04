import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HomeIcon, TicketIcon, ViewfinderCircleIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  const navigate = useNavigate();
  const navLinkClasses = ({ isActive }) =>
    `flex items-center px-4 py-3 text-gray-700 rounded-lg transition-colors duration-200 ${
      isActive ? 'bg-indigo-200 text-indigo-800 font-semibold' : 'hover:bg-gray-200'
    }`;

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="w-64 h-screen bg-white shadow-lg p-4 flex flex-col">
      <div>
        <div className="flex items-center mb-8">
          <ViewfinderCircleIcon className="w-10 h-10 text-indigo-600" />
          <h1 className="ml-3 text-2xl font-bold text-gray-800">Admin</h1>
        </div>
        <nav className="space-y-2">
          <NavLink to="/admin/opd-token" className={navLinkClasses}>
            <TicketIcon className="w-6 h-6 mr-3" />
            OPD Tokens
          </NavLink>
          <NavLink to="/admin/bed-management" className={navLinkClasses}>
            <HomeIcon className="w-6 h-6 mr-3" />
            Bed Management
          </NavLink>
        </nav>
      </div>
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
        >
          <ArrowLeftOnRectangleIcon className="w-6 h-6 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
