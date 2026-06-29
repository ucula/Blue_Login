import mongoose from "mongoose";
import userSchema from "../models/userSchema";

const userModel = mongoose.model("myData", userSchema, "items_login");
export default userModel;
