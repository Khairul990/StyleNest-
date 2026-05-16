import React, { useState, useRef, useEffect, useCallback } from "react";
import "./CustomSelect.css";

/**
 * CustomSelect — fully custom, theme-aware dropdown
 * Replaces ALL native <select> elements in StyleNest
 *
 * Props:
 *   value        — current value (string)
 *   onChange     — (value: string) => void
 *   options      — string[] | { value: string, label: string }[]
 *   label        — optional label shown above
 *   placeholder  — grayed hint when nothing selected
 *   disabled     — boolean
 *   required     — boolean
 *   error        — error message string
 *   className    — extra class on wrapper
 *   style        — inline styles on wrapper
 */
export default function CustomSelect({
  value,
  onChange,
  options = [],
  label,
  placeholder = "Select...",
  disabled = false,
  required = false,
  error,
  className = "",
  style,
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const listRef = useRef(null);

  // Normalize options → { value, label }
  const normalized = options.map((o) =>
    typeof o === "string" ? { value: o, label: o } : o
  );
  const selected = normalized.find((o) => o.value === value);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (disabled) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowDown" && open) {
        e.preventDefault();
        const idx = normalized.findIndex((o) => o.value === value);
        const next = normalized[idx + 1];
        if (next) onChange(next.value);
      }
      if (e.key === "ArrowUp" && open) {
        e.preventDefault();
        const idx = normalized.findIndex((o) => o.value === value);
        const prev = normalized[idx - 1];
        if (prev) onChange(prev.value);
      }
    },
    [disabled, open, normalized, value, onChange]
  );

  const handleSelect = (val) => {
    onChange(val);
    setOpen(false);
  };

  const toggle = () => {
    if (!disabled) setOpen((prev) => !prev);
  };

  return (
    <div
      className={`cs-wrapper ${open ? "cs-open" : ""} ${disabled ? "cs-disabled" : ""} ${error ? "cs-error" : ""} ${className}`}
      style={style}
      ref={wrapperRef}
    >
      {/* Optional label */}
      {label && (
        <label className="cs-label">
          {label}
          {required && <span className="cs-required"> *</span>}
        </label>
      )}

      {/* Trigger button */}
      <button
        type="button"
        className="cs-trigger"
        onClick={toggle}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
      >
        <span className={`cs-value ${!selected ? "cs-placeholder" : ""}`}>
          {selected ? selected.label : placeholder}
        </span>
        <span className={`cs-chevron ${open ? "cs-chevron-up" : ""}`}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 4.5L7 9.5L12 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>

      {/* Dropdown list */}
      {open && (
        <ul
          className="cs-list"
          role="listbox"
          ref={listRef}
          aria-label={label || placeholder}
        >
          {normalized.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              className={`cs-option ${opt.value === value ? "cs-selected" : ""}`}
              onClick={() => handleSelect(opt.value)}
              onMouseDown={(e) => e.preventDefault()} // prevent blur before click
            >
              {opt.value === value && (
                <span className="cs-check">✓</span>
              )}
              {opt.label}
            </li>
          ))}
        </ul>
      )}

      {/* Error message */}
      {error && <p className="cs-error-msg">{error}</p>}
    </div>
  );
}
