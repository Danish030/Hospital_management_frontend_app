// Layout.jsx (Finalized Design with Header, Full-Width Hero Background, and State Logic)
import { useNavigate } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import React, { useState } from 'react';
import Card from './Card'; 
import FeatureCard from './FeatureCard'; 
import HospitalDashboard from './HospitalDashboard'; // Assuming this is available
import queueImage from '../assets/queue.png';
import bedTrackingImage from '../assets/bedTracking.png';
import patientImage from '../assets/patient.png';
import Footer from './Footer';

// --- Placeholder for HospitalDashboard (if not fully defined) ---
const MockHospitalDashboard = ({ hospital, onBack }) => (
    <div className="text-center p-10 bg-white shadow-lg rounded-xl">
        <h2 className="text-3xl font-bold text-indigo-700">Dashboard View for: {hospital}</h2>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded">Back to Selection</button>
    </div>
);


// --- Feature Data (Content remains unchanged) ---
const featureData = [
  {
    imageSrc: queueImage,
    title: "Real-time Patient Queue",
    description: "Patients can check their expected wait time and queue position, reducing anxiety and crowding.",
    linkHref: "/queue-status"
  },
  {
    imageSrc: bedTrackingImage,
    title: "Instant Bed Occupancy Status",
    description: "Get an accurate, live view of bed availability across all wards to optimize patient assignment and transfer times.",
    linkHref: "/bed-tracker"
  },
  {
    imageSrc: patientImage,
    title: "Hospital Performance Analytics",
    description: "Access smart dashboards with KPIs like patient turnover rate, occupancy trends, and service efficiency reports.",
    linkHref: "/analytics-dashboard"
  }
];

const Layout = () => {
  // 1. State for managing view
const navigate = useNavigate();
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [showHospitalList, setShowHospitalList] = useState(false); // To explicitly show the list view



  const onSelectHospital = (hospital) => {
    setSelectedHospital(hospital);
    setShowHospitalList(false); // Hide list when hospital is selected
  };
  // show hospital
const showCard = () => {
      // This routes the user to the path defined in App.jsx
      navigate('/Card'); 
  };

  const handleRegisterPatient = () => {
        // This is the function that redirects to the new form page
        navigate('/register-patient'); 
    };
  const handleBack = () => {
    setSelectedHospital(null);
    setShowHospitalList(false);
  };
  
  const handleAdminLogin = () => alert("Redirecting to Admin Login Portal...");

  const handleLogoClick = () => { setSelectedHospital(null); setShowHospitalList(false); };
  const handleViewStatus = () => { setShowHospitalList(true); };


  // --- Conditional Full-Page Rendering ---
  if (selectedHospital) {
    return (
      // Full-screen container for the dashboard
      <div className="min-h-screen w-full bg-gray-50 p-6 md:p-10">
        <HospitalDashboard hospital={selectedHospital} onBack={handleBack} />
      </div>
    );
  }
  
  // --- Hospital List View (Triggered by CTA) ---
  if (showHospitalList) {
        return (
            <div className="max-w-7xl mx-auto p-6 md:p-10 bg-gray-50 min-h-screen">
                <div className="flex justify-between items-center mb-8 border-b pb-4">
                    <h2 className="text-3xl font-bold text-indigo-700">Select Hospital Location</h2>
                    <button 
                        onClick={handleBack} 
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-150"
                    >
                        Back to Home
                    </button>
                </div>
                {/* Renders the list of hospitals using the Card component */}
                <Card onSelectHospital={onSelectHospital} />
            </div>
        );
    }


  // --- Default View: Refreshed 75%/25% Content ---
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
        
        {/* 1. STICKY HEADER */}
        <div className="sticky top-0 z-30 bg-white shadow-md">
            <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
                <div onClick={handleLogoClick} className="flex items-center space-x-2 cursor-pointer">
                    <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-5-8a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    <span className="text-xl font-bold text-indigo-700">HealthFlow</span>
                </div>
                <nav className="space-x-4">
                    <button onClick={handleRegisterPatient} className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200">
                        Register a Patient
                    </button>
                    <button onClick={handleAdminLogin} className="px-4 py-2 border border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition duration-200">
                        Admin Login
                    </button>
                </nav>
            </div>
        </div>

        {/* --- HERO SECTION WRAPPER (Full-Width Background) --- */}
        <div className="w-full bg-indigo-50/50 pt-10 pb-12 mb-12 shadow-inner"> 
            
            <div className="max-w-7xl mx-auto p-6 md:p-10 w-full pt-0 pb-0">

                {/* Main Title Section (Centrally aligned above the 75/25 split) */}
                <header className="mb-12 text-center">
                    <h1 className="text-5xl font-extrabold text-indigo-700 leading-tight">
                        Welcome to the Hospital Queue & Bed Management System
                    </h1>
                    <p className="mt-3 text-xl text-gray-600">
                        Efficiently manage patient flow, bed availability, and hospital operations — all in one place.
                    </p>
                </header>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Column: 75% for Text Content (Features) - CLEAN CARD DESIGN */}
                    <div className="lg:w-3/4">
                        <section 
                            className="bg-white p-8 rounded-xl shadow-lg border border-indigo-100 h-full" 
                        >
                            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-indigo-600 pl-3">
                                Our system is designed to simplify hospital management by:
                            </h2>

                            <ul className="space-y-6 text-lg text-gray-700">
                                <li className="flex items-start">
                                    <div>
                                        <strong className="text-indigo-700">Streamlining Patient Registration:</strong> 
                                        Allow patients to register quickly and get real-time queue updates.
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <div>
                                        <strong className="text-indigo-700">Tracking Bed Availability:</strong> 
                                        Keep accurate records of occupied and available beds across all departments.
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <div>
                                        <strong className="text-indigo-700">Providing Smart Dashboards:</strong> 
                                        Visualize patient flow, occupancy rates, and hospital analytics for better decision-making.
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <div>
                                        <strong className="text-indigo-700">Admin Control Panel:</strong> 
                                        Manage patients, admissions, and discharges with ease.
                                    </div>
                                </li>
                            </ul>

                            <p className="mt-8 text-xl font-medium text-gray-600 border-t pt-4 border-gray-200">
                                Whether you’re a patient or an administrator, this platform ensures transparency, speed, and reliability in healthcare operations.
                            </p>
                            <p className="mt-4 text-2xl font-bold text-red-600">
                                Making hospital management smarter, faster, and more organized.
                            </p>
                        </section>
                    </div>

                    {/* Right Column: 25% for the CTA/Sidebar - CLEAN CARD STYLING */}
                    <div className="lg:w-1/4">
                        <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 sticky top-10">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                                View Live Hospital Status
                            </h3>
                            <p className="text-sm text-gray-500 mb-4 text-center">
                                Click below to see current bed occupancy and queue status.
                            </p>
                            {/* Prominent CTA to trigger the list view */}
                            <button 
                                onClick={showCard} 
                                className="w-full py-3 bg-red-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-200 transform hover:scale-[1.02]"
                            >
                                Select Hospital →
                            </button>
                            
                            {/* Placeholder/Note */}
                            <div className="mt-6 border-t pt-4">
                                <p className="text-xs text-gray-400 text-center">
                                    Hospital Admin? <a href="#" onClick={handleAdminLogin} className="text-indigo-600 hover:underline">Login here.</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        {/* --- END HERO SECTION --- */}


        {/* Feature Cards Section (Aligned with Hero Width) */}
        <div className="max-w-7xl mx-auto p-6 md:p-10 w-full pt-0">
            <div className="text-center mb-8 mt-16 border-t border-gray-200 pt-10">
                <h2 className="text-4xl font-extrabold text-indigo-700">Core System Features</h2>
                <p className="text-lg text-gray-500 mt-2">Discover how we organize your hospital operations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
                {featureData.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        imageSrc={feature.imageSrc} 
                        title={feature.title}
                        description={feature.description}
                        linkHref={feature.linkHref}
                    />
                ))}
            </div>
        </div>
        <Footer />
        
    </div>
  );
};

export default Layout;