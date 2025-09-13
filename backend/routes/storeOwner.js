const express = require("express");
const router = express.Router();
const db = require("../config/db"); // mysql2 connection

// Example: fetch users who rated the store
router.get("/ratings/:storeId", (req, res) => {
  const storeId = req.params.storeId;
  db.query(
    "SELECT * FROM ratings WHERE store_id = ?",
    [storeId],
    (err, results) => {
      if (err) return res.status(500).json({ error: "DB error" });
      res.json(results);
    }
  );
});

module.exports = router;
