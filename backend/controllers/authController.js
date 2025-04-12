const User = require('../models/user');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const generateTokenAndSetCookie = require('../utils/generateTokenAndSetCookie');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

app.use(express.json());

exports.login = async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    if (!email || !password || !userType) {
      return res.status(400).send('Email, password, and user type are required.');
    }

    // Find the user with matching email and userType
    const user = await User.findOne({ email, userType }).select('+password');
    if (!user) return res.status(400).send('User not found.');

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials.');

    // Generate JWT token
    const token = jwt.sign({ id: user._id, userType: user.userType }, 'secretKey', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

exports.register = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      userType,
      fullname,
      email,
      password,
      dob,
      gender,
      primaryContact,
      street,
      city,
      state,
      zipCode,
      nationalId,
      insuranceProvider,
      insurancePolicy,
      preferredLanguage,
      communicationPreference,
      specialization,
      experience,
      licenseNumber,
      clinicAddress
    } = req.body;

    // Common required fields
    if (!userType || !fullname || !email || !password) {
      return res.status(400).send('Missing required fields');
    }

    // Validate specific fields based on userType
    if (userType === 'patient') {
      const requiredFields = [dob, gender, primaryContact, street, city, state, zipCode, nationalId];
      if (requiredFields.some(field => !field)) {
        return res.status(400).send('Missing required patient fields');
      }
    } else if (userType === 'doctor') {
      const requiredFields = [specialization, experience, licenseNumber, clinicAddress];
      if (requiredFields.some(field => !field)) {
        return res.status(400).send('Missing required doctor fields');
      }
    } else {
      return res.status(400).send('Invalid user type');
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send('User already exists.');

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    // Create user object based on userType
    const newUserData = {
      userType,
      fullname,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    };

    if (userType === 'patient') {
      Object.assign(newUserData, {
        dob,
        gender,
        primaryContact,
        street,
        city,
        state,
        zipCode,
        nationalId,
        insuranceProvider,
        insurancePolicy,
        preferredLanguage,
        communicationPreference
      });
    }

    if (userType === 'doctor') {
      Object.assign(newUserData, {
        specialization,
        experience,
        licenseNumber,
        clinicAddress
      });
    }

    // Save to DB
    const newUser = new User(newUserData);
    await newUser.save({ session });
    generateTokenAndSetCookie(res, newUser._id);
    await session.commitTransaction();

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    await session.abortTransaction();
    console.error('Error during registration:', err);
    res.status(500).send('Server error');
  } finally {
    session.endSession();
  }
};

exports.getDepartments = async (req, res) => {
  try {
    const departments = await User.distinct('specialization', {
      userType: 'doctor',
      specialization: { $ne: null },
    });
    res.status(200).json({ success: true, data: departments });
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch departments' });
  }
};

exports.getDoctorsByDepartment = async (req, res) => {
  const { department } = req.query;

  if (!department) {
    return res.status(400).json({ success: false, message: 'Department (specialization) is required' });
  }

  try {
    const doctors = await User.find({
      userType: 'doctor',
      specialization: { $regex: new RegExp(`^${department}$`, 'i') }
    }).select('_id fullname specialization experience clinicAddress');

    res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch doctors' });
  }
};

exports.sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) return res.status(400).send("Email is required");
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found.');

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiresAt = Date.now() + 15 * 60 * 1000;
    await user.save();

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    });

    await transporter.sendMail({
      from: 'Carefree.com',
      to: email,
      subject: 'OTP Verification',
      html: `<p>Your OTP is <strong>${otp}</strong>. Valid for 15 minutes.</p>`
    });

    res.status(200).json({ message: 'OTP sent to your email.' });
  } catch (err) {
    console.error('Error sending OTP:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    if (!email || !otp) return res.status(400).send('Email and OTP are required.');
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp || Date.now() > user.otpExpiresAt) {
      return res.status(400).send('Invalid or expired OTP.');
    }

    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    res.status(200).json({ message: 'OTP verified.', redirect: '/reset-password' });
  } catch (err) {
    console.error('Error verifying OTP:', err);
    res.status(500).send('Server error');
  }
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    if (!email || !newPassword) return res.status(400).send('Email and new password are required.');
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found.');

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error("Error during password reset:", err);
    res.status(500).send('Server error');
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(400).send('User not found.');

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).send('Server error');
  }
};

exports.getAllpatient = async (req, res) => {
  try {
    const users = await User.find({ userType: 'patient' });
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    console.error("Error fetching patients:", err);
    res.status(500).json({ success: false, message: 'Error fetching patient details', error: err.message });
  }
};
