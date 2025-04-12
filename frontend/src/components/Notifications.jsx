import React from 'react';
import './Notifications.css';

const Notifications = () => {
  const messages = [
    { title: 'Appointment Reminder', content: 'You have an appointment with Dr. Mehta on April 15 at 11:00 AM.' },
    { title: 'Prescription Ready', content: 'Your prescription for diabetes medication has been uploaded.' },
    { title: 'Profile Updated', content: 'Your personal information was updated successfully.' }
  ];

  return (
    <div className="notifications-container">
      <h1 className="notifications-title">Notifications</h1>
      <ul className="notifications-list">
        {messages.map((msg, index) => (
          <li key={index} className="notification-item">
            <h3>{msg.title}</h3>
            <p>{msg.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
