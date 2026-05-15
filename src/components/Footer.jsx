import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import "./Footer.css";

export default function Footer() {
  const { settings } = useApp();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">◆ {settings.siteName}</div>
            <p>{settings.tagline}</p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook" className="social-btn">f</a>
              <a href="#" aria-label="Instagram" className="social-btn">in</a>
              <a href={`https://wa.me/${settings.whatsappNumber}`} aria-label="WhatsApp" className="social-btn">W</a>
            </div>
          </div>

          {/* Quick links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/track-order">Track Order</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/disclaimer">Disclaimer</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Contact</h4>
            <ul className="contact-info">
              <li>📱 WhatsApp: <a href={`https://wa.me/${settings.whatsappNumber}`}>+{settings.whatsappNumber}</a></li>
              <li>✉️ Email: support@stylenest.com</li>
              <li>📍 Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{settings.footerText}</p>
          <Link to="/admin" className="admin-link">Admin Panel</Link>
        </div>
      </div>
    </footer>
  );
}
