"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { ServiceIcon } from "@/components/ui/ServiceIcons";
import { OnAirBadge } from "@/components/ui/Broadcast";
import { ArrowIcon } from "@/components/ui/MagneticButton";
import type { IconName } from "@/content/streaming";
import { cn } from "@/lib/utils";

/**
 * Tarjeta interactiva base:
 *  - "spotlight" rojo que sigue al cursor (motion values + useMotionTemplate)
 *  - elevación en hover con `whileHover`
 *  - el icono reacciona mediante variantes heredadas del padre ("rest" / "hover")
 */
function SpotlightCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, rgb(255 0 8 / 0.16), transparent 70%)`;

  function handleMove(e: React.PointerEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <motion.article
      onPointerMove={handleMove}
      initial="rest"
      animate="rest"
      whileHover="hover"
      variants={{ rest: { y: 0 }, hover: { y: -6 } }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-cream/10 bg-ink-800 p-7 transition-colors duration-500 hover:border-cream/25 md:p-9",
        className,
      )}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />
      {children}
    </motion.article>
  );
}

function AnimatedIcon({ name, className }: { name: IconName; className?: string }) {
  return (
    <motion.div
      className={cn("text-cream", className)}
      variants={{ rest: { rotate: 0, scale: 1 }, hover: { rotate: -4, scale: 1.06 } }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
    >
      <ServiceIcon name={name} className="w-full" />
    </motion.div>
  );
}

/** Tarjeta principal del servicio de streaming. */
export function StreamingCard({ title, description, eventTypes }: { title: string; description: string; eventTypes: string[] }) {
  return (
    <SpotlightCard className="min-h-[26rem] lg:min-h-[34rem]">
      <div className="relative flex items-start justify-between gap-4">
        <AnimatedIcon name="live" className="w-24 md:w-28" />
        <OnAirBadge label="Nuestro servicio" />
      </div>

      <div className="relative mt-auto pt-12">
        <h3 className="text-[clamp(2.25rem,4.5vw,4rem)] font-bold leading-[0.95] tracking-display">{title}</h3>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-cream/60">{description}</p>

        <p className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-cream/40">Ideal para</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {eventTypes.map((d) => (
            <li
              key={d}
              className="rounded-full border border-cream/12 px-3 py-1 text-xs font-medium text-cream/70 transition-colors duration-300 group-hover:border-cream/25"
            >
              {d}
            </li>
          ))}
        </ul>

        <a
          href="#contacto"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cream/80 transition-colors hover:text-tally"
        >
          Cotizar transmisión
          <ArrowIcon className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
        </a>
      </div>
    </SpotlightCard>
  );
}

/** Tarjeta de lo que incluye la transmisión. */
export function FeatureCard({ title, description, icon, index }: { title: string; description: string; icon: IconName; index: number }) {
  return (
    <SpotlightCard className="min-h-[16rem]">
      <div className="relative flex items-start justify-between gap-4">
        <AnimatedIcon name={icon} className="w-14" />
        <span className="font-mono text-xs text-cream/35">0{index + 1}</span>
      </div>
      <div className="relative mt-auto pt-10">
        <h3 className="text-2xl font-bold leading-[1] tracking-display md:text-[1.75rem]">{title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-cream/60">{description}</p>
      </div>
    </SpotlightCard>
  );
}
