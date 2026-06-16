import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  name: { type: String, trim: true, default: "" },
  pass: { type: String, trim: true, default: "1234567890" },
  username: { type: String, trim: true, default: "" },
  email: { type: String, required: true },
  address: {
    street: { type: String, trim: true, default: "" },
    suite: { type: String, trim: true, default: "" },
    city: { type: String, trim: true, default: "" },
    zipcode: { type: String, trim: true, default: "" },
    geo: {
      lat: { type: String, trim: true, default: "" },
      lng: { type: String, trim: true, default: "" },
    },
  },
  phone: { type: String, trim: true, default: "" },
  website: { type: String, trim: true, default: "" },
  company: {
    name: { type: String, trim: true, default: "" },
    catchPhrase: { type: String, trim: true, default: "" },
    bs: { type: String, trim: true, default: "" },
  },
});

export default dataSchema;
