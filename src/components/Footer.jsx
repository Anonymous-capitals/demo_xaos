import G from "../constants/colors";
import Icon from "./Icon";

const Footer = ({ navItems, go }) => (
  <footer
    style={{
      background: G.charcoal,
      color: "rgba(255,255,255,0.85)",
      padding: "80px 32px 32px",
    }}
  >
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1.2fr",
          gap: 48,
          marginBottom: 56,
        }}
        className="grid-4"
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
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
                  fontSize: 20,
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
                  fontSize: 24,
                  color: "white",
                  letterSpacing: 1,
                  fontWeight: 700,
                }}
              >
                XOAS
              </div>
              <div
                style={{
                  fontSize: 9,
                  opacity: 0.4,
                  letterSpacing: 2.5,
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                Smart Living
              </div>
            </div>
          </div>
          <p
            style={{
              opacity: 0.45,
              fontSize: 14,
              lineHeight: 1.8,
              marginBottom: 24,
              maxWidth: 360,
            }}
          >
            Premium smart televisions, high-fidelity audio systems, and
            intelligent universal remote controls engineered for the
            discerning Indian home.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            {[
              { icon: "mail", href: "mailto:sales@xoas.in" },
              { icon: "phone", href: "tel:03368263402" },
            ].map(({ icon, href }) => (
              <a
                key={icon}
                href={href}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s",
                  color: "rgba(255,255,255,0.6)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = G.crimson;
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                }}
              >
                <Icon name={icon} size={16} color="currentColor" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 20,
              color: G.goldLight,
            }}
          >
            Quick Links
          </div>
          {navItems.map((n) => (
            <div
              key={n.id}
              onClick={() => go(n.id)}
              style={{
                cursor: "pointer",
                opacity: 0.5,
                fontSize: 14,
                marginBottom: 12,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.opacity = 1)}
              onMouseLeave={(e) => (e.target.style.opacity = 0.5)}
            >
              {n.label}
            </div>
          ))}
        </div>

        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 20,
              color: G.goldLight,
            }}
          >
            Products
          </div>
          {["Flagship OLED TVs", "Mini-LED TVs", "Audio Systems", "Universal Remotes", "Home Theater"].map(
            (c) => (
              <div
                key={c}
                style={{
                  opacity: 0.5,
                  fontSize: 14,
                  marginBottom: 12,
                }}
              >
                {c}
              </div>
            )
          )}
        </div>

        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 20,
              color: G.goldLight,
            }}
          >
            Contact
          </div>
          <div style={{ opacity: 0.5, fontSize: 14, lineHeight: 2 }}>
            <a
              href="mailto:sales@xoas.in"
              style={{
                color: "inherit",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.opacity = 1)}
              onMouseLeave={(e) => (e.target.style.opacity = 0.5)}
            >
              sales@xoas.in
            </a>
            <div>
              <a
                href="tel:03368263402"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = 1)}
                onMouseLeave={(e) => (e.target.style.opacity = 0.5)}
              >
                033 6826 3402
              </a>
            </div>
            <div>West Bengal, India</div>
            <div style={{ marginTop: 8 }}>Mon–Sat: 9AM–7PM</div>
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ opacity: 0.35, fontSize: 13 }}>
          &copy; 2026 XOAS — All rights reserved. Marketed by Unique Home
          Appliance.
        </div>
        <div
          style={{
            opacity: 0.4,
            fontSize: 12,
            color: G.goldLight,
            fontWeight: 500,
          }}
        >
          Designed with precision in India
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
