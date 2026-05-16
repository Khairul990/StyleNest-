import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import "./Navbar.css";

export default function Navbar() {
  const { settings, isDarkMode, toggleDarkMode } = useApp();
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
          {/* Dark / Light mode toggle */}
          <button
            className={`theme-toggle ${isDarkMode ? "is-dark" : "is-light"}`}
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            title={isDarkMode ? "Light Mode" : "Dark Mode"}
          >
            <span className="theme-toggle-track">
              <span className="theme-toggle-thumb">
                {isDarkMode ? (
                  /* Moon icon */
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>
                  </svg>
                ) : (
                  /* Sun icon */
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                )}
              </span>
            </span>
            <span className="theme-toggle-label">
              {isDarkMode ? "Dark" : "Light"}
            </span>
          </button>

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
            {/* Mobile mode toggle */}
            <li>
              <button
                className="mobile-mode-toggle"
                onClick={() => { toggleDarkMode(); setMenuOpen(false); }}
              >
                {isDarkMode ? "☀️ Switch to Light Mode" : "🌙 Switch to Dark Mode"}
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
