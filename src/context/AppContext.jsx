import React, { createContext, useContext, useState, useEffect } from "react";
import { initialProducts, initialSettings, initialCategories } from "../data/initialData";
import { generateOrderId } from "../utils/helpers";

const AppContext = createContext();

// Admin password — change this to update login password
const ADMIN_PASSWORD = "1118";

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

  // ── Admin auth ────────────────────────────────────────────
  const [adminLoggedIn, setAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem("sn_admin") === "true";
  });

  // ── Persist to localStorage on change ────────────────────
  useEffect(() => { localStorage.setItem("sn_settings", JSON.stringify(settings)); }, [settings]);
  useEffect(() => { localStorage.setItem("sn_products", JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem("sn_categories", JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem("sn_orders", JSON.stringify(orders)); }, [orders]);

  // ── Apply theme CSS variables ─────────────────────────────
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
        // Switch to dark — restore last dark theme or default
        const lastDark = localStorage.getItem("sn_last_dark_theme") || "luxury-dark";
        return { ...prev, theme: lastDark };
      } else {
        // Switch to light — save current dark theme first
        localStorage.setItem("sn_last_dark_theme", prev.theme);
        return { ...prev, theme: "cream-luxury" };
      }
    });
  };

  // ── Product CRUD ──────────────────────────────────────────
  const addProduct = (product) => {
    const newProduct = { ...product, id: "p" + Date.now() };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p)));
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
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
        categories, setCategories,
        orders, placeOrder, updateOrderStatus, getOrderById,
        adminLoggedIn, adminLogin, adminLogout,
        isDarkMode, toggleDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Custom hook for easy usage
export const useApp = () => useContext(AppContext);
