// 📁 src/app/components/NeuralBackground.tsx
// Red neuronal profesional v3 — estética militar/tech
// • Nodos hexagonales con anillos de escaneo
// • Conexiones con flujo de datos animado (líneas punteadas que se mueven)
// • Pulsos de señal con trail luminoso
// • Clusters de actividad que se propagan
// • Profundidad de campo con 3 capas
// • Reactividad al cursor: campo de fuerza radial
// • Sin dependencias — Canvas 2D puro, position:fixed z-index:-1

import { useEffect, useRef, useCallback } from 'react';

// ── Tipos ─────────────────────────────────────────────────────────────────────
interface Node {
  x: number; y: number;
  vx: number; vy: number;
  size: number;          // radio del hexágono
  layer: number;         // 0=fondo,1=medio,2=frente
  phase: number;         // animación interna
  phaseSpeed: number;
  energy: number;        // 0..1 nivel de activación
  energyDecay: number;
  scanRing: number;      // radio del anillo de escaneo (0=inactivo)
  type: 'hub' | 'relay' | 'sensor'; // hubs son más grandes y activos
}

interface Connection {
  a: number; b: number;
  dashOffset: number;    // desplazamiento del patrón de línea punteada
  flowSpeed: number;     // velocidad del flujo de datos
  active: boolean;
  pulseT: number;        // posición del pulso 0..1 (-1 = sin pulso)
  pulseSpeed: number;
}

// ── Paleta ───────────────────────────────────────────────────────────────────
// Rojo PREGAT: activo/energizado
// Azul frío: conexiones base
// Blanco: señales de alta frecuencia
const C = {
  bgDeep:  'rgb(3,5,12)',
  red:     [220, 38,  38 ] as const,
  redSoft: [180, 30,  30 ] as const,
  blue:    [30,  80,  200] as const,
  cyan:    [0,   180, 220] as const,
  white:   [220, 230, 255] as const,
};

function r(a: readonly number[], alpha: number) {
  return `rgba(${a[0]},${a[1]},${a[2]},${alpha})`;
}

// ── Dibujar hexágono ─────────────────────────────────────────────────────────
function hexPath(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number, rot = 0) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a  = (Math.PI / 3) * i + rot;
    const px = cx + s * Math.cos(a);
    const py = cy + s * Math.sin(a);
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.closePath();
}

