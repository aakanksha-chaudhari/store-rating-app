import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SystemAdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0
  });

  const fetchStats = async () => {
    try {
      const res = await axios.get("https://store-rating-app-hbvh.onrender.com/api/system-admin/stats", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setStats(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load stats");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/system-login");
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>System Administrator Dashboard</h1>
      <hr />
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{ background: "#eee", padding: "20px", borderRadius: "8px" }}>
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div style={{ background: "#eee", padding: "20px", borderRadius: "8px" }}>
          <h3>Total Stores</h3>
          <p>{stats.totalStores}</p>
        </div>
        <div style={{ background: "#eee", padding: "20px", borderRadius: "8px" }}>
          <h3>Total Ratings</h3>
          <p>{stats.totalRatings}</p>
        </div>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h2>Quick Links</h2>
        <ul>
          <li><button onClick={() => navigate("/system-admin/manage-users")}>Manage Users</button></li>
          <li><button onClick={() => navigate("/system-admin/add-user")}>Add User</button></li>
          <li><button onClick={() => navigate("/system-admin/manage-stores")}>Manage Stores</button></li>
          <li><button onClick={() => navigate("/system-admin/add-store")}>Add Store</button></li>
        </ul>
      </div>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "40px",
          padding: "10px 20px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default SystemAdminDashboard;
