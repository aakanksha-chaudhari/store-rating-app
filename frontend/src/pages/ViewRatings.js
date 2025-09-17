// frontend/src/ViewRatings.js
import React, { useEffect, useState } from "react";

function ViewRatings() {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    fetch("https://store-rating-app-hbvh.onrender.com/api/ratings")
      .then((res) => res.json())
      .then((data) => setRatings(data))
      .catch((err) => console.error("Error fetching ratings:", err));
  }, []);

  return (
    <div>
      <h2>All Store Ratings</h2>
      <ul>
        {ratings.map((r) => (
          <li key={r.id}>
            <strong>{r.store_name}</strong> ⭐ {r.rating} <br />
            {r.comment} <br />
            <small>{new Date(r.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewRatings;
