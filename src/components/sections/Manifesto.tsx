"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, type MotionValue } from "motion/react";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { useScrollMap } from "@/lib/use-scroll-map";

/** Texto de "Esencia" del manual. Las palabras entre *asteriscos* van en itálica. */
const ESSENCE =
  "Creamos *experiencias* *digitales* y *audiovisuales* que elevan la forma en que las marcas se ven, se comunican y conectan con su audiencia.";

const VALUES = [
  { title: "Calidad", text: "Cada transmisión proyecta profesionalismo y un alto estándar visual." },
  { title: "Precisión", text: "Los detalles importan. Cuidamos la ejecución técnica, estética y funcional." },
  { title: "Conexión", text: "Contenido que genera cercanía, interacción y una experiencia significativa." },
  { title: "Innovación", text: "Soluciones actuales, creativas y orientadas al futuro de la comunicación digital." },
];

function useIsCoarsePointer() {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const sync = () => setCoarse(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return coarse;
}

/**
 * Scroll-lit words on desktop; full opacity on touch / reduced-motion
 * (Safari scroll opacity is unreliable and reads as “broken loading”).
 */
export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const coarse = useIsCoarsePointer();
  const lit = !!reduceMotion || coarse;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = ESSENCE.split(" ");

  return (
    <section aria-label="Quiénes somos" className="relative py-20 md:py-40">
      <div className="container-site">
        <p
          ref={ref}
          className="max-w-6xl text-[clamp(1.65rem,5vw,4.25rem)] font-bold leading-[1.08] tracking-display md:leading-[1.02]"
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]} lit={lit}>
                {word}
              </Word>
            );
          })}
        </p>

        <Stagger className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-cream/10 bg-cream/10 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <StaggerItem key={v.title} className="bg-ink p-7 md:p-8">
              <span className="font-mono text-xs text-cream/35">0{i + 1}</span>
              <h3 className="mt-6 text-2xl font-bold italic tracking-tight-brand text-tally">{v.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-cream/60">{v.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
  lit,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  lit: boolean;
}) {
  const opacity = useScrollMap(progress, range, lit ? [1, 1] : [0.35, 1]);
  const accent = children.startsWith("*");
  const text = children.replaceAll("*", "");
  return (
    <>
      <motion.span style={{ opacity }} className={accent ? "italic text-tally" : undefined}>
        {text}
      </motion.span>{" "}
    </>
  );
}
