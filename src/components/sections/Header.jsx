import { useEffect, useState } from "react";
import logoMine from "../../assets/logo-minecraft (1).png";
import { playClickSound } from "../../utils/soundUtils";

const Header = () => {
  const [activeSection, setActiveSection] = useState(null);

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
      }

      const elementPosition = element.offsetTop - offset;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
    }
  };

  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveSection(null);
  };

  useEffect(() => {
    const ids = ["hero", "characters", "guides", "seeds"];
    const options = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === "hero") {
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
    <header className="bg-[rgba(30,30,30,0.64)] backdrop-blur-sm h-12 sm:h-16 fixed top-0 left-0 right-0 z-[99999] w-full">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center ml-4">
          <button onClick={scrollToTop} className="cursor-pointer">
            <img
              className="w-40 sm:w-48 md:w-56 lg:w-64"
              src={logoMine}
              alt="Minecraft Logo"
            />
          </button>
        </div>

        <div className="hidden sm:flex space-x-6">
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
        </div>
      </div>
    </header>
  );
};

export default Header;
