import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import CustomSelect from "../components/CustomSelect";
import "./Shop.css";

export default function Shop() {
  const { products, categories } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const activeCategory = searchParams.get("category") || "all";

  const setCategory = (cat) => {
    if (cat === "all") searchParams.delete("category");
    else searchParams.set("category", cat);
    setSearchParams(searchParams);
  };

  // Filter
  let filtered = products;
  if (activeCategory !== "all") {
    filtered = filtered.filter((p) => p.category === activeCategory);
  }
  if (search) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Sort
  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "discount") filtered = [...filtered].sort((a, b) => b.discount - a.discount);

  return (
    <div className="page-content">
      {/* Page Header */}
      <div className="shop-header">
        <div className="container">
          <h1>Our Collection</h1>
          <p>Discover premium fashion pieces curated just for you</p>
        </div>
      </div>

      <div className="container shop-layout">
        {/* Sidebar / Filters */}
        <aside className="shop-sidebar">
          <div className="filter-section">
            <h4>Categories</h4>
            <ul className="cat-filter-list">
              <li>
                <button
                  className={`cat-filter-btn ${activeCategory === "all" ? "active" : ""}`}
                  onClick={() => setCategory("all")}
                >
                  All Products
                </button>
              </li>
              {categories.map((c) => (
                <li key={c.id}>
                  <button
                    className={`cat-filter-btn ${activeCategory === c.id ? "active" : ""}`}
                    onClick={() => setCategory(c.id)}
                  >
                    {c.icon} {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main product area */}
        <main className="shop-main">
          {/* Search + Sort bar */}
          <div className="shop-toolbar">
            <input
              className="form-control search-input"
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <CustomSelect
              value={sort}
              onChange={setSort}
              options={[
                { value: "default", label: "Sort: Default" },
                { value: "price-asc", label: "Price: Low to High" },
                { value: "price-desc", label: "Price: High to Low" },
                { value: "discount", label: "Most Discounted" },
              ]}
              style={{ flex: "0 0 200px" }}
            />
          </div>

          <p className="result-count">{filtered.length} products found</p>

          {filtered.length > 0 ? (
            <div className="products-grid">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <span>🛍️</span>
              <p>No products found. Try a different search or category.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
