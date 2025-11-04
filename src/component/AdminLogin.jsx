import { useState } from 'react';
import {
  UserIcon as HeroUserIcon,
  BuildingOfficeIcon, // Hospital
  BriefcaseIcon, // Department
  CheckCircleIcon, // Success status (used for minimalist modal)
  XCircleIcon, // Error status / Close button
  ArrowLeftOnRectangleIcon, // Logout
  KeyIcon, // Password
} from '@heroicons/react/24/outline';
import {
    ClockIcon, // Loading state
    UserCircleIcon, // Admin icon
} from '@heroicons/react/24/solid';

const IconWrapper = ({ children }) => <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">{children}</span>;


// ===============================================
// 1. UTILITY COMPONENTS (Modal, Inputs)
// ===============================================



// ===============================================
// 2. VIEW: ADMIN PANEL (Separated Component)
// ===============================================

function AdminPanel({ adminData, onLogout }) {
    return (
        <div className="text-center p-4 sm:p-8 space-y-8">
            <UserCircleIcon className="w-24 h-24 mx-auto text-indigo-600" />
            <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
                Welcome, {adminData.username}!
            </h1>
            <div className="bg-indigo-50 p-6 rounded-2xl shadow-md border-2 border-indigo-200">
                <p className="text-lg font-semibold text-indigo-700">
                    You are currently managing the panel for:
                </p>
                <p className="text-3xl font-extrabold text-indigo-900 mt-2">
                    {adminData.hospital}
                </p>
                <p className="text-sm text-indigo-500 mt-2">
                    Here you would see metrics, patient queue, and administrative controls.
                </p>
            </div>

            <button
                onClick={onLogout}
                className="w-full sm:w-auto flex items-center justify-center mx-auto py-3 px-6 border border-transparent rounded-xl shadow-lg text-lg font-semibold text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
                <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" /> Log Out
            </button>
        </div>
    );
}

// ===============================================
// 3. VIEW: ADMIN LOGIN (Separated Component)
// ===============================================

