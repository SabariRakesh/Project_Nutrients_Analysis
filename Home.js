// Home.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function Home() {
  const [foodName, setFoodName] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://6tbid4o9l4.execute-api.eu-north-1.amazonaws.com/prod", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ food_name: foodName, size }),
      });
      const data = await res.json();
      navigate("/details", { state: { data } });
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          <img src="/logo.jpg" alt="FoodApp Logo" className="logo-img" />
        </div>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Login</a>
          <a href="#">About</a>
        </div>
      </nav>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="form-card">
          <h2>Upload Food Details</h2>

          <label>Upload Food Image</label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

          <div className="divider">OR</div>

          <label>Food Name</label>
          <input type="text" value={foodName} onChange={(e) => setFoodName(e.target.value)} />

          <label>Size</label>
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="">Select size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>

          <label>Quantity</label>
          <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
