import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    users: 0,
    stores: 0,
    ratings: 0,
  });

  const user = JSON.parse(localStorage.getItem("user") || "null");

  // ✅ Redirect if not admin
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [user, navigate]);

  // ✅ Fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/stats", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome Admin, {user?.name || user?.email}</h1>

      {/* Stats Section */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        <div style={cardStyle}>
          <h2>{stats.users}</h2>
          <p>Total Users</p>
        </div>
        <div style={cardStyle}>
          <h2>{stats.stores}</h2>
          <p>Total Stores</p>
        </div>
        <div style={cardStyle}>
          <h2>{stats.ratings}</h2>
          <p>Total Ratings</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "40px",
          flexWrap: "wrap",
        }}
      >
        <button onClick={() => navigate("/admin/manage-users")} style={btnStyle}>
          Manage Users
        </button>
        <button onClick={() => navigate("/admin/add-user")} style={btnStyle}>
          Add User
        </button>
        <button onClick={() => navigate("/admin/manage-stores")} style={btnStyle}>
          Manage Stores
        </button>
        <button onClick={() => navigate("/admin/add-store")} style={btnStyle}>
          Add Store
        </button>
        <button onClick={handleLogout} style={logoutBtnStyle}>
          Logout
        </button>
      </div>
    </div>
  );
};

const cardStyle = {
  flex: "1 1 200px",
  background: "#f4f4f4",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
};

const btnStyle = {
  padding: "12px 20px",
  background: "#333",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const logoutBtnStyle = {
  ...btnStyle,
  background: "#ff4444",
};

export default AdminDashboard;