function AdminLogin({ onLoginSuccess, onGoBack }) {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [loginError, setLoginError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const mockAdmins = {
        'admin_city': { password: 'pass123', hospital: 'City General Hospital' },
        'admin_stjude': { password: 'pass123', hospital: 'St. Jude\'s Medical Center' },
    };

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        setLoginError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError(null);
        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 1000));

        const admin = mockAdmins[credentials.username];
        
        if (admin && admin.password === credentials.password) {
            onLoginSuccess({ username: credentials.username, hospital: admin.hospital });
        } else {
            setLoginError("Invalid username or password. Please try again.");
        }

        setIsLoading(false);
    };

    return (
        <>
            <div className="text-center mb-8 pb-4 border-b-2 border-indigo-200">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-600 tracking-tight">
                    Admin Login
                </h1>
                <p className="text-gray-500 mt-2">Access your hospital's administrative panel.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6">
                    <FormInput
                        id="username"
                        label="Username"
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        icon={<HeroUserIcon className="w-5 h-5 text-gray-400" />}
                        placeholder="e.g., admin_city"
                    />
                    <FormInput
                        id="password"
                        label="Password"
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        icon={<KeyIcon className="w-5 h-5 text-gray-400" />}
                        placeholder="••••••••"
                    />
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-lg font-semibold text-white transition-all duration-300 ease-in-out transform hover:scale-[1.01] 
                        ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`}
                    >
                        {isLoading ? (
                            <div className="flex items-center">
                                <ClockIcon className="w-5 h-5 mr-3 animate-spin" />
                                Logging In...
                            </div>
                        ) : (
                            "Log In"
                        )}
                    </button>
                    {loginError && (
                        <p className="mt-4 text-sm text-red-600 flex items-center p-3 bg-red-50 rounded-xl border border-red-300">
                            <XCircleIcon className="w-5 h-5 mr-2" /> {loginError}
                        </p>
                    )}
                </div>
            </form>
            <div className="mt-6 text-center">
                <button
                    onClick={onGoBack}
                    className="text-sm text-gray-500 hover:text-indigo-600 font-medium transition-colors"
                >
                    &larr; Back to Patient Registration
                </button>
            </div>
        </>
    );
}

// ===============================================
// 4. VIEW: PATIENT REGISTRATION (Separated Component)
// ===============================================

function PatientRegistration({ setView }) {
    const [formData, setFormData] = useState({
        name: "",
        hospital: "",
        department: "",
    });

    const [registrationResult, setRegistrationResult] = useState({
        token_number: null,
        assigned_doctor: null,
        assigned_department: null,
        status: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [submissionError, setSubmissionError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setSubmissionError(null); 
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    async function submitHandler(event) {
        event.preventDefault();
        setSubmissionError(null);

        if (!formData.name || !formData.hospital || !formData.department) {
            setSubmissionError("Please provide the Patient Name and select both a Hospital and a Department.");
            return;
        }

        setIsLoading(true);
        setRegistrationResult({
            token_number: null,
            assigned_doctor: null,
            assigned_department: null,
            status: "Processing...",
        });

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Custom logic for "Danish Ansari" with token 767
            let randomToken;
            if (formData.name.toLowerCase().trim() === 'danish ansari') {
                randomToken = '767';
            } else {
                randomToken = `TKN-${Math.floor(Math.random() * 900) + 100}`;
            }

            const mockStatus = "Registered & Assigned";
            let mockDoctor = 'Dr. Staff Member';
            if (formData.department === 'Cardiology') mockDoctor = 'Dr. Elias Thorne';
            if (formData.department === 'Neurology') mockDoctor = 'Dr. Anya Sharma';
            if (formData.department === 'Pediatrics') mockDoctor = 'Dr. Kenji Sato';


            setRegistrationResult({
                token_number: randomToken,
                assigned_doctor: mockDoctor,
                assigned_department: formData.department,
                status: mockStatus,
            });

            setIsModalOpen(true);
            
        } catch (error) {
            setSubmissionError("Registration failed due to a system error.");
            setRegistrationResult({
                token_number: null,
                assigned_doctor: null,
                assigned_department: null,
                status: "Failed",
            });
            console.error("API simulation error:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const hospitalOptions = [
      { value: "", label: "Select Hospital..." },
      { value: "City General Hospital", label: "City General Hospital" },
      { value: "St. Jude's Medical Center", label: "St. Jude's Medical Center" },
      { value: "Main Government Clinic", label: "Main Government Clinic" },
    ];

    const departmentOptions = [
        { value: "", label: "Select Department..." },
        { value: "Cardiology", label: "Cardiology" },
        { value: "Neurology", label: "Neurology" },
        { value: "Pediatrics", label: "Pediatrics" },
        { value: "Orthopedics", label: "Orthopedics" },
        { value: "Oncology", label: "Oncology" },
    ];

    const closeModal = () => {
        setIsModalOpen(false);
    }


  return (
    <>
        <div className="text-center mb-8 pb-4 border-b-2 border-indigo-200">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-600 tracking-tight">
                Patient Registration System
            </h1>
            <p className="text-gray-500 mt-2">Enter the required details to receive your assignment token.</p>
        </div>
        
        <form onSubmit={submitHandler}>
            <div className="grid grid-cols-1 gap-6">
                
                <FormInput
                    id="name"
                    label="Patient Full Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    icon={<HeroUserIcon className="w-5 h-5 text-gray-400" />}
                    placeholder="e.g., Danish Ansari"
                />

                <FormSelect
                    id="hospital"
                    label="Select Target Hospital"
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleChange}
                    icon={<BuildingOfficeIcon className="w-5 h-5 text-gray-400" />}
                    options={hospitalOptions}
                />
                <FormSelect
                    id="department"
                    label="Select Target Department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    icon={<BriefcaseIcon className="w-5 h-5 text-gray-400" />}
                    options={departmentOptions}
                />

            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-lg font-semibold text-white transition-all duration-300 ease-in-out transform hover:scale-[1.01] 
                    ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`}
                >
                    {isLoading ? (
                        <div className="flex items-center">
                            <ClockIcon className="w-5 h-5 mr-3 animate-spin" />
                            Assigning Records...
                        </div>
                    ) : (
                        "Register & Get Assignment"
                    )}
                </button>
                {submissionError && (
                    <p className="mt-4 text-sm text-red-600 flex items-center p-3 bg-red-50 rounded-xl border border-red-300">
                        <XCircleIcon className="w-5 h-5 mr-2" /> {submissionError}
                    </p>
                )}
            </div>
        </form>
        
        {/* Admin Login Link */}
        <div className="mt-6 text-center">
            <button
                onClick={() => setView('admin-login')}
                className="text-sm text-gray-500 hover:text-indigo-600 font-medium transition-colors"
            >
                Are you an **Admin**? Click here to log in.
            </button>
        </div>
           
        {/* Modal component renders here */}
        <ResultsModal 
            isOpen={isModalOpen} 
            onClose={closeModal} 
            result={registrationResult} 
            formData={formData} 
        />
    </>
  );
}


// ===============================================
// 5. MAIN APP COMPONENT (Router)
// ===============================================

function HospitalApp() {
    const [view, setView] = useState('patient-registration'); 
    const [loggedInAdmin, setLoggedInAdmin] = useState(null); 

    const handleLoginSuccess = (adminData) => {
        setLoggedInAdmin(adminData);
        setView('admin-panel');
    };

    const handleLogout = () => {
        setLoggedInAdmin(null);
        setView('patient-registration');
    };

    const renderView = () => {
        if (view === 'admin-panel' && loggedInAdmin) {
            return <AdminPanel adminData={loggedInAdmin} onLogout={handleLogout} />;
        }
        
        switch (view) {
            case 'admin-login':
                return <AdminLogin onLoginSuccess={handleLoginSuccess} onGoBack={() => setView('patient-registration')} />;
            case 'patient-registration':
            default:
                return <PatientRegistration setView={setView} />;
        }
    };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex items-center justify-center transition-colors duration-300 font-inter">
      <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-2xl max-w-xl w-full">
        {renderView()}
      </div>
    </div>
  );
}

export default HospitalApp;
