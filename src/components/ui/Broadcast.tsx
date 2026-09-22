"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Pequeños detalles de "sala de control" que refuerzan el concepto de marca:
 * la tally light es la luz roja que indica qué cámara está AL AIRE.
 */

export function OnAirBadge({ className, label = "On air" }: { className?: string; label?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-tally/40 bg-tally/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-tally",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-tally text-tally animate-pulse-dot" />
      {label}
    </span>
  );
}

export function LiveDot({ className }: { className?: string }) {
  return <span className={cn("inline-block size-1.5 rounded-full bg-live text-live animate-pulse-dot", className)} />;
}

/**
 * Timecode estilo SMPTE (HH:MM:SS:FF a 30 fps). Se actualiza escribiendo
 * directamente en el DOM con requestAnimationFrame para no re-renderizar.
 */
export function Timecode({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const pad = (n: number) => String(n).padStart(2, "0");
    const tick = (now: number) => {
      const elapsed = now - start;
      const frames = Math.floor((elapsed / 1000) * 30) % 30;
      const total = Math.floor(elapsed / 1000);
      const s = total % 60;
      const m = Math.floor(total / 60) % 60;
      const h = Math.floor(total / 3600);
      if (ref.current) ref.current.textContent = `${pad(h)}:${pad(m)}:${pad(s)}:${pad(frames)}`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <span ref={ref} className={cn("font-mono tabular-nums", className)} aria-hidden>
      00:00:00:00
    </span>
  );
}

/** Cinta infinita horizontal. Duplica el contenido para que el loop sea continuo. */
export function Marquee({
  children,
  duration = 30,
  reverse = false,
  className,
}: {
  children: React.ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]", className)}>
      <motion.div
        className="flex shrink-0 items-center"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
