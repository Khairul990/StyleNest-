import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import CartDrawer from "./CartDrawer";
import "./Navbar.css";

export default function Navbar() {
  const { settings, isDarkMode, toggleDarkMode, cartCount, wishlist, locale, setForceShowRegion, t } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { to: "/", label: t.home },
    { to: "/shop", label: t.shop },
    { to: "/categories", label: t.categories },
    { to: "/track-order", label: t.trackOrder },
    { to: "/about", label: t.about },
  ];

  return (
    <>
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
            {/* Locale Selector */}
            {locale && (
              <button 
                className="nav-locale-btn" 
                onClick={() => setForceShowRegion(true)}
                title={`Region: ${locale.country}`}
              >
                <span className="nav-flag">{locale.flag}</span>
                <span className="nav-currency-code">{locale.currencyCode}</span>
              </button>
            )}

            {/* Dark / Light toggle */}
            <button
              className={`theme-toggle ${isDarkMode ? "is-dark" : "is-light"}`}
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              title={isDarkMode ? "Light Mode" : "Dark Mode"}
            >
              <span className="theme-toggle-track">
                <span className="theme-toggle-thumb">
                  {isDarkMode ? (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>
                    </svg>
                  ) : (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
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
              <span className="theme-toggle-label">{isDarkMode ? "Dark" : "Light"}</span>
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" className="nav-icon-btn" title={t.wishlist} aria-label={t.wishlist}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {wishlist.length > 0 && (
                <span className="nav-badge">{wishlist.length}</span>
              )}
            </Link>

            {/* Cart */}
            <button className="nav-icon-btn" onClick={() => setCartOpen(true)} title={t.cart} aria-label={t.cart}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span className="nav-badge">{cartCount > 9 ? "9+" : cartCount}</span>
              )}
            </button>

            <button className="btn-primary nav-shop-btn" onClick={() => navigate("/shop")}>
              {t.shopNow}
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
              <li>
                <Link to="/wishlist" className="mobile-link" onClick={() => setMenuOpen(false)}>
                  ❤️ {t.wishlist} {wishlist.length > 0 && `(${wishlist.length})`}
                </Link>
              </li>
              <li>
                <button 
                  className="mobile-link" 
                  onClick={() => { setForceShowRegion(true); setMenuOpen(false); }}
                >
                  {locale?.flag} {locale?.country} ({locale?.currencyCode})
                </button>
              </li>
              <li>
                <button className="mobile-mode-toggle" onClick={() => { toggleDarkMode(); setMenuOpen(false); }}>
                  {isDarkMode ? "☀️ Switch to Light Mode" : "🌙 Switch to Dark Mode"}
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
