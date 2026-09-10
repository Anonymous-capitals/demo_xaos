import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import G from "../constants/colors";
import Icon from "./Icon";

const socialLinks = [
  { name: "instagram", url: "#" },
  { name: "facebook", url: "#" },
  { name: "linkedin", url: "#" },
  { name: "youtube", url: "#" },
];

const Hamburger = ({ open, onClick }) => (
  <button
    onClick={onClick}
    aria-label={open ? "Close menu" : "Open menu"}
    aria-expanded={open}
    style={{
      background: "none", border: "none", cursor: "pointer",
      width: 28, height: 28, padding: 0, position: "relative",
      display: "flex", flexDirection: "column", justifyContent: "center", gap: 0,
    }}
  >
    <motion.span
      animate={open ? { rotate: 45, y: 1.5 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: "block", width: 22, height: 2, background: G.textPrimary, borderRadius: 1, margin: "2px 0", transformOrigin: "center" }}
    />
    <motion.span
      animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: "block", width: 22, height: 2, background: G.textPrimary, borderRadius: 1, margin: "2px 0", transformOrigin: "center" }}
    />
    <motion.span
      animate={open ? { rotate: -45, y: -1.5 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: "block", width: 22, height: 2, background: G.textPrimary, borderRadius: 1, margin: "2px 0", transformOrigin: "center" }}
    />
  </button>
);

const GlassSearch = ({ products, searchQ, setSearchQ, go, openProductPage, activeTab, mobileOpen, setMobileOpen }) => {
  const [open, setOpen] = useState(false);
  const deskRef = useRef(null);
  const mobRef = useRef(null);

  const q = searchQ.trim().toLowerCase();
  const results = useMemo(
    () =>
      q
        ? products
            .filter((p) =>
              [p.name, p.category, p.family].some((field) =>
                field.toLowerCase().includes(q)
              )
            )
            .slice(0, 5)
        : [],
    [products, q]
  );

  // Dropdown closes on route change so results never feel stale
  useEffect(() => setOpen(false), [activeTab]);

  // Outside click + Escape close both the desktop dropdown and the mobile panel
  useEffect(() => {
    if (!open && !mobileOpen) return;
    const inside = (t) =>
      (deskRef.current && deskRef.current.contains(t)) ||
      (mobRef.current && mobRef.current.contains(t));
    const onDown = (e) => {
      if (!inside(e.target)) {
        setOpen(false);
        setMobileOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, mobileOpen, setMobileOpen]);

  const clear = () => {
    setSearchQ("");
    setOpen(false);
    setMobileOpen(false);
  };
  const seeAll = () => {
    setOpen(false);
    setMobileOpen(false);
    go("products");
  };
  const pick = (p) => {
    setOpen(false);
    setMobileOpen(false);
    openProductPage(p);
  };

  const field = (
    <>
      <div className="glass-search-field glass-focus-wrap">
        <span className="glass-search-icon">
          <Icon name="search" size={16} color="currentColor" />
        </span>
        <input
          className="glass-search-input"
          placeholder="Search TVs, audio & remotes…"
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
          onFocus={() => setOpen(true)}
          aria-label="Search products"
        />
        {searchQ && (
          <button className="glass-search-clear" onClick={clear} aria-label="Clear search">
            <Icon name="x" size={13} color="currentColor" />
          </button>
        )}
      </div>
    </>
  );

  const dropdown = (open || mobileOpen) && (
    <div className="glass-search-panel" role="listbox" aria-label="Search results">
      {q ? (
        results.length > 0 ? (
          <>
            <div className="glass-search-label">Products</div>
            <ul className="glass-search-results">
              {results.map((p) => (
                <li key={p.id}>
                  <button onClick={() => pick(p)} role="option" aria-selected="false">
                    <span className="glass-search-thumb">
                      {p.imageUrl && <img src={p.imageUrl} alt="" loading="lazy" />}
                    </span>
                    <span>
                      <span className="glass-search-name">{p.name}</span>
                      <span className="glass-search-meta">
                        {p.family} · {p.price}
                      </span>
                    </span>
                    <span className="glass-search-arrow" style={{ marginLeft: "auto" }}>
                      <Icon name="arrow" size={14} color="currentColor" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <button className="glass-search-all" onClick={seeAll}>
              See all results for “{searchQ}”
              <Icon name="arrow" size={14} color="currentColor" />
            </button>
          </>
        ) : (
          <div className="glass-search-empty">No products match “{searchQ}”.</div>
        )
      ) : (
        <div className="glass-search-hint">
          Try “OLED”, “soundbar” or “remote” — or browse the lineup below.
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <div ref={deskRef} className="glass-search hide-mobile" style={{ width: "min(250px, 20vw)" }}>
        {field}
        {dropdown}
      </div>

      {/* Mobile */}
      <div ref={mobRef} className="show-mobile" style={{ alignItems: "center" }}>
        {!mobileOpen ? (
          <button
            className="glass-search-trigger"
            aria-label="Open search"
            onClick={() => setMobileOpen(true)}
          >
            <Icon name="search" size={18} color="currentColor" />
          </button>
        ) : (
          <div className="glass-search-mobile">
            {field}
            {dropdown}
          </div>
        )}
      </div>
    </>
  );
};

const ShopMenu = ({ products, onPick, onBrowse, onEnter, onLeave }) => {
  const [family, setFamily] = useState("TVs");
  const families = ["TVs", "Audio", "Remotes"];
  const labelFor = (f) => (f === "TVs" ? "Televisions" : f === "Audio" ? "Audio Systems" : "Smart Remotes");
  const items = products.filter((p) => p.family === family).slice(0, 8);

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: "absolute", left: 0, right: 0, top: "calc(100% + 12px)", zIndex: 40,
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(24,26,25,0.08)",
        borderRadius: 20,
        boxShadow: "0 40px 90px rgba(24,26,25,0.2), inset 0 1px 0 rgba(255,255,255,0.9)",
        overflow: "hidden",
        animation: "scaleIn 0.22s cubic-bezier(0.16,1,0.3,1)",
        transformOrigin: "top center",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", minHeight: 300 }}>
        {/* Category rail */}
        <div style={{ background: "#F7F4EF", borderRight: "1px solid rgba(24,26,25,0.07)", padding: "18px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 1.6, textTransform: "uppercase", color: G.textTertiary, padding: "0 14px 10px" }}>
            Shop by Category
          </div>
          {families.map((f) => {
            const active = family === f;
            return (
              <button
                key={f}
                onMouseEnter={() => setFamily(f)}
                onClick={() => setFamily(f)}
                style={{
                  position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between",
                  width: "100%", padding: "11px 14px", border: "none", borderRadius: 12, cursor: "pointer",
                  fontFamily: "'Manrope', sans-serif", fontSize: 13.5, fontWeight: active ? 700 : 500,
                  color: active ? G.crimson : G.textSecondary,
                  background: active ? "rgba(178,30,53,0.08)" : "transparent",
                  textAlign: "left", transition: "all 0.2s ease",
                }}
              >
                {active && (
                  <span style={{ position: "absolute", left: 0, top: "22%", bottom: "22%", width: 4, background: G.crimson, borderRadius: 4 }} />
                )}
                <span>{labelFor(f)}</span>
                <Icon name="chevronRight" size={13} color={active ? G.crimson : G.textTertiary} />
              </button>
            );
          })}
          <button
            onClick={() => onBrowse(null)}
            style={{
              marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between",
              width: "100%", padding: "11px 14px", border: "none", borderTop: "1px solid rgba(24,26,25,0.07)",
              borderRadius: 0, cursor: "pointer", fontFamily: "'Manrope', sans-serif",
              fontSize: 12.5, fontWeight: 600, color: G.crimson, background: "none", textAlign: "left",
            }}
          >
            Browse full catalog
            <Icon name="arrow" size={13} color={G.crimson} />
          </button>
        </div>

        {/* Products */}
        <div style={{ padding: "20px 24px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: G.textPrimary, fontFamily: "'Manrope', sans-serif", lineHeight: 1.2 }}>
                {labelFor(family)}
              </div>
              <div style={{ fontSize: 12, color: G.textTertiary, marginTop: 3 }}>
                {items.length} models · flagship performance
              </div>
            </div>
            <button
              onClick={() => onBrowse(family)}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", fontFamily: "'Manrope', sans-serif", fontSize: 13, fontWeight: 600, color: G.crimson, padding: "8px 4px" }}
            >
              View all {labelFor(family).toLowerCase()}
              <Icon name="arrow" size={14} color={G.crimson} />
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {items.map((p) => (
              <button
                key={p.id}
                onClick={() => onPick(p)}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = G.crimson)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(24,26,25,0.08)")}
                style={{
                  display: "flex", flexDirection: "column", gap: 8, padding: 12, border: "1px solid rgba(24,26,25,0.08)",
                  borderRadius: 14, background: "white", cursor: "pointer", textAlign: "left",
                  fontFamily: "'Manrope', sans-serif",
                  boxShadow: "0 1px 2px rgba(24,26,25,0.04)",
                  transition: "border-color 0.2s ease",
                }}
              >
                <span style={{ height: 84, borderRadius: 10, overflow: "hidden", background: "linear-gradient(150deg, #F1EDE6, #E6E1D7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {p.imageUrl && <img src={p.imageUrl} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain", padding: 6 }} />}
                </span>
                <span style={{ fontSize: 12.5, fontWeight: 600, color: G.textPrimary, lineHeight: 1.35, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: 34 }}>
                  {p.name}
                </span>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: G.crimson }}>{p.price}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ activeTab, go, mobileMenu, setMobileMenu, navItems, products, searchQ, setSearchQ, openProductPage, cartCount, onCartClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const menuRef = useRef(null);
  const closeTimer = useRef(null);
  const lastActive = useRef(activeTab);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenu]);

  // ESC close + focus trap
  useEffect(() => {
    if (!mobileMenu) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMobileMenu(false);
      if (e.key === "Tab") {
        const els = menuRef.current?.querySelectorAll("button, a, [tabindex]");
        if (!els || els.length === 0) return;
        const first = els[0], last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    // focus first item after mount
    requestAnimationFrame(() => { menuRef.current?.querySelector("a, button")?.focus(); });
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenu, setMobileMenu]);

  // Swipe to close
  useEffect(() => {
    if (!mobileMenu) return;
    let startX = 0;
    const onTouchStart = (e) => { startX = e.touches[0].clientX; };
    const onTouchEnd = (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (dx > 80) setMobileMenu(false);
    };
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [mobileMenu, setMobileMenu]);

  // Shop dropdown closes on Escape
  useEffect(() => {
    if (!shopOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        clearTimeout(closeTimer.current);
        setShopOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shopOpen]);

  // Close on route change
  useEffect(() => {
    if (mobileMenu && lastActive.current !== activeTab) {
      setMobileMenu(false);
    }
    if (lastActive.current !== activeTab) {
      clearTimeout(closeTimer.current);
      setSearchOpen(false);
      setShopOpen(false);
    }
    lastActive.current = activeTab;
  }, [activeTab, mobileMenu, setMobileMenu]);

  return (
    <>
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          background: scrolled ? "rgba(250, 248, 245, 0.9)" : "rgba(250, 248, 245, 0.98)",
          backdropFilter: scrolled ? "blur(24px)" : "blur(12px)",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "blur(12px)",
          borderBottom: scrolled ? "1px solid rgba(229, 224, 219, 0.6)" : "1px solid transparent",
          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Utility strip — collapses on scroll */}
        <div
          className="hide-mobile"
          style={{
            height: scrolled ? 0 : 34,
            overflow: "hidden",
            background: G.charcoal,
            transition: "height 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div
            style={{
              maxWidth: 1400, margin: "0 auto", padding: "0 32px",
              height: 34, display: "flex", alignItems: "center", justifyContent: "space-between",
              whiteSpace: "nowrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name="map" size={12} color="rgba(255,255,255,0.35)" />
              <span style={{ fontSize: 11, letterSpacing: 0.6, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>
                Kolkata · Premium home entertainment since 2016
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <span style={{ fontSize: 11, letterSpacing: 0.6, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>
                Mon–Sat · 9AM–7PM
              </span>
              <a
                href="tel:03368263402"
                style={{
                  fontSize: 11, letterSpacing: 0.6, color: "rgba(255,255,255,0.85)",
                  fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6,
                }}
              >
                <Icon name="phone" size={11} color={G.crimsonLight} /> 033 6826 3402
              </a>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div
          style={{
            position: "relative",
            maxWidth: 1400, margin: "0 auto", padding: "0 32px",
            display: "flex", alignItems: "center",
            height: scrolled ? 58 : 72,
            transition: "height 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Logo */}
          <div onClick={() => go("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 13, flex: 1, minWidth: 0 }}>
            <div style={{
              width: 36, height: 36,
              background: G.crimson,
              borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)",
            }}>
              <span style={{ fontFamily: "'Manrope', sans-serif", color: "white", fontSize: 18, fontWeight: 800 }}>X</span>
            </div>
            <div>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 20, color: G.textPrimary, letterSpacing: 1, lineHeight: 1, fontWeight: 700 }}>XOAS</div>
              <div style={{ fontSize: 9, color: G.textTertiary, letterSpacing: 2.5, textTransform: "uppercase", fontWeight: 500 }}>Smart Living</div>
            </div>
          </div>

          {/* Desktop nav — centered */}
          <div className="hide-mobile" style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {navItems.map((n) =>
              n.id === "products" ? (
                <div
                  key={n.id}
                  style={{ position: "relative" }}
                  onMouseEnter={() => { clearTimeout(closeTimer.current); setShopOpen(true); }}
                  onMouseLeave={() => { closeTimer.current = setTimeout(() => setShopOpen(false), 150); }}
                >
                  <button
                    className={`nav-link${activeTab === n.id ? " active" : ""}`}
                    onClick={() => go(n.id)}
                    style={{ fontSize: 13.5, display: "inline-flex", alignItems: "center", gap: 5 }}
                  >
                    {n.label}
                    <span style={{ display: "inline-flex", transform: shopOpen ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.3s" }}>
                      <Icon name="chevronRight" size={11} color={activeTab === n.id ? G.crimson : G.textTertiary} />
                    </span>
                  </button>
                </div>
              ) : (
                <button key={n.id} className={`nav-link${activeTab === n.id ? " active" : ""}`} onClick={() => go(n.id)} style={{ fontSize: 13.5 }}>{n.label}</button>
              )
            )}
          </div>

          {/* Right cluster */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 12, minWidth: 0 }}>
            <button
              onClick={onCartClick}
              aria-label={`Cart with ${cartCount || 0} item${cartCount === 1 ? "" : "s"}`}
              style={{
                position: "relative", width: 42, height: 42, borderRadius: 12,
                border: "1px solid rgba(24,26,25,0.08)", background: "white",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                color: G.textPrimary, transition: "all 0.2s ease", flexShrink: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = G.crimson)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(24,26,25,0.08)")}
            >
              <Icon name="cart" size={19} color="currentColor" />
              {cartCount > 0 && (
                <span style={{
                  position: "absolute", top: -6, right: -6, minWidth: 18, height: 18, padding: "0 5px",
                  borderRadius: 9, background: G.crimson, color: "white",
                  fontSize: 10.5, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(178,30,53,0.35)",
                }}>
                  {cartCount}
                </span>
              )}
            </button>
            <GlassSearch
              products={products}
              searchQ={searchQ}
              setSearchQ={setSearchQ}
              go={go}
              openProductPage={openProductPage}
              activeTab={activeTab}
              mobileOpen={searchOpen}
              setMobileOpen={setSearchOpen}
            />
            <a href="tel:03368263402" className="btn-primary hide-mobile nav-call" style={{ textDecoration: "none", padding: "10px 20px", fontSize: 13 }}>
              <Icon name="phone" size={13} color="white" /> Call Now
            </a>
            <div className="show-mobile">
              <Hamburger open={mobileMenu} onClick={() => setMobileMenu(!mobileMenu)} />
            </div>
          </div>

          {shopOpen && (
            <ShopMenu
              products={products}
              onPick={(p) => { clearTimeout(closeTimer.current); setShopOpen(false); openProductPage(p); }}
              onBrowse={(f) => { clearTimeout(closeTimer.current); setShopOpen(false); go("products", f); }}
              onEnter={() => { clearTimeout(closeTimer.current); setShopOpen(true); }}
              onLeave={() => { closeTimer.current = setTimeout(() => setShopOpen(false), 150); }}
            />
          )}
        </div>
      </nav>

      {/* Mobile side drawer */}
      <AnimatePresence>
        {mobileMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenu(false)}
              style={{
                position: "fixed", inset: 0, zIndex: 1999,
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
              }}
            />

            {/* Drawer panel */}
            <motion.div
              ref={menuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              style={{
                position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 2000,
                width: "min(400px, 85vw)",
                background: G.charcoal,
                display: "flex", flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* Grain */}
              <div style={{
                position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.035,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat", backgroundSize: "256px 256px",
              }} />

              {/* Header */}
              <div style={{
                position: "relative", zIndex: 1,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "20px 28px",
              }}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <div onClick={() => { go("home"); setMobileMenu(false); }} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 34, height: 34,
                      background: G.crimson,
                      borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ fontFamily: "'Manrope', sans-serif", color: "white", fontSize: 16, fontWeight: 800 }}>X</span>
                    </div>
                    <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 18, fontWeight: 800, color: "white", letterSpacing: 1 }}>XOAS</span>
                  </div>
                </motion.div>

                <motion.button
                  onClick={() => setMobileMenu(false)}
                  aria-label="Close menu"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
                    cursor: "pointer", padding: 10, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <Icon name="x" size={20} color="white" />
                </motion.button>
              </div>

              {/* Nav links */}
              <div style={{
                position: "relative", zIndex: 1,
                flex: 1, display: "flex", flexDirection: "column",
                justifyContent: "center", padding: "0 28px",
              }}>
                {navItems.map((n) => (
                  <motion.button
                    key={n.id}
                    onClick={() => { go(n.id); setMobileMenu(false); }}
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: "flex", alignItems: "center", gap: 16,
                      width: "100%", padding: "14px 0",
                      background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.04)",
                      cursor: "pointer",
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "clamp(24px, 5vw, 28px)",
                      fontWeight: activeTab === n.id ? 700 : 400,
                      color: activeTab === n.id ? G.crimsonLight : "rgba(255,255,255,0.55)",
                      letterSpacing: "-0.3px",
                      textAlign: "left",
                      position: "relative",
                      transition: "color 0.25s ease",
                    }}
                    onMouseEnter={(e) => { if (activeTab !== n.id) e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}
                    onMouseLeave={(e) => { if (activeTab !== n.id) e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
                  >
                    {activeTab === n.id && (
                      <motion.div layoutId="navAccent" transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        style={{
                          position: "absolute", left: -28, top: 4, bottom: 4, width: 4,
                          background: G.crimsonLight,
                          borderRadius: 4,
                        }}
                      />
                    )}
                    <span>{n.label}</span>
                    <span style={{ marginLeft: "auto", opacity: 0.3 }}>
                      <Icon name="arrow" size={16} color={activeTab === n.id ? G.crimsonLight : "rgba(255,255,255,0.3)"} />
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Bottom section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                style={{
                  position: "relative", zIndex: 1,
                  padding: "24px 28px calc(24px + env(safe-area-inset-bottom, 0px))",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Contact */}
                <a href="tel:03368263402"
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    textDecoration: "none", padding: "12px 14px",
                    background: "rgba(255,255,255,0.04)", borderRadius: 12,
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                >
                  <div style={{
                    width: 36, height: 36,
                    background: G.crimson,
                    borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <Icon name="phone" size={16} color="white" />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>Call Now</div>
                    <div style={{ fontSize: 15, color: "white", fontWeight: 600 }}>033 6826 3402</div>
                  </div>
                </a>
                <a href="mailto:sales@xoas.in"
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    textDecoration: "none", padding: "10px 14px", marginTop: 4,
                    borderRadius: 10, transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  <Icon name="mail" size={16} color="rgba(255,255,255,0.3)" />
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>sales@xoas.in</span>
                </a>

                {/* Social */}
                <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                  {socialLinks.map((s) => (
                    <motion.a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      style={{
                        width: 38, height: 38,
                        background: "rgba(255,255,255,0.05)", borderRadius: 10,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        border: "1px solid rgba(255,255,255,0.06)",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "rgba(178,30,53,0.3)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
                    >
                      <Icon name={s.name} size={16} color="rgba(255,255,255,0.45)" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
