import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PatientDashboard.css';

const PatientDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="patient-dashboard">
      <div className="dashboard-header">
        <h1>👤 Patient Dashboard</h1>
        <p className="subheading">Welcome to CareFree! Manage your health easily.</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>My Appointments</h3>
          <p>View upcoming appointments and medical visits.</p>
          <button onClick={() => navigate('/appointments')}>View Appointments</button>
        </div>

        <div className="dashboard-card">
          <h3>Medical Records</h3>
          <p>Access your prescriptions, test results, and history.</p>
          <button onClick={() => navigate('/medical-records')}>View Records</button>
        </div>

        <div className="dashboard-card">
          <h3>Health Checkups</h3>
          <p>Book your next annual health checkup with ease.</p>
          <button onClick={() => navigate('/book-health-checkup')}>Book Now</button>
        </div>

        <div className="dashboard-card">
          <h3>Profile</h3>
          <p>Update your personal and insurance information.</p>
          <button onClick={() => navigate('/patientprofile')}>View Profile</button>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
