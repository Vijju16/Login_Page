import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsAlerts: false,
    darkMode: false
  });

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Account Settings</h1>

      <div className="settings-section">
        <h2>Preferences</h2>
        <div className="settings-item">
          <label>Email Notifications</label>
          <input
            type="checkbox"
            checked={settings.emailNotifications}
            onChange={() => handleToggle('emailNotifications')}
          />
        </div>
        <div className="settings-item">
          <label>SMS Alerts</label>
          <input
            type="checkbox"
            checked={settings.smsAlerts}
            onChange={() => handleToggle('smsAlerts')}
          />
        </div>
        <div className="settings-item">
          <label>Dark Mode</label>
          <input
            type="checkbox"
            checked={settings.darkMode}
            onChange={() => handleToggle('darkMode')}
          />
        </div>
      </div>

      <div className="settings-section">
        <h2>Security</h2>
        <button className="settings-button">Change Password</button>
        <button className="settings-button danger">Delete Account</button>
      </div>
    </div>
  );
};

export default Settings;
