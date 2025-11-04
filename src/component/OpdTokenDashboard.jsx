import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

const OpdTokenDashboard = () => {
  const { hospitalId } = useOutletContext();
  const navigate = useNavigate();
  const [hospitalName, setHospitalName] = useState('Loading...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHospitalDetails = async () => {
      if (!hospitalId) {
        setHospitalName('No hospital assigned');
        return;
      }
      try {
        const response = await fetch('https://hospital-management-system-backend-gky9.onrender.com/api/hospitals');
        if (!response.ok) {
          throw new Error('Failed to fetch hospitals');
        }
        const hospitals = await response.json();
        const currentHospital = hospitals.find(h => h._id === hospitalId);
        if (currentHospital) {
          setHospitalName(currentHospital.name);
        } else {
          setHospitalName('Unknown Hospital');
        }
      } catch (err) {
        setError(err.message);
        setHospitalName('Error loading hospital');
      }
    };

    fetchHospitalDetails();
  }, [hospitalId]);

  const handleGenerateToken = () => {
    // Navigate to the registration form, passing the hospitalId
    navigate('/register-patient', { state: { preselectedHospitalId: currentHospital } });
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">OPD Token Management for {hospitalName}</h1>
      
      {error && <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">{error}</p>}

      {/* Token Generation */}
      <div className="mb-6">
        <button 
          onClick={handleGenerateToken}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 disabled:bg-gray-400"
          disabled={!hospitalId}
        >
          Generate New Token for a Patient
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
              {/* This section would be populated with live token data */}
              <tr className="hover:bg-gray-50">
                <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                  Live token data for this hospital will be displayed here.
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
