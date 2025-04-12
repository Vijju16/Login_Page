import React from 'react';
import './AnnualCheckup.css';

const AnnualCheckup = () => {
  return (
    <div className="checkup-container">
      <h1 className="checkup-title">Annual Health Checkup</h1>
      <p className="checkup-description">
        Early diagnosis is key to preventing major health issues. Our annual checkup packages are designed to give you a complete view of your health.
      </p>
      <ul className="checkup-list">
        <li>Blood Pressure & Cholesterol Testing</li>
        <li>Blood Sugar & Diabetes Screening</li>
        <li>Kidney, Liver & Thyroid Function Tests</li>
        <li>Doctor Consultation & Follow-up</li>
      </ul>
      <button className="checkup-button">Book Your Checkup</button>
    </div>
  );
};

export default AnnualCheckup;
