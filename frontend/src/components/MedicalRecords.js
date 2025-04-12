import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MedicalRecords.css';

const MedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/medical-records');
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching medical records:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  return (
    <div className="medical-records-container" style={{ padding: '30px' }}>
      <h1 style={{ color: '#2a7d2e', textAlign: 'center' }}>Patient Medical Records</h1>
      <p style={{ textAlign: 'center', color: '#555' }}>
        View and manage medical records of patients securely and efficiently.
      </p>

      {loading ? (
        <p>Loading records...</p>
      ) : records.length === 0 ? (
        <p>No medical records found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Patient Name</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Doctor</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Diagnosis</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Prescription</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record._id}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{record.patientName}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{record.doctorName}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{record.diagnosis}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{record.prescription}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(record.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MedicalRecords;
