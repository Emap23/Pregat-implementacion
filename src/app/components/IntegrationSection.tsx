import { MessageCircle, LayoutDashboard, UserCheck, Radio, Brain, Shield } from 'lucide-react';
import { motion } from 'motion/react';

const integrations = [
  {
    icon: MessageCircle,
    title: 'SCP CIUDADANO',
    description: 'Facilita una comunicación directa y transparente con los ciudadanos',
    color: 'from-pink-500 to-red-500',
  },
  {
    icon: LayoutDashboard,
    title: 'SCP DASHBOARD',
    description: 'Integra una herramienta para la toma de decisiones informadas y estratégicas',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: UserCheck,
    title: 'SCP SUPERVISOR',
    description: 'Asegura una respuesta rápida y efectiva ante cualquier incidente',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Radio,
    title: 'SCP CENTRO DE MANDO',
    description: 'Supervisar y gestionar las actividades policiales en tiempo real',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Brain,
    title: 'SCP INTELIGENCIA DE DATOS',
    description: 'Proporcionar información clave para la toma de decisiones estratégicas',
    color: 'from-orange-500 to-yellow-500',
  },
  {
    icon: Shield,
    title: 'SCP POLICIA',
    description: 'Proporcionar una herramienta para optimizar las actividades diarias de los elementos',
    color: 'from-blue-600 to-indigo-600',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

export function IntegrationSection() {
  return (
    <section id="integracion" className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Conoce la Integración SCP
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Centraliza la <span className="font-semibold text-gray-900">gestión de crisis</span> en una plataforma unificada. 
            <span className="font-semibold text-gray-900"> Garantice la interoperabilidad</span> de sus sistemas de mando.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {integrations.map((item, index) => (
            <motion.div 
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Icon */}
              <motion.div 
                className="mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                  <item.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
              </motion.div>

              {/* Content */}
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
