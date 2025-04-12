const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now, 
    },
    homeno: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 10,
      trim: true,
    },
    firstname: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0, 
      max: 100, 
    },
    dob: {
      type: Date,
      required: true,
      validate: {
        validator: (v) => v < Date.now(),
        message: 'DOB cannot be in the future',
      },
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female', 'Other'],
    },
    healthcardno: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 20,
    },
    maritalstatus: {
      type: String,
      required: true,
      enum: ['Single', 'Married', 'Divorced', 'Widowed'],
    },
    homephone: {
      type: String,
      required: true,
      match: /^\+?[1-9]\d{1,14}$/, 
    },
    aadhar: {
      type: String,
      required: true,
      unique: true,
      match: /^\d{12}$/, 
    },
    pan: {
      type: String,
      required: true,
      unique: true,
      match: /^[A-Z]{5}\d{4}[A-Z]{1}$/, 
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 128,
      select: false,  // Don't select by default
    },
    resetPasswordToken: { type: String },
    resetPasswordExpiresAt: { type: Date },
    verificationToken: { type: String },
    verificationTokenExpiresAt: { type: Date },
    otp: { type: String },
    otpExpiresAt: { type: Date },
  },
  { collection: 'Patient', timestamps: true } 
);

module.exports = mongoose.model('Patient', patientSchema);  
