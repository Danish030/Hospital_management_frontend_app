import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPinIcon, BuildingOffice2Icon, ArrowRightIcon, MagnifyingGlassIcon, ExclamationTriangleIcon, BoltIcon } from '@heroicons/react/24/outline';

const Card = () => { 
    const navigate = useNavigate();
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // New state for search

    // --- Data Fetching Logic (Unchanged) ---
    useEffect(() => {
        const fetchHospitals = async () => {
            setLoading(true);
            try {
                // Using the provided API endpoint
                const response = await fetch('https://hospital-management-system-backend-gky9.onrender.com/api/hospitals');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setHospitals(data);
                setError(null);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(`Failed to load data: ${err.message}. Please check the API status.`);
                setHospitals([]);
            } finally {
                setLoading(false);
            }
        };

        fetchHospitals();
    }, []);
    
    // --- Search Filtering Logic (New) ---
    const filteredHospitals = useMemo(() => {
        if (!searchTerm) return hospitals;
        
        const lowerCaseSearch = searchTerm.toLowerCase();
        
        return hospitals.filter(h => 
            h.name.toLowerCase().includes(lowerCaseSearch) ||
            (h.address && h.address.toLowerCase().includes(lowerCaseSearch))
        );
    }, [hospitals, searchTerm]);

    const showHospitalDashboard = (hospital) => {
        navigate('/HospitalDashboard', { state: { hospital } }); 
    };

    // --- Conditional Rendering for Loading and Error ---
    if (loading) {
        return (
            <div className="bg-white p-12 rounded-xl shadow-2xl border border-gray-100 flex flex-col items-center justify-center min-h-[300px] max-w-lg mx-auto">
                {/* Clean, primary color spinner */}
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
                <p className="text-gray-700 font-medium text-lg tracking-tight">Loading Hospital Directory...</p>
                <p className="text-sm text-gray-400 mt-1">Fetching data from the server.</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 p-6 rounded-xl shadow-xl border-2 border-red-300 max-w-lg mx-auto">
                <div className="flex items-center mb-3">
                    <ExclamationTriangleIcon className="w-6 h-6 text-red-600 mr-3" />
                    <h1 className="text-xl font-bold text-red-800">Connection Error</h1>
                </div>
                <p className="text-sm text-red-600 mb-2">{error}</p>
                <p className="text-xs text-red-500">Please verify the backend service status and refresh the page.</p>
            </div>
        );
    }

    // --- Main Component Render ---
    return (
        <div className="w-full max-w-xl mx-auto p-0">
            {/* Header Area */}
            <header className="mb-6 text-center">
                <div className="text-gray-800 mb-2">
                    <h1 className="text-3xl font-extrabold tracking-tight">
                        Hospital Selection
                    </h1>
                </div>
                <p className="text-gray-500 text-base">
                    Browse the list of available hospitals or use the search filter below.
                </p>
            </header>
            
            {/* Main Card Container */}
            <div className="bg-white rounded-xl shadow-2xl shadow-indigo-100/50 border border-gray-100 p-6 space-y-5">
                
                {/* Search Bar - Modern Input Style */}
                <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by hospital name or address..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-150 shadow-sm"
                    />
                </div>

                {/* Directory Header */}
                <h4 className="text-md font-semibold text-gray-700 pt-2 border-t border-gray-50">
                    {filteredHospitals.length} {filteredHospitals.length === 1 ? 'Hospital' : 'Hospitals'} Found
                </h4>

                {/* Hospital List - Scrollable Area */}
                <div className="max-h-[400px] overflow-y-auto pr-2"> {/* Added pr-2 for scrollbar padding */}
                    <div className="divide-y divide-gray-100">
                        {filteredHospitals.length === 0 ? (
                            <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
                                <span className="text-4xl block mb-2">😕</span>
                                <p className="font-medium">No matches found for "{searchTerm}"</p>
                                <p className="text-sm">Try broadening your search criteria.</p>
                            </div>
                        ) : (
                            filteredHospitals.map((h) => (
                                <button
                                    key={h._id}
                                    onClick={() => showHospitalDashboard(h)} 
                                    className="w-full text-left py-4 transition-all duration-250 flex items-center justify-between group rounded-md -mx-2 px-2 hover:bg-indigo-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                                >
                                    <div className="flex items-center flex-1 min-w-0">
                                        {/* Icon Placeholder for Hospital */}
                                        <div className="bg-indigo-100 p-2 rounded-full mr-3 shrink-0">
                                            <BuildingOffice2Icon className="w-5 h-5 text-indigo-600" />
                                        </div>
                                        
                                        <div className="min-w-0">
                                            <h2 className="text-base font-semibold text-gray-900 truncate group-hover:text-indigo-700 transition-colors">
                                                {h.name}
                                            </h2>
                                            <div className="flex items-center text-xs text-gray-500 mt-0.5">
                                                <MapPinIcon className="w-3.5 h-3.5 mr-1 shrink-0" />
                                                <span className="truncate">{h.address}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Button/Icon */}
                                    <div className="flex items-center text-indigo-500 ml-4 shrink-0">
                                        <span className="text-sm font-medium mr-2 hidden sm:inline transition-colors group-hover:text-indigo-700">View</span>
                                        <ArrowRightIcon className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:text-indigo-700" />
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Card;
