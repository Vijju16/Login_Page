import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils/notifications";
import { useNavigate } from "react-router-dom";
import './VerifyOtp.css';


function VerifyOtp() {
    const [otpInfo, setOtpInfo] = useState({
        email: '',
        otp: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOtpInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Fixed typo
                },
                body: JSON.stringify(otpInfo),
            });

            if (!response.ok) throw new Error(await response.text());

            const { message } = await response.json();
            handleSuccess(message);
            
            // Clear form after success
            setOtpInfo({ email: '', otp: '' });

            // Redirect after success
            setTimeout(() => navigate('/reset-password'), 1000);
        } catch (err) {
            handleError(err.message);
        }
    };

    return (
        <div className="container5">
            <h1>Verify OTP</h1>
            <form onSubmit={handleVerifyOtp}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={otpInfo.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>OTP</label>
                    <input
                        type="text"
                        name="otp"
                        value={otpInfo.otp}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Verify OTP</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default VerifyOtp;
