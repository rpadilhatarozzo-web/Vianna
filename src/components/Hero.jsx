import { useEffect } from "react";
import { gsap } from "gsap";

function Hero() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      tl.from(".title", { opacity: 0, y: 60, duration: 1 })
        .from(".desc", { opacity: 0, y: 20, duration: 1 }, "-=0.5")
        .from(".btn", { opacity: 0, scale: 0.9, duration: 0.8 }, "-=0.4")
        .from(".img", { opacity: 0, x: 80, duration: 1 }, "-=0.8");
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full flex items-center justify-center px-10 py-12">

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">

        {/* ESQUERDA */}
        <div>

          <h1 className="title text-5xl md:text-6xl font-black text-slate-900 dark:text-white">
            Bem-vindo à nova educação
          </h1>

          <p className="desc text-slate-600 dark:text-white/70 mt-4">
            Ensino moderno, tecnologia e inovação para transformar o futuro dos alunos.
          </p>

          <div className="btn mt-6 flex gap-4">

            <button
              onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 bg-[#E5005E] text-white rounded-xl font-semibold hover:scale-105 hover:bg-[#c4004f] hover:shadow-[0_0_20px_rgba(229,0,94,0.3)] transition cursor-pointer"
            >
              Matrículas
            </button>

            <button
              onClick={() => document.getElementById("estrutura")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 border border-[#008280]/40 text-slate-900 dark:text-white rounded-xl hover:scale-105 hover:bg-[#008280]/15 hover:border-[#008280] transition cursor-pointer"
            >
              Explorar
            </button>

          </div>

        </div>

        {/* DIREITA */}
        <div className="img flex justify-center">
          <img
            src="/src/assets/Vianna-Estrutura.png"
            className="rounded-2xl w-[60%] h-[100%] shadow-2xl"
          />
        </div>

      </div>

    </div>
  );
}

export default Hero;