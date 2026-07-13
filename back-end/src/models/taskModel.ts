import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "adminModel",
    required: true,
  },
  date: {
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    day: { type: Number, required: true },
  },
  value: { type: String, default: "" },
});

const taskModel = mongoose.model("taskModel", taskSchema, "task");
export default taskModel;
