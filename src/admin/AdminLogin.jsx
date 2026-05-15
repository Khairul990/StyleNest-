import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

export default function AdminLogin() {
  const { adminLogin } = useApp();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const ok = adminLogin(password);
      if (ok) navigate("/admin/dashboard");
      else { setError("Incorrect password. Please try again."); setLoading(false); }
    }, 600);
  };

  return (
    <div className="admin-login-bg">
      <form className="admin-login-card glass animate-fadeUp" onSubmit={handleSubmit}>
        <div className="admin-login-logo">◆ StyleNest</div>
        <h2>Admin Panel</h2>
        <p className="admin-login-sub">Enter your password to access the admin dashboard</p>

        <div className="form-group" style={{ marginTop: 24 }}>
          <label>Admin Password</label>
          <input
            className="form-control"
            type="password"
            placeholder="Enter password..."
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            autoFocus
          />
        </div>
        {error && <p className="admin-error">{error}</p>}
        <button type="submit" className="btn-primary admin-login-btn" disabled={loading}>
          {loading ? "Checking..." : "🔓 Login"}
        </button>
        <p className="admin-login-hint">Default password: 1118</p>
      </form>
    </div>
  );
}
