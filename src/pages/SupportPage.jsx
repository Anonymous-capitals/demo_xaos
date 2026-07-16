import G from "../constants/colors";
import { PAGE_IMAGES } from "../asset";
import Icon from "../components/Icon";
import faqs from "../data/faqs";

const SupportPage = ({ support, setSupport, showToast, openFaq, setOpenFaq }) => {
  const handleSupport = () => {
    if (!support.name || !support.email || !support.issue) {
      showToast("Please fill all required fields");
      return;
    }
    setSupport({ name: "", email: "", issue: "", desc: "" });
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
            e.target.parentElement.style.background = `linear-gradient(135deg,${G.charcoal},#100030)`;
            e.target.style.display = "none";
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(15,0,8,0.78), rgba(165,0,26,0.45))",
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
              background: "rgba(201, 168, 76, 0.15)",
              color: G.goldLight,
              marginBottom: 16,
            }}
          >
            <Icon name="support" size={13} color={G.goldLight} /> Help
            Center
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
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
          maxWidth: 1280,
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
              borderRadius: 20,
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
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <input
                className="input-field"
                placeholder="Your Name *"
                value={support.name}
                onChange={(e) =>
                  setSupport({ ...support, name: e.target.value })
                }
              />
              <input
                className="input-field"
                type="email"
                placeholder="Email Address *"
                value={support.email}
                onChange={(e) =>
                  setSupport({ ...support, email: e.target.value })
                }
              />
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
                    background: "rgba(165,0,26,0.06)",
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
              fontFamily: "'Playfair Display', serif",
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
                    fontFamily: "'Inter', sans-serif",
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
