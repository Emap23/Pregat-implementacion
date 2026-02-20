import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'motion/react';
// Busca esta línea y cámbiala:
import logo from "../../../img/logopregat.png";

export function Footer() {
  return (
    <footer className="bg-[#0a1628] py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Copyright */}
          <div className="text-white/80 text-sm md:text-base">
            ©2025, PREGAT Todos los derechos reservados
          </div>

          {/* Logo */}
          <div className="flex justify-center">
            <img 
              src={logo} 
              alt="PREGAT" 
              className="h-12 w-auto"
            />
          </div>

          {/* Social Media */}
          <div className="flex gap-4 justify-start md:justify-end">
            <motion.a 
              href="#" 
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 text-white" />
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-white" />
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300"
              aria-label="X (Twitter)"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-white" />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
