import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SAUserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`https://store-rating-app-hbvh.onrender.com/api/system-admin/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setUser(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load user details");
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Details</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Address:</strong> {user.address}</p>
      <p><strong>Role:</strong> {user.role}</p>

      {user.role === "store-owner" && (
        <p><strong>Rating:</strong> {user.rating || "No ratings yet"}</p>
      )}

      <button
        onClick={() => navigate(-1)}
        style={{ marginTop: "20px", padding: "10px", borderRadius: "5px" }}
      >
        Back
      </button>
    </div>
  );
};

export default SAUserDetails;
