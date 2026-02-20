import { Play } from 'lucide-react';
import { motion } from 'motion/react';
// Busca esta línea y cámbiala:
import logo from "../../../img/logopregat.png";

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-start overflow-hidden">
      {/* Background Image */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1759382033088-9726a2eb7688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjBjaXR5JTIwaGlnaHdheSUyMHRyYWZmaWMlMjBtZXhpY298ZW58MXx8fHwxNzcxMjI0NDAxfDA&ixlib=rb-4.1.0&q=80&w=1080)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 md:mb-12"
        >
          <img 
            src={logo} 
            alt="PREGAT" 
            className="h-20 sm:h-24 md:h-32 lg:h-40 w-auto"
          />
        </motion.div>

        <div className="max-w-2xl">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/90 text-base md:text-lg mb-4 md:mb-6"
          >
            Seguridad y tecnología mexicana .
          </motion.p>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6"
          >
            Respaldo Institucional y Soberanía Tecnológica.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-white/90 text-base md:text-lg mb-8 md:mb-10"
          >
            Grupo empresarial consolidado al servicio de la seguridad.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row flex-wrap gap-4"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-sm sm:text-base"
            >
              Nuestros Productos
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent hover:bg-white/10 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border-2 border-white/80 transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-sm sm:text-base backdrop-blur-sm"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5" fill="white" />
              Mirar el Video
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
