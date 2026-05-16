import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

// Layout components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ToastContainer from "./components/Toast";
import BackToTop from "./components/BackToTop";
import WhatsAppFloat from "./components/WhatsAppFloat";
import AnnouncementBar from "./components/AnnouncementBar";

// Public pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Categories from "./pages/Categories";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderTracking from "./pages/OrderTracking";
import Wishlist from "./pages/Wishlist";
import StaticPage from "./pages/StaticPage";

// Admin pages
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import ManageProducts from "./admin/ManageProducts";
import ManageOrders from "./admin/ManageOrders";
import ManageCategories from "./admin/ManageCategories";
import SiteSettings from "./admin/SiteSettings";

// Public layout wrapper
function PublicLayout({ children }) {
  return (
    <div className="page-wrapper">
      <AnnouncementBar />
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
      <WhatsAppFloat />
      <BackToTop />
      <ToastContainer />
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
          <Route path="/wishlist" element={<PublicLayout><Wishlist /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><StaticPage /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><StaticPage /></PublicLayout>} />
          <Route path="/privacy-policy" element={<PublicLayout><StaticPage /></PublicLayout>} />
          <Route path="/terms" element={<PublicLayout><StaticPage /></PublicLayout>} />
          <Route path="/disclaimer" element={<PublicLayout><StaticPage /></PublicLayout>} />

          {/* ── Admin Routes ─────────────────────────────── */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/admin/products" element={<AdminLayout><ManageProducts /></AdminLayout>} />
          <Route path="/admin/orders" element={<AdminLayout><ManageOrders /></AdminLayout>} />
          <Route path="/admin/categories" element={<AdminLayout><ManageCategories /></AdminLayout>} />
          <Route path="/admin/settings" element={<AdminLayout><SiteSettings /></AdminLayout>} />

        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
