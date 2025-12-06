const mongoose = require("mongoose");

let isConnected;

const connectDB = async () => {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    isConnected = db.connections[0].readyState;
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
};

module.exports = connectDB;
