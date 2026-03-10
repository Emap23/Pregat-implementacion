import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Smartphone, ShieldAlert, FileSignature, Zap } from 'lucide-react';

const badges = [
  {
    title: 'Modernización administrativa',
    desc: 'Integración natural de Infracción Digital y Justicia Cívica.',
    icon: FileSignature,
  },
  {
    title: 'Atención prioritaria',
    desc: 'Módulo específico para grupos vulnerables y acompañamiento bancario.',
    icon: ShieldAlert,
  },
  {
    title: 'Protección activa',
    desc: 'App Protección a la mujer con botón especial de atención.',
    icon: Smartphone,
  },
  {
    title: 'Seguridad Avanzada',
    desc: 'Implementación de Sistema de Drones y Anti-Drones.',
    icon: Zap,
  },
];

export function ModulesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} id="modulos" className="py-20 lg:py-32 bg-[#0a1628] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a1628] to-[#0a1628]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-blue-400 text-sm uppercase tracking-widest font-semibold">Módulos Complementarios</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Soluciones Ciudadanas que Fortalecen tu Legado Institucional
          </h2>
          
          <h3 className="text-xl md:text-2xl text-white/90 mb-6 font-light">
            Acercamos las instituciones a la ciudadanía, priorizando la atención a los sectores más vulnerables de tu población.
          </h3>
          
          <div className="space-y-4 text-white/70 text-base md:text-lg leading-relaxed text-left sm:text-center">
            <p>
              Para que tu estrategia de seguridad deje una huella positiva y duradera, ofrecemos aplicaciones dirigidas directamente al ciudadano. Destaca la "App Protección a la mujer", un sistema con botón especial de atención y solicitud de medidas de protección, demostrando la sensibilidad y prioridad de tu gobierno hacia la equidad y la seguridad de todos.
            </p>
            <p>
              El ecosistema SCP está diseñado para acompañar el crecimiento de tu entidad. Tu administración puede integrar en cualquier momento módulos como Justicia Cívica, Infracción Digital y Sistema de Drones y Anti-Drones, garantizando que tu legado tecnológico se mantenga a la vanguardia durante toda tu gestión.
            </p>
          </div>
        </motion.div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-blue-500/50 transition-all group"
            >
              <div className="bg-blue-500/10 w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                <badge.icon className="w-7 h-7 text-blue-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-3">{badge.title}</h4>
              <p className="text-white/60 text-sm leading-relaxed">{badge.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
