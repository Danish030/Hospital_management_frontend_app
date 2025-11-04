// HospitalDashboard.jsx (Book Bed button is sticky)

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
// Utility functions (unchanged)
const getBedStatusClass = (status) => {
  switch (status) {
    case 'Occupied': return 'bg-red-600 shadow-md';
    case 'Cleaning': return 'bg-green-500 shadow-md';
    case 'Empty': default: return 'bg-white border-2 border-gray-300 shadow-sm';
  }
};

const HospitalDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hospital } = location.state || { hospital: { name: 'Default Hospital' } }; // Fallback

  const onBack = () => {
    navigate(-1); // Go back to the previous page
  };

  // --- State and Handlers ---
  const [viewMode, setViewMode] = useState('opd'); // Default view is 'opd'
  
  // OPD Metrics (Unchanged)
  const [currentQueue] = useState(101);
  const [waitingList] = useState(5);
    const handleRegisterPatient = () => {
        // This is the function that redirects to the new form page
        navigate('/register-patient'); 
    };

  // Bed Metrics and Mock Data (Unchanged)
  const initialBeds = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1, type: i < 8 ? 'ICU' : 'Gen', status: i < 3 ? 'Occupied' : i < 6 ? 'Cleaning' : 'Empty',
  }));
  const [beds] = useState(initialBeds);
  const totalBeds = beds.length;
  const emptyICUBeds = beds.filter(b => b.type === 'ICU' && b.status === 'Empty').length;
  const emptyGenBeds = beds.filter(b => b.type === 'Gen' && b.status === 'Empty').length;
  const handleBookBed = (bed) => {
    if (bed.status === 'Empty') {
      navigate(`/book-bed/${hospital.name}/${bed.id}`);
    } else {
      alert(`Bed ${bed.id} is currently ${bed.status}.`);
    }
  };

  const handleBookFirstAvailable = () => {
    const firstAvailableBed = beds.find(b => b.status === 'Empty');
    if (firstAvailableBed) {
      navigate(`/book-bed/${hospital.name}/${firstAvailableBed.id}`);
    } else {
      alert('No available beds at the moment.');
    }
  };

  // --- Reusable Metric Card Component (Unchanged) ---
  const MetricCard = ({ header, value, colorClass }) => (
    <div className="flex flex-col flex-1 bg-white shadow-lg border border-gray-100 rounded-xl overflow-hidden transition duration-300 hover:shadow-xl">
      <div className={`pt-4 pb-2 px-6 border-b border-${colorClass}-200 bg-${colorClass}-50`}>
        <span className={`text-sm font-semibold text-${colorClass}-700`}>
          {header}
        </span>
      </div>
      <div className="p-4 text-center">
        <p className={`text-6xl font-extrabold text-${colorClass}-700`}> 
          {value}
        </p>
      </div>
    </div>
  );

  // --- Component for OPD Content (Unchanged) ---
  const OPDContent = () => (
    <section className="animate-fade-in">
      <h4 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-red-600 pl-3">OPD Queue & Registration Status</h4>
      <div className="flex flex-col md:flex-row gap-6 mb-6">
          <MetricCard header="Current Token Number" value={currentQueue} colorClass="indigo" />
          <MetricCard header="Patients in Waiting List" value={waitingList} colorClass="red" />
      </div>
      <button
          onClick={handleRegisterPatient}
          className="w-full py-3 bg-red-600 text-white text-lg font-semibold rounded-lg hover:bg-red-700 transition duration-200 shadow-xl"
      >
          Register New Patient
      </button>
    </section>
  );

  // --- Component for Bed Content (UPDATED STICKY BUTTON) ---
  const BedContent = () => (
    <section className="animate-fade-in">
        <h4 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-indigo-600 pl-3">Bed Capacity Overview</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <MetricCard header="Total Bed Capacity" value={totalBeds} colorClass="indigo" />
            <MetricCard header="Available ICU Beds" value={emptyICUBeds} colorClass="red" />
            <MetricCard header="Available General Beds" value={emptyGenBeds} colorClass="green" />
        </div>

        <h5 className="text-xl font-semibold text-gray-700 mb-4">Detailed Bed Status Map</h5>

        <div className="flex flex-wrap justify-center sm:justify-start space-x-6 mb-6 text-sm font-medium">
            <span className="flex items-center"><span className="w-4 h-4 bg-red-600 rounded mr-2"></span>Occupied</span>
            <span className="flex items-center"><span className="w-4 h-4 bg-green-500 rounded mr-2"></span>Cleaning</span>
            <span className="flex items-center"><span className="w-4 h-4 bg-white border border-gray-400 rounded mr-2"></span>Empty</span>
        </div>

        <div className="grid grid-cols-6 sm:grid-cols-10 gap-3 p-4 bg-gray-100 rounded-lg border border-gray-200 mb-20">
            {beds.map((bed) => (
                <div 
                    key={bed.id}
                    onClick={() => handleBookBed(bed)}
                    className={`h-16 flex flex-col justify-center items-center rounded-lg cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-indigo-400 transition duration-150 ${getBedStatusClass(bed.status)} ${bed.status !== 'Empty' ? 'text-white' : 'text-gray-700'}`}
                >
                    <span className="text-sm font-extrabold leading-tight">B-{bed.id}</span> 
                    <span className={`text-xs ${bed.status !== 'Empty' ? 'text-gray-100' : 'text-gray-500'} leading-none`}>{bed.type}</span>
                </div>
            ))}
        </div>
        
        {/* Make this button sticky to the bottom of the viewport */}
        <div className="sticky bottom-0 left-0 right-0 p-4 bg-gray-50/90 backdrop-blur-sm -mx-6 md:-mx-10 border-t border-gray-200 z-10">
            <button 
                onClick={handleBookFirstAvailable}
                className="w-full py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 shadow-lg"
            >
                Book an Available Bed
            </button>
        </div>
    </section>
  );


  return (
    <div className="min-h-[90vh] bg-gray-50 rounded-xl shadow-2xl p-6 md:p-10">
      
      {/* --- Dashboard Header (Sticky top-0 retained for general screen stability) --- */}
      <div className="flex justify-between items-center pb-6 border-b border-gray-200 mb-8 bg-white p-4 -mx-6 -mt-6 md:-mx-10 md:-mt-10 rounded-t-xl sticky top-0 z-20 shadow-sm">
        <h3 className="text-3xl font-bold text-indigo-700">
          {hospital.name} Dashboard
        </h3>
        <button 
          onClick={onBack} 
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-150 flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Selection
        </button>
      </div>

      {/* --- Tab Navigation (NOT STICKY, but centered) --- */}
      <div 
        className="flex justify-center border-b border-gray-200 mb-8"
        // Removed sticky top-20 and background classes
      >
        <button
          onClick={() => setViewMode('opd')}
          className={`px-6 py-3 text-lg font-semibold transition duration-150 ${
            viewMode === 'opd' 
              ? 'border-b-4 border-red-600 text-red-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          OPD & Queue
        </button>
        <button
          onClick={() => setViewMode('beds')}
          className={`px-6 py-3 text-lg font-semibold transition duration-150 ${
            viewMode === 'beds' 
              ? 'border-b-4 border-indigo-600 text-indigo-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Bed Management
        </button>
      </div>
      
      {/* --- Main Dashboard Content (Conditional Rendering) --- */}
      <div className="space-y-10">
        {viewMode === 'opd' && <OPDContent />}
        {viewMode === 'beds' && <BedContent />}
      </div>
    </div>
  );
};

export default HospitalDashboard;