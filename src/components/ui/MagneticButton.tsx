"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  /** Qué tanto "atrae" el cursor (0–1). */
  strength?: number;
};

/**
 * CTA con efecto magnético en puntero fino. En touch no aplica springs
 * (evita transforms raros en iOS); el enlace sigue siendo un <a> normal.
 */
export function MagneticButton({ href, children, variant = "primary", className, strength = 0.3 }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  function handleMove(e: React.PointerEvent<HTMLAnchorElement>) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const classes = cn(
    "group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full px-7 text-[15px] font-semibold tracking-tight-brand transition-colors duration-300",
    variant === "primary"
      ? "bg-tally text-cream hover:bg-tally-600"
      : "border border-cream/20 text-cream hover:border-cream/60",
    className,
  );

  return (
    <motion.a
      ref={ref}
      href={href}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      className={classes}
    >
      {variant === "ghost" && (
        <span
          aria-hidden
          className="absolute inset-0 -z-0 translate-y-full rounded-full bg-cream transition-transform duration-500 ease-out-expo group-hover:translate-y-0"
        />
      )}
      <span className={cn("relative z-10", variant === "ghost" && "transition-colors duration-500 group-hover:text-ink")}>
        {children}
      </span>
      <ArrowIcon
        className={cn(
          "relative z-10 size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1",
          variant === "ghost" && "transition-colors group-hover:text-ink",
        )}
      />
    </motion.a>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
