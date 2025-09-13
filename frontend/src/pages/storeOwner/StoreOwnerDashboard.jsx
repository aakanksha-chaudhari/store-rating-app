import React, { useEffect, useState } from "react";
import axios from "axios";

const StoreOwnerDashboard = () => {
  const [storeName, setStoreName] = useState("");
  const [ratings, setRatings] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });
  const [message, setMessage] = useState("");

  const ownerId = JSON.parse(localStorage.getItem("user"))?.id;

  // Fetch dashboard data
  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/store-owner/dashboard/${ownerId}`);
      setStoreName(res.data.storeName);
      setRatings(res.data.ratings);
      setAvgRating(res.data.avgRating);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle password update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5000/api/store-owner/update-password/${ownerId}`,
        passwords
      );
      setMessage(res.data.message);
      setPasswords({ currentPassword: "", newPassword: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Error updating password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/admin-login";
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto" }}>
      <h1>{storeName} - Dashboard</h1>
      <h3>Average Rating: {avgRating}</h3>

      <h2>User Ratings</h2>
      <table border="1" cellPadding="8" style={{ width: "100%", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Rating</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {ratings.map((r) => (
            <tr key={r.id}>
              <td>{r.userId}</td>
              <td>{r.rating}</td>
              <td>{r.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Update Password</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handlePasswordUpdate}>
        <input
          type="password"
          placeholder="Current Password"
          value={passwords.currentPassword}
          onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
          style={{ margin: "5px", padding: "8px", width: "calc(50% - 12px)" }}
        />
        <input
          type="password"
          placeholder="New Password"
          value={passwords.newPassword}
          onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
          style={{ margin: "5px", padding: "8px", width: "calc(50% - 12px)" }}
        />
        <button type="submit" style={{ padding: "10px 20px", margin: "10px 0" }}>Update</button>
      </form>

      <button
        onClick={handleLogout}
        style={{ background: "#333", color: "#fff", padding: "10px 20px", cursor: "pointer" }}
      >
        Logout
      </button>
    </div>
  );
};

export default StoreOwnerDashboard;
