import { useState } from 'react';
import {
  UserIcon as HeroUserIcon,
  BuildingOfficeIcon, // Hospital
  BriefcaseIcon, // Department
  CheckCircleIcon, // Success status (used for minimalist modal)
  XCircleIcon, // Error status / Close button
} from '@heroicons/react/24/outline';
import {
    ClockIcon, // Loading state
} from '@heroicons/react/24/solid';

const IconWrapper = ({ children }) => <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">{children}</span>;

// --- Modal Component ---
function ResultsModal({ isOpen, onClose, result, formData }) {
    if (!isOpen) return null;

    const patientName = formData.name || 'Patient';
    const hospitalName = formData.hospital || 'a hospital';
    const departmentName = formData.department || 'a department';
    const tokenNumber = result.token_number || 'N/A';

    // Construct the single, minimalist message string based on user request format
    const confirmationMessage = (
        <p className="text-xl text-gray-800 leading-normal">
            <span className="font-extrabold text-indigo-600">{patientName}</span>, your appointment is confirmed at <span className="font-semibold">{hospitalName}</span>, in the <span className="font-semibold">{departmentName}</span> department.
            <br />
            Your token number is: <span className="text-3xl font-extrabold text-green-600">{tokenNumber}</span>.
        </p>
    );

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-w-lg w-full transform transition-all">
                
                {/* Close Button at the top right */}
                <button 
                    onClick={onClose} 
                    className="text-gray-400 hover:text-gray-600 transition-colors absolute top-4 right-4"
                    aria-label="Close"
                >
                    <XCircleIcon className="w-6 h-6" />
                </button>

                {/* Body: Minimalist Content */}
                <div className="mt-4 pt-4 text-center space-y-6">
                    
                    {/* Status Icon */}
                    <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                        <CheckCircleIcon className="w-8 h-8 text-green-600" />
                    </div>
                    
                    {confirmationMessage}
                </div>

                {/* Footer Button */}
                <div className="mt-8 pt-4 border-t border-gray-100">
                    <button
                        onClick={onClose}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

// ResultField helper component has been removed as it is no longer required for the minimalist view.


// --- Form Input Components ---

function FormInput({ id, label, type, name, value, onChange, icon, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        <IconWrapper>{icon}</IconWrapper>
        <input
          type={type}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="block w-full py-3 pr-3 pl-10 border border-gray-300 bg-white text-gray-900 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
        />
      </div>
    </div>
  );
}

function FormSelect({ id, label, name, value, onChange, icon, options }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        <IconWrapper>{icon}</IconWrapper>
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className="block w-full py-3 pr-3 pl-10 border border-gray-300 bg-white text-gray-900 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out appearance-none"
        >
          {options.map((option) => (
            <option key={option.value} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
}


function RegistrationForm() {
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
    const [isModalOpen, setIsModalOpen] = useState(false); // State for the modal

    // Handler must be defined here to be used in FormSelect
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

    // Basic Validation
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
        // Simulate API call (1.5 seconds latency)
        await new Promise(resolve => setTimeout(resolve, 1500));

        const randomToken = `TKN-${Math.floor(Math.random() * 900) + 100}`;
        const mockStatus = "Registered & Assigned";
        
        // Mock doctor assignment based on the selected department
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

        setIsModalOpen(true); // Open the modal on success
        
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
        // Optional: Clear form data after closing modal
        // setFormData({ name: "", hospital: "", department: "" });
    }


  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex items-center justify-center transition-colors duration-300 font-inter">
      <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-2xl max-w-xl w-full">
        <form onSubmit={submitHandler}>
          <div className="text-center mb-8 pb-4 border-b-2 border-indigo-200">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-600 tracking-tight">
              Patient Registration
            </h1>
             <p className="text-gray-500 mt-2">Enter the required details to receive your assignment token.</p>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            
                <FormInput
                  id="name"
                  label="Patient Full Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  icon={<HeroUserIcon className="w-5 h-5 text-gray-400" />}
                  placeholder="e.g., John Smith"
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
           
        {/* Modal component renders here */}
        <ResultsModal 
            isOpen={isModalOpen} 
            onClose={closeModal} 
            result={registrationResult} 
            formData={formData} 
        />
      </div>
    </div>
  );
}

export default RegistrationForm;
