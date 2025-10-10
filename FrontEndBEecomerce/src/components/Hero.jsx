import React from "react";

const imagenes = [
  "/src/assets/santillana.jpg",
  "/src/assets/IA.png",
  "/src/assets/khalamos.png",
  "/src/assets/thema.png",
  "/src/assets/bruño.png"
];

export default function HeroSlider() {
    return (
      <section className="bg-black text-white py-12 px-6 md:px-16">
        {/* Título */}
        <h2 className="text-4xl font-bold mb-8 mt-10">
          <span className="text-white">Editoriales</span>
        </h2>
  
        {/* Contenedor del carrusel */}
        <div className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4">
          {imagenes.map((img, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-64 rounded-xl overflow-hidden relative group shadow-lg bg-gray-900"
            >
              {/* Imagen ajustada sin distorsión */}
              <div className="w-full aspect-[3/4] overflow-hidden">
                <img
                  src={img}
                  alt={`Libro ${index + 1}`}
                  className="w-full h-full object-contain object-center bg-black transition-transform duration-500 group-hover:scale-105"
                />
              </div>
  
              {/* Efecto hover */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-md font-semibold">
                  Ver más
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }