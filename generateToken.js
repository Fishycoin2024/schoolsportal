const jwt = require('jsonwebtoken');

const generateToken = (userId, schoolId, role) => {
  return jwt.sign(
    { id: userId, schoolId, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

module.exports = generateToken;
