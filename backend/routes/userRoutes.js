const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db"); // ✅ fixed path

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, address, password, role } = req.body;

  if (!name || !email || !password || !role)
    return res.status(400).json({ error: "All fields are required" });

  try {
    const [userCheck] = await db
      .query("SELECT * FROM users WHERE email = ?", { replacements: [email] });

    if (userCheck.length > 0)
      return res.status(400).json({ error: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (name, email, address, password, role, created_at) VALUES (?,?,?,?,?,NOW())",
      { replacements: [name, email, address || "", hashed, role] }
    );

    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "All fields are required" });

  try {
    const [rows] = await db
      .query("SELECT * FROM users WHERE email = ?", { replacements: [email] });

    if (rows.length === 0)
      return res.status(400).json({ error: "Invalid email or password" });

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      "secretkey",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login success",
      token,
      user: { id: user.id, name: user.name, role: user.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
