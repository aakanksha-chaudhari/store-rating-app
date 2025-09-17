import React, { useState } from "react";
import axios from "axios";

const StoreOwnerUpdatePassword = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`https://store-rating-app-hbvh.onrender.com/api/store-owner/update-password/${user._id}`, {
        currentPassword,
        newPassword
      });
      alert("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      alert(err.response?.data?.message || "Error updating password");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "30px" }}>
      <h2>Update Password</h2>
      <input
        placeholder="Current Password"
        type="password"
        value={currentPassword}
        onChange={e => setCurrentPassword(e.target.value)}
      /><br/>
      <input
        placeholder="New Password"
        type="password"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
      /><br/>
      <button type="submit">Update</button>
    </form>
  );
};

export default StoreOwnerUpdatePassword;
