import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Menu, X, ShieldAlert } from 'lucide-react';
import logo from '../../../img/logopregat.png';

const navLinks = [
  { label: 'Sistema SCP', id: 'scp' },
  { label: 'Integración', id: 'integracion' },
  { label: 'Diferenciadores', id: 'diferenciadores' },
  { label: 'Contacto', id: 'contacto' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = [...navLinks].reverse().map(l => document.getElementById(l.id));
      for (const section of sections) {
        if (section && window.scrollY >= section.offsetTop - 200) {
          setActiveId(section.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#030712]/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.8)] border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      {/* Sirenas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none h-20">
        <div
          className="absolute -top-10 -left-10 w-[350px] h-[250px] animate-siren-red opacity-100"
          style={{ background: 'radial-gradient(circle at center, rgba(255,0,0,0.5) 0%, rgba(255,0,0,0.15) 45%, transparent 75%)' }}
        />
        <div
          className="absolute -top-10 -right-10 w-[350px] h-[250px] animate-siren-blue opacity-100"
          style={{ background: 'radial-gradient(circle at center, rgba(0,80,255,0.5) 0%, rgba(0,80,255,0.15) 45%, transparent 75%)' }}
        />
        <div className="absolute top-0 left-0 w-full h-[2px] flex opacity-50">
          <div className="w-1/2 h-full bg-red-600 shadow-[0_0_20px_red] animate-pulse" />
          <div className="w-1/2 h-full bg-blue-600 shadow-[0_0_20px_blue] animate-pulse [animation-delay:0.4s]" />
        </div>
      </div>

      {/* Línea táctica inferior */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent shadow-[0_0_20px_rgba(220,38,38,0.8)] origin-center"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection('hero')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center relative group"
          >
            <div className="absolute inset-0 bg-red-600/30 blur-2xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
            <img src={logo} alt="PREGAT" className="h-12 md:h-14 w-auto relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" />
          </motion.button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                // ── CAMBIO: activo y hover tienen el mismo color (text-white/50 → white)
                // El link activo NO se pone blanco — solo aparece la línea roja
                className={`relative transition-all duration-300 font-bold text-xs uppercase tracking-[0.2em] group ${
                  activeId === link.id
                    ? 'text-white/50'   // ← mismo tono que los demás, sin cambio de color
                    : 'text-white/50 hover:text-white'
                }`}
              >
                <span className="relative z-10">{link.label}</span>

                {/* Solo la línea roja indica el activo */}
                <AnimatePresence>
                  {activeId === link.id && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute -bottom-2 left-0 w-full h-[2px] bg-red-600 shadow-[0_0_15px_#dc2626,0_0_5px_#fff]"
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0, scaleX: 0 }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            ))}

            {/* ── CAMBIO: botón rojo estático, sin animaciones de color ── */}
            <motion.button
              onClick={() => scrollToSection('contacto')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-red-600 text-white px-6 py-2.5 rounded-sm font-black text-[10px] uppercase tracking-tighter shadow-xl flex items-center gap-2 border border-white/20"
            >
              <ShieldAlert size={14} className="animate-bounce" />
              <span>Central de Contacto</span>
            </motion.button>
          </div>

          {/* Mobile button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2 border border-white/10 rounded-lg bg-white/5 relative"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-y-0 right-0 w-64 bg-[#030712]/98 backdrop-blur-2xl border-l border-red-900/50 p-6 md:hidden z-[60]"
          >
            <div className="flex flex-col space-y-6 mt-16">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-left text-sm font-black uppercase tracking-widest transition-colors ${
                    activeId === link.id ? 'text-red-500' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}