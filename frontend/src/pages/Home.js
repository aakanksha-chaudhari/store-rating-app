import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

const handleSelectRole = (role) => {
  localStorage.setItem("selectedRole", role);

  if (role === "user") {
    navigate("/register");
  } else if (role === "admin") {
    navigate("/admin-login");
  } else if (role === "system") {
    navigate("/system-login");
  }
};


  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        color: "#fff",
        textAlign: "center",
        padding: "40px",
      }}
    >
      <h1 style={{ fontSize: "2.8rem", marginBottom: "15px" }}>
        ⭐ Welcome to Store Rating System
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "40px", maxWidth: "600px" }}>
        Rate stores, manage users and explore insights — choose your role to get started.
      </p>

      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
        <div
          onClick={() => handleSelectRole("user")}
          style={roleCardStyle("#34d399")}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <h2>User</h2>
          <p>View & give ratings to stores</p>
        </div>

        <div
          onClick={() => handleSelectRole("admin")}
          style={roleCardStyle("#fbbf24")}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <h2>Admin</h2>
          <p>Manage users and stores</p>
        </div>

        <div
          onClick={() => handleSelectRole("system")}
          style={roleCardStyle("#60a5fa")}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <h2>System Admin</h2>
          <p>Advanced system management</p>
        </div>
      </div>

      <p style={{ marginTop: "50px", fontSize: "1rem" }}>
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          style={{ color: "#fff", textDecoration: "underline", cursor: "pointer" }}
        >
          Login here
        </span>
      </p>
    </div>
  );
}

const roleCardStyle = (color) => ({
  background: color,
  padding: "30px",
  borderRadius: "12px",
  width: "220px",
  cursor: "pointer",
  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  transition: "transform 0.2s",
  color: "#fff",
  textAlign: "center",
});

export default Home;
