import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SAManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/system-admin/users")
      .then(res => setUsers(res.data));
  }, []);

  const filtered = users.filter(u =>
    [u.name, u.email, u.address, u.role].some(f => f?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Users</h2>
      <input placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />
      <table border="1">
        <thead><tr><th>Name</th><th>Email</th><th>Address</th><th>Role</th></tr></thead>
        <tbody>
          {filtered.map(u => (
            <tr key={u._id} onClick={() => navigate(`/system-admin/user/${u._id}`)}>
              <td>{u.name}</td><td>{u.email}</td><td>{u.address}</td><td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default SAManageUsers;
