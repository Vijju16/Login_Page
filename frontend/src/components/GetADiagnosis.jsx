import React from 'react';
import './GetADiagnosis.css';

const GetADiagnosis = () => {
  return (
    <div className="diagnosis-container">
      <h1 className="diagnosis-title">Get a Diagnosis</h1>
      <p className="diagnosis-text">
        Share your symptoms with our AI-powered system and receive a preliminary assessment instantly.
        Our platform connects you with experienced doctors for further consultation and care planning.
      </p>
      <ol className="diagnosis-steps">
        <li>Fill out a quick symptom checker</li>
        <li>Upload optional medical reports</li>
        <li>Receive an instant health summary</li>
        <li>Schedule a consultation if needed</li>
      </ol>
      <button className="diagnosis-button">Start Diagnosis</button>
    </div>
  );
};

export default GetADiagnosis;
