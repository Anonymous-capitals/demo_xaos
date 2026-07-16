import G from "../constants/colors";
import { PAGE_IMAGES } from "../asset";
import Icon from "../components/Icon";

const AboutPage = () => (
  <div>
    <div
      style={{
        position: "relative",
        height: 400,
        overflow: "hidden",
      }}
    >
      <img
        src={PAGE_IMAGES.aboutHero.src}
        alt={PAGE_IMAGES.aboutHero.alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 30%",
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
            "linear-gradient(135deg, rgba(15,0,8,0.82), rgba(165,0,26,0.45))",
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
          <Icon name="sparkle" size={13} color={G.goldLight} /> Who We Are
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(48px, 7vw, 80px)",
            color: "white",
            lineHeight: 1,
            marginBottom: 20,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          About XOAS
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.8)",
            maxWidth: 580,
            fontSize: 17,
            lineHeight: 1.7,
          }}
        >
          XOAS is a premium home entertainment brand marketed by{" "}
          <strong style={{ color: "white" }}>
            Unique Home Appliance
          </strong>
          , dedicated to bringing flagship-quality televisions, audio
          systems, and smart controls to the Indian home.
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
          background: `linear-gradient(135deg, ${G.charcoal}, #150A0F)`,
          borderRadius: 24,
          padding: "56px 48px",
          marginBottom: 64,
          display: "flex",
          alignItems: "center",
          gap: 48,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", flexShrink: 0 }}>
          <div
            style={{
              width: 100,
              height: 100,
              background: `linear-gradient(135deg, ${G.crimson}, ${G.gold})`,
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 48,
                color: "white",
                fontWeight: 700,
              }}
            >
              X
            </span>
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 12,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Official Brand
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 280, maxWidth: 560 }}>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 32,
              color: "white",
              marginBottom: 12,
              fontWeight: 700,
            }}
          >
            The XOAS Identity
          </h3>
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 15,
              lineHeight: 1.8,
              marginBottom: 20,
            }}
          >
            XOAS stands for excellence, innovation, and trust in every
            product we deliver. Our brand embodies the spirit of modern
            India — aspirational, tech-forward, and uncompromising on
            quality.
          </p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {[
              "Visionary",
              "Precision",
              "Innovation",
              "Quality",
            ].map((word) => (
              <span
                key={word}
                style={{
                  color: G.goldLight,
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 18,
                  fontWeight: 600,
                  opacity: 0.85,
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 24,
          marginBottom: 64,
        }}
      >
        {[
          { icon: "monitor", title: "Flagship Displays", desc: "QD-OLED, Mini-LED, and QLED televisions engineered with cutting-edge visual technology for unparalleled picture quality." },
          { icon: "volume", title: "Premium Audio", desc: "Dolby Atmos soundbars, hi-fi studio speakers, and immersive home theater components for every space." },
          { icon: "remote", title: "Smart Controls", desc: "AI-powered universal remotes and voice hubs that unify your entire entertainment ecosystem seamlessly." },
          { icon: "shield", title: "Quality Assured", desc: "Rigorously tested for durability, performance, and reliability. Backed by comprehensive warranty and support." },
        ].map(({ icon, title, desc }) => (
          <div
            key={title}
            className="card-hover"
            style={{
              background: "white",
              border: `1px solid ${G.border}`,
              borderRadius: 20,
              padding: 32,
            }}
          >
            <div className="feature-icon" style={{ marginBottom: 20 }}>
              <Icon name={icon} size={24} color={G.crimson} />
            </div>
            <h3
              style={{
                fontWeight: 700,
                fontSize: 18,
                marginBottom: 10,
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
              }}
            >
              {desc}
            </p>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 64 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div
            className="section-tag"
            style={{ margin: "0 auto 16px" }}
          >
            <Icon name="sparkle" size={13} color={G.crimson} />{" "}
            Leadership
          </div>
          <h2
            className="section-heading"
          >
            Meet the Visionaries
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 28,
          }}
          className="grid-2"
        >
          {[
            {
              name: "Mr. Anirban Dey",
              role: "Chairman & Managing Director",
              email: "anirban.dey@xoas.in",
              init: "AD",
              desc: "Leads XOAS with strategic vision and a commitment to excellence. Focused on business growth and long-term customer trust.",
            },
            {
              name: "Mr. Subhradip Ganguly",
              role: "Business Head & Product Head",
              email: "sales@xoas.in",
              init: "SG",
              desc: "Oversees product development and innovation. Ensures quality and functionality align with market needs and consumer expectations.",
            },
          ].map(({ name, role, email, init, desc }) => (
            <div key={name} className="team-card card-hover">
              <div className="team-avatar">{init}</div>
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: 20,
                  marginBottom: 4,
                  color: G.textPrimary,
                }}
              >
                {name}
              </h3>
              <div
                style={{
                  color: G.crimson,
                  fontWeight: 600,
                  fontSize: 13,
                  marginBottom: 16,
                  letterSpacing: 0.3,
                }}
              >
                {role}
              </div>
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
              <a
                href={`mailto:${email}`}
                style={{
                  color: G.crimson,
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Icon name="mail" size={14} color={G.crimson} />
                {email}
              </a>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
        }}
        className="grid-4"
      >
        {[
          ["26+", "Premium Products"],
          ["10K+", "Happy Customers"],
          ["5+", "Years Excellence"],
          ["24/7", "Customer Support"],
        ].map(([n, l]) => (
          <div key={l} className="stat-card card-hover">
            <div className="stat-number">{n}</div>
            <div
              style={{
                color: G.textSecondary,
                fontSize: 13,
                marginTop: 8,
                fontWeight: 500,
              }}
            >
              {l}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AboutPage;
