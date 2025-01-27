import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils/notifications'; // Adjust as needed
import { useNavigate } from 'react-router-dom';
import './register.css';

function Register() {
  const [registerInfo, setRegisterInfo] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    address: '',
    age: '',
    number: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerInfo), // Send all required fields to the backend
      });

      if (!response.ok) throw new Error(await response.text());

      const { message } = await response.json();
      handleSuccess(message);
      setTimeout(() => navigate('/login'), 1000); // Redirect to home after successful registration
    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={registerInfo.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={registerInfo.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={registerInfo.password}
            onChange={handleChange}
            required
            minLength="8" // Add a minimum length for stronger passwords
          />
        </div>
        <div>
          <label>Gender</label>
          <select
            name="gender"
            value={registerInfo.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>Address</label>
          <textarea
            name="address"
            value={registerInfo.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={registerInfo.age}
            onChange={handleChange}
            required
            min="1"
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="tel"
            name="number"
            value={registerInfo.number}
            onChange={handleChange}
            required
            pattern="[0-9]{10}" // Enforce a 10-digit number format
            placeholder="10-digit number"
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;
