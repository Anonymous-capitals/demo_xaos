import { useState, useEffect } from "react";
import G from "../constants/colors";
import Icon from "./Icon";

const Navbar = ({ activeTab, go, mobileMenu, setMobileMenu, navItems }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled
          ? "rgba(250, 248, 245, 0.88)"
          : "rgba(250, 248, 245, 0.98)",
        backdropFilter: scrolled ? "blur(24px)" : "blur(12px)",
        WebkitBackdropFilter: scrolled ? "blur(24px)" : "blur(12px)",
        borderBottom: scrolled
          ? "1px solid rgba(229, 224, 219, 0.5)"
          : "1px solid transparent",
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: scrolled ? 64 : 72,
          transition: "height 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          onClick={() => go("home")}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              background: `linear-gradient(135deg, ${G.crimson}, ${G.gold})`,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "white",
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              X
            </span>
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 20,
                color: G.textPrimary,
                letterSpacing: 1,
                lineHeight: 1,
                fontWeight: 700,
              }}
            >
              XOAS
            </div>
            <div
              style={{
                fontSize: 9,
                color: G.textTertiary,
                letterSpacing: 2.5,
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Smart Living
            </div>
          </div>
        </div>

        <div
          className="hide-mobile"
          style={{
            display: "flex",
            gap: 2,
            alignItems: "center",
          }}
        >
          {navItems.map((n) => (
            <button
              key={n.id}
              className={`nav-link${activeTab === n.id ? " active" : ""}`}
              onClick={() => go(n.id)}
              style={{
                padding: "8px 18px",
                fontSize: 13,
              }}
            >
              {n.label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <a
            href="tel:03368263402"
            className="btn-primary hide-mobile"
            style={{
              textDecoration: "none",
              padding: "10px 22px",
              fontSize: 13,
              borderRadius: 10,
            }}
          >
            <Icon name="phone" size={13} color="white" /> Call Now
          </a>
          <div className="show-mobile">
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 8,
                borderRadius: 8,
                transition: "background 0.2s",
              }}
            >
              <Icon
                name={mobileMenu ? "x" : "menu"}
                size={22}
                color={G.textPrimary}
              />
            </button>
          </div>
        </div>
      </div>

      {mobileMenu && (
        <div
          onClick={() => setMobileMenu(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            background: "rgba(0,0,0,0.4)",
            animation: "fadeIn 0.25s ease",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              maxWidth: 400,
              background: "#FFFFFF",
              padding: "24px 28px 32px",
              display: "flex",
              flexDirection: "column",
              animation: "slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              boxShadow: "-8px 0 40px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              paddingBottom: 20, borderBottom: `1px solid ${G.border}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 32, height: 32,
                  background: `linear-gradient(135deg, ${G.crimson}, ${G.gold})`,
                  borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: 16, fontWeight: 700 }}>X</span>
                </div>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: G.textPrimary }}>XOAS</span>
              </div>
              <button onClick={() => setMobileMenu(false)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 6, borderRadius: 8 }}>
                <Icon name="x" size={20} color={G.textSecondary} />
              </button>
            </div>

            <div style={{ flex: 1, overflow: "auto", paddingTop: 12 }}>
              {navItems.map((n, i) => (
                <button
                  key={n.id}
                  onClick={() => { go(n.id); setMobileMenu(false); }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    width: "100%",
                    padding: "18px 8px",
                    marginBottom: 2,
                    background: activeTab === n.id ? `linear-gradient(90deg, rgba(165,0,26,0.04), transparent)` : "transparent",
                    border: "none",
                    borderRadius: 12,
                    cursor: "pointer",
                    fontSize: 17,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: activeTab === n.id ? 600 : 500,
                    color: activeTab === n.id ? G.crimson : G.textPrimary,
                    transition: "all 0.2s",
                    animation: `fadeUp 0.4s ease ${i * 0.05}s forwards`,
                    opacity: 0,
                  }}
                  onMouseEnter={(e) => { if (activeTab !== n.id) { e.currentTarget.style.background = "rgba(0,0,0,0.03)"; }}}
                  onMouseLeave={(e) => { if (activeTab !== n.id) { e.currentTarget.style.background = "transparent"; }}}
                >
                  <div style={{
                    width: 36, height: 36,
                    background: activeTab === n.id ? "rgba(165,0,26,0.08)" : "rgba(0,0,0,0.03)",
                    borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.2s",
                  }}>
                    <Icon name={n.icon} size={17} color={activeTab === n.id ? G.crimson : G.textSecondary} />
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div>{n.label}</div>
                    {n.id === "home" && <div style={{ fontSize: 11, color: G.textTertiary, fontWeight: 400, marginTop: 1 }}>Brand flagship</div>}
                    {n.id === "products" && <div style={{ fontSize: 11, color: G.textTertiary, fontWeight: 400, marginTop: 1 }}>TVs, Audio & Remotes</div>}
                    {n.id === "about" && <div style={{ fontSize: 11, color: G.textTertiary, fontWeight: 400, marginTop: 1 }}>Our story</div>}
                    {n.id === "support" && <div style={{ fontSize: 11, color: G.textTertiary, fontWeight: 400, marginTop: 1 }}>Help & warranty</div>}
                    {n.id === "contact" && <div style={{ fontSize: 11, color: G.textTertiary, fontWeight: 400, marginTop: 1 }}>Get in touch</div>}
                  </div>
                </button>
              ))}
            </div>

            <div style={{ paddingTop: 20, borderTop: `1px solid ${G.border}` }}>
              <a href="tel:03368263402"
                className="btn-primary"
                style={{
                  textDecoration: "none", display: "flex", alignItems: "center",
                  justifyContent: "center", gap: 8, padding: "14px", fontSize: 14,
                  borderRadius: 12,
                }}>
                <Icon name="phone" size={14} color="white" /> 033 6826 3402
              </a>
              <a href="mailto:sales@xoas.in"
                style={{
                  textDecoration: "none", display: "flex", alignItems: "center",
                  justifyContent: "center", gap: 8, marginTop: 10,
                  padding: "12px", fontSize: 13, fontWeight: 500,
                  color: G.textSecondary, background: "rgba(0,0,0,0.02)",
                  border: `1px solid ${G.border}`, borderRadius: 12,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = G.crimson; e.currentTarget.style.color = G.crimson; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = G.border; e.currentTarget.style.color = G.textSecondary; }}>
                <Icon name="mail" size={14} color="currentColor" /> sales@xoas.in
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
