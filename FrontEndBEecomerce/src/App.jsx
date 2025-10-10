import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      {/* Contenido principal con margen superior para no quedar debajo del navbar */}
      <Hero />
      
    </>
  );
}
