import React, { useState, useRef, useEffect } from "react";
import "./CustomSelect.css";

/**
 * CustomSelect — cross-browser custom dropdown
 * Props:
 *   value: current selected value
 *   onChange: (value) => void
 *   options: string[] | { value, label }[]
 *   placeholder: string
 *   style: object (optional, passed to wrapper)
 *   className: string (optional)
 */
export default function CustomSelect({
  value,
  onChange,
  options = [],
  placeholder = "Select...",
  style,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Normalize options to { value, label } shape
  const normalized = options.map((o) =>
    typeof o === "string" ? { value: o, label: o } : o
  );

  const selected = normalized.find((o) => o.value === value);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (val) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <div
      className={`cs-wrapper ${open ? "cs-open" : ""} ${className}`}
      style={style}
      ref={ref}
    >
      {/* Trigger */}
      <button
        type="button"
        className="cs-trigger"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={`cs-value ${!selected ? "cs-placeholder" : ""}`}>
          {selected ? selected.label : placeholder}
        </span>
        <span className={`cs-arrow ${open ? "cs-arrow-up" : ""}`}>▾</span>
      </button>

      {/* Dropdown list */}
      {open && (
        <ul className="cs-list" role="listbox">
          {normalized.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              className={`cs-option ${opt.value === value ? "cs-selected" : ""}`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
