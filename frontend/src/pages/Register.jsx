import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: 1
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://store-rating-app-hbvh.onrender.com/api/users/register", form);
      console.log(res.data);
      alert("Registered successfully");
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.error || "Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="address" placeholder="Address" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} />
      <select name="role" onChange={handleChange}>
        <option value={1}>User</option>
        <option value={2}>Admin</option>
        <option value={3}>System Admin</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}
