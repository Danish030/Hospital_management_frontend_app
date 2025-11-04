import React, { useState } from 'react';

const mockBeds = [
  { id: 1, bedNumber: '101-A', roomNumber: '101', status: 'Occupied', patient: 'John Doe' },
  { id: 2, bedNumber: '101-B', roomNumber: '101', status: 'Available', patient: null },
  { id: 3, bedNumber: '102-A', roomNumber: '102', status: 'Available', patient: null },
  { id: 4, bedNumber: '102-B', roomNumber: '102', status: 'Occupied', patient: 'Jane Smith' },
  { id: 5, bedNumber: '201-A', roomNumber: '201', status: 'Occupied', patient: 'Peter Jones' },
  { id: 6, bedNumber: '201-B', roomNumber: '201', status: 'Available', patient: null },
];

const BedManagement = () => {
  const [beds, setBeds] = useState(mockBeds);

  const toggleBedStatus = (id) => {
    setBeds(beds.map(bed => 
      bed.id === id 
        ? { ...bed, status: bed.status === 'Available' ? 'Occupied' : 'Available', patient: bed.status === 'Available' ? 'New Patient' : null }
        : bed
    ));
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Bed Management</h1>
      <div className="shadow-lg overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bed Number</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {beds.map((bed) => (
              <tr key={bed.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{bed.bedNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bed.roomNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    bed.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {bed.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bed.patient || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => toggleBedStatus(bed.id)}
                    className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
                  >
                    {bed.status === 'Available' ? 'Admit' : 'Discharge'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BedManagement;
