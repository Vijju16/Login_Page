const User = require('../models/user'); // Ensure the correct model is imported
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const nodemailer = require('nodemailer')
/*const sgMail = require('@sendgrid/mail');*/
const bcrypt = require('bcryptjs');
const generateTokenAndSetCookie = require('../utils/generateTokenAndSetCookie');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
/*sgMail.setApiKey(process.env.SENDGRID_API_KEY,process.env.API_KEY_SID);*/

// Middleware to parse JSON request body
app.use(express.json());

// Login functionality
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).send('Email and password are required.');
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('User not found.');
    }

    // Verify password
    console.log("Comparing passwords...");
    console.log("Plaintext password:", password);
    console.log("Hashed password from DB:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials.');
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error("Error during login:", err.message || err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

// Register functionality
exports.register = async (req, res) => {

  const session = await mongoose.startSession(); // Start a session
  session.startTransaction(); // Start a transaction

  const { name, email, password, gender, address, age, number } = req.body;

  try {
    // Validate input
    if (!name || !email || !password || !gender || !address || !age || !number) {
      return res.status(400).send('All fields are required.');
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    console.log("userExists", userExists);
    if (userExists) {
      return res.status(400).send('User already exists.');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10); // Generate a salt
    const hashedPassword = await bcrypt.hash(password, salt);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Store the hashed password
      gender,
      address,
      age,
      number,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 //24 hours
    });

    // Save the user to the database
    await newUser.save({ session });

    //jwt
    generateTokenAndSetCookie(res, newUser._id);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        ...newUser._doc,
        password: undefined
      },
    });
  } catch (err) {
    // Abort the transaction if any error occurs
    await session.abortTransaction();
    session.endSession();

    console.error("Error during registration:", err.message || err);
    res.status(500).send('Server error');
  }
};

//send otp to email before reset pasword
exports.sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    // Validate email
    if (!email) {
      return res.status(400).send("Email is required");
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('User not found.');
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes

    // Save OTP to the user record in the database
    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
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
      debug: true, // Enable debug output
      logger: true, // Log information to console
    });
    
  
  // Mail options
  const mailOptions = {
    from: 'vd755033@gmail.com', // Ensure this email matches the OAuth2 settings
    to: 'vp755033@gmail.com',   // Recipient's email
    subject: 'Nodemailer Project',
    text: `Your OTP code is ${otp}. It will expire in 15 minutes.`,
    html: `<p>Your OTP code is <strong>${otp}</strong>. It will expire in 15 minutes.</p>`
  };
  
  // Send the email
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log('Error:', err);
    } else {
      console.log('Email sent successfully');
    }
  });
    // Prepare the email content
    /*const msg = {
      to: email, // Recipient's email
      from: 'vp755033@gmail.com', // Your verified sender email
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It will expire in 15 minutes.`,
      html: `<p>Your OTP code is <strong>${otp}</strong>. It will expire in 15 minutes.</p>`,
    };

    // Send the email using SendGrid
    await sgMail.send(msg);*/

    res.status(200).json({message:'OTP sent to your email.'});
  } catch (err) {
    console.error('Error sending OTP:', err.message || err);
    res.status(500).json({error:'Server error'});
  }
};
//verify OTP and allow password reset
exports.verifyOtp = async (req, res) => {
  console.log('Request body:', req.body); // Log request body to debug
  const { email, otp } = req.body;

  try {
    //validate inputs
    if (!email || !otp) {
      return res.status(400).send('Email and OTP are Required.');
    }

    //find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('User not found.');
    }

    //check if OTP exists and is not expired
    if (user.otp !== otp || Date.now() > user.otpExpiresAt) {
      return res.status(400).send('Invalid or expired OTP.');
    }

    //clear OTP after after successful verification
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    res.status(200).json({message: 'OTP verified. Redirecting to reset password page.', redirect: '/reset-password'});
  } catch (err) {
    console.error('Error verifying OTP:', err.message || err);
    res.status(500).send('Server error');
  }
};
// Reset password functionality
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Validate input
    if (!email || !newPassword) {
      return res.status(400).send('Email and new password are required.');
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('User not found.');
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error("Error during password reset:", err.message || err);
    res.status(500).send('Server error');
  }
};

// Get user data functionality
exports.getUser = async (req, res) => {
  try {
    // Find user by ID from token payload
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).send('User not found.');
    }

    // Send user data (excluding sensitive fields like password)
    res.status(200).json({
      name: user.name,
      email: user.email,
      gender: user.gender,
      address: user.address,
      age: user.age,
      number: user.number,
    });
  } catch (err) {
    console.error("Error during fetching user data:", err.message || err);
    res.status(500).send('Server error');
  }
};
