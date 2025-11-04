import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserIcon,
  LockClosedIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const IconWrapper = ({ children }) => (
  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
    {children}
  </span>
);

function FormInput({
  id,
  label,
  type,
  name,
  value,
  onChange,
  icon,
  placeholder,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
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

function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    adminId: "",
    password: "",
  });
  const [error, setError] = useState("");

  const mockAdmins = [
    { adminId: 'admin', password: 'password', hospital: 'Apollo Hospital' },
    { adminId: 'admin2', password: 'password2', hospital: 'Fortis Hospital' },
  ];

  function handleChange(event) {
    const { name, value } = event.target;
    setError("");
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    if (!formData.adminId || !formData.password) {
      setError("Please enter both Admin ID and Password.");
      return;
    }
    
    const admin = mockAdmins.find(
      (a) => a.adminId === formData.adminId && a.password === formData.password
    );

    if (admin) {
      navigate("/admin/opd-token", { state: { hospital: admin.hospital } });
    } else {
      setError("Invalid Admin ID or Password.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex items-center justify-center transition-colors duration-300 font-inter">
      <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-2xl max-w-md w-full">
        <form onSubmit={submitHandler}>
          <div className="text-center mb-8 pb-4 border-b-2 border-indigo-200">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-600 tracking-tight">
              Admin Login
            </h1>
            <p className="text-gray-500 mt-2">
              Access the hospital management dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <FormInput
              id="adminId"
              label="Admin ID"
              type="text"
              name="adminId"
              value={formData.adminId}
              onChange={handleChange}
              icon={<UserIcon className="w-5 h-5 text-gray-400" />}
              placeholder="e.g., ADMIN-001"
            />
            <FormInput
              id="password"
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              icon={<LockClosedIcon className="w-5 h-5 text-gray-400" />}
              placeholder="••••••••"
            />
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out transform hover:scale-[1.01]"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
              Login
            </button>
            {error && (
              <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
