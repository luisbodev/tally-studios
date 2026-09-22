import type { Transition, Variants } from "motion/react";

/**
 * Presets de animación compartidos. Mantener las curvas y duraciones en un
 * solo lugar hace que todo el sitio se mueva con el mismo "ritmo".
 */
export const EASE_OUT_EXPO: Transition["ease"] = [0.16, 1, 0.3, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: EASE_OUT_EXPO } },
};

/** Línea de texto que sube desde una máscara (el contenedor debe tener overflow-hidden). */
export const maskUp: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 1, ease: EASE_OUT_EXPO } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});
