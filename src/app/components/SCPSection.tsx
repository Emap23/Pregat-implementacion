import { motion } from 'motion/react';

export function SCPSection() {
  return (
    <section id="scp" className="relative min-h-screen flex items-center overflow-hidden bg-[#1a2847]">
      {/* Background Image - Security Officer */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1727884032260-6bf73ba803b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMG9mZmljZXIlMjBwb2xpY2UlMjB1bmlmb3JtJTIwbGF0aW5vfGVufDF8fHx8MTc3MTIyNDQwMnww&ixlib=rb-4.1.0&q=80&w=1080)',
            backgroundSize: 'cover',
            backgroundPosition: 'left center',
          }}
        ></div>
      </div>

      {/* Grid Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-12 h-0.5 bg-red-600"></div>
            <p className="text-white/80 text-xs sm:text-sm uppercase tracking-wide">
              Soluciones Tecnológicas en Seguridad
            </p>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            Sistema de Control Policial (SCP)
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/80 text-base md:text-lg leading-relaxed mb-8 md:mb-10"
          >
            El <span className="font-semibold text-white">Sistema de Control Policial (SCP)</span> automatiza la 
            inteligencia operativa y la gestión de alertas en tiempo 
            real, optimizando el control del <span className="font-semibold text-white">estado de fuerza</span>.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row flex-wrap gap-4"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full uppercase text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Conocer más
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent hover:bg-white/10 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border-2 border-white/30 hover:border-white/50 uppercase text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300"
            >
              Contáctanos
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Image - Security Officer */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:block"
        >
          <img 
            src="https://images.unsplash.com/photo-1727884032260-6bf73ba803b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMG9mZmljZXIlMjBwb2xpY2UlMjB1bmlmb3JtJTIwbGF0aW5vfGVufDF8fHx8MTc3MTIyNDQwMnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Oficial de Seguridad"
            className="w-full h-auto object-cover rounded-lg shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
