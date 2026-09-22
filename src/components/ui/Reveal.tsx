"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { fadeUp, maskUp, stagger } from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Retraso en segundos antes de animar. */
  delay?: number;
  /** Variantes personalizadas (por defecto: fade + subida). */
  variants?: Variants;
  as?: "div" | "section" | "li" | "p" | "span" | "article";
  /** Porcentaje del elemento visible antes de disparar (0–1). */
  amount?: number;
};

/** Inyecta un delay en la variante "show" (la transición de la variante manda sobre la del componente). */
function withDelay(variants: Variants, delay: number): Variants {
  const show = variants.show;
  if (!delay || !show || typeof show === "function") return variants;
  return { ...variants, show: { ...show, transition: { ...show.transition, delay } } };
}

/** Si whileInView no dispara (iOS quirks), fuerza "show" tras un momento. */
function useRevealFallback(active: boolean) {
  const [forced, setForced] = useState(false);
  useEffect(() => {
    if (!active || forced) return;
    const id = window.setTimeout(() => setForced(true), 1200);
    return () => window.clearTimeout(id);
  }, [active, forced]);
  return forced;
}

/**
 * Aparición al hacer scroll. Envuelve cualquier bloque.
 * Con reducir movimiento, renderiza HTML estático (siempre visible).
 */
export function Reveal({ children, className, delay = 0, variants = fadeUp, as = "div", amount = 0.15 }: RevealProps) {
  const Component = motion[as];
  const reduceMotion = useReducedMotion();
  const [seen, setSeen] = useState(false);
  const forced = useRevealFallback(!seen && !reduceMotion);

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Component
      className={className}
      variants={withDelay(variants, delay)}
      initial="hidden"
      animate={forced || seen ? "show" : undefined}
      whileInView="show"
      viewport={{ once: true, amount, margin: "0px 0px -5% 0px" }}
      onViewportEnter={() => setSeen(true)}
    >
      {children}
    </Component>
  );
}

/**
 * Texto que sube desde una máscara. Con "reducir movimiento", renderiza sin máscara.
 */
export function MaskReveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return <span className={`block ${className ?? ""}`}>{children}</span>;
  }
  return (
    <motion.span
      className={`block overflow-hidden pb-[0.1em] ${className ?? ""}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.span className="block" variants={withDelay(maskUp, delay)}>
        {children}
      </motion.span>
    </motion.span>
  );
}

/**
 * Contenedor que escalona la entrada de sus hijos <StaggerItem>.
 */
export function Stagger({
  children,
  className,
  interval = 0.1,
  delay = 0,
  amount = 0.1,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  interval?: number;
  delay?: number;
  amount?: number;
  as?: "div" | "ul" | "ol";
}) {
  const Component = motion[as];
  const reduceMotion = useReducedMotion();
  const [seen, setSeen] = useState(false);
  const forced = useRevealFallback(!seen && !reduceMotion);

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Component
      className={className}
      variants={stagger(interval, delay)}
      initial="hidden"
      animate={forced || seen ? "show" : undefined}
      whileInView="show"
      viewport={{ once: true, amount, margin: "0px 0px -5% 0px" }}
      onViewportEnter={() => setSeen(true)}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className,
  variants = fadeUp,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  as?: "div" | "li" | "article";
}) {
  const Component = motion[as];
  return (
    <Component className={className} variants={variants}>
      {children}
    </Component>
  );
}