// ── Componente ────────────────────────────────────────────────────────────────
export function NeuralBackground() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const nodesRef   = useRef<Node[]>([]);
  const connsRef   = useRef<Connection[]>([]);
  const mouseRef   = useRef({ x: -9999, y: -9999 });
  const frameRef   = useRef(0);
  const tickRef    = useRef(0);
  const W          = useRef(0);
  const H          = useRef(0);

  // ── Construir red ─────────────────────────────────────────────────────────
  const build = useCallback((w: number, h: number) => {
    const count = Math.min(65, Math.floor(w * h / 16000));
    const nodes: Node[] = [];

    for (let i = 0; i < count; i++) {
      const layer = i < count * 0.25 ? 0 : i < count * 0.6 ? 1 : 2;
      const type  = i < 4 ? 'hub' : i < count * 0.3 ? 'relay' : 'sensor';
      const size  = type === 'hub'    ? 8 + Math.random() * 5
                  : type === 'relay'  ? 4 + Math.random() * 4
                  :                    2 + Math.random() * 3;
      nodes.push({
        x: 60 + Math.random() * (w - 120),
        y: 60 + Math.random() * (h - 120),
        vx: (Math.random() - 0.5) * 0.18 * (layer === 0 ? 0.4 : layer === 1 ? 0.7 : 1),
        vy: (Math.random() - 0.5) * 0.18 * (layer === 0 ? 0.4 : layer === 1 ? 0.7 : 1),
        size, layer, type,
        phase:       Math.random() * Math.PI * 2,
        phaseSpeed:  0.01 + Math.random() * 0.02,
        energy:      type === 'hub' ? 0.6 : 0.1,
        energyDecay: 0.005 + Math.random() * 0.01,
        scanRing:    0,
      });
    }
    nodesRef.current = nodes;

    // Conexiones
    const conns: Connection[] = [];
    const MAX_D = Math.min(w, h) * 0.3;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_D && Math.random() > 0.5) {
          conns.push({
            a: i, b: j,
            dashOffset: Math.random() * 20,
            flowSpeed:  0.2 + Math.random() * 0.4,
            active: true,
            pulseT:     -1,
            pulseSpeed: 0.008 + Math.random() * 0.012,
          });
        }
      }
    }
    connsRef.current = conns;
  }, []);

  // ── Loop ─────────────────────────────────────────────────────────────────
  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false })!;

    const w = W.current, h = H.current;
    tickRef.current++;
    const t = tickRef.current;

    // ── Fondo con nebulosas de color ─────────────────────────────────────
    ctx.fillStyle = C.bgDeep;
    ctx.fillRect(0, 0, w, h);

    // Estela suave
    ctx.fillStyle = 'rgba(3,5,12,0.45)';
    ctx.fillRect(0, 0, w, h);

    // Manchas de luz ambiental que se mueven lentamente
    const amb = [
      { cx: w * (0.2 + 0.05 * Math.sin(t * 0.002)), cy: h * (0.25 + 0.04 * Math.cos(t * 0.0015)), r: w * 0.38, col: C.red,  a: 0.022 },
      { cx: w * (0.78 + 0.04 * Math.cos(t * 0.0018)), cy: h * (0.72 + 0.05 * Math.sin(t * 0.002)), r: w * 0.32, col: C.blue, a: 0.018 },
      { cx: w * 0.5, cy: h * 0.5, r: w * 0.22, col: C.cyan, a: 0.01 },
    ];
    for (const n of amb) {
      const grd = ctx.createRadialGradient(n.cx, n.cy, 0, n.cx, n.cy, n.r);
      grd.addColorStop(0, r(n.col, n.a));
      grd.addColorStop(1, r(n.col, 0));
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);
    }

    const nodes = nodesRef.current;
    const conns = connsRef.current;
    const mouse = mouseRef.current;

    // ── Actualizar nodos ─────────────────────────────────────────────────
    for (const n of nodes) {
      n.phase += n.phaseSpeed;
      n.energy = Math.max(0, n.energy - n.energyDecay * 0.5);

      // Atracción/repulsión del cursor
      const mdx = mouse.x - n.x;
      const mdy = mouse.y - n.y;
      const md2 = mdx * mdx + mdy * mdy;
      if (md2 < 280 * 280 && md2 > 0) {
        const md = Math.sqrt(md2);
        const f  = ((280 - md) / 280) * 0.0028;
        n.vx += (mdx / md) * f;
        n.vy += (mdy / md) * f;
        if (md < 130 && Math.random() < 0.006) {
          n.energy   = Math.min(1, n.energy + 0.5);
          n.scanRing = n.size * 1.5;
        }
      }

      const maxV = [0.1, 0.18, 0.28][n.layer];
      const spd  = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
      if (spd > maxV) { n.vx = n.vx / spd * maxV; n.vy = n.vy / spd * maxV; }
      n.vx *= 0.994; n.vy *= 0.994;

      // Deriva orgánica
      n.vx += Math.sin(n.phase * 0.6 + n.y * 0.008) * 0.0008;
      n.vy += Math.cos(n.phase * 0.5 + n.x * 0.008) * 0.0008;

      n.x += n.vx; n.y += n.vy;
      if (n.x < 0) { n.x = 0; n.vx *= -0.7; }
      if (n.x > w) { n.x = w; n.vx *= -0.7; }
      if (n.y < 0) { n.y = 0; n.vy *= -0.7; }
      if (n.y > h) { n.y = h; n.vy *= -0.7; }

      // Anillo de escaneo
      if (n.scanRing > 0) n.scanRing += 1.2;
      if (n.scanRing > n.size * 8) n.scanRing = 0;
    }

    // ── Disparos espontáneos ─────────────────────────────────────────────
    if (t % 55 === 0) {
      const hubs = nodes.filter(n => n.type === 'hub');
      if (hubs.length) {
        const hub   = hubs[Math.floor(Math.random() * hubs.length)];
        hub.energy  = 0.85;
        hub.scanRing = hub.size * 1.5;
      }
    }

    // ── Actualizar conexiones y propagar energía ──────────────────────────
    for (const c of conns) {
      c.dashOffset -= c.flowSpeed;

      const na = nodes[c.a]; const nb = nodes[c.b];
      if (!na || !nb) continue;

      // Lanzar pulso cuando el nodo fuente tiene alta energía
      if (c.pulseT < 0 && (na.energy > 0.5 || nb.energy > 0.5) && Math.random() < 0.02) {
        c.pulseT = 0;
      }

      if (c.pulseT >= 0) {
        c.pulseT += c.pulseSpeed;
        if (c.pulseT >= 1) {
          // El pulso llega: energizar nodo destino
          const dest = na.energy > nb.energy ? nb : na;
          dest.energy   = Math.min(1, dest.energy + 0.35);
          dest.scanRing = dest.size * 1.5;
          c.pulseT = -1;
        }
      }
    }

    // ── Dibujar por capas ─────────────────────────────────────────────────
    for (let layer = 0; layer <= 2; layer++) {
      const la = [0.2, 0.5, 1.0][layer]; // alpha por capa
      const ls = [0.4, 0.7, 1.0][layer]; // escala por capa

      // 1. Conexiones de esta capa
      for (const c of conns) {
        const na = nodes[c.a]; const nb = nodes[c.b];
        if (!na || !nb) continue;
        if (Math.round((na.layer + nb.layer) / 2) !== layer) continue;

        const dx   = nb.x - na.x;
        const dy   = nb.y - na.y;
        const d    = Math.sqrt(dx * dx + dy * dy);
        const MAX_D = Math.min(w, h) * 0.3;
        const fade  = Math.max(0, 1 - d / MAX_D);
        if (fade < 0.02) continue;

        const energy = (na.energy + nb.energy) / 2;
        const col    = energy > 0.4 ? C.red : C.blue;
        const alpha  = fade * la * 0.35 * (1 + energy * 0.6);

        // Línea punteada con flujo animado
        ctx.save();
        ctx.setLineDash([4, 8]);
        ctx.lineDashOffset = c.dashOffset;
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = r(col, alpha);
        ctx.lineWidth   = (0.4 + energy * 0.8) * ls;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        // Línea sólida tenue debajo
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = r(col, alpha * 0.3);
        ctx.lineWidth   = 0.4 * ls;
        ctx.stroke();

        // Pulso viajando
        if (c.pulseT >= 0) {
          const px   = na.x + (nb.x - na.x) * c.pulseT;
          const py   = na.y + (nb.y - na.y) * c.pulseT;
          const pulseR = 3 * ls;

          // Trail del pulso (estela)
          for (let tr = 0; tr < 5; tr++) {
            const tt  = Math.max(0, c.pulseT - tr * 0.04);
            const trx = na.x + (nb.x - na.x) * tt;
            const try_ = na.y + (nb.y - na.y) * tt;
            ctx.beginPath();
            ctx.arc(trx, try_, pulseR * (1 - tr * 0.18), 0, Math.PI * 2);
            ctx.fillStyle = r(energy > 0.4 ? C.red : C.cyan, (0.5 - tr * 0.1) * la);
            ctx.fill();
          }

          // Punto central brillante
          ctx.beginPath();
          ctx.arc(px, py, pulseR * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = r(C.white, 0.95 * la);
          ctx.fill();
        }
      }

      // 2. Nodos de esta capa
      for (const n of nodes) {
        if (n.layer !== layer) continue;

        const pulse  = 0.75 + 0.25 * Math.sin(n.phase);
        const s      = n.size * ls * pulse;
        const energy = n.energy;
        const col    = energy > 0.5 ? C.red : n.type === 'hub' ? C.cyan : C.blue;

        // Anillo de escaneo (ondas expansivas)
        if (n.scanRing > 0) {
          const ringAlpha = Math.max(0, 1 - n.scanRing / (n.size * 8));
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.scanRing, 0, Math.PI * 2);
          ctx.strokeStyle = r(col, ringAlpha * la * 0.6);
          ctx.lineWidth   = 1;
          ctx.stroke();
        }

        // Halo de energía
        const haloR = s * (3 + energy * 4);
        const hgrd  = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, haloR);
        hgrd.addColorStop(0,   r(col, (0.3 + energy * 0.5) * la));
        hgrd.addColorStop(0.4, r(col, (0.1 + energy * 0.2) * la));
        hgrd.addColorStop(1,   r(col, 0));
        ctx.beginPath();
        ctx.arc(n.x, n.y, haloR, 0, Math.PI * 2);
        ctx.fillStyle = hgrd;
        ctx.fill();

        // Hexágono relleno (fondo)
        hexPath(ctx, n.x, n.y, s, n.phase * 0.1);
        ctx.fillStyle = r(col, (0.08 + energy * 0.15) * la);
        ctx.fill();

        // Hexágono borde
        hexPath(ctx, n.x, n.y, s, n.phase * 0.1);
        ctx.strokeStyle = r(col, (0.6 + energy * 0.4) * la);
        ctx.lineWidth   = (0.8 + energy * 0.8) * ls;
        ctx.stroke();

        // Hexágono interior (nodos hub tienen doble anillo)
        if (n.type === 'hub') {
          hexPath(ctx, n.x, n.y, s * 0.55, -n.phase * 0.15);
          ctx.strokeStyle = r(col, 0.35 * la);
          ctx.lineWidth   = 0.6 * ls;
          ctx.stroke();
        }

        // Punto central
        ctx.beginPath();
        ctx.arc(n.x, n.y, s * 0.22, 0, Math.PI * 2);
        ctx.fillStyle = r(C.white, (0.6 + energy * 0.4) * la);
        ctx.fill();

        // Crosshair en hubs activos
        if (n.type === 'hub' && energy > 0.3) {
          const cl = s * 0.8;
          ctx.strokeStyle = r(col, energy * 0.5 * la);
          ctx.lineWidth   = 0.5;
          ctx.beginPath(); ctx.moveTo(n.x - cl, n.y); ctx.lineTo(n.x + cl, n.y); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(n.x, n.y - cl); ctx.lineTo(n.x, n.y + cl); ctx.stroke();
        }
      }
    }

    // ── Grilla táctica de fondo (muy tenue) ──────────────────────────────
    ctx.save();
    ctx.strokeStyle = 'rgba(30,60,120,0.04)';
    ctx.lineWidth   = 0.5;
    const gridS = 60;
    for (let gx = 0; gx < w; gx += gridS) {
      ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke();
    }
    for (let gy = 0; gy < h; gy += gridS) {
      ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke();
    }
    ctx.restore();

    // ── Viñeta perimetral ─────────────────────────────────────────────────
    const vgrd = ctx.createRadialGradient(w/2, h/2, h*0.25, w/2, h/2, h*0.9);
    vgrd.addColorStop(0, 'rgba(3,5,12,0)');
    vgrd.addColorStop(1, 'rgba(3,5,12,0.7)');
    ctx.fillStyle = vgrd;
    ctx.fillRect(0, 0, w, h);

    frameRef.current = requestAnimationFrame(loop);
  }, []);

  // ── Resize ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      canvas.width = w; canvas.height = h;
      W.current = w; H.current = h;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (ctx) { ctx.fillStyle = C.bgDeep; ctx.fillRect(0, 0, w, h); }
      build(w, h);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [build]);

  // ── Mouse ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const mv  = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const out = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    window.addEventListener('mousemove', mv, { passive: true });
    window.addEventListener('mouseleave', out);
    return () => { window.removeEventListener('mousemove', mv); window.removeEventListener('mouseleave', out); };
  }, []);

  // ── RAF ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [loop]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:      'fixed',
        inset:         0,
        width:         '100vw',
        height:        '100vh',
        zIndex:        -1,
        pointerEvents: 'none',
        display:       'block',
      }}
    />
  );
}