// HospitalDashboard.jsx (Complete)
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Utility functions
const getBedStatusClass = (status) => {
    switch (status) {
        case 'Occupied': return 'bg-red-600 shadow-md';
        case 'Cleaning': return 'bg-green-500 shadow-md';
        case 'Empty': default: return 'bg-white border-2 border-gray-300 shadow-sm';
    }
};

// Reusable Metric Card Component
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

const HospitalDashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { hospital } = location.state || { hospital: { name: 'Default Hospital', _id: null } }; // Fallback

    const onBack = () => {
        navigate(-1); // Go back to the previous page
    };

    // --- State and Handlers ---
    const [viewMode, setViewMode] = useState('opd'); // Default view is 'opd'
    
    // --- OPD State and Data Fetching ---
    const [opdData, setOpdData] = useState({ queue: [], currentToken: 0, waitingCount: 0 });
    const [loadingOpd, setLoadingOpd] = useState(true);
    const [errorOpd, setErrorOpd] = useState(null);

    useEffect(() => {
        if (hospital?._id) {
            const fetchOpdData = async () => {
                setLoadingOpd(true);
                try {
                    const response = await fetch(`https://hospital-management-system-backend-gky9.onrender.com/api/opd/queue/${hospital._id}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch OPD data');
                    }
                    const data = await response.json();
                    
                    // The API returns an array of queue items directly
                    const queue = Array.isArray(data) ? data : [];
                    
                    // Calculate waiting count
                    const waitingPatients = queue.filter(p => p.status === 'Waiting');
                    const waitingCount = waitingPatients.length;
                    
                    // Determine the current token (lowest waiting token number, or 0 if none)
                    const currentToken = waitingCount > 0 
                        ? Math.min(...waitingPatients.map(p => p.tokenNumber)) 
                        : 0;

                    setOpdData({
                        queue: queue, // The full list of patients for the day
                        currentToken: currentToken,
                        waitingCount: waitingCount,
                    });
                    setErrorOpd(null);
                } catch (error) {
                    setErrorOpd(error.message);
                    setOpdData({ queue: [], currentToken: 0, waitingCount: 0 }); // Reset on error
                } finally {
                    setLoadingOpd(false);
                }
            };

            fetchOpdData();
        } else {
            setLoadingOpd(false);
            setErrorOpd("No hospital selected.");
        }
    }, [hospital?._id]);

    const handleRegisterPatient = () => {
        // You would typically navigate to a patient registration page, potentially passing the hospital ID
        navigate('/register-patient', { state: { hospitalId: hospital._id } }); 
    };

    // Bed Metrics and Mock Data 
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

    // --- Component for OPD Content ---
    const OPDContent = () => (
        <section className="animate-fade-in">
            <h4 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-red-600 pl-3">OPD Queue & Registration Status</h4>
            
            {loadingOpd && <div className="text-center p-10">Loading OPD data...</div>}
            {errorOpd && <div className="text-center p-10 text-red-500">{errorOpd}</div>}

            {!loadingOpd && !errorOpd && (
                <>
                    <div className="flex flex-col md:flex-row gap-6 mb-8">
                        <MetricCard header="Current Token Number" value={opdData.currentToken} colorClass="indigo" />
                        <MetricCard header="Patients in Waiting List" value={opdData.waitingCount} colorClass="red" />
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
                        <h5 className="text-xl font-semibold text-gray-700 mb-4">Patient Queue</h5>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Token</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {opdData.queue.length > 0 ? (
                                        opdData.queue.map((patient) => (
                                            <tr key={patient.tokenNumber}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{patient.tokenNumber}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{patient.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        patient.status === 'Waiting' ? 'bg-yellow-100 text-yellow-800' : 
                                                        patient.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {patient.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">No patients in the queue.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <button
                        onClick={handleRegisterPatient}
                        className="w-full py-3 bg-red-600 text-white text-lg font-semibold rounded-lg hover:bg-red-700 transition duration-200 shadow-xl"
                    >
                        Register New Patient
                    </button>
                </>
            )}
        </section>
    );

    // --- Component for Bed Content ---
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
            
            {/* Sticky button for available beds */}
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
            
            {/* Dashboard Header */}
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

            {/* Tab Navigation */}
            <div 
                className="flex justify-center border-b border-gray-200 mb-8"
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
            
            {/* Main Dashboard Content */}
            <div className="space-y-10">
                {viewMode === 'opd' && <OPDContent />}
                {viewMode === 'beds' && <BedContent />}
            </div>
        </div>
    );
};

export default HospitalDashboard;