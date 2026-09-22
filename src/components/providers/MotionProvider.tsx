"use client";

import { MotionConfig } from "motion/react";

/**
 * reducedMotion="user" desactiva automáticamente las animaciones de
 * transformación para quien tenga activado "Reducir movimiento" en su sistema.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
