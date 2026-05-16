import React from "react";
import { useApp } from "../context/AppContext";
import { getStatusColor } from "../utils/helpers";
import "./Admin.css";

export default function Dashboard() {
  const { products, orders } = useApp();

  const stats = [
    { label: "Total Products", value: products.length, icon: "📦", color: "#6366f1" },
    { label: "Total Orders", value: orders.length, icon: "🛒", color: "#f59e0b" },
    { label: "Pending Orders", value: orders.filter((o) => o.status === "Pending").length, icon: "⏳", color: "#ef4444" },
    { label: "Delivered Orders", value: orders.filter((o) => o.status === "Delivered").length, icon: "✅", color: "#10b981" },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <div>
      <h2 style={{ marginBottom: 24, fontSize: "1.4rem" }}>Dashboard Overview</h2>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 36 }}>
        {stats.map((s) => (
          <div key={s.label} className="admin-card" style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 12,
              background: s.color + "20",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.5rem", flexShrink: 0
            }}>
              {s.icon}
            </div>
            <div>
              <p style={{ fontSize: "2rem", fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 4 }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="admin-card">
        <p className="admin-card-title">Recent Orders</p>
        {recentOrders.length === 0 ? (
          <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "32px 0" }}>No orders yet. Orders will appear here after customers place them.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id}>
                    <td><code style={{ color: "var(--accent)", fontSize: "0.8rem" }}>{o.id}</code></td>
                    <td>{o.customerName}</td>
                    <td style={{ maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{o.productName}</td>
                    <td style={{ color: "var(--accent)", fontWeight: 600 }}>৳{o.total}</td>
                    <td>
                      <span style={{
                        background: getStatusColor(o.status),
                        color: "#fff",
                        padding: "3px 10px",
                        borderRadius: 20,
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        whiteSpace: "nowrap"
                      }}>{o.status}</span>
                    </td>
                    <td style={{ whiteSpace: "nowrap", fontSize: "0.82rem" }}>{new Date(o.date).toLocaleDateString("en-BD")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
