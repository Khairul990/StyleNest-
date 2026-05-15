# StyleNest — Premium Fashion E-commerce

A complete, modern, fully-functional fashion e-commerce website built with **React + Vite**.

## ✨ Features

### Public Storefront
- 🏠 **Homepage** — Hero banner, featured products, categories, promo banner, trust badges
- 🛍️ **Shop Page** — Product listing with category filter, search, and sort
- 📄 **Product Details** — Image gallery, size/color picker, quantity, buy now
- 🗂️ **Categories** — All 8 category cards
- 🛒 **Checkout** — Full order form with WhatsApp confirmation
- 📦 **Order Tracking** — Track order status by Order ID
- 📃 **Static Pages** — About, Contact, Privacy Policy, Terms, Disclaimer

### Admin Panel (`/admin`)
- 🔐 **Secure Login** — Password: `1118`
- 📊 **Dashboard** — Stats overview and recent orders
- 📦 **Product Management** — Add, edit, delete, live preview
- 🛒 **Order Management** — Change order status in real-time
- ⚙️ **Site Settings** — 10 premium themes, hero text, footer, WhatsApp number

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

## 🏗️ Build for Production

```bash
npm run build
```
The built files will be in the `dist/` folder.

## 📁 Folder Structure

```
stylenest/
├── src/
│   ├── admin/          ← Admin panel pages
│   ├── components/     ← Reusable components (Navbar, Footer, ProductCard, CategoryCard)
│   ├── context/        ← AppContext.jsx (global state)
│   ├── data/           ← initialData.js (default products, categories, settings)
│   ├── pages/          ← Public pages
│   ├── utils/          ← helpers.js (formatting, WhatsApp link, order ID)
│   ├── App.jsx         ← All routes
│   ├── main.jsx        ← Entry point
│   └── index.css       ← Global styles + 10 themes
├── index.html
├── package.json
├── vite.config.js
├── netlify.toml
└── .gitignore
```

## 🎨 Customization Guide

| What to change | Where to edit |
|---|---|
| Website name & tagline | Admin Panel → Settings OR `src/data/initialData.js` |
| Default products | `src/data/initialData.js` → `initialProducts` |
| Categories | `src/data/initialData.js` → `initialCategories` |
| Admin password | `src/context/AppContext.jsx` → line: `const ADMIN_PASSWORD = "1118"` |
| WhatsApp number | Admin Panel → Settings OR `src/data/initialData.js` → `whatsappNumber` |
| Hero text | Admin Panel → Settings → Hero Section |
| Theme colors | Admin Panel → Settings → Premium Themes |

## 🌐 Netlify Deployment

1. Push all project files to GitHub (excluding `node_modules/` and `dist/`)
2. Go to [netlify.com](https://netlify.com) → New site from Git
3. Connect your GitHub repository
4. Netlify will automatically detect the settings from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click Deploy!

### Files to Upload to GitHub ✅
- All files in `src/`
- `index.html`
- `package.json`
- `vite.config.js`
- `netlify.toml`
- `.gitignore`
- `README.md`

### Files NOT to Upload ❌
- `node_modules/` (auto-installed by Netlify)
- `dist/` (auto-built by Netlify)
- `.env.local`

## 🎨 10 Premium Themes

| Theme | Style |
|---|---|
| Luxury Dark | Deep dark with golden accents (default) |
| Rose Gold | Romantic rose & pink tones |
| Midnight Blue | Deep blue with sky accents |
| Emerald | Rich dark green luxury |
| Violet | Deep purple premium look |
| Cream Luxury | Warm beige light theme |
| Pure White | Clean minimalist light |
| Ocean | Dark deep sea with cyan |
| Sunset | Warm orange & fire tones |
| Monochrome | Classic black & white |

Switch themes from **Admin Panel → Settings → Premium Themes**.

## 📱 WhatsApp Integration
When a customer places an order, a WhatsApp message is automatically generated with all order details. Edit your WhatsApp number in **Admin Panel → Settings**.

---
Made with ❤️ for fashion lovers
