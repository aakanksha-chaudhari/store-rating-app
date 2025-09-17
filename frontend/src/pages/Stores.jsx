// pages/Stores.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [userRatings, setUserRatings] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const userId = localStorage.getItem("userId") || 1;

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get("https://store-rating-app-hbvh.onrender.com/api/stores", {
          params: { userId },
        });
        setStores(res.data);

        const map = {};
        res.data.forEach((s) => {
          map[s.store_id] = s.user_rating || "";
        });
        setUserRatings(map);
      } catch (err) {
        console.error("Error fetching stores:", err);
        alert("❌ Failed to load stores");
      }
    };
    fetchStores();
  }, [userId]);

  const handleRate = async (storeId) => {
    const rating = userRatings[storeId];
    if (!rating || rating < 1 || rating > 5) {
      alert("Please enter a rating between 1 and 5");
      return;
    }

    try {
      await axios.post("https://store-rating-app-hbvh.onrender.com/api/stores/rate", {
        user_id: userId,
        store_id: storeId,
        rating,
      });
      alert("✅ Rating submitted!");
    } catch (err) {
      console.error("Error submitting rating:", err);
      alert("❌ Failed to submit rating");
    }
  };

  // Filter stores by search query
  const filteredStores = stores.filter(
    (s) =>
      s.store_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Stores</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Store Name or Address"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "15px", padding: "5px", width: "300px" }}
      />

      <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Store Name</th>
            <th>Address</th>
            <th>Overall Rating</th>
            <th>Your Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStores.map((s) => (
            <tr key={s.store_id}>
              <td>{s.store_name}</td>
              <td>{s.address}</td>
              <td>{s.overall_rating || 0}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={userRatings[s.store_id] || ""}
                  onChange={(e) =>
                    setUserRatings({ ...userRatings, [s.store_id]: e.target.value })
                  }
                  style={{ width: "50px" }}
                />
              </td>
              <td>
                <button onClick={() => handleRate(s.store_id)}>Save</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
