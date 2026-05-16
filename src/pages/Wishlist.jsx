import React from "react";
import { useApp } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { wishlist, products } = useApp();
  const wishlisted = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="page-content">
      <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <h1 style={{ marginBottom: 8 }}>❤️ My Wishlist</h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: 40 }}>
          {wishlisted.length} saved item{wishlisted.length !== 1 ? "s" : ""}
        </p>

        {wishlisted.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <span style={{ fontSize: "4rem", display: "block", marginBottom: 16 }}>💔</span>
            <p style={{ color: "var(--text-muted)", marginBottom: 24 }}>
              Your wishlist is empty. Start saving products you love!
            </p>
            <Link to="/shop" className="btn-primary">Browse Products</Link>
          </div>
        ) : (
          <div className="products-grid">
            {wishlisted.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
