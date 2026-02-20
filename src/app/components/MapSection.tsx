export function MapSection() {
  return (
    <section id="contacto" className="bg-gray-100">
      {/* Google Maps Embed */}
      <div className="w-full h-[500px] md:h-[600px] relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.5799999999997!2d-98.2436!3d19.0436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0e3e3e3e3e3%3A0x1234567890abcdef!2sAnillo%20Perif.%20Ecol%C3%B3gico%2C%20Puebla%2C%20M%C3%A9xico!5e0!3m2!1ses!2smx!4v1234567890123!5m2!1ses!2smx"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación PREGAT"
        ></iframe>
      </div>
    </section>
  );
}
