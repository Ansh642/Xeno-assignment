import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/campaigns');
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Past Campaigns</h2>
      {campaigns.length > 0 ? (
        <ul>
          {campaigns.map((campaign, index) => (
            <li key={index} className="mb-4">
              <div className="border-b pb-2 mb-2">
                <p><strong>Criteria:</strong> {JSON.stringify(campaign.criteria)}</p>
                <p><strong>Logic:</strong> {campaign.logic}</p>
                <p><strong>Date:</strong> {new Date(campaign.createdAt).toLocaleString()}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No past campaigns found.</p>
      )}
    </div>
  );
};

export default CampaignList;
