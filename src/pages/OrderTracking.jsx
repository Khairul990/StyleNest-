import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { getStatusColor, ORDER_STATUSES } from "../utils/helpers";

export default function OrderTracking() {
  const { getOrderById } = useApp();
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();
    const found = getOrderById(orderId.trim());
    if (found) { setOrder(found); setNotFound(false); }
    else { setOrder(null); setNotFound(true); }
  };

  const steps = ORDER_STATUSES.filter(s => s !== "Cancelled");
  const currentStep = steps.indexOf(order?.status);

  return (
    <div className="page-content">
      <div className="container" style={{ maxWidth: 700, padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p className="overline" style={{ color: "var(--accent)", fontWeight: 700, letterSpacing: 3, fontSize: "0.8rem", textTransform: "uppercase", marginBottom: 12 }}>Live Tracking</p>
          <h1>Track Your Order</h1>
          <p style={{ color: "var(--text-secondary)", marginTop: 10 }}>Enter your Order ID to see real-time status</p>
        </div>

        <form onSubmit={handleTrack} style={{ display: "flex", gap: 12, marginBottom: 40 }}>
          <input
            className="form-control"
            placeholder="Enter Order ID (e.g. SN-ABC123-XY)"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn-primary" style={{ whiteSpace: "nowrap" }}>Track Order</button>
        </form>

        {notFound && (
          <div className="glass" style={{ padding: 32, textAlign: "center", color: "var(--text-muted)" }}>
            <span style={{ fontSize: "2.5rem", display: "block", marginBottom: 12 }}>🔍</span>
            <p>Order not found. Please check your Order ID and try again.</p>
          </div>
        )}

        {order && (
          <div className="glass animate-fadeUp" style={{ padding: 36 }}>
            {/* Order Info */}
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>
              <div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Order ID</p>
                <strong style={{ color: "var(--accent)", fontFamily: "monospace" }}>{order.id}</strong>
              </div>
              <div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Product</p>
                <strong>{order.productName}</strong>
              </div>
              <div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Date</p>
                <strong>{new Date(order.date).toLocaleDateString("en-BD")}</strong>
              </div>
              <div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Total</p>
                <strong style={{ color: "var(--accent)" }}>৳{order.total}</strong>
              </div>
            </div>

            {/* Status Badge */}
            <div style={{ marginBottom: 32, textAlign: "center" }}>
              <span style={{
                background: getStatusColor(order.status),
                color: "#fff",
                padding: "8px 24px",
                borderRadius: 20,
                fontWeight: 700,
                fontSize: "0.95rem"
              }}>
                {order.status === "Cancelled" ? "❌ Order Cancelled" : `Current Status: ${order.status}`}
              </span>
            </div>

            {/* Timeline */}
            {order.status !== "Cancelled" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {steps.map((step, i) => (
                  <div key={step} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{
                        width: 32, height: 32,
                        borderRadius: "50%",
                        background: i <= currentStep ? getStatusColor(step) : "var(--bg-glass)",
                        border: `2px solid ${i <= currentStep ? getStatusColor(step) : "var(--border-color)"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                        fontSize: "0.8rem",
                        color: i <= currentStep ? "#fff" : "var(--text-muted)",
                        fontWeight: 700,
                        transition: "all 0.3s",
                      }}>
                        {i < currentStep ? "✓" : i + 1}
                      </div>
                      {i < steps.length - 1 && (
                        <div style={{
                          width: 2, height: 28,
                          background: i < currentStep ? "var(--accent)" : "var(--border-color)",
                          transition: "background 0.3s"
                        }} />
                      )}
                    </div>
                    <div style={{ paddingTop: 4, paddingBottom: i < steps.length - 1 ? 12 : 0 }}>
                      <p style={{
                        fontWeight: i === currentStep ? 700 : 500,
                        color: i <= currentStep ? "var(--text-primary)" : "var(--text-muted)",
                        fontSize: "0.92rem"
                      }}>{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
