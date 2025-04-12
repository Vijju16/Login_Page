import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token'); // Clear authentication token
    navigate('/login'); // Redirect to login
  }, [navigate]);

  return (
    <div>
      <h1>Logging Out...</h1>
    </div>
  );
}

export default Logout;
