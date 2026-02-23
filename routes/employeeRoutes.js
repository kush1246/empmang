const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");


// 🔹 POST - Create Employee
router.post("/employees", async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// 🔹 GET - All Employees
router.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// 🔹 GET - Employee by ID
router.get("/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Not Found" });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// 🔹 PUT - Update Employee
router.put("/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!employee) return res.status(404).json({ message: "Not Found" });

    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// 🔹 DELETE - Employee
router.delete("/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: "Not Found" });

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// 🔹 SEARCH - By Name
router.get("/employees/search", async (req, res) => {
  try {
    const name = req.query.name;

    const employees = await Employee.find({
      name: { $regex: name, $options: "i" },
    });

    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;