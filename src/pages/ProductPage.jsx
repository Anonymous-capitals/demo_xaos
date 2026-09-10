import { useState } from "react";
import G from "../constants/colors";
import Icon from "../components/Icon";

const ProductCardSmall = ({ product, onView }) => (
  <div
    className="product-card"
    onClick={() => onView(product)}
    style={{ cursor: "pointer" }}
  >
    <div
      style={{
        height: 160,
        background: "linear-gradient(135deg, #F5F2EC, #E8E3DA)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{
            maxWidth: "80%",
            maxHeight: "80%",
            objectFit: "contain",
            transition: "transform 0.5s",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.08)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        />
      ) : (
        <Icon name="tv" size={36} color={G.textTertiary} />
      )}
    </div>
    <div style={{ padding: "16px 18px 20px" }}>
      <span
        style={{
          fontSize: 10,
          color: G.crimson,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        {product.category}
      </span>
      <h4
        style={{
          fontWeight: 700,
          fontSize: 14,
          margin: "4px 0 6px",
          lineHeight: 1.3,
          color: G.textPrimary,
        }}
      >
        {product.name}
      </h4>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="price-tag" style={{ fontSize: 18 }}>
          {product.price}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Icon name="star" size={11} color="#C9A84C" />
          <span style={{ fontSize: 12, fontWeight: 600, color: G.textSecondary }}>
            {product.rating}
          </span>
        </div>
      </div>
    </div>
  </div>
);

const ProductPage = ({ product, products, go, setViewProduct, showToast, onAddToCart, onOrderNow }) => {
  const [qty, setQty] = useState(1);
  if (!product) {
    go("products");
    return null;
  }

  const similar = products
    .filter((p) => p.family === product.family && p.id !== product.id)
    .slice(0, 4);

  return (
    <div>
      <section style={{ padding: "120px 32px 60px", background: G.surface }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <button
            onClick={() => go("products")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: G.textSecondary,
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "'Manrope', sans-serif",
              marginBottom: 36,
              padding: "8px 16px",
              borderRadius: 8,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = G.offWhite;
              e.currentTarget.style.color = G.crimson;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = G.textSecondary;
            }}
          >
            <Icon name="chevronLeft" size={16} color="currentColor" /> Back to
            Products
          </button>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 56,
              alignItems: "start",
            }}
            className="grid-2"
          >
            <div
              style={{
                background: "linear-gradient(135deg, #F5F2EC, #E8E3DA)",
                borderRadius: 24,
                padding: "48px 40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 400,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(178,30,53,0.03), transparent 70%)",
                  pointerEvents: "none",
                }}
              />
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{
                    maxWidth: "90%",
                    maxHeight: 360,
                    objectFit: "contain",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              ) : (
                <Icon
                  name="tv"
                  size={80}
                  color={G.textTertiary}
                  style={{ zIndex: 1 }}
                />
              )}
              {product.badge && (
                <span
                  className={`badge ${
                    product.badge === "Flagship" ||
                    product.badge === "Ultra Premium"
                      ? "badge-gold"
                      : product.badge === "Best Seller" ||
                        product.badge === "Popular"
                      ? "badge-green"
                      : "badge-crimson"
                  }`}
                  style={{
                    position: "absolute",
                    top: 20,
                    left: 20,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                    zIndex: 2,
                  }}
                >
                  {product.badge}
                </span>
              )}
              <span
                className={`badge ${
                  product.stock === "In Stock"
                    ? "badge-green"
                    : product.stock === "Limited"
                    ? "badge-amber"
                    : product.stock === "Pre-order"
                    ? "badge-blue"
                    : "badge-crimson"
                }`}
                style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  fontSize: 12,
                  fontWeight: 700,
                  zIndex: 2,
                }}
              >
                {product.stock}
              </span>
            </div>

            <div style={{ paddingTop: 8 }}>
              <span
                style={{
                  fontSize: 12,
                  color: G.crimson,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  marginBottom: 8,
                  display: "block",
                }}
              >
                {product.category}
              </span>
              <h1
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "clamp(28px, 3.5vw, 42px)",
                  fontWeight: 700,
                  color: G.textPrimary,
                  lineHeight: 1.15,
                  marginBottom: 16,
                  letterSpacing: "-0.02em",
                }}
              >
                {product.name}
              </h1>
              <p
                style={{
                  color: G.textSecondary,
                  fontSize: 15,
                  lineHeight: 1.8,
                  marginBottom: 24,
                }}
              >
                {product.desc}
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                  marginBottom: 24,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div className="price-tag" style={{ fontSize: 32 }}>
                    {product.price}
                  </div>
                  {product.originalPrice && (
                    <div
                      className="price-tag-original"
                      style={{ fontSize: 16, marginTop: 2 }}
                    >
                      {product.originalPrice}
                    </div>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 14px",
                    background: "rgba(201, 168, 76, 0.14)",
                    borderRadius: 100,
                  }}
                >
                  <Icon name="star" size={16} color="#C9A84C" />
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: 16,
                      color: G.textPrimary,
                    }}
                  >
                    {product.rating}
                  </span>
                  <span style={{ color: G.textTertiary, fontSize: 13 }}>
                    / 5.0
                  </span>
                </div>
              </div>

              {product.specs && (
                <div
                  style={{
                    background: "rgba(178, 30, 53, 0.03)",
                    borderRadius: 14,
                    padding: "20px 24px",
                    marginBottom: 24,
                    border: "1px solid rgba(178, 30, 53, 0.06)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      color: G.textTertiary,
                      marginBottom: 10,
                    }}
                  >
                    Key Specifications
                  </div>
                  <div
                    style={{
                      color: G.textPrimary,
                      fontSize: 14,
                      lineHeight: 1.8,
                      fontWeight: 500,
                    }}
                  >
                    {product.specs}
                  </div>
                </div>
              )}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                  marginBottom: 28,
                }}
              >
                {[
                  ["SKU", product.sku],
                  ["Category", product.category],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    style={{
                      background: G.offWhite,
                      borderRadius: 10,
                      padding: "12px 16px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        color: G.textTertiary,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        marginBottom: 4,
                      }}
                    >
                      {k}
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 14,
                        color: G.textPrimary,
                      }}
                    >
                      {v}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", border: `1px solid ${G.border}`, borderRadius: 12, overflow: "hidden", flexShrink: 0 }}>
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity"
                    style={{ width: 46, height: 50, border: "none", background: "white", cursor: "pointer", fontSize: 20, color: G.textPrimary }}>−</button>
                  <span style={{ fontSize: 16, fontWeight: 700, minWidth: 36, textAlign: "center", color: G.textPrimary }}>{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity"
                    style={{ width: 46, height: 50, border: "none", background: "white", cursor: "pointer", fontSize: 20, color: G.textPrimary }}>+</button>
                </div>
                <button
                  className="btn-primary"
                  style={{
                    flex: 1,
                    padding: "15px 24px",
                    fontSize: 15,
                    justifyContent: "center",
                  }}
                  onClick={() => { onAddToCart(product, qty); showToast(`${product.name} added to cart`); }}
                >
                  <Icon name="cart" size={17} color="white" /> Add to Cart
                </button>
              </div>
              <button
                className="btn-secondary"
                style={{
                  width: "100%",
                  padding: "15px 24px",
                  fontSize: 15,
                  justifyContent: "center",
                  fontWeight: 700,
                }}
                onClick={() => { onOrderNow(product, qty); showToast(`${product.name} added to cart`); }}
              >
                Order Now
              </button>
              <p
                style={{
                  textAlign: "center",
                  color: G.textTertiary,
                  fontSize: 13,
                  marginTop: 12,
                }}
              >
                Call us at{" "}
                <a
                  href="tel:03368263402"
                  style={{ color: G.crimson, fontWeight: 600 }}
                >
                  033 6826 3402
                </a>{" "}
                for instant assistance
              </p>
            </div>
          </div>
        </div>
      </section>

      {similar.length > 0 && (
        <section
          style={{
            padding: "0 32px 80px",
            background: G.surface,
          }}
        >
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <div
              style={{
                borderTop: `1px solid ${G.border}`,
                paddingTop: 48,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 28,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: G.crimson,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon name="sparkle" size={16} color="white" />
                </div>
                <h3
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 24,
                    fontWeight: 700,
                    color: G.textPrimary,
                  }}
                >
                  Customers Also Bought
                </h3>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 20,
                }}
                className="grid-4"
              >
                {similar.map((p) => (
                  <ProductCardSmall
                    key={p.id}
                    product={p}
                    onView={(prod) => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      setViewProduct(prod);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductPage;
