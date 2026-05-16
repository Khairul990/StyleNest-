import React from "react";
import { useApp } from "../context/AppContext";
import "./Toast.css";

const ICONS = {
  success: "✅",
  error: "❌",
  info: "ℹ️",
  warning: "⚠️",
};

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type} animate-fadeUp`}
          onClick={() => removeToast(toast.id)}
          role="alert"
        >
          <span className="toast-icon">{ICONS[toast.type] || "✅"}</span>
          <span className="toast-msg">{toast.message}</span>
          <button className="toast-close" onClick={() => removeToast(toast.id)}>✕</button>
        </div>
      ))}
    </div>
  );
}
