"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { LogoMark } from "@/components/ui/Logo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Marquee, OnAirBadge, Timecode } from "@/components/ui/Broadcast";
import { site } from "@/lib/site";

/**
 * Hero layout notes (iOS):
 * - Do NOT combine min-h-svh + flex justify-center + overflow-hidden when
 *   content can exceed the viewport — the headline gets clipped and CTAs
 *   slide up under the fixed navbar.
 * - overflow-x-hidden only; section may grow taller than the screen.
 * - Mobile: top-aligned content; desktop: vertically centered.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const markY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["0%", "-24%"]);
  const markRotate = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -8]);

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative flex min-h-svh flex-col overflow-x-hidden pt-20 md:pt-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_40%_40%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 size-[42rem] rounded-full bg-tally/15 blur-[140px]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grain opacity-[0.07] mix-blend-overlay" />

      <motion.div
        aria-hidden
        style={{ y: markY, rotate: markRotate }}
        className="pointer-events-none absolute -right-[18%] top-[14%] hidden w-[85vw] max-w-[980px] text-cream/[0.035] md:block md:-right-[8%] md:w-[62vw]"
      >
        <LogoMark mono />
      </motion.div>

      {/* justify-start on small screens so tall copy is never clipped under the nav */}
      <div className="container-site relative z-10 flex flex-1 flex-col justify-start py-10 md:justify-center md:py-16">
        <div className="hero-enter max-w-6xl">
          <div
            className="hero-enter-item mb-5 flex flex-wrap items-center gap-3 text-sm text-cream/60 md:mb-8"
            style={{ "--hero-delay": "0ms" } as React.CSSProperties}
          >
            <OnAirBadge />
            <span>Studio creativo · {site.location}</span>
          </div>

          <h1
            className="text-[clamp(2.35rem,9.5vw,10rem)] font-bold leading-[0.92] tracking-display md:leading-[0.88]"
            style={{ "--hero-delay": "80ms" } as React.CSSProperties}
          >
            <span className="hero-enter-line block pb-[0.06em]">
              <span className="hero-enter-mask block">Tu evento,</span>
            </span>
            <span
              className="hero-enter-line block pb-[0.06em]"
              style={{ "--hero-delay": "160ms" } as React.CSSProperties}
            >
              <span className="hero-enter-mask block">
                <em className="font-bold italic text-tally">en vivo</em> y
              </span>
            </span>
            <span
              className="hero-enter-line block pb-[0.06em]"
              style={{ "--hero-delay": "240ms" } as React.CSSProperties}
            >
              <span className="hero-enter-mask block">sin fronteras.</span>
            </span>
          </h1>

          <p
            className="hero-enter-item mt-5 max-w-xl text-base leading-relaxed text-cream/65 md:mt-8 md:text-xl"
            style={{ "--hero-delay": "320ms" } as React.CSSProperties}
          >
            Transmitimos conferencias, lanzamientos, reuniones corporativas y celebraciones en alta calidad,
            para que tu audiencia viva el evento esté donde esté.
          </p>

          <div
            className="hero-enter-item mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 md:mt-10"
            style={{ "--hero-delay": "400ms" } as React.CSSProperties}
          >
            <MagneticButton href="#contacto" className="justify-center sm:justify-start">
              Cotiza tu transmisión
            </MagneticButton>
            <MagneticButton href="#proyectos" variant="ghost" className="justify-center sm:justify-start">
              Ver transmisiones
            </MagneticButton>
          </div>
        </div>
      </div>

      <div
        className="hero-enter-item relative z-10 mt-auto border-t border-cream/10"
        style={{ "--hero-delay": "520ms" } as React.CSSProperties}
      >
        <div className="container-site flex flex-col gap-3 py-4 md:flex-row md:items-center md:gap-10 md:py-5">
          <div className="flex shrink-0 items-center gap-3 text-xs uppercase tracking-[0.2em] text-cream/50">
            <span className="flex items-center gap-2 text-tally">
              <span className="size-2 rounded-full bg-tally" /> Rec
            </span>
            <Timecode className="text-cream/70" />
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-4 md:gap-6">
            <span className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-cream/40 md:text-xs">
              Transmitimos a
            </span>
            <Marquee duration={28} className="min-w-0 flex-1">
              {site.platforms.map((p) => (
                <span
                  key={p}
                  className="flex items-center gap-6 pr-6 text-sm font-semibold tracking-tight-brand text-cream/70"
                >
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
