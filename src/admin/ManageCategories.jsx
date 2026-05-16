import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import "./Admin.css";

const EMPTY_CAT = { name: "", icon: "🏷️", description: "" };

export default function ManageCategories() {
  const { categories, addCategory, updateCategory, deleteCategory } = useApp();
  const [form, setForm] = useState(EMPTY_CAT);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateCategory(editId, form);
      setEditId(null);
    } else {
      addCategory(form);
    }
    setForm(EMPTY_CAT);
    setShowForm(false);
  };

  const handleEdit = (cat) => {
    setForm({ name: cat.name, icon: cat.icon, description: cat.description || "" });
    setEditId(cat.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setForm(EMPTY_CAT);
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <h2 style={{ fontSize: "1.2rem" }}>Manage Categories ({categories.length})</h2>
        <button className="btn-primary" onClick={() => { setShowForm(true); setEditId(null); setForm(EMPTY_CAT); }}>
          + Add Category
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="admin-card" style={{ marginBottom: 28 }}>
          <p className="admin-card-title">{editId ? "Edit Category" : "Add New Category"}</p>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 16 }}>
              <div className="form-group">
                <label>Icon</label>
                <input className="form-control" value={form.icon} onChange={set("icon")} placeholder="🏷️" style={{ textAlign: "center", fontSize: "1.5rem" }} maxLength={4} />
              </div>
              <div className="form-group">
                <label>Category Name *</label>
                <input className="form-control" value={form.name} onChange={set("name")} placeholder="e.g. Sarees" required />
              </div>
            </div>
            <div className="form-group">
              <label>Description (optional)</label>
              <input className="form-control" value={form.description} onChange={set("description")} placeholder="Brief description..." />
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button type="submit" className="btn-primary">{editId ? "💾 Save Changes" : "➕ Add Category"}</button>
              <button type="button" className="btn-ghost" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Category list */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {categories.map((cat) => (
          <div key={cat.id} className="admin-card" style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: "2rem", flexShrink: 0, width: 52, height: 52, background: "var(--accent-light)", borderRadius: "var(--radius)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {cat.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontWeight: 700, color: "var(--text-primary)" }}>{cat.name}</p>
              {cat.description && <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>{cat.description}</p>}
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>ID: {cat.id}</p>
            </div>
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <button className="admin-action-btn edit" onClick={() => handleEdit(cat)}>✏️</button>
              <button className="admin-action-btn delete" onClick={() => { if (window.confirm(`Delete "${cat.name}"?`)) deleteCategory(cat.id); }}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
