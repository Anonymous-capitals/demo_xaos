import { useState, useEffect, useRef } from "react";
import "./styles/global.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import ProductModal from "./components/ProductModal";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import Icon from "./components/Icon";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SupportPage from "./pages/SupportPage";
import ContactPage from "./pages/ContactPage";
import ProductsPage from "./pages/ProductsPage";
import AdminPage from "./pages/AdminPage";
import ProductPage from "./pages/ProductPage";

import initProducts from "./data/products";

const useScrollReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [productsFamily, setProductsFamily] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [toast, setToast] = useState(null);
  const [searchQ, setSearchQ] = useState("");
  const [products, setProducts] = useState(initProducts);
  const [viewProduct, setViewProduct] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    msg: "",
  });
  const [support, setSupport] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    modelId: "",
    serial: "",
    purchaseDate: "",
    issue: "",
    desc: "",
  });

  const [adminAuth, setAdminAuth] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [adminView, setAdminView] = useState("dashboard");
  const [editId, setEditId] = useState(null);

  // Cart (in-memory, demo only)
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const priceNum = (s) => parseFloat(String(s).replace(/[₹,]/g, ""));
  const addToCart = (p, qty = 1) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.product.id === p.id);
      return ex
        ? prev.map((i) => (i.product.id === p.id ? { ...i, qty: i.qty + qty } : i))
        : [...prev, { product: p, qty }];
    });
  };
  const setCartQty = (id, qty) => {
    setCart((prev) =>
      qty < 1 ? prev.filter((i) => i.product.id !== id)
        : prev.map((i) => (i.product.id === id ? { ...i, qty } : i))
    );
  };
  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((i) => i.product.id !== id));
  const cartCount = cart.reduce((n, i) => n + i.qty, 0);
  const cartTotal = cart.reduce((n, i) => n + priceNum(i.product.price) * i.qty, 0);
  const orderNow = (p, qty = 1) => {
    addToCart(p, qty);
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  useScrollReveal();

  const showToast = (msg) => {
    setToast(msg);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQ.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQ.toLowerCase()) ||
      p.family.toLowerCase().includes(searchQ.toLowerCase())
  );

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "products", label: "Products" },
    { id: "support", label: "Support" },
    { id: "contact", label: "Contact" },
  ];

  const adminNavItems = [
    ...navItems,
    { id: "admin", label: "Admin" },
  ];

  const displayNavItems =
    activeTab === "admin" ? adminNavItems : navItems;

  const applyTab = (tab, family = null) => {
    setViewProduct(null);
    setMobileMenu(false);
    setProductsFamily(family);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const go = (tab, family) => {
    // Each tab jump writes browser history so Back walks through the site instead of exiting.
    const h = tab === "home" ? "#/" : `#/${tab}`;
    if (location.hash !== h) location.hash = h;
    applyTab(tab, family ?? null);
  };

  const openProductPage = (product) => {
    if (product && product.id != null) {
      const h = `#/product/${encodeURIComponent(product.id)}`;
      if (location.hash !== h) location.hash = h;
    }
    setViewProduct(product);
    setActiveTab("product");
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const bootRef = useRef(false);
  useEffect(() => {
    const onHash = () => {
      const parts = location.hash.replace(/^#\/?/, "").split("/");
      const tab = parts[0] || "home";
      const pid = parts[1];
      if (tab === "product" && pid) {
        const p = products.find((x) => String(x.id) === decodeURIComponent(pid));
        if (p) {
          setViewProduct(p);
          setActiveTab("product");
          setMobileMenu(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        setViewProduct(null);
        setActiveTab("products");
      } else {
        setViewProduct(null);
        setActiveTab(tab);
      }
      setMobileMenu(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    if (!bootRef.current) {
      bootRef.current = true;
      onHash();
    }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [products]);

  const handleViewProduct = (product) => {
    setViewProduct(product);
  };

  const pages = {
    home: (
      <HomePage
        go={go}
        filteredProducts={filteredProducts}
        searchQ={searchQ}
        setSearchQ={setSearchQ}
        setViewProduct={handleViewProduct}
        showToast={showToast}
      />
    ),
    about: <AboutPage />,
    support: (
      <SupportPage
        products={products}
        support={support}
        setSupport={setSupport}
        showToast={showToast}
        openFaq={openFaq}
        setOpenFaq={setOpenFaq}
      />
    ),
    contact: (
      <ContactPage
        contact={contact}
        setContact={setContact}
        showToast={showToast}
      />
    ),
    products: (
      <ProductsPage
        filteredProducts={filteredProducts}
        searchQ={searchQ}
        setSearchQ={setSearchQ}
        setViewProduct={handleViewProduct}
        showToast={showToast}
        initialFamily={productsFamily}
        onAddToCart={addToCart}
        onOrderNow={orderNow}
      />
    ),
    admin: (
      <AdminPage
        adminAuth={adminAuth}
        setAdminAuth={setAdminAuth}
        adminPass={adminPass}
        setAdminPass={setAdminPass}
        adminView={adminView}
        setAdminView={setAdminView}
        products={products}
        setProducts={setProducts}
        showToast={showToast}
        setViewProduct={handleViewProduct}
        editId={editId}
        setEditId={setEditId}
      />
    ),
    product: (
      <ProductPage
        product={viewProduct}
        products={products}
        go={go}
        setViewProduct={handleViewProduct}
        showToast={showToast}
        onAddToCart={addToCart}
        onOrderNow={orderNow}
      />
    ),
  };

  return (
    <>
      <Navbar
        activeTab={activeTab === "product" ? "products" : activeTab}
        go={go}
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
        navItems={displayNavItems}
        products={products}
        searchQ={searchQ}
        setSearchQ={setSearchQ}
        openProductPage={openProductPage}
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
      />
      <main style={{ minHeight: "70vh" }}>{pages[activeTab]}</main>
      <Footer navItems={navItems} go={go} />
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
      {viewProduct && activeTab !== "product" && (
        <ProductModal
          product={viewProduct}
          allProducts={products}
          onClose={() => setViewProduct(null)}
          setViewProduct={openProductPage}
          showToast={showToast}
          onAddToCart={addToCart}
          onOrderNow={orderNow}
        />
      )}

      <CartDrawer
        open={cartOpen}
        cart={cart}
        total={cartTotal}
        onClose={() => setCartOpen(false)}
        setQty={setCartQty}
        remove={removeFromCart}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
      />

      {checkoutOpen && (
        <CheckoutModal
          cart={cart}
          total={cartTotal}
          showToast={showToast}
          onClose={() => setCheckoutOpen(false)}
          onPlace={() => {
            setCart([]);
            setCheckoutOpen(false);
            showToast("Order placed! We'll call you to confirm.");
          }}
        />
      )}

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/919339770330?text=Hi%20XOAS%20%E2%80%94%20I%20have%20a%20question."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with XOAS on WhatsApp"
        className="wa-float"
      >
        <Icon name="whatsapp" size={28} color="white" />
      </a>
    </>
  );
}
