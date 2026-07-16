import { useState, useRef } from "react";
import G from "../constants/colors";
import Icon from "../components/Icon";

const CatalogAdmin = ({ products, setProducts, showToast, setViewProduct, editId, setEditId }) => {
  const blankForm = {
    name: "", category: "", family: "TVs", price: "", originalPrice: "", sku: "", desc: "", specs: "",
    stock: "In Stock", imageUrl: "", badge: null,
  };

  const existingProduct = editId ? products.find((p) => p.id === editId) : null;
  const [form, setForm] = useState(existingProduct ? { ...blankForm, ...existingProduct } : blankForm);
  const [showForm, setShowForm] = useState(!!editId);
  const fileRef = useRef();

  const handleSave = () => {
    if (!form.name || !form.price || !form.category) {
      showToast("Name, category & price required");
      return;
    }
    if (editId) {
      setProducts((prev) => prev.map((p) => (p.id === editId ? { ...p, ...form } : p)));
      showToast("Product updated!");
      setEditId(null);
    } else {
      setProducts((prev) => [...prev, { ...form, id: Date.now(), rating: 4.5 }]);
      showToast("Product added!");
    }
    setForm(blankForm);
    setShowForm(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm({ ...form, imageUrl: ev.target.result });
    reader.readAsDataURL(file);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast("Product deleted.");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: G.textPrimary }}>
          Catalog ({products.length})
        </h2>
        <button className="btn-primary" onClick={() => { setShowForm(!showForm); setEditId(null); setForm(blankForm); }} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, padding: "12px 24px" }}>
          <Icon name="plus" size={16} color="white" /> Add Product
        </button>
      </div>

      {showForm && (
        <div style={{ background: "white", border: `1px solid ${G.border}`, borderRadius: 16, padding: 32, marginBottom: 24 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 24, fontSize: 18, color: G.textPrimary }}>
            {editId ? "Edit Product" : "Add New Product"}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <input className="input-field" placeholder="Product Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="input-field" placeholder="Category (e.g. Flagship OLED) *" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <input className="input-field" placeholder="Price (e.g. 1,79,999) *" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            <input className="input-field" placeholder="Original Price (e.g. 2,49,999)" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} />
            <input className="input-field" placeholder="SKU" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
            <input className="input-field" placeholder="Badge (e.g. Flagship, Best Seller)" value={form.badge || ""} onChange={(e) => setForm({ ...form, badge: e.target.value || null })} />
            <select className="input-field" value={form.family} onChange={(e) => setForm({ ...form, family: e.target.value })}>
              <option value="TVs">TVs</option>
              <option value="Audio">Audio</option>
              <option value="Remotes">Remotes</option>
            </select>
            <select className="input-field" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })}>
              <option>In Stock</option>
              <option>Limited</option>
              <option>Pre-order</option>
              <option>Out of Stock</option>
            </select>
          </div>
          <textarea className="input-field" placeholder="Marketing Description" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} rows={3} style={{ width: "100%", marginBottom: 16, resize: "vertical" }} />
          <textarea className="input-field" placeholder="Technical Specifications" value={form.specs} onChange={(e) => setForm({ ...form, specs: e.target.value })} rows={2} style={{ width: "100%", marginBottom: 20, resize: "vertical" }} />

          <div style={{ border: `1px solid ${G.border}`, borderRadius: 12, padding: 20, marginBottom: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14, display: "flex", alignItems: "center", gap: 8, color: G.textPrimary }}>
              <Icon name="image" size={18} color={G.crimson} /> Product Image
            </div>
            <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ width: 140, height: 100, background: "linear-gradient(135deg,#F5F3F0,#EDE9E5)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${G.border}`, flexShrink: 0, overflow: "hidden" }}>
                {form.imageUrl ? (
                  <img src={form.imageUrl} alt="preview" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                ) : (
                  <Icon name="tv" size={32} color={G.textTertiary} />
                )}
              </div>
              <div style={{ flex: 1 }}>
                <input className="input-field" placeholder="Image URL (e.g. /product-images/image1.jpeg)" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} style={{ marginBottom: 10 }} />
                <input type="file" ref={fileRef} accept="image/*" style={{ display: "none" }} onChange={handleFileUpload} />
                <button className="btn-secondary" onClick={() => fileRef.current.click()} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, padding: "10px 20px" }}>
                  <Icon name="upload" size={14} color={G.crimson} /> Upload File
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button className="btn-primary" onClick={handleSave}>{editId ? "Update Product" : "Add Product"}</button>
            <button className="btn-secondary" onClick={() => { setShowForm(false); setEditId(null); }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ background: "white", border: `1px solid ${G.border}`, borderRadius: 14, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div style={{ width: 56, height: 40, background: "linear-gradient(135deg,#F5F3F0,#EDE9E5)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", cursor: "pointer" }} onClick={() => setViewProduct(p)}>
                      {p.imageUrl ? (
                        <img src={p.imageUrl} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                      ) : (
                        <Icon name="tv" size={20} color={G.textTertiary} />
                      )}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: G.textPrimary }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: G.textTertiary }}>{p.sku}</div>
                  </td>
                  <td style={{ color: G.textSecondary }}>{p.category}</td>
                  <td style={{ color: G.crimson, fontWeight: 700 }}>{p.price}</td>
                  <td>
                    <select className="stock-select" value={p.stock} onChange={(e) => {
                      setProducts((prev) => prev.map((pp) => (pp.id === p.id ? { ...pp, stock: e.target.value } : pp)));
                      showToast(`Stock updated to ${e.target.value}`);
                    }}>
                      <option>In Stock</option>
                      <option>Limited</option>
                      <option>Pre-order</option>
                      <option>Out of Stock</option>
                    </select>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button title="View" onClick={() => setViewProduct(p)} style={{ background: "none", border: "none", cursor: "pointer", padding: 6 }}>
                        <Icon name="eye" size={16} color={G.textSecondary} />
                      </button>
                      <button title="Edit" onClick={() => { setEditId(p.id); setForm({ ...blankForm, ...p }); setShowForm(true); window.scrollTo(0, 0); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 6 }}>
                        <Icon name="edit" size={16} color={G.crimson} />
                      </button>
                      <button title="Delete" onClick={() => handleDelete(p.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 6 }}>
                        <Icon name="trash" size={16} color="#EF4444" />
                      </button>
                    </div>
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

export default CatalogAdmin;
