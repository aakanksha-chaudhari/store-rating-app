import React, { useState, useEffect } from "react";
import axios from "axios";

const AddStore = () => {
  const [form, setForm] = useState({ name: "", address: "" });
  const [msg, setMsg] = useState("");
  const [stores, setStores] = useState([]);

  const fetchStores = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/system-admin/stores");
      setStores(res.data.stores);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/system-admin/stores",
        form
      );
      setMsg(res.data.message);
      setForm({ name: "", address: "" });
      fetchStores(); // refresh list
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to add store");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto" }}>
      <h2>Add Store</h2>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input placeholder="Store Name" name="name" value={form.name} onChange={handleChange} required />
        <input placeholder="Address" name="address" value={form.address} onChange={handleChange} required />
        <button type="submit" style={{ padding: "10px", cursor: "pointer" }}>Add Store</button>
      </form>

      <h3 style={{ marginTop: "30px" }}>All Stores</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Address</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Created At</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store.id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{store.id}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{store.name}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{store.address}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{new Date(store.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddStore;
