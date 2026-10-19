const mongoose = require('mongoose');

let isConnected = false; // For serverless environments like Vercel

const connectDB = async () => {
  if (isConnected) {
    console.log('=> Using existing database connection');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = db.connections[0].readyState;
    console.log(`MongoDB Connected: ${db.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
