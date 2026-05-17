import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { formatPrice } from "../utils/helpers";
import CustomSelect from "../components/CustomSelect";
import "./Admin.css";

const EMPTY_PRODUCT = {
  name: "", category: "tshirts", price: "", originalPrice: "",
  discount: 0, description: "", sizes: [], colors: [],
  images: [""], badge: "", inStock: true, featured: false,
};

export default function ManageProducts() {
  const { products, addProduct, updateProduct, deleteProduct, categories, settings } = useApp();
  const [editing, setEditing] = useState(null); // null = list, "new" = new, {id} = edit
  const [form, setForm] = useState(EMPTY_PRODUCT);
  const [preview, setPreview] = useState(false);
  const [search, setSearch] = useState("");
  const [dragActive, setDragActive] = useState({ 0: false, 1: false });

  const handleImageDrop = (index) => (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const base64 = uploadEvent.target.result;
        setForm(prev => {
          const imgs = [...prev.images];
          imgs[index] = base64;
          return { ...prev, images: imgs };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSelect = (index) => (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const base64 = uploadEvent.target.result;
        setForm(prev => {
          const imgs = [...prev.images];
          imgs[index] = base64;
          return { ...prev, images: imgs };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const renderDragDropArea = (index, label) => {
    const imgUrl = form.images[index] || "";
    const isDragActive = dragActive[index];

    return (
      <div className="form-group" style={{ marginBottom: 24 }}>
        <label style={{ display: "block", marginBottom: 8, fontWeight: 600, fontSize: "0.88rem", color: "var(--text-secondary)" }}>{label}</label>
        <div
          onDragOver={(e) => { e.preventDefault(); setDragActive(prev => ({ ...prev, [index]: true })); }}
          onDragLeave={() => setDragActive(prev => ({ ...prev, [index]: false }))}
          onDrop={(e) => {
            setDragActive(prev => ({ ...prev, [index]: false }));
            handleImageDrop(index)(e);
          }}
          style={{
            border: `2px dashed ${isDragActive ? "var(--accent)" : "var(--border-color)"}`,
            borderRadius: "var(--radius)",
            background: isDragActive ? "var(--accent-light)" : "var(--bg-glass)",
            padding: "24px 20px",
            textAlign: "center",
            cursor: "pointer",
            transition: "all 0.2s ease",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 140,
            overflow: "hidden"
          }}
          onClick={() => document.getElementById(`file-input-${index}`).click()}
        >
          {imgUrl ? (
            <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <img
                src={imgUrl}
                alt="Product preview"
                style={{
                  maxHeight: 120,
                  maxWidth: "100%",
                  objectFit: "contain",
                  borderRadius: 8,
                  border: "1px solid var(--border-color)",
                  marginBottom: 8
                }}
              />
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Drag image or click to replace</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setForm(prev => {
                    const imgs = [...prev.images];
                    imgs[index] = "";
                    return { ...prev, images: imgs };
                  });
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  width: 24,
                  height: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  fontWeight: "bold",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
                }}
              >
                ✕
              </button>
            </div>
          ) : (
            <>
              <div style={{ fontSize: "2rem", marginBottom: 8 }}>📤</div>
              <p style={{ fontSize: "0.88rem", fontWeight: 500, color: "var(--text-primary)" }}>
                Drag & Drop image here, or <span style={{ color: "var(--accent)" }}>browse</span>
              </p>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 4 }}>
                Supports PNG, JPG, JPEG, WEBP
              </p>
            </>
          )}
          <input
            id={`file-input-${index}`}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageSelect(index)}
          />
        </div>
        <div style={{ marginTop: 8 }}>
          <input
            className="form-control"
            style={{ padding: "6px 12px", fontSize: "0.78rem", height: "auto" }}
            placeholder="Or paste direct image URL here..."
            value={imgUrl.startsWith("data:") ? "" : imgUrl}
            onChange={(e) => setForm(prev => {
              const imgs = [...prev.images];
              imgs[index] = e.target.value;
              return { ...prev, images: imgs };
            })}
          />
        </div>
      </div>
    );
  };


  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const openNew = () => { setForm(EMPTY_PRODUCT); setEditing("new"); setPreview(false); };
  const openEdit = (p) => { setForm({ ...p, images: p.images || [""], sizes: p.sizes || [], colors: p.colors || [] }); setEditing(p.id); setPreview(false); };
  const closeForm = () => { setEditing(null); setPreview(false); };

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const handleSave = () => {
    const product = {
      ...form,
      price: Number(form.price),
      originalPrice: Number(form.originalPrice),
      discount: Number(form.discount),
      sizes: typeof form.sizes === "string" ? form.sizes.split(",").map(s => s.trim()) : form.sizes,
      colors: typeof form.colors === "string" ? form.colors.split(",").map(c => c.trim()) : form.colors,
      images: form.images.filter(Boolean),
    };
    if (editing === "new") addProduct(product);
    else updateProduct(editing, product);
    closeForm();
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this product?")) deleteProduct(id);
  };

  if (editing !== null) {
    return (
      <div>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 24 }}>
          <button className="btn-ghost" onClick={closeForm}>← Back</button>
          <h2 style={{ fontSize: "1.2rem" }}>{editing === "new" ? "Add New Product" : "Edit Product"}</h2>
          <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
            <button className="btn-outline" onClick={() => setPreview(!preview)}>
              {preview ? "✏️ Edit" : "👁️ Preview"}
            </button>
            <button className="btn-primary" onClick={handleSave}>💾 Save Product</button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: preview ? "1fr 1fr" : "1fr", gap: 24 }}>
          {/* Form */}
          <div className="admin-card">
            <div className="form-group">
              <label>Product Name</label>
              <input className="form-control" value={form.name} onChange={set("name")} placeholder="Product name" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div className="form-group">
                <label>Category</label>
                <CustomSelect
                  value={form.category}
                  onChange={(val) => setForm((prev) => ({ ...prev, category: val }))}
                  options={categories.map(c => ({ value: c.id, label: c.name }))}
                />
              </div>
              <div className="form-group">
                <label>Badge</label>
                <CustomSelect
                  value={form.badge}
                  onChange={(val) => setForm((prev) => ({ ...prev, badge: val }))}
                  options={[
                    { value: "", label: "None" },
                    { value: "Best Seller", label: "Best Seller" },
                    { value: "New Arrival", label: "New Arrival" },
                    { value: "Popular", label: "Popular" },
                    { value: "Trending", label: "Trending" },
                    { value: "Offer", label: "Offer" },
                  ]}
                />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              <div className="form-group">
                <label>Price (৳)</label>
                <input className="form-control" type="number" value={form.price} onChange={set("price")} />
              </div>
              <div className="form-group">
                <label>Original Price (৳)</label>
                <input className="form-control" type="number" value={form.originalPrice} onChange={set("originalPrice")} />
              </div>
              <div className="form-group">
                <label>Discount (%)</label>
                <input className="form-control" type="number" value={form.discount} onChange={set("discount")} />
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea className="form-control" rows={3} value={form.description} onChange={set("description")} />
            </div>
            <div className="form-group">
              <label>Sizes (comma-separated, e.g. S, M, L, XL)</label>
              <input className="form-control" value={Array.isArray(form.sizes) ? form.sizes.join(", ") : form.sizes} onChange={(e) => setForm(p => ({ ...p, sizes: e.target.value }))} />
            </div>
            <div className="form-group">
              <label>Colors (comma-separated, e.g. Black, White, Red)</label>
              <input className="form-control" value={Array.isArray(form.colors) ? form.colors.join(", ") : form.colors} onChange={(e) => setForm(p => ({ ...p, colors: e.target.value }))} />
            </div>
            {renderDragDropArea(0, "Product Image (Primary)")}
            {renderDragDropArea(1, "Second Product Image (Optional)")}
            <div style={{ display: "flex", gap: 24 }}>
              <label style={{ display: "flex", gap: 8, alignItems: "center", cursor: "pointer", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                <input type="checkbox" checked={form.inStock} onChange={set("inStock")} />
                In Stock
              </label>
              <label style={{ display: "flex", gap: 8, alignItems: "center", cursor: "pointer", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                <input type="checkbox" checked={form.featured} onChange={set("featured")} />
                Featured on Homepage
              </label>
            </div>
          </div>

          {/* Live Preview */}
          {preview && (
            <div>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>Live Preview</p>
              <div className="product-card" style={{ maxWidth: 280 }}>
                <div className="card-image-wrap">
                  {form.images[0] ? (
                    <img src={form.images[0]} alt="Preview" className="card-image" />
                  ) : (
                    <div style={{ width: "100%", aspectRatio: 1, background: "var(--bg-secondary)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: "0.8rem" }}>
                      No Image
                    </div>
                  )}
                  {form.badge && <span className="badge card-badge">{form.badge}</span>}
                  {form.discount > 0 && <span className="discount-tag">-{form.discount}%</span>}
                </div>
                <div className="card-info">
                  <p className="card-category">{form.category}</p>
                  <h3 className="card-name">{form.name || "Product Name"}</h3>
                  <div className="card-pricing">
                    <span className="card-price">{formatPrice(form.price || 0, settings.currency)}</span>
                    {form.originalPrice > form.price && (
                      <span className="card-original">{formatPrice(form.originalPrice, settings.currency)}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontSize: "1.2rem", flex: 1 }}>Manage Products</h2>
        <input className="form-control" style={{ width: 220 }} placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
        <button className="btn-primary" onClick={openNew}>+ Add Product</button>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Badge</th><th>Featured</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img src={p.images?.[0]} alt={p.name} style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 8, border: "1px solid var(--border-color)" }} />
                  </td>
                  <td style={{ fontWeight: 600, color: "var(--text-primary)", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</td>
                  <td>{p.category}</td>
                  <td style={{ color: "var(--accent)", fontWeight: 600 }}>৳{p.price}</td>
                  <td>{p.badge ? <span className="badge">{p.badge}</span> : "—"}</td>
                  <td>{p.featured ? "✅" : "—"}</td>
                  <td>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button className="btn-ghost" style={{ padding: "6px 12px", fontSize: "0.82rem" }} onClick={() => openEdit(p)}>✏️ Edit</button>
                      <button className="btn-ghost" style={{ padding: "6px 12px", fontSize: "0.82rem", color: "#ef4444" }} onClick={() => handleDelete(p.id)}>🗑️ Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p style={{ textAlign: "center", color: "var(--text-muted)", padding: "40px 0" }}>No products found.</p>
        )}
      </div>
    </div>
  );
}
