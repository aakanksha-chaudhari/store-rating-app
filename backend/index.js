const express = require("express");
const cors = require("cors");

const systemAdminRoutes = require("./routes/systemAdminRoutes");
const storeOwnerRoutes = require("./routes/storeOwner"); // optional if you have other routes
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const ratingRoutes = require("./routes/rating"); //

require("./config/db"); // MySQL2 connection

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Routes

app.use("/api/system-admin", systemAdminRoutes);
app.use("/api/store-owner", storeOwnerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ratings", ratingRoutes); 

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
