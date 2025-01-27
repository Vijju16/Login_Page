import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils/notifications";
import { useNavigate } from "react-router-dom";

function SendOtp() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) throw new Error(await response.text());

            const { message } = await response.json();
            handleSuccess(message);
            setTimeout(() => navigate('/verify-otp'), 1000);//redirect to verify otp 
        } catch (err) {
            handleError(err.message);
        }
    };

    return (
        <div className="container">
            <h1>Send OTP</h1>
            <form onSubmit={handleSendOtp}>
                <div>
                    <label>Email</label>
                    <input 
                    typeof="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required
                    />
                </div>
                <button type="submit">Send OTP</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default SendOtp;