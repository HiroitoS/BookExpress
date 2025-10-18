import { useState, useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhastsappButton";

export default function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);
  const mobileMenuRef = useRef(null); // Ref que se pasará al Navbar

  // Actualiza la altura del menú cuando se abre/cierra
  useEffect(() => {
    if (mobileMenuRef.current) {
      setMenuHeight(menuOpen ? mobileMenuRef.current.scrollHeight : 0);
    }
  }, [menuOpen]);

  return (
    <div
      className="flex flex-col min-h-screen text-white relative"
      style={{
        background: "linear-gradient(to bottom, #000000, #7f1d1d, #000000)",
        backgroundAttachment: "fixed",
      }}
    >
      {/* 🔹 Navbar fijo y transparente */}
      <Navbar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        mobileMenuRef={mobileMenuRef} // Pasamos el ref al Navbar
      />

      {/* 🔹 Contenedor principal empujado dinámicamente */}
      <main
        className="flex-grow transition-all duration-500"
        style={{ marginTop: `${menuHeight}px` }}
      >
        <Outlet />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
