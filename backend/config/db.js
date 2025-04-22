const mongoose = require('mongoose');
const URL=process.env.MONGO_URL;
const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
