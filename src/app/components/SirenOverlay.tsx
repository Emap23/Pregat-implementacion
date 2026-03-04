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
          width: 90vw;
          height: 90vh;
          background: radial-gradient(
            ellipse at 38% 30%,
            rgba(255, 80, 80, 1)  0%,
            rgba(255, 60, 60, 0.80) 15%,
            rgba(220, 38, 38, 0.50) 38%,
            rgba(220, 38, 38, 0.20) 60%,
            transparent 78%
          );
          filter: blur(35px);
          animation: sirenRed 1.5s ease-in-out infinite;
        }

        /* ── Azul ── */
        .siren-orb-blue {
          top:   -35vh;
          right: -25vw;
          width: 90vw;
          height: 90vh;
          background: radial-gradient(
            ellipse at 62% 30%,
            rgba(80, 150, 255, 1)  0%,
            rgba(70, 130, 255, 0.80) 15%,
            rgba(37, 99, 235, 0.50) 38%,
            rgba(37, 99, 235, 0.20) 60%,
            transparent 78%
          );
          filter: blur(35px);
          animation: sirenBlue 1.5s ease-in-out infinite;
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
            rgba(180, 100, 255, 0.40)  0%,
            rgba(100,  150, 255, 0.25) 40%,
            transparent 75%
          );
          filter: blur(50px);
          animation: sirenBottom 1.5s ease-in-out infinite;
        }

        /* Patrón de torreta de patrulla real - doble flash brillante */
        @keyframes sirenRed {
          0%      { opacity: 0; }
          5%      { opacity: 1; }
          8%      { opacity: 0; }
          13%     { opacity: 1; }
          18%     { opacity: 0; }
          50%     { opacity: 0; }
          55%     { opacity: 0.4; }
          100%    { opacity: 0; }
        }

        @keyframes sirenBlue {
          0%      { opacity: 0; }
          50%     { opacity: 0; }
          55%     { opacity: 1; }
          60%     { opacity: 0; }
          65%     { opacity: 1; }
          70%     { opacity: 0; }
          95%     { opacity: 0.4; }
          100%    { opacity: 0; }
        }

        @keyframes sirenBottom {
          0%      { opacity: 0.2; }
          5%      { opacity: 0.7; }
          8%      { opacity: 0.2; }
          13%     { opacity: 0.7; }
          18%     { opacity: 0.2; }
          50%     { opacity: 0.2; }
          55%     { opacity: 0.7; }
          60%     { opacity: 0.2; }
          65%     { opacity: 0.7; }
          70%     { opacity: 0.2; }
          95%     { opacity: 0.7; }
          100%    { opacity: 0.2; }
        }
      `}</style>
    </>
  );
}