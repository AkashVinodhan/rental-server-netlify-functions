const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  _id: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stripe_id: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
