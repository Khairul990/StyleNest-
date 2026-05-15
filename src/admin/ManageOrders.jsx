import React from "react";
import { useApp } from "../../context/AppContext";
import { getStatusColor, ORDER_STATUSES } from "../../utils/helpers";
import CustomSelect from "../../components/CustomSelect";
import "./Admin.css";

export default function ManageOrders() {
  const { orders, updateOrderStatus } = useApp();

  if (orders.length === 0) {
    return (
      <div>
        <h2 style={{ marginBottom: 24, fontSize: "1.2rem" }}>Manage Orders</h2>
        <div className="admin-card" style={{ textAlign: "center", padding: "60px 0" }}>
          <span style={{ fontSize: "3rem", display: "block", marginBottom: 16 }}>🛒</span>
          <p style={{ color: "var(--text-muted)" }}>No orders yet. Orders will appear here once customers start placing them.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: 24, fontSize: "1.2rem" }}>Manage Orders ({orders.length})</h2>
      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Product</th>
                <th>Size</th>
                <th>Color</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td><code style={{ color: "var(--accent)", fontSize: "0.75rem" }}>{o.id}</code></td>
                  <td style={{ fontWeight: 600, color: "var(--text-primary)", whiteSpace: "nowrap" }}>{o.customerName}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{o.phone}</td>
                  <td style={{ maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{o.productName}</td>
                  <td>{o.size || "—"}</td>
                  <td>{o.color || "—"}</td>
                  <td>{o.quantity}</td>
                  <td style={{ color: "var(--accent)", fontWeight: 600, whiteSpace: "nowrap" }}>৳{o.total}</td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.82rem" }}>{o.paymentMethod}</td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.82rem" }}>{new Date(o.date).toLocaleDateString("en-BD")}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{
                        width: 8, height: 8, borderRadius: "50%",
                        background: getStatusColor(o.status),
                        flexShrink: 0,
                        display: "inline-block",
                      }} />
                      <CustomSelect
                        value={o.status}
                        onChange={(val) => updateOrderStatus(o.id, val)}
                        options={ORDER_STATUSES}
                        style={{ minWidth: 160 }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
