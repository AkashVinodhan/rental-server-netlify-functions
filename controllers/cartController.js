const Product = require("../models/productModel");

require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET);

const getCheckoutPage = async (req, res) => {
  const line_items = req.body.map((item) => {
    return {
      price: item.stripe_id,
      quantity: item.qty,
    };
  }); // stripe requires data in this format line_items : [{price: stripeId, quantity: product qty},{...}]

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/failed",
  });

  res.send({ url: session.url });
};

const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.send(products);
};

module.exports = { getCheckoutPage, getProducts };
