import { useState, useEffect, useRef } from "react";
import G from "../constants/colors";
import Icon from "../components/Icon";
import HeroIllustration from "../components/HeroIllustration";

const EnquireModal = ({ product, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div
      className="modal-box"
      style={{ maxWidth: 460 }}
      onClick={(e) => e.stopPropagation()}
    >
      <div style={{ padding: 40 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: `linear-gradient(135deg,${G.crimson},${G.gold})`,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <Icon name="phone" size={24} color="white" />
          </div>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 26,
              letterSpacing: 0.5,
              marginBottom: 6,
            }}
          >
            Enquire Now
          </h3>
          {product && (
            <p style={{ color: G.textSecondary, fontSize: 14 }}>
              Enquiring about:{" "}
              <strong style={{ color: G.textPrimary }}>
                {product.name}
              </strong>
            </p>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <a href="tel:03368263402" style={{ textDecoration: "none" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "16px 20px",
                background: `linear-gradient(135deg,${G.crimson},${G.crimsonDark})`,
                borderRadius: 12,
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.02)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name="phone" size={18} color="white" />
              </div>
              <div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  Call Us
                </div>
                <div
                  style={{
                    color: "white",
                    fontWeight: 700,
                    fontSize: 18,
                    letterSpacing: 0.5,
                  }}
                >
                  033 6826 3402
                </div>
              </div>
            </div>
          </a>

          <a href="mailto:sales@xoas.in" style={{ textDecoration: "none" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "16px 20px",
                background: G.offWhite,
                border: `1px solid ${G.border}`,
                borderRadius: 12,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f0e8e5";
                e.currentTarget.style.borderColor = G.crimson;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = G.offWhite;
                e.currentTarget.style.borderColor = G.border;
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  background: "rgba(165,0,26,0.08)",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name="mail" size={18} color={G.crimson} />
              </div>
              <div>
                <div
                  style={{
                    color: G.textSecondary,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  Email Us
                </div>
                <div
                  style={{
                    color: G.textPrimary,
                    fontWeight: 700,
                    fontSize: 16,
                  }}
                >
                  sales@xoas.in
                </div>
              </div>
            </div>
          </a>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "16px 20px",
              background: G.offWhite,
              border: `1px solid ${G.border}`,
              borderRadius: 12,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                background: "rgba(165,0,26,0.08)",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="clock" size={18} color={G.crimson} />
            </div>
            <div>
              <div
                style={{
                  color: G.textSecondary,
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                Office Hours
              </div>
              <div
                style={{
                  color: G.textPrimary,
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                Mon–Sat: 9AM–7PM IST
              </div>
              <div style={{ color: G.textSecondary, fontSize: 13 }}>
                West Bengal, India
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="btn-ghost"
          style={{ width: "100%", marginTop: 16, padding: "12px" }}
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

const RevealSection = ({ children, style }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "visible" : ""}`}
      style={style}
    >
      {children}
    </div>
  );
};

const HomePage = ({
  go,
  filteredProducts,
  searchQ,
  setSearchQ,
  setViewProduct,
  showToast,
}) => {
  const [enquireProduct, setEnquireProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "TVs", "Audio", "Remotes"];

  const displayProducts = filteredProducts.filter(
    (p) => activeCategory === "All" || p.family === activeCategory
  );

  return (
    <div>
      {enquireProduct !== null && (
        <EnquireModal
          product={enquireProduct}
          onClose={() => setEnquireProduct(null)}
        />
      )}

      {/* Hero */}
      <section
        className="hero-gradient grain-overlay"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "120px 32px 80px",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "center",
          }}
          className="grid-2"
        >
          <div className="fade-up">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(201, 168, 76, 0.1)",
                border: "1px solid rgba(201, 168, 76, 0.2)",
                borderRadius: 100,
                padding: "6px 18px",
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  background: G.gold,
                  borderRadius: "50%",
                }}
              />
              <span
                style={{
                  color: G.goldLight,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                }}
              >
                New 2026 Collection
              </span>
            </div>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(48px, 6vw, 80px)",
                color: "white",
                lineHeight: 1.05,
                marginBottom: 24,
                letterSpacing: "-0.02em",
                fontWeight: 700,
              }}
            >
              Intelligence
              <br />
              <span
                style={{
                  background: `linear-gradient(135deg, ${G.crimsonLight}, ${G.gold})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Beyond Sight
              </span>
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: 17,
                lineHeight: 1.7,
                marginBottom: 40,
                maxWidth: 480,
                fontWeight: 400,
              }}
            >
              Premium QD-OLED televisions, high-fidelity audio, and
              intelligent control systems engineered to transform your living
              space into a flagship experience.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button
                className="btn-primary"
                onClick={() => go("products")}
                style={{ fontSize: 15, padding: "16px 36px" }}
              >
                Explore Collection{" "}
                <Icon name="arrow" size={16} color="white" />
              </button>
              <button
                className="btn-secondary"
                onClick={() => go("contact")}
                style={{
                  borderColor: "rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                Get in Touch
              </button>
            </div>
            <div
              style={{
                display: "flex",
                gap: 40,
                marginTop: 48,
                flexWrap: "wrap",
              }}
            >
              {[
                ["26+", "Premium Products"],
                ["10K+", "Happy Households"],
                ["4.9", "Avg Rating"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 36,
                      background: `linear-gradient(135deg, ${G.crimsonLight}, ${G.gold})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      lineHeight: 1,
                      fontWeight: 700,
                    }}
                  >
                    {n}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: 13,
                      marginTop: 6,
                      fontWeight: 400,
                    }}
                  >
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="hide-mobile fade-up"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(135deg, rgba(196,30,30,0.06), rgba(201,168,76,0.03))",
                  borderRadius: 24,
                  padding: "36px 28px 48px",
                  border: "1px solid rgba(196,30,30,0.12)",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(196,30,30,0.05), transparent 70%)",
                    pointerEvents: "none",
                  }}
                />
                <HeroIllustration />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <RevealSection>
        <section
          style={{
            background: `linear-gradient(135deg, ${G.charcoal}, ${G.charcoalLight})`,
            padding: "28px 32px",
            borderTop: "1px solid rgba(255,255,255,0.04)",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 24,
            }}
            className="grid-4"
          >
            {[
              { icon: "shield", t: "1 Year Warranty", s: "Extended plans available" },
              { icon: "truck", t: "Free Delivery", s: "Within 5km of service centers" },
              { icon: "headphone", t: "Support 24/7", s: "Always here to help" },
              { icon: "zap", t: "Easy EMI", s: "No-cost EMI up to 12 months" },
            ].map(({ icon, t, s }) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: "rgba(201, 168, 76, 0.08)",
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: G.goldLight,
                  }}
                >
                  <Icon name={icon} size={18} color="currentColor" />
                </div>
                <div>
                  <div
                    style={{
                      color: "white",
                      fontWeight: 600,
                      fontSize: 13,
                      letterSpacing: 0.3,
                    }}
                  >
                    {t}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: 12,
                      marginTop: 2,
                    }}
                  >
                    {s}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </RevealSection>

      {/* Product Categories & Display */}
      <RevealSection>
        <section
          style={{
            padding: "100px 32px",
            background: G.surface,
          }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div className="section-tag" style={{ margin: "0 auto 16px" }}>
                <Icon name="sparkle" size={13} color={G.crimson} /> Premium
                Collection
              </div>
              <h2 className="section-heading" style={{ marginBottom: 16 }}>
                Flagship Products
              </h2>
              <p className="section-sub" style={{ margin: "0 auto" }}>
                Discover our meticulously engineered lineup of televisions,
                audio systems, and smart controllers.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 10,
                marginBottom: 48,
                flexWrap: "wrap",
              }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`category-pill ${
                    activeCategory === cat ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat === "All"
                    ? "All Products"
                    : cat === "TVs"
                    ? "Televisions"
                    : cat === "Audio"
                    ? "Audio Systems"
                    : "Smart Remotes"}
                </button>
              ))}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 28,
              }}
              className="grid-3"
            >
              {displayProducts.slice(0, 6).map((p, i) => (
                <div
                  key={p.id}
                  className="product-card"
                  onClick={() => setViewProduct(p)}
                  style={{
                    animation: `fadeUp 0.6s ease ${i * 0.08}s forwards`,
                    opacity: 0,
                    cursor: "pointer",
                  }}
                >
                  <div
                    className="product-image-wrap"
                    style={{
                      height: 240,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {p.imageUrl ? (
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        style={{
                          maxWidth: "85%",
                          maxHeight: "85%",
                          objectFit: "contain",
                          transition: "transform 0.6s",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.transform = "scale(1.05)")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.transform = "scale(1)")
                        }
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background:
                            "linear-gradient(135deg, #F5F3F0, #EDE9E5)",
                        }}
                      >
                        <Icon name="tv" size={48} color={G.textTertiary} />
                      </div>
                    )}
                    {p.badge && (
                      <span
                        className={`badge ${
                          p.badge === "Flagship" || p.badge === "Ultra Premium"
                            ? "badge-gold"
                            : p.badge === "Best Seller" || p.badge === "Popular"
                            ? "badge-green"
                            : "badge-crimson"
                        }`}
                        style={{
                          position: "absolute",
                          top: 16,
                          left: 16,
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: 0.5,
                          textTransform: "uppercase",
                        }}
                      >
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      padding: "24px 24px 28px",
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        color: G.crimson,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: 1.5,
                        marginBottom: 4,
                      }}
                    >
                      {p.category}
                    </span>
                    <h3
                      style={{
                        fontWeight: 700,
                        fontSize: 17,
                        marginBottom: 6,
                        lineHeight: 1.3,
                        color: G.textPrimary,
                        letterSpacing: "-0.3px",
                      }}
                    >
                      {p.name}
                    </h3>
                    <p
                      style={{
                        color: G.textSecondary,
                        fontSize: 13,
                        lineHeight: 1.5,
                        marginBottom: 16,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {p.desc}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: "auto",
                      }}
                    >
                      <div>
                        <div className="price-tag" style={{ fontSize: 24 }}>
                          {p.price}
                        </div>
                        {p.originalPrice && (
                          <div className="price-tag-original">
                            {p.originalPrice}
                          </div>
                        )}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Icon name="star" size={14} color="#F59E0B" />
                        <span
                          style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: G.textPrimary,
                          }}
                        >
                          {p.rating}
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 16,
                        paddingTop: 16,
                        borderTop: "1px solid rgba(229, 224, 219, 0.5)",
                      }}
                    >
                      <span
                        className={`badge ${
                          p.stock === "In Stock"
                            ? "badge-green"
                            : p.stock === "Limited"
                            ? "badge-amber"
                            : p.stock === "Pre-order"
                            ? "badge-blue"
                            : "badge-crimson"
                        }`}
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      >
                        {p.stock}
                      </span>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          className="btn-primary"
                          style={{
                            padding: "8px 18px",
                            fontSize: 13,
                            borderRadius: 8,
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setEnquireProduct(p);
                          }}
                        >
                          Enquire
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: 48 }}>
              <button
                className="btn-primary"
                onClick={() => go("products")}
                style={{ fontSize: 15, padding: "16px 40px" }}
              >
                View All Products{" "}
                <Icon name="arrow" size={16} color="white" />
              </button>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* Categories Showcase */}
      <RevealSection>
        <section
          style={{
            padding: "80px 32px",
            background: G.white,
          }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div
                className="section-tag"
                style={{ margin: "0 auto 16px" }}
              >
                <Icon name="sparkle" size={13} color={G.crimson} /> Three
                Pillars
              </div>
              <h2 className="section-heading" style={{ marginBottom: 16 }}>
                The XOAS Ecosystem
              </h2>
              <p className="section-sub" style={{ margin: "0 auto" }}>
                Televisions that captivate. Audio that immerses. Controls
                that simplify.
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 24,
              }}
              className="grid-3"
            >
              {[
                {
                  icon: "monitor",
                  title: "Televisions",
                  desc: "From QD-OLED flagships to premium Mini-LED and art-inspired Frame TVs, every display is engineered for visual excellence.",
                  color: G.crimson,
                  count: "12 Models",
                },
                {
                  icon: "volume",
                  title: "Audio Systems",
                  desc: "Dolby Atmos soundbars, hi-fi studio speakers, portable wireless, and home theater components for every listener.",
                  color: G.gold,
                  count: "10 Products",
                },
                {
                  icon: "remote",
                  title: "Smart Remotes",
                  desc: "AI-powered touchscreen controllers, solar-powered eco remotes, and voice hubs that unify your entire entertainment stack.",
                  color: G.crimsonLight,
                  count: "4 Controllers",
                },
              ].map(({ icon, title, desc, color, count }) => (
                <div
                  key={title}
                  className="card-hover"
                  style={{
                    background: G.surface,
                    border: `1px solid ${G.border}`,
                    borderRadius: 20,
                    padding: 40,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      background: `rgba(165, 0, 26, 0.06)`,
                      borderRadius: 16,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 24px",
                      color: color,
                    }}
                  >
                    <Icon name={icon} size={28} color="currentColor" />
                  </div>
                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: 20,
                      marginBottom: 12,
                      color: G.textPrimary,
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      color: G.textSecondary,
                      fontSize: 14,
                      lineHeight: 1.7,
                      marginBottom: 20,
                    }}
                  >
                    {desc}
                  </p>
                  <span
                    className="badge badge-crimson"
                    style={{ fontSize: 13, fontWeight: 700 }}
                  >
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* CTA */}
      <RevealSection>
        <section
          style={{
            padding: "100px 32px",
            background: `linear-gradient(135deg, ${G.charcoal}, #150A0F)`,
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(165,0,26,0.08), transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ maxWidth: 700, margin: "0 auto", position: "relative" }}>
            <div
              className="section-tag"
              style={{
                background: "rgba(201, 168, 76, 0.1)",
                color: G.goldLight,
                margin: "0 auto 16px",
              }}
            >
              <Icon name="sparkle" size={13} color={G.goldLight} /> Limited
              Time
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(36px, 5vw, 60px)",
                color: "white",
                marginBottom: 16,
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Ready to Elevate Your Living Space?
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 17,
                marginBottom: 40,
                lineHeight: 1.6,
              }}
            >
              Experience the pinnacle of Indian engineering with XOAS
              premium home entertainment.
            </p>
            <div
              style={{
                display: "flex",
                gap: 14,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                className="btn-primary"
                onClick={() => go("contact")}
                style={{ fontSize: 16, padding: "16px 40px" }}
              >
                Get in Touch
              </button>
              <a href="tel:03368263402" style={{ textDecoration: "none" }}>
                <button
                  className="btn-secondary"
                  style={{
                    borderColor: "rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.8)",
                    fontSize: 16,
                    padding: "16px 40px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Icon name="phone" size={16} color="currentColor" />
                  033 6826 3402
                </button>
              </a>
            </div>
          </div>
        </section>
      </RevealSection>
    </div>
  );
};

export default HomePage;
