import { useState, useRef, useMemo, useEffect } from "react";
import G from "../constants/colors";
import Icon from "../components/Icon";
import EnquireModal from "../components/EnquireModal";

const CategoryIcon = ({ name, hovered }) => {
  const pulse = hovered ? "1" : "0.6";
  const glow = hovered ? "drop-shadow(0 0 20px rgba(178,30,53,0.4))" : "none";
  const scale = hovered ? "scale(1.15)" : "scale(1)";
  const rotate = hovered ? "rotate(-5deg)" : "rotate(0deg)";

  if (name === "TVs") {
    return (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)", transform: `${scale} ${rotate}`, filter: glow }}>
        <rect x="6" y="10" width="68" height="46" rx="6" stroke={hovered ? "#B21E35" : "#71756C"} strokeWidth="2" fill={hovered ? "rgba(178,30,53,0.06)" : "transparent"} style={{ transition: "all 0.4s" }} />
        <line x1="28" y1="56" x2="52" y2="56" stroke={hovered ? "#B21E35" : "#71756C"} strokeWidth="2" strokeLinecap="round" style={{ transition: "all 0.4s" }} />
        <line x1="40" y1="56" x2="40" y2="64" stroke={hovered ? "#B21E35" : "#71756C"} strokeWidth="2" strokeLinecap="round" style={{ transition: "all 0.4s" }} />
        <line x1="24" y1="64" x2="56" y2="64" stroke={hovered ? "#B21E35" : "#71756C"} strokeWidth="2" strokeLinecap="round" style={{ transition: "all 0.4s" }} />
        <rect x="12" y="16" width="56" height="34" rx="4" fill={hovered ? "rgba(178,30,53,0.1)" : "rgba(0,0,0,0.03)"} style={{ transition: "all 0.4s" }} />
        <text x="40" y="38" textAnchor="middle" fontFamily="'Manrope',sans-serif" fontSize="14" fontWeight="700" fill={hovered ? "#B21E35" : "#71756C"} style={{ transition: "all 0.4s" }}>XOAS</text>
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
        <rect x="14" y="18" width="52" height="44" rx="10" stroke={hovered ? "#B21E35" : "#71756C"} strokeWidth="2" fill={hovered ? "rgba(178,30,53,0.06)" : "transparent"} style={{ transition: "all 0.4s" }} />
        <rect x="20" y="28" width="40" height="24" rx="4" fill={hovered ? "rgba(178,30,53,0.08)" : "rgba(0,0,0,0.03)"} style={{ transition: "all 0.4s" }} />
        <circle cx="40" cy="40" r="8" fill="none" stroke={hovered ? "#C9A84C" : "#71756C"} strokeWidth="1.5" style={{ transition: "all 0.4s" }} />
        <circle cx="40" cy="40" r="4" fill={hovered ? "#C9A84C" : "#71756C"} style={{ transition: "all 0.4s" }} />
        <path d="M22 20 Q20 12 28 10" stroke={hovered ? "#B21E35" : "#71756C"} strokeWidth="2" strokeLinecap="round" fill="none" opacity={hovered ? "1" : "0.4"} style={{ transition: "all 0.4s" }} />
        <path d="M58 20 Q60 12 52 10" stroke={hovered ? "#B21E35" : "#71756C"} strokeWidth="2" strokeLinecap="round" fill="none" opacity={hovered ? "1" : "0.4"} style={{ transition: "all 0.4s" }} />
        <path d="M18 65 Q24 60 28 62" stroke={hovered ? "#C9A84C" : "#71756C"} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity={pulse} style={{ transition: "all 0.4s" }} />
        <path d="M62 65 Q56 60 52 62" stroke={hovered ? "#C9A84C" : "#71756C"} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity={pulse} style={{ transition: "all 0.4s" }} />
      </svg>
    );
  }
  if (name === "Remotes") {
    return (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)", transform: `${scale} ${hovered ? "rotate(5deg)" : "rotate(0deg)"}`, filter: glow }}>
        <rect x="26" y="6" width="28" height="68" rx="8" stroke={hovered ? "#B21E35" : "#71756C"} strokeWidth="2" fill={hovered ? "rgba(178,30,53,0.06)" : "transparent"} style={{ transition: "all 0.4s" }} />
        <rect x="30" y="14" width="20" height="14" rx="3" fill={hovered ? "rgba(178,30,53,0.1)" : "rgba(0,0,0,0.03)"} style={{ transition: "all 0.4s" }} />
        <circle cx="40" cy="21" r="4" fill={hovered ? "#C9A84C" : "#71756C"} style={{ transition: "all 0.4s" }} />
        {[0, 1, 2].map((row) => [0, 1, 2].map((col) => (
          <circle key={`${row}-${col}`} cx={32 + col * 8} cy={40 + row * 10} r="2.5" fill={hovered ? "#B21E35" : "#D0D0D5"} style={{ transition: "all 0.4s", opacity: hovered ? 0.8 : 0.4 }} />
        )))}
        <rect x="34" y="68" width="12" height="3" rx="1.5" fill={hovered ? "#C9A84C" : "#D0D0D5"} style={{ transition: "all 0.4s" }} />
        <circle cx="40" cy="68" r="1.5" fill={hovered ? "#B21E35" : "#71756C"} style={{ transition: "all 0.4s" }} />
        <line x1="26" y1="30" x2="26" y2="72" stroke={hovered ? "rgba(178,30,53,0.15)" : "transparent"} strokeWidth="1" strokeDasharray="2 2" />
        <line x1="54" y1="30" x2="54" y2="72" stroke={hovered ? "rgba(178,30,53,0.15)" : "transparent"} strokeWidth="1" strokeDasharray="2 2" />
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
    bgGrad: "linear-gradient(135deg, rgba(178,30,53,0.04), rgba(201,168,76,0.04))",
    hoverGrad: "linear-gradient(135deg, rgba(178,30,53,0.08), rgba(201,168,76,0.08))",
    features: ["QD-OLED & Mini-LED", "144Hz VRR Gaming", "Dolby Vision IQ", "Neural AI Processor"],
  },
  {
    id: "Audio",
    label: "Audio Systems",
    tagline: "High-Fidelity Sound",
    desc: "Dolby Atmos soundbars, hi-fi studio speakers, portable wireless, and home theater components for every listener.",
    color: G.crimson,
    bgGrad: "linear-gradient(135deg, rgba(201,168,76,0.04), rgba(178,30,53,0.04))",
    hoverGrad: "linear-gradient(135deg, rgba(201,168,76,0.08), rgba(178,30,53,0.08))",
    features: ["Dolby Atmos", "Hi-Res Audio", "Wireless Surround", "Studio-Grade Drivers"],
  },
  {
    id: "Remotes",
    label: "Smart Remotes",
    tagline: "Intelligent Control",
    desc: "AI-powered touchscreen controllers, solar-powered eco remotes, and voice hubs that unify your entire entertainment stack.",
    color: G.crimsonLight,
    bgGrad: "linear-gradient(135deg, rgba(178,30,53,0.03), rgba(0,0,0,0.02))",
    hoverGrad: "linear-gradient(135deg, rgba(178,30,53,0.07), rgba(201,168,76,0.05))",
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
        border: `1px solid ${hovered ? cat.color : G.border}`,
        borderRadius: 18,
        padding: "48px 36px",
        cursor: "pointer",
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(${hovered ? -8 : 0}px)`,
        boxShadow: hovered ? `0 24px 60px rgba(178,30,53,0.1)` : "0 4px 12px rgba(0,0,0,0.02)",
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
            fontFamily: "'Manrope', sans-serif",
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
                background: hovered ? `rgba(178,30,53,0.06)` : "rgba(0,0,0,0.03)",
                color: hovered ? G.crimson : G.textTertiary,
              }}>
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div style={{
        marginTop: 24, paddingTop: 20, borderTop: `1px solid ${hovered ? `rgba(178,30,53,0.1)` : G.border}`,
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

const ProductCard = ({ p, onOpen, onEnquire, onAddToCart, onOrderNow, delay = 0 }) => {
  const [qty, setQty] = useState(1);

  return (
    <div key={p.id} className="product-card" onClick={onOpen}
      style={{
        animation: `fadeUp 0.5s ease ${delay}s forwards`,
        opacity: 0, cursor: "pointer",
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
          <Icon name="star" size={12} color="#C9A84C" />
          <span style={{ fontSize: 12, fontWeight: 600, color: G.textSecondary }}>{p.rating}</span>
        </div>
      </div>
<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12, paddingTop: 10, borderTop: `1px solid ${G.border}` }}>
        <span className={`badge ${p.stock === "In Stock" ? "badge-green" : p.stock === "Limited" ? "badge-amber" : p.stock === "Pre-order" ? "badge-blue" : "badge-crimson"}`}
          style={{ fontSize: 11, fontWeight: 600 }}>
          {p.stock}
        </span>
        <span style={{ fontSize: 11.5, fontWeight: 600, color: G.textSecondary, cursor: "pointer" }}
          onClick={(e) => { e.stopPropagation(); onEnquire(p); }}>
          Enquire
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
        <div style={{ display: "flex", alignItems: "center", border: `1px solid ${G.border}`, borderRadius: 9, overflow: "hidden", flexShrink: 0 }}>
          <button onClick={(e) => { e.stopPropagation(); setQty((q) => Math.max(1, q - 1)); }} aria-label="Decrease quantity"
            style={{ width: 30, height: 34, border: "none", background: "none", cursor: "pointer", fontSize: 16, color: G.textPrimary }}>−</button>
          <span style={{ fontSize: 13.5, fontWeight: 700, minWidth: 24, textAlign: "center", color: G.textPrimary }}>{qty}</span>
          <button onClick={(e) => { e.stopPropagation(); setQty((q) => q + 1); }} aria-label="Increase quantity"
            style={{ width: 30, height: 34, border: "none", background: "none", cursor: "pointer", fontSize: 16, color: G.textPrimary }}>+</button>
        </div>
        <button className="btn-secondary" onClick={(e) => { e.stopPropagation(); onAddToCart(p, qty); setQty(1); }}
          style={{ flex: 1, padding: "8px 10px", fontSize: 12, borderRadius: 9, fontWeight: 700, whiteSpace: "nowrap" }}>
          Add to Cart
        </button>
        <button className="btn-primary" onClick={(e) => { e.stopPropagation(); onOrderNow(p, qty); setQty(1); }}
          style={{ flex: 1, padding: "8px 10px", fontSize: 12, borderRadius: 9, fontWeight: 700, whiteSpace: "nowrap" }}>
          Order Now
        </button>
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

const ProductsPage = ({ filteredProducts, searchQ, setSearchQ, setViewProduct, showToast, initialFamily = null, onAddToCart, onOrderNow }) => {
  const [enquireProduct, setEnquireProduct] = useState(null);
  const [activeFamily, setActiveFamily] = useState(initialFamily || null);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    setActiveFamily(initialFamily || null);
  }, [initialFamily]);

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
        <div className="category-filter-bar" style={{
          position: "sticky", top: 72, zIndex: 10,
          background: "rgba(250,248,245,0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: `1px solid ${G.border}`,
          padding: "0 32px",
        }}>
          <div className="category-filter-inner" style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", gap: 16, height: 60 }}>
            <button onClick={() => { setActiveFamily(null); setSortBy("default"); }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "none", border: "none", cursor: "pointer",
                color: G.textSecondary, fontSize: 13, fontWeight: 500,
                fontFamily: "'Manrope', sans-serif", padding: "6px 12px",
                borderRadius: 8, transition: "all 0.2s", whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = G.offWhite; e.currentTarget.style.color = G.crimson; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = G.textSecondary; }}>
              <Icon name="chevronLeft" size={14} color="currentColor" /> Back
            </button>

            <div style={{ flex: 1 }} />

            <div className="category-filter-search" style={{ position: "relative", maxWidth: 280, width: "100%" }}>
              <input className="input-field"
                placeholder={`Search ${categoryInfo.label.toLowerCase()}...`}
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                style={{ paddingLeft: 38, paddingTop: 10, paddingBottom: 10, fontSize: 13, borderRadius: 10 }} />
              <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: G.textTertiary }}>
                <Icon name="search" size={15} color="currentColor" />
              </div>
            </div>

            <select className="category-filter-sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: "10px 14px", borderRadius: 10, border: `1.5px solid ${G.border}`,
                fontFamily: "'Manrope', sans-serif", fontSize: 13, fontWeight: 500,
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
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
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
                  <ProductCard key={p.id} p={p} onOpen={() => setViewProduct(p)} onEnquire={setEnquireProduct} onAddToCart={onAddToCart} onOrderNow={onOrderNow} delay={i * 0.04} />
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
        background: "linear-gradient(180deg, rgba(178,30,53,0.03) 0%, transparent 50%)",
        borderBottom: `1px solid ${G.border}`,
      }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
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

      {/* Live search results (from navbar/global search) */}
      {searchQ.trim() && (
        <section style={{ padding: "48px 32px", background: G.offWhite, borderBottom: `1px solid ${G.border}` }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
              <div>
                <div className="section-tag" style={{ marginBottom: 10 }}>
                  <Icon name="search" size={12} color={G.crimson} /> Search results
                </div>
                <h2 className="section-heading" style={{ fontSize: "clamp(24px,2.5vw,32px)", marginBottom: 0 }}>
                  “{searchQ}”
                </h2>
                <p className="section-sub" style={{ fontSize: 13, marginTop: 6 }}>
                  {filteredProducts.length} product{filteredProducts.length === 1 ? "" : "s"} found
                </p>
              </div>
              <button className="btn-secondary" onClick={() => setSearchQ("")} style={{ padding: "9px 16px", fontSize: 13 }}>
                Clear search
              </button>
            </div>

            {filteredProducts.length ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
                {filteredProducts.map((p, i) => (
                  <ProductCard key={p.id} p={p} onOpen={() => setViewProduct(p)} onEnquire={setEnquireProduct} onAddToCart={onAddToCart} onOrderNow={onOrderNow} delay={i * 0.04} />
                ))}
              </div>
            ) : (
              <div className="glass-search-empty" style={{ textAlign: "center", background: "white", border: `1px solid ${G.border}`, borderRadius: 18, padding: 60 }}>
                No products match “{searchQ}”. Try “OLED”, “soundbar” or “remote”.
              </div>
            )}
          </div>
        </section>
      )}

      {/* Trust bar */}
      <section style={{ padding: "40px 32px", background: G.offWhite, borderBottom: `1px solid ${G.border}` }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "center", gap: 64, flexWrap: "wrap" }}>
          {[
            { icon: "shield", text: "Comprehensive Warranty" },
            { icon: "truck", text: "Pan-India Shipping" },
            { icon: "award", text: "Authorized Retailer" },
            { icon: "headphone", text: "Dedicated Support" },
          ].map((item) => (
            <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, background: "rgba(178,30,53,0.06)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
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
