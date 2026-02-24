import { Globe, Users, Gavel, Camera } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const stats = [
  {
    icon: Globe,
    number: 800,
    suffix: '+',
    label: 'SCP en más de 800 entidades de la república',
    format: 'normal',
  },
  {
    icon: Users,
    number: 316,
    suffix: '+',
    label: 'Policías Capacitados',
    format: 'normal',
  },
  {
    icon: Gavel,
    number: 200_000_000,
    suffix: ' M',
    label: 'Casos Atendidos',
    format: 'millions',
  },
  {
    icon: Camera,
    number: 250_000_000, 
    suffix: ' M',
    label: 'Dispositivos',
    format: 'millions',
  },
];

interface CounterProps {
  target: number;
  duration?: number;
  format?: 'normal' | 'millions';
}

function Counter({ target, duration = 2, format = 'normal' }: CounterProps) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | undefined;
    let animationFrame: number;

    const animate = (now: number) => {
      if (startTime === undefined) startTime = now;

      const runtime = now - startTime;
      const progress = Math.min(runtime / (duration * 1000), 1);

      const current = Math.floor(target * progress);
      setCount(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, target, duration]);

  // Formato visual
  if (format === 'millions') {
    return <span ref={nodeRef}>{Math.floor(count / 1_000_000)}</span>;
  }

  return <span ref={nodeRef}>{count}</span>;
}

export function StatsSection() {
  return (
    <section id="diferenciadores" className="relative py-20 bg-[#0a0f1e] overflow-hidden">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1672081420292-1be6ddf6f2d1?q=80&w=1080)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Qué nos diferencia?
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Alineamos nuestra ingeniería a su visión de estado; garantizamos{' '}
            <span className="text-white font-semibold">
              soberanía tecnológica
            </span>{' '}
            para proteger su infraestructura estratégica.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                <stat.icon className="w-8 h-8 text-white" />
              </div>

              <div className="text-4xl md:text-5xl font-black text-white mb-2">
                <Counter target={stat.number} format={stat.format as any} />
                <span>{stat.suffix}</span>
              </div>

              <p className="text-sm md:text-base text-white/60">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
