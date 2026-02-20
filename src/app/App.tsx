import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SCPSection } from './components/SCPSection';
import { IntegrationSection } from './components/IntegrationSection';
import { StatsSection } from './components/StatsSection';
import { MapSection } from './components/MapSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <SCPSection />
      <IntegrationSection />
      <StatsSection />
      <MapSection />
      <Footer />
    </div>
  );
}
