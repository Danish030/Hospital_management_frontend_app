import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserIcon, PhoneIcon, CalendarIcon } from '@heroicons/react/24/outline';

const FormInput = ({ id, label, type, icon, required = false }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative rounded-md shadow-sm">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        {icon}
      </span>
      <input
        type={type}
        id={id}
        className="block w-full py-3 pr-3 pl-10 border border-gray-300 bg-white text-gray-900 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
        required={required}
      />
    </div>
  </div>
);

const BookBed = () => {
  const { hospitalName, bedNumber } = useParams();
  const navigate = useNavigate();

  const handleBooking = (e) => {
    e.preventDefault();
    // In a real app, you'd handle the form submission here
    alert(`Bed ${bedNumber} at ${hospitalName} booked successfully!`);
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Book Your Bed</h1>
          <p className="text-gray-600 mt-2">
            You are booking bed <span className="font-semibold text-indigo-600">{bedNumber}</span> at <span className="font-semibold text-indigo-600">{hospitalName}</span>.
          </p>
        </div>
        <form onSubmit={handleBooking}>
          <div className="grid grid-cols-1 gap-6">
            <FormInput
              id="patient-name"
              label="Patient Name"
              type="text"
              icon={<UserIcon className="w-5 h-5 text-gray-400" />}
              required
            />
            <FormInput
              id="contact-number"
              label="Contact Number"
              type="tel"
              icon={<PhoneIcon className="w-5 h-5 text-gray-400" />}
              required
            />
            <FormInput
              id="admission-date"
              label="Preferred Admission Date"
              type="date"
              icon={<CalendarIcon className="w-5 h-5 text-gray-400" />}
              required
            />
          </div>
          <div className="mt-8">
            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 shadow-lg">
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookBed;
