import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Building2, Workflow, Scale, TrendingUp } from 'lucide-react';

const badges = [
  {
    title: 'Talento nacional',
    desc: 'Somos una empresa 100% mexicana dedicada a la tecnología para las fuerzas del orden.',
    icon: Building2,
    accent: '#ef4444',
  },
  {
    title: 'Integración natural',
    desc: 'Interoperabilidad permitiendo comunicación continua con plataformas existentes.',
    icon: Workflow,
    accent: '#3b82f6',
  },
  {
    title: 'Gobernabilidad',
    desc: 'Alineación total con la estrategia nacional y el federalismo digital.',
    icon: Scale,
    accent: '#8b5cf6',
  },
  {
    title: 'Generación de Valor',
    desc: 'Creación de información estratégica de seguridad pública para tu administración.',
    icon: TrendingUp,
    accent: '#10b981',
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} id="nosotros" className="py-20 lg:py-32 bg-[#050b14] relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-900/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px bg-red-500 w-12" />
              <span className="text-red-400 text-xs uppercase tracking-[0.2em] font-semibold">Nuestra Empresa</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              El Aliado Tecnológico para Consolidar tu Estrategia de Seguridad
            </h2>

            <p className="text-lg md:text-xl text-white/70 mb-8 font-light leading-relaxed">
              Experiencia, innovación y compromiso con el federalismo digital y la coordinación única de las corporaciones.
            </p>

            <div className="space-y-5 text-white/65 text-[15px] md:text-base leading-[1.8] text-justify">
              <p>
                Somos una empresa 100% mexicana con amplia trayectoria desarrollando tecnología de vanguardia para instituciones gubernamentales. Comprendemos a fondo la responsabilidad de las administraciones públicas; por eso, nuestras plataformas están diseñadas para sumar y complementar los esfuerzos de seguridad que tu gobierno ya encabeza.
              </p>
              <p>
                Nuestro enfoque tecnológico se basa en permitir una interoperabilidad total, logrando una comunicación continua con las plataformas existentes en los tres niveles de gobierno. Este nivel de integración enriquece el ecosistema de información de tu entidad, respaldando de forma contundente tus acciones de prevención e investigación.
              </p>
            </div>
          </motion.div>

          {/* Badges Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {badges.map((badge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                className="group relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-xl hover:shadow-black/30"
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-80 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${badge.accent}, transparent)` }}
                />

                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105"
                  style={{
                    background: `${badge.accent}15`,
                    border: `1px solid ${badge.accent}30`,
                  }}
                >
                  <badge.icon className="w-5 h-5" style={{ color: badge.accent }} />
                </div>

                <h4 className="text-[15px] font-bold text-white mb-2 leading-snug">{badge.title}</h4>
                <p className="text-white/50 text-[13px] leading-relaxed">{badge.desc}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
