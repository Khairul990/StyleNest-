import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

// Layout components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Categories from "./pages/Categories";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderTracking from "./pages/OrderTracking";
import StaticPage from "./pages/StaticPage";

// Admin pages
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import ManageProducts from "./admin/ManageProducts";
import ManageOrders from "./admin/ManageOrders";
import SiteSettings from "./admin/SiteSettings";

// Public layout wrapper
function PublicLayout({ children }) {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main style={{ flex: 1, paddingTop: "72px" }}>{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>

          {/* ── Public Routes ───────────────────────────── */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/shop" element={<PublicLayout><Shop /></PublicLayout>} />
          <Route path="/categories" element={<PublicLayout><Categories /></PublicLayout>} />
          <Route path="/product/:id" element={<PublicLayout><ProductDetails /></PublicLayout>} />
          <Route path="/checkout" element={<PublicLayout><Checkout /></PublicLayout>} />
          <Route path="/order-confirmation" element={<PublicLayout><OrderConfirmation /></PublicLayout>} />
          <Route path="/track-order" element={<PublicLayout><OrderTracking /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><StaticPage /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><StaticPage /></PublicLayout>} />
          <Route path="/privacy-policy" element={<PublicLayout><StaticPage /></PublicLayout>} />
          <Route path="/terms" element={<PublicLayout><StaticPage /></PublicLayout>} />
          <Route path="/disclaimer" element={<PublicLayout><StaticPage /></PublicLayout>} />

          {/* ── Admin Routes ─────────────────────────────── */}
          {/* Step 1: Admin login page */}
          <Route path="/admin" element={<AdminLogin />} />

          {/* Step 2: Protected admin panel pages */}
          <Route path="/admin/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/admin/products" element={<AdminLayout><ManageProducts /></AdminLayout>} />
          <Route path="/admin/orders" element={<AdminLayout><ManageOrders /></AdminLayout>} />
          <Route path="/admin/settings" element={<AdminLayout><SiteSettings /></AdminLayout>} />

        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
