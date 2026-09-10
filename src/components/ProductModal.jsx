import G from "../constants/colors";
import Icon from "./Icon";
import { useState } from "react";

const stockColor = (s) =>
  s === "In Stock"
    ? "badge-green"
    : s === "Limited"
    ? "badge-amber"
    : s === "Pre-order"
    ? "badge-blue"
    : "badge-crimson";

const ProductModal = ({ product, allProducts, onClose, setViewProduct, showToast, onAddToCart, onOrderNow }) => {
  const similar = allProducts
    ? allProducts
        .filter((p) => p.family === product.family && p.id !== product.id)
        .slice(0, 3)
    : [];
  const [qty, setQty] = useState(1);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            padding: "32px 32px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 22,
              letterSpacing: 0.5,
            }}
          >
            Product Details
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
              borderRadius: 8,
              transition: "background 0.2s",
              color: G.textTertiary,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = G.offWhite;
              e.currentTarget.style.color = G.textPrimary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "none";
              e.currentTarget.style.color = G.textTertiary;
            }}
          >
            <Icon name="close" size={20} color="currentColor" />
          </button>
        </div>
        <div
          style={{
            margin: "24px 32px",
            background: "linear-gradient(135deg, #F5F2EC, #E8E3DA)",
            borderRadius: 16,
            padding: "40px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 220,
            position: "relative",
          }}
        >
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{
                maxHeight: 220,
                maxWidth: "100%",
                objectFit: "contain",
                borderRadius: 8,
              }}
            />
          ) : (
            <Icon name="tv" size={64} color={G.textTertiary} />
          )}
          <span
            className={`badge ${stockColor(product.stock)}`}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            {product.stock}
          </span>
        </div>
        <div style={{ padding: "0 32px 32px" }}>
          <div
            style={{
              fontSize: 12,
              color: G.crimson,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              marginBottom: 6,
            }}
          >
            {product.category}
          </div>
          <h2
            style={{
              fontWeight: 800,
              fontSize: 22,
              marginBottom: 8,
              color: G.textPrimary,
            }}
          >
            {product.name}
          </h2>
          <p
            style={{
              color: G.textSecondary,
              fontSize: 14,
              lineHeight: 1.7,
              marginBottom: 20,
            }}
          >
            {product.desc}
          </p>

          {product.specs && (
            <div
              style={{
                background: "rgba(178, 30, 53, 0.03)",
                borderRadius: 12,
                padding: "16px 20px",
                marginBottom: 20,
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
                  marginBottom: 8,
                }}
              >
                Key Specifications
              </div>
              <p
                style={{
                  color: G.textPrimary,
                  fontSize: 13,
                  lineHeight: 1.7,
                  fontWeight: 500,
                }}
              >
                {product.specs}
              </p>
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 24,
            }}
          >
            {[
              ["SKU", product.sku],
              ["Price", product.price],
              ["Original Price", product.originalPrice],
              ["Rating", `${product.rating} / 5.0`],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  background: G.offWhite,
                  borderRadius: 12,
                  padding: "14px 16px",
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
                    fontSize: 15,
                    color:
                      k === "Price" || k === "Original Price"
                        ? G.crimson
                        : G.textPrimary,
                  }}
                >
                  {v}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: similar.length ? 24 : 0 }}>
            <div style={{ display: "flex", alignItems: "center", border: `1px solid ${G.border}`, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity"
                style={{ width: 38, height: 44, border: "none", background: "none", cursor: "pointer", fontSize: 18, color: G.textPrimary }}>−</button>
              <span style={{ fontSize: 15, fontWeight: 700, minWidth: 30, textAlign: "center", color: G.textPrimary }}>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity"
                style={{ width: 38, height: 44, border: "none", background: "none", cursor: "pointer", fontSize: 18, color: G.textPrimary }}>+</button>
            </div>
            <button
              className="btn-secondary"
              style={{ flex: 1 }}
              onClick={() => { onAddToCart(product, qty); showToast(`${product.name} added to cart`); }}
            >
              Add to Cart
            </button>
            <button
              className="btn-primary"
              style={{ flex: 1 }}
              onClick={() => { onOrderNow(product, qty); showToast(`${product.name} added to cart`); }}
            >
              Order Now
            </button>
          </div>

          {similar.length > 0 && (
            <div
              style={{
                borderTop: `1px solid ${G.border}`,
                paddingTop: 20,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: G.textTertiary,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  marginBottom: 14,
                }}
              >
                Similar Items
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                {similar.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onClose();
                      setViewProduct(p);
                    }}
                    style={{
                      flex: 1,
                      cursor: "pointer",
                      background: G.offWhite,
                      borderRadius: 10,
                      padding: 12,
                      textAlign: "center",
                      transition: "all 0.3s",
                      border: `1px solid transparent`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = G.crimson;
                      e.currentTarget.style.background = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "transparent";
                      e.currentTarget.style.background = G.offWhite;
                    }}
                  >
                    <div
                      style={{
                        height: 60,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 8,
                        background: "linear-gradient(135deg, #F5F2EC, #E8E3DA)",
                        borderRadius: 6,
                        overflow: "hidden",
                      }}
                    >
                      {p.imageUrl ? (
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          style={{
                            maxWidth: "90%",
                            maxHeight: "90%",
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        <Icon name="tv" size={20} color={G.textTertiary} />
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: G.textPrimary,
                        lineHeight: 1.2,
                        marginBottom: 4,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {p.name}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: G.crimson,
                      }}
                    >
                      {p.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
