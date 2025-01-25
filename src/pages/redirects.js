import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the custom AuthContext

const RedirectPage = () => {
  const { user } = useAuth(); // Get user information from AuthContext
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      // After successful sign-in, redirect to the desired page
      navigate('/dashboard'); // Replace '/dashboard' with your intended page
    }
  }, [user, navigate]);

  return (
    <div>
      <h2>Redirecting...</h2>
    </div>
  );
};

export default RedirectPage;

