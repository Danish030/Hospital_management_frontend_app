import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        department: 'General',
        hospitalId: '', // To store the selected hospital's ID
    });
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({
        name: '',
        hospitalName: '',
        department: '',
        tokenNumber: '',
    });

    // Fetch hospitals from the API when the component mounts
    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const response = await fetch('https://hospital-management-system-backend-gky9.onrender.com/api/hospitals');
                if (!response.ok) {
                    throw new Error('Failed to fetch hospitals list.');
                }
                const data = await response.json();
                setHospitals(data);
                // Pre-select the first hospital in the list
                if (data.length > 0) {
                    setFormData(prev => ({ ...prev, hospitalId: data[0]._id }));
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHospitals();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.hospitalId || !formData.name) {
            alert('Please fill in your name and select a hospital.');
            return;
        }
        setSubmitting(true);
        setError(null);

        try {
            // Send data to the token generation endpoint
            const response = await fetch('https://hospital-management-system-backend-gky9.onrender.com/api/opd/generatetoken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    department: formData.department,
                    hospitalId: formData.hospitalId,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to generate token.');
            }

            // Find the full hospital name from the ID
            const hospitalName = hospitals.find(h => h._id === formData.hospitalId)?.name || 'the hospital';

            // Set content for and show the modal
            setModalContent({
                name: result.patient.name,
                hospitalName: hospitalName,
                department: result.patient.department,
                tokenNumber: result.patient.tokenNumber,
            });
            setModalVisible(true);

        } catch (err) {
            setError(err.message);
            alert(`Error: ${err.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        navigate(-1); // Go back after closing the modal
    };

    const onBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-xl shadow-2xl p-8 space-y-8">

                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-gray-800">Patient Registration</h2>
                    <button
                        onClick={onBack}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-150"
                    >
                        Back
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="text-sm font-medium text-gray-700 block mb-2">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="e.g., John Doe"
                            required
                        />
                    </div>

                    {/* Hospital Selection (Populated from API) */}
                    <div>
                        <label htmlFor="hospitalId" className="text-sm font-medium text-gray-700 block mb-2">Hospital</label>
                        <select
                            id="hospitalId"
                            name="hospitalId"
                            value={formData.hospitalId}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            disabled={loading || hospitals.length === 0}
                        >
                            {loading ? (
                                <option>Loading hospitals...</option>
                            ) : (
                                hospitals.map(hospital => (
                                    <option key={hospital._id} value={hospital._id}>
                                        {hospital.name}
                                    </option>
                                ))
                            )}
                        </select>
                        {error && !loading && <p className="text-red-500 text-xs mt-1">{error}</p>}
                    </div>

                    {/* Department Selection */}
                    <div>
                        <label htmlFor="department" className="text-sm font-medium text-gray-700 block mb-2">Department</label>
                        <select
                            id="department"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="General">General</option>
                            <option value="Cardiology">Cardiology</option>
                            <option value="Neurology">Neurology</option>
                            <option value="Orthopedics">Orthopedics</option>
                            <option value="Medicine">Medicine</option>
                            <option value="Opthamology">Opthamology</option>
                            <option value="Urology">Urology</option>
                            <option value="Nephrology">Nephrology</option>
                            <option value="Dermatology">Dermatology</option>
                            <option value="ENT">ENT</option>
                            <option value="pediatrician">pediatrician</option>
                            <option value="Pulomonology">Pulomonology</option>
                            <option value="gasterology">gasterology</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={submitting || loading}
                            className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 transition duration-200"
                        >
                            {submitting ? 'Submitting...' : 'Generate Token'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Success Modal */}
            {modalVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full text-center transform transition-all scale-95 animate-fade-in-up">
                        <h3 className="text-3xl font-bold text-green-600 mb-4">Registration Successful!</h3>
                        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                            <span className="font-bold text-gray-900">{modalContent.name}</span>, you have booked an appointment at <span className="font-bold text-gray-900">{modalContent.hospitalName}</span> in the <span className="font-bold text-gray-900">{modalContent.department}</span> department.
                        </p>
                        <div className="bg-indigo-50 p-6 rounded-lg mb-8 border border-indigo-200">
                            <p className="text-lg text-indigo-700 font-semibold">Your Token Number is:</p>
                            <p className="text-6xl font-extrabold text-indigo-600 tracking-wider">{modalContent.tokenNumber}</p>
                        </div>
                        <button
                            onClick={closeModal}
                            className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegistrationForm;
