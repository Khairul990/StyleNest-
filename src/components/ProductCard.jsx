import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { formatPrice } from "../utils/helpers";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { settings } = useApp();
  const navigate = useNavigate();

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
      {/* Image */}
      <div className="card-image-wrap">
        <img
          src={product.images?.[0] || "https://via.placeholder.com/400x400?text=No+Image"}
          alt={product.name}
          className="card-image"
          loading="lazy"
        />
        {product.badge && <span className="badge card-badge">{product.badge}</span>}
        {product.discount > 0 && (
          <span className="discount-tag">-{product.discount}%</span>
        )}
      </div>

      {/* Info */}
      <div className="card-info">
        <p className="card-category">{product.category}</p>
        <h3 className="card-name">{product.name}</h3>
        <div className="card-pricing">
          <span className="card-price">{formatPrice(product.price, settings.currency)}</span>
          {product.originalPrice > product.price && (
            <span className="card-original">{formatPrice(product.originalPrice, settings.currency)}</span>
          )}
        </div>
        <div className="card-sizes">
          {product.sizes?.slice(0, 4).map((s) => (
            <span key={s} className="size-chip">{s}</span>
          ))}
        </div>
        <button
          className="btn-primary card-buy-btn"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/checkout?productId=${product.id}`);
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
