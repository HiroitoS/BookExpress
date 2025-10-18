import React from "react";
import { Link, NavLink } from "react-router-dom";
import logoBookExpress from "../assets/logoBookExpress.png";
import { useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar({ menuOpen, setMenuOpen, mobileMenuRef }) {
  const [scrollAmount, setScrollAmount] = React.useState(0);

  // Efecto scroll como en tu código original
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const normalized = Math.min(y / 200, 1);
      setScrollAmount(normalized);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav
      className={`w-full fixed top-0 z-50 transition-all duration-500 ${
        scrollAmount > 0 ? "shadow-lg border-b border-red-900/40" : "shadow-none border-none"
      }`}
      style={{
        backgroundColor: `rgba(0,0,0,${0.7 * scrollAmount})`,
        WebkitBackdropFilter: `blur(${8 * scrollAmount}px)`,
        backdropFilter: `blur(${8 * scrollAmount}px)`,
        paddingTop: `${0.75 - 0.25 * scrollAmount}rem`,
        paddingBottom: `${0.75 - 0.25 * scrollAmount}rem`,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center text-white transition-all duration-300 ease-in-out">
        {/* LOGO + NOMBRE */}
        <Link to="/" className="flex items-center space-x-3 group">
          <img
            src={logoBookExpress}
            alt="Book Express"
            className="object-contain transition-all duration-300 ease-in-out"
            style={{
              height: `${64 - 16 * scrollAmount}px`,
              width: "auto",
            }}
          />
          <div
            className="flex flex-col leading-tight transition-all duration-300 ease-in-out"
            style={{
              transform: `scale(${1 - 0.05 * scrollAmount})`,
            }}
          >
            <span className="text-2xl font-bold tracking-wide text-white group-hover:text-red-400 transition">
              Book Express
            </span>
            {scrollAmount === 0 && (
              <span className="text-sm italic text-gray-300">
                ¡Crecemos con los libros!
              </span>
            )}
          </div>
        </Link>

        {/* LINKS DE ESCRITORIO */}
        <div className="hidden md:flex space-x-8 text-lg font-medium">
          {[
            { name: "Inicio", path: "/" },
            { name: "Catálogo", path: "/catalogo" },
            { name: "Nosotros", path: "/nosotros" },
            { name: "Contáctenos", path: "/contacto" },
          ].map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `hover:text-red-400 transition duration-300 ${
                  isActive ? "text-red-400" : ""
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* BOTÓN MENÚ MÓVIL */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl focus:outline-none z-50"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* LINKS MÓVILES tipo acordeón */}
      <div
        ref={mobileMenuRef} // <- ahora el MainLayout puede medir la altura real
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(127,29,29,0.9))",
          backdropFilter: "blur(6px)",
        }}
      >
        <div className="flex flex-col text-center space-y-4 py-4">
          {[
            { name: "Inicio", path: "/" },
            { name: "Catálogo", path: "/catalogo" },
            { name: "Nosotros", path: "/nosotros" },
            { name: "Contáctenos", path: "/contacto" },
          ].map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `font-medium text-lg hover:text-red-300 transition duration-300 ${
                  isActive ? "text-red-400" : ""
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
