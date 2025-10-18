import React from "react";

export default function GoogleMap() {
  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📍 Encuéntranos</h2>

        <div className="overflow-hidden rounded-2xl shadow-lg">
          <iframe
            title="Distribuidora Book Express ubicación"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.675433182915!2d-75.21030452536564!3d-12.065838242255275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910e964954921773%3A0x871d6102ca631f86!2sDistribuidora%20Book%20Express!5e0!3m2!1ses-419!2spe!4v1760398809965!5m2!1ses-419!2spe"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
