import mongoose from "mongoose";
import dataSchema from "../models/userSchema";

const myData = mongoose.model("myData", dataSchema, "test");
export default myData;
