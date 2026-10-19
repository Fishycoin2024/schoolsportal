const { errorResponse } = require('../utils/response');

const errorMiddleware = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';
  let errors = [];

  // Mongoose Bad ObjectId
  if (err.name === 'CastError') {
    statusCode = 404;
    message = `Resource not found. Invalid: ${err.path}`;
  }

  // Mongoose Duplicate Key
  if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value entered';
    errors = Object.keys(err.keyValue).map((key) => `${key} already exists`);
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    errors = Object.values(err.errors).map((val) => val.message);
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token. Please log in again.';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Your token has expired. Please log in again.';
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors: errors.length > 0 ? errors : undefined,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

module.exports = errorMiddleware;
