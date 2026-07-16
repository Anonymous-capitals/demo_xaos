import { useState } from "react";
import G from "../constants/colors";
import Icon from "../components/Icon";
import Dashboard from "../admin/Dashboard";
import CatalogAdmin from "../admin/CatalogAdmin";

const AdminPage = ({
  adminAuth,
  setAdminAuth,
  adminPass,
  setAdminPass,
  adminView,
  setAdminView,
  products,
  setProducts,
  showToast,
  setViewProduct,
  editId,
  setEditId,
}) => {
  const [localPass, setLocalPass] = useState("");

  if (!adminAuth) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <div
          style={{
            background: "white",
            border: `1px solid ${G.border}`,
            borderRadius: 20,
            padding: 48,
            width: "100%",
            maxWidth: 420,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              background: `linear-gradient(135deg,${G.crimson},${G.gold})`,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <Icon name="admin" size={28} color="white" />
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 28,
              marginBottom: 6,
              fontWeight: 700,
            }}
          >
            Admin Access
          </h2>
          <p
            style={{
              color: G.textSecondary,
              marginBottom: 28,
              fontSize: 14,
            }}
          >
            Enter the admin password to continue
          </p>
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={localPass}
            onChange={(e) => setLocalPass(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (localPass === "xoas2026") {
                  setAdminAuth(true);
                  setAdminPass(localPass);
                  showToast("Welcome, Admin!");
                } else showToast("Incorrect password");
              }
            }}
            style={{ marginBottom: 16 }}
          />
          <button
            className="btn-primary"
            style={{ width: "100%" }}
            onClick={() => {
              if (localPass === "xoas2026") {
                setAdminAuth(true);
                setAdminPass(localPass);
                showToast("Welcome, Admin!");
              } else showToast("Incorrect password");
            }}
          >
            Login
          </button>
          <p
            style={{
              color: G.textTertiary,
              fontSize: 12,
              marginTop: 16,
            }}
          >
            Demo password: <strong style={{ color: G.textSecondary }}>xoas2026</strong>
          </p>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { id: "dashboard", icon: "dashboard", label: "Dashboard" },
    { id: "catalog", icon: "catalog", label: "Catalog" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "80vh", paddingTop: 72 }}>
      <div
        className="hide-mobile"
        style={{
          width: 220,
          background: "white",
          borderRight: `1px solid ${G.border}`,
          padding: "24px 16px",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: G.textTertiary,
            letterSpacing: 2,
            marginBottom: 12,
            padding: "0 8px",
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          Navigation
        </div>
        {sidebarItems.map((s) => (
          <div
            key={s.id}
            className={`admin-sidebar-item ${adminView === s.id ? "active" : ""}`}
            onClick={() => setAdminView(s.id)}
          >
            <Icon
              name={s.icon}
              size={18}
              color={adminView === s.id ? G.crimson : G.textSecondary}
            />
            {s.label}
          </div>
        ))}
        <div
          style={{
            marginTop: "auto",
            paddingTop: 24,
            borderTop: `1px solid ${G.border}`,
          }}
        >
          <button
            onClick={() => {
              setAdminAuth(false);
              setAdminPass("");
              setLocalPass("");
              showToast("Logged out");
            }}
            style={{
              width: "100%",
              padding: 10,
              background: G.offWhite,
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              color: G.textSecondary,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          padding: "32px 28px",
          background: G.offWhite,
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 24,
            flexWrap: "wrap",
          }}
        >
          {sidebarItems.map((s) => (
            <button
              key={s.id}
              className={`tab-btn ${adminView === s.id ? "active" : ""}`}
              onClick={() => setAdminView(s.id)}
              style={{ fontSize: 13 }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {adminView === "dashboard" && (
          <Dashboard
            products={products}
            setProducts={setProducts}
            showToast={showToast}
            setViewProduct={setViewProduct}
          />
        )}

        {adminView === "catalog" && (
          <CatalogAdmin
            products={products}
            setProducts={setProducts}
            showToast={showToast}
            setViewProduct={setViewProduct}
            editId={editId}
            setEditId={setEditId}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPage;
