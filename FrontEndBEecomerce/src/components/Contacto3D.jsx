import React, { useState } from "react";
import { FaBook, FaChalkboardTeacher, FaEnvelope } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

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
    "Libro no encontrado": {
      color: "text-red-600",
      icon: <FaBook />,
      titulo: "Libro no encontrado"
    },
    "Interesado propuesta pedagógica": {
      color: "text-red-500",
      icon: <FaChalkboardTeacher />,
      titulo: "Interesado propuesta pedagógica"
    },
    "Otro": { color: "text-red-400", icon: <FaEnvelope />, titulo: "Otro" },
  };

  const inputVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } }
  };

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div
      className="flex justify-center items-start min-h-screen p-6 pt-32"
      style={{ background: "linear-gradient(to bottom, #000000, #7f1d1d, #000000)" }}
    >
      <div className="relative w-full max-w-md perspective" style={{ perspective: "1200px" }}>
        <motion.div
          className="bg-black/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl hover:shadow-red-700/50 transition-all duration-500"
          style={{ transform: `rotateY(${girado}deg)` }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="flex items-center justify-center mb-4 space-x-3"
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            key={tipo}
          >
            <span className={`text-3xl ${tipoConfig[tipo].color} animate-pulse`}>
              {tipoConfig[tipo].icon}
            </span>
            <h2 className={`text-xl font-bold ${tipoConfig[tipo].color} text-center`}>
              {tipoConfig[tipo].titulo}
            </h2>
          </motion.div>

          <select
            className="w-full mb-6 p-3 rounded-md border border-red-600 bg-black text-white focus:ring-2 focus:ring-red-500 transition"
            value={tipo}
            onChange={handleChangeTipo}
          >
            <option value="Libro no encontrado">Libro no encontrado</option>
            <option value="Interesado propuesta pedagógica">Interesado propuesta pedagógica</option>
            <option value="Otro">Otro</option>
          </select>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div variants={inputVariants} initial="hidden" animate="visible" exit="exit" key="nombre">
                <label className="mb-1 text-red-400 font-medium">Nombre completo</label>
                <input
                  name="nombre"
                  placeholder="Ingresa tu nombre completo"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-red-600 bg-black text-white focus:ring-2 focus:ring-red-500 focus:shadow-lg focus:shadow-red-700/50 transition"
                />
                {errors.nombre && <span className="text-red-400 text-sm mt-1">{errors.nombre}</span>}
              </motion.div>

              <motion.div variants={inputVariants} initial="hidden" animate="visible" exit="exit" key="correo">
                <label className="mb-1 text-red-400 font-medium">Correo electrónico</label>
                <input
                  name="correo"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={formData.correo}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-red-600 bg-black text-white focus:ring-2 focus:ring-red-500 focus:shadow-lg focus:shadow-red-700/50 transition"
                />
                {errors.correo && <span className="text-red-400 text-sm mt-1">{errors.correo}</span>}
              </motion.div>

              <motion.div variants={inputVariants} initial="hidden" animate="visible" exit="exit" key="telefono">
                <label className="mb-1 text-red-400 font-medium">Teléfono</label>
                <input
                  name="telefono"
                  placeholder="Ingresa tu teléfono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-red-600 bg-black text-white focus:ring-2 focus:ring-red-500 focus:shadow-lg focus:shadow-red-700/50 transition"
                />
                {errors.telefono && <span className="text-red-400 text-sm mt-1">{errors.telefono}</span>}
              </motion.div>

              {tipo === "Libro no encontrado" && (
                <motion.div variants={inputVariants} initial="hidden" animate="visible" exit="exit" key="libro_solicitado">
                  <label className="mb-1 text-red-400 font-medium">Libro que buscaste</label>
                  <input
                    name="libro_solicitado"
                    placeholder="Nombre del libro"
                    value={formData.libro_solicitado}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md border border-red-600 bg-black text-white focus:ring-2 focus:ring-red-500 focus:shadow-lg focus:shadow-red-700/50 transition"
                  />
                  {errors.libro_solicitado && <span className="text-red-400 text-sm mt-1">{errors.libro_solicitado}</span>}
                </motion.div>
              )}

              {tipo === "Interesado propuesta pedagógica" && (
                <motion.div variants={inputVariants} initial="hidden" animate="visible" exit="exit" key="colegio">
                  <label className="mb-1 text-red-400 font-medium">Nombre del colegio</label>
                  <input
                    name="colegio"
                    placeholder="Nombre del colegio"
                    value={formData.colegio}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md border border-red-600 bg-black text-white focus:ring-2 focus:ring-red-500 focus:shadow-lg focus:shadow-red-700/50 transition"
                  />
                  {errors.colegio && <span className="text-red-400 text-sm mt-1">{errors.colegio}</span>}
                </motion.div>
              )}

              <motion.div variants={inputVariants} initial="hidden" animate="visible" exit="exit" key="mensaje">
                <label className="mb-1 text-red-400 font-medium">Mensaje adicional</label>
                <textarea
                  name="mensaje"
                  placeholder="Ingresa tu mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-red-600 bg-black text-white focus:ring-2 focus:ring-red-500 focus:shadow-lg focus:shadow-red-700/50 transition"
                />
                {errors.mensaje && <span className="text-red-400 text-sm mt-1">{errors.mensaje}</span>}
              </motion.div>
            </AnimatePresence>

            <motion.button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 transition text-white font-bold py-3 rounded-md shadow-md hover:shadow-red-700/50"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Enviar
            </motion.button>

            <AnimatePresence>
              {enviado && (
                <motion.p
                  className="mt-4 text-green-400 font-semibold text-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5 }}
                >
                  ¡Mensaje enviado! Nos comunicaremos pronto contigo.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
