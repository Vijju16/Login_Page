import React from 'react';
import './Careers.css';

const Careers = () => {
  const jobs = [
    { title: "Frontend Developer (React.js)", location: "Vadodara", type: "Full-Time" },
    { title: "Backend Developer (Node.js)", location: "Remote", type: "Contract" },
    { title: "UI/UX Designer", location: "Ahmedabad", type: "Internship" },
  ];

  return (
    <div className="careers-container">
      <h1 className="careers-title">Careers at CareFree</h1>
      <p className="careers-subtitle">Join our mission to make healthcare simpler and more accessible.</p>
      <ul className="careers-list">
        {jobs.map((job, i) => (
          <li key={i}>
            <h2>{job.title}</h2>
            <p>{job.location} · {job.type}</p>
            <button>Apply Now</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Careers;
