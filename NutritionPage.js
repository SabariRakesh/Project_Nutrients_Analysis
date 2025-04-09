// NutritionPage.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./NutritionDetails.css";

const renderValue = (value) => {
  if (typeof value === "object" && value !== null) {
    return (
      <ul>
        {Object.entries(value).map(([k, v]) => (
          <li key={k}><strong>{k}:</strong> {renderValue(v)}</li>
        ))}
      </ul>
    );
  }
  return <span>{value}</span>;
};

export default function NutritionPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const data = state?.data;

  if (!data) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>No data found. Please go back and submit again.</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="nutrition-details">
      <h2>Nutrition Details</h2>
      <ul>
        {Object.entries(data).map(([key, value]) => (
          <li key={key}>
            <strong>{key.replace(/_/g, " ")}:</strong> {renderValue(value)}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
}
