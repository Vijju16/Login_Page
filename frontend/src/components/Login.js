import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils/notifications';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import './login.css';

function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '', userType: 'patient' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginInfo),
        credentials: 'include',
      });

      if (!response.ok) throw new Error(await response.text());

      const { message, token } = await response.json();
      localStorage.setItem('token', token);
      handleSuccess(message);

      // Decode the token to extract userType
      const decoded = jwtDecode(token);
      const redirectPath = decoded.userType === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard';

      setTimeout(() => navigate(redirectPath), 1000);
    } catch (err) {
      handleError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-page'>
      <div className="right-section">
        <div className="form-container">
          <img className='doc' src='/doctor.jpg' alt='doctors' />
          <h1><img className='heal' src='carefree.png' alt='Healthify Logo' /></h1>

          {/* Role toggle */}
          <div className="role-toggle">
            <label>
              <input
                type="radio"
                name="userType"
                value="patient"
                checked={loginInfo.userType === 'patient'}
                onChange={handleChange}
              /> Patient
            </label>
            <label>
              <input
                type="radio"
                name="userType"
                value="doctor"
                checked={loginInfo.userType === 'doctor'}
                onChange={handleChange}
              /> Doctor
            </label>
          </div>

          <form onSubmit={handleLogin}>
            <div className='email'>
              <img src='person.png' alt='User Icon' className='user1' />
              <input className='i1'
                type="email"
                name="email"
                value={loginInfo.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>
            <div className='password'>
              <img src='padlock.png' alt='password' className='pass1' />
              <input className='i2'
                type="password"
                name="password"
                value={loginInfo.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </div>
            <div className='bot'>
              <button className='smt' type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
              <Link to="/send-otp" className='FP'>Forgot Password?</Link>
              <p className='DHAA'>Don't have an account?</p>
              <button className='reg' type="button" placeholder='Register Here' onClick={() => navigate('/register')}>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
