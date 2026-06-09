import mongoose from "mongoose";
import dataSchema from "../models/userSchema";

const myData = mongoose.models.myData || mongoose.model("myData", dataSchema, "items");
export default myData;
