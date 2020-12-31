const mongoose = require("mongoose");


const imageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
    min: [0, "Price must be positive"],
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  purshased:{
      type: Boolean,
      default: false,
  },
  discount: Number,
  purshasedBy: String,
});

module.exports = mongoose.model("Image", imageSchema);

