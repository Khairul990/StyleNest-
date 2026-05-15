import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import "./Home.css";

export default function Home() {
  const { settings, products, categories } = useApp();
  const navigate = useNavigate();

  const featured = products.filter((p) => p.featured).slice(0, 8);

  return (
    <div>
      {/* ── Hero Section ─────────────────────────────── */}
      <section
        className="hero"
        style={{
          backgroundImage: settings.heroBg
            ? `url(${settings.heroBg})`
            : `url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80)`,
        }}
      >
        <div className="hero-overlay" />
        <div className="container hero-content animate-fadeUp">
          <p className="hero-overline">✦ Premium Fashion Brand</p>
          <h1 className="hero-title">{settings.heroTitle}</h1>
          <p className="hero-subtitle">{settings.heroSubtitle}</p>
          <div className="hero-actions">
            <button className="btn-primary hero-btn" onClick={() => navigate("/shop")}>
              {settings.heroButtonText}
            </button>
            <button className="btn-outline hero-btn-outline" onClick={() => navigate("/categories")}>
              Browse Categories
            </button>
          </div>
        </div>
      </section>

      {/* ── Trust Badges ─────────────────────────────── */}
      <section className="trust-bar">
        <div className="container trust-grid">
          {[
            { icon: "🚚", label: "Free Delivery", sub: "On orders above ৳999" },
            { icon: "🔄", label: "Easy Returns", sub: "7-day return policy" },
            { icon: "🔒", label: "Secure Payment", sub: "100% safe & secure" },
            { icon: "💬", label: "24/7 Support", sub: "WhatsApp support" },
          ].map((b) => (
            <div key={b.label} className="trust-item">
              <span className="trust-icon">{b.icon}</span>
              <div>
                <p className="trust-label">{b.label}</p>
                <p className="trust-sub">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Categories ───────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="overline">Browse</p>
            <h2>Shop by Category</h2>
            <div className="divider" />
          </div>
          <div className="categories-grid">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────── */}
      <section className="section featured-section">
        <div className="container">
          <div className="section-header">
            <p className="overline">Handpicked</p>
            <h2>Featured Products</h2>
            <div className="divider" />
            <p>Discover our most loved styles this season</p>
          </div>
          <div className="products-grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="view-all-wrap">
            <button className="btn-outline" onClick={() => navigate("/shop")}>
              View All Products →
            </button>
          </div>
        </div>
      </section>

      {/* ── Promo Banner ─────────────────────────────── */}
      <section className="promo-banner">
        <div className="container promo-inner">
          <div className="promo-text">
            <p className="overline">Limited Time Offer</p>
            <h2>Up to 50% Off</h2>
            <p>On select items. Shop now and save big on premium fashion!</p>
            <button className="btn-primary" onClick={() => navigate("/shop?category=offers")}>
              Shop Offers →
            </button>
          </div>
          <div className="promo-image">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80"
              alt="Fashion offer"
            />
          </div>
        </div>
      </section>

      {/* ── New Arrivals ──────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="overline">Just In</p>
            <h2>New Arrivals</h2>
            <div className="divider" />
          </div>
          <div className="products-grid">
            {products.filter((p) => p.badge === "New Arrival").slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
