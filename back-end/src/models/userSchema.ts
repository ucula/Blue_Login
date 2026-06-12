import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  pass: { type: String, required: true, trim: true },
  username: { type: String, required: true, trim: true },
  email: { type: String, required: true },
  address: {
    street: { type: String, trim: true },
    suite: { type: String, trim: true },
    city: { type: String, trim: true },
    zipcode: { type: String, trim: true },
    geo: {
      lat: { type: String, trim: true },
      lng: { type: String, trim: true },
    },
  },
  phone: { type: String, trim: true },
  website: { type: String, trim: true },
  company: {
    name: { type: String, trim: true },
    catchPhrase: { type: String, trim: true },
    bs: { type: String, trim: true },
  },
});

export default dataSchema;
