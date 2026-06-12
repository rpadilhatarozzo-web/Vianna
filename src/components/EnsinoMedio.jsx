import { useRef } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Compass,
  Globe,
} from "lucide-react";

const cards = [
  {
    icon: BookOpen,
    tag: "ENEM",
    title: "Preparação Acadêmica",
    description:
      "Construímos uma base sólida de conhecimentos e competências, preparando os estudantes para o ENEM, vestibulares e os desafios do ensino superior.",
  },
  {
    icon: Compass,
    tag: "CAREER",
    title: "Orientação de Carreira",
    description:
      "Auxiliamos os alunos na descoberta de seus talentos, interesses e objetivos, desenvolvendo um projeto de vida alinhado aos seus sonhos.",
  },
  {
    icon: Globe,
    tag: "GLOBAL",
    title: "Futuro Global",
    description:
      "Formamos jovens preparados para um mundo conectado, inovador e em constante transformação, com visão crítica e protagonismo.",
  },
];

function Card({ card, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const cardEl = cardRef.current;

    const rect = cardEl.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 14;
    const rotateY = (centerX - x) / 14;

    cardEl.style.transform = `
      perspective(1200px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.03,1.03,1.03)
    `;

    cardEl.style.setProperty("--mouse-x", `${x}px`);
    cardEl.style.setProperty("--mouse-y", `${y}px`);
  };

  const resetCard = () => {
    const cardEl = cardRef.current;

    cardEl.style.transform =
      "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  };

  const Icon = card.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetCard}
      className="
      group
      relative
      overflow-hidden
      rounded-[32px]
      border
      border-slate-200/50
      dark:border-white/10
      bg-white/80
      dark:bg-white/[0.03]
      backdrop-blur-xl
      p-8
      min-h-[360px]
      transition-all
      duration-300
      cursor-pointer
      "
    >
      {/* Glow seguindo mouse */}
      <div
        className="
        absolute
        inset-0
        opacity-0
        group-hover:opacity-100
        transition-opacity
        duration-300
        pointer-events-none
        "
        style={{
          background: `
            radial-gradient(
              400px circle at var(--mouse-x) var(--mouse-y),
              rgba(229,0,94,0.06),
              transparent 40%
            )
          `,
        }}
      />

      {/* Borda brilhante */}
      <div
        className="
        absolute
        inset-0
        rounded-[32px]
        opacity-0
        group-hover:opacity-100
        transition-all
        duration-500
        bg-gradient-to-r
        from-white/10
        via-white/20
        to-white/10
        blur-xl
        "
      />

      {/* Texto decorativo */}
      <span
        className="
        absolute
        top-6
        right-6
        text-4xl
        md:text-5xl
        font-black
        tracking-widest
        text-slate-900/[0.03] dark:text-white/[0.05]
        "
      >
        {card.tag}
      </span>

      <motion.div
        whileHover={{
          rotate: 10,
          scale: 1.1,
        }}
        transition={{
          duration: 0.3,
        }}
        className="
        relative
        z-10
        mb-8
        w-16
        h-16
        rounded-2xl
        flex
        items-center
        justify-center
        bg-slate-100 dark:bg-white/10
        backdrop-blur-md
        "
      >
        <Icon
          size={34}
          className="text-[#E5005E]"
        />
      </motion.div>

      <div className="relative z-10">
        <h3
          className="
          text-2xl
          font-bold
          text-slate-900 dark:text-white
          mb-4
          "
        >
          {card.title}
        </h3>

        <p
          className="
          text-slate-600 dark:text-white/70
          leading-relaxed
          "
        >
          {card.description}
        </p>
      </div>

      <div
        className="
        absolute
        bottom-0
        left-0
        h-[3px]
        w-0
        bg-gradient-to-r
        from-[#E5005E]
        to-[#008280]
        group-hover:w-full
        transition-all
        duration-700
        "
      />
    </motion.div>
  );
}

export default function EnsinoMedioCards() {
  return (
    <section className="relative py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Ensino Médio
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-center">
            Uma formação que une excelência acadêmica,
            planejamento de carreira e preparação para
            os desafios do futuro.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <Card
              key={index}
              card={card}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}