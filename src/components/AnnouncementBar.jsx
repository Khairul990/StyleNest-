import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import "./AnnouncementBar.css";

export default function AnnouncementBar() {
  const { settings } = useApp();
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const message = settings.announcementText || "🚚 Free Delivery on orders above ৳999 | Use code STYLE10 for 10% off!";

  return (
    <div className="announcement-bar">
      <div className="announcement-inner">
        <div className="announcement-track">
          <span className="announcement-text">{message}</span>
          <span className="announcement-text">{message}</span>
        </div>
      </div>
      <button
        className="announcement-close"
        onClick={() => setVisible(false)}
        aria-label="Close announcement"
      >
        ✕
      </button>
    </div>
  );
}
