import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://store-rating-app-hbvh.onrender.com/api/system-admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(filter.toLowerCase()) ||
      u.email.toLowerCase().includes(filter.toLowerCase()) ||
      u.address.toLowerCase().includes(filter.toLowerCase()) ||
      u.role.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Users</h2>
      <input
        placeholder="Search by name/email/address/role"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ width: "100%", margin: "10px 0" }}
      />
      <table border="1" cellPadding="8" width="100%">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Address</th><th>Role</th><th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.address}</td>
              <td>{u.role}</td>
              <td>{u.role === "store_owner" ? u.rating : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
