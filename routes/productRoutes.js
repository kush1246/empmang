const express = require("express");
const router = express.Router();

const Product = require("../models/product");


// CREATE PRODUCT
router.post("/products", async (req, res) => {

  try {

    const product = await Product.create(req.body);

    res.status(201).json(product);

  } catch (error) {

    res.status(400).json({ message: error.message });

  }

});


// SEARCH PRODUCT BY NAME
router.get("/products/search", async (req, res) => {

  try {

    const products = await Product.find({
      productName: { $regex: req.query.name, $options: "i" }
    });

    res.status(200).json(products);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});


// FILTER BY CATEGORY
router.get("/products/category", async (req, res) => {

  try {

    const products = await Product.find({
      category: req.query.cat
    });

    res.status(200).json(products);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});


// GET ALL PRODUCTS
router.get("/products", async (req, res) => {

  try {

    const products = await Product.find();

    res.status(200).json(products);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});


// GET PRODUCT BY ID
router.get("/products/:id", async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});


// UPDATE PRODUCT
router.put("/products/:id", async (req, res) => {

  try {

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(product);

  } catch (error) {

    res.status(400).json({ message: error.message });

  }

});


// DELETE PRODUCT
router.delete("/products/:id", async (req, res) => {

  try {

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Product deleted" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});

module.exports = router;