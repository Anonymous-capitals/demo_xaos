import G from "../constants/colors";
import Icon from "./Icon";

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
              background: G.crimson,
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
              fontFamily: "'Manrope', sans-serif",
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
              <strong style={{ color: G.textPrimary }}>{product.name}</strong>
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
                  background: "rgba(178,30,53,0.08)",
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
                background: "rgba(178,30,53,0.08)",
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

export default EnquireModal;