const db = require("../config/db");

// Add rating
const addRating = (req, res) => {
  const { store_name, rating, comment } = req.body;

  if (!store_name || !rating) {
    return res.status(400).json({ error: "Store name and rating are required" });
  }

  const sql = "INSERT INTO ratings (store_name, rating, comment) VALUES (?, ?, ?)";
  db.query(sql, [store_name, rating, comment], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Rating added successfully", id: result.insertId });
  });
};

// Get all ratings
const db = require("../config/db");

const getRatings = (req, res) => {
  const sql = `
    SELECT r.id, r.rating, r.created_at,
           s.name AS store_name
    FROM ratings r
    JOIN stores s ON r.store_id = s.id
    ORDER BY r.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
};

module.exports = { getRatings };


// Export both functions
module.exports = { addRating, getRatings };
