import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logotipo from "../assets/Logotipo PNG.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) return savedTheme;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".nav", { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
      gsap.fromTo(".item", { opacity: 0, y: -10 }, { opacity: 1, y: 0, stagger: 0.1, delay: 0.4, duration: 0.5 });
    });

    return () => ctx.revert();
  }, []);

  const scrollTo = (id) => {
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth"
    });
  };

  const navItems = [
    { label: "Inicio", id: "inicio" },
    { label: "Fundamental II", id: "fundamental" },
    { label: "Ensino Médio", id: "medio" },
    { label: "Sobre", id: "sobre" },
    { label: "Estrutura", id: "estrutura" },
    { label: "Professores", id: "professores" },
    { label: "Contato", id: "contato" },
  ];

  return (
    <header className="nav fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50">
      <nav className="relative flex flex-col px-6 py-4 bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-2xl transition-all duration-300 shadow-lg dark:shadow-none">
        
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center cursor-pointer" onClick={() => scrollTo("inicio")}>
            <img src={logotipo} alt="Colégio Vianna" className="h-7 md:h-8 w-auto object-contain" />
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 items-center text-slate-600 dark:text-white/70 text-sm font-medium">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="item cursor-pointer hover:text-[#E5005E] transition duration-200"
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </li>
            ))}
            {/* Theme Toggle Button Desktop */}
            <li className="item ml-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white/80 hover:text-[#E5005E] dark:hover:text-[#E5005E] transition duration-200 cursor-pointer flex items-center justify-center focus:outline-none"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </li>
          </ul>

          {/* Mobile Menu Toggle & Theme Trigger */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Theme Toggle Button Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white/80 hover:text-[#E5005E] transition duration-200 cursor-pointer flex items-center justify-center focus:outline-none"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-800 dark:text-white/80 hover:text-[#E5005E] transition focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden w-full mt-4 border-t border-slate-200/50 dark:border-white/10 pt-4"
            >
              <ul className="flex flex-col gap-4 text-slate-800 dark:text-white/80 text-base font-semibold pb-2">
                {navItems.map((item, index) => (
                  <motion.li
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    key={index}
                    className="cursor-pointer hover:text-[#E5005E] py-1 transition-colors duration-200"
                    onClick={() => scrollTo(item.id)}
                  >
                    {item.label}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

      </nav>
    </header>
  );
}

export default Navbar;