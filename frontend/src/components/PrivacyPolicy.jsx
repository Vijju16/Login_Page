import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <h1 className="privacy-title">Privacy Policy</h1>
      <p className="privacy-text">
        At CareFree, your privacy is our top priority. We ensure that all your personal data and health records are securely stored and never shared without your consent.
      </p>
      <ul className="privacy-points">
        <li>All data is encrypted and stored securely.</li>
        <li>We comply with all local and international healthcare privacy laws.</li>
        <li>We do not sell or share your data with third parties.</li>
        <li>You can update or delete your data at any time.</li>
      </ul>
    </div>
  );
};

export default PrivacyPolicy;
