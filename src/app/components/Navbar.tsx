import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ShieldAlert,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import logo from "../../../img/LOGOPREGAT.svg";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const navLinks = [
  { label: "Sistema SCP", id: "scp" },
  { label: "Integración", id: "integracion" },
  { label: "Diferenciadores", id: "diferenciadores" },
  { label: "Contacto", id: "contacto" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [isBookOpen, setIsBookOpen] = useState(false);

  const pdfUrl = "/pregat-blog.pdf";

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = [...navLinks]
        .reverse()
        .map((l) => document.getElementById(l.id));

      for (const section of sections) {
        if (section && window.scrollY >= section.offsetTop - 200) {
          setActiveId(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ESC key to close PDF
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsBookOpen(false);
      }
    };

    if (isBookOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isBookOpen]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const yOffset = -64; // compensación altura navbar
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-16 sm:h-20 md:h-24 flex items-center ${
          isScrolled
            ? "bg-[#030712]/95 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 w-full h-full flex items-center justify-between">
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center"
          >
            <img src={logo} alt="PREGAT" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto" />
          </button>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`font-bold text-xs uppercase tracking-[0.2em] transition-all ${
                  activeId === link.id
                    ? "text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => setIsBookOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-sm text-white font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all z-[60] relative"
            >
              <BookOpen size={14} className="text-red-500" />
              <span>Blog</span>
            </button>

            <button
              onClick={() => scrollToSection("contacto")}
              className="bg-red-600 text-white px-6 py-2.5 rounded-sm font-black text-[10px] uppercase flex items-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:bg-red-700 transition-all"
            >
              <ShieldAlert size={14} />
              <span>Central de Contacto</span>
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 sm:top-20 left-0 right-0 z-40 bg-[#030712]/98 backdrop-blur-xl border-b border-white/5 md:hidden"
          >
            <div className="flex flex-col p-4 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`font-bold text-sm uppercase tracking-[0.15em] py-2 text-left transition-all ${
                    activeId === link.id
                      ? "text-white"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => setIsBookOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-sm text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all w-fit"
              >
                <BookOpen size={14} className="text-red-500" />
                <span>Blog</span>
              </button>
              <button
                onClick={() => scrollToSection("contacto")}
                className="bg-red-600 text-white px-6 py-3 rounded-sm font-black text-xs uppercase flex items-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:bg-red-700 transition-all w-fit"
              >
                <ShieldAlert size={14} />
                <span>Contacto</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blog PDF Modal */}
      <AnimatePresence>
        {isBookOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsBookOpen(false)}
            className="fixed inset-0 z-[100] bg-[#030712]/98 backdrop-blur-md flex flex-col overflow-hidden"
          >
            <div className="h-14 sm:h-16 flex justify-between items-center px-4 sm:px-8 border-b border-white/5 bg-black/40">
              <span className="text-white/70 font-mono text-[10px] tracking-[0.3em] uppercase">
                SCP_READER_V2.0
              </span>

              <button
                onClick={() => setIsBookOpen(false)}
                className="text-white/40 hover:text-white flex items-center gap-2 font-mono text-xs uppercase"
              >
                ESC_CERRAR <X size={18} />
              </button>
            </div>

            <div
              onClick={(e) => e.stopPropagation()}
              className="flex-1 relative w-full flex items-center justify-center bg-[#050810]"
            >
              <FlipBookContent pdfUrl={pdfUrl} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function FlipBookContent({ pdfUrl }: { pdfUrl: string }) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [dim, setDim] = useState({ w: 0, h: 0 });
  const bookRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      const isMobile = window.innerWidth < 1024;

      let pageWidth;
      let pageHeight;

      if (isMobile) {
        pageWidth = containerWidth * 0.98;
        pageHeight = pageWidth * 1.4;

        if (pageHeight > containerHeight * 0.95) {
          pageHeight = containerHeight * 0.95;
          pageWidth = pageHeight / 1.4;
        }
      } else {
        pageHeight = containerHeight * 0.95;
        pageWidth = (pageHeight / 1.4) + 8;

        if (pageWidth * 2 > containerWidth) {
          pageWidth = (containerWidth / 2) - 4;
          pageHeight = pageWidth * 1.4;
        }
      }

      setDim({
        w: Math.floor(pageWidth),
        h: Math.floor(pageHeight),
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center relative bg-[#050810] p-0 m-0"
    >
      <Document
        file={pdfUrl}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={<div className="text-white/50 font-mono text-xs">Cargando PDF...</div>}
      >
        {numPages && dim.w > 0 && (
          <HTMLFlipBook
            width={dim.w}
            height={dim.h}
            size="fixed"
            showCover
            ref={bookRef}
            usePortrait={window.innerWidth < 1024}
            className="shadow-2xl max-w-full"
          >
            {Array.from(new Array(numPages), (_, i) => (
              <div key={i}>
                <Page
                  pageNumber={i + 1}
                  width={dim.w}
                  height={dim.h}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              </div>
            ))}
          </HTMLFlipBook>
        )}
      </Document>

      {numPages && (
        <div className="absolute bottom-8 flex items-center gap-10 z-50 bg-black/80 border border-white/10 px-6 py-2 rounded-full">
          <button
            onClick={() => bookRef.current.pageFlip().flipPrev()}
            className="text-white/30 hover:text-red-600 transition-all"
          >
            <ChevronLeft size={30} />
          </button>

          <span className="text-red-600 font-black text-xs tracking-[0.2em]">
            {numPages} PÁGS
          </span>

          <button
            onClick={() => bookRef.current.pageFlip().flipNext()}
            className="text-white/30 hover:text-red-600 transition-all"
          >
            <ChevronRight size={30} />
          </button>
        </div>
      )}
    </div>
  );
}