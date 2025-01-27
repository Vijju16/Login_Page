const mongoose = require('mongoose');
/*const bcrypt = require('bcryptjs'); // For hashing passwords*/

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
      trim: true, // Removes extra spaces
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // Ensures emails are stored in lowercase
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email validation regex
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 128,
      select: true, // Excludes password by default in queries
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female', 'Other'],
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
      min: 18, // Minimum age requirement
      max: 100, // Maximum age limit
    },
    number: {
      type: String,
      required: true,
      unique: true,
      match: /^\+?[1-9]\d{1,14}$/, // Matches E.164 phone number format
    },
    resetPasswordToken: { type: String },
    resetPasswordExpiresAt: { type: Date },
    verificationToken: { type: String },
    verificationTokenExpiresAt: { type: Date },
    otp: { type: String },
    otpExpiresAt: { type: Date },
  },
  { collection: 'User', timestamps: true } // Adds createdAt and updatedAt fields
);

/*// Hash password before saving the user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if the password is new/modified

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (err) {
    next(err); // Pass error to the next middleware
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};*/

// Export the User model
module.exports = mongoose.model('User', UserSchema);
