import { useState, useRef, useMemo } from "react";
import G from "../constants/colors";
import Icon from "../components/Icon";

const EnquireModal = ({ product, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-box" style={{ maxWidth: 460 }} onClick={(e) => e.stopPropagation()}>
      <div style={{ padding: 40 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 56, height: 56, background: `linear-gradient(135deg,${G.crimson},${G.gold})`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Icon name="phone" size={24} color="white" />
          </div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, letterSpacing: 0.5, marginBottom: 6 }}>Enquire Now</h3>
          {product && <p style={{ color: G.textSecondary, fontSize: 14 }}>Enquiring about: <strong style={{ color: G.textPrimary }}>{product.name}</strong></p>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <a href="tel:03368263402" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: `linear-gradient(135deg,${G.crimson},${G.crimsonDark})`, borderRadius: 12, cursor: "pointer", transition: "transform 0.2s" }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
              <div style={{ width: 40, height: 40, background: "rgba(255,255,255,0.2)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="phone" size={18} color="white" />
              </div>
              <div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>Call Us</div>
                <div style={{ color: "white", fontWeight: 700, fontSize: 18, letterSpacing: 0.5 }}>033 6826 3402</div>
              </div>
            </div>
          </a>
          <a href="mailto:sales@xoas.in" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: G.offWhite, border: `1px solid ${G.border}`, borderRadius: 12, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#f0e8e5"; e.currentTarget.style.borderColor = G.crimson; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = G.offWhite; e.currentTarget.style.borderColor = G.border; }}>
              <div style={{ width: 40, height: 40, background: "rgba(165,0,26,0.08)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="mail" size={18} color={G.crimson} />
              </div>
              <div>
                <div style={{ color: G.textSecondary, fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>Email Us</div>
                <div style={{ color: G.textPrimary, fontWeight: 700, fontSize: 16 }}>sales@xoas.in</div>
              </div>
            </div>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: G.offWhite, border: `1px solid ${G.border}`, borderRadius: 12 }}>
            <div style={{ width: 40, height: 40, background: "rgba(165,0,26,0.08)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="clock" size={18} color={G.crimson} />
            </div>
            <div>
              <div style={{ color: G.textSecondary, fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>Office Hours</div>
              <div style={{ color: G.textPrimary, fontWeight: 600, fontSize: 14 }}>Mon–Sat: 9AM–7PM IST</div>
              <div style={{ color: G.textSecondary, fontSize: 13 }}>West Bengal, India</div>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="btn-ghost" style={{ width: "100%", marginTop: 16, padding: "12px" }}>Close</button>
      </div>
    </div>
  </div>
);

const CategoryIcon = ({ name, hovered }) => {
  const pulse = hovered ? "1" : "0.6";
  const glow = hovered ? "drop-shadow(0 0 20px rgba(165,0,26,0.4))" : "none";
  const scale = hovered ? "scale(1.15)" : "scale(1)";
  const rotate = hovered ? "rotate(-5deg)" : "rotate(0deg)";

  if (name === "TVs") {
    return (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)", transform: `${scale} ${rotate}`, filter: glow }}>
        <rect x="6" y="10" width="68" height="46" rx="6" stroke={hovered ? "#A5001A" : "#6E6E73"} strokeWidth="2" fill={hovered ? "rgba(165,0,26,0.06)" : "transparent"} style={{ transition: "all 0.4s" }} />
        <line x1="28" y1="56" x2="52" y2="56" stroke={hovered ? "#A5001A" : "#6E6E73"} strokeWidth="2" strokeLinecap="round" style={{ transition: "all 0.4s" }} />
        <line x1="40" y1="56" x2="40" y2="64" stroke={hovered ? "#A5001A" : "#6E6E73"} strokeWidth="2" strokeLinecap="round" style={{ transition: "all 0.4s" }} />
        <line x1="24" y1="64" x2="56" y2="64" stroke={hovered ? "#A5001A" : "#6E6E73"} strokeWidth="2" strokeLinecap="round" style={{ transition: "all 0.4s" }} />
        <rect x="12" y="16" width="56" height="34" rx="4" fill={hovered ? "rgba(165,0,26,0.1)" : "rgba(0,0,0,0.03)"} style={{ transition: "all 0.4s" }} />
        <text x="40" y="38" textAnchor="middle" fontFamily="'Playfair Display',serif" fontSize="14" fontWeight="700" fill={hovered ? "#A5001A" : "#A1A1A6"} style={{ transition: "all 0.4s" }}>XOAS</text>
        <circle cx="14" cy="14" r="3" fill={hovered ? "#C9A84C" : "#E5E0DB"} style={{ transition: "all 0.4s" }} />
        <line x1="36" y1="50" x2="36" y2="52" stroke={hovered ? "#C9A84C" : "#E5E0DB"} strokeWidth="1.5" opacity={pulse} style={{ transition: "all 0.4s" }} />
        <line x1="40" y1="50" x2="40" y2="52" stroke={hovered ? "#C9A84C" : "#E5E0DB"} strokeWidth="1.5" opacity={pulse} style={{ transition: "all 0.4s" }} />
        <line x1="44" y1="50" x2="44" y2="52" stroke={hovered ? "#C9A84C" : "#E5E0DB"} strokeWidth="1.5" opacity={pulse} style={{ transition: "all 0.4s" }} />
      </svg>
    );
  }
  if (name === "Audio") {
    return (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)", transform: `${scale} ${rotate}`, filter: glow }}>
        <rect x="14" y="18" width="52" height="44" rx="10" stroke={hovered ? "#A5001A" : "#6E6E73"} strokeWidth="2" fill={hovered ? "rgba(165,0,26,0.06)" : "transparent"} style={{ transition: "all 0.4s" }} />
        <rect x="20" y="28" width="40" height="24" rx="4" fill={hovered ? "rgba(165,0,26,0.08)" : "rgba(0,0,0,0.03)"} style={{ transition: "all 0.4s" }} />
        <circle cx="40" cy="40" r="8" fill="none" stroke={hovered ? "#C9A84C" : "#A1A1A6"} strokeWidth="1.5" style={{ transition: "all 0.4s" }} />
        <circle cx="40" cy="40" r="4" fill={hovered ? "#C9A84C" : "#A1A1A6"} style={{ transition: "all 0.4s" }} />
        <path d="M22 20 Q20 12 28 10" stroke={hovered ? "#A5001A" : "#6E6E73"} strokeWidth="2" strokeLinecap="round" fill="none" opacity={hovered ? "1" : "0.4"} style={{ transition: "all 0.4s" }} />
        <path d="M58 20 Q60 12 52 10" stroke={hovered ? "#A5001A" : "#6E6E73"} strokeWidth="2" strokeLinecap="round" fill="none" opacity={hovered ? "1" : "0.4"} style={{ transition: "all 0.4s" }} />
        <path d="M18 65 Q24 60 28 62" stroke={hovered ? "#C9A84C" : "#A1A1A6"} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity={pulse} style={{ transition: "all 0.4s" }} />
        <path d="M62 65 Q56 60 52 62" stroke={hovered ? "#C9A84C" : "#A1A1A6"} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity={pulse} style={{ transition: "all 0.4s" }} />
      </svg>
    );
  }
  if (name === "Remotes") {
    return (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)", transform: `${scale} ${hovered ? "rotate(5deg)" : "rotate(0deg)"}`, filter: glow }}>
        <rect x="26" y="6" width="28" height="68" rx="8" stroke={hovered ? "#A5001A" : "#6E6E73"} strokeWidth="2" fill={hovered ? "rgba(165,0,26,0.06)" : "transparent"} style={{ transition: "all 0.4s" }} />
        <rect x="30" y="14" width="20" height="14" rx="3" fill={hovered ? "rgba(165,0,26,0.1)" : "rgba(0,0,0,0.03)"} style={{ transition: "all 0.4s" }} />
        <circle cx="40" cy="21" r="4" fill={hovered ? "#C9A84C" : "#A1A1A6"} style={{ transition: "all 0.4s" }} />
        {[0, 1, 2].map((row) => [0, 1, 2].map((col) => (
          <circle key={`${row}-${col}`} cx={32 + col * 8} cy={40 + row * 10} r="2.5" fill={hovered ? "#A5001A" : "#D0D0D5"} style={{ transition: "all 0.4s", opacity: hovered ? 0.8 : 0.4 }} />
        )))}
        <rect x="34" y="68" width="12" height="3" rx="1.5" fill={hovered ? "#C9A84C" : "#D0D0D5"} style={{ transition: "all 0.4s" }} />
        <circle cx="40" cy="68" r="1.5" fill={hovered ? "#A5001A" : "#A1A1A6"} style={{ transition: "all 0.4s" }} />
        <line x1="26" y1="30" x2="26" y2="72" stroke={hovered ? "rgba(165,0,26,0.15)" : "transparent"} strokeWidth="1" strokeDasharray="2 2" />
        <line x1="54" y1="30" x2="54" y2="72" stroke={hovered ? "rgba(165,0,26,0.15)" : "transparent"} strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    );
  }
  return null;
};

const categories = [
  {
    id: "TVs",
    label: "Televisions",
    tagline: "Flagship Displays",
    desc: "From QD-OLED flagships to premium Mini-LED and art-inspired Frame TVs, every display is engineered for visual excellence.",
    color: G.crimson,
    bgGrad: "linear-gradient(135deg, rgba(165,0,26,0.04), rgba(201,168,76,0.04))",
    hoverGrad: "linear-gradient(135deg, rgba(165,0,26,0.08), rgba(201,168,76,0.08))",
    features: ["QD-OLED & Mini-LED", "144Hz VRR Gaming", "Dolby Vision IQ", "Neural AI Processor"],
  },
  {
    id: "Audio",
    label: "Audio Systems",
    tagline: "High-Fidelity Sound",
    desc: "Dolby Atmos soundbars, hi-fi studio speakers, portable wireless, and home theater components for every listener.",
    color: G.gold,
    bgGrad: "linear-gradient(135deg, rgba(201,168,76,0.04), rgba(165,0,26,0.04))",
    hoverGrad: "linear-gradient(135deg, rgba(201,168,76,0.08), rgba(165,0,26,0.08))",
    features: ["Dolby Atmos", "Hi-Res Audio", "Wireless Surround", "Studio-Grade Drivers"],
  },
  {
    id: "Remotes",
    label: "Smart Remotes",
    tagline: "Intelligent Control",
    desc: "AI-powered touchscreen controllers, solar-powered eco remotes, and voice hubs that unify your entire entertainment stack.",
    color: G.crimsonLight,
    bgGrad: "linear-gradient(135deg, rgba(165,0,26,0.03), rgba(0,0,0,0.02))",
    hoverGrad: "linear-gradient(135deg, rgba(165,0,26,0.07), rgba(201,168,76,0.05))",
    features: ["OLED Touchscreen", "Solar Charging", "Voice Macros", "25-Device Control"],
  },
];

const CategoryCard = ({ cat, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 12, y: y * -12 });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        background: hovered ? cat.hoverGrad : cat.bgGrad,
        border: `1.5px solid ${hovered ? cat.color : G.border}`,
        borderRadius: 24,
        padding: "48px 36px",
        cursor: "pointer",
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(${hovered ? -8 : 0}px)`,
        boxShadow: hovered ? `0 24px 60px rgba(165,0,26,0.1)` : "0 4px 12px rgba(0,0,0,0.02)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute",
        inset: 0,
        background: hovered ? `radial-gradient(circle at 50% 0%, ${cat.color}15, transparent 70%)` : "transparent",
        transition: "all 0.5s",
        pointerEvents: "none",
      }} />
      <div style={{ display: "flex", alignItems: "flex-start", gap: 28, position: "relative" }}>
        <div style={{ flexShrink: 0, transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          <CategoryIcon name={cat.id} hovered={hovered} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: hovered ? cat.color : G.textTertiary,
            marginBottom: 6,
            transition: "color 0.3s",
          }}>
            {cat.tagline}
          </div>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 28,
            fontWeight: 700,
            color: hovered ? G.textPrimary : G.textPrimary,
            marginBottom: 10,
            transition: "color 0.3s",
          }}>
            {cat.label}
          </h3>
          <p style={{
            color: hovered ? G.textSecondary : G.textTertiary,
            fontSize: 14,
            lineHeight: 1.7,
            marginBottom: 20,
            transition: "color 0.3s",
          }}>
            {cat.desc}
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {cat.features.map((f) => (
              <span key={f} className={`badge ${hovered ? "badge-crimson" : "badge-gray"}`} style={{
                fontSize: 11, fontWeight: 600, transition: "all 0.3s",
                background: hovered ? `rgba(165,0,26,0.06)` : "rgba(0,0,0,0.03)",
                color: hovered ? G.crimson : G.textTertiary,
              }}>
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div style={{
        marginTop: 24, paddingTop: 20, borderTop: `1px solid ${hovered ? `rgba(165,0,26,0.1)` : G.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between", transition: "all 0.3s", position: "relative",
      }}>
        <span style={{ fontSize: 13, color: hovered ? G.textSecondary : G.textTertiary, fontWeight: 500, transition: "color 0.3s" }}>
          {cat.id === "TVs" ? "12" : cat.id === "Audio" ? "10" : "4"} products
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: hovered ? cat.color : G.textTertiary, fontWeight: 600, fontSize: 14, transition: "all 0.3s" }}>
          Explore {cat.label}
          <Icon name="arrow" size={14} color={hovered ? cat.color : G.textTertiary} style={{ transition: "transform 0.3s", transform: hovered ? "translateX(4px)" : "translateX(0)" }} />
        </div>
      </div>
    </div>
  );
};

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "name", label: "Name A–Z" },
];

