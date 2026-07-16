import { useState, useEffect, useRef } from "react";
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

const Navbar = ({ activeTab, go, mobileMenu, setMobileMenu, navItems }) => {
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
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

  // Close on route change
  useEffect(() => {
    if (mobileMenu && lastActive.current !== activeTab) {
      setMobileMenu(false);
    }
    lastActive.current = activeTab;
  }, [activeTab, mobileMenu, setMobileMenu]);

  return (
    <>
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          background: scrolled ? "rgba(250, 248, 245, 0.88)" : "rgba(250, 248, 245, 0.98)",
          backdropFilter: scrolled ? "blur(24px)" : "blur(12px)",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "blur(12px)",
          borderBottom: scrolled ? "1px solid rgba(229, 224, 219, 0.5)" : "1px solid transparent",
          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          style={{
            maxWidth: 1280, margin: "0 auto", padding: "0 32px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            height: scrolled ? 64 : 72,
            transition: "height 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Logo */}
          <div onClick={() => go("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 36, height: 36,
              background: `linear-gradient(135deg, ${G.crimson}, ${G.gold})`,
              borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: 18, fontWeight: 700 }}>X</span>
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: G.textPrimary, letterSpacing: 1, lineHeight: 1, fontWeight: 700 }}>XOAS</div>
              <div style={{ fontSize: 9, color: G.textTertiary, letterSpacing: 2.5, textTransform: "uppercase", fontWeight: 500 }}>Smart Living</div>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hide-mobile" style={{ display: "flex", gap: 2, alignItems: "center" }}>
            {navItems.map((n) => (
              <button key={n.id} className={`nav-link${activeTab === n.id ? " active" : ""}`} onClick={() => go(n.id)} style={{ padding: "8px 18px", fontSize: 13 }}>{n.label}</button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href="tel:03368263402" className="btn-primary hide-mobile" style={{ textDecoration: "none", padding: "10px 22px", fontSize: 13, borderRadius: 10 }}>
              <Icon name="phone" size={13} color="white" /> Call Now
            </a>
            <div className="show-mobile">
              <Hamburger open={mobileMenu} onClick={() => setMobileMenu(!mobileMenu)} />
            </div>
          </div>
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
                background: `linear-gradient(160deg, ${G.charcoal} 0%, #1A0808 50%, ${G.charcoal} 100%)`,
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
                      background: `linear-gradient(135deg, ${G.crimson}, ${G.gold})`,
                      borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: 16, fontWeight: 700 }}>X</span>
                    </div>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "white", letterSpacing: 1 }}>XOAS</span>
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
                      fontFamily: "'Playfair Display', serif",
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
                          background: `linear-gradient(to bottom, ${G.crimsonLight}, ${G.gold})`,
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
                    background: `linear-gradient(135deg, ${G.crimson}, ${G.crimsonDark})`,
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
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "rgba(196,30,30,0.3)"; }}
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
