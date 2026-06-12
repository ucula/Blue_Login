import mongoose from "mongoose";
import { MONGO_URI } from "../config/index";

export async function connectDB() {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined in env");
    }
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB database successfully!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}
