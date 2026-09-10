import { AnimatePresence, motion } from "framer-motion";
import G from "../constants/colors";
import Icon from "./Icon";

const CartDrawer = ({ open, cart, total, onClose, setQty, remove, onCheckout }) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{ position: "fixed", inset: 0, background: "rgba(24,26,25,0.45)", zIndex: 80 }}
        />
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed", top: 0, right: 0, height: "100%",
            width: "min(420px, 92vw)",
            background: G.white, zIndex: 81,
            boxShadow: "-24px 0 60px rgba(24,26,25,0.18)",
            display: "flex", flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 24px", borderBottom: `1px solid ${G.border}` }}>
            <div>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 20, fontWeight: 700, color: G.textPrimary, letterSpacing: "-0.01em" }}>
                Your Cart
              </div>
              <div style={{ fontSize: 12.5, color: G.textTertiary, marginTop: 2 }}>
                {cart.length} product{cart.length === 1 ? "" : "s"} · {cart.reduce((n, i) => n + i.qty, 0)} item{cart.reduce((n, i) => n + i.qty, 0) === 1 ? "" : "s"}
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close cart"
              style={{ width: 38, height: 38, borderRadius: 12, border: `1px solid ${G.border}`, background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: G.textSecondary }}
            >
              <Icon name="x" size={18} color="currentColor" />
            </button>
          </div>

          {cart.length === 0 ? (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: 32, textAlign: "center" }}>
              <div style={{ width: 64, height: 64, borderRadius: 18, background: "rgba(178,30,53,0.07)", display: "flex", alignItems: "center", justifyContent: "center", color: G.crimson }}>
                <Icon name="cart" size={28} color="currentColor" />
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: G.textPrimary }}>Your cart is empty</div>
              <div style={{ fontSize: 13, color: G.textSecondary }}>Add a TV, audio system, or remote to get started.</div>
              <button className="btn-primary" onClick={onClose} style={{ marginTop: 8 }}>Browse Products</button>
            </div>
          ) : (
            <>
              <div style={{ flex: 1, overflow: "auto", padding: "12px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
                {cart.map(({ product: p, qty }) => (
                  <div key={p.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: 12, border: `1px solid ${G.border}`, borderRadius: 14, background: "white" }}>
                    <span style={{ width: 56, height: 56, borderRadius: 10, overflow: "hidden", background: "linear-gradient(150deg, #F1EDE6, #E6E1D7)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {p.imageUrl && <img src={p.imageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", padding: 3 }} />}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: G.textPrimary, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                      <div style={{ fontSize: 12.5, fontWeight: 700, color: G.crimson, marginTop: 2 }}>{p.price}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, border: `1px solid ${G.border}`, borderRadius: 10, overflow: "hidden" }}>
                        <button onClick={() => setQty(p.id, qty - 1)} aria-label="Decrease quantity" style={{ width: 30, height: 30, border: "none", background: "none", cursor: "pointer", fontSize: 16, color: G.textPrimary }}>−</button>
                        <span style={{ fontSize: 13.5, fontWeight: 700, minWidth: 22, textAlign: "center", color: G.textPrimary }}>{qty}</span>
                        <button onClick={() => setQty(p.id, qty + 1)} aria-label="Increase quantity" style={{ width: 30, height: 30, border: "none", background: "none", cursor: "pointer", fontSize: 16, color: G.textPrimary }}>+</button>
                      </div>
                      <button onClick={() => remove(p.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11.5, fontWeight: 600, color: G.textTertiary }}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ padding: "18px 24px", borderTop: `1px solid ${G.border}`, background: G.offWhite }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: G.textSecondary }}>Subtotal</span>
                  <span style={{ fontSize: 20, fontWeight: 800, color: G.textPrimary, fontFamily: "'Manrope', sans-serif" }}>₹{total.toLocaleString("en-IN")}</span>
                </div>
                <div style={{ fontSize: 12, color: G.textTertiary, marginBottom: 14 }}>Taxes &amp; delivery calculated at checkout.</div>
                <button className="btn-primary" onClick={onCheckout} style={{ width: "100%", fontSize: 14, padding: "13px" }}>
                  Proceed to Checkout <Icon name="arrow" size={15} color="white" />
                </button>
              </div>
            </>
          )}
        </motion.aside>
      </>
    )}
  </AnimatePresence>
);

export default CartDrawer;