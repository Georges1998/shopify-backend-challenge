const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    trim: true,
    unique: false,
  },
  firstName: {
    type: String,
    required: [true, "firstName is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "lastName is required"],
    trim: true,
  },
  credit: {
    type: Number,
    default: 200,
  },
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
  purchased: [
    {
      
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
