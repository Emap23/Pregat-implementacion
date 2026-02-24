// 📁 src/app/App.tsx
//
// ÚNICO CAMBIO respecto al original:
//   + import { NeuralBackground }
//   + <NeuralBackground /> como primer hijo del fragment
//
// El resto es IDÉNTICO al original — ProductsSection y todo lo demás
// queda exactamente igual.

import { Navbar }              from './components/Navbar';
import { HeroSection }         from './components/HeroSection';
import { SCPSection }          from './components/SCPSection';
import { IntegrationSection }  from './components/IntegrationSection';
import { ProductsSection }     from './components/ProductsSection';
import { StatsSection }        from './components/StatsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection }      from './components/ContactSection';
import { Footer }              from './components/Footer';
import { Preloader }           from './components/Preloader';
import { CustomCursor }        from './components/CustomCursor';
import { SmoothScroll }        from './components/SmoothScroll';
import { BackToTop }           from './components/BackToTop';
import { PREGATMarquee }       from './components/Marquee';
import { NeuralBackground }    from './components/NeuralBackground';  // ← NUEVO

export default function App() {
  return (
    <>
      {/* ← NUEVO: va primero, position:fixed z-index:-1, no afecta layout */}
      <NeuralBackground />

      <Preloader />
      <CustomCursor />
      <SmoothScroll />
      <BackToTop />

      {/* Exactamente igual al original */}
      <div className="min-h-screen cursor-none">
        <Navbar />
        <HeroSection />
        <PREGATMarquee variant="red" direction="left" />
        <SCPSection />
        <IntegrationSection />
        <ProductsSection />
        <PREGATMarquee variant="dark" direction="right" />
        <StatsSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}