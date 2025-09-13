// backend/routes/rating.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");  // ✅ use mysql2 connection

// ✅ Add a rating
router.post("/add", (req, res) => {
  const { store_name, rating, comment } = req.body;

  if (!store_name || !rating) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const sql = "INSERT INTO ratings (store_name, rating, comment, created_at) VALUES (?, ?, ?, NOW())";
  db.query(sql, [store_name, rating, comment || ""], (err, result) => {
    if (err) {
      console.error("DB insert error:", err);
      return res.status(500).json({ error: "Server error while adding rating" });
    }
    res.json({ id: result.insertId, store_name, rating, comment });
  });
});

// ✅ Get all ratings
router.get("/", (req, res) => {
  const sql = "SELECT * FROM ratings ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("DB fetch error:", err);
      return res.status(500).json({ error: "Server error while fetching ratings" });
    }
    res.json(results);
  });
});

module.exports = router;
