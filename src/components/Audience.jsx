import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AudienceCreationForm = () => {
  const [criteria, setCriteria] = useState([{ field: '', operator: '', value: '' }]);
  const [logic, setLogic] = useState('AND');
  const [audienceSize, setAudienceSize] = useState(null);

  const handleCriteriaChange = (index, event) => {
    const newCriteria = [...criteria];
    newCriteria[index][event.target.name] = event.target.value;
    setCriteria(newCriteria);
  };

  const addCriteria = () => {
    setCriteria([...criteria, { field: '', operator: '', value: '' }]);
  };

  const removeCriteria = (index) => {
    const newCriteria = [...criteria];
    newCriteria.splice(index, 1);
    setCriteria(newCriteria);
  };

  const checkAudienceSize = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/check', { criteria, logic });
      setAudienceSize(response.data.size);
      toast.success("Successfully checked");
    } catch (error) {
      console.error('Error checking audience size:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/v1/save', { criteria, logic });
      toast.success('Audience criteria saved successfully');
    } catch (error) {
      console.error('Error saving audience criteria:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Create Audience</h2>
      {criteria.map((criterion, index) => (
        <div key={index} className="flex items-center mb-4">
          <select
            name="field"
            value={criterion.field}
            onChange={(e) => handleCriteriaChange(index, e)}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline mr-2"
          >
            <option value="">Select Field</option>
            <option value="totalSpends">Total Spends</option>
            <option value="visits">Visits</option>
            <option value="lastVisit">Last Visit Date</option>
          </select>
          <select
            name="operator"
            value={criterion.operator}
            onChange={(e) => handleCriteriaChange(index, e)}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline mr-2"
          >
            <option value="">Select Operator</option>
            <option value="gt">&gt;</option>
            <option value="lt">&lt;</option>
            <option value="eq">=</option>
          </select>
          <input
            type="text"
            name="value"
            value={criterion.value}
            onChange={(e) => handleCriteriaChange(index, e)}
            placeholder="Value"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
          />
          <button
            type="button"
            onClick={() => removeCriteria(index)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addCriteria}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
      >
        Add Criteria
      </button>
      <div className="flex items-center mb-4">
        <label className="block text-gray-700 font-bold mr-2">
          <input
            type="radio"
            name="logic"
            value="AND"
            checked={logic === 'AND'}
            onChange={(e) => setLogic(e.target.value)}
            className="mr-1 leading-tight"
          />
          AND
        </label>
        <label className="block text-gray-700 font-bold">
          <input
            type="radio"
            name="logic"
            value="OR"
            checked={logic === 'OR'}
            onChange={(e) => setLogic(e.target.value)}
            className="mr-1 leading-tight"
          />
          OR
        </label>
      </div>
      <button
        type="button"
        onClick={checkAudienceSize}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
      >
        Check Audience Size
      </button>
      {audienceSize !== null && <p className="text-lg font-semibold">Audience Size: {audienceSize}</p>}
      <button
        type="submit"
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
      >
        Save Audience
      </button>
    </form>
  );
};

export default AudienceCreationForm;
