import G from "../constants/colors";
import Icon from "../components/Icon";

const Dashboard = ({ products, setProducts, showToast, setViewProduct }) => {
  const dashStats = [
    { label: "Total Products", val: products.length, sub: "+3 this month", color: G.crimson },
    { label: "Revenue (MTD)", val: "3.2L", sub: "+18% vs last month", color: "#059669" },
    { label: "In Stock", val: products.filter(p => p.stock === "In Stock").length, sub: "Available now", color: "#2563EB" },
    { label: "Limited / Pre-order", val: products.filter(p => p.stock === "Limited" || p.stock === "Pre-order").length, sub: "Low availability", color: "#D97706" },
  ];

  return (
    <div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, marginBottom: 24, color: G.textPrimary }}>
        Dashboard
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 20, marginBottom: 32 }}>
        {dashStats.map((s) => (
          <div key={s.label} className="card-hover" style={{ background: "white", border: `1px solid ${G.border}`, borderRadius: 14, padding: 24 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: s.color, lineHeight: 1, fontWeight: 700 }}>{s.val}</div>
            <div style={{ fontWeight: 600, fontSize: 14, marginTop: 6, color: G.textPrimary }}>{s.label}</div>
            <div style={{ fontSize: 12, color: G.textTertiary, marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "white", border: `1px solid ${G.border}`, borderRadius: 14, overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${G.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontWeight: 700, fontSize: 16, color: G.textPrimary }}>Recent Products</span>
          <span style={{ fontSize: 13, color: G.textTertiary }}>Click stock dropdown to update instantly</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>SKU</th>
                <th>Price</th>
                <th>Update Stock</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 6).map((p) => (
                <tr key={p.id}>
                  <td>
                    <div style={{ width: 48, height: 36, background: "linear-gradient(135deg,#F5F3F0,#EDE9E5)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      {p.imageUrl ? (
                        <img src={p.imageUrl} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                      ) : (
                        <Icon name="tv" size={18} color={G.textTertiary} />
                      )}
                    </div>
                  </td>
                  <td style={{ fontWeight: 600, maxWidth: 180, color: G.textPrimary }}>{p.name}</td>
                  <td style={{ color: G.textTertiary, fontSize: 13 }}>{p.sku}</td>
                  <td style={{ color: G.crimson, fontWeight: 700 }}>{p.price}</td>
                  <td>
                    <select
                      className="stock-select"
                      value={p.stock}
                      onChange={(e) => {
                        setProducts((prev) => prev.map((pp) => (pp.id === p.id ? { ...pp, stock: e.target.value } : pp)));
                        showToast(`"${p.name}" → ${e.target.value}`);
                      }}
                    >
                      <option>In Stock</option>
                      <option>Limited</option>
                      <option>Pre-order</option>
                      <option>Out of Stock</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => setViewProduct(p)}
                      style={{ background: "none", border: `1px solid ${G.border}`, borderRadius: 6, padding: "6px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: G.textSecondary }}
                    >
                      <Icon name="eye" size={13} color={G.textSecondary} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
