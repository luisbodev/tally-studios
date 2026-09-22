"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { LogoWordmark } from "@/components/ui/Logo";
import { site } from "@/lib/site";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Navbar fija que se oculta al bajar y reaparece al subir.
 * Ejemplo de `useScroll` + `useMotionValueEvent` para reaccionar al scroll.
 */
export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pendingHash = useRef<string | null>(null);

  /**
   * En móvil, cerrar el menú (animación de altura) interrumpe el scroll nativo
   * del ancla. Guardamos el destino y hacemos scroll cuando el menú terminó de cerrarse.
   */
  function goTo(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    pendingHash.current = href;
    setOpen(false);
  }

  function scrollToPending() {
    const href = pendingHash.current;
    pendingHash.current = null;
    if (!href) return;
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", href);
  }

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(current > previous && current > 160 && !open);
    setScrolled(current > 24);
  });

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: hidden ? "-110%" : "0%", opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          "transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || open ? "border-b border-cream/10 bg-ink/75 backdrop-blur-xl" : "border-b border-transparent",
        )}
      >
        <nav className="container-site flex h-18 items-center justify-between" aria-label="Principal">
          <a href="#inicio" aria-label="Tally Studios — inicio" className="text-cream" onClick={(e) => open && goTo(e, "#inicio")}>
            <LogoWordmark className="w-[92px]" />
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group relative block px-4 py-2 text-sm font-medium text-cream/70 transition-colors hover:text-cream"
                >
                  {item.label}
                  <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-tally transition-transform duration-500 ease-out-expo group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#contacto"
              className="hidden h-10 items-center rounded-full bg-cream px-5 text-sm font-semibold text-ink transition-colors hover:bg-tally hover:text-cream sm:inline-flex"
            >
              Hablemos
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="relative flex size-10 items-center justify-center rounded-full border border-cream/15 md:hidden"
            >
              <motion.span
                className="absolute h-[1.5px] w-4 bg-cream"
                animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -3 }}
              />
              <motion.span
                className="absolute h-[1.5px] w-4 bg-cream"
                animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 3 }}
              />
            </button>
          </div>
        </nav>

        {/* Menú móvil con AnimatePresence (anima también al desmontar) */}
        <AnimatePresence onExitComplete={scrollToPending}>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              className="overflow-hidden md:hidden"
            >
              <ul className="container-site flex flex-col pb-8 pt-2">
                {site.nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.5, ease: EASE_OUT_EXPO }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => goTo(e, item.href)}
                      className="flex items-center justify-between border-b border-cream/10 py-4 text-3xl font-bold tracking-display"
                    >
                      {item.label}
                      <span className="font-mono text-xs font-normal tracking-normal text-cream/40">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
