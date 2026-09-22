"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/** Enlace mailto grande + botón para copiar el correo. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* el enlace mailto sigue disponible */
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <a
        href={`mailto:${email}`}
        className="group relative text-[clamp(1.5rem,3vw,2.4rem)] font-bold tracking-display break-all"
      >
        {email}
        <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-right scale-x-0 bg-tally transition-transform duration-500 ease-out-expo group-hover:origin-left group-hover:scale-x-100" />
      </a>
      <button
        type="button"
        onClick={copy}
        className="relative inline-flex h-9 min-w-24 items-center justify-center overflow-hidden rounded-full border border-cream/15 px-4 text-xs font-semibold uppercase tracking-[0.15em] text-cream/70 transition-colors hover:border-cream/40 hover:text-cream"
        aria-live="polite"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "ok" : "copy"}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={copied ? "text-live" : undefined}
          >
            {copied ? "Copiado" : "Copiar"}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
