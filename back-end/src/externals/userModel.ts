import mongoose from "mongoose";
import dataSchema from "../models/userSchema";

const myData = mongoose.model("myData", dataSchema, "items_login");
export default myData;
