// 📁 src/app/components/Marquee.tsx
// Banner de texto o logos deslizándose en loop horizontal
// Equivale a .marquee-section del HTML original

import { motion } from 'motion/react';

interface MarqueeProps {
  items: string[];          // Textos o labels a mostrar
  speed?: number;           // Segundos para un ciclo completo (default: 30)
  direction?: 'left' | 'right';
  className?: string;       // Clases para el contenedor
  itemClassName?: string;   // Clases para cada item
  separator?: string;       // Separador entre items (default: "•")
}

export function Marquee({
  items,
  speed = 30,
  direction = 'left',
  className = '',
  itemClassName = '',
  separator = '•',
}: MarqueeProps) {
  // Duplicamos los items para el loop infinito
  const doubled = [...items, ...items];

  return (
    <div
      className={`overflow-hidden whitespace-nowrap ${className}`}
      style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' }}
    >
      <motion.div
        className="inline-flex will-change-transform"
        style={{ transform: 'translateZ(0)' }}
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
      >
        {doubled.map((item, index) => (
          <span key={index} className="inline-flex items-center gap-4 md:gap-6">
            <span className={`text-sm md:text-base lg:text-lg font-semibold uppercase tracking-widest ${itemClassName}`}>
              {item}
            </span>
            <span className="text-red-600 mx-3 md:mx-4 text-lg">{separator}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────
// MARQUEE PREFABRICADO PARA PREGAT
// Colócalo entre secciones como separador visual
// ─────────────────────────────────────────────────────────────

const defaultItems = [
  'Sistema de Control Policial',
  'Soberanía Tecnológica',
  'Seguridad Mexicana',
  'Inteligencia Operativa',
  'Estado de Fuerza',
  'Gestión de Crisis',
  'Interoperabilidad',
];

interface PREGATMarqueeProps {
  variant?: 'dark' | 'red';
  direction?: 'left' | 'right';
}

export function PREGATMarquee({ variant = 'dark', direction = 'left' }: PREGATMarqueeProps) {
  const isDark = variant === 'dark';

  return (
    <div className={`py-4 ${isDark ? 'bg-[#0a1628]' : 'bg-red-600'}`}>
      <Marquee
        items={defaultItems}
        direction={direction}
        speed={25}
        itemClassName={isDark ? 'text-white/60' : 'text-white'}
        separator={isDark ? '●' : '○'}
      />
    </div>
  );
}