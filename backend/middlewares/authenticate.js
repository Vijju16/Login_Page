const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Get the token from the header

  if (!token) {
    return res.status(401).send('Authentication required');
  }

  try {
    const decoded = jwt.verify(token, 'secretKey');  // Verify the token
    const user = await User.findById(decoded.id);   // Find the user using the decoded token

    if (!user) {
      return res.status(400).send('User not found.');
    }

    req.user = user;  // Add the user to the request object
    next();  // Continue to the next middleware or route handler
  } catch (error) {
    res.status(401).send('Invalid or expired token');
  }
};

module.exports = authenticate;
