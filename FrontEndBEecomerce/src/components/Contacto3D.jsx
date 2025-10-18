import React, { useState } from "react";
import { FaBook, FaChalkboardTeacher, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion"; // Necesario para animaciones

export default function Contacto3D() {
  const [tipo, setTipo] = useState("Libro no encontrado");
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    colegio: "",
    libro_solicitado: "",
    mensaje: ""
  });
  const [errors, setErrors] = useState({});
  const [enviado, setEnviado] = useState(false);
  const [girado, setGirado] = useState(0);
  const [rebote, setRebote] = useState(false);

  const handleChangeTipo = (e) => {
    setGirado(girado + 360);
    setTipo(e.target.value);
    setFormData({
      nombre: "",
      correo: "",
      telefono: "",
      colegio: "",
      libro_solicitado: "",
      mensaje: ""
    });
    setErrors({});
    setRebote(true);
    setTimeout(() => setRebote(false), 300); // rebote de 0.3s
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre) newErrors.nombre = "Ingresa tu nombre";
    if (!formData.correo) newErrors.correo = "Ingresa tu correo";
    if (!formData.telefono) newErrors.telefono = "Ingresa tu teléfono";
    if (!formData.mensaje) newErrors.mensaje = "Ingresa tu mensaje";
    if (tipo === "Libro no encontrado" && !formData.libro_solicitado)
      newErrors.libro_solicitado = "Ingresa el libro que buscaste";
    if (tipo === "Interesado propuesta pedagógica" && !formData.colegio)
      newErrors.colegio = "Ingresa el nombre del colegio";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/catalogo/contacto/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo_contacto: tipo, ...formData })
      });
      if (res.ok) {
        setEnviado(true);
        setFormData({
          nombre: "",
          correo: "",
          telefono: "",
          colegio: "",
          libro_solicitado: "",
          mensaje: ""
        });
        setTimeout(() => setEnviado(false), 4000);
      }
    } catch (err) {
      console.error("Error enviando el formulario:", err);
    }
  };

  const tipoConfig = {
    "Libro no encontrado": { color: "text-red-600", icon: <FaBook />, titulo: "Libro no encontrado" },
    "Interesado propuesta pedagógica": { color: "text-red-500", icon: <FaChalkboardTeacher />, titulo: "Interesado propuesta pedagógica" },
    "Otro": { color: "text-red-400", icon: <FaEnvelope />, titulo: "Otro" },
  };

  return (
    <div
      className="flex justify-center items-start min-h-screen p-6 pt-32"
      style={{ background: "linear-gradient(to bottom, #000000, #7f1d1d, #000000)" }}
    >
      <div className="relative w-full max-w-md perspective" style={{ perspective: "1200px" }}>
        <motion.div
          className="bg-black/70 backdrop-blur-lg rounded-2xl p-6 shadow-2xl transition-transform duration-500 hover:scale-105 hover:shadow-red-700/70"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: girado }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-center mb-4 space-x-3">
            <motion.span
              className={`text-3xl ${tipoConfig[tipo].color}`}
              animate={{ y: rebote ? -10 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {tipoConfig[tipo].icon}
            </motion.span>
            <h2 className={`text-xl font-bold ${tipoConfig[tipo].color} text-center`}>
              {tipoConfig[tipo].titulo}
            </h2>
          </div>

          <select
            className="w-full mb-6 p-3 rounded-md border border-red-600 bg-black text-white focus:ring-2 focus:ring-red-500"
            value={tipo}
            onChange={handleChangeTipo}
          >
            <option value="Libro no encontrado">No encontré el libro que buscaba</option>
            <option value="Interesado propuesta pedagógica">Interesado propuesta pedagógica</option>
            <option value="Otro">Otro</option>
          </select>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="mb-1 text-red-400 font-medium">Nombre completo</label>
              <input
                name="nombre"
                placeholder="Ingresa tu nombre completo"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-red-600 bg-black text-white focus:ring-2 focus:ring-red-500"
              />
              {errors.nombre && <span className="text-red-400 text-sm mt-1">{errors.nombre}</span>}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-red-400 font-medium">Correo electrónico</label>
              <input
                name="correo"
                type="email"
                placeholder="correo@ejemplo.com"
                value={formData.correo}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-red-600 bg-black text-white focus:ring-2 focus:ring-red-500"
              />
              {errors.correo && <span className="text-red-400 text-sm mt-1">{errors.correo}</span>}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-red-400 font-medium">Teléfono</label>
              <input
                name="telefono"
                placeholder="Ingresa tu teléfono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-red-600 bg-black text-white focus:ring-2 focus:ring-red-500"
              />
              {errors.telefono && <span className="text-red-400 text-sm mt-1">{errors.telefono}</span>}
            </div>

            {tipo === "Libro no encontrado" && (
              <div className="flex flex-col">
                <label className="mb-1 text-red-400 font-medium">Libro que buscaste</label>
                <input
                  name="libro_solicitado"
                  placeholder="Nombre del libro"
                  value={formData.libro_solicitado}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-red-600 bg-black text-white focus:ring-2 focus:ring-red-500"
                />
                {errors.libro_solicitado && <span className="text-red-400 text-sm mt-1">{errors.libro_solicitado}</span>}
              </div>
            )}

            {tipo === "Interesado propuesta pedagógica" && (
              <div className="flex flex-col">
                <label className="mb-1 text-red-400 font-medium">Nombre del colegio</label>
                <input
                  name="colegio"
                  placeholder="Nombre del colegio"
                  value={formData.colegio}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-red-600 bg-black text-white focus:ring-2 focus:ring-red-500"
                />
                {errors.colegio && <span className="text-red-400 text-sm mt-1">{errors.colegio}</span>}
              </div>
            )}

            <div className="flex flex-col">
              <label className="mb-1 text-red-400 font-medium">Mensaje adicional</label>
              <textarea
                name="mensaje"
                placeholder="Ingresa tu mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-red-600 bg-black text-white focus:ring-2 focus:ring-red-500"
              />
              {errors.mensaje && <span className="text-red-400 text-sm mt-1">{errors.mensaje}</span>}
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 transition text-white font-bold py-3 rounded-md shadow-md hover:shadow-red-700/50"
            >
              Enviar
            </button>

            {enviado && (
              <p className="mt-4 text-green-400 font-semibold text-center animate-pulse">
                ¡Mensaje enviado! Nos comunicaremos pronto contigo.
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}
