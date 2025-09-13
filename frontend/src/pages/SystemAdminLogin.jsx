import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SystemAdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/system-admin/login", { password });
      if (res.data.success) {
        localStorage.setItem("systemAdmin", JSON.stringify(res.data.systemAdmin));
        navigate("/system-admin/dashboard");
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>SA Passkey</h2>
      <p style={{ color: "gray", marginBottom: "10px" }}>Passkey :- system@123</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter SA Passkey"
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

export default SystemAdminLogin;
