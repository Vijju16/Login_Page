import React from 'react';
import './FAQ.css';

const faqs = [
  {
    question: 'How do I book an appointment?',
    answer: 'You can book an appointment by logging in, selecting a doctor, and choosing a preferred time slot.'
  },
  {
    question: 'Is my health data secure?',
    answer: 'Absolutely. All your data is encrypted and stored securely in compliance with healthcare regulations.'
  },
  {
    question: 'Do I need a subscription to use CareFree?',
    answer: 'No subscription is required for basic features. Premium plans are available for extra services.'
  }
];

const FAQ = () => {
  return (
    <div className="faq-container">
      <h1 className="faq-title">Frequently Asked Questions</h1>
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
