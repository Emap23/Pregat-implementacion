// 📁 src/app/components/NeuralBackground.tsx
// 300 nodos, muy visibles, solo en sección padre (position:absolute)

import { useEffect, useRef, useCallback } from 'react';

const CFG = {
  count:       300,
  connDist:    190,
  mouseRad:    220,
  repelRad:    75,
  speed:       0.65,
};

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  active: number;
  pulse: number; pulseSpd: number;
}

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodes     = useRef<Node[]>([]);
  const mouse     = useRef({ x: -9999, y: -9999 });
  const raf       = useRef(0);

  const init = useCallback((w: number, h: number) => {
    nodes.current = Array.from({ length: CFG.count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * CFG.speed,
      vy: (Math.random() - 0.5) * CFG.speed,
      r: Math.random() * 2.5 + 1.2,
      active: 0,
      pulse: Math.random() * Math.PI * 2,
      pulseSpd: 0.016 + Math.random() * 0.022,
    }));
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    const ns = nodes.current;
    const mx = mouse.current.x, my = mouse.current.y;

    // ── update ──
    for (const n of ns) {
      n.pulse += n.pulseSpd;
      n.x += n.vx; n.y += n.vy;

      if (n.x < 0)  { n.x = 0;  n.vx =  Math.abs(n.vx); }
      if (n.x > W)  { n.x = W;  n.vx = -Math.abs(n.vx); }
      if (n.y < 0)  { n.y = 0;  n.vy =  Math.abs(n.vy); }
      if (n.y > H)  { n.y = H;  n.vy = -Math.abs(n.vy); }

      const dx = mx - n.x, dy = my - n.y;
      const d  = Math.hypot(dx, dy);

      if (d < CFG.repelRad) {
        const f = (CFG.repelRad - d) / CFG.repelRad;
        n.x -= dx * f * 0.12; n.y -= dy * f * 0.12;
        n.active = Math.min(n.active + 0.2, 1);
      } else if (d < CFG.mouseRad) {
        const f = (1 - d / CFG.mouseRad) * 0.028;
        n.vx += dx * f; n.vy += dy * f;
        const spd = Math.hypot(n.vx, n.vy);
        if (spd > 3.5) { n.vx = n.vx / spd * 3.5; n.vy = n.vy / spd * 3.5; }
        n.active = Math.min(n.active + 0.07, 1);
      } else {
        n.active *= 0.94;
        n.vx += (Math.random() - 0.5) * 0.03 - n.vx * 0.006;
        n.vy += (Math.random() - 0.5) * 0.03 - n.vy * 0.006;
      }
    }

    // ── conexiones ──
    for (let i = 0; i < ns.length; i++) {
      const a = ns[i];
      for (let j = i + 1; j < ns.length; j++) {
        const b  = ns[j];
        const d  = Math.hypot(a.x - b.x, a.y - b.y);
        if (d >= CFG.connDist) continue;

        const t    = 1 - d / CFG.connDist;
        const act  = Math.max(a.active, b.active);
        // opacidad base alta para que se vean sin hover
        const op   = t * 0.45 + act * 0.5;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);

        if (act > 0.2) {
          ctx.strokeStyle = `rgba(0,230,255,${Math.min(op, 0.95)})`;
          ctx.lineWidth   = 1.5;
        } else {
          ctx.strokeStyle = `rgba(60,160,255,${Math.min(op, 0.85)})`;
          ctx.lineWidth   = 0.8;
        }
        ctx.stroke();
      }
    }

    // ── nodos ──
    for (const n of ns) {
      const pulse = 1 + Math.sin(n.pulse) * 0.2 * n.active;
      const r     = n.r * pulse;

      // halo
      if (n.active > 0.1) {
        const hr  = r * (4 + n.active * 6);
        const grd = ctx.createRadialGradient(n.x, n.y, r * 0.4, n.x, n.y, hr);
        grd.addColorStop(0, `rgba(0,242,255,${n.active * 0.5})`);
        grd.addColorStop(1, 'rgba(0,242,255,0)');
        ctx.beginPath(); ctx.arc(n.x, n.y, hr, 0, Math.PI * 2);
        ctx.fillStyle = grd; ctx.fill();
      }

      // nodo
      ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      if (n.active > 0.3) {
        const g = ctx.createRadialGradient(n.x - r * .3, n.y - r * .3, 0, n.x, n.y, r);
        g.addColorStop(0,   '#fff');
        g.addColorStop(0.4, '#00f2ff');
        g.addColorStop(1,   'rgba(0,140,210,.9)');
        ctx.fillStyle = g;
      } else {
        // nodos en reposo: azul visible, no transparente
        ctx.fillStyle = 'rgba(80,170,255,0.85)';
      }
      ctx.fill();
    }

    raf.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas  = canvasRef.current;
    const section = canvas?.parentElement;
    if (!canvas || !section) return;

    const resize = () => {
      canvas.width  = section.clientWidth;
      canvas.height = section.clientHeight;
      init(canvas.width, canvas.height);
    };

    const onMove  = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) raf.current = requestAnimationFrame(draw);
      else cancelAnimationFrame(raf.current);
    }, { threshold: 0.05 });

    obs.observe(canvas);
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    section.addEventListener('mouseleave', onLeave);
    raf.current = requestAnimationFrame(draw);

    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
    };
  }, [init, draw]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}