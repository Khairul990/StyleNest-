import React from "react";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../utils/helpers";
import "./CartDrawer.css";

export default function CartDrawer({ open, onClose }) {
  const { cart, removeFromCart, updateCartQty, cartTotal, clearCart, settings } = useApp();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <>
      {/* Backdrop */}
      {open && <div className="cart-backdrop" onClick={onClose} />}

      {/* Drawer */}
      <div className={`cart-drawer ${open ? "cart-drawer-open" : ""}`}>
        {/* Header */}
        <div className="cart-header">
          <h3>🛒 Your Cart ({cart.length})</h3>
          <button className="cart-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Items */}
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <span>🛍️</span>
              <p>Your cart is empty</p>
              <button className="btn-primary" style={{ marginTop: 16 }} onClick={onClose}>Continue Shopping</button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.key} className="cart-item">
                <img src={item.product.images?.[0]} alt={item.product.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.product.name}</p>
                  {item.size && <p className="cart-item-meta">Size: {item.size}</p>}
                  {item.color && <p className="cart-item-meta">Color: {item.color}</p>}
                  <p className="cart-item-price">{formatPrice(item.product.price, settings.currency)}</p>
                  <div className="cart-item-qty">
                    <button onClick={() => updateCartQty(item.key, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateCartQty(item.key, item.quantity + 1)}>+</button>
                    <button className="cart-item-remove" onClick={() => removeFromCart(item.key)}>🗑️</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span>Total</span>
              <span className="cart-total-amount">{formatPrice(cartTotal, settings.currency)}</span>
            </div>
            <button className="btn-primary cart-checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout →
            </button>
            <button className="btn-ghost cart-clear-btn" onClick={clearCart}>Clear Cart</button>
          </div>
        )}
      </div>
    </>
  );
}
