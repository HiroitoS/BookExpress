import React from "react";

export default function CompanyInfo() {
  return (
    <section className="py-16 bg-gray-50 text-center">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-red-600 mb-6">Sobre Book Express</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          📚 <strong>Book Express</strong> es una empresa dedicada a la distribución y comercialización de textos escolares y material educativo en la región centro del Perú. 
          Trabajamos con las principales editoriales del país, garantizando calidad, puntualidad y atención personalizada a cada institución educativa.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Nos especializamos en brindar soluciones integrales para colegios y librerías, ofreciendo asesoría, logística y servicio postventa eficiente.
        </p>
      </div>
    </section>
  );
}
