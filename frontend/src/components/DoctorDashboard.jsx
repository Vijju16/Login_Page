import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="doctor-dashboard">
      <div className="dashboard-header">
        <h1>👨‍⚕️ Doctor Dashboard</h1>
        <p className="subheading">Welcome back! Here's your quick overview.</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Appointments</h3>
          <p>Check today's schedule and upcoming consultations.</p>
          <button onClick={() => navigate('/appointments')}>View Appointments</button>
        </div>

        <div className="dashboard-card">
          <h3>My Patients</h3>
          <p>Review medical history and prescriptions of your patients.</p>
          <button onClick={() => navigate('/patients')}>View Patients</button>
        </div>

        <div className="dashboard-card">
          <h3>Profile</h3>
          <p>Update your professional information and availability.</p>
          <button  onClick={() => navigate('/doctorprofile')}>View Profile</button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
