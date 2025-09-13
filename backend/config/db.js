const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "aakanksha1212@",
  database: "store_rating",
});

db.connect((err) => {
  if (err) {
    console.log("❌ DB connection error:", err);
  } else {
    console.log("✅ DB connected");
  }
});

module.exports = db;
