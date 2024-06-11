import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const CampaignForm = () => {
  const [criteria, setCriteria] = useState([{ field: '', operator: '', value: '' }]);
  const [logic, setLogic] = useState('AND');
  const [messageTemplate, setMessageTemplate] = useState('');

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/send', { criteria, logic, messageTemplate });
      toast.success('Campaign sent successfully');
      console.log(response.data.messages);
    } catch (error) {
      console.error('Error sending campaign:', error);
      toast.error('Failed to send campaign');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Send Campaign</h2>
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
      <textarea
        value={messageTemplate}
        onChange={(e) => setMessageTemplate(e.target.value)}
        placeholder="Message Template (e.g., Hi [Name], here is 10% off on your next order)"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
      />
      <button
        type="submit"
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
      >
        Send Campaign
      </button>
    </form>
  );
};

export default CampaignForm;
