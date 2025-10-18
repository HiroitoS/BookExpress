import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative text-white py-12 mt-20">
      {/* Fondo igual al MainLayout */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7f1d1d]/60 to-black"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Sección 1: Sobre nosotros */}
        <div>
          <h3 className="text-xl font-bold text-red-500 mb-4">
            Distribuidora Book Express
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            Promovemos el aprendizaje y la lectura en todo el país, ofreciendo
            textos escolares y materiales educativos de las mejores editoriales.
          </p>
        </div>

        {/* Sección 2: Enlaces útiles */}
        <div>
          <h3 className="text-xl font-bold text-red-500 mb-4">
            Enlaces útiles
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-red-400 transition">
                Inicio
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-400 transition">
                Catálogo
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-400 transition">
                Sobre nosotros
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-400 transition">
                Contáctanos
              </a>
            </li>
          </ul>
        </div>

        {/* Sección 3: Contáctanos */}
        <div>
          <h3 className="text-xl font-bold text-red-500 mb-4">Contáctanos</h3>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-400" /> Jr. Omar Yali 371,
              Huancayo
            </p>
            <p className="flex items-center gap-2">
              <FaPhoneAlt className="text-red-400" /> (+51) 934024129
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-red-400" /> contacto@book-express.pe
            </p>
          </div>

          {/* Redes sociales */}
          <div className="flex gap-4 mt-4">
            <a
              href="https://www.facebook.com/BookExpressHyo"
              target="_blank"
              rel="noreferrer"
              className="bg-white text-black p-3 rounded-full hover:bg-red-600 hover:text-white transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              className="bg-white text-black p-3 rounded-full hover:bg-red-600 hover:text-white transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noreferrer"
              className="bg-white text-black p-3 rounded-full hover:bg-red-600 hover:text-white transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Sección 4: Mapa */}
        <div>
          <h3 className="text-xl font-bold text-red-500 mb-4">Encuéntranos</h3>
          <div className="overflow-hidden rounded-xl shadow-lg border border-red-700/60">
            <iframe
              title="Book Express ubicación"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.675433182915!2d-75.21030452536564!3d-12.065838242255275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910e964954921773%3A0x871d6102ca631f86!2sDistribuidora%20Book%20Express!5e0!3m2!1ses-419!2spe!4v1760398809965!5m2!1ses-419!2spe"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="relative z-10 mt-10 pt-4 text-center text-sm text-gray-400 border-t border-white/10">
        © {new Date().getFullYear()}{" "}
        <span className="text-red-500 font-semibold">Book Express</span> — Todos
        los derechos reservados.
      </div>
    </footer>
  );
}
