import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import "./Navbar.css";

export default function Navbar() {
  const { settings } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/categories", label: "Categories" },
    { to: "/track-order", label: "Track Order" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="navbar">
      <div className="container nav-inner">
        {/* Logo */}
        <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-icon">◆</span>
          <span className="logo-text">{settings.siteName}</span>
        </Link>

        {/* Desktop links */}
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="nav-link">{l.label}</Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="nav-actions">
          <button className="btn-primary nav-shop-btn" onClick={() => navigate("/shop")}>
            Shop Now
          </button>
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu animate-fadeIn">
          <ul>
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="mobile-link" onClick={() => setMenuOpen(false)}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
