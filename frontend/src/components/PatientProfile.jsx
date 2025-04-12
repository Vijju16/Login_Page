import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DoctorProfile.css'; // Reuse same CSS

const PatientProfile = () => {
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPatient(response.data);
      } catch (error) {
        console.error('Error fetching patient profile:', error);
      }
    };

    fetchPatient();
  }, []);

  if (!patient) return <div className="doctor-profile-container"><p>Loading profile...</p></div>;

  return (
    <div className="doctor-profile-container">
      <h1 className="profile-heading">🧑‍⚕️ Patient Profile</h1>

      <div className="profile-card">
        <section className="profile-section">
          <h2>Personal Information</h2>
          <p><strong>Full Name:</strong> {patient.fullname}</p>
          <p><strong>Email:</strong> {patient.email}</p>
          <p><strong>Phone:</strong> {patient.primaryContact}</p>
          <p><strong>Date of Birth:</strong> {new Date(patient.dob).toLocaleDateString()}</p>
          <p><strong>Gender:</strong> {patient.gender}</p>
        </section>

        <section className="profile-section">
          <h2>Address</h2>
          <p><strong>Street:</strong> {patient.street}</p>
          <p><strong>City:</strong> {patient.city}</p>
          <p><strong>State:</strong> {patient.state}</p>
          <p><strong>ZIP Code:</strong> {patient.zipCode}</p>
        </section>

        <section className="profile-section">
          <h2>Additional Details</h2>
          <p><strong>National ID:</strong> {patient.nationalId}</p>
          <p><strong>Insurance Provider:</strong> {patient.insuranceProvider || 'N/A'}</p>
          <p><strong>Insurance Policy:</strong> {patient.insurancePolicy || 'N/A'}</p>
          <p><strong>Preferred Language:</strong> {patient.preferredLanguage || 'N/A'}</p>
          <p><strong>Communication Preference:</strong> {patient.communicationPreference}</p>
        </section>

        <div className="profile-buttons">
          <button className="back-button" onClick={() => navigate('/patient-dashboard')}>
            ⬅ Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
