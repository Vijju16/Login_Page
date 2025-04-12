import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DoctorProfile.css';

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDoctor(response.data);
      } catch (error) {
        console.error('Error fetching doctor profile:', error);
      }
    };

    fetchDoctor();
  }, []);

  if (!doctor) return <div className="doctor-profile-container"><p>Loading profile...</p></div>;

  return (
    <div className="doctor-profile-container">
      <h1 className="profile-heading">👨‍⚕️ Doctor Profile</h1>

      <div className="profile-card">
        <section className="profile-section">
          <h2>Basic Information</h2>
          <p><strong>Full Name:</strong> {doctor.fullname}</p>
          <p><strong>Email:</strong> {doctor.email}</p>
        </section>

        <section className="profile-section">
          <h2>Professional Details</h2>
          <p><strong>Specialization:</strong> {doctor.specialization}</p>
          <p><strong>Experience:</strong> {doctor.experience} years</p>
          <p><strong>License Number:</strong> {doctor.licenseNumber}</p>
          <p><strong>Clinic Address:</strong> {doctor.clinicAddress}</p>
        </section>

        <div className="profile-buttons">
          <button className="back-button" onClick={() => navigate('/doctor-dashboard')}>
            ⬅ Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
