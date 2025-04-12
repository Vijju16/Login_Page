import React, { useState } from 'react';
import { handleError, handleSuccess } from '../utils/notifications';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './resetpassword.css'

function ResetPassword() {
  const [passwordInfo, setPasswordInfo] = useState({
    email: '',
    currentPassword: '',
    newPassword: ''
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwordInfo),
      });

      if (!response.ok) throw new Error(await response.text());

      const { message } = await response.json();
      handleSuccess(message);

      // Redirect to the login page after successful password reset
      setTimeout(() => navigate('/login'), 1000); // Delays redirection for better UX
    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <div className="container3">
      <h1>Reset Password</h1>
      <form onSubmit={handleReset}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={passwordInfo.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={passwordInfo.currentPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={passwordInfo.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ResetPassword;
