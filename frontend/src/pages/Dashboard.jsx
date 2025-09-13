import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userName = user.name || "User";
  const userEmail = user.email || "";

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome, {userName} 👋</h1>
      {userEmail && <p>Your email: {userEmail}</p>}

      <div style={{ marginTop: "30px" }}>
        <button onClick={() => navigate("/update-password")}>
  Update Password
</button>

        <button onClick={() => navigate("/stores")} style={{ marginRight: "10px" }}>
          View Stores
        </button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
