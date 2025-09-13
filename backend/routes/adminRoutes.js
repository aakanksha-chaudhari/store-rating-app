const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const router = express.Router();

// ADMIN LOGIN (hardcoded password)
router.post("/login", async (req, res) => {
  const { password } = req.body;

  if (!password) return res.status(400).json({ message: "Password is required" });

  // ✅ Hardcoded admin password
  if (password !== "admin@123") {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Create JWT token
  const token = jwt.sign({ role: "admin" }, "secretkey", { expiresIn: "1h" });

  res.json({
    success: true,
    message: "Login success",
    token,
    admin: { role: "admin" }
  });
});

module.exports = router;
