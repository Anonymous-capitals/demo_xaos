import { useState } from "react";
import G from "../constants/colors";
import Icon from "./Icon";

const CheckoutModal = ({ cart, total, onClose, onPlace, showToast }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    payment: "Cash on Delivery",
    notes: "",
  });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = () => {
    if (!form.name || !form.phone || !form.email || !form.address) {
      showToast("Please fill all required fields");
      return;
    }
    onPlace();
  };

  const inputStyle = {
    width: "100%",
    border: `1px solid ${G.border}`,
    borderRadius: 10,
    padding: "11px 14px",
    fontSize: 14,
    fontFamily: "'Manrope', sans-serif",
    color: G.textPrimary,
    background: "white",
    outline: "none",
    boxSizing: "border-box",
  };
  const labelStyle = {
    display: "block",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 1.1,
    textTransform: "uppercase",
    color: G.textTertiary,
    marginBottom: 6,
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        style={{ maxWidth: 520, maxHeight: "90vh", overflow: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: "28px 32px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
            <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 24, fontWeight: 700, color: G.textPrimary }}>
              Checkout
            </h3>
            <button
              onClick={onClose}
              aria-label="Close checkout"
              style={{ width: 36, height: 36, borderRadius: 10, border: `1px solid ${G.border}`, background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: G.textSecondary }}
            >
              <Icon name="x" size={17} color="currentColor" />
            </button>
          </div>
          <p style={{ color: G.textSecondary, fontSize: 13, marginBottom: 20 }}>
            Order summary below · we'll confirm on the phone before processing.
          </p>

          <div style={{ marginBottom: 20 }}>
            {cart.map(({ product: p, qty }) => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${G.border}` }}>
                <div style={{ minWidth: 0, paddingRight: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: G.textPrimary, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                  <div style={{ fontSize: 11.5, color: G.textTertiary, marginTop: 1 }}>Qty {qty}</div>
                </div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: G.textPrimary, flexShrink: 0 }}>{p.price}</div>
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: G.textPrimary }}>Total</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: G.crimson, fontFamily: "'Manrope', sans-serif" }}>
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={labelStyle}>Full Name *</label>
              <input style={inputStyle} placeholder="Name on the delivery address" value={form.name} onChange={set("name")} />
            </div>
            <div>
              <label style={labelStyle}>Mobile Number *</label>
              <input style={inputStyle} type="tel" placeholder="Current & active number" value={form.phone} onChange={set("phone")} />
            </div>
            <div>
              <label style={labelStyle}>Email *</label>
              <input style={inputStyle} type="email" placeholder="Current & active email" value={form.email} onChange={set("email")} />
            </div>
            <div>
              <label style={labelStyle}>Delivery Address *</label>
              <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 70 }} placeholder="House / street / city / pincode" value={form.address} onChange={set("address")} />
            </div>
            <div>
              <label style={labelStyle}>Payment Method</label>
              {["Cash on Delivery", "UPI / Online Transfer"].map((m) => (
                <button
                  key={m}
                  onClick={() => setForm({ ...form, payment: m })}
                  style={{
                    display: "flex", alignItems: "center", gap: 10, width: "100%",
                    padding: "11px 14px", marginBottom: 8, borderRadius: 10,
                    border: `1px solid ${form.payment === m ? G.crimson : G.border}`,
                    background: form.payment === m ? "rgba(178,30,53,0.05)" : "white",
                    cursor: "pointer", textAlign: "left", fontFamily: "'Manrope', sans-serif",
                    fontSize: 13.5, fontWeight: 600, color: G.textPrimary,
                  }}
                >
                  <span style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${form.payment === m ? G.crimson : G.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {form.payment === m && <span style={{ width: 8, height: 8, borderRadius: "50%", background: G.crimson }} />}
                  </span>
                  {m}
                </button>
              ))}
            </div>
            <button className="btn-primary" onClick={submit} style={{ width: "100%", padding: "14px", fontSize: 15 }}>
              Place Order (₹{total.toLocaleString("en-IN")})
            </button>
            <p style={{ textAlign: "center", fontSize: 11.5, color: G.textTertiary, margin: 0 }}>
              Demo checkout — no payment is processed on this site.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;