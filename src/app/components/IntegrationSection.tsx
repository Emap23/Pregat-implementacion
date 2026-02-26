// 📁 src/app/components/IntegrationSection.tsx
import { MessageCircle, LayoutDashboard, UserCheck, Radio, Brain, Shield, Terminal, Clock, DatabaseZap, Wifi, Target, Activity, Cpu, Lock } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';

const integrations = [
  { icon: MessageCircle, title: 'SCP CIUDADANO', code: '0x001_COMMS', description: 'Facilita una comunicación directa y transparente con los ciudadanos.', color: '#ef4444', latency: '4ms', tag: 'NODE::01' },
  { icon: LayoutDashboard, title: 'SCP DASHBOARD', code: '0x002_VISUAL', description: 'Integra una herramienta para la toma de decisiones informadas y estratégicas.', color: '#3b82f6', latency: '2ms', tag: 'NODE::02' },
  { icon: UserCheck, title: 'SCP SUPERVISOR', code: '0x003_AUTH', description: 'Asegura una respuesta rápida y efectiva ante cualquier incidente.', color: '#10b981', latency: '3ms', tag: 'NODE::03' },
  { icon: Radio, title: 'SCP CENTRO DE MANDO', code: '0x004_RADIO', description: 'Supervisar y gestionar las actividades policiales en tiempo real.', color: '#06b6d4', latency: '1ms', tag: 'NODE::04' },
  { icon: Brain, title: 'SCP INTELIGENCIA', code: '0x005_NEURAL', description: 'Proporcionar información clave para la toma de decisiones estratégicas.', color: '#f97316', latency: '10ms', tag: 'NODE::05' },
  { icon: Shield, title: 'SCP POLICÍA', code: '0x006_ENFORCE', description: 'Optimizar las actividades diarias de los elementos de seguridad.', color: '#6366f1', latency: '5ms', tag: 'NODE::06' },
];

export function IntegrationSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <section className="py-32 bg-[#080d1a] relative overflow-hidden" ref={containerRef}>
      {/* MALLA TÁCTICA DE FONDO */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 0)`, backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* HEADER PRINCIPAL */}
        <div className="mb-20">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex items-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-red-600" />
            <span className="font-mono text-[10px] text-red-500 uppercase tracking-[0.4em] font-bold">Ecosistema Sincronizado V4.0</span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-light text-white tracking-tight uppercase">
            Conoce la <span className="font-black italic">Integración SCP</span>
          </h2>
          <p className="text-slate-400 font-mono text-xs mt-6 max-w-2xl leading-relaxed">
            [SISTEMA UNIFICADO]: Centraliza la gestión de crisis en una plataforma unificada. Garantice la interoperabilidad de sus sistemas de mando.
          </p>
        </div>

        {/* GRID DE MÓDULOS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {integrations.map((item, index) => (
            <HardwareModule key={index} item={item} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HardwareModule({ item, index, isInView }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="group relative h-[520px] bg-[#0c162d] border border-white/10 rounded-sm overflow-hidden flex flex-col transition-all duration-500 hover:border-red-500/50"
    >
      {/* EFECTO CRISTAL / SCANLINE */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] z-20 opacity-20" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.05), transparent 40%)` }} />

      <div className="relative z-10 p-8 flex flex-col h-full">
        {/* TOP: TAGS DE IDENTIFICACIÓN */}
        <div className="flex justify-between items-start mb-8 font-mono">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] text-white/40">
              <Terminal size={10} className="text-red-500" />
              <span>{item.tag}</span>
            </div>
            <div className="text-[12px] text-white/80 font-bold tracking-tighter italic">{item.code}</div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[8px] text-emerald-500 font-bold tracking-widest uppercase">Live</span>
            </div>
          </div>
        </div>

        {/* CENTER: CORE ICON & VISUALIZER */}
        <div className="flex-1 flex flex-col items-center justify-center relative mb-6">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
             <Target size={200} className="group-hover:rotate-90 transition-transform duration-[4000ms]" />
          </div>
          
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative p-6 bg-[#080d1a] border border-white/5 shadow-2xl z-10"
          >
            <div className="absolute inset-0 blur-2xl opacity-20 group-hover:opacity-50 transition-all" style={{ backgroundColor: item.color }} />
            <item.icon size={48} className="relative text-white group-hover:scale-110 transition-transform" />
          </motion.div>
        </div>

        {/* INFO TEXTUAL */}
        <div className="mb-8 border-l-2 border-red-600 pl-4">
          <h3 className="text-white font-black text-xl tracking-tight mb-2 uppercase italic">
            {item.title}
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed font-medium">
            {item.description}
          </p>
        </div>

        {/* BOTTOM: DATAGRID (ESTRUCTURA DE CELDAS) */}
        <div className="mt-auto space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {/* Celda Latencia */}
            <div className="bg-black/30 border border-white/5 p-3 rounded-sm flex items-center gap-3">
              <Clock className="text-red-500/50" size={16} />
              <div className="flex flex-col">
                <span className="text-[8px] text-white/20 uppercase font-mono leading-none mb-1 tracking-widest">Latency</span>
                <span className="text-[11px] text-white font-mono font-bold leading-none italic">// {item.latency}</span>
              </div>
            </div>

            {/* Celda Status */}
            <div className="bg-black/30 border border-white/5 p-3 rounded-sm flex items-center gap-3">
              <DatabaseZap className="text-red-500/50" size={16} />
              <div className="flex flex-col">
                <span className="text-[8px] text-white/20 uppercase font-mono leading-none mb-1 tracking-widest">Status</span>
                <span className="text-[11px] text-white font-mono font-bold leading-none italic">// ONLINE</span>
              </div>
            </div>

            {/* Celda Encryption */}
            <div className="bg-black/30 border border-white/5 p-3 rounded-sm flex items-center gap-3">
              <Wifi className="text-red-500/50" size={16} />
              <div className="flex flex-col">
                <span className="text-[8px] text-white/20 uppercase font-mono leading-none mb-1 tracking-widest">Encrypt</span>
                <span className="text-[11px] text-white font-mono font-bold leading-none italic">// AES_256</span>
              </div>
            </div>

            {/* Celda Security */}
            <div className="bg-black/30 border border-red-500/20 p-3 rounded-sm flex items-center gap-3 group-hover:bg-red-500/5 transition-colors">
              <Lock className="text-red-600" size={16} />
              <div className="flex flex-col">
                <span className="text-[8px] text-red-500/40 uppercase font-mono leading-none mb-1 tracking-widest italic font-black">Secure</span>
                <span className="text-[11px] text-red-500 font-mono font-bold leading-none tracking-tighter">CHANNEL_V4</span>
              </div>
            </div>
          </div>

          {/* BARRA DE PROCESAMIENTO DINÁMICA */}
          <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
             <motion.div 
               animate={{ x: ['-100%', '200%'] }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
               className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-red-600 to-transparent"
             />
          </div>
        </div>
      </div>

      {/* TORNILLOS DE FIJACIÓN */}
      <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-white/10 shadow-inner" />
      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-white/10 shadow-inner" />
      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-white/10 shadow-inner" />
      <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-white/10 shadow-inner" />
    </motion.div>
  );
}