import mongoose from "mongoose";
import authSchema from "../models/authSchema";

const authModel = mongoose.model("authModel", authSchema, "verify");
export default authModel;
