"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { youtubeUrl, type Project } from "@/content/projects";
import { EASE_OUT_EXPO, fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Portafolio de transmisiones. Hover:
 *  - el resto de proyectos se atenúa (estado compartido `active`)
 *  - la miniatura hace zoom suave y el botón de play crece
 * Clic: la miniatura se reemplaza por el reproductor de YouTube (sin salir del sitio).
 */
export function ProjectsGallery({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <div className="mt-16 grid gap-x-5 gap-y-14 md:grid-cols-12" onPointerLeave={() => setActive(null)}>
      {projects.map((project) => {
        const dimmed = active !== null && active !== project.id && playing !== project.id;
        const isPlaying = playing === project.id;
        return (
          <motion.article
            key={project.id}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className={cn("group", project.span === 12 ? "md:col-span-12" : "md:col-span-6")}
            onPointerEnter={() => setActive(project.id)}
          >
            <motion.div animate={{ opacity: dimmed ? 0.4 : 1 }} transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}>
              <div
                className={cn(
                  "relative overflow-hidden rounded-3xl border border-cream/10 bg-ink-800",
                  project.span === 12 ? "aspect-video lg:aspect-[21/9]" : "aspect-video",
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isPlaying ? (
                    <motion.iframe
                      key="player"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 size-full"
                      src={`https://www.youtube-nocookie.com/embed/${project.videoId}?autoplay=1&rel=0${project.start ? `&start=${project.start}` : ""}`}
                      title={project.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <motion.button
                      key="poster"
                      type="button"
                      exit={{ opacity: 0 }}
                      onClick={() => setPlaying(project.id)}
                      onFocus={() => setActive(project.id)}
                      aria-label={`Reproducir: ${project.title}`}
                      className="absolute inset-0 block size-full cursor-pointer"
                    >
                      <motion.div
                        className="absolute inset-0"
                        animate={{ scale: active === project.id ? 1.04 : 1 }}
                        transition={{ duration: 1, ease: EASE_OUT_EXPO }}
                      >
                        <Thumbnail videoId={project.videoId} alt={project.title} wide={project.span === 12} />
                      </motion.div>
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />

                      <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-ink/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream backdrop-blur">
                        <span className="size-1.5 rounded-full bg-tally" /> Transmisión en vivo
                      </span>

                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex size-20 items-center justify-center rounded-full bg-tally text-cream shadow-[0_0_0_10px_rgb(255_0_8/0.18)] transition-transform duration-500 ease-out-expo group-hover:scale-110 md:size-24">
                          <svg viewBox="0 0 24 24" className="ml-1 size-7 md:size-8" aria-hidden>
                            <path d="M7 5.5v13c0 .8.9 1.3 1.6.9l10.4-6.5c.6-.4.6-1.4 0-1.8L8.6 4.6C7.9 4.2 7 4.7 7 5.5z" fill="currentColor" />
                          </svg>
                        </span>
                      </span>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-5 flex items-start justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold tracking-display md:text-3xl">{project.title}</h3>
                  <p className="mt-1 text-sm text-cream/50">
                    {project.category}
                    {project.year && ` · ${project.year}`}
                  </p>
                </div>
                <a
                  href={youtubeUrl(project)}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 pt-2 text-sm font-medium text-cream/60 transition-colors hover:text-tally"
                >
                  Ver en YouTube ↗
                </a>
              </div>
            </motion.div>
          </motion.article>
        );
      })}
    </div>
  );
}

/** Miniatura de YouTube: intenta la de máxima resolución y cae a la estándar si no existe. */
function Thumbnail({ videoId, alt, wide }: { videoId: string; alt: string; wide: boolean }) {
  const [src, setSrc] = useState(`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`);
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={wide ? "(min-width: 768px) 90vw, 100vw" : "(min-width: 768px) 45vw, 100vw"}
      className="object-cover"
      onError={() => setSrc(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`)}
      onLoad={(e) => {
        // YouTube devuelve una imagen gris de 120px cuando no existe maxres
        if (e.currentTarget.naturalWidth <= 120) setSrc(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`);
      }}
    />
  );
}
