"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  /** Qué tanto "atrae" el cursor (0–1). Solo mouse. */
  strength?: number;
};

/**
 * CTA. Magnetic follow is mouse-only via rAF DOM writes (no Motion transforms),
 * so iOS never gets stuck with a translated button under the navbar.
 */
export function MagneticButton({ href, children, variant = "primary", className, strength = 0.3 }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handleMove(e: React.PointerEvent<HTMLAnchorElement>) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  function reset() {
    if (!ref.current) return;
    ref.current.style.transform = "translate3d(0, 0, 0)";
  }

  return (
    <a
      ref={ref}
      href={href}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={cn(
        "group relative inline-flex h-12 items-center gap-3 overflow-hidden rounded-full px-6 text-[15px] font-semibold tracking-tight-brand transition-[colors,transform] duration-300 will-change-transform md:h-14 md:px-7",
        "active:scale-[0.98]",
        variant === "primary"
          ? "bg-tally text-cream hover:bg-tally-600"
          : "border border-cream/20 text-cream hover:border-cream/60",
        className,
      )}
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
    </a>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
