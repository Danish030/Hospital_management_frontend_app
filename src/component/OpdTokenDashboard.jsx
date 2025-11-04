import React from 'react';
import { useLocation } from 'react-router-dom';

const OpdTokenDashboard = () => {
  const location = useLocation();
  const hospital = location.state?.hospital || 'No hospital selected';

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">OPD Token Management for {hospital}</h1>
      
      {/* Hospital Selection Dropdown */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <label htmlFor="hospital-select" className="block text-sm font-medium text-gray-700 mb-1">
          Hospital
        </label>
        <select
          id="hospital-select"
          name="hospital-select"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-gray-100 cursor-not-allowed"
          value={hospital}
          disabled
        >
          <option>{hospital}</option>
        </select>
      </div>

      {/* Token Generation */}
      <div className="mb-6">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          Generate New Token
        </button>
      </div>

      {/* Token List */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Current Tokens</h2>
        <div className="shadow-md overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Token Number
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Patient Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Populate with token data */}
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#001</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sample Patient</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OpdTokenDashboard;
