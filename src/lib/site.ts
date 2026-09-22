/**
 * Configuración central del sitio. Cambia aquí correo, navegación y redes;
 * todos los componentes leen de este archivo.
 */
export const site = {
  name: "Tally Studios",
  url: "https://tally-studios.com",
  email: "hello@tally-studios.com",
  location: "El Salvador",
  description:
    "Transmisiones en vivo de eventos corporativos y sociales en alta calidad para YouTube, Facebook, Instagram, Twitch, Zoom, Teams y más.",
  nav: [
    { label: "Streaming", href: "#servicios" },
    { label: "Portafolio", href: "#proyectos" },
    { label: "Contacto", href: "#contacto" },
  ],
  /** Plataformas a las que transmitimos (se muestran en el hero). */
  platforms: ["YouTube", "Facebook", "Instagram", "Twitch", "Zoom", "Microsoft Teams", "Google Meet"],
  /**
   * Redes sociales. Solo se muestran las que tengan URL.
   * Ejemplo: { label: "Instagram", href: "https://instagram.com/tallystudios" }
   */
  socials: [] as { label: string; href: string }[],
} as const;
