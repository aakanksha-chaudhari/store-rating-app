const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../config/db"); 

const router = express.Router();

// GET dashboard data (ratings + average)
router.get("/dashboard/:ownerId", async (req, res) => {
  const { ownerId } = req.params;

  try {
    // Get store by ownerId
    const [storeRows] = await db
      .promise()
      .query("SELECT * FROM stores WHERE ownerId = ?", [ownerId]);
    if (storeRows.length === 0) return res.status(404).json({ message: "Store not found" });

    const store = storeRows[0];

    // Get ratings for this store
    const [ratings] = await db
      .promise()
      .query("SELECT * FROM ratings WHERE storeId = ?", [store.id]);

    const avgRating =
      ratings.reduce((sum, r) => sum + r.rating, 0) / (ratings.length || 1);

    res.json({
      storeName: store.name,
      avgRating: avgRating.toFixed(1),
      ratings,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE password
router.put("/update-password/:id", async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  try {
    const [rows] = await db.promise().query("SELECT * FROM users WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ message: "User not found" });

    const user = rows[0];
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong current password" });

    const hashed = await bcrypt.hash(newPassword, 10);
    await db.promise().query("UPDATE users SET password = ? WHERE id = ?", [hashed, id]);

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
