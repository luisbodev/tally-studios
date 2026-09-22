"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { LogoMark } from "@/components/ui/Logo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Marquee, OnAirBadge, Timecode } from "@/components/ui/Broadcast";
import { EASE_OUT_EXPO, fadeIn, fadeUp, maskUp, stagger } from "@/lib/motion";
import { site } from "@/lib/site";

const HEADLINE: React.ReactNode[] = [
  "Tu evento,",
  <>
    <em className="font-bold italic text-tally">en vivo</em> y
  </>,
  "sin fronteras.",
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Progreso de 0 → 1 mientras el hero sale de la pantalla
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Parallax solo con transform (seguro en Safari). No usar opacity ligada al
  // scroll: el path nativo ViewTimeline rompe opacity en iOS y deja el hero en blanco.
  const contentY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["0%", "28%"]);
  const markY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["0%", "-30%"]);
  const markRotate = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -10]);
  const lineReveal = reduceMotion ? fadeIn : maskUp;

  return (
    <section ref={ref} id="inicio" className="relative flex min-h-svh flex-col overflow-hidden pt-24">
      {/* Fondo: retícula + halo rojo + grano */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_40%_40%,black,transparent)]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 size-[42rem] rounded-full bg-tally/15 blur-[140px]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grain opacity-[0.07] mix-blend-overlay" />

      <motion.div
        aria-hidden
        style={{ y: markY, rotate: markRotate }}
        initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduceMotion ? 0.4 : 1.6, ease: EASE_OUT_EXPO, delay: reduceMotion ? 0 : 0.3 }}
        className="pointer-events-none absolute -right-[18%] top-[14%] w-[85vw] max-w-[980px] text-cream/[0.035] md:-right-[8%] md:w-[62vw]"
      >
        <LogoMark mono />
      </motion.div>

      <motion.div
        style={{ y: contentY }}
        className="container-site relative z-10 flex flex-1 flex-col justify-center py-16"
      >
        <motion.div initial="hidden" animate="show" variants={stagger(0.12, 0.1)} className="max-w-6xl">
          <motion.div variants={fadeUp} className="mb-8 flex flex-wrap items-center gap-3 text-sm text-cream/60">
            <OnAirBadge />
            <span>Studio creativo · {site.location}</span>
          </motion.div>

          {/* Titular: cada línea sube desde una máscara, escalonadas */}
          <motion.h1
            variants={stagger(0.12, 0.15)}
            className="text-[clamp(3.25rem,11vw,10rem)] font-bold leading-[0.88] tracking-display"
          >
            {HEADLINE.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.06em]">
                <motion.span variants={lineReveal} className="block">
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-xl text-lg leading-relaxed text-cream/65 md:text-xl"
          >
            Transmitimos conferencias, lanzamientos, reuniones corporativas y celebraciones en alta calidad,
            para que tu audiencia viva el evento esté donde esté.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton href="#contacto">Cotiza tu transmisión</MagneticButton>
            <MagneticButton href="#proyectos" variant="ghost">
              Ver transmisiones
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Barra inferior tipo monitor: REC + timecode + plataformas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduceMotion ? 0 : 1.1, duration: reduceMotion ? 0.3 : 1 }}
        className="relative z-10 border-t border-cream/10"
      >
        <div className="container-site flex flex-col gap-4 py-5 md:flex-row md:items-center md:gap-10">
          <div className="flex shrink-0 items-center gap-3 text-xs uppercase tracking-[0.2em] text-cream/50">
            <span className="flex items-center gap-2 text-tally">
              <span className="size-2 rounded-full bg-tally" /> Rec
            </span>
            <Timecode className="text-cream/70" />
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-6">
            <span className="shrink-0 text-xs uppercase tracking-[0.2em] text-cream/40">Transmitimos a</span>
            <Marquee duration={28} className="min-w-0 flex-1">
              {site.platforms.map((p) => (
                <span key={p} className="flex items-center gap-6 pr-6 text-sm font-semibold tracking-tight-brand text-cream/70">
                  {p}
                  <span className="size-1 rounded-full bg-cream/25" />
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
