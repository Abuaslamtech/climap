import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 60000,
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log("Connection failed", err);
  }
};

export default connectDB;
