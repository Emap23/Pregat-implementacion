// 📁 src/app/components/HeroSection.tsx
import { ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

import logo from '../../../img/LOGOPREGAT.svg';
import scpBackground from '../../../img/SCP1.webp';

import { useParallax } from './useParallax';
import { FloatingDecorators } from './FloatBob';

// Todas las palabras del título con su color base
const TITLE_LINES = [
  [
    { word: 'Tecnología', red: false },
    { word: 'Inteligente', red: false },
  ],
  [
    { word: 'que',      red: true  },
    { word: 'Respalda', red: true  },
    { word: 'tu',       red: false },
    { word: 'Gestión',  red: false },
    { word: 'de',       red: false },
  ],
  [
    { word: 'Gobierno', red: false },
  ],
];

// Variantes por palabra — alternamos rojo/blanco en hover
function getVariants(index: number, isRed: boolean) {
  const colors = ['#ef4444', '#ffffff', '#fca5a5', '#ffffff', '#ef4444', '#fca5a5', '#ffffff'];
  const hoverColor = isRed ? '#ff6b6b' : colors[index % colors.length];

  return {
    idle: {
      color: isRed ? '#ef4444' : '#ffffff',
      y: 0,
      scale: 1,
      textShadow: '0 0 0px rgba(0,0,0,0)',
    },
    hovered: {
      color: hoverColor,
      y: -5,
      scale: 1.03,
      textShadow: isRed
        ? '0 0 15px rgba(239,68,68,1), 0 0 40px rgba(239,68,68,0.6), 0 0 80px rgba(239,68,68,0.3)'
        : index % 3 === 0
          ? '0 0 15px rgba(220,38,38,0.9), 0 0 40px rgba(220,38,38,0.5)'
          : '0 0 15px rgba(255,255,255,0.8), 0 0 35px rgba(255,255,255,0.3)',
    },
  };
}

export function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const parallaxBg  = useParallax({ speed: 0.2 });
  const [hovered, setHovered] = useState(false);

  const { scrollY }    = useScroll();
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const contentY       = useTransform(scrollY, [0, 400], [0, 60]);

  const bgImagePath = typeof scpBackground === 'string' ? scpBackground : scpBackground.src;
  const logoPath    = typeof logo === 'string' ? logo : logo.src;

  let wordIndex = 0; // contador global para delays escalonados

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-start overflow-hidden bg-[#0a1628]"
    >
      {/* Fondo parallax */}
      <div
        ref={parallaxBg}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bgImagePath})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundColor: '#0a1628',
          transform: 'scale(1.15)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/95 via-[#0a1628]/20 to-transparent" />
      </div>

      <FloatingDecorators />

      {/* Líneas de escaneo */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-red-600/10 to-transparent"
            style={{ top: `${15 + i * 14}%` }}
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '100%', opacity: [0, 0.5, 0] }}
            transition={{ duration: 3, delay: 1.5 + i * 0.4, repeat: Infinity, repeatDelay: 8 + i * 2, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Contenido */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-20 sm:py-28 md:py-32 lg:py-40 w-full"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-6 sm:mb-8 md:mb-12"
        >
          <img src={logoPath} alt="PREGAT" className="h-14 sm:h-18 md:h-22 lg:h-28 xl:h-32 w-auto" />
        </motion.div>

        <div className="max-w-3xl">
          {/* Subtítulo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5"
          >
            <motion.div
            initial={{ width: 0 }}
            animate={{ width: 32 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="h-[1.5px] bg-red-500 min-w-[24px] sm:min-w-[32px]"
          />
            <span className="text-red-400 text-[10px] sm:text-xs uppercase tracking-widest font-semibold">
              Tecnología para tu gobierno
            </span>
          </motion.div>

          {/* ── TÍTULO COMPLETO ANIMADO ── */}
          <h1
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-[1.3] mb-4 sm:mb-5 md:mb-6"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ cursor: 'default' }}
          >
            {TITLE_LINES.map((line, lineIdx) => {
              return (
                <span key={lineIdx} className="flex flex-wrap gap-x-[0.2em] sm:gap-x-[0.28em] gap-y-0.5 sm:gap-y-1 mb-1">
                  {line.map(({ word, red }) => {
                    const idx = wordIndex++;
                    return (
                      <motion.span
                        key={word + idx}
                        className="inline-block relative"
                        initial="idle"
                        animate={hovered ? 'hovered' : 'idle'}
                        variants={getVariants(idx, red)}
                        transition={{
                          duration: 0.4,
                          delay: hovered ? idx * 0.06 : idx * 0.02,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        {word}

                        {/* Línea roja bajo cada palabra */}
                        <motion.span
                          className="absolute left-0 bottom-[-2px] h-[2px] rounded-full"
                          style={{
                            background: red ? '#ef4444' : '#dc2626',
                            boxShadow: '0 0 8px rgba(220,38,38,0.9)',
                          }}
                          initial={{ width: '0%', opacity: 0 }}
                          animate={hovered
                            ? { width: '100%', opacity: 1 }
                            : { width: '0%',   opacity: 0 }
                          }
                          transition={{
                            duration: 0.35,
                            delay: hovered ? idx * 0.07 + 0.08 : 0,
                            ease: 'easeOut',
                          }}
                        />
                      </motion.span>
                    );
                  })}
                </span>
              );
            })}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="text-white/70 text-sm sm:text-base md:text-lg mb-8 sm:mb-10 max-w-lg sm:max-w-xl leading-relaxed"
          >
            Soluciones integrales para fortalecer a las fuerzas del orden
            y consolidar la confianza social en tu administración.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 sm:mb-16 md:mb-20"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(220,38,38,0.6)' }}
              whileTap={{ scale: 0.97 }}
              className="bg-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-xs sm:text-sm tracking-wide"
            >
              Solicitar Asesoría
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-xs sm:text-sm transition-colors"
            >
              Conocer Soluciones
            </motion.button>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-6 sm:gap-8 md:gap-12">
          {[
            { value: '800+',  label: 'Entidades' },
            { value: '316+',  label: 'Policías'  },
            { value: '200M+', label: 'Casos'     },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2 + i * 0.1 }}
              className="text-left"
            >
              <div className="text-white font-bold text-base sm:text-lg md:text-xl">{stat.value}</div>
              <div className="text-white/50 text-[10px] sm:text-xs uppercase tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Flecha scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1 text-white/40"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}