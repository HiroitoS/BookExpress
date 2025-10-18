import React from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton({ mensajePersonalizado }) {
  const numero = "51934024129";
  const mensaje =
    mensajePersonalizado || "Hola, quiero contactarlos.";

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#1ebe57] transition-all duration-300 animate-pulse-once"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
