import React from 'react';
import './Billing.css';

const Billing = () => {
  const bills = [
    { service: "Doctor Consultation", date: "April 10, 2025", amount: "₹500", status: "Paid" },
    { service: "Health Checkup Package", date: "March 28, 2025", amount: "₹2500", status: "Unpaid" }
  ];

  return (
    <div className="billing-container">
      <h1 className="billing-title">Billing & Payments</h1>
      <table className="billing-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill, index) => (
            <tr key={index}>
              <td>{bill.service}</td>
              <td>{bill.date}</td>
              <td>{bill.amount}</td>
              <td className={bill.status === 'Paid' ? 'paid' : 'unpaid'}>{bill.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Billing;
