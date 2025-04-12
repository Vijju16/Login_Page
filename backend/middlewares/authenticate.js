const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Patient = require('../models/patient');

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Get the token from the header

  if (!token) {
    return res.status(401).send('Authentication required');
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'secretKey');

    // Fetch user and patient details in parallel
    const [user, patient] = await Promise.all([
      User.findById(decoded.id),
      Patient.findById(decoded.id),
    ]);

    if (!user && !patient) {
      return res.status(404).send('User or patient not found');
    }

    // Attach the user and patient to the request
    req.user = user || null;
    req.patient = patient || null;

    // Continue to the next middleware
    next();
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(401).send('Invalid or expired token');
  }
};

module.exports = authenticate;
