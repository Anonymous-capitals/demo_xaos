import G from "../constants/colors";
import { PAGE_IMAGES } from "../asset";
import Icon from "../components/Icon";
import StaticMap from "../components/StaticMap";

const ContactPage = ({ contact, setContact, showToast }) => {
  const handleContact = () => {
    if (!contact.name || !contact.email || !contact.msg) {
      showToast("Please fill all required fields");
      return;
    }
    setContact({ name: "", email: "", phone: "", subject: "", msg: "" });
    showToast("Message sent! We'll reply to sales@xoas.in soon.");
  };

  return (
    <div>
      <div
        style={{
          position: "relative",
          height: 380,
          overflow: "hidden",
        }}
      >
        <img
          src={PAGE_IMAGES.contactHero.src}
          alt={PAGE_IMAGES.contactHero.alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
          onError={(e) => {
            e.target.parentElement.style.background = `linear-gradient(135deg,${G.charcoal},#150A0F)`;
            e.target.style.display = "none";
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(15,0,8,0.82), rgba(165,0,26,0.5))",
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
            <Icon name="mail" size={13} color={G.goldLight} /> Get In
            Touch
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
            Contact Us
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              maxWidth: 520,
              fontSize: 16,
              lineHeight: 1.7,
            }}
          >
            Have a question or want to place a bulk order? We would love
            to hear from you.
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
            gridTemplateColumns: "1fr 1.4fr",
            gap: 48,
            alignItems: "start",
          }}
          className="grid-2"
        >
          <div>
            <div
              style={{
                background: `linear-gradient(135deg, ${G.crimson}, ${G.crimsonDark})`,
                borderRadius: 20,
                padding: 40,
                color: "white",
                marginBottom: 28,
              }}
            >
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 28,
                  marginBottom: 8,
                  fontWeight: 700,
                }}
              >
                Reach Out
              </h3>
              <p
                style={{
                  opacity: 0.7,
                  fontSize: 14,
                  marginBottom: 32,
                }}
              >
                Mon–Sat, 9AM to 7PM IST
              </p>
              {[
                {
                  icon: "mail",
                  label: "Email",
                  val: "sales@xoas.in",
                  href: "mailto:sales@xoas.in",
                },
                {
                  icon: "phone",
                  label: "Phone",
                  val: "033 6826 3402",
                  href: "tel:03368263402",
                },
                {
                  icon: "map",
                  label: "Location",
                  val: "West Bengal, India",
                },
              ].map(({ icon, label, val, href }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    gap: 16,
                    marginBottom: 24,
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      background: "rgba(255,255,255,0.12)",
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon name={icon} size={18} color="white" />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        opacity: 0.6,
                        textTransform: "uppercase",
                        letterSpacing: 1.5,
                      }}
                    >
                      {label}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        style={{
                          color: "white",
                          textDecoration: "none",
                          fontWeight: 600,
                          fontSize: 16,
                        }}
                      >
                        {val}
                      </a>
                    ) : (
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: 16,
                        }}
                      >
                        {val}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 15,
                  marginBottom: 14,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: G.textPrimary,
                }}
              >
                <Icon name="map" size={16} color={G.crimson} /> Our
                Location
              </div>
              <StaticMap />
            </div>
          </div>

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
                marginBottom: 28,
                color: G.textPrimary,
              }}
            >
              Send Us a Message
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 16,
              }}
            >
              <input
                className="input-field"
                placeholder="Full Name *"
                value={contact.name}
                onChange={(e) =>
                  setContact({ ...contact, name: e.target.value })
                }
              />
              <input
                className="input-field"
                type="email"
                placeholder="Email Address *"
                value={contact.email}
                onChange={(e) =>
                  setContact({ ...contact, email: e.target.value })
                }
              />
              <input
                className="input-field"
                type="tel"
                placeholder="Phone Number"
                value={contact.phone}
                onChange={(e) =>
                  setContact({ ...contact, phone: e.target.value })
                }
              />
              <input
                className="input-field"
                placeholder="Subject"
                value={contact.subject}
                onChange={(e) =>
                  setContact({ ...contact, subject: e.target.value })
                }
              />
            </div>
            <textarea
              className="input-field"
              placeholder="Your message... *"
              value={contact.msg}
              onChange={(e) =>
                setContact({ ...contact, msg: e.target.value })
              }
              rows={5}
              style={{
                resize: "vertical",
                marginBottom: 24,
                width: "100%",
              }}
            />
            <button
              className="btn-primary"
              onClick={handleContact}
              style={{ width: "100%", fontSize: 16, padding: "16px" }}
            >
              Send Message
            </button>
            <p
              style={{
                textAlign: "center",
                color: G.textTertiary,
                fontSize: 13,
                marginTop: 16,
              }}
            >
              We will respond via{" "}
              <strong style={{ color: G.textSecondary }}>
                sales@xoas.in
              </strong>{" "}
              within 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
