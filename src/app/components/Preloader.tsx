// 📁 src/app/components/Preloader.tsx
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const LOGO_SRC = '/img/logopregat.png';

export function Preloader() {
  const [phase, setPhase] = useState<'initializing' | 'loading' | 'finalizing' | 'exit'>('initializing');
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulación de carga de datos técnica
    const interval = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + 1 : 100));
    }, 25);

    const t1 = setTimeout(() => setPhase('loading'), 600);
    const t2 = setTimeout(() => setPhase('finalizing'), 2400);
    const t3 = setTimeout(() => setPhase('exit'), 3200);

    return () => {
      clearInterval(interval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    if (phase === 'exit') {
      const t = setTimeout(() => setIsVisible(false), 800);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(20px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#020408] overflow-hidden"
        >
          {/* --- FONDO ATMOSFÉRICO --- */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.08)_0%,transparent_70%)]" />
            <div 
               className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} 
            />
          </div>

          {/* --- ELEMENTOS DE DISEÑO TÁCTICO --- */}
          <div className="absolute inset-10 border border-white/[0.03] pointer-events-none" />
          
          {/* Coordenadas en las esquinas */}
          <div className="absolute top-8 left-8 font-mono text-[10px] text-red-500/40 tracking-tighter">
            LAT: 19.4326° N <br /> LONG: 99.1332° W
          </div>
          <div className="absolute bottom-8 right-8 font-mono text-[10px] text-red-500/40 text-right">
            SYSTEM_STATUS: {phase.toUpperCase()} <br />
            AUTH_LEVEL: LEVEL_4
          </div>

          {/* --- NÚCLEO CENTRAL --- */}
          <div className="relative flex items-center justify-center">
            
            {/* Anillos de Datos (Spinners Futuristas) */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute w-64 h-64 border-t-2 border-b-2 border-red-600/20 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute w-72 h-72 border-l border-r border-white/10 rounded-full border-dashed"
            />
            
            {/* El Logo con efecto de estabilización */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={phase !== 'initializing' ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative z-10"
            >
              <img 
                src={LOGO_SRC} 
                alt="Logo" 
                className="h-16 md:h-20 w-auto brightness-125 contrast-125"
                style={{ filter: 'drop-shadow(0 0 15px rgba(220,38,38,0.4))' }}
              />
              
              {/* Línea de escaneo láser sobre el logo */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/30 to-transparent h-1/2 w-full z-20"
                animate={{ top: ['-50%', '150%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            {/* Marcador de Progreso Circular */}
            <svg className="absolute w-80 h-80 -rotate-90 pointer-events-none">
              <motion.circle
                cx="160" cy="160" r="150"
                stroke="currentColor"
                strokeWidth="1"
                fill="transparent"
                className="text-red-600/10"
              />
              <motion.circle
                cx="160" cy="160" r="150"
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                strokeDasharray="942" // 2 * PI * 150
                initial={{ strokeDashoffset: 942 }}
                animate={{ strokeDashoffset: 942 - (942 * progress) / 100 }}
                className="text-red-600"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* --- FOOTER DE CARGA --- */}
          <div className="absolute bottom-20 flex flex-col items-center gap-2">
            <motion.div 
              className="font-mono text-[11px] tracking-[0.5em] text-white/50 uppercase"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Syncing Neural Interface
            </motion.div>
            
            <div className="w-48 h-[2px] bg-white/5 relative overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-red-600"
                initial={{ x: '-100%' }}
                animate={{ x: `${progress - 100}%` }}
              />
            </div>

            <div className="font-mono text-[10px] text-red-500/80">
              {progress.toString().padStart(3, '0')}%
            </div>
          </div>

          {/* Efectos de glitch ocasionales */}
          <motion.div 
            className="absolute inset-0 bg-red-500/5 mix-blend-overlay pointer-events-none"
            animate={{ opacity: [0, 0.1, 0, 0.05, 0] }}
            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 2 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}