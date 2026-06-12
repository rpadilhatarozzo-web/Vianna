import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const depoimentos = [
  {
    nome: "Ana Paula Ferreira",
    papel: "Mãe de aluno",
    texto:
      "O Colégio Vianna transformou completamente a trajetória do meu filho. Os professores são excepcionais e o ambiente é acolhedor e estimulante. Não poderia ter feito escolha melhor.",
    estrelas: 5,
    cor: "#E5005E",
  },
  {
    nome: "Lucas Mendonça",
    papel: "Ex-aluno — Turma 2022",
    texto:
      "Fui aprovado na UFJF graças à base sólida que o Vianna me deu. A preparação para o ENEM foi intensa e muito eficaz. Sou muito grato a todos os professores!",
    estrelas: 5,
    cor: "#008280",
  },
  {
    nome: "Carla Souza",
    papel: "Mãe de aluna",
    texto:
      "Minha filha cresceu muito aqui, não só academicamente, mas também como pessoa. O colégio cuida do aluno de forma integral. Recomendo de olhos fechados.",
    estrelas: 5,
    cor: "#7C3AED",
  },
  {
    nome: "Rafael Costa",
    papel: "Ex-aluno — Turma 2021",
    texto:
      "O diferencial do Vianna é a atenção individual que cada professor dedica ao aluno. Me senti preparado para qualquer desafio após o Ensino Médio.",
    estrelas: 5,
    cor: "#E5005E",
  },
  {
    nome: "Juliana Ramos",
    papel: "Pai de aluno",
    texto:
      "Escola de excelência em todos os sentidos. Estrutura moderna, equipe dedicada e resultados comprovados. Nossa família está muito satisfeita com a evolução do nosso filho.",
    estrelas: 5,
    cor: "#008280",
  },
  {
    nome: "Pedro Alves",
    papel: "Ex-aluno — Turma 2023",
    texto:
      "As aulas dinâmicas e os projetos interdisciplinares me fizeram amar estudar. O Vianna vai além do conteúdo — forma cidadãos críticos e preparados para o mundo.",
    estrelas: 5,
    cor: "#7C3AED",
  },
];

function Avatar({ nome, cor }) {
  const initials = nome
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-lg"
      style={{ background: `${cor}` }}
    >
      {initials}
    </div>
  );
}

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

function DepoimentoCard({ dep }) {
  return (
    <div className="relative flex flex-col h-full rounded-3xl border border-slate-200/50 dark:border-white/10 bg-white/80 dark:bg-white/[0.04] backdrop-blur-xl p-7 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Aspas decorativas */}
      <Quote
        size={36}
        className="absolute top-5 right-6 opacity-[0.07] dark:opacity-[0.1] text-[#E5005E]"
      />

      {/* Estrelas */}
      <StarRating count={dep.estrelas} />

      {/* Texto */}
      <p className="mt-4 text-slate-600 dark:text-slate-300 text-sm leading-relaxed flex-1">
        "{dep.texto}"
      </p>

      {/* Autor */}
      <div className="mt-6 flex items-center gap-3">
        <Avatar nome={dep.nome} cor={dep.cor} />
        <div className="text-left">
          <p className="font-semibold text-slate-900 dark:text-white text-sm">
            {dep.nome}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {dep.papel}
          </p>
        </div>
      </div>
    </div>
  );
}

const VISIBLE = 3; // cards visíveis no desktop
const INTERVAL = 4000; // ms entre slides automáticos

export default function Depoimentos() {
  const [current, setCurrent] = useState(0);
  const total = depoimentos.length;
  const maxIndex = total - VISIBLE; // último índice válido (desktop)
  const timerRef = useRef(null);

  const next = useCallback(() => {
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const goTo = (index) => setCurrent(index);

  // Auto-play
  useEffect(() => {
    timerRef.current = setInterval(next, INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [next]);

  // Pausar ao interagir
  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, INTERVAL);
  };

  return (
    <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="mb-3 inline-flex rounded-full border border-[#008280]/30 bg-[#008280]/10 px-4 py-1 text-sm font-medium text-[#008280]">
            Depoimentos
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mt-3">
            O que dizem sobre nós
          </h2>
          <p className="">
            A opinião de quem viveu a experiência Vianna — alunos e famílias que
            confiam na nossa proposta educacional.
          </p>
        </motion.div>

        {/* Carrossel Desktop (3 visíveis) */}
        <div className="hidden md:block overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: `calc(-${current * (100 / VISIBLE)}% - ${current * 24 / VISIBLE}px)` }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
          >
            {depoimentos.map((dep, i) => (
              <div
                key={i}
                className="flex-shrink-0"
                style={{ width: `calc((100% - ${(VISIBLE - 1) * 24}px) / ${VISIBLE})` }}
              >
                <DepoimentoCard dep={dep} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Carrossel Mobile (1 por vez com AnimatePresence) */}
        <div className="md:hidden relative overflow-hidden min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
            >
              <DepoimentoCard dep={depoimentos[current % total]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controles */}
        <div className="mt-10 flex items-center justify-center gap-4">
          {/* Botão anterior */}
          <button
            onClick={() => { prev(); resetTimer(); }}
            className="p-2.5 rounded-full border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-white/5 text-slate-700 dark:text-white hover:border-[#E5005E]/50 hover:text-[#E5005E] transition duration-200 focus:outline-none cursor-pointer"
            aria-label="Anterior"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex gap-2 items-center">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => { goTo(i); resetTimer(); }}
                className={`rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                  current === i
                    ? "bg-[#E5005E] w-5 h-2"
                    : "bg-slate-300 dark:bg-white/20 w-2 h-2 hover:bg-[#E5005E]/50"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Botão próximo */}
          <button
            onClick={() => { next(); resetTimer(); }}
            className="p-2.5 rounded-full border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-white/5 text-slate-700 dark:text-white hover:border-[#E5005E]/50 hover:text-[#E5005E] transition duration-200 focus:outline-none cursor-pointer"
            aria-label="Próximo"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
