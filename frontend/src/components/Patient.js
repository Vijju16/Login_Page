import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; 
import './patient.css';

const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/getAllpatient');
        if (!response.ok) throw new Error('Failed to fetch patient data');
        const data = await response.json();
        if (data.success) {
          setPatients(data.data);
        } else {
          throw new Error('Error: ' + data.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleBack = () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');

      const decoded = jwtDecode(token);
      const redirectPath = decoded.userType === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard';
      navigate(redirectPath);
    } catch (err) {
      console.error('Failed to decode token:', err);
      navigate('/login'); // fallback
    }
  };

  if (loading) return <div className="loading">Loading patient data...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="patient-data-page">
      <div className="patient-data-container">
        {/* Back Button */}
        <button className="back-button" onClick={handleBack}>
          ← Back to Dashboard
        </button>

        <h1>Patient Records</h1>
        {patients.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>Marital Status</th>
                <th>Primary Contact</th>
                <th>Alternate Contact</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Zip Code</th>
                <th>National ID</th>
                <th>Insurance Provider</th>
                <th>Insurance Policy</th>
                <th>Occupation</th>
                <th>Employer</th>
                <th>Preferred Language</th>
                <th>Communication Preference</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient._id}>
                  <td>{patient.fullname || 'N/A'}</td>
                  <td>{patient.dob ? new Date(patient.dob).toLocaleDateString() : 'N/A'}</td>
                  <td>{patient.gender || 'N/A'}</td>
                  <td>{patient.maritalstatus || 'N/A'}</td>
                  <td>{patient.primaryContact || 'N/A'}</td>
                  <td>{patient.alternateContact || 'N/A'}</td>
                  <td>{patient.street || 'N/A'}</td>
                  <td>{patient.city || 'N/A'}</td>
                  <td>{patient.state || 'N/A'}</td>
                  <td>{patient.zipCode || 'N/A'}</td>
                  <td>{patient.nationalId || 'N/A'}</td>
                  <td>{patient.insuranceProvider || 'N/A'}</td>
                  <td>{patient.insurancePolicy || 'N/A'}</td>
                  <td>{patient.occupation || 'N/A'}</td>
                  <td>{patient.employer || 'N/A'}</td>
                  <td>{patient.preferredLanguage || 'N/A'}</td>
                  <td>{patient.communicationPreference || 'N/A'}</td>
                  <td>{patient.email || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-data">No patient records found.</div>
        )}
      </div>
    </div>
  );
};

export default Patient;
