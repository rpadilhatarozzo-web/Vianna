import { useEffect, useRef, useState } from "react";

const corpoDocente = [
  {
    nome: "Prof. Ana Clara",
    cargo: "Coordenadora Pedagógica",
    area: "Ensino Fundamental",
    descricao: "Especialista pedagógico e em desenvolvimento educacional.",
    imagem: "/professores/ana-clara.jpg",
  },
  {
    nome: "Prof. Marcos Silva",
    cargo: "Professor de Matemática",
    area: "Exatas",
    descricao:
      "Atua no ensino de raciocínio lógico, matemática aplicada e resolução de problemas.",
    imagem: "/professores/marcos-silva.jpg",
  },
  {
    nome: "Profa. Juliana Mendes",
    cargo: "Professora de Português",
    area: "Linguagens",
    descricao:
      "Trabalha leitura, interpretação, produção textual e comunicação escrita.",
    imagem: "/professores/juliana-mendes.jpg",
  },
  {
    nome: "Prof. Rafael Costa",
    cargo: "Professor de Ciências",
    area: "Ciências da Natureza",
    descricao:
      "Desenvolve aulas práticas e projetos voltados à investigação científica.",
    imagem: "/professores/rafael-costa.jpg",
  },
  {
    nome: "Profa. Camila Rocha",
    cargo: "Professora de História",
    area: "Humanas",
    descricao:
      "Ensina história com foco em pensamento crítico, cultura e sociedade.",
    imagem: "/professores/camila-rocha.jpg",
  },
  {
    nome: "Prof. Lucas Almeida",
    cargo: "Professor de Geografia",
    area: "Humanas",
    descricao:
      "Aborda território, meio ambiente, mapas e relações sociais no espaço.",
    imagem: "/professores/lucas-almeida.jpg",
  },
  {
    nome: "Profa. Beatriz Lima",
    cargo: "Professora de Inglês",
    area: "Idiomas",
    descricao:
      "Trabalha comunicação, vocabulário, escuta e prática conversacional.",
    imagem: "/professores/beatriz-lima.jpg",
  },
  {
    nome: "Prof. André Martins",
    cargo: "Professor de Educação Física",
    area: "Esportes",
    descricao:
      "Promove saúde, movimento, disciplina, cooperação e desenvolvimento corporal.",
    imagem: "/professores/andre-martins.jpg",
  },
];

function TeacherImage({ src, alt, area, name }) {
  const [hasError, setHasError] = useState(false);

  const getGradientByArea = (area) => {
    switch (area.toLowerCase()) {
      case "ensino fundamental":
        return "from-purple-600 to-indigo-600";
      case "exatas":
        return "from-cyan-500 to-blue-600";
      case "linguagens":
        return "from-pink-500 to-rose-600";
      case "ciências da natureza":
        return "from-emerald-500 to-teal-600";
      case "humanas":
        return "from-amber-500 to-orange-600";
      case "idiomas":
        return "from-violet-500 to-fuchsia-600";
      case "esportes":
        return "from-red-500 to-orange-600";
      default:
        return "from-slate-600 to-slate-800";
    }
  };

  const initials = name
    .split(" ")
    .filter((n) => !n.startsWith("Prof") && !n.startsWith("Profa"))
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (hasError || !src) {
    return (
      <div className={`h-full w-full bg-gradient-to-br ${getGradientByArea(area)} flex flex-col items-center justify-center relative transition duration-500 group-hover:scale-105`}>
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        <svg className="w-16 h-16 text-white/40 mb-2 z-10" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
        </svg>

        <span className="text-white font-extrabold text-2xl tracking-wider z-10 select-none">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      onError={() => setHasError(true)}
    />
  );
}

export default function Professores() {
  const carouselRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const professoresLoop = [...corpoDocente, ...corpoDocente];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const interval = setInterval(() => {
      if (isPaused) return;

      carousel.scrollLeft += 1;

      const metadeDoScroll = carousel.scrollWidth / 2;

      if (carousel.scrollLeft >= metadeDoScroll) {
        carousel.scrollLeft = 0;
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isPaused]);

  const scrollCarousel = (direction) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const cardWidth = carousel.firstChild?.offsetWidth || 320;
    const gap = 24;
    const scrollAmount = cardWidth + gap;

    if (direction === "next") {
      carousel.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    } else {
      if (carousel.scrollLeft <= 0) {
        carousel.scrollLeft = carousel.scrollWidth / 2;
      }

      carousel.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-3 inline-flex rounded-full border border-[#E5005E]/30 bg-[#E5005E]/10 px-4 py-1 text-sm font-medium text-[#E5005E]">
              Corpo Docente
            </span>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Professores que fazem a diferença
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Conheça os profissionais responsáveis por conduzir o aprendizado,
              acompanhar o desenvolvimento dos alunos e fortalecer a qualidade
              pedagógica da escola.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => scrollCarousel("prev")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:bg-[#E5005E] hover:text-white cursor-pointer"
              aria-label="Voltar carousel"
            >
              ←
            </button>

            <button
              onClick={() => scrollCarousel("next")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:bg-[#E5005E] hover:text-white cursor-pointer"
              aria-label="Avançar carousel"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {professoresLoop.map((professor, index) => (
            <article
              key={`${professor.nome}-${index}`}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
              className="group min-w-[280px] overflow-hidden rounded-3xl border border-slate-200/50 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#E5005E]/40 hover:bg-slate-100/50 dark:hover:bg-white/[0.05] sm:min-w-[320px]"
            >
              <div className="relative h-72 overflow-hidden">
                <TeacherImage
                  src={professor.imagem}
                  alt={professor.nome}
                  area={professor.area}
                  name={professor.nome}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />

                <div className="absolute left-5 top-5 rounded-full bg-[#008280] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  {professor.area}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {professor.nome}
                </h3>

                <p className="mt-1 text-sm font-medium text-[#E5005E]">
                  {professor.cargo}
                </p>

                <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {professor.descricao}
                </p>

                <div className="mt-6 h-px w-full bg-gradient-to-r from-[#E5005E]/60 via-white/10 to-transparent" />

                <button className="mt-5 text-sm font-semibold text-slate-800 dark:text-white transition hover:text-[#E5005E] cursor-pointer">
                  Ver perfil →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}