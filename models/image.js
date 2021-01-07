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
  purchased: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  discount: Number,
  purchasedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Image", imageSchema);
