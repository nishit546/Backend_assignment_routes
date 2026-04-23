const { products } = require("../models/productModel");

// GET /products
exports.getAllProducts = (req, res) => {
  res.status(200).json(products);
};
