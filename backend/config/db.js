require('dotenv').config();

const mongoose = require('mongoose');
/*const MONGO = 'mongodb+srv://vp755033:NH10%40GJ16@cluster0.nh3er.mongodb.net/login_db?retryWrites=true&w=majority';*/

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      writeConcern: { w: 1 },
    });
    console.log('MongoDB Atlas connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
