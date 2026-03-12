const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

const productRoutes = require("./routes/productRoutes");

app.use("/", productRoutes);

app.get("/", (req, res) => {
  res.send("Inventory API Running 🚀");
});
const errorHandler = require("./middleware/errorHandler");

app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});