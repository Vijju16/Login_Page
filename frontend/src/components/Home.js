import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

function Home() {
  const [userData, setUserData] = useState(null);
  const [greeting, setGreeting] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated by verifying the token in localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      // If no token, redirect to login page
      navigate('/login');
      return;
    }

    // Fetch user data from your API using the token (you can customize the route and response)
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error(await response.text());

        const data = await response.json();
        setUserData(data);  // Set the user data in the state
        setGreeting(getCurrentGreeting(data.name));  // Set greeting based on user name
      } catch (error) {
        console.error('Failed to fetch user data', error);
        navigate('/login')
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');  // Clear the token
    navigate('/');  // Redirect to the login page
  };

  const getCurrentGreeting = (name) => {
    const hours = new Date().getHours();
    let greetingMessage = '';

    if (hours < 12) {
      greetingMessage = `Good Morning, ${name}!`;
    } else if (hours < 18) {
      greetingMessage = `Good Afternoon, ${name}!`;
    } else {
      greetingMessage = `Good Evening, ${name}!`;
    }

    return greetingMessage;
  };

  return (
    <div className="home-container">
      <h1>{greeting || 'Welcome to the Home Page'}</h1>

      {/* If user data is available, display user information */}
      {userData ? (
        <>
          <p className="user-info">Hello, <span>{userData.email}</span></p>  {/* Display user's email or any other data */}
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p className="loading-message">Loading user data...</p>  // Display loading message if user data is not loaded
      )}

      {/* Navigation to other pages */}
      <div className="button-group">
        <button className="btn-patients" onClick={() => navigate('/getAllpatient')}>Patients</button>
      </div>
    </div>
  );
}

export default Home;
