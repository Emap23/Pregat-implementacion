import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../../../img/logopregat.png';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#1a2847]/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection('hero')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <img 
              src={logo} 
              alt="PREGAT" 
              className="h-12 md:h-14 w-auto"
            />
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('scp')}
              className="text-white/90 hover:text-white transition-colors font-medium"
            >
              Sistema SCP
            </button>
            <button
              onClick={() => scrollToSection('integracion')}
              className="text-white/90 hover:text-white transition-colors font-medium"
            >
              Integración
            </button>
            <button
              onClick={() => scrollToSection('diferenciadores')}
              className="text-white/90 hover:text-white transition-colors font-medium"
            >
              Diferenciadores
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className="text-white/90 hover:text-white transition-colors font-medium"
            >
              Contacto
            </button>
            <motion.button
              onClick={() => scrollToSection('contacto')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full transition-all duration-300 font-semibold shadow-lg"
            >
              Contáctanos
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 space-y-3 bg-[#1a2847]/95 backdrop-blur-md"
          >
            <button
              onClick={() => scrollToSection('scp')}
              className="block w-full text-left text-white/90 hover:text-white transition-colors py-2 px-4 font-medium"
            >
              Sistema SCP
            </button>
            <button
              onClick={() => scrollToSection('integracion')}
              className="block w-full text-left text-white/90 hover:text-white transition-colors py-2 px-4 font-medium"
            >
              Integración
            </button>
            <button
              onClick={() => scrollToSection('diferenciadores')}
              className="block w-full text-left text-white/90 hover:text-white transition-colors py-2 px-4 font-medium"
            >
              Diferenciadores
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className="block w-full text-left text-white/90 hover:text-white transition-colors py-2 px-4 font-medium"
            >
              Contacto
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full transition-all duration-300 font-semibold"
            >
              Contáctanos
            </button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
