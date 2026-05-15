import React from "react";
import { useNavigate } from "react-router-dom";
import "./CategoryCard.css";

export default function CategoryCard({ category }) {
  const navigate = useNavigate();
  return (
    <div
      className="category-card"
      onClick={() => navigate(`/shop?category=${category.id}`)}
      style={{ "--cat-color": category.color }}
    >
      <div className="cat-icon">{category.icon}</div>
      <h3 className="cat-name">{category.name}</h3>
      <p className="cat-desc">{category.description}</p>
      <span className="cat-arrow">→</span>
    </div>
  );
}
