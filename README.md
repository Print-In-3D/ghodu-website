# 🖨️ Print-IN 3D Creations

> A fully responsive React e-commerce website for a custom 3D printing business — featuring product browsing, a WhatsApp-based ordering flow with address collection, and automated SEO infrastructure.

**Live Domain:** [printin3d.in](https://printin3d.in)

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Architecture](#-architecture)
- [Page & Component Flow](#-page--component-flow)
- [Data Layer](#-data-layer)
- [State Management](#-state-management)
- [Order Flow (WhatsApp)](#-order-flow-whatsapp)
- [SEO Infrastructure](#-seo-infrastructure)
- [Dynamic Sitemap System](#-dynamic-sitemap-system)
- [Styling System](#-styling-system)
- [Adding New Products](#-adding-new-products)
- [Scripts Reference](#-scripts-reference)
- [Deployment](#-deployment)

---

## 🏗 Project Overview

Print-IN 3D Creations is a product showcase + ordering website for a 3D printing shop. There is **no backend or payment gateway** — all orders are placed via WhatsApp with the customer's cart items, customization details, and delivery address pre-filled into the message.

### Key Features
- 🛍️ Product browsing by category and individual product pages
- 🛒 Persistent shopping cart (saved to `localStorage`)
- ✏️ Per-product customization text (e.g. name on a keychain)
- 📦 Address collection modal before WhatsApp checkout
- 🔍 Full-text search across all products
- 📄 Legal pages: Terms & Conditions, Return Policy, FAQ, About
- 📱 WhatsApp floating button for direct contact
- 🗺️ Auto-generated SEO sitemap with slug-based URLs
- 📊 Schema.org structured data (Organization, Store, WebSite)

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19 (Create React App) |
| Routing | React Router DOM v7 |
| Styling | Vanilla CSS with CSS custom properties |
| Icons | Lucide React |
| Email (Contact form) | EmailJS |
| State Management | React Context API + localStorage |
| Sitemap Generation | Node.js ESM script (`scripts/generate-sitemap.mjs`) |
| Order Channel | WhatsApp `wa.me` deep links |

---

## 📁 Project Structure

```
print-in-3d-creations/
│
├── public/                        # Static assets served as-is
│   ├── index.html                 # App shell — full SEO meta tags, OG, JSON-LD
│   ├── sitemap.xml                # Auto-generated (do NOT edit manually)
│   ├── robots.txt                 # Crawler rules + sitemap pointer
│   ├── manifest.json              # PWA manifest (branding, icons)
│   ├── favicon.ico
│   ├── logo192.png / logo512.png
│   ├── images/
│   │   └── products/              # All product images (organised by category)
│   │       ├── keychains/
│   │       ├── Home and Decor/
│   │       ├── Stands and Accessories/
│   │       ├── Models/
│   │       └── frames/
│   └── videos/                    # Hero / promotional video assets
│
├── src/
│   ├── index.js                   # React DOM entry point
│   ├── index.css                  # Global design tokens & utility classes
│   ├── App.js                     # Root — Router, Routes, Footer, WhatsApp FAB
│   │
│   ├── data/
│   │   └── productsData.js        # ★ Single source of truth for ALL product data
│   │
│   ├── context/
│   │   └── CartContext.js         # Global cart state (add/remove/qty/total)
│   │
│   └── components/
│       ├── AnnouncementBar.js     # Top sticky promo bar
│       ├── Navbar.js              # Navigation + cart icon + search trigger
│       ├── Home.js                # Composes homepage sections
│       ├── Hero.js                # Full-screen hero / landing section
│       ├── Products.js            # Category grid (topicsData)
│       ├── BestSellers.js         # Curated product highlights
│       ├── Process.js             # "How it works" steps section
│       ├── ProductDetails.js      # Category page → lists sub-products
│       ├── SubProductDetails.js   # Individual product page (gallery, specs, add-to-cart)
│       ├── Cart.js                # Slide-out cart panel + address checkout modal
│       ├── SearchPage.js          # Full-text product search results
│       ├── Contact.js             # EmailJS contact form
│       ├── AboutUs.js             # Brand story page
│       ├── FAQ.js                 # Accordion FAQ (standalone + embedded)
│       ├── TermsAndConditions.js  # Legal page
│       ├── ReturnPolicy.js        # Legal page
│       ├── Icon.js                # Lucide icon wrapper utility
│       └── CSS/                   # One CSS file per component
│           ├── Navbar.css
│           ├── Cart.css           # Includes checkout modal styles
│           ├── Hero.css
│           ├── Products.css
│           ├── BestSellers.css
│           ├── ProductDetails.css
│           ├── SubProductDetails.css
│           ├── SearchPage.css
│           ├── Contact.css
│           ├── FAQ.css
│           ├── PolicyPages.css    # Shared by Terms & Return Policy
│           ├── Process.css
│           └── AnnouncementBar.css
│
├── scripts/
│   └── generate-sitemap.mjs      # Node ESM — reads productsData, writes sitemap.xml
│
├── package.json                   # prebuild + prestart hooks auto-run sitemap script
├── .env                           # EmailJS keys (not committed)
└── .gitignore
```

---

## 🏛 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                       App.js (Root)                     │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │CartProvider │  │  BrowserRouter│  │  WhatsApp FAB │  │
│  │(Context API)│  │   + Routes   │  │  (global)     │  │
│  └──────┬──────┘  └──────┬───────┘  └───────────────┘  │
│         │                │                               │
│  ┌──────▼────────────────▼──────────────────────────┐  │
│  │              Layout Shell                         │  │
│  │  AnnouncementBar → Navbar → <Route> → Footer     │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘

Data Flow:
productsData.js ──► Products.js (category cards)
                └──► ProductDetails.js (sub-product list)
                └──► SubProductDetails.js (single product)
                └──► SearchPage.js (search results)
                └──► BestSellers.js (curated picks)
                └──► generate-sitemap.mjs (sitemap.xml)
```

---

## 🗺 Page & Component Flow

### Routes (defined in `App.js`)

| URL | Component | Description |
|---|---|---|
| `/` | `Home` | Hero + Products + BestSellers + Process + FAQ |
| `/product/:id` | `ProductDetails` | Lists all sub-products in a category |
| `/product/:topicId/:productId` | `SubProductDetails` | Single product detail + add-to-cart |
| `/contact` | `Contact` | EmailJS contact form |
| `/about` | `AboutUs` | Brand story |
| `/faq` | `FAQ` | Standalone FAQ page |
| `/terms` | `TermsAndConditions` | Legal |
| `/return-policy` | `ReturnPolicy` | Legal |
| `/search` | `SearchPage` | Full-text search results |

### Homepage Composition (`Home.js`)

```
Home
 ├── Hero              (video/image hero + CTA)
 ├── Products          (category grid from topicsData)
 ├── BestSellers       (hand-picked featured items)
 ├── Process           (3-step how-it-works)
 └── FAQ               (accordion, embedded mode)
```

---

## 🗄 Data Layer

**Single source of truth: `src/data/productsData.js`**

### `topicsData` — Categories

```js
{
  id: 2,
  title: "KeyChains",
  category: "Personalized",
  icon: "Key",           // Lucide icon name
  desc: "...",
  details: "..."
}
```

### `subProductsMap` — Products (keyed by category `id`)

```js
subProductsMap[2] = [   // All keychain products
  {
    id: '2-1',
    name: "Standing Alphabets",
    price: 100,                         // in ₹ INR
    images: ["/images/products/..."],   // First image = thumbnail
    desc: "Short description",
    fullDetails: "Newline-separated bullet points",
    specs: { material: "PLA", dimensions: "4.5cm x 3cm" },
    features: ["Personalized", "Creative"],
    customizable: true,                 // Shows text input on product page
    customizationLabel: "Enter text",
    customizationPlaceholder: "e.g. AYUSH",
    customizationHint: "Printed exactly as entered"
  }
]
```

> **All images** live in `public/images/products/` and are referenced with paths starting `/images/...`

---

## 🔄 State Management

### CartContext (`src/context/CartContext.js`)

Wraps the entire app. Persists to `localStorage` automatically.

| Value | Type | Description |
|---|---|---|
| `cartItems` | `Array` | All items in cart |
| `cartTotal` | `Number` | Sum of `price × quantity` |
| `cartCount` | `Number` | Total item count |
| `isCartOpen` | `Boolean` | Cart panel visibility |
| `notification` | `Object\|null` | Add-to-cart toast state |
| `addToCart(product)` | `Function` | Adds item; handles customization de-dupe |
| `removeFromCart(cartKey)` | `Function` | Removes by unique key |
| `updateQuantity(cartKey, delta)` | `Function` | `+1` or `-1` |
| `toggleCart()` | `Function` | Opens/closes the cart panel |
| `clearCart()` | `Function` | Empties cart |

**Cart key logic:** Same product with different customization text = separate cart entry.
```js
const itemKey = customizationText
  ? `${product.id}__${customizationText.trim().toLowerCase()}`
  : product.id;
```

---

## 📲 Order Flow (WhatsApp)

```
User clicks "Add to Cart"
        │
        ▼
Toast notification appears (4s)
  ├── "View Cart"           → opens cart panel
  ├── "Order on WhatsApp"   → skips to address modal
  └── "Continue Shopping"   → dismisses toast
        │
        ▼
Cart Panel (slide-in from right)
  ├── Item list with qty controls
  ├── Remove button per item
  └── "Order on WhatsApp" button
        │
        ▼
Address / Checkout Modal
  ├── Full Name *
  ├── Mobile Number (+91 prefix) *
  ├── Full Address (textarea) *
  ├── City * | State *
  ├── Pincode (6-digit) *
  └── Live validation on all fields
        │
        ▼
WhatsApp opens with pre-filled message:

  🛒 New Order — Print-IN 3D Creations

  👤 Customer Details
  Name: Ayush Sharma
  Phone: +91 9876543210

  📦 Delivery Address
  123, Street, Area
  Rajkot, Gujarat — 360001

  🔹 Order Items
  1. Commando × 2 = ₹300
     ✏️ Customization: "JOHN DOE"
  2. Flexy Shark × 1 = ₹150

  ━━━━━━━━━━━━━━━
  Total: ₹450

  Please confirm my order. 🙏
```

WhatsApp number: **+91 70435 91952**

---

## 🔍 SEO Infrastructure

### `public/index.html` meta tags

| Type | Tags Included |
|---|---|
| Primary SEO | `<title>`, `description`, `keywords`, `canonical` |
| Open Graph | `og:title`, `og:description`, `og:image`, `og:url` |
| Twitter Card | `twitter:card`, `twitter:image`, `twitter:title` |
| Schema.org JSON-LD | `Organization`, `WebSite` (with SearchAction), `Store` |
| Geo / Local SEO | `geo.region` (IN-GJ), `geo.placename` (Gujarat) |
| PWA | `theme-color`, `apple-mobile-web-app-capable` |

### `public/robots.txt`

```
User-agent: *
Allow: /
Disallow: /cart
Disallow: /checkout
Sitemap: https://printin3d.in/sitemap.xml
```

### `public/manifest.json`

Configured with correct app name, dark theme color, `en-IN` locale, and maskable icon purpose for PWA installation.

---

## 🗺 Dynamic Sitemap System

The sitemap is **never edited manually**. It auto-generates from `productsData.js`.

### Script: `scripts/generate-sitemap.mjs`

1. Imports `topicsData` and `subProductsMap` from `productsData.js`
2. Slugifies all category and product names:
   - `"Home & Decor"` → `home-and-decor`
   - `"Standing Alphabets"` → `standing-alphabets`
3. Writes all URLs to `public/sitemap.xml` with today's date as `<lastmod>`

### Auto-trigger hooks (in `package.json`)

| Command | Hook | Effect |
|---|---|---|
| `npm start` | `prestart` | Sitemap regenerated before dev server |
| `npm run build` | `prebuild` | Sitemap regenerated before production build |
| `npm run generate-sitemap` | — | Manual one-shot run |

### Generated URL structure

```
https://printin3d.in/                               (priority 1.0)
https://printin3d.in/about                          (priority 0.8)
https://printin3d.in/product/keychains              (priority 0.9)
https://printin3d.in/product/keychains/commando     (priority 0.7)
https://printin3d.in/product/home-and-decor/f1-calender
...
```

---

## 🎨 Styling System

All design tokens are CSS custom properties defined in `src/index.css`:

```css
--color-primary          /* Brand accent colour */
--color-primary-hover    /* Hover state */
--color-bg-main          /* Page background */
--color-bg-white         /* Card/panel background */
--color-bg-secondary     /* Subtle surface */
--color-text-main        /* Primary text */
--color-text-secondary   /* Muted text */
--color-text-muted       /* Placeholder / disabled */
--color-glass-border     /* Border / divider */
```

Each component has its own scoped CSS file in `src/components/CSS/`. No CSS framework is used — everything is vanilla CSS.

---

## ➕ Adding New Products

### Step 1 — Add image(s)

Place images in `public/images/products/<category-folder>/`.

### Step 2 — Add product to `productsData.js`

```js
// In subProductsMap, find the right category key (2=Keychains, 3=Decor, etc.)
subProductsMap[2].push({
    id: '2-16',                          // next sequential ID in category
    name: "New Product Name",
    price: 199,
    images: ["/images/products/keychains/new-folder/i1.jpg"],
    desc: "Short one-line description.",
    fullDetails: "Line 1\nLine 2\nLine 3",
    specs: { material: "PLA", dimensions: "5cm x 3cm" },
    features: ["Tag1", "Tag2"],
    customizable: true,                   // omit if not customizable
    customizationLabel: "Enter your text",
    customizationPlaceholder: "e.g. JOHN",
    customizationHint: "Printed exactly as entered."
});
```

### Step 3 — Done ✅

The sitemap auto-updates on the next `npm start` or `npm run build`. No other files need to change.

---

## 📜 Scripts Reference

```bash
npm start                  # Start dev server (also regenerates sitemap)
npm run build              # Production build (also regenerates sitemap)
npm run generate-sitemap   # Manually regenerate sitemap only
npm test                   # Run test suite
```

---

## 🚀 Deployment

### Build

```bash
npm run build
```

This outputs a `build/` folder (static HTML/CSS/JS) and auto-generates a fresh `sitemap.xml`.

### Hosting options

The `build/` folder can be deployed to any static host:

| Host | Command |
|---|---|
| **Vercel** | Connect GitHub repo → auto-deploys on push |
| **Netlify** | Connect GitHub → build command: `npm run build`, publish dir: `build` |
| **GitHub Pages** | Install `gh-pages`, add deploy script |
| **cPanel / Shared Hosting** | Upload contents of `build/` to `public_html/` |

### React Router — Server Config

Since this uses client-side routing, the server must redirect all routes to `index.html`.

**Netlify** — create `public/_redirects`:
```
/*    /index.html   200
```

**Apache** — create `public/.htaccess`:
```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

### Environment Variables

Create a `.env` file in the project root for EmailJS:

```env
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## 📞 Contact & WhatsApp

Business WhatsApp: [+91 70435 91952](https://wa.me/917043591952)

---

*© 2026 Print-IN 3D Creations. All rights reserved.*# 3d
# 3d
# 3d
# print3d
#   g h o d u - w e b s i t e  
 