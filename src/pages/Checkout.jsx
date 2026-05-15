import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { generateWhatsAppLink } from "../utils/helpers";
import "./Checkout.css";

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { products, settings, placeOrder } = useApp();

  const productId = searchParams.get("productId");
  const preSize = searchParams.get("size") || "";
  const preColor = searchParams.get("color") || "";
  const preQty = searchParams.get("quantity") || 1;

  const product = products.find((p) => p.id === productId);

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    whatsapp: "",
    address: "",
    productName: product?.name || "",
    size: preSize,
    color: preColor,
    quantity: preQty,
    paymentMethod: "Cash on Delivery",
    note: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.customerName.trim()) e.customerName = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.productName.trim()) e.productName = "Product name is required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setSubmitting(true);
    const total = product ? product.price * Number(form.quantity) : 0;
    const order = placeOrder({ ...form, total, productImage: product?.images?.[0] });

    // Open WhatsApp with order details
    const waLink = generateWhatsAppLink(settings.whatsappNumber, { ...order, ...form, total });
    window.open(waLink, "_blank");

    navigate(`/order-confirmation?orderId=${order.id}`);
  };

  const set = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <div className="page-content">
      <div className="container checkout-container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <p>Fill in your details to complete the order</p>
        </div>

        <div className="checkout-layout">
          {/* Form */}
          <form className="checkout-form glass" onSubmit={handleSubmit}>
            <h3>Customer Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input className={`form-control ${errors.customerName ? "error" : ""}`} placeholder="Your full name" value={form.customerName} onChange={set("customerName")} />
                {errors.customerName && <p className="form-error">{errors.customerName}</p>}
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input className={`form-control ${errors.phone ? "error" : ""}`} placeholder="01XXXXXXXXX" value={form.phone} onChange={set("phone")} />
                {errors.phone && <p className="form-error">{errors.phone}</p>}
              </div>
            </div>
            <div className="form-group">
              <label>WhatsApp Number</label>
              <input className="form-control" placeholder="Same as phone or different" value={form.whatsapp} onChange={set("whatsapp")} />
            </div>
            <div className="form-group">
              <label>Full Delivery Address *</label>
              <textarea className={`form-control ${errors.address ? "error" : ""}`} placeholder="House, Road, Area, District..." rows={3} value={form.address} onChange={set("address")} />
              {errors.address && <p className="form-error">{errors.address}</p>}
            </div>

            <h3 style={{ marginTop: 8 }}>Order Details</h3>
            <div className="form-group">
              <label>Product Name *</label>
              <input className={`form-control ${errors.productName ? "error" : ""}`} value={form.productName} onChange={set("productName")} />
              {errors.productName && <p className="form-error">{errors.productName}</p>}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Size</label>
                <input className="form-control" placeholder="e.g. M, L, XL" value={form.size} onChange={set("size")} />
              </div>
              <div className="form-group">
                <label>Color</label>
                <input className="form-control" placeholder="e.g. Black, White" value={form.color} onChange={set("color")} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Quantity</label>
                <input className="form-control" type="number" min={1} value={form.quantity} onChange={set("quantity")} />
              </div>
              <div className="form-group">
                <label>Payment Method</label>
                <select className="form-control" value={form.paymentMethod} onChange={set("paymentMethod")}>
                  <option>Cash on Delivery</option>
                  <option>bKash</option>
                  <option>Nagad</option>
                  <option>Rocket</option>
                  <option>Bank Transfer</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Order Note (Optional)</label>
              <textarea className="form-control" placeholder="Any special instructions..." rows={2} value={form.note} onChange={set("note")} />
            </div>

            <button type="submit" className="btn-primary checkout-submit-btn" disabled={submitting}>
              {submitting ? "Placing Order..." : "🛒 Place Order & Send via WhatsApp"}
            </button>
            <p className="whatsapp-note">
              📱 After placing the order, your details will open in WhatsApp for confirmation.
            </p>
          </form>

          {/* Order Summary */}
          <aside className="order-summary glass">
            <h3>Order Summary</h3>
            {product ? (
              <>
                <img src={product.images?.[0]} alt={product.name} className="summary-img" />
                <p className="summary-name">{product.name}</p>
                <div className="summary-row">
                  <span>Price</span>
                  <span>৳{product.price}</span>
                </div>
                <div className="summary-row">
                  <span>Quantity</span>
                  <span>{form.quantity}</span>
                </div>
                <div className="summary-row summary-total">
                  <span>Total</span>
                  <span>৳{product.price * Number(form.quantity)}</span>
                </div>
              </>
            ) : (
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>No product selected. You can still fill in the form manually.</p>
            )}
            <div className="summary-trust">
              <p>🔒 Secure & Safe</p>
              <p>🚚 Fast Delivery</p>
              <p>🔄 Easy Returns</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
