// 📁 src/app/components/ProductsSection.tsx
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Shield, Brain, Smartphone, Monitor, Lock, Cpu, Globe, Eye, ChevronRight, ArrowDown } from 'lucide-react';
import { NeuralBackground } from './NeuralBackground';

const products = [
  {
    id: '01', name: 'SCP POLICÍA', tagline: 'Control en campo',
    description: 'Herramienta móvil para optimizar las actividades diarias del elemento policial. Reportes en tiempo real, geolocalización y comunicación directa con mando.',
    icon: Shield, color: '#dc2626', bg: 'from-red-950/80 to-red-900/40',
    features: ['Geolocalización en tiempo real', 'Reportes digitales', 'Comunicación cifrada', 'Historial de turnos'],
    image: 'https://images.unsplash.com/photo-1548407260-da850faa41e3?w=800&q=80',
  },
  {
    id: '02', name: 'SCP CENTRO DE MANDO', tagline: 'Visión total del territorio',
    description: 'Panel centralizado para supervisar y coordinar todas las unidades activas. Mapa interactivo, alertas automáticas y gestión de recursos en tiempo real.',
    icon: Monitor, color: '#2563eb', bg: 'from-blue-950/80 to-blue-900/40',
    features: ['Mapa táctico en vivo', 'Gestión de incidentes', 'Dashboard ejecutivo', 'Alertas automáticas'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    id: '03', name: 'SCP INTELIGENCIA', tagline: 'Datos que previenen',
    description: 'Motor de análisis predictivo que transforma datos operativos en inteligencia accionable. Identifica patrones, anticipa incidentes y optimiza despliegues.',
    icon: Brain, color: '#7c3aed', bg: 'from-violet-950/80 to-violet-900/40',
    features: ['Análisis predictivo', 'Mapas de calor', 'Reportes automáticos', 'IA operativa'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
  },
  {
    id: '04', name: 'SCP CIUDADANO', tagline: 'Seguridad en tu mano',
    description: 'App ciudadana para reportar incidentes, recibir alertas de seguridad y comunicarse directamente con las autoridades de su municipio.',
    icon: Smartphone, color: '#059669', bg: 'from-emerald-950/80 to-emerald-900/40',
    features: ['Reporte de incidentes', 'Alertas de zona', 'Botón de pánico', 'Seguimiento de reportes'],
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&q=80',
  },
  {
    id: '05', name: 'SCP SUPERVISOR', tagline: 'Supervisión sin límites',
    description: 'Plataforma de supervisión para mandos medios. Control de asistencia, validación de actividades y comunicación con unidades en campo.',
    icon: Eye, color: '#d97706', bg: 'from-amber-950/80 to-amber-900/40',
    features: ['Control de asistencia', 'Validación de reportes', 'Seguimiento de rutas', 'Comunicación directa'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
  {
    id: '06', name: 'SCP CIBERSEGURIDAD', tagline: 'Infraestructura protegida',
    description: 'Capa de ciberseguridad soberana para toda la infraestructura tecnológica. Monitoreo 24/7 y respuesta automática ante amenazas.',
    icon: Lock, color: '#0891b2', bg: 'from-cyan-950/80 to-cyan-900/40',
    features: ['Monitoreo 24/7', 'Detección de amenazas', 'Respuesta automática', 'Encriptación soberana'],
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80',
  },
  {
    id: '07', name: 'SCP IOT', tagline: 'Ciudad conectada',
    description: 'Integración de cámaras, sensores, drones y vehículos conectados a la plataforma central de comando y control.',
    icon: Cpu, color: '#be185d', bg: 'from-pink-950/80 to-pink-900/40',
    features: ['Integración de cámaras', 'Sensores ambientales', 'Gestión de drones', 'Vehículos conectados'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  },
  {
    id: '08', name: 'SCP NACIONAL', tagline: 'Escala federal',
    description: 'Plataforma de interoperabilidad para integrar sistemas entre municipios, estados y federación. Datos compartidos, respuesta coordinada.',
    icon: Globe, color: '#0369a1', bg: 'from-sky-950/80 to-sky-900/40',
    features: ['Interoperabilidad federal', 'Datos compartidos', 'Protocolo unificado', 'Respuesta coordinada'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
  },
];

// ─── Card — IDÉNTICA AL ORIGINAL, sin cambiar una sola línea ─────────────────
function ProductCard({ product, index, total }: { product: typeof products[0]; index: number; total: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const scale   = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.88, 1, 1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1],   [0, 1, 1, 0.3]);
  const y       = useTransform(scrollYProgress, [0, 0.25],           [60, 0]);

  const Icon = product.icon;

  return (
    <div ref={cardRef} className="sticky top-20 h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        style={{ scale, opacity, y }}
        className="w-full max-w-5xl rounded-2xl overflow-hidden relative"
        initial={false}
      >
        {/* Fondo imagen — cubre las neuronas completamente */}
        <div className="absolute inset-0">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-r ${product.bg} backdrop-blur-[2px]`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="absolute inset-0 rounded-2xl" style={{ border: `1px solid ${product.color}30` }} />
        <div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${product.color}, transparent)` }} />

        <div className="relative z-10 p-8 md:p-12 lg:p-16 grid md:grid-cols-2 gap-10 items-center min-h-[500px]">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: `${product.color}20`, border: `1.5px solid ${product.color}50` }}>
                <Icon className="w-7 h-7" style={{ color: product.color }} />
              </div>
              <div>
                <div className="font-mono text-xs tracking-widest mb-1" style={{ color: product.color }}>
                  MÓDULO {product.id}
                </div>
                <div className="text-white/50 text-xs">{product.tagline}</div>
              </div>
            </div>

            <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
              {product.name}
            </h3>

            <p className="text-white/60 text-base leading-relaxed mb-8 max-w-md">
              {product.description}
            </p>

            <button
              className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest px-6 py-3 rounded-full transition-all duration-300 hover:gap-4 hover:shadow-lg"
              style={{ background: `${product.color}20`, border: `1px solid ${product.color}50`, color: product.color }}
            >
              Conocer más <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="text-white/30 text-xs font-mono uppercase tracking-widest mb-5">
              Funcionalidades clave
            </div>
            {product.features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-3 p-4 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: product.color, boxShadow: `0 0 8px ${product.color}` }} />
                <span className="text-white/70 text-sm">{f}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-4 right-8 font-black text-8xl md:text-9xl leading-none pointer-events-none select-none"
          style={{ color: `${product.color}08`, fontVariantNumeric: 'tabular-nums' }}>
          {product.id}
        </div>

        <div className="absolute top-6 right-6 flex items-center gap-2">
          <span className="font-mono text-xs" style={{ color: product.color }}>{product.id}</span>
          <span className="text-white/20 font-mono text-xs">/ {String(total).padStart(2, '0')}</span>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Sección ──────────────────────────────────────────────────────────────────
export function ProductsSection() {
  return (
    <>
      {/*
        isolation:isolate crea un stacking context propio.
        Las neuronas van en z-index:-1 DENTRO de este contexto → quedan
        detrás de las cards pero no interfieren con el sticky scroll.
      */}
      <section
        id="productos"
        style={{ backgroundColor: '#060d1a', position: 'relative', isolation: 'isolate' }}
      >
        {/* Neuronas — atrás de todo dentro de esta sección */}
        <div
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, zIndex: -1, overflow: 'hidden', pointerEvents: 'none' }}
        >
          <NeuralBackground />
        </div>

        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.div initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }} className="h-px bg-red-500" />
              <span className="text-red-400 text-xs font-mono uppercase tracking-[0.25em]">Portfolio Tecnológico</span>
              <motion.div initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }} className="h-px bg-red-500" />
            </div>

            <h2 className="ps-title text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4">
              Nuestros Productos
            </h2>

            <p className="text-white/40 text-base max-w-lg mx-auto mb-8">
              Desplázate hacia abajo para explorar cada módulo del ecosistema SCP.
            </p>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-flex flex-col items-center gap-1 text-white/30"
            >
              <ArrowDown className="w-4 h-4" />
              <span className="text-xs font-mono tracking-widest">SCROLL</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Cards — sin ningún div wrapper extra */}
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} total={products.length} />
        ))}

        <div className="h-24" />
      </section>

      <style>{`
        .ps-title {
          color: #fff;
          animation: psTR 1.4s ease-in-out infinite,
                     psTB 1.4s ease-in-out .7s infinite;
        }
        @keyframes psTR {
          0%,100% { text-shadow: 0 0 18px rgba(220,38,38,.95), 0 0 55px rgba(220,38,38,.5), 0 0 110px rgba(220,38,38,.25); }
          55%,70%  { text-shadow: none; }
        }
        @keyframes psTB {
          0%,100% { text-shadow: none; }
          30%     { text-shadow: 0 0 18px rgba(37,99,235,.95), 0 0 55px rgba(37,99,235,.5), 0 0 110px rgba(37,99,235,.25); }
        }
      `}</style>
    </>
  );
}