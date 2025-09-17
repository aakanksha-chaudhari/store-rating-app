import React, { useState } from "react";
import axios from "axios";

const SAAddUser = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", address: "", role: "normal" });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post("https://store-rating-app-hbvh.onrender.com/api/system-admin/users", form);
    alert("User added");
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
      <h2>Add User</h2>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} /><br/>
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} /><br/>
      <input placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} /><br/>
      <input placeholder="Address" onChange={e => setForm({ ...form, address: e.target.value })} /><br/>
      <select onChange={e => setForm({ ...form, role: e.target.value })}>
        <option value="normal">Normal</option>
        <option value="admin">Admin</option>
        <option value="storeOwner">Store Owner</option>
      </select><br/>
      <button type="submit">Add</button>
    </form>
  );
};

export default SAAddUser;
