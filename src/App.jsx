import { useEffect } from "react";
import Lenis from "lenis";
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Professores from "./components/Professores";
import Estrutura from "./components/Estrutura";
import Sobre from "./components/sobre";
import FundamentalII from "./components/fundamental II";
import EnsinoMedio from "./components/EnsinoMedio";
import Contato from "./components/contato";
import Depoimentos from "./components/Depoimentos";
import PageTransitionController from "./components/PageTransitionController";

export default function App() {
  useEffect(() => {
    // Inicialização do Lenis Smooth Scroll para rolagem de alta performance
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative text-slate-900 dark:text-white overflow-x-hidden min-h-screen transition-colors duration-500">
      <Background />
      <Navbar />
      <PageTransitionController />

      {/* HERO */}
      <section id="inicio" className="section min-h-screen w-full flex items-center justify-center">
        <Hero />
      </section>

      {/* CURSOS */}
      <section id="fundamental" className="section min-h-screen w-full flex items-center justify-center py-20">
        <FundamentalII />
      </section>
       
      <section id="medio" className="section min-h-screen w-full flex items-center justify-center py-20">
        <EnsinoMedio />
      </section>

      <section id="sobre" className="section min-h-screen w-full flex items-center justify-center py-20">
        <Sobre />
      </section>

      <section id="estrutura" className="section min-h-screen w-full flex items-center justify-center py-20">
        <Estrutura />
      </section>

      <section id="professores" className="section min-h-screen w-full flex items-center justify-center py-20">
        <Professores />
      </section>

      <section id="depoimentos" className="section w-full flex items-center justify-center">
        <Depoimentos />
      </section>

      <section id="contato" className="section min-h-screen w-full flex items-center justify-center py-20">
        <Contato />
      </section>
    </div>
  );
}