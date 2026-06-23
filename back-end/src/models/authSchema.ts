import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "myData",
    required: true,
  },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 86400 },
});

export default authSchema;
