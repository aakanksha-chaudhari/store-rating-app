import React, { useState } from "react";
import axios from "axios";

const AddUser = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "user"
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://store-rating-app-hbvh.onrender.com/api/system-admin/users", form);
      setMsg("User added successfully!");
      setForm({ name: "", email: "", password: "", address: "", role: "user" });
    } catch (err) {
      console.error(err);
      setMsg("Failed to add user");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "30px auto" }}>
      <h2>Add User</h2>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" name="name" value={form.name} onChange={handleChange} required />
        <input placeholder="Email" name="email" value={form.email} onChange={handleChange} required />
        <input placeholder="Password" type="password" name="password" value={form.password} onChange={handleChange} required />
        <input placeholder="Address" name="address" value={form.address} onChange={handleChange} required />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="user">Normal User</option>
          <option value="admin">Admin</option>
          <option value="store_owner">Store Owner</option>
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddUser;
