import React from 'react';
import './App.css';
import GoogleLoginButton from './components/GoogleLoginButton';
import AudienceCreationForm from './components/Audience';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="container mx-auto mt-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Welcome to My App</h1>
        <GoogleLoginButton />
      </div>
      <AudienceCreationForm />

      <Toaster/>
    </div>
  );
}

export default App;
