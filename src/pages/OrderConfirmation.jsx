import React from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { getStatusColor } from "../utils/helpers";

export default function OrderConfirmation() {
  const [params] = useSearchParams();
  const { getOrderById } = useApp();
  const navigate = useNavigate();
  const orderId = params.get("orderId");
  const order = getOrderById(orderId);

  return (
    <div className="page-content">
      <div className="container" style={{ maxWidth: 600, padding: "80px 24px", textAlign: "center" }}>
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          borderRadius: "var(--radius-lg)",
          padding: "48px 36px"
        }} className="glass animate-fadeUp">
          <div style={{ fontSize: "4rem", marginBottom: 16 }}>🎉</div>
          <h1 style={{ fontSize: "1.8rem", marginBottom: 12, color: "var(--accent)" }}>Order Placed!</h1>
          <p style={{ color: "var(--text-secondary)", marginBottom: 24, lineHeight: 1.7 }}>
            Thank you for your order! We will contact you on WhatsApp to confirm your delivery details.
          </p>

          {order && (
            <div style={{
              background: "var(--bg-secondary)",
              borderRadius: "var(--radius)",
              padding: "20px",
              marginBottom: 28,
              textAlign: "left",
              border: "1px solid var(--border-color)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>Order ID</span>
                <strong style={{ color: "var(--accent)", fontFamily: "monospace" }}>{order.id}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>Product</span>
                <span style={{ fontSize: "0.88rem" }}>{order.productName}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>Total</span>
                <strong>৳{order.total}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>Status</span>
                <span style={{
                  background: getStatusColor(order.status),
                  color: "#fff",
                  padding: "2px 12px",
                  borderRadius: 20,
                  fontSize: "0.78rem",
                  fontWeight: 700
                }}>{order.status}</span>
              </div>
            </div>
          )}

          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: 28 }}>
            Save your Order ID to track your order status anytime.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => navigate("/track-order")}>
              📦 Track Order
            </button>
            <button className="btn-outline" onClick={() => navigate("/shop")}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
