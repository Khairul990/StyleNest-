import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { initialProducts, initialSettings, initialCategories } from "../data/initialData";
import { generateOrderId } from "../utils/helpers";

const AppContext = createContext();
const ADMIN_PASSWORD = "1118";

// ── Promo codes ──────────────────────────────────────────────
const PROMO_CODES = {
  STYLE10: 10,
  SAVE20: 20,
  WELCOME15: 15,
  FLAT50: 50,
};

export function AppProvider({ children }) {
  // ── Settings ──────────────────────────────────────────────
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("sn_settings");
    return saved ? JSON.parse(saved) : initialSettings;
  });

  // ── Products ──────────────────────────────────────────────
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("sn_products");
    return saved ? JSON.parse(saved) : initialProducts;
  });

  // ── Categories ────────────────────────────────────────────
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("sn_categories");
    return saved ? JSON.parse(saved) : initialCategories;
  });

  // ── Orders ────────────────────────────────────────────────
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("sn_orders");
    return saved ? JSON.parse(saved) : [];
  });

  // ── Wishlist ──────────────────────────────────────────────
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("sn_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // ── Cart ──────────────────────────────────────────────────
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("sn_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // ── Toast notifications ───────────────────────────────────
  const [toasts, setToasts] = useState([]);

  // ── Admin auth ────────────────────────────────────────────
  const [adminLoggedIn, setAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem("sn_admin") === "true";
  });

  // ── Persist to localStorage ───────────────────────────────
  useEffect(() => { localStorage.setItem("sn_settings", JSON.stringify(settings)); }, [settings]);
  useEffect(() => { localStorage.setItem("sn_products", JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem("sn_categories", JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem("sn_orders", JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem("sn_wishlist", JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem("sn_cart", JSON.stringify(cart)); }, [cart]);

  // ── Apply theme ───────────────────────────────────────────
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", settings.theme);
    document.title = settings.siteName + " — " + settings.tagline;
  }, [settings.theme, settings.siteName, settings.tagline]);

  // ── Light / Dark mode toggle ──────────────────────────────
  const LIGHT_THEMES = ["cream-luxury", "pure-white"];
  const isDarkMode = !LIGHT_THEMES.includes(settings.theme);

  const toggleDarkMode = () => {
    setSettings((prev) => {
      if (LIGHT_THEMES.includes(prev.theme)) {
        const lastDark = localStorage.getItem("sn_last_dark_theme") || "luxury-dark";
        return { ...prev, theme: lastDark };
      } else {
        localStorage.setItem("sn_last_dark_theme", prev.theme);
        return { ...prev, theme: "cream-luxury" };
      }
    });
  };

  // ── Toast system ──────────────────────────────────────────
  const showToast = useCallback((message, type = "success", duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ── Wishlist CRUD ─────────────────────────────────────────
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast("Removed from wishlist", "info");
        return prev.filter((id) => id !== productId);
      } else {
        showToast("Added to wishlist ❤️", "success");
        return [...prev, productId];
      }
    });
  };
  const isWishlisted = (productId) => wishlist.includes(productId);

  // ── Cart CRUD ─────────────────────────────────────────────
  const addToCart = (product, size = "", color = "", quantity = 1) => {
    setCart((prev) => {
      const key = `${product.id}_${size}_${color}`;
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        showToast("Quantity updated in cart 🛒", "success");
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      showToast("Added to cart 🛒", "success");
      return [...prev, { key, product, size, color, quantity }];
    });
  };

  const removeFromCart = (key) => {
    setCart((prev) => prev.filter((item) => item.key !== key));
    showToast("Removed from cart", "info");
  };

  const updateCartQty = (key, quantity) => {
    if (quantity < 1) { removeFromCart(key); return; }
    setCart((prev) =>
      prev.map((item) => (item.key === key ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // ── Promo code ────────────────────────────────────────────
  const applyPromo = (code) => {
    const discount = PROMO_CODES[code.toUpperCase()];
    if (discount) {
      showToast(`Promo applied! ${discount}% off 🎉`, "success");
      return { valid: true, discount };
    }
    showToast("Invalid promo code", "error");
    return { valid: false, discount: 0 };
  };

  // ── Product CRUD ──────────────────────────────────────────
  const addProduct = (product) => {
    const newProduct = { ...product, id: "p" + Date.now() };
    setProducts((prev) => [newProduct, ...prev]);
    showToast("Product added successfully ✅", "success");
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p)));
    showToast("Product updated ✅", "success");
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast("Product deleted", "info");
  };

  // ── Category CRUD ─────────────────────────────────────────
  const addCategory = (category) => {
    const newCat = { ...category, id: category.name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now() };
    setCategories((prev) => [...prev, newCat]);
    showToast("Category added ✅", "success");
  };

  const updateCategory = (id, updated) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)));
    showToast("Category updated ✅", "success");
  };

  const deleteCategory = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast("Category deleted", "info");
  };

  // ── Order management ──────────────────────────────────────
  const placeOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: generateOrderId(),
      status: "Pending",
      date: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
    showToast(`Order status updated to "${status}"`, "success");
  };

  const getOrderById = (id) => orders.find((o) => o.id === id);

  // ── Admin auth ────────────────────────────────────────────
  const adminLogin = (password) => {
    if (password === ADMIN_PASSWORD) {
      setAdminLoggedIn(true);
      sessionStorage.setItem("sn_admin", "true");
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setAdminLoggedIn(false);
    sessionStorage.removeItem("sn_admin");
  };

  return (
    <AppContext.Provider
      value={{
        settings, setSettings,
        products, addProduct, updateProduct, deleteProduct,
        categories, setCategories, addCategory, updateCategory, deleteCategory,
        orders, placeOrder, updateOrderStatus, getOrderById,
        wishlist, toggleWishlist, isWishlisted,
        cart, addToCart, removeFromCart, updateCartQty, clearCart, cartCount, cartTotal,
        applyPromo,
        adminLoggedIn, adminLogin, adminLogout,
        isDarkMode, toggleDarkMode,
        toasts, showToast, removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
