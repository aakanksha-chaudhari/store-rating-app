import React, { useState, useEffect } from "react";
import axios from "axios";

const AddRating = () => {
  const [stores, setStores] = useState([]);
  const [form, setForm] = useState({ store_id: "", user_name: "", rating: "", comment: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get("https://store-rating-app-hbvh.onrender.com/api/system-admin/stores");
        setStores(res.data);
      } catch (err) {
        console.error(err);
        setMsg("Failed to load stores");
      }
    };
    fetchStores();
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("https://store-rating-app-hbvh.onrender.com/api/ratings/add", form);
      setMsg(res.data.message);
      setForm({ store_id: "", user_name: "", rating: "", comment: "" });
    } catch (err) {
      console.error(err);
      setMsg("Failed to add rating");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "30px auto" }}>
      <h2>Add Rating</h2>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleSubmit}>
        <select name="store_id" value={form.store_id} onChange={handleChange} required>
          <option value="">Select Store</option>
          {stores.map(store => (
            <option key={store.id} value={store.id}>{store.name}</option>
          ))}
        </select>
        <input name="user_name" placeholder="Your Name" value={form.user_name} onChange={handleChange} required />
        <input name="rating" type="number" placeholder="Rating (1-5)" value={form.rating} onChange={handleChange} required min="1" max="5" />
        <input name="comment" placeholder="Comment" value={form.comment} onChange={handleChange} />
        <button type="submit">Add Rating</button>
      </form>
    </div>
  );
};

export default AddRating;
