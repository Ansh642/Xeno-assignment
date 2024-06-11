// src/components/CampaignList.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CampaignList = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching campaign stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Campaigns</h2>
      {stats && (
        <div>
          <p>Total Audience: {stats.totalAudience}</p>
          <p>Total Sent: {stats.totalSent}</p>
          <p>Total Failed: {stats.totalFailed}</p>
        </div>
      )}
    </div>
  );
};

export default CampaignList;
