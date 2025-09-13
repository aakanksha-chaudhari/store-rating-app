import React, { useState, useEffect } from "react";
import axios from "axios";

function AddRating() {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const userId = localStorage.getItem("userId") || 1;

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/stores");
        setStores(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load stores");
      }
    };
    fetchStores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStore || !rating) {
      setMessage("Please select a store and enter rating");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/stores/rate", {
        user_id: userId,
        store_id: selectedStore,
        rating,
      });
      setMessage("✅ Rating submitted!");
      setRating("");
      setSelectedStore("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to submit rating");
    }
  };

  return (
    <div>
      <h2>Add Store Rating</h2>
      <form onSubmit={handleSubmit}>
        <select value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)} required>
          <option value="">Select Store</option>
          {stores.map((s) => (
            <option key={s.store_id} value={s.store_id}>
              {s.store_name}
            </option>
          ))}
        </select>
        <br />
        <input
          type="number"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
          required
        />
        <br />
        <textarea
          placeholder="Comment (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default AddRating;
