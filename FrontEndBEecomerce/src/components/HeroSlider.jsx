import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeroSlider() {
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const [editoriales, setEditoriales] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBouncing, setIsBouncing] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  // 🔹 Cargar editoriales desde el backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/catalogo/editoriales/")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.content)) {
          setEditoriales(data.content);
        } else {
          setEditoriales([]);
        }
      })
      .catch((err) => {
        console.error("Error cargando editoriales:", err);
        setEditoriales([]);
      });
  }, []);

  // 🔹 Desplazamiento manual con rebote final
  const scroll = (direction) => {
    const slider = sliderRef.current;
    if (!slider || editoriales.length === 0) return;

    setIsUserInteracting(true);
    setTimeout(() => setIsUserInteracting(false), 3000);

    const itemWidth = 260;
    const scrollAmount = direction === "left" ? -itemWidth : itemWidth;
    const atEnd =
      slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5;

    if (atEnd && direction === "right") {
      setIsBouncing(true);
      slider.scrollBy({ left: 50, behavior: "smooth" });
      setTimeout(() => {
        slider.scrollBy({ left: -50, behavior: "smooth" });
        setIsBouncing(false);
      }, 300);
      return;
    }

    slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    setActiveIndex((prev) =>
      direction === "left"
        ? (prev - 1 + editoriales.length) % editoriales.length
        : (prev + 1) % editoriales.length
    );
  };

  // 🔹 Auto desplazamiento suave
  useEffect(() => {
    if (editoriales.length === 0) return;
    const slider = sliderRef.current;
    if (!slider) return;

    const interval = setInterval(() => {
      if (isUserInteracting) return;

      const newIndex = (activeIndex + 1) % editoriales.length;

      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: 260, behavior: "smooth" });
      }

      setActiveIndex(newIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex, editoriales, isUserInteracting]);

  // 🔹 Soporte táctil (móvil)
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let startX = 0;
    let scrollLeft = 0;

    const start = (e) => {
      setIsUserInteracting(true);
      startX = e.touches[0].pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const move = (e) => {
      const x = e.touches[0].pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.2;
      slider.scrollLeft = scrollLeft - walk;
    };

    const end = () => setTimeout(() => setIsUserInteracting(false), 1500);

    slider.addEventListener("touchstart", start);
    slider.addEventListener("touchmove", move);
    slider.addEventListener("touchend", end);

    return () => {
      slider.removeEventListener("touchstart", start);
      slider.removeEventListener("touchmove", move);
      slider.removeEventListener("touchend", end);
    };
  }, []);

  // 🔹 Ir directamente a un índice
  const goToIndex = (index) => {
    const slider = sliderRef.current;
    if (!slider) return;
    slider.scrollTo({ left: index * 260, behavior: "smooth" });
    setActiveIndex(index);
  };

  return (
    <section
      className="relative w-full bg-transparent py-12 border-none"
      style={{
        marginTop: "-4rem",
        zIndex: 0,
        overflow: "visible",
      }}
    >
      <div className="max-w-7xl mx-auto relative px-6 overflow-visible">
        <div className="relative flex items-center group">

          {/* 🔹 Flecha izquierda (solo desktop) */}
          <button
            onClick={() => scroll("left")}
            className="hidden sm:flex absolute -left-10 top-1/2 -translate-y-1/2 z-50 
              bg-black/40 backdrop-blur-sm p-3 rounded-full border border-white/10 
              text-white opacity-70 hover:opacity-100 hover:scale-110 
              transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.15)]"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* 🔹 Contenedor deslizante (scroll oculto) */}
          <div
            ref={sliderRef}
            className={`flex space-x-5 px-3 sm:px-8 overflow-x-auto scroll-smooth select-none transition-transform duration-300 no-scrollbar ${
              isBouncing ? "scale-[0.985]" : "scale-100"
            }`}
          >
            {editoriales.length > 0 ? (
              [...editoriales, ...editoriales].map((editorial, index) => (
                <div
                  key={`${editorial.id}-${index}`}
                  className="relative flex-none w-56 sm:w-60 md:w-64 h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden 
                  border border-white/10 shadow-[0_4px_20px_rgba(255,0,0,0.15)] 
                  hover:shadow-red-600/40 transform transition-all duration-500 group/card cursor-pointer"
                >
                  <img
                    src={
                      editorial.logo
                        ? `http://127.0.0.1:8000${editorial.logo}`
                        : "/src/assets/default.jpg"
                    }
                    alt={editorial.nombre}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover/card:opacity-100 transition-all duration-500 flex flex-col items-center justify-center">
                    <h3 className="text-white text-lg font-semibold mb-3 text-center drop-shadow-md">
                      {editorial.nombre}
                    </h3>
                    <button
                      onClick={() => navigate(`/editorial/${editorial.id}`)}
                      className="bg-gradient-to-r from-red-700 to-red-900 text-white px-4 py-2 rounded-lg hover:from-red-800 hover:to-red-950 transition-colors"
                    >
                      Ver más
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white text-lg px-6">Cargando editoriales...</p>
            )}
          </div>

          {/* 🔹 Flecha derecha (solo desktop) */}
          <button
            onClick={() => scroll("right")}
            className="hidden sm:flex absolute -right-10 top-1/2 -translate-y-1/2 z-50 
              bg-black/40 backdrop-blur-sm p-3 rounded-full border border-white/10 
              text-white opacity-70 hover:opacity-100 hover:scale-110 
              transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.15)]"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* 🔹 Indicadores inferiores */}
        <div className="flex justify-center mt-6 space-x-2">
          {editoriales.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index === activeIndex
                  ? "bg-red-500 scale-125 shadow-[0_0_10px_rgba(255,0,0,0.6)]"
                  : "bg-gray-500 hover:bg-gray-400"
              }`}
              aria-label={`Ir a ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
