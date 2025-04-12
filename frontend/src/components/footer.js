import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="foot-container">
        
        <div className="foot-section log-section">
          <img className="log" src="/carefree.png" alt="CareFree Logo" />
        </div>

        <div className="foot-section">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/annual-checkup">Annual Checkup</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/careers">Careers</Link></li>
          </ul>
        </div>

        <div className="foot-section">
          <h4>Services</h4>
          <ul>
            <li><Link to="/diagnosis">Get A Diagnosis</Link></li>
            <li><Link to="/how-it-works">How It Works</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="foot-section">
          <h4>Support</h4>
          <ul>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/faq">FAQ's</Link></li>
          </ul>
        </div>

        <div className="foot-section">
          <h4>Top Insurances</h4>
          <img src='/care.png' alt='Care' className='inso' />
          <img src='/hdfc-ergo.jpg' alt='HDFC Ergo' className='inso' />
          <img src='/icici-lombard.jpeg' alt='ICICI Lombard' className='inso' />
          <img src='/niva-bupa.png' alt='Niva Bupa' className='inso' />
        </div>

        <div className="foot-section follow-us">
          <h4>Follow Us</h4>
          <img src='/facebook.png' alt='Facebook' className="fab fa-facebook" />
          <img src='/x.png' alt='X (Twitter)' className="fab fa-x" />
          <img src='/linkedin.webp' alt='LinkedIn' className="fab fa-linkedin" />
          <img src='/instagram.png' alt='Instagram' className="fab fa-instagram" />
        </div>

      </div>

      <div className="footer-bottom">
        <p>All rights reserved by CareFree {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
