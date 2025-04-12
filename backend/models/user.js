const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      enum: ['patient', 'doctor'],
      required: true
    },
    fullname: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
      trim: true,
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
      select: true,
    },

    // Patient-specific fields
    dob: { type: Date },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    primaryContact: {
      type: String,
      match: /^[0-9]{10}$/,
    },
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    zipCode: {
      type: String,
      match: /^[1-9]{1}[0-9]{5}$/,
    },
    nationalId: { type: String, minlength: 5, maxlength: 50 },
    insuranceProvider: { type: String },
    insurancePolicy: {
      type: String,
      match: /^[A-Za-z0-9\-]+$/,
    },
    preferredLanguage: { type: String },
    communicationPreference: {
      type: String,
      enum: ['Email', 'Phone', 'Text'],
    },

    // Doctor-specific fields
    specialization: { type: String },
    experience: { type: Number },
    licenseNumber: { type: String },
    clinicAddress: { type: String },

    // Shared fields
    resetPasswordToken: { type: String },
    resetPasswordExpiresAt: { type: Date },
    verificationToken: { type: String },
    verificationTokenExpiresAt: { type: Date },
    otp: { type: String },
    otpExpiresAt: { type: Date },
  },
  { collection: 'User', timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
