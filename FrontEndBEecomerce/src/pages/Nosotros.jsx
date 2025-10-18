export default function Nosotros() {
    return (
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold text-red-600 mb-6">Sobre Nosotros</h1>
        <p className="text-gray-700 mb-8">
          En Book Express nos dedicamos a distribuir material educativo con calidad y puntualidad.
        </p>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="overflow-hidden rounded-lg shadow-md">
            <img src="/assets/team1.jpg" alt="Equipo" className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"/>
          </div>
          <div className="overflow-hidden rounded-lg shadow-md">
            <img src="/assets/store.jpg" alt="Local" className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"/>
          </div>
          <div className="overflow-hidden rounded-lg shadow-md">
            <img src="/assets/delivery.jpg" alt="Logística" className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"/>
          </div>
        </div>
      </section>
    );
  }
  