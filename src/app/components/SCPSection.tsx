// 📁 src/app/components/SCPSection.tsx
import { motion } from 'motion/react';
import { useParallax } from './useParallax';

// Importación de la imagen desde tu carpeta local /img
// Se usa ../../ para salir de components y app, y entrar a la carpeta img
import policiaImg from '../../../img/Policia_inicial.png';

export function SCPSection() {
  const parallaxBg = useParallax({ speed: 0.2 });

  // Esta constante asegura que obtengas el string de la ruta, 
  // ya sea que uses Vite, Webpack o el optimizador de Next.js.
  const imageSrc = typeof policiaImg === 'string' ? policiaImg : (policiaImg as any).src;

  return (
    <section id="scp" className="relative min-h-screen flex items-center overflow-hidden bg-[#1a2847]">

      {/* Background con parallax */}
      <div
        ref={parallaxBg}
        className="absolute inset-0 z-0 scale-110 opacity-20"
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'left center',
        }}
      />

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
              Impacto y Credibilidad Gubernamental 
            </p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            Sistema Ciudadano de Protección (SCP)
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/80 text-base md:text-lg leading-relaxed mb-8 md:mb-10"
          >
            Entendemos que la seguridad pública es el pilar de un gobierno fuerte y cercano a la gente. Conectamos oficiales 
            <span className="font-semibold text-white"> en campo con centros de mando en tiempo real.</span>
          </motion.p>

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

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:block"
        >
          <img
            src={imageSrc}
            alt="Oficial de Seguridad - Policia"
            className="w-full h-auto object-cover rounded-lg shadow-2xl border border-white/10"
          />
        </motion.div>
      </div>
    </section>
  );
}