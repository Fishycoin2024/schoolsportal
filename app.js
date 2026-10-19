const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

// Security and Logging Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate Limiting
const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000,
  max: process.env.RATE_LIMIT_MAX_REQUESTS || 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Base Route
app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'School SaaS API is running. Paperless ops active.' });
});

// Routes (To be imported and registered in next phases)
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/schools', require('./routes/schoolRoutes'));
// ...

// 404 Handler
app.use((req, res, next) => {
  res.status(404);
  next(new Error(`Not Found - ${req.originalUrl}`));
});

// Global Error Handler
app.use(errorMiddleware);

module.exports = app;
