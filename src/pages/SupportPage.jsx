import { useState } from "react";
import G from "../constants/colors";
import { PAGE_IMAGES } from "../asset";
import Icon from "../components/Icon";
import faqs from "../data/faqs";

const SupportPage = ({ products, support, setSupport, showToast, openFaq, setOpenFaq }) => {
  const [modelQuery, setModelQuery] = useState("");
  const [modelOpen, setModelOpen] = useState(false);

  const labelStyle = {
    display: "block",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: G.textTertiary,
    marginBottom: 6,
  };
  const hintStyle = {
    fontSize: 11.5,
    color: G.textTertiary,
    marginTop: 6,
  };
  const sectionDivider = {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: G.crimson,
    paddingBottom: 4,
    borderBottom: `1px solid ${G.border}`,
  };

  const modelPool = products.filter((p) => p.family === support.category);
  const q = modelQuery.trim().toLowerCase();
  const modelList = modelPool
    .filter((p) => !q || p.name.toLowerCase().includes(q))
    .slice(0, 8);
  const selectedModel = modelPool.find((p) => p.id === support.modelId);

  const selectModel = (p) => {
    setSupport({ ...support, modelId: p.id });
    setModelQuery(p.name);
    setModelOpen(false);
  };

  const handleSupport = () => {
    if (
      !support.name ||
      !support.phone ||
      !support.email ||
      !support.modelId ||
      !support.issue
    ) {
      showToast("Please fill all required fields");
      return;
    }
    setSupport({
      name: "", email: "", phone: "", category: "",
      modelId: "", serial: "", purchaseDate: "", issue: "", desc: "",
    });
    setModelQuery("");
    showToast("Support ticket submitted! We'll respond within 24 hours.");
  };

  return (
    <div>
      <div
        style={{
          position: "relative",
          height: 360,
          overflow: "hidden",
        }}
      >
        <img
          src={PAGE_IMAGES.supportHero.src}
          alt={PAGE_IMAGES.supportHero.alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 40%",
          }}
          onError={(e) => {
            e.target.parentElement.style.background = `linear-gradient(135deg,${G.charcoal},#181A19)`;
            e.target.style.display = "none";
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(15,0,8,0.78), rgba(178,30,53,0.45))",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 32px",
            textAlign: "center",
          }}
        >
          <div
            className="section-tag"
            style={{
              background: "rgba(178, 30, 53, 0.18)",
              color: "rgba(255,255,255,0.9)",
              marginBottom: 16,
            }}
          >
            <Icon name="support" size={13} color="rgba(255,255,255,0.9)" /> Help
            Center
          </div>
          <h2
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "clamp(42px, 6vw, 72px)",
              color: "white",
              lineHeight: 1,
              marginBottom: 16,
              fontWeight: 700,
            }}
          >
            Support Center
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              maxWidth: 500,
              fontSize: 16,
              lineHeight: 1.6,
            }}
          >
            We are here to help. Submit a ticket or reach us directly.
          </p>
        </div>
      </div>

      <div
        style={{
          padding: "80px 32px",
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            marginBottom: 64,
          }}
          className="grid-2"
        >
