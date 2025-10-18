import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function EditorialBooks() {
  const { id } = useParams();
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/catalogo/libros/?editorial=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLibros(data?.results?.content || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando libros:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-transparent text-white">
        <h2 className="text-2xl font-semibold text-red-300 animate-pulse drop-shadow-lg">
          Cargando libros de la editorial...
        </h2>
      </div>
    );
  }

  if (libros.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-transparent text-white">
        <h2 className="text-xl font-semibold text-gray-300">
          No hay libros disponibles para esta editorial.
        </h2>
      </div>
    );
  }

  return (
    <section className="px-6 py-12 bg-transparent min-h-screen text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10 text-red-400 drop-shadow-lg">
          {libros[0]?.editorial}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {libros.map((libro) => (
            <div
              key={libro.id}
              className="bg-black/40 backdrop-blur-sm rounded-2xl border border-red-900/40 shadow-lg hover:shadow-red-700/30 transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
            >
              <img
                src={`http://127.0.0.1:8000${libro.portada}`}
                alt={libro.titulo}
                className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-red-300 mb-2">
                  {libro.titulo}
                </h3>
                <p className="text-sm text-gray-300">
                  📘 Editorial: <span className="text-red-400">{libro.editorial}</span>
                </p>
                <p className="text-sm text-gray-300">
                  🎓 Nivel: {libro.nivel || "No especificado"}
                </p>
                <p className="text-sm text-gray-400 line-clamp-3">
                  ✍️ {libro.descripcion}
                </p>
                <p className="text-lg font-bold text-red-400 mt-3">
                  S/. {libro.pvp}
                </p>

                <div className="mt-4 text-center">
                  <Link
                    to={`/libro/${libro.id}`}
                    className="inline-block bg-red-600 text-white px-5 py-2 rounded-full hover:bg-red-700 transition-colors duration-300 shadow-md"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
