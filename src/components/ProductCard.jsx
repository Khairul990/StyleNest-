import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { formatPrice } from "../utils/helpers";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { settings, toggleWishlist, isWishlisted, addToCart } = useApp();
  const wishlisted = isWishlisted(product.id);

  const handleBuyNow = (e) => {
    e.stopPropagation();
    navigate(`/checkout?productId=${product.id}`);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, product.sizes?.[0] || "", product.colors?.[0] || "", 1);
  };

  const handleCardClick = () => navigate(`/product/${product.id}`);

  return (
    <div className="product-card" onClick={handleCardClick}>
      {/* Image */}
      <div className="card-image-wrap">
        <img
          src={product.images?.[0] || "https://via.placeholder.com/400"}
          alt={product.name}
          className="card-image"
          loading="lazy"
        />

        {/* Badges */}
        {product.badge && <span className="badge card-badge">{product.badge}</span>}
        {product.discount > 0 && (
          <span className="discount-tag">-{product.discount}%</span>
        )}

        {/* Wishlist heart */}
        <button
          className={`card-wishlist-btn ${wishlisted ? "wishlisted" : ""}`}
          onClick={handleWishlist}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {wishlisted ? "❤️" : "🤍"}
        </button>

        {/* Quick add to cart on hover */}
        <button className="card-cart-btn" onClick={handleAddToCart} aria-label="Add to cart">
          🛒 Add to Cart
        </button>
      </div>

      {/* Info */}
      <div className="card-info">
        <p className="card-category">{product.category}</p>
        <h3 className="card-name">{product.name}</h3>

        {/* Sizes preview */}
        {product.sizes?.length > 0 && (
          <div className="card-sizes">
            {product.sizes.slice(0, 4).map((s) => (
              <span key={s} className="size-chip">{s}</span>
            ))}
            {product.sizes.length > 4 && (
              <span className="size-chip">+{product.sizes.length - 4}</span>
            )}
          </div>
        )}

        {/* Pricing */}
        <div className="card-pricing">
          <span className="card-price">
            {formatPrice(product.price, settings.currency)}
          </span>
          {product.originalPrice > product.price && (
            <span className="card-original">
              {formatPrice(product.originalPrice, settings.currency)}
            </span>
          )}
        </div>

        {/* Buy Now */}
        <button className="btn-primary card-buy-btn" onClick={handleBuyNow}>
          Buy Now
        </button>
      </div>
    </div>
  );
}
