// src/components/CampaignForm.jsx

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

  const handleSendCampaign = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/campaign/send-campaign', { criteria, logic, messageTemplate });
      toast.success('Campaign sent successfully');
    } catch (error) {
      console.error('Error sending campaign:', error);
      toast.error('Failed to send campaign');
    }
  };

  const handleUpdateMessageStatus = async () => {
    try {
      await axios.post('http://localhost:4000/api/v1/campaign/update-message-status');
      toast.success('Message statuses updated successfully');
    } catch (error) {
      console.error('Error updating message status:', error);
      toast.error('Failed to update message statuses');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create Campaign</h2>
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
        placeholder="Message Template (use [Name] for personalization)"
        className="w-full p-2 border border-gray-400 rounded mb-4"
      />
      <button
        type="button"
        onClick={handleSendCampaign}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
      >
        Send Campaign
      </button>
      <button
        type="button"
        onClick={handleUpdateMessageStatus}
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Update Message Status
      </button>
    </div>
  );
};

export default CampaignForm;
