const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // Email uniqueness
      lowercase: true,
    },

    position: {
      type: String,
      required: [true, "Position is required"],
    },

    salary: {
      type: Number,
      required: [true, "Salary is required"],
      min: [0, "Salary must be positive number"], // Positive validation
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active", // Default value
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);