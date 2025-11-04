import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Card from './Card'; 
import FeatureCard from './FeatureCard'; 
import HospitalDashboard from './HospitalDashboard';
import queueImage from '../assets/queue.png';
import bedTrackingImage from '../assets/bedTracking.png';
import patientImage from '../assets/patient.png';
import Footer from './Footer';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import doctorHero from '../assets/doctor-hero.jpg';

// --- Feature Data ---
const featureData = [
  {
    imageSrc: queueImage,
    title: "Real-time Patient Queue",
    description: "Patients can check their expected wait time and queue position, reducing anxiety and crowding.",
    linkHref: "#"
  },
  {
    imageSrc: bedTrackingImage,
    title: "Instant Bed Occupancy Status",
    description: "Get an accurate, live view of bed availability across all wards to optimize patient assignment.",
    linkHref: "#"
  },
  {
    imageSrc: patientImage,
    title: "Hospital Performance Analytics",
    description: "Access smart dashboards with KPIs like patient turnover, occupancy trends, and service efficiency.",
    linkHref: "#"
  }
];

const Layout = () => {
  const navigate = useNavigate();
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [showHospitalList, setShowHospitalList] = useState(false);

  const onSelectHospital = (hospital) => {
    setSelectedHospital(hospital);
    setShowHospitalList(false);
  };

  const showCard = () => {
      navigate('/Card'); 
  };

  const handleRegisterPatient = () => {
      navigate('/register-patient'); 
  };

  const handleAdminLogin = () => {
      navigate('/adminLogin');
  };

  const handleBack = () => {
    setSelectedHospital(null);
    setShowHospitalList(false);
  };

  const handleLogoClick = () => {
    setSelectedHospital(null);
    setShowHospitalList(false);
    navigate('/');
  };

  // --- Conditional Full-Page Rendering ---
  if (selectedHospital) {
    return (
      <div className="min-h-screen w-full bg-gray-50 p-6 md:p-10">
        <HospitalDashboard hospital={{ name: selectedHospital }} onBack={handleBack} />
      </div>
    );
  }
  
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
        <Card onSelectHospital={onSelectHospital} />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans">
        
        {/* 1. STICKY HEADER */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                <div onClick={handleLogoClick} className="flex items-center space-x-2 cursor-pointer">
                    <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-5-8a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    <span className="text-2xl font-bold text-indigo-700">HealthFlow</span>
                </div>
                <nav className="hidden md:flex items-center space-x-4">
                    <button onClick={handleRegisterPatient} className="px-5 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300 transform hover:scale-105">
                        Register Patient
                    </button>
                    <button onClick={handleAdminLogin} className="px-5 py-2 border border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition duration-300">
                        Admin Login
                    </button>
                </nav>
            </div>
        </header>

        {/* --- HERO SECTION --- */}
        <main className="grow">
          <div className="relative bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
              <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                <svg
                  className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                  fill="currentColor"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <polygon points="50,0 100,0 50,100 0,100" />
                </svg>

                <div className="relative pt-6 px-4 sm:px-6 lg:px-8" />

                <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                  <div className="sm:text-center lg:text-left">
                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                      <span className="block text-indigo-600 xl:inline">Streamline Your</span>{' '}
                      <span className="block text-gray-800 xl:inline">Hospital's Workflow</span>
                    </h1>
                    <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                      HealthFlow provides a seamless, real-time solution for patient queueing, bed management, and operational analytics. Empower your staff and enhance patient care.
                    </p>
                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                      <div className="rounded-md shadow">
                        <button
                          onClick={showCard}
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                        >
                          View Hospitals <ArrowRightIcon className="w-5 h-5 ml-2" />
                        </button>
                      </div>
                      <div className="mt-3 sm:mt-0 sm:ml-3">
                        <button
                          onClick={handleRegisterPatient}
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                        >
                          Register as a Patient
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <img
                className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                src={doctorHero}
                alt="Doctor"
              />
            </div>
          </div>

          {/* --- HOW IT WORKS SECTION --- */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">How It Works</h2>
                <p className="mt-4 text-lg text-gray-600">A simple, three-step process for patients and administrators.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                <div className="p-6">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mx-auto mb-6 text-3xl font-bold">1</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Hospital</h3>
                  <p className="text-gray-600">Browse our network of hospitals and view their real-time bed availability and OPD status.</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mx-auto mb-6 text-3xl font-bold">2</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Register or Book</h3>
                  <p className="text-gray-600">Register for an OPD token or book an available bed directly from the dashboard.</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mx-auto mb-6 text-3xl font-bold">3</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Real-Time Updates</h3>
                  <p className="text-gray-600">Receive live updates on your queue status or booking confirmation, all in one place.</p>
                </div>
              </div>
            </div>
          </section>

          {/* --- CORE FEATURES SECTION --- */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Core System Features</h2>
                <p className="mt-4 text-lg text-gray-600">Discover how we organize your hospital operations.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          </section>
        </main>
        
        <Footer />
    </div>
  );
};

export default Layout;