const express = require("express");
const router = express.Router();
const db = require("../config/db");

// System Admin Login
router.post("/login", (req, res) => {
  const { password } = req.body;
  if (password === "system@123") {
    return res.json({
      success: true,
      systemAdmin: { role: "system-admin" },
      token: "system-admin-token"
    });
  } else {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Fetch all stores
router.get("/stores", (req, res) => {
  db.query("SELECT * FROM stores", (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch stores", details: err });
    res.json(results);
  });
});

module.exports = router;
