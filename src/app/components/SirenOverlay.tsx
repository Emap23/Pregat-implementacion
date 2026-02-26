// 📁 src/app/components/SirenOverlay.tsx
//
// Luces de sirena en TODA la página.
// position:fixed — siempre visible sin importar el scroll
// z-index:9999  — encima de todo el contenido
// pointer-events:none — no interfiere con clicks ni interacciones
// mix-blend-mode:screen — se mezcla con cualquier fondo oscuro sin tapar el contenido

export function SirenOverlay() {
  return (
    <>
      <div aria-hidden="true" className="siren-overlay-root">
        {/* Luz ROJA — esquina superior izquierda */}
        <div className="siren-orb siren-orb-red" />
        {/* Luz AZUL — esquina superior derecha */}
        <div className="siren-orb siren-orb-blue" />
        {/* Reflejo inferior — mezcla ambientada */}
        <div className="siren-orb siren-orb-bottom" />
      </div>

      <style>{`
        .siren-overlay-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          pointer-events: none;
          overflow: hidden;
        }

        .siren-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        /* ── Rojo ── */
        .siren-orb-red {
          top:   -35vh;
          left:  -25vw;
          width:  90vw;
          height: 90vh;
          background: radial-gradient(
            ellipse at 38% 30%,
            rgba(220, 38, 38, 0.70)  0%,
            rgba(220, 38, 38, 0.35) 15%,
            rgba(220, 38, 38, 0.10) 38%,
            rgba(220, 38, 38, 0.02) 60%,
            transparent 78%
          );
          filter: blur(50px);
          animation: sirenR 1.4s ease-in-out infinite;
        }

        /* ── Azul ── */
        .siren-orb-blue {
          top:   -35vh;
          right: -25vw;
          width:  90vw;
          height: 90vh;
          background: radial-gradient(
            ellipse at 62% 30%,
            rgba(37, 99, 235, 0.70)  0%,
            rgba(37, 99, 235, 0.35) 15%,
            rgba(37, 99, 235, 0.10) 38%,
            rgba(37, 99, 235, 0.02) 60%,
            transparent 78%
          );
          filter: blur(50px);
          animation: sirenB 1.4s ease-in-out 0.7s infinite;
        }

        /* ── Reflejo inferior suave ── */
        .siren-orb-bottom {
          bottom: -20vh;
          left: 50%;
          transform: translateX(-50%);
          width:  100vw;
          height:  50vh;
          background: radial-gradient(
            ellipse at 50% 80%,
            rgba(100, 60, 200, 0.12)  0%,
            rgba(37,  99, 235, 0.05) 40%,
            transparent 75%
          );
          filter: blur(70px);
          animation: sirenBottom 2.8s ease-in-out infinite;
        }

        /* Rojo: enciende en 0-35%, apagado en 50-100% */
        @keyframes sirenR {
          0%         { opacity: 0.08; transform: scale(0.88) translateY(-1vh); }
          25%        { opacity: 1;    transform: scale(1.10) translateY(0);    }
          40%        { opacity: 0.80; transform: scale(1.06) translateY(0);    }
          55%, 100%  { opacity: 0.02; transform: scale(0.90) translateY(-1vh); }
        }

        /* Azul: apagado en 0-45%, enciende en 55-90% */
        @keyframes sirenB {
          0%,  45%  { opacity: 0.02; transform: scale(0.90) translateY(-1vh); }
          70%       { opacity: 1;    transform: scale(1.10) translateY(0);    }
          85%       { opacity: 0.80; transform: scale(1.06) translateY(0);    }
          100%      { opacity: 0.08; transform: scale(0.88) translateY(-1vh); }
        }

        @keyframes sirenBottom {
          0%, 100% { opacity: 0.4; }
          50%      { opacity: 0.9; }
        }
      `}</style>
    </>
  );
}