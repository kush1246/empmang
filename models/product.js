const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  productName: {
    type: String,
    required: true
  },

  productCode: {
    type: String,
    required: true,
    unique: true
  },

  category: {
    type: String,
    enum: ["Electronics", "Clothing", "Food", "Furniture"],
    required: true
  },

  supplierName: {
    type: String,
    required: true
  },

  quantityInStock: {
    type: Number,
    min: 0
  },

  reorderLevel: {
    type: Number,
    min: 1
  },

  unitPrice: {
    type: Number,
    min: 1
  },

  manufactureDate: {
    type: Date
  },

  productType: {
    type: String,
    enum: ["Perishable", "Non-Perishable"]
  },

  status: {
    type: String,
    enum: ["Available", "Out of Stock"],
    default: "Available"
  }

}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);