const express = require('express');
const { login, resetPassword, register, getUser, sendOtp, verifyOtp } = require('../controllers/authController');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');

// POST route for login
router.post('/login', login);

// POST route for registration
router.post('/register', register);

// POST route for sending OTP
router.post('/send-otp', sendOtp);

// POST route for verify OTP
router.post('/verify-otp', verifyOtp);

// POST route for resetting the password
router.post('/reset-password', resetPassword);

// GET route for fetching user data (protected route)
router.get('/user', authenticate, getUser);

module.exports = router;
