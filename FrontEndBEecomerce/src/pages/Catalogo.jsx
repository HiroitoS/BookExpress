import HeroSlider from "../components/HeroSlider";

export default function Catalogo() {
  return (
    <section className="bg-transparent text-white min-h-screen">
      {/* Encabezado */}
      <div className="text-center mt-28 mb-10 px-6">
        <h1 className="text-4xl font-bold text-red-400 mb-3 drop-shadow-md">
          Catálogo de Editoriales
        </h1>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Explora nuestras editoriales y descubre los mejores libros educativos.
        </p>
      </div>

      {/* HeroSlider */}
      <div className="max-w-6xl mx-auto">
        <HeroSlider />
      </div>

      {/* Sección adicional compacta */}
      <div className="text-center text-gray-300 py-10 px-6 bg-black/10">
        <h2 className="text-2xl font-semibold text-red-400 mb-3">
          ¿Por qué elegir nuestros libros?
        </h2>
        <p className="max-w-3xl mx-auto text-gray-300 leading-relaxed">
          Trabajamos con las principales editoriales del país para ofrecer
          materiales educativos de alta calidad, adaptados a las necesidades
          de cada institución educativa y cliente.
        </p>
      </div>
    </section>
  );
}
