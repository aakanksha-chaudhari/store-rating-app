import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://store-rating-app-hbvh.onrender.com/api/admin/login", { password });
      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.admin));
        navigate("/storeOwner/StoreOwnerDashboard");
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>Store Owner Login</h2>
      <p style={{ color: "gray", marginBottom: "10px" }}>Passkey :- admin@123</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter Admin Passkey"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", margin: "8px 0" }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            background: "#333",
            color: "#fff",
            padding: "10px",
            border: "none",
            cursor: "pointer"
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
