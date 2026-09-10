import { useState, useEffect, useRef } from "react";
import G from "../constants/colors";
import Icon from "../components/Icon";
import HeroShowcase from "../components/HeroShowcase";
import EnquireModal from "../components/EnquireModal";

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

const HomePage = ({ go }) => {
  const [enquireProduct, setEnquireProduct] = useState(null);
  const marqueeItems = [
    "4K QD-OLED",
    "Dolby Atmos",
    "Made in Kolkata",
    "Since 2016",
    "Anti-Glare Panels",
    "Calibrated Sound",
  ];

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
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1942 / 809",
          overflow: "hidden",
          background: "#181A19",
        }}
      >
        <HeroShowcase
          onNavigate={(i) => go("products", i === 0 ? null : i === 1 ? "TVs" : "Audio")}
        />
      </section>

      {/* Marquee ticker */}
      <div className="marquee" role="presentation" aria-hidden="true">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i}>
              {item} <em>·</em>
            </span>
          ))}
        </div>
      </div>

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
              maxWidth: 1400,
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
                    background: "rgba(178, 30, 53, 0.16)",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: "rgba(255,255,255,0.9)",
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

      {/* Shop by Category - three image-led category tiles */}
      <RevealSection>
        <section
          style={{
            padding: "100px 32px",
            background: G.surface,
          }}
        >
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <div className="section-tag" style={{ margin: "0 auto 16px" }}>
                <Icon name="sparkle" size={13} color={G.crimson} /> Shop by
                Category
              </div>
              <h2 className="section-heading" style={{ marginBottom: 12 }}>
                One brand. Three families.
              </h2>
              <p className="section-sub" style={{ margin: "0 auto" }}>
                Televisions, audio, and remotes engineered to work as one.
              </p>
            </div>

            <div
              className="grid-3"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 24,
              }}
            >
              {[
                { family: "TVs", label: "Televisions", kicker: "QD-OLED · NanoCell · Frame", count: "12 models", img: "/product-images/image6.jpeg" },
                { family: "Audio", label: "Audio Systems", kicker: "Dolby Atmos · Calibrated Sound", count: "10 products", img: "/product-images/image2.jpeg" },
                { family: "Remotes", label: "Smart Remotes", kicker: "AI Touchscreen · Universal", count: "4 controllers", img: "/product-images/image1.jpeg" },
              ].map((c) => (
                <div
                  key={c.family}
                  role="button"
                  tabIndex={0}
                  onClick={() => go("products", c.family)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      go("products", c.family);
                  }}
                  style={{
                    position: "relative",
                    aspectRatio: "4 / 5",
                    borderRadius: 22,
                    overflow: "hidden",
                    cursor: "pointer",
                    backgroundImage: 'url("' + c.img + '")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    boxShadow: "0 24px 60px rgba(24,26,25,0.14)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(24,26,25,0.05) 30%, rgba(24,26,25,0.85) 100%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: "auto 28px 26px",
                      color: "white",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.78)",
                        marginBottom: 8,
                      }}
                    >
                      {c.kicker}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: "clamp(22px, 2.2vw, 30px)",
                        fontWeight: 700,
                        letterSpacing: "-0.01em",
                        lineHeight: 1.15,
                        marginBottom: 18,
                        color: "white",
                      }}
                    >
                      {c.label}
                    </div>
                    <span
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = G.crimson)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "rgba(255,255,255,0.16)")
                      }
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 10,
                        fontSize: 13.5,
                        fontWeight: 700,
                        color: "white",
                        padding: "12px 22px",
                        borderRadius: 12,
                        background: "rgba(255,255,255,0.16)",
                        border: "1px solid rgba(255,255,255,0.28)",
                        transition: "background 0.2s ease",
                      }}
                    >
                      Shop {c.label.toLowerCase()} · {c.count}
                      <Icon name="arrow" size={15} color="white" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>


      {/* Cinema experience banner */}
      <RevealSection>
        <section style={{ padding: "96px 32px 120px", background: G.white }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <div className="cinema-banner">
              <img
                className="cinema-banner-img"
                src="/hero/hero-1.png"
                alt="A premium XOAS living-room setup"
                loading="lazy"
              />
              <div className="cinema-inner">
                <div
                  className="section-tag"
                  style={{
                    background: "rgba(178, 30, 53, 0.16)",
                    color: "rgba(255,255,255,0.9)",
                    marginBottom: 16,
                  }}
                >
                  <Icon
                    name="sparkle"
                    size={13}
                    color="rgba(255,255,255,0.9)"
                  />{" "}
                  The XOAS Experience
                </div>
                <h2
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    color: "white",
                    fontSize: "clamp(28px, 4vw, 44px)",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    marginBottom: 14,
                    lineHeight: 1.15,
                  }}
                >
                  Your living room,
                  <br />
                  reimagined as a cinema.
                </h2>
                <p
                  style={{
                    color: "rgba(255,255,255,0.72)",
                    fontSize: 15,
                    lineHeight: 1.7,
                    marginBottom: 28,
                    maxWidth: 420,
                  }}
                >
                  QD-OLED depth with Dolby Atmos immersion and a remote that
                  understands you — calibrated together for one flawless
                  screen.
                </p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <button
                    className="btn-primary"
                    onClick={() => go("products")}
                    style={{ fontSize: 14 }}
                  >
                    Build your setup{" "}
                    <Icon name="arrow" size={14} color="white" />
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => go("support")}
                    style={{
                      borderColor: "rgba(255,255,255,0.35)",
                      color: "rgba(255,255,255,0.9)",
                      fontSize: 14,
                    }}
                  >
                    Talk to an expert
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* CTA */}
      <RevealSection>
        <section
          style={{
            padding: "96px 32px",
            background: G.charcoal,
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
                "radial-gradient(ellipse at 50% 50%, rgba(178,30,53,0.08), transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ maxWidth: 700, margin: "0 auto", position: "relative" }}>
            <div
              className="section-tag"
              style={{
                background: "rgba(178, 30, 53, 0.16)",
                color: "rgba(255,255,255,0.9)",
                margin: "0 auto 16px",
              }}
            >
              <Icon name="sparkle" size={13} color="rgba(255,255,255,0.9)" /> Limited
              Time
            </div>
            <h2
              style={{
                fontFamily: "'Manrope', sans-serif",
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
                style={{ fontSize: 16 }}
              >
                Get in Touch
              </button>
              <a href="tel:03368263402" style={{ textDecoration: "none" }}>
                <button
                  className="btn-secondary"
                  style={{
                    borderColor: "rgba(255,255,255,0.2)",
                    color: "rgba(255,255,255,0.85)",
                    fontSize: 16,
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
