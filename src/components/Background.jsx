import { useEffect } from "react";
import { gsap } from "gsap";

export default function Background() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Blob rosa — canto superior esquerdo
      gsap.to(".blob-pink-tl", {
        x: 80,
        y: -60,
        scale: 1.15,
        duration: 14,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Blob teal — canto inferior direito
      gsap.to(".blob-teal-br", {
        x: -100,
        y: 80,
        scale: 1.1,
        duration: 16,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Blob rosa secundário — canto inferior esquerdo
      gsap.to(".blob-pink-bl", {
        x: 60,
        y: -50,
        scale: 1.2,
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Blob teal secundário — canto superior direito
      gsap.to(".blob-teal-tr", {
        x: -70,
        y: 60,
        scale: 1.05,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Blob central — mistura suave no meio
      gsap.to(".blob-center", {
        x: 40,
        y: -40,
        scale: 1.08,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">

      {/* === AURORA — apenas visível no dark mode === */}

      {/* Rosa — canto superior esquerdo */}
      <div className="blob-pink-tl absolute w-[650px] h-[650px] rounded-full
        bg-transparent dark:bg-[#E5005E]
        opacity-0 dark:opacity-[0.08]
        blur-[160px]
        -top-40 -left-40
        transition-opacity duration-700" />

      {/* Teal — canto inferior direito */}
      <div className="blob-teal-br absolute w-[750px] h-[750px] rounded-full
        bg-transparent dark:bg-[#008280]
        opacity-0 dark:opacity-[0.07]
        blur-[170px]
        -bottom-48 -right-48
        transition-opacity duration-700" />

      {/* Rosa secundário — canto inferior esquerdo */}
      <div className="blob-pink-bl absolute w-[500px] h-[500px] rounded-full
        bg-transparent dark:bg-[#E5005E]
        opacity-0 dark:opacity-[0.04]
        blur-[140px]
        -bottom-20 -left-20
        transition-opacity duration-700" />

      {/* Teal secundário — canto superior direito */}
      <div className="blob-teal-tr absolute w-[550px] h-[550px] rounded-full
        bg-transparent dark:bg-[#008280]
        opacity-0 dark:opacity-[0.05]
        blur-[150px]
        -top-24 -right-24
        transition-opacity duration-700" />

      {/* Blob central de mistura */}
      <div className="blob-center absolute w-[450px] h-[450px] rounded-full
        bg-transparent dark:bg-[#E5005E]
        opacity-0 dark:opacity-[0.025]
        blur-[190px]
        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        transition-opacity duration-700" />

      {/* Vinheta radial: bordas escurecem para profundidade */}
      <div className="absolute inset-0
        opacity-0 dark:opacity-100
        bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,_transparent_30%,_#0d0d12_100%)]
        transition-opacity duration-700" />

    </div>
  );
}