<div
              style={{
                background: "white",
                border: `1px solid ${G.border}`,
                borderRadius: 18,
                padding: 40,
              }}
            >
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: 22,
                  marginBottom: 8,
                  color: G.textPrimary,
                }}
              >
                Submit a Ticket
              </h3>
            <p
              style={{
                color: G.textSecondary,
                fontSize: 14,
                marginBottom: 28,
              }}
            >
              Fill the form and we will get back within 24 hours
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: 18 }}
            >
              <div style={sectionDivider}>Your details</div>

              <div>
                <label style={labelStyle}>Registered Name *</label>
                <input
                  className="input-field"
                  placeholder="Full name as on your purchase invoice"
                  value={support.name}
                  onChange={(e) =>
                    setSupport({ ...support, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label style={labelStyle}>Registered Mobile Number *</label>
                <input
                  className="input-field"
                  type="tel"
                  placeholder="e.g. 98xxxxxx21"
                  value={support.phone}
                  onChange={(e) =>
                    setSupport({ ...support, phone: e.target.value })
                  }
                />
                <div style={hintStyle}>Current & active number — OTPs and status updates go here.</div>
              </div>

              <div>
                <label style={labelStyle}>Registered Email *</label>
                <input
                  className="input-field"
                  type="email"
                  placeholder="Current & active email address"
                  value={support.email}
                  onChange={(e) =>
                    setSupport({ ...support, email: e.target.value })
                  }
                />
                <div style={hintStyle}>Current & active email — ticket replies go here.</div>
              </div>

              <div style={{ ...sectionDivider, marginTop: 6 }}>Product details</div>

              <div>
                <label style={labelStyle}>Category *</label>
                <select
                  className="input-field"
                  value={support.category}
                  onChange={(e) => {
                    setSupport({ ...support, category: e.target.value, modelId: "" });
                    setModelQuery("");
                    setModelOpen(false);
                  }}
                  style={{ appearance: "none" }}
                >
                  <option value="">Select category</option>
                  <option value="TVs">Televisions</option>
                  <option value="Audio">Audio Systems</option>
                  <option value="Remotes">Smart Remotes</option>
                </select>
              </div>

              <div style={{ position: "relative" }}>
                <label style={labelStyle}>Model *</label>
                <input
                  className="input-field"
                  placeholder={
                    !support.category
                      ? "Select a category first"
                      : "Search or select your model…"
                  }
                  value={modelQuery}
                  disabled={!support.category}
                  onChange={(e) => {
                    setModelQuery(e.target.value);
                    setSupport({ ...support, modelId: "" });
                  }}
                  onFocus={() => setModelOpen(true)}
                  onBlur={() => setTimeout(() => setModelOpen(false), 150)}
                />
                {selectedModel && (
                  <span
                    style={{
                      display: "block", marginTop: 6, fontSize: 12, color: G.crimson, fontWeight: 600,
                    }}
                  >
                    <Icon name="check" size={13} color={G.crimson} /> {selectedModel.name} · {selectedModel.price}
                  </span>
                )}
                {modelOpen && support.category && (
                  <div
                    style={{
                      position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
                      background: "white", border: `1px solid ${G.border}`, borderRadius: 12,
                      boxShadow: "0 24px 60px rgba(24,26,25,0.16)",
                      maxHeight: 260, overflow: "auto", zIndex: 20,
                    }}
                  >
                    {modelList.length === 0 ? (
                      <div style={{ padding: "16px 18px", fontSize: 13, color: G.textTertiary }}>
                        No product matches "{modelQuery}"
                      </div>
                    ) : (
                      modelList.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onMouseDown={() => selectModel(p)}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(178,30,53,0.05)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                          style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            gap: 12, width: "100%", padding: "11px 16px", border: "none",
                            background: "none", cursor: "pointer", textAlign: "left",
                            fontFamily: "'Manrope', sans-serif",
                          }}
                        >
                          <span style={{ minWidth: 0 }}>
                            <span style={{ display: "block", fontSize: 13.5, fontWeight: 600, color: G.textPrimary, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {p.name}
                            </span>
                            <span style={{ display: "block", fontSize: 11.5, color: G.textTertiary, marginTop: 1 }}>
                              {p.category}
                            </span>
                          </span>
                          <span style={{ fontSize: 12.5, fontWeight: 700, color: G.crimson, flexShrink: 0 }}>
                            {p.price}
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>

              <div>
                <label style={labelStyle}>Serial Number</label>
                <input
                  className="input-field"
                  placeholder="Optional · found on the invoice or back panel"
                  value={support.serial}
                  onChange={(e) =>
                    setSupport({ ...support, serial: e.target.value })
                  }
                />
              </div>

              <div>
                <label style={labelStyle}>Purchase Date</label>
                <input
                  className="input-field"
                  type="date"
                  max={new Date().toISOString().slice(0, 10)}
                  value={support.purchaseDate}
                  onChange={(e) =>
                    setSupport({ ...support, purchaseDate: e.target.value })
                  }
                />
              </div>

              <div style={{ ...sectionDivider, marginTop: 6 }}>Issue details</div>

              <div>
                <label style={labelStyle}>Issue Type *</label>
                <select
                  className="input-field"
                  value={support.issue}
                  onChange={(e) =>
                    setSupport({ ...support, issue: e.target.value })
                  }
                  style={{ appearance: "none" }}
                >
                  <option value="">Select Issue Type *</option>
                  <option>Product Query</option>
                  <option>Warranty Claim</option>
                  <option>Technical Issue</option>
                  <option>Delivery Issue</option>
                  <option>Return / Refund</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Describe the Issue *</label>
                <textarea
                  className="input-field"
                  placeholder="Describe your issue..."
                  value={support.desc}
                  onChange={(e) =>
                    setSupport({ ...support, desc: e.target.value })
                  }
                  rows={4}
                  style={{ resize: "vertical" }}
                />
              </div>

              <button className="btn-primary" onClick={handleSupport}>
                Submit Ticket
              </button>
            </div>
          </div>

          <div>
            {[
              {
                icon: "phone",
                title: "Call Us",
                val: "033 6826 3402",
                sub: "Mon–Sat, 9AM–7PM",
                href: "tel:03368263402",
              },
              {
                icon: "mail",
                title: "Email Support",
                val: "sales@xoas.in",
                sub: "Response within 24 hours",
                href: "mailto:sales@xoas.in",
              },
              {
                icon: "map",
                title: "Visit Us",
                val: "West Bengal, India",
                sub: "23°13'34.5\"N 88°21'29.8\"E",
                href: "#",
              },
            ].map(({ icon, title, val, sub, href }) => (
              <a
                key={title}
                href={href}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: 24,
                  background: "white",
                  border: `1px solid ${G.border}`,
                  borderRadius: 16,
                  marginBottom: 18,
                  transition: "all 0.3s",
                }}
                className="card-hover"
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    background: "rgba(178,30,53,0.06)",
                    borderRadius: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: G.crimson,
                  }}
                >
                  <Icon name={icon} size={22} color="currentColor" />
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: 15,
                      color: G.textPrimary,
                    }}
                  >
                    {title}
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 16,
                      color: G.crimson,
                      marginTop: 2,
                    }}
                  >
                    {val}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: G.textTertiary,
                      marginTop: 2,
                    }}
                  >
                    {sub}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 32,
              marginBottom: 28,
              textAlign: "center",
              fontWeight: 700,
            }}
          >
            Frequently Asked Questions
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              maxWidth: 800,
              margin: "0 auto",
            }}
          >
            {faqs.map((f, i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  border: `1px solid ${
                    openFaq === i ? G.crimson : G.border
                  }`,
                  borderRadius: 14,
                  overflow: "hidden",
                  transition: "border-color 0.3s",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%",
                    padding: "20px 24px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 600,
                    fontSize: 15,
                    textAlign: "left",
                    color: G.textPrimary,
                    gap: 16,
                  }}
                >
                  {f.q}
                  <span
                    style={{
                      color: G.crimson,
                      fontSize: 22,
                      flexShrink: 0,
                      transition: "transform 0.3s",
                      transform:
                        openFaq === i ? "rotate(45deg)" : "rotate(0)",
                    }}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div
                    style={{
                      padding: "0 24px 20px",
                      color: G.textSecondary,
                      fontSize: 14,
                      lineHeight: 1.8,
                      borderTop: `1px solid ${G.border}`,
                      paddingTop: 16,
                      marginTop: 0,
                    }}
                  >
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
