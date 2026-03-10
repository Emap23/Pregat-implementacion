// 📁 src/app/App.tsx
import { Navbar }              from './components/Navbar';
import { HeroSection }         from './components/HeroSection';
import { AboutSection }        from './components/AboutSection';
import { SCPSection }          from './components/SCPSection';
import { IntegrationSection }  from './components/IntegrationSection';
import { ProductsSection }     from './components/ProductsSection';
import { StatsSection }        from './components/StatsSection';
import { ModulesSection }      from './components/ModulesSection';
import { ContactSection }      from './components/ContactSection';
import { Footer }              from './components/Footer';
import { Preloader }           from './components/Preloader';
import { CustomCursor }        from './components/CustomCursor';
import { SmoothScroll }        from './components/SmoothScroll';
import { BackToTop }           from './components/BackToTop';
import { PREGATMarquee }       from './components/Marquee';
import { SirenOverlay }        from './components/SirenOverlay';  // ← NUEVO

export default function App() {
  return (
    <>
      {/* Sirena en toda la página — fixed, z-index alto, pointer-events:none */}
      <SirenOverlay />

      <Preloader />
      <CustomCursor />
      <SmoothScroll />
      <BackToTop />

      <div className="min-h-screen cursor-none">
        <Navbar />
        <HeroSection />
        <PREGATMarquee variant="red" direction="left" />
        <AboutSection />
        <SCPSection />
        <IntegrationSection />
        <ProductsSection />
        <PREGATMarquee variant="dark" direction="right" />
        <StatsSection />
        <ModulesSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}