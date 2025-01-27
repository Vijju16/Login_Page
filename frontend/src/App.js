import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import SendOtp from './components/sendOtp';
import VerifyOtp from './components/verifyOtp';
import ResetPassword from './components/ResetPassword';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect all unhandled routes to Home */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Routes for different pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
       <Route path="/send-otp" element={<SendOtp />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
