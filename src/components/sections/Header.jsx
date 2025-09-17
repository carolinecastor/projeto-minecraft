import { useEffect, useState } from "react";
import logoMine from "../../assets/logo-minecraft (1).png";
import { playClickSound } from "../../utils/soundUtils";

const Header = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState('3rem');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 640);

  const scrollToSection = (sectionId) => {
    playClickSound();
    const element = document.getElementById(sectionId);
    if (element) {
      let offset = 60;
      if (sectionId === "characters") {
        offset = 200;
      } else if (sectionId === "guides") {
        offset = 20;
      } else if (sectionId === "seeds") {
        offset = 0;
      } else if (sectionId === "craft") {
        offset = 60;
      }

      const elementPosition = element.offsetTop - offset;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveSection(null);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    playClickSound();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setHeaderHeight(width >= 640 ? '4rem' : '3rem');
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  useEffect(() => {
    const ids = ["hero", "characters", "guides", "seeds", "craft", "footer"];
    const options = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === "hero" || entry.target.id === "footer") {
            setActiveSection(null);
          } else {
            setActiveSection(entry.target.id);
          }
        }
      });
    }, options);
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: windowWidth >= 640 ? '4rem' : '3rem',
          backgroundColor: 'rgba(30,30,30,0.64)',
          backdropFilter: 'blur(8px)',
          zIndex: 2147483647,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={scrollToTop}
            style={{
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0
            }}
          >
            <img
              src={logoMine}
              alt="Minecraft Logo"
              style={{
                width: windowWidth >= 1024 ? '14rem' :
                       windowWidth >= 768 ? '12rem' :
                       windowWidth >= 640 ? '10rem' : '7rem',
                height: 'auto'
              }}
            />
          </button>
        </div>

          {/* Desktop Menu */}
          <div style={{
            display: windowWidth >= 640 ? 'flex' : 'none',
            gap: '1.5rem'
          }}>
            <button
              onClick={() => scrollToSection("characters")}
              className={`transition-colors text-xs uppercase tracking-wider font-bold flex items-center gap-1 ${
                activeSection === "characters"
                  ? "text-green-400"
                  : "text-white hover:text-green-400"
              }`}
            >
              Personagens
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${
                  activeSection === "characters" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => scrollToSection("guides")}
              className={`transition-colors text-xs uppercase tracking-wider font-bold flex items-center gap-1 ${
                activeSection === "guides"
                  ? "text-green-400"
                  : "text-white hover:text-green-400"
              }`}
            >
              Guias
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${
                  activeSection === "guides" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => scrollToSection("seeds")}
              className={`transition-colors text-xs uppercase tracking-wider font-bold flex items-center gap-1 ${
                activeSection === "seeds"
                  ? "text-green-400"
                  : "text-white hover:text-green-400"
              }`}
            >
              Seeds
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${
                  activeSection === "seeds" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => scrollToSection("craft")}
              className={`transition-colors text-xs uppercase tracking-wider font-bold flex items-center gap-1 ${
                activeSection === "craft"
                  ? "text-green-400"
                  : "text-white hover:text-green-400"
              }`}
            >
              Mesa de Trabalho
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${
                  activeSection === "craft" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            style={{
              display: windowWidth < 640 ? 'flex' : 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.5rem',
              height: '2.5rem',
              color: 'white',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
            aria-label="Toggle mobile menu"
          >
            <svg
              style={{
                width: '1.5rem',
                height: '1.5rem',
                transform: isMobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s'
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 2147483646,
            display: windowWidth < 640 ? 'block' : 'none'
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        style={{
          position: 'fixed',
          top: headerHeight,
          right: 0,
          width: '16rem',
          backgroundColor: 'rgba(20,20,20,0.95)',
          backdropFilter: 'blur(8px)',
          borderLeft: '1px solid #6b7280',
          zIndex: 2147483647,
          transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out',
          display: windowWidth < 640 ? 'block' : 'none'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem 0' }}>
          <button
            onClick={() => scrollToSection("characters")}
            className={`px-6 py-4 text-left transition-colors text-sm uppercase tracking-wider font-bold flex items-center justify-between ${
              activeSection === "characters"
                ? "text-green-400 bg-green-400/10"
                : "text-white hover:text-green-400 hover:bg-green-400/5"
            }`}
          >
            Personagens
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                activeSection === "characters" ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => scrollToSection("guides")}
            className={`px-6 py-4 text-left transition-colors text-sm uppercase tracking-wider font-bold flex items-center justify-between ${
              activeSection === "guides"
                ? "text-green-400 bg-green-400/10"
                : "text-white hover:text-green-400 hover:bg-green-400/5"
            }`}
          >
            Guias
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                activeSection === "guides" ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => scrollToSection("seeds")}
            className={`px-6 py-4 text-left transition-colors text-sm uppercase tracking-wider font-bold flex items-center justify-between ${
              activeSection === "seeds"
                ? "text-green-400 bg-green-400/10"
                : "text-white hover:text-green-400 hover:bg-green-400/5"
            }`}
          >
            Seeds
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                activeSection === "seeds" ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => scrollToSection("craft")}
            className={`px-6 py-4 text-left transition-colors text-sm uppercase tracking-wider font-bold flex items-center justify-between ${
              activeSection === "craft"
                ? "text-green-400 bg-green-400/10"
                : "text-white hover:text-green-400 hover:bg-green-400/5"
            }`}
          >
            Mesa de Trabalho
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                activeSection === "craft" ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
