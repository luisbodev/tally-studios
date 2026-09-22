"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { fadeIn, fadeUp, maskUp, stagger } from "@/lib/motion";

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

/**
 * Aparición al hacer scroll. Envuelve cualquier bloque:
 *
 *   <Reveal><h2>Hola</h2></Reveal>
 *
 * Usa `whileInView` + `viewport.once` para animar solo la primera vez.
 */
export function Reveal({ children, className, delay = 0, variants = fadeUp, as = "div", amount = 0.2 }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      variants={withDelay(variants, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount, margin: "0px 0px -8% 0px" }}
    >
      {children}
    </Component>
  );
}

/**
 * Texto que sube desde una máscara. El disparador `whileInView` va en el
 * contenedor (visible) y el hijo hereda la variante: si el disparador
 * estuviera en el hijo oculto por la máscara, nunca se detectaría en pantalla.
 * Con "reducir movimiento", usa fade en vez de y (evita texto atrapado fuera de la máscara).
 */
export function MaskReveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.span
      className={`block overflow-hidden pb-[0.1em] ${className ?? ""}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
    >
      <motion.span className="block" variants={withDelay(reduceMotion ? fadeIn : maskUp, delay)}>
        {children}
      </motion.span>
    </motion.span>
  );
}

/**
 * Contenedor que escalona la entrada de sus hijos <StaggerItem>.
 *
 *   <Stagger className="grid grid-cols-3">
 *     {items.map(i => <StaggerItem key={i.id}>…</StaggerItem>)}
 *   </Stagger>
 */
export function Stagger({
  children,
  className,
  interval = 0.1,
  delay = 0,
  amount = 0.15,
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
  return (
    <Component
      className={className}
      variants={stagger(interval, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount, margin: "0px 0px -5% 0px" }}
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
