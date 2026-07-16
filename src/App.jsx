import { useState, useEffect } from "react";
import "./styles/global.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import ProductModal from "./components/ProductModal";

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
    issue: "",
    desc: "",
  });

  const [adminAuth, setAdminAuth] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [adminView, setAdminView] = useState("dashboard");
  const [editId, setEditId] = useState(null);

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
    { id: "home", label: "Home", icon: "home" },
    { id: "about", label: "About", icon: "info" },
    { id: "products", label: "Products", icon: "tv" },
    { id: "support", label: "Support", icon: "support" },
    { id: "contact", label: "Contact", icon: "mail" },
  ];

  const adminNavItems = [
    ...navItems,
    { id: "admin", label: "Admin", icon: "admin" },
  ];

  const displayNavItems =
    activeTab === "admin" ? adminNavItems : navItems;

  const go = (tab) => {
    setActiveTab(tab);
    setViewProduct(null);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openProductPage = (product) => {
    setViewProduct(product);
    setActiveTab("product");
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
        />
      )}
    </>
  );
}
