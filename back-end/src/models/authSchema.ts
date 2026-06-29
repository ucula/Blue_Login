import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now, expires: 86400 },
  email: { type: String, required: true },
  token: { type: String, required: true },
  isUsed: { type: Boolean, default: false },
});

export default authSchema;
