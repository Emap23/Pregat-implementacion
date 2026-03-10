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

      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">

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
            className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
          >
            <div className="w-8 sm:w-12 h-0.5 bg-red-600"></div>
            <p className="text-white/80 text-[10px] sm:text-xs uppercase tracking-wide">
              Control Operativo Total
            </p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 sm:mb-6"
          >
            Conoce SCP: Vanguardia Tecnológica para tu Corporación
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 md:mb-10 space-y-4"
          >
            <p className="font-semibold text-white">Una solución integral de hardware y software que fortalece de manera decisiva las capacidades operativas y tácticas de tus fuerzas del orden.</p>
            <p>El Sistema de Control Policial (SCP) es una plataforma robusta que moderniza el trabajo policial, dotando a tu corporación de las mejores herramientas. Integramos el control, la supervisión y el seguimiento del personal, lo que permite visualizar el histórico de patrullajes y dar seguimiento puntual a la atención de cada alerta.</p>
            <p>Con SCP, tu Centro de Mando consolida su autoridad al visualizar videos que inician automáticamente y supervisar operativos en campo mediante streaming del oficial. Además, facilitamos labores clave mediante el llenado del IPH asistido, agilizando la labor administrativa de tus elementos para mantenerlos activos en las calles.</p>
          </motion.div>

          {/* Badges SCP */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
          >
            {[
              { title: 'Certeza institucional', desc: 'Evidencia digital en video y audio de cada intervención.' },
              { title: 'Eficiencia administrativa', desc: 'Reportes automatizados e IPH asistido para agilizar trámites.' },
              { title: 'Optimización inteligente', desc: 'Medición de procesos para una óptima administración.' },
              { title: 'Supervisión Continua', desc: 'Control remoto y supervisión en video y audio desde la central.' },
            ].map((badge, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="mt-1 w-2 h-2 rounded-full bg-red-500 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                <div>
                  <h4 className="text-white font-bold text-sm">{badge.title}</h4>
                  <p className="text-white/60 text-xs mt-0.5">{badge.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 hover:bg-red-700 text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-full uppercase text-[10px] sm:text-xs font-semibold tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Conocer más
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent hover:bg-white/10 text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-full border-2 border-white/30 hover:border-white/50 uppercase text-[10px] sm:text-xs font-semibold tracking-wide transition-all duration-300"
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