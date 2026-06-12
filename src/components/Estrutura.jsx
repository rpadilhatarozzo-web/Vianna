import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: 1000,
    suffix: "+",
    label: "Alunos",
  },
  {
    value: 1,
    label: "Laboratório",
  },
  {
    value: 10,
    label: "Salas de Aula",
  },
  {
    value: 1,
    label: "Quadra Poliesportiva",
  },
  {
    value: 25,
    suffix: "+",
    label: "Anos de História",
  },
];

export default function Estrutura() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const counters = document.querySelectorAll(".counter");

      counters.forEach((counter) => {
        const value = Number(counter.dataset.value);

        gsap.fromTo(
          counter,
          { innerText: 0 },
          {
            innerText: value,
            duration: 2,
            ease: "power3.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: counter,
              start: "top 85%",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Título */}
        <div className="text-center mb-10">
          <h1 className="text-slate-900 dark:text-white">
            <span className="">
              Nossa Estrutura
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300">
            Ambientes planejados para oferecer conforto,
            segurança, tecnologia e uma experiência educacional completa.
          </p>
        </div>

        {/* Contadores */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((item, index) => (
            <div
              key={index}
              className="
                rounded-2xl
                border
                border-slate-200/50
                dark:border-white/10
                bg-white/80
                dark:bg-white/[0.03]
                backdrop-blur-xl
                p-5
                text-center
                hover:bg-slate-100/50
                dark:hover:bg-white/[0.05]
                transition-all
                duration-300
              "
            >
              <div className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                <span
                  className="counter"
                  data-value={item.value}
                >
                  0
                </span>
                {item.suffix || ""}
              </div>

              <p className="mt-2 text-sm text-slate-600 dark:text-white/70">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}