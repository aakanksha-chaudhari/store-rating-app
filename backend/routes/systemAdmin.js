import express from "express";
import db from "../config/db.js"; // your MySQL connection

const router = express.Router();

// 📊 Get Stats
router.get("/stats", async (req, res) => {
  try {
    const [users] = await db.query("SELECT COUNT(*) AS count FROM users");
    const [stores] = await db.query("SELECT COUNT(*) AS count FROM stores");
    const [ratings] = await db.query("SELECT COUNT(*) AS count FROM ratings");

    res.json({
      totalUsers: users[0].count,
      totalStores: stores[0].count,
      totalRatings: ratings[0].count
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get stats" });
  }
});

// 👥 Get All Users (Normal + Admin)
router.get("/users", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, name, email, address, role FROM users"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// ➕ Add User
router.post("/users", async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;
    await db.query(
      "INSERT INTO users (name, email, password, address, role) VALUES (?,?,?,?,?)",
      [name, email, password, address, role]
    );
    res.json({ success: true, message: "User added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add user" });
  }
});

// 🏪 Get All Stores
router.get("/stores", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, name, email, address, rating FROM stores"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch stores" });
  }
});

// ➕ Add Store
router.post("/stores", async (req, res) => {
  try {
    const { name, email, address } = req.body;
    await db.query(
      "INSERT INTO stores (name, email, address) VALUES (?,?,?)",
      [name, email, address]
    );
    res.json({ success: true, message: "Store added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add store" });
  }
});

export default router;
