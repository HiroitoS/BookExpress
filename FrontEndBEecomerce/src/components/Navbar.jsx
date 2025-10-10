import React, { useState, useEffect } from "react";
import logo from "../assets/logoBookExpress.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Permitir cerrar con tecla ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* NAVBAR FIJO */}
      <header className="bg-black text-white fixed top-0 left-0 w-full z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo + Hamburguesa */}
          <div className="flex items-center gap-3">
            {/* Botón Hamburguesa */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
              className="md:hidden p-2 rounded hover:bg-white/10 transition"
            >
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Logo */}
            <img
              src={logo}
              alt="Logo Book Express"
              className="w-14 h-14 object-contain rounded"
            />
          </div>

          {/* Lema */}
          <h1 className="text-red-600 font-bold text-lg md:text-xl text-center flex-1">
            ¡Crecemos con los libros!
          </h1>

          {/* Menú en pantallas grandes */}
          <ul className="hidden md:flex space-x-8 text-lg font-medium">
            <li>
              <a href="#" className="hover:text-red-600 transition-colors duration-200">
                Inicio
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600 transition-colors duration-200">
                Catálogo
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600 transition-colors duration-200">
                Nosotros
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600 transition-colors duration-200">
                Contacto
              </a>
            </li>
          </ul>
        </div>
      </header>

      {/* DRAWER (Menú lateral IZQUIERDO) */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-black text-white transform transition-transform duration-300 z-50 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700">
          <div>
            <img src={logo} alt="Logo" className="w-12 h-12 object-contain rounded" />
            <p className="text-sm text-gray-300 mt-1">Crecemos con los libros</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded hover:bg-white/10 transition"
          >
            <svg
              className="w-6 h-6 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Links del menú */}
        <nav className="px-6 py-6">
          <ul className="flex flex-col gap-4 text-lg font-medium">
            <li>
              <a
                href="#"
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded hover:bg-red-600 transition-all duration-200"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded hover:bg-red-600 transition-all duration-200"
              >
                Catálogo
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded hover:bg-red-600 transition-all duration-200"
              >
                Nosotros
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded hover:bg-red-600 transition-all duration-200"
              >
                Contacto
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Overlay oscuro (cuando el menú está abierto) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
        />
      )}
    </>
  );
}
