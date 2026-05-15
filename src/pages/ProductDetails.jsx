import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { formatPrice } from "../utils/helpers";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, settings } = useApp();

  const product = products.find((p) => p.id === id);

  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="page-content">
        <div className="container" style={{ textAlign: "center", padding: "80px 0" }}>
          <h2>Product not found</h2>
          <button className="btn-primary" style={{ marginTop: 24 }} onClick={() => navigate("/shop")}>
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleBuyNow = () => {
    const params = new URLSearchParams({
      productId: product.id,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
    navigate(`/checkout?${params.toString()}`);
  };

  return (
    <div className="page-content">
      <div className="container pd-container">
        {/* Back */}
        <button className="btn-ghost back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="pd-layout">
          {/* Image Gallery */}
          <div className="pd-gallery">
            <img
              src={product.images?.[activeImg] || "https://via.placeholder.com/600"}
              alt={product.name}
              className="pd-main-img"
            />
            {product.images?.length > 1 && (
              <div className="pd-thumbnails">
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`View ${i + 1}`}
                    className={`pd-thumb ${activeImg === i ? "active" : ""}`}
                    onClick={() => setActiveImg(i)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="pd-details">
            {product.badge && <span className="badge">{product.badge}</span>}
            <h1 className="pd-name">{product.name}</h1>
            <p className="pd-category">Category: {product.category}</p>

            {/* Price */}
            <div className="pd-pricing">
              <span className="pd-price">{formatPrice(product.price, settings.currency)}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="pd-original">{formatPrice(product.originalPrice, settings.currency)}</span>
                  <span className="pd-saving">Save {product.discount}%</span>
                </>
              )}
            </div>

            <p className="pd-desc">{product.description}</p>

            {/* Size */}
            <div className="pd-option-group">
              <label>Size: {selectedSize && <strong>{selectedSize}</strong>}</label>
              <div className="option-chips">
                {product.sizes?.map((s) => (
                  <button
                    key={s}
                    className={`option-chip ${selectedSize === s ? "active" : ""}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="pd-option-group">
              <label>Color: {selectedColor && <strong>{selectedColor}</strong>}</label>
              <div className="option-chips">
                {product.colors?.map((c) => (
                  <button
                    key={c}
                    className={`option-chip ${selectedColor === c ? "active" : ""}`}
                    onClick={() => setSelectedColor(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="pd-option-group">
              <label>Quantity</label>
              <div className="qty-control">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            {/* Buy Now */}
            <button className="btn-primary pd-buy-btn" onClick={handleBuyNow}>
              🛒 Buy Now
            </button>

            {/* Trust */}
            <div className="pd-trust">
              <span>🚚 Free Delivery</span>
              <span>🔄 7-Day Return</span>
              <span>🔒 Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
