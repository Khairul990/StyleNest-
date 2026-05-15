import React, { useState } from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import "./Admin.css";

const navItems = [
  { to: "/admin/dashboard", icon: "📊", label: "Dashboard" },
  { to: "/admin/products", icon: "📦", label: "Products" },
  { to: "/admin/orders", icon: "🛒", label: "Orders" },
  { to: "/admin/settings", icon: "⚙️", label: "Settings" },
];

export default function AdminLayout() {
  const { adminLoggedIn, adminLogout, settings } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!adminLoggedIn) {
    navigate("/admin");
    return null;
  }

  const handleLogout = () => {
    adminLogout();
    navigate("/admin");
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-sidebar-top">
          <div className="admin-sidebar-logo">◆ {settings.siteName}</div>
          <p className="admin-sidebar-role">Admin Panel</p>
        </div>
        <nav className="admin-nav">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`admin-nav-item ${location.pathname === item.to ? "active" : ""}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="admin-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <Link to="/" className="admin-nav-item" style={{ gap: 12 }}>
            <span>🌐</span>
            <span>View Website</span>
          </Link>
          <button className="admin-logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <button
            className="admin-hamburger"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h2 className="admin-page-title">
            {navItems.find((n) => n.to === location.pathname)?.label || "Admin"}
          </h2>
          <div className="admin-topbar-right">
            <span className="admin-user-badge">Admin</span>
          </div>
        </header>

        {/* Page content */}
        <div className="admin-content">
          <Outlet />
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
}
