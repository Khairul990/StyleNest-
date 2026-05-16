import React from "react";
import { useApp } from "../context/AppContext";
import { LOCALES } from "../utils/locales";
import "./RegionModal.css";

export default function RegionModal() {
  const { locale, changeLocale, forceShowRegion, setForceShowRegion } = useApp();

  // Show if no locale is set OR if manually triggered
  if (locale && !forceShowRegion) return null;

  const countries = Object.keys(LOCALES).map(key => ({
    code: key,
    ...LOCALES[key]
  }));

  return (
    <div className="region-modal-overlay">
      <div className="region-modal animate-fadeUp">
        {forceShowRegion && (
          <button className="region-modal-close" onClick={() => setForceShowRegion(false)}>✕</button>
        )}
        <div className="region-modal-header">
          <h2>Select Your Region</h2>
          <p>Choose your country for personalized language and currency</p>
        </div>
        
        <div className="region-options">
          {countries.map((c) => (
            <button 
              key={c.code} 
              className="region-btn"
              onClick={() => changeLocale(c.code)}
            >
              <span className="region-flag">{c.flag}</span>
              <div className="region-info">
                <span className="region-name">{c.country}</span>
                <span className="region-meta">{c.language} • {c.currencyCode} ({c.currency})</span>
              </div>
            </button>
          ))}
        </div>

        <div className="region-modal-footer">
          <p>You can change this later from the menu</p>
        </div>
      </div>
    </div>
  );
}
