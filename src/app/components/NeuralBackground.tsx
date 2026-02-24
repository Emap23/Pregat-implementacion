import { useEffect, useRef, useCallback } from 'react';

const CONFIG = {
  nodeCount: 150, // Más nodos para una red más densa
  connectionDist: 150,
  mouseRadius: 200,
  // 🟢 Ajustamos estas alturas según tu scroll real
  sectionStart: 850,  
  sectionEnd: 1900,   
  colors: {
    bg: '#010208',
    red: 'rgba(255, 0, 0,',
    blue: 'rgba(0, 80, 255,',
    accent: '#00f2ff'
  }
};

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  active: number;
}

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const tickRef = useRef(0);

  const init = useCallback((w: number, h: number) => {
    const nodes: Node[] = [];
    for (let i = 0; i < CONFIG.nodeCount; i++) {
      nodes.push({
        x: Math.random() * w,
        // Forzamos a que aparezcan en la franja de productos
        y: CONFIG.sectionStart + Math.random() * (CONFIG.sectionEnd - CONFIG.sectionStart),
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 2 + 1,
        active: 0
      });
    }
    nodesRef.current = nodes;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const { width: w, height: h } = canvas;
    
    tickRef.current += 1;
    ctx.fillStyle = CONFIG.colors.bg;
    ctx.fillRect(0, 0, w, h);

    // 🚨 SIRENA REFORZADA (Más brillante y visible)
    const sirenX = (Math.sin(tickRef.current * 0.05) * 0.5 + 0.5) * w;
    const sirenGlow = ctx.createRadialGradient(sirenX, 0.5, 0.5, sirenX, 0.5, w * 0.5);
    // Subimos opacidad de 0.1 a 0.4 para que no sea opaca
    const color = tickRef.current % 100 < 50 ? CONFIG.colors.red : CONFIG.colors.blue;
    sirenGlow.addColorStop(0, `${color} 0.5)`); 
    sirenGlow.addColorStop(0.5, `${color} 0.1)`);
    sirenGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = sirenGlow;
    ctx.fillRect(0, 0, w, 400);

    const nodes = nodesRef.current;
    const mouse = mouseRef.current;

    nodes.forEach((n, i) => {
      n.x += n.vx;
      n.y += n.vy;

      // Rebote dentro de la franja de productos
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < CONFIG.sectionStart || n.y > CONFIG.sectionEnd) n.vy *= -1;

      // Interacción con mouse
      const dx = mouse.x - n.x;
      const dy = mouse.y - n.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < CONFIG.mouseRadius) {
        n.active = Math.min(n.active + 0.1, 1);
        n.x -= dx * 0.03;
        n.y -= dy * 0.03;
      } else {
        n.active *= 0.94;
      }

      // Conexiones
      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j];
        const d2 = Math.sqrt(Math.pow(n.x - n2.x, 2) + Math.pow(n.y - n2.y, 2));
        if (d2 < CONFIG.connectionDist) {
          const opacity = (1 - d2 / CONFIG.connectionDist) * (0.2 + n.active * 0.6);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 242, 255, ${opacity})`;
          ctx.lineWidth = n.active > 0.5 ? 1.2 : 0.6;
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();
        }
      }

      // Dibujar Nodo
      ctx.fillStyle = n.active > 0.5 ? '#00f2ff' : 'rgba(59, 130, 246, 0.8)';
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      init(window.innerWidth, window.innerHeight);
    };
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY + window.scrollY };
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();
    const frame = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frame);
    };
  }, [init, draw]);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none" />;
}