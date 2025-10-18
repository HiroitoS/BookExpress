import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import EditorialBooks from "./pages/EditorialBooks";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/editorial/:id" element={<EditorialBooks />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
      </Route>
    </Routes>
  );
}
