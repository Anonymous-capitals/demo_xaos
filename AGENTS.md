# AGENTS.md — XOAS Frontend (demo_xaos)

## What this is

Single-page promotional/sales site for **XOAS**, a fictional premium home-entertainment brand
(TVs, audio, remotes) marketed by "Unique Home Appliance", India. Built as a demo — no backend,
no auth, no persistence. All product/form state is in-memory React state.

## Stack & commands

- **React 18 + Vite 5** (`@vitejs/plugin-react`), JSX, no router/tests/lint/typecheck.
- **framer-motion** — only dependency beyond React; used in `Navbar.jsx` (mobile drawer/hamburger).
- **Google Fonts**: `Manrope` only (wght 400–800), imported in `global.css`. No serif.
- Brand palette (in `constants/colors.js`): brand-red `#B21E35` (crimson/`crimsonDark` `#8E162A`/`crimsonLight`
  `#C73B4F`), ink `#181A19` (charcoal), ivory `#F5F2EC` (surface), warm gray border `#E2DED6`. Gold
  (`#C9A84C` family) exists only as a demoted legacy accent for badges (`.badge-gold`), never as
  text or gradients.
- Design tokens in `global.css` `:root`: 4px spacing scale (`--space-*`), radii
  `--radius-sm/md/lg/xl/2xl/full` = 6/10/14/18/24/9999px, `--shadow-sm/md/lg`, `--border`, red-ink
  `hero-gradient`. Gradient text is banned; logo tiles / stat numbers / hero headline accent are
  solid colors. Product images served from `public/product-images/image1-6.jpeg`.
- **Hero**: `HeroShowcase.jsx` auto-rotates `public/hero/hero-1..3.png` (5s crossfade, dots);
  desktop-only (wrapped in `.hide-mobile`). `HeroIllustration.jsx` was deleted.
- Commands (via `package.json`): `npm run dev` (vite), `npm run build`, `npm run preview`.
  Build output goes to `dist/`.

## Architecture

- Tab-based "routing": **no react-router**. `App.jsx` holds `activeTab` state and renders
  `pages[activeTab]` (home, about, support, contact, products, admin, product). Navigating =
  `setActiveTab` via `go(tab)`.
- **App.jsx is the single state container.** It owns: `activeTab`, `mobileMenu`, `toast`,
  `searchQ`, `products`, `viewProduct`, `openFaq`, `contact`, `support`, and all admin state
  (`adminAuth`, `adminPass`, `adminView`, `editId`). Every page receives props from here.
- `useScrollReveal()` in App.jsx: IntersectionObserver that adds `.visible` to `.reveal`
  elements. `RevealSection` in HomePage duplicates this per-section.

### Dir map (`src/`)
| Path | Role |
|---|---|
| `main.jsx` | Mounts `<App/>` into `#root`. |
| `App.jsx` | State container + page renderer + global search filter. |
| `asset.js` | `PAGE_IMAGES` (hero photos for About/Support/Contact; some placehold.co URLs). |
| `constants/colors.js` | `G` palette (crimson/gold/charcoal/surface/border/text colors). |
| `data/products.js` | **26 hardcoded products** (12 TV, 10 Audio, 4 Remote). |
| `data/faqs.js` | 5 hardcoded FAQs (Support page accordion). |
| `components/` | `Navbar`, `Footer`, `Toast`, `ProductModal`, `EnquireModal` (shared), `Icon`, `StaticMap`, `HeroShowcase`. |
| `pages/` | `HomePage`, `ProductsPage`, `ProductPage`, `AboutPage`, `SupportPage`, `ContactPage`, `AdminPage`. |
| `admin/` | `Dashboard` (stats + stock dropdown), `CatalogAdmin` (product CRUD form). |
| `styles/global.css` | **All CSS.** Components use heavy inline styles; CSS holds buttons, badges, modals, toast, nav, responsive grid helpers (`hide-mobile`, `grid-2/3/4`), keyframes. |

### Product shape (products.js + CatalogAdmin)
`{ id, name, category, family ("TVs"|"Audio"|"Remotes"), price, originalPrice, rating, stock
("In Stock"|"Limited"|"Pre-order"|"Out of Stock"), sku, desc, specs, imageUrl, badge }`.
Prices are strings like `"₹1,79,999"` (sorting strips `₹`/`,` and parses float).

`asset.js` exports only `PAGE_IMAGES` (hero photos used by About/Support/Contact pages).

## Key flows

- **Search/sort/filter**: `searchQ` filters by name/category/family in App.jsx. ProductsPage
  filters by `family` and sorts via `useMemo`.
- **Product viewing**: card click → `setViewProduct(p)` opens `ProductModal` (overlay); modal
  "Explore" → `openProductPage` sets tab "product" → full `ProductPage` with "similar" products.
- **Admin**: password gate in `AdminPage` — **hardcoded password `xoas2026`, displayed onscreen
  as "Demo password"** (demo-only). Views: Dashboard (stats, stock quick-update on first 6
  products) and Catalog (add/edit/delete products, base64 image upload via FileReader).
- **Forms** (Contact, Support, Enquire): client-side required-field check + `showToast` only.
  Nothing is sent anywhere. All contact info is hardcoded: `sales@xoas.in`, `033 6826 3402`,
  West Bengal, Mon–Sat 9AM–7PM.

## Conventions

- Inline `style={{}}` objects everywhere; `G` color token imported from `constants/colors`.
  Global CSS classes for: `.btn-primary/-secondary/-ghost`, `.badge[-crimson/gold/green/amber/blue/gray]`,
  `.input-field`, `.modal-overlay/.modal-box`, `.toast`, `.section-tag/.section-heading/-sub`,
  `.product-card`, `.card-hover`, `.grid-2/3/4` (collapse to 1 col at ≤768px).
- Icons: never a library — `Icon` component with an inline SVG map (`name` prop). Add icons there.
- Framer-motion reserved for navbar/overlay transitions; scroll-reveal via `.reveal` + IntersectionObserver.
- Fonts: Manrope everywhere (headings + body). Red `#B21E35` is the single accent; no crimson→gold gradients.
- Currency: INR strings with `₹`. Product images served from `public/product-images/image1-6.jpeg`.

## Gotchas / dead code

- **Admin CRUD doesn't persist** — reloading resets `products` to the data file.
- `EnquireModal` is a shared component (`components/EnquireModal.jsx`) imported by HomePage and
  ProductsPage — keep it shared, never copy-paste it again.
- Product additions get `id: Date.now()` and `rating: 4.5`; admin-created/edited products won't
  match the seed shape perfectly (e.g. missing `badge` → handled, `originalPrice` optional).
- Navbar logo uses `"TV (1).jpeg"` (space in filename, likely broken); footer/about logos use
  placehold.co placeholders. `asset.js` only exports `PAGE_IMAGES` (logos moved/inline in Navbar/Footer).

## Build & verify

- Dev: `npm run dev`. Production: `npm run build`.
- No lint/typecheck/tests configured. If you add logic-heavy code, self-check with a small
  `node` script or manual run — there is no test runner.