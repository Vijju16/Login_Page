import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
  return (
    <div className="how-container">
      <h1 className="how-title">How It Works</h1>
      <div className="how-step">
        <h3>1. Register & Create Your Profile</h3>
        <p>Sign up and set up your basic information, medical history, and insurance details.</p>
      </div>
      <div className="how-step">
        <h3>2. Search & Book a Doctor</h3>
        <p>Find doctors based on specialization, ratings, or availability, and book appointments instantly.</p>
      </div>
      <div className="how-step">
        <h3>3. Consultation & Records</h3>
        <p>Meet your doctor via video or in person, and receive prescriptions and reports directly in your profile.</p>
      </div>
    </div>
  );
};

export default HowItWorks;
