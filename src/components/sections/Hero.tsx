"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { LogoMark } from "@/components/ui/Logo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Marquee, OnAirBadge, Timecode } from "@/components/ui/Broadcast";
import { site } from "@/lib/site";

/**
 * Hero must stay readable without Motion finishing entrance animations.
 * On iOS Safari, Motion variants with opacity:0 / mask y:110% often never
 * resolve, which left only the grid background visible. Content uses CSS
 * enter animations; Motion is limited to decorative parallax.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Solo el logo de fondo hace parallax (transform, no opacity). El copy no se mueve con scroll.
  const markY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["0%", "-30%"]);
  const markRotate = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -10]);

  return (
    <section ref={ref} id="inicio" className="relative flex min-h-svh flex-col overflow-hidden pt-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_40%_40%,black,transparent)]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 size-[42rem] rounded-full bg-tally/15 blur-[140px]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grain opacity-[0.07] mix-blend-overlay" />

      <motion.div
        aria-hidden
        style={{ y: markY, rotate: markRotate }}
        className="pointer-events-none absolute -right-[18%] top-[14%] w-[85vw] max-w-[980px] text-cream/[0.035] md:-right-[8%] md:w-[62vw]"
      >
        <LogoMark mono />
      </motion.div>

      <div className="container-site relative z-10 flex flex-1 flex-col justify-center py-16">
        <div className="hero-enter max-w-6xl">
          <div className="hero-enter-item mb-8 flex flex-wrap items-center gap-3 text-sm text-cream/60" style={{ "--hero-delay": "0ms" } as React.CSSProperties}>
            <OnAirBadge />
            <span>Studio creativo · {site.location}</span>
          </div>

          <h1
            className="text-[clamp(3.25rem,11vw,10rem)] font-bold leading-[0.88] tracking-display"
            style={{ "--hero-delay": "80ms" } as React.CSSProperties}
          >
            <span className="hero-enter-line block overflow-hidden pb-[0.06em]">
              <span className="hero-enter-mask block">Tu evento,</span>
            </span>
            <span className="hero-enter-line block overflow-hidden pb-[0.06em]" style={{ "--hero-delay": "160ms" } as React.CSSProperties}>
              <span className="hero-enter-mask block">
                <em className="font-bold italic text-tally">en vivo</em> y
              </span>
            </span>
            <span className="hero-enter-line block overflow-hidden pb-[0.06em]" style={{ "--hero-delay": "240ms" } as React.CSSProperties}>
              <span className="hero-enter-mask block">sin fronteras.</span>
            </span>
          </h1>

          <p
            className="hero-enter-item mt-8 max-w-xl text-lg leading-relaxed text-cream/65 md:text-xl"
            style={{ "--hero-delay": "320ms" } as React.CSSProperties}
          >
            Transmitimos conferencias, lanzamientos, reuniones corporativas y celebraciones en alta calidad,
            para que tu audiencia viva el evento esté donde esté.
          </p>

          <div
            className="hero-enter-item mt-10 flex flex-wrap items-center gap-4"
            style={{ "--hero-delay": "400ms" } as React.CSSProperties}
          >
            <MagneticButton href="#contacto">Cotiza tu transmisión</MagneticButton>
            <MagneticButton href="#proyectos" variant="ghost">
              Ver transmisiones
            </MagneticButton>
          </div>
        </div>
      </div>

      <div
        className="hero-enter-item relative z-10 border-t border-cream/10"
        style={{ "--hero-delay": "520ms" } as React.CSSProperties}
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
      </div>
    </section>
  );
}