const ProductsPage = ({ filteredProducts, searchQ, setSearchQ, setViewProduct, showToast }) => {
  const [enquireProduct, setEnquireProduct] = useState(null);
  const [activeFamily, setActiveFamily] = useState(null);
  const [sortBy, setSortBy] = useState("default");

  const displayedProducts = useMemo(() => {
    const base = activeFamily
      ? filteredProducts.filter((p) => p.family === activeFamily)
      : [];
    const sorted = [...base];
    switch (sortBy) {
      case "price-asc": sorted.sort((a, b) => parseFloat(a.price.replace(/[₹,]/g,"")) - parseFloat(b.price.replace(/[₹,]/g,""))); break;
      case "price-desc": sorted.sort((a, b) => parseFloat(b.price.replace(/[₹,]/g,"")) - parseFloat(a.price.replace(/[₹,]/g,""))); break;
      case "rating": sorted.sort((a, b) => b.rating - a.rating); break;
      case "name": sorted.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return sorted;
  }, [activeFamily, filteredProducts, sortBy]);

  const categoryInfo = categories.find((c) => c.id === activeFamily);

  if (activeFamily && categoryInfo) {
    return (
      <div>
        {enquireProduct !== null && <EnquireModal product={enquireProduct} onClose={() => setEnquireProduct(null)} />}

        {/* Sticky filter bar */}
        <div style={{
          position: "sticky", top: 72, zIndex: 10,
          background: "rgba(250,248,245,0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: `1px solid ${G.border}`,
          padding: "0 32px",
        }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", gap: 16, height: 60 }}>
            <button onClick={() => { setActiveFamily(null); setSortBy("default"); }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "none", border: "none", cursor: "pointer",
                color: G.textSecondary, fontSize: 13, fontWeight: 500,
                fontFamily: "'Inter', sans-serif", padding: "6px 12px",
                borderRadius: 8, transition: "all 0.2s", whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = G.offWhite; e.currentTarget.style.color = G.crimson; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = G.textSecondary; }}>
              <Icon name="chevronLeft" size={14} color="currentColor" /> Back
            </button>

            <div style={{ flex: 1 }} />

            <div style={{ position: "relative", maxWidth: 280, width: "100%" }}>
              <input className="input-field"
                placeholder={`Search ${categoryInfo.label.toLowerCase()}...`}
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                style={{ paddingLeft: 38, paddingTop: 10, paddingBottom: 10, fontSize: 13, borderRadius: 10 }} />
              <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: G.textTertiary }}>
                <Icon name="search" size={15} color="currentColor" />
              </div>
            </div>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: "10px 14px", borderRadius: 10, border: `1.5px solid ${G.border}`,
                fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500,
                color: G.textPrimary, background: "white", cursor: "pointer",
                outline: "none", minWidth: 140,
              }}>
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <section style={{ padding: "40px 32px 80px", background: G.surface, minHeight: "70vh" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            {/* Section header */}
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div className="section-tag" style={{ margin: "0 auto 12px" }}>
                <Icon name="sparkle" size={13} color={G.crimson} /> {categoryInfo.tagline.toUpperCase()}
              </div>
              <h2 className="section-heading" style={{ fontSize: "clamp(28px,3vw,40px)", marginBottom: 8 }}>
                {categoryInfo.label}
              </h2>
              <p className="section-sub" style={{ margin: "0 auto", maxWidth: 600, fontSize: 14 }}>
                {categoryInfo.desc}
              </p>
            </div>

            {displayedProducts.length === 0 ? (
              <p style={{ textAlign: "center", color: G.textSecondary, fontSize: 15, padding: 60 }}>No products found matching your search.</p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
                {displayedProducts.map((p, i) => (
                  <div key={p.id} className="product-card" onClick={() => setViewProduct(p)}
                    style={{
                      animation: `fadeUp 0.5s ease ${i * 0.04}s forwards`,
                      opacity: 0, cursor: "pointer", borderRadius: 16,
                    }}>
                    <div style={{
                      height: 220, display: "flex", alignItems: "center", justifyContent: "center",
                      background: "linear-gradient(135deg, #F8F6F4, #F0ECE8)",
                      position: "relative", overflow: "hidden",
                    }}>
                      {p.imageUrl ? (
                        <img src={p.imageUrl} alt={p.name}
                          style={{ maxWidth: "80%", maxHeight: "80%", objectFit: "contain", transition: "transform 0.5s" }}
                          onMouseEnter={(e) => e.target.style.transform = "scale(1.06)"}
                          onMouseLeave={(e) => e.target.style.transform = "scale(1)"} />
                      ) : (
                        <Icon name="tv" size={40} color={G.textTertiary} />
                      )}
                      {p.badge && (
                        <span className={`badge ${p.badge === "Flagship" || p.badge === "Ultra Premium" ? "badge-gold" : p.badge === "Best Seller" || p.badge === "Popular" ? "badge-green" : "badge-crimson"}`}
                          style={{ position: "absolute", top: 12, left: 12, fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" }}>
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <div style={{ padding: "14px 16px 18px" }}>
                      <span style={{ fontSize: 10, color: G.crimson, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 2, display: "block" }}>
                        {p.category}
                      </span>
                      <h3 style={{ fontWeight: 600, fontSize: 15, lineHeight: 1.3, color: G.textPrimary, marginBottom: 6 }}>
                        {p.name}
                      </h3>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 18, fontWeight: 700, color: G.textPrimary }}>{p.price}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <Icon name="star" size={12} color="#F59E0B" />
                          <span style={{ fontSize: 12, fontWeight: 600, color: G.textSecondary }}>{p.rating}</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12, paddingTop: 10, borderTop: `1px solid ${G.border}` }}>
                        <span className={`badge ${p.stock === "In Stock" ? "badge-green" : p.stock === "Limited" ? "badge-amber" : p.stock === "Pre-order" ? "badge-blue" : "badge-crimson"}`}
                          style={{ fontSize: 11, fontWeight: 600 }}>
                          {p.stock}
                        </span>
                        <button className="btn-primary" style={{ padding: "6px 16px", fontSize: 12, borderRadius: 8 }}
                          onClick={(e) => { e.stopPropagation(); setEnquireProduct(p); }}>
                          Enquire
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      {enquireProduct !== null && <EnquireModal product={enquireProduct} onClose={() => setEnquireProduct(null)} />}

      {/* Hero banner */}
      <section style={{
        padding: "140px 32px 80px",
        background: "linear-gradient(180deg, rgba(165,0,26,0.03) 0%, transparent 50%)",
        borderBottom: `1px solid ${G.border}`,
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="section-tag" style={{ margin: "0 auto 16px" }}>
              <Icon name="sparkle" size={13} color={G.crimson} /> Products
            </div>
            <h2 className="section-heading" style={{ marginBottom: 16 }}>
              Everything you need.
            </h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>
              Three families. One obsession with quality. Explore our full range.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }} className="grid-3">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} cat={cat} onClick={() => setActiveFamily(cat.id)} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section style={{ padding: "40px 32px", background: G.offWhite, borderBottom: `1px solid ${G.border}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "center", gap: 64, flexWrap: "wrap" }}>
          {[
            { icon: "shield", text: "Comprehensive Warranty" },
            { icon: "truck", text: "Pan-India Shipping" },
            { icon: "award", text: "Authorized Retailer" },
            { icon: "headphone", text: "Dedicated Support" },
          ].map((item) => (
            <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, background: "rgba(165,0,26,0.06)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={item.icon} size={16} color={G.crimson} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: G.textPrimary }}>{item.text}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
