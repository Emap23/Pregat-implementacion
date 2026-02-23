// 📁 src/app/components/CustomCursor.tsx
// Mira de francotirador 3D ultra-realista
// Detecta fondo claro/oscuro automáticamente
// Animación de disparo al hacer click en nav links

import { useEffect, useRef, useState, useCallback } from 'react';

type Theme = 'light' | 'dark';

export function CustomCursor() {
  const cursorRef  = useRef<HTMLDivElement>(null);
  const posRef     = useRef({ x: -300, y: -300 });
  const rafPos     = useRef<number>(0);
  const rafSample  = useRef<number>(0);

  const [theme, setTheme]         = useState<Theme>('dark');
  const [hovering, setHovering]   = useState(false);
  const [shooting, setShooting]   = useState(false);
  const [shots, setShots]         = useState<{ id: number; x: number; y: number }[]>([]);
  const [breathe, setBreathe]     = useState(false); // expansión de respiración lenta

  // ── Detección de tema por color de fondo ──
  const sampleBg = useCallback(() => {
    const { x, y } = posRef.current;
    if (x < 0 || y < 0) { rafSample.current = requestAnimationFrame(sampleBg); return; }
    const el = document.elementFromPoint(x, y) as HTMLElement | null;
    let target = el;
    let bg = '';
    while (target && target !== document.body) {
      const c = window.getComputedStyle(target).backgroundColor;
      if (c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent') { bg = c; break; }
      target = target.parentElement;
    }
    if (!bg) bg = window.getComputedStyle(document.body).backgroundColor;
    const m = bg.match(/[\d.]+/g);
    if (m && m.length >= 3) {
      const lum = (0.299 * +m[0] + 0.587 * +m[1] + 0.114 * +m[2]) / 255;
      setTheme(lum > 0.55 ? 'light' : 'dark');
    }
    rafSample.current = requestAnimationFrame(sampleBg);
  }, []);

  // ── Respiración lenta (la mira se expande ligeramente) ──
  useEffect(() => {
    const interval = setInterval(() => setBreathe(b => !b), 2200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e: MouseEvent) => { posRef.current = { x: e.clientX, y: e.clientY }; };

    const loopPos = () => {
      if (cursor) {
        cursor.style.transform = `translate(${posRef.current.x - 36}px, ${posRef.current.y - 36}px)`;
      }
      rafPos.current = requestAnimationFrame(loopPos);
    };

    const onClick = (e: MouseEvent) => {
      setShooting(true);
      const id = Date.now();
      setShots(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setShooting(false), 350);
      setTimeout(() => setShots(prev => prev.filter(s => s.id !== id)), 900);
    };

    const attachHover = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', () => setHovering(true));
        el.addEventListener('mouseleave', () => setHovering(false));
      });
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('click', onClick);
    rafPos.current   = requestAnimationFrame(loopPos);
    rafSample.current = requestAnimationFrame(sampleBg);
    attachHover();

    const obs = new MutationObserver(attachHover);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(rafPos.current);
      cancelAnimationFrame(rafSample.current);
      obs.disconnect();
    };
  }, [sampleBg]);

  // Colores según tema + estado
  const primary = theme === 'light'
    ? (hovering ? 'rgba(185,28,28,1)' : 'rgba(30,30,30,0.92)')
    : (hovering ? 'rgba(255,80,80,1)' : 'rgba(255,255,255,0.88)');

  const glow = hovering
    ? (theme === 'light' ? 'rgba(220,38,38,0.7)' : 'rgba(255,80,80,0.6)')
    : (theme === 'light' ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.2)');

  const size    = hovering ? 76 : 72;
  const cx      = size / 2;
  const outerR  = cx - 5;
  const innerR  = outerR * 0.34;
  // Respiración: el anillo exterior oscila ±1.5px
  const breatheOffset = breathe ? 1.5 : 0;

  return (
    <>
      {/* ── Mira 3D ── */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[99999] will-change-transform"
        style={{ width: size, height: size, transition: 'width 0.2s, height 0.2s' }}
      >
        <svg
          width={size} height={size}
          viewBox={`0 0 ${size} ${size}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: shooting
              ? `drop-shadow(0 0 12px ${glow}) drop-shadow(0 0 28px ${glow})`
              : `drop-shadow(0 0 5px ${glow}) drop-shadow(0 0 2px ${glow})`,
            transition: 'filter 0.2s',
          }}
        >
          {/* ── Anillo exterior con efecto 3D (gradiente + sombra) ── */}
          <circle
            cx={cx} cy={cx}
            r={outerR + breatheOffset}
            stroke={primary}
            strokeWidth={shooting ? 2.5 : 1.5}
            fill="none"
            strokeDasharray={hovering ? '3 3' : '5 3'}
            opacity={0.9}
            style={{ transition: 'stroke 0.2s, stroke-width 0.15s, r 0.8s' }}
          >
            <animateTransform attributeName="transform" type="rotate"
              from={`0 ${cx} ${cx}`} to={`360 ${cx} ${cx}`}
              dur={hovering ? '2.5s' : '6s'} repeatCount="indefinite" />
          </circle>

          {/* Anillo exterior estático (sombra del primero — efecto profundidad) */}
          <circle
            cx={cx} cy={cx}
            r={outerR + breatheOffset + 3}
            stroke={primary}
            strokeWidth="0.5"
            fill="none"
            opacity="0.18"
            strokeDasharray="2 6"
          >
            <animateTransform attributeName="transform" type="rotate"
              from={`360 ${cx} ${cx}`} to={`0 ${cx} ${cx}`}
              dur="12s" repeatCount="indefinite" />
          </circle>

          {/* ── Lente central (efecto vidrio 3D) ── */}
          {/* Círculo exterior del lente */}
          <circle cx={cx} cy={cx} r={innerR + 2} stroke={primary} strokeWidth="1" fill="none" opacity="0.6" style={{ transition: 'stroke 0.2s' }} />
          {/* Relleno del lente — vidrio oscuro */}
          <circle cx={cx} cy={cx} r={innerR}
            fill={theme === 'light' ? 'rgba(0,0,0,0.12)' : 'rgba(0,0,0,0.35)'}
            stroke={primary} strokeWidth="0.5" opacity="0.8"
          />
          {/* Reflejo del lente (highlight 3D) */}
          <ellipse
            cx={cx - innerR * 0.28} cy={cx - innerR * 0.28}
            rx={innerR * 0.38} ry={innerR * 0.22}
            fill={theme === 'light' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.15)'}
            transform={`rotate(-35 ${cx} ${cx})`}
            style={{ transition: 'fill 0.2s' }}
          />

          {/* ── Punto central (reticle dot) ── */}
          <circle cx={cx} cy={cx} r={shooting ? 3.5 : 2}
            fill={primary}
            opacity="1"
            style={{ transition: 'r 0.12s, fill 0.2s', filter: `drop-shadow(0 0 4px ${primary})` }}
          />

          {/* ── Cruz principal — 4 líneas con corte en el lente ── */}
          {/* Izquierda */}
          <line x1="3" y1={cx} x2={cx - innerR - 4} y2={cx} stroke={primary} strokeWidth="1.2" opacity="0.95" style={{ transition: 'stroke 0.2s' }} />
          {/* Derecha */}
          <line x1={cx + innerR + 4} y1={cx} x2={size - 3} y2={cx} stroke={primary} strokeWidth="1.2" opacity="0.95" style={{ transition: 'stroke 0.2s' }} />
          {/* Arriba */}
          <line x1={cx} y1="3" x2={cx} y2={cx - innerR - 4} stroke={primary} strokeWidth="1.2" opacity="0.95" style={{ transition: 'stroke 0.2s' }} />
          {/* Abajo */}
          <line x1={cx} y1={cx + innerR + 4} x2={cx} y2={size - 3} stroke={primary} strokeWidth="1.2" opacity="0.95" style={{ transition: 'stroke 0.2s' }} />

          {/* Marcas de mil (submarinas) en la cruz */}
          {[-1, 1].map((dir, i) => (
            <g key={i}>
              {/* Horizontal izquierda/derecha */}
              <line x1={cx + dir * (innerR + 10)} y1={cx - 3} x2={cx + dir * (innerR + 10)} y2={cx + 3} stroke={primary} strokeWidth="0.8" opacity="0.5" />
              <line x1={cx + dir * (innerR + 18)} y1={cx - 2} x2={cx + dir * (innerR + 18)} y2={cx + 2} stroke={primary} strokeWidth="0.6" opacity="0.35" />
              {/* Vertical arriba/abajo */}
              <line x1={cx - 3} y1={cx + dir * (innerR + 10)} x2={cx + 3} y2={cx + dir * (innerR + 10)} stroke={primary} strokeWidth="0.8" opacity="0.5" />
              <line x1={cx - 2} y1={cx + dir * (innerR + 18)} x2={cx + 2} y2={cx + dir * (innerR + 18)} stroke={primary} strokeWidth="0.6" opacity="0.35" />
            </g>
          ))}

          {/* ── Marcas de esquina (BDC) ── */}
          {([[1,1],[-1,1],[1,-1],[-1,-1]] as [number,number][]).map(([dx, dy], i) => {
            const bx = cx + dx * (outerR * 0.68);
            const by = cx + dy * (outerR * 0.68);
            return (
              <g key={i}>
                <line x1={bx} y1={by} x2={bx - dx * 5} y2={by} stroke={primary} strokeWidth="0.8" opacity="0.4" />
                <line x1={bx} y1={by} x2={bx} y2={by - dy * 5} stroke={primary} strokeWidth="0.8" opacity="0.4" />
              </g>
            );
          })}

          {/* ── Arcos decorativos (efecto rangefinder) ── */}
          <path
            d={`M ${cx - outerR * 0.58} ${cx - outerR * 0.58} A ${outerR * 0.82} ${outerR * 0.82} 0 0 1 ${cx + outerR * 0.58} ${cx - outerR * 0.58}`}
            stroke={primary} strokeWidth="0.6" fill="none" opacity="0.2"
          />
        </svg>

        {/* Label dinámico */}
        {hovering && (
          <div
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-mono text-[8px] tracking-[0.3em] uppercase whitespace-nowrap"
            style={{ color: primary, textShadow: `0 0 8px ${glow}`, transition: 'color 0.2s' }}
          >
            OBJETIVO
          </div>
        )}

        {/* Indicador de "breathing" (pequeño texto de zoom) */}
        {!hovering && (
          <div
            className="absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-[7px] tracking-widest whitespace-nowrap opacity-40"
            style={{ color: primary, transition: 'color 0.2s' }}
          >
            4×
          </div>
        )}
      </div>

      {/* ── Efectos de disparo ── */}
      {shots.map(shot => (
        <ShotRipple key={shot.id} x={shot.x} y={shot.y} theme={theme} />
      ))}
    </>
  );
}

function ShotRipple({ x, y, theme }: { x: number; y: number; theme: Theme }) {
  const color  = theme === 'light' ? 'rgba(185,28,28' : 'rgba(255,80,80';
  const color2 = theme === 'light' ? 'rgba(220,38,38' : 'rgba(255,120,120';
  return (
    <div className="pointer-events-none fixed top-0 left-0 z-[99998]" style={{ transform: `translate(${x}px, ${y}px)` }}>
      {/* Onda 1 */}
      <div className="absolute rounded-full border-2" style={{ width: 8, height: 8, marginLeft: -4, marginTop: -4, borderColor: `${color},1)`, animation: 'shotRing 0.7s ease-out forwards' }} />
      {/* Onda 2 */}
      <div className="absolute rounded-full border" style={{ width: 8, height: 8, marginLeft: -4, marginTop: -4, borderColor: `${color},0.6)`, animation: 'shotRing 0.7s ease-out 0.1s forwards' }} />
      {/* Onda 3 (grande) */}
      <div className="absolute rounded-full border" style={{ width: 8, height: 8, marginLeft: -4, marginTop: -4, borderColor: `${color},0.3)`, animation: 'shotRing 0.9s ease-out 0.05s forwards' }} />
      {/* Flash */}
      <div className="absolute rounded-full" style={{ width: 10, height: 10, marginLeft: -5, marginTop: -5, background: `${color2},1)`, animation: 'shotFlash 0.35s ease-out forwards', boxShadow: `0 0 12px ${color2},0.8)` }} />
      {/* Cruz de impacto */}
      <div style={{ position: 'absolute', width: 20, height: 1, marginLeft: -10, marginTop: -0.5, background: `${color},0.6)`, animation: 'shotFlash 0.4s ease-out forwards' }} />
      <div style={{ position: 'absolute', width: 1, height: 20, marginLeft: -0.5, marginTop: -10, background: `${color},0.6)`, animation: 'shotFlash 0.4s ease-out forwards' }} />
    </div>
  );
}