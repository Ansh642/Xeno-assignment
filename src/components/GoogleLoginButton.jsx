import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = () => {
  const handleLoginSuccess = (response) => {
    console.log('Login Success:', response);
    
    fetch('/auth/google/callback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: response.credential })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error('Error:', error));
  };

  const handleLoginFailure = (response) => {
    console.error('Login Failed:', response);
  };

  return (
    <GoogleOAuthProvider clientId="702510411789-g4ruf0k2qs5ja5r8uq5iq1s5g5oe7d5i.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
