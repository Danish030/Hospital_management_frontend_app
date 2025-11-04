import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Card = () => { 
    const navigate = useNavigate();
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHospitals = async () => {
            setLoading(true); // Ensure loading is true before fetch
            try {
                const response = await fetch('https://hospital-management-system-backend-gky9.onrender.com/api/hospitals');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setHospitals(data);
                setError(null); // Clear any previous errors
            } catch (err) {
                console.error("Fetch error:", err);
                setError(`Failed to load data: ${err.message}. Please check the API status.`);
                setHospitals([]); // Clear hospitals on error
            } finally {
                setLoading(false);
            }
        };

        fetchHospitals();
    }, []);
    
    const showHospitalDashboard = (hospital) => {
        // This routes the user to the path defined in App.jsx and passes the hospital object
        navigate('/HospitalDashboard', { state: { hospital } }); 
    };

    // --- Conditional Rendering for Loading and Error ---

    if (loading) {
        return (
            <div className="bg-white p-10 rounded-xl shadow-2xl border border-red-200 flex flex-col items-center justify-center min-h-[200px] sticky lg:top-8">
                <svg className="animate-spin h-8 w-8 text-red-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-600 font-medium">Loading Hospitals...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 p-6 rounded-xl shadow-lg border border-red-300 sticky lg:top-8">
                <h1 className="text-xl font-bold text-red-700 mb-2">Error Loading Data</h1>
                <p className="text-sm text-red-600">{error}</p>
                <p className="text-xs mt-2 text-red-500">Please check the network connection or the backend service.</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-2xl border border-red-200 sticky lg:top-8">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
                Select a Hospital
            </h1>
            
            <div className="w-full">
                <h4 className="text-lg font-semibold text-indigo-700 mb-3">Hospitals in Ranchi ({hospitals.length} Found)</h4>
                <div className="bg-gray-100 border border-gray-200 rounded-lg p-2 space-y-2 max-h-140 overflow-y-auto">
                    {hospitals.length === 0 ? (
                        <p className="p-3 text-center text-gray-500">No hospitals found.</p>
                    ) : (
                        hospitals.map((h) => (
                            <button
                                key={h._id}
                                onClick={() => showHospitalDashboard(h)} 
                                className="w-full text-left p-3 rounded-md transition-colors duration-150 flex flex-col hover:bg-white hover:shadow-sm text-indigo-700"
                            >
                                <span className="text-base font-medium">{h.name}</span>
                                <span className="text-xs text-gray-500 mt-0.5">{h.address}</span>
                            </button>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;
