const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Add a rating
router.post("/add", (req, res) => {
  const { store_id, user_name, rating, comment } = req.body;

  if (!store_id || !user_name || !rating) {
    return res.status(400).json({ message: "All required fields must be filled" });
  }

  const sql = "INSERT INTO ratings (store_id, user_name, rating, comment, created_at) VALUES (?, ?, ?, ?, NOW())";
  db.query(sql, [store_id, user_name, rating, comment || ""], (err, result) => {
    if (err) {
      console.error("DB Insert Error:", err);
      return res.status(500).json({ message: "Failed to add rating", error: err });
    }
    res.json({ message: "Rating added successfully", id: result.insertId });
  });
});

// Get all ratings for a store
router.get("/:storeId", (req, res) => {
  const storeId = req.params.storeId;
  db.query("SELECT * FROM ratings WHERE store_id = ?", [storeId], (err, results) => {
    if (err) return res.status(500).json({ message: "Failed to fetch ratings", error: err });
    res.json(results);
  });
});

module.exports = router;
