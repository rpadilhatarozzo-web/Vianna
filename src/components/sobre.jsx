import { useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  GraduationCap,
  Cpu,
  Rocket,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function SobreColegioVianna() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const stats = document.querySelectorAll(".stat-number");

      stats.forEach((stat) => {
        const finalValue = Number(stat.dataset.value);

        gsap.fromTo(
          stat,
          { innerText: 0 },
          {
            innerText: finalValue,
            duration: 2,
            ease: "power3.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: stat,
              start: "top 85%",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >

          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Educação para
            <span className="block text-slate-600 dark:text-white/70">
              transformar vidas
            </span>
          </h1>

          <p className="text-slate-500 dark:text-white/40 leading-relaxed">
            Há mais de 25 anos, o Colégio Vianna forma cidadãos
            preparados para o futuro por meio de uma educação
            sólida, inovadora e humana. Com excelência acadêmica,
            tecnologia educacional e acompanhamento próximo,
            desenvolvemos alunos confiantes para os desafios da vida.
          </p>
        </motion.div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <StatCard
            value={25}
            suffix="+"
            title="Anos de História"
          />

          <StatCard
            value={100}
            suffix="%"
            title="Compromisso Educacional"
          />

          <StatCard
            value={2}
            title="Segmentos"
            subtitle="Fundamental II e Ensino Médio"
          />

          <StatCard
            value={1}
            title="Tecnologia"
            subtitle="Geekie One e Chromebooks"
          />
        </div>

        {/* Pilares */}
        <div className="grid lg:grid-cols-3 gap-5">
          <Pillar
            icon={GraduationCap}
            title="Excelência Acadêmica"
            text="Preparação sólida para vestibulares, ENEM e desafios acadêmicos."
          />

          <Pillar
            icon={Cpu}
            title="Tecnologia e Inovação"
            text="Ferramentas digitais integradas ao aprendizado para potencializar resultados."
          />

          <Pillar
            icon={Rocket}
            title="Preparação para o Futuro"
            text="Formação de alunos protagonistas, críticos e preparados para novas oportunidades."
          />
        </div>
      </div>
    </section>
  );
}

function StatCard({
  value,
  suffix = "",
  title,
  subtitle,
}) {
  return (
    <div
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
      "
    >
      <div className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
        <span
          className="stat-number"
          data-value={value}
        >
          0
        </span>
        {suffix}
      </div>

      <h4 className="text-sm md:text-base text-slate-700 dark:text-white font-semibold">
        {title}
      </h4>

      {subtitle && (
        <p className="text-slate-500 dark:text-white/60 text-xs mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Pillar({
  icon: Icon,
  title,
  text,
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      className="
      rounded-2xl
      border
      border-slate-200/50
      dark:border-white/10
      bg-white/80
      dark:bg-white/[0.03]
      backdrop-blur-xl
      p-5
      "
    >
      <div className="w-12 h-12 rounded-xl bg-[#E5005E]/10 border border-[#E5005E]/20 flex items-center justify-center mb-4">
        <Icon
          size={22}
          className="text-[#E5005E]"
        />
      </div>

      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
        {title}
      </h3>

      <p className="text-sm text-slate-600 dark:text-white/70 leading-relaxed">
        {text}
      </p>
    </motion.div>
  );
}