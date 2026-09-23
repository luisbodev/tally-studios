"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Phase = "show" | "out" | "gone";

/**
 * Pantalla de carga de marca.
 * - SSR + primer paint: visible
 * - useEffect la cierra (mín. ~0.8s, tope 2s) — no depende de un script inline
 *   que React pueda “deshacer” al hidratar
 * - sessionStorage: en la misma sesión no vuelve a mostrarse
 */
export function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>("show");

  useEffect(() => {
    try {
      if (sessionStorage.getItem("tally-intro") === "1") {
        setPhase("gone");
        document.documentElement.classList.remove("loader-active");
        return;
      }
    } catch {
      /* private mode */
    }

    document.documentElement.classList.add("loader-active");
    // Avoid restoring mid-page scroll under the fixed nav while the splash is up.
    window.scrollTo(0, 0);

    let done = false;
    const started = Date.now();
    const MIN_MS = 800;
    const MAX_MS = 2000;

    function hide() {
      if (done) return;
      done = true;
      const wait = Math.max(0, MIN_MS - (Date.now() - started));
      window.setTimeout(() => {
        setPhase("out");
        document.documentElement.classList.add("loader-done");
        document.documentElement.classList.remove("loader-active");
        window.scrollTo(0, 0);
        try {
          sessionStorage.setItem("tally-intro", "1");
        } catch {
          /* ignore */
        }
        window.setTimeout(() => {
          setPhase("gone");
        }, 650);
      }, wait);
    }

    const onReady = () => window.setTimeout(hide, 200);
    if (document.readyState === "complete") onReady();
    else window.addEventListener("load", onReady, { once: true });

    const failsafe = window.setTimeout(hide, MAX_MS);
    return () => {
      window.clearTimeout(failsafe);
      window.removeEventListener("load", onReady);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      id="tally-loader"
      className={cn("tally-loader", phase === "out" && "tally-loader--out")}
      role="status"
      aria-live="polite"
      aria-label="Cargando Tally Studios"
      aria-hidden={phase !== "show"}
    >
      <div className="tally-loader__grid" aria-hidden />
      <div className="tally-loader__glow" aria-hidden />

      <div className="tally-loader__inner">
        <p className="tally-loader__badge">
          <span className="tally-loader__dot" aria-hidden />
          On air
        </p>

        <svg
          className="tally-loader__mark"
          viewBox="463.35 241.85 442.96 214.99"
          role="img"
          aria-label="Tally Studios"
        >
          <path
            fill="currentColor"
            d="M 576 247.960938 L 621.035156 247.960938 C 627.261719 247.960938 632.308594 253.011719 632.308594 259.238281 L 632.308594 439.445312 C 632.308594 445.671875 627.261719 450.722656 621.035156 450.722656 L 576 450.722656 C 569.773438 450.722656 564.726562 445.671875 564.726562 439.445312 L 564.726562 259.238281 C 564.726562 253.011719 569.773438 247.960938 576 247.960938"
          />
          <path
            fill="currentColor"
            d="M 474.621094 247.960938 L 519.65625 247.960938 C 525.882812 247.960938 530.933594 253.011719 530.933594 259.238281 L 530.933594 439.445312 C 530.933594 445.671875 525.882812 450.722656 519.65625 450.722656 L 474.621094 450.722656 C 468.394531 450.722656 463.347656 445.671875 463.347656 439.445312 L 463.347656 259.238281 C 463.347656 253.011719 468.394531 247.960938 474.621094 247.960938"
          />
          <path
            fill="var(--color-tally)"
            d="M 891.6875 328.535156 L 777.878906 274.25 L 777.878906 424.433594 L 891.6875 370.148438 C 906.308594 363.171875 906.308594 335.511719 891.6875 328.535156"
          />
          <path
            fill="var(--color-tally)"
            d="M 744.085938 432.777344 L 744.085938 265.90625 L 707.726562 250.347656 C 687.867188 241.847656 666.105469 257.113281 666.105469 279.542969 L 666.105469 419.140625 C 666.105469 441.570312 687.867188 456.835938 707.726562 448.335938 Z M 744.085938 432.777344"
          />
        </svg>

        <p className="tally-loader__name">Tally Studios</p>
        <div className="tally-loader__bar" aria-hidden>
          <span className="tally-loader__bar-fill" />
        </div>
      </div>
    </div>
  );
}
