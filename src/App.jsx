import React from 'react';
import './App.css';
import GoogleLoginButton from './components/GoogleLoginButton';
import AudienceCreationForm from './components/Audience';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import CampaignList from './components/Campaingn';
import CampaignForm from './components/CampaignForm';

function App() {
  return (
    <>
    <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<AudienceCreationForm />} />
          <Route path="/campaigns" element={<CampaignList />} />
          <Route path="/send-campaign" element={<CampaignForm/>} />
        </Routes>
      </div>

      <GoogleLoginButton/>

      <Toaster/>
      </>
  );
}

export default App;
