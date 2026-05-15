import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import "./Admin.css";

const THEMES = [
  { id: "luxury-dark", label: "Luxury Dark", desc: "Deep dark with golden accents" },
  { id: "rose-gold", label: "Rose Gold", desc: "Romantic rose & pink tones" },
  { id: "midnight-blue", label: "Midnight Blue", desc: "Deep blue with sky accents" },
  { id: "emerald", label: "Emerald", desc: "Rich dark green luxury" },
  { id: "violet", label: "Violet", desc: "Deep purple premium look" },
  { id: "cream-luxury", label: "Cream Luxury", desc: "Warm beige light theme" },
  { id: "pure-white", label: "Pure White", desc: "Clean minimalist light" },
  { id: "ocean", label: "Ocean", desc: "Dark deep sea with cyan" },
  { id: "sunset", label: "Sunset", desc: "Warm orange & fire tones" },
  { id: "monochrome", label: "Monochrome", desc: "Classic black & white" },
];

export default function SiteSettings() {
  const { settings, setSettings } = useApp();
  const [form, setForm] = useState({ ...settings });
  const [saved, setSaved] = useState(false);

  const set = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <h2 style={{ fontSize: "1.2rem" }}>Website Settings</h2>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {saved && <span style={{ color: "#10b981", fontSize: "0.88rem", fontWeight: 600 }}>✅ Saved!</span>}
          <button className="btn-primary" onClick={handleSave}>💾 Save Settings</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* General Settings */}
        <div className="admin-card">
          <p className="admin-card-title">General</p>
          <div className="form-group">
            <label>Website Name</label>
            <input className="form-control" value={form.siteName} onChange={set("siteName")} />
          </div>
          <div className="form-group">
            <label>Tagline</label>
            <input className="form-control" value={form.tagline} onChange={set("tagline")} />
          </div>
          <div className="form-group">
            <label>WhatsApp Number (with country code)</label>
            <input className="form-control" value={form.whatsappNumber} onChange={set("whatsappNumber")} placeholder="8801700000000" />
          </div>
          <div className="form-group">
            <label>Currency Symbol</label>
            <input className="form-control" value={form.currency} onChange={set("currency")} placeholder="৳" />
          </div>
          <div className="form-group">
            <label>Footer Text</label>
            <textarea className="form-control" rows={2} value={form.footerText} onChange={set("footerText")} />
          </div>
        </div>

        {/* Hero Settings */}
        <div className="admin-card">
          <p className="admin-card-title">Hero Section</p>
          <div className="form-group">
            <label>Hero Title</label>
            <input className="form-control" value={form.heroTitle} onChange={set("heroTitle")} />
          </div>
          <div className="form-group">
            <label>Hero Subtitle</label>
            <textarea className="form-control" rows={3} value={form.heroSubtitle} onChange={set("heroSubtitle")} />
          </div>
          <div className="form-group">
            <label>Hero Button Text</label>
            <input className="form-control" value={form.heroButtonText} onChange={set("heroButtonText")} />
          </div>
          <div className="form-group">
            <label>Hero Background Image URL (optional)</label>
            <input className="form-control" value={form.heroBg || ""} onChange={set("heroBg")} placeholder="https://..." />
          </div>
          {form.heroBg && (
            <img src={form.heroBg} alt="Hero preview" style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: "var(--radius)", border: "1px solid var(--border-color)" }} />
          )}
        </div>
      </div>

      {/* Theme Picker */}
      <div className="admin-card" style={{ marginTop: 24 }}>
        <p className="admin-card-title">Premium Themes (10 Options)</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
          {THEMES.map((theme) => (
            <div
              key={theme.id}
              onClick={() => { setForm(p => ({ ...p, theme: theme.id })); setSaved(false); }}
              style={{
                padding: "16px 14px",
                borderRadius: "var(--radius)",
                border: `2px solid ${form.theme === theme.id ? "var(--accent)" : "var(--border-color)"}`,
                background: form.theme === theme.id ? "var(--accent-light)" : "var(--bg-glass)",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <p style={{ fontWeight: 600, fontSize: "0.88rem", color: form.theme === theme.id ? "var(--accent)" : "var(--text-primary)" }}>{theme.label}</p>
                {form.theme === theme.id && <span style={{ color: "var(--accent)" }}>✓</span>}
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{theme.desc}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 16 }}>
          Note: Theme preview applies immediately. Click "Save Settings" to make it permanent.
        </p>
      </div>

      {/* Save button bottom */}
      <div style={{ textAlign: "right", marginTop: 24 }}>
        {saved && <span style={{ color: "#10b981", fontSize: "0.88rem", fontWeight: 600, marginRight: 16 }}>✅ Settings saved!</span>}
        <button className="btn-primary" onClick={handleSave}>💾 Save All Settings</button>
      </div>
    </div>
  );
}
