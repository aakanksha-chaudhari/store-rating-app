import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageStores = () => {
  const [stores, setStores] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchStores = async () => {
    try {
      const res = await axios.get("https://store-rating-app-hbvh.onrender.com/api/system-admin/stores");
      setStores(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch stores");
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const filtered = stores.filter(
    (s) =>
      s.name.toLowerCase().includes(filter.toLowerCase()) ||
      s.email.toLowerCase().includes(filter.toLowerCase()) ||
      s.address.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Stores</h2>
      <input
        placeholder="Search by name/email/address"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ width: "100%", margin: "10px 0" }}
      />
      <table border="1" cellPadding="8" width="100%">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Address</th><th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.address}</td>
              <td>{s.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageStores;
