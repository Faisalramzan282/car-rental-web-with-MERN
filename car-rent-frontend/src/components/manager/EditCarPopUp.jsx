import React, { useState } from 'react';
import allActions from '../../store/actions/index';
import { useDispatch } from 'react-redux';
const EditCar = ({ carData, onClose }) => {
  // Initialize the state with the carData prop
  const [car, setCar] = useState(carData);
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCar({
      ...car,
      [name]: value,
    });
  };

  const updateCar = () => {
    console.log('Updated Car Data:', car);
    dispatch(allActions.editCar(car));
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-slate-500 border border-8 border-red-900">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Car</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Car Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2"
            name="carName" // Use name attribute
            value={car.carName}
            onChange={handleInputChange} 
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Model</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2"
            name="model"
            value={car.model}
            onChange={handleInputChange} 
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Car Color</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2"
            name="carColor"
            value={car.carColor}
            onChange={handleInputChange} 
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Availability</label>
          <select
            className="w-full border border-gray-300 rounded-lg p-2"
            name="availability"
            value={car.availability}
            onChange={handleInputChange} 
          >
            <option value="available">Available</option>
            <option value="not-available">Not Available</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            onClick={updateCar}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover-bg-blue-700"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg ml-2 hover-bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCar;
