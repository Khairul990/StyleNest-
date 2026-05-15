// Utility helper functions

// Generate a unique order ID
export const generateOrderId = () => {
  return "SN-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).substring(2, 5).toUpperCase();
};

// Format currency
export const formatPrice = (price, currency = "৳") => {
  return `${currency}${Number(price).toLocaleString("en-IN")}`;
};

// Generate WhatsApp message link
export const generateWhatsAppLink = (phone, order) => {
  const msg = `🛍️ *New Order from StyleNest!*

📦 *Order ID:* ${order.id}
👤 *Name:* ${order.customerName}
📞 *Phone:* ${order.phone}
📱 *WhatsApp:* ${order.whatsapp}
📍 *Address:* ${order.address}

🛒 *Product:* ${order.productName}
📐 *Size:* ${order.size}
🎨 *Color:* ${order.color}
🔢 *Quantity:* ${order.quantity}
💰 *Total:* ৳${order.total}
💳 *Payment:* ${order.paymentMethod}

📝 *Note:* ${order.note || "None"}`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
};

// Get status badge color
export const getStatusColor = (status) => {
  const colors = {
    Pending: "#f59e0b",
    Confirmed: "#3b82f6",
    Packed: "#8b5cf6",
    Shipped: "#06b6d4",
    "Out for Delivery": "#f97316",
    Delivered: "#10b981",
    Cancelled: "#ef4444",
  };
  return colors[status] || "#6b7280";
};

export const ORDER_STATUSES = ["Pending", "Confirmed", "Packed", "Shipped", "Out for Delivery", "Delivered", "Cancelled"];
