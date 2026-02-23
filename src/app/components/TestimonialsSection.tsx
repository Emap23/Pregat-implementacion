// 📁 src/app/components/TestimonialsSection.tsx
// Sin anime.js — 100% Framer Motion

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Gral. Roberto Fuentes',
    role: 'Director de Seguridad Pública',
    org: 'Municipio de Puebla',
    text: 'El SCP transformó completamente nuestra operación. Pasamos de gestionar incidentes en papel a tener visibilidad total en tiempo real. La reducción en tiempo de respuesta fue inmediata.',
    avatar: 'RF',
    color: '#dc2626',
  },
  {
    name: 'Lic. Carmen Vázquez',
    role: 'Secretaria de Seguridad',
    org: 'Gobierno del Estado de Hidalgo',
    text: 'La plataforma de inteligencia de datos nos permitió anticipar focos de conflicto con semanas de antelación. Es exactamente la herramienta que necesitaba nuestra institución.',
    avatar: 'CV',
    color: '#2563eb',
  },
  {
    name: 'Cmdte. Luis Herrera',
    role: 'Comandante de Zona',
    org: 'Policía Municipal, Querétaro',
    text: 'Mis elementos ahora llegan a los incidentes con información completa. El app SCP Policía les da todo en la palma de la mano. La capacitación fue rápida y los resultados visibles desde el primer mes.',
    avatar: 'LH',
    color: '#059669',
  },
  {
    name: 'Mtro. Adrián Morales',
    role: 'Director de Tecnología',
    org: 'SSPC Federal',
    text: 'La interoperabilidad entre sistemas era nuestro mayor reto. PREGAT lo resolvió con una plataforma que conecta municipios, estados y federación sin fricción. Soberanía tecnológica real.',
    avatar: 'AM',
    color: '#7c3aed',
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, amount: 0.2 });
  const [current, setCurrent]     = useState(0);
  const [direction, setDirection] = useState(1);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    autoRef.current = setInterval(() => {
      setDirection(1);
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, []);

  const go = (dir: 1 | -1) => {
    if (autoRef.current) clearInterval(autoRef.current);
    setDirection(dir);
    setCurrent(prev => (prev + dir + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter:  (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  const t = testimonials[current];

  return (
    <section ref={sectionRef} className="relative py-24 bg-[#060d1a] overflow-hidden">
      {/* Fondo glow que cambia con el testimonio */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 w-[700px] h-[400px] rounded-full -translate-x-1/2 -translate-y-1/2"
          animate={{ background: `radial-gradient(ellipse, ${t.color}18 0%, transparent 70%)` }}
          transition={{ duration: 0.8 }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <span className="text-red-400 text-xs font-mono uppercase tracking-[0.25em]">Lo que dicen</span>
          <h2 className="text-4xl font-black text-white mt-3">
            Instituciones que confían en PREGAT
          </h2>
        </motion.div>

        {/* Testimonio */}
        <div className="relative min-h-[280px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute w-full"
            >
              <Quote className="w-8 h-8 mx-auto mb-6 opacity-20 text-white" />
              <blockquote className="text-white/70 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
                "{t.text}"
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <motion.div
                  key={t.color}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-sm"
                  style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}99)` }}
                >
                  {t.avatar}
                </motion.div>
                <div className="text-left">
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-white/40 text-xs">{t.role} · {t.org}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controles */}
        <div className="flex items-center justify-center gap-6 mt-16">
          <button
            onClick={() => go(-1)}
            className="w-10 h-10 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-white/40 hover:text-white transition-all duration-300"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-2 items-center">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              >
                <motion.div
                  animate={{
                    width: i === current ? 24 : 8,
                    background: i === current ? testimonials[i].color : 'rgba(255,255,255,0.2)',
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-2 rounded-full"
                  initial={false}
                />
              </button>
            ))}
          </div>

          <button
            onClick={() => go(1)}
            className="w-10 h-10 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-white/40 hover:text-white transition-all duration-300"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}