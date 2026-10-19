const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user to request, explicitly dropping passwordHash
    req.user = await User.findById(decoded.id).select('-passwordHash');
    
    if (!req.user || req.user.status !== 'active') {
      res.status(401);
      throw new Error('User inactive or not found');
    }

    // MANDATORY FOR TENANT ISOLATION
    req.schoolId = req.user.schoolId;
    
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized, token failed');
  }
});
