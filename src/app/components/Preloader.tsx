// 📁 src/app/components/Preloader.tsx
// Preloader cinematográfico: líneas de escaneo + logo que se revela + dots rebotando
// El logo usa import dinámico compatible con Vite

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

// Importar el logo — Vite resuelve esto correctamente con ?url
// Si el logo está en /img/logopregat.png (carpeta public), usar la ruta directa
const LOGO_SRC = '/img/logopregat.png';

export function Preloader() {
  const [phase, setPhase]     = useState<'scanning' | 'reveal' | 'dots' | 'exit'>('scanning');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Fase 1: escaneo (0 – 0.8s)
    const t1 = setTimeout(() => setPhase('reveal'),   800);
    // Fase 2: reveal del logo (0.8 – 1.8s)
    const t2 = setTimeout(() => setPhase('dots'),    1800);
    // Fase 3: dots rebotando (1.8 – 3.0s)
    const minDone = setTimeout(() => setPhase('exit'), 3000);

    // Esperar también que la página cargue
    const onLoad = () => {
      // No hacer nada — el timeout ya controla el flujo
    };
    window.addEventListener('load', onLoad, { once: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(minDone);
    };
  }, []);

  useEffect(() => {
    if (phase === 'exit') {
      const t = setTimeout(() => setIsVisible(false), 700);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#060d1a] overflow-hidden"
        >
          {/* ── Cuadrícula táctica de fondo ── */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(220,38,38,1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(220,38,38,1) 1px, transparent 1px)`,
              backgroundSize: '48px 48px',
            }}
          />

          {/* ── Línea de escaneo horizontal ── */}
          <AnimatePresence>
            {phase === 'scanning' && (
              <motion.div
                initial={{ top: '-2px' }}
                animate={{ top: '102%' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75, ease: 'linear' }}
                className="absolute left-0 right-0 h-[2px] z-10 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(220,38,38,0.8) 40%, rgba(255,100,100,1) 50%, rgba(220,38,38,0.8) 60%, transparent 100%)',
                  boxShadow: '0 0 20px rgba(220,38,38,0.8), 0 0 60px rgba(220,38,38,0.3)',
                }}
              />
            )}
          </AnimatePresence>

          {/* ── Líneas verticales de escaneo (efecto radar) ── */}
          {phase === 'scanning' && [0, 1, 2, 3, 4].map(i => (
            <motion.div
              key={i}
              className="absolute top-0 bottom-0 w-px pointer-events-none"
              style={{ left: `${20 * i + 10}%`, background: 'rgba(220,38,38,0.06)' }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            />
          ))}

          {/* ── Círculos de radar ── */}
          {[120, 200, 290].map((r, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border pointer-events-none"
              style={{
                width: r * 2, height: r * 2,
                borderColor: 'rgba(220,38,38,0.08)',
                left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
            />
          ))}

          {/* ── Contenedor central ── */}
          <div className="relative z-20 flex flex-col items-center">

            {/* ── Logo con efecto reveal ── */}
            <motion.div
              className="relative mb-10"
              initial={{ opacity: 0 }}
              animate={phase !== 'scanning' ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Glitch frame alrededor del logo */}
              <motion.div
                className="absolute -inset-4 rounded-lg pointer-events-none"
                style={{ border: '1px solid rgba(220,38,38,0.2)' }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={phase !== 'scanning' ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1 }}
              />
              <motion.div
                className="absolute -inset-8 rounded-xl pointer-events-none"
                style={{ border: '1px solid rgba(220,38,38,0.08)' }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={phase !== 'scanning' ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.15 }}
              />

              {/* Efecto de clip reveal: el logo aparece de arriba a abajo */}
              <motion.div
                initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                animate={phase !== 'scanning' ? { clipPath: 'inset(0% 0% 0% 0%)' } : {}}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
              >
                <img
                  src={LOGO_SRC}
                  alt="PREGAT"
                  className="h-20 sm:h-24 w-auto"
                  onError={(e) => {
                    // Fallback si el logo no carga
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const text = document.createElement('div');
                      text.className = 'text-white font-black text-3xl tracking-[0.3em] uppercase';
                      text.textContent = 'PREGAT';
                      parent.appendChild(text);
                    }
                  }}
                />
              </motion.div>

              {/* Línea roja debajo del logo */}
              <motion.div
                className="absolute -bottom-3 left-0 right-0 h-px bg-red-600"
                initial={{ scaleX: 0 }}
                animate={phase !== 'scanning' ? { scaleX: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
              />
            </motion.div>

            {/* ── Texto de estado (como terminal) ── */}
            <AnimatePresence mode="wait">
              {phase === 'reveal' && (
                <motion.div
                  key="status"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="font-mono text-[10px] text-red-500/60 tracking-[0.3em] uppercase mb-6"
                >
                  INICIALIZANDO SISTEMA...
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── 4 dots rebotando ── */}
            <AnimatePresence>
              {(phase === 'dots' || phase === 'exit') && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-end gap-[6px] h-7"
                >
                  {[0, 1, 2, 3].map(i => (
                    <motion.span
                      key={i}
                      className="block w-2.5 h-2.5 rounded-full bg-red-600"
                      animate={{ y: [0, -16, 0] }}
                      transition={{
                        duration: 0.55,
                        delay: i * 0.11,
                        repeat: Infinity,
                        repeatType: 'loop',
                        ease: 'easeInOut',
                      }}
                      style={{ boxShadow: '0 0 8px rgba(220,38,38,0.6)' }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Esquinas tácticas ── */}
          {[
            'top-4 left-4',
            'top-4 right-4',
            'bottom-4 left-4',
            'bottom-4 right-4',
          ].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos} w-6 h-6 pointer-events-none`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.05 }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                {i === 0 && <><line x1="0" y1="12" x2="0" y2="0" stroke="rgba(220,38,38,0.4)" strokeWidth="1.5"/><line x1="0" y1="0" x2="12" y2="0" stroke="rgba(220,38,38,0.4)" strokeWidth="1.5"/></>}
                {i === 1 && <><line x1="24" y1="12" x2="24" y2="0" stroke="rgba(220,38,38,0.4)" strokeWidth="1.5"/><line x1="24" y1="0" x2="12" y2="0" stroke="rgba(220,38,38,0.4)" strokeWidth="1.5"/></>}
                {i === 2 && <><line x1="0" y1="12" x2="0" y2="24" stroke="rgba(220,38,38,0.4)" strokeWidth="1.5"/><line x1="0" y1="24" x2="12" y2="24" stroke="rgba(220,38,38,0.4)" strokeWidth="1.5"/></>}
                {i === 3 && <><line x1="24" y1="12" x2="24" y2="24" stroke="rgba(220,38,38,0.4)" strokeWidth="1.5"/><line x1="24" y1="24" x2="12" y2="24" stroke="rgba(220,38,38,0.4)" strokeWidth="1.5"/></>}
              </svg>
            </motion.div>
          ))}

          {/* ── Barra de progreso ── */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 3.0, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-red-800 via-red-600 to-red-400"
            />
          </div>

          {/* ── Versión / info esquina ── */}
          <motion.div
            className="absolute bottom-6 right-6 font-mono text-[9px] text-white/15 tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            SCP v2.0 — PREGAT
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}