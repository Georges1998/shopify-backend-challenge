const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    trim: true,
  },
  price: {
    type: Number,
    default: 0,
    min: [0, "price must be positive"],
  },
  url: {
    type: String,
    required: [true, "url is required"],
    trim: true,
  },
  purshased: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  discount: Number,
  purshasedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Image", imageSchema);
