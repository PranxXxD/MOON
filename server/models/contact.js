const Mongoose = require("mongoose");
const { Schema } = Mongoose;

// Contact Schema
const ContactSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
    trim: true,
  },
  message: {
    type: String,
    trim: true,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model("Contact", ContactSchema);
