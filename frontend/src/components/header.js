import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import the CSS file for styling

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-container">
        {/* Logo Image */}
        <div className="logo">
          <Link to="/">
          <img src="/carefree.png" alt="Healthcare Logo" className="logo-img" />
          </Link>
        </div>
        
        <nav>
          <ul className="nav-links">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/appointments">Appointments</Link></li>
            {/*<li><Link to="/patients">Patients</Link></li>*/}
            <li><Link to="/doctors">Doctors</Link></li>
            {/*<li><Link to="/medical-records">Medical Records</Link></li>*/}
            <li><Link to="/notifications">Notifications</Link></li>
            <li><Link to="/billing">Billing/Payment</Link></li>
            <li><Link to="/settings">Settings</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
