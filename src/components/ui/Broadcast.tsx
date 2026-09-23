"use client";

import { useEffect, useRef } from "react";
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
 * Timecode SMPTE dibujado en canvas.
 * Actualizar textContent cada frame en iOS Safari pinta un rectángulo negro
 * detrás de los glifos; el canvas evita esa capa de texto.
 */
export function Timecode({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssWidth = 96;
    const cssHeight = 14;
    canvas.width = Math.ceil(cssWidth * dpr);
    canvas.height = Math.ceil(cssHeight * dpr);
    canvas.style.width = `${cssWidth}px`;
    canvas.style.height = `${cssHeight}px`;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = "500 12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#b8baaf";

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
      const label = `${pad(h)}:${pad(m)}:${pad(s)}:${pad(frames)}`;

      ctx.clearRect(0, 0, cssWidth, cssHeight);
      ctx.fillText(label, 0, cssHeight / 2);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={ref}
      className={cn("block bg-transparent", className)}
      width={96}
      height={14}
      aria-hidden
    />
  );
}

/**
 * Cinta infinita horizontal via CSS (no Motion transforms).
 * Motion + ancestor opacity painted solid black bars on iOS Safari.
 */
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
    <div
      className={cn(
        "relative flex overflow-hidden bg-transparent",
        "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        "[-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
    >
      <div
        className={cn("flex w-max shrink-0 items-center bg-transparent", reverse ? "animate-marquee-reverse" : "animate-marquee")}
        style={{ animationDuration: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center bg-transparent">{children}</div>
        <div className="flex shrink-0 items-center bg-transparent" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
