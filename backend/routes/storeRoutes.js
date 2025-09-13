// routes/storeRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET all stores with average rating and user rating
router.get("/", (req, res) => {
  const userId = req.query.userId || 0; // optional: for fetching user rating

  const sql = `
    SELECT s.id AS store_id, s.name AS store_name, s.address,
           IFNULL(ROUND(AVG(r.rating),1),0) AS overall_rating,
           (SELECT rating FROM ratings WHERE user_id=? AND store_id=s.id) AS user_rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    GROUP BY s.id
  `;
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST /rate - submit or update rating
router.post("/rate", (req, res) => {
  const { user_id, store_id, rating } = req.body;

  if (!user_id || !store_id || !rating)
    return res.status(400).json({ error: "user_id, store_id, and rating are required" });

  const sql = `
    INSERT INTO ratings (user_id, store_id, rating)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE rating=VALUES(rating)
  `;

  db.query(sql, [user_id, store_id, rating], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Rating saved successfully" });
  });
});

module.exports = router;
