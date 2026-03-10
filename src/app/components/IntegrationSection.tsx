// 📁 src/app/components/IntegrationSection.tsx
import { Shield, UserCheck, HeartHandshake, Clock } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

import ico1 from '../../../img/ico1.jpeg';
import ico2 from '../../../img/ico2.jpeg';
import ico3 from '../../../img/ico3.jpeg';
import ico4 from '../../../img/ico4.jpeg';

const integrations = [
  {
    icon: Shield,
    title: 'Disciplina corporativa',
    description: 'Seguimiento de protocolos de actuación policial.',
    color: '#ef4444',
    image: ico1,
  },
  {
    icon: UserCheck,
    title: 'Certidumbre ciudadana',
    description: 'Confianza en el actuar de los oficiales frente a la sociedad.',
    color: '#3b82f6',
    image: ico2,
  },
  {
    icon: HeartHandshake,
    title: 'Cercanía real',
    description: 'Proximidad social de las autoridades como sello de tu gobierno.',
    color: '#10b981',
    image: ico3,
  },
  {
    icon: Clock,
    title: 'Atención Efectiva',
    description: 'Atención de alertas en tiempo óptimo para la tranquilidad ciudadana.',
    color: '#06b6d4',
    image: ico4,
  },
];

export function IntegrationSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-[#080d1a] relative overflow-hidden" ref={containerRef} id="integracion">
      {/* Malla táctica de fondo */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 0)`, backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 sm:mb-16 md:mb-20 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="w-8 h-[1px] bg-red-600" />
            <span className="text-red-400 text-xs uppercase tracking-[0.25em] font-semibold">Beneficios para tu Administración</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 leading-tight"
          >
            Resultados Tangibles que Proyectan un{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">Gobierno Seguro</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-[15px] sm:text-base leading-[1.8] text-justify space-y-4"
          >
            <p>
              Sumar nuestras soluciones a tu estrategia se traduce en beneficios institucionales que la ciudadanía percibe directamente. Al contar con evidencia digital de cada intervención en la calle, tu gobierno demuestra un seguimiento estricto de los protocolos de actuación, protegiendo jurídicamente tanto a los ciudadanos como a tus oficiales.
            </p>
            <p>
              La generación de reportes automatizados y la medición constante de procesos proyectan una administración moderna y transparente. Al garantizar la atención de alertas en tiempo óptimo, se materializa una proximidad social real, consolidando la confianza ciudadana en el actuar de tus autoridades.
            </p>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {integrations.map((item, index) => (
            <BenefitCard key={index} item={item} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitCard({ item, index, isInView }: { item: typeof integrations[0]; index: number; isInView: boolean }) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
      className="group relative bg-[#0c1424] border border-white/[0.07] rounded-2xl overflow-hidden transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/40"
    >
      {/* Top accent bar */}
      <div
        className="h-[3px] w-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}80, transparent)` }}
      />

      <div className="p-6 sm:p-7">
        {/* Icon area */}
        <div className="relative mb-6">
          {/* Image icon */}
          <div
            className="w-16 h-16 rounded-2xl overflow-hidden border transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
            style={{ borderColor: `${item.color}30` }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating lucide icon badge */}
          <div
            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-lg flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110"
            style={{ background: item.color, boxShadow: `0 4px 14px ${item.color}50` }}
          >
            <Icon className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Content */}
        <h3 className="text-white font-bold text-lg mb-2 leading-snug group-hover:text-white transition-colors">
          {item.title}
        </h3>

        <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/65 transition-colors">
          {item.description}
        </p>

        {/* Bottom detail line */}
        <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }} />
            <span className="text-[11px] text-white/30 font-medium uppercase tracking-wider">Activo</span>
          </div>
          <span
            className="text-[11px] font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ color: item.color }}
          >
            Ver más
          </span>
        </div>
      </div>

      {/* Hover glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${item.color}08, transparent 70%)` }}
      />
    </motion.div>
  );
}
