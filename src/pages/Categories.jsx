import React from "react";
import { useApp } from "../context/AppContext";
import CategoryCard from "../components/CategoryCard";

export default function Categories() {
  const { categories } = useApp();
  return (
    <div className="page-content">
      <div className="shop-header" style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-color)", padding: "60px 0 40px", textAlign: "center" }}>
        <div className="container">
          <p className="overline" style={{ color: "var(--accent)", fontWeight: 700, letterSpacing: 3, fontSize: "0.8rem", textTransform: "uppercase", marginBottom: 12 }}>Browse</p>
          <h1>All Categories</h1>
          <p style={{ color: "var(--text-secondary)", marginTop: 10 }}>Find everything you love in one place</p>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <div className="categories-grid">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
