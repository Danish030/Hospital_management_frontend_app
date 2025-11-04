// Card.jsx (Must be simplified for selection only)
import { useNavigate } from 'react-router-dom';
import HospitalDashboard from './HospitalDashboard';
const mockHospitals = [
    { id: 'h1', name: 'Orchid Medical Centre', address: 'Ranchi, Jharkhand' },
    { id: 'h2', name: 'RIMS (Rajendra Institute of Medical Sciences)', address: 'Ranchi, Jharkhand' },
    { id: 'h3', name: 'Kanke General Hospital', address: 'Kanke, Ranchi' },
    // ...
];

const Card = () => { 
  const navigate = useNavigate();
  const showHospitalDashboard = (hospital) => {
      // This routes the user to the path defined in App.jsx and passes the hospital object
      navigate('/HospitalDashboard', { state: { hospital } }); 
  };
  return (
    <div className="bg-white p-6 rounded-xl shadow-2xl border border-red-200 sticky lg:top-8">
      <h3 className="text-xl font-bold text-red-600 mb-4">
        Select a Hospital
      </h3>
      
      <div className="w-full">
        <h4 className="text-lg font-semibold text-indigo-700 mb-3">Hospitals in Ranchi</h4>
        <div className="bg-gray-100 border border-gray-200 rounded-lg p-2 space-y-2 max-h-80 overflow-y-auto">
          {mockHospitals.map((h) => (
            <button
              key={h.id}
               onClick={() => showHospitalDashboard(h)} 
              className="w-full text-left p-3 rounded-md transition-colors duration-150 flex flex-col hover:bg-white hover:shadow-sm text-indigo-700"
            >
              <span className="text-base font-medium">{h.name}</span>
              <span className="text-xs text-gray-500 mt-0.5">{h.address}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;