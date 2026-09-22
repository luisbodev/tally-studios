/**
 * Transmisiones realizadas. Para agregar una nueva, copia un objeto y cambia
 * el `videoId` (lo que va después de `watch?v=` en el enlace de YouTube).
 * `start` es el segundo en que empieza a reproducirse (el `&t=` del enlace).
 */
export type Project = {
  id: string;
  title: string;
  category: string;
  year?: string;
  videoId: string;
  start?: number;
  /** Ancho en desktop (grid de 12 columnas). */
  span: 6 | 12;
};

export const projects: Project[] = [
  {
    id: "digital-assets-summit-2026",
    title: "Digital Assets Summit 2026 El Salvador",
    category: "Conferencia",
    year: "2026",
    videoId: "uO5c9oxYJCA",
    start: 6035,
    span: 12,
  },
  {
    id: "lanzamiento-bitcapital",
    title: "Lanzamiento Bitcapital Solutions",
    category: "Lanzamiento",
    videoId: "67LvjsWr9gA",
    start: 9,
    span: 6,
  },
  {
    id: "dia-del-internet-2026",
    title: "Día del Internet 2026",
    category: "Evento",
    year: "2026",
    videoId: "-YSIWSkHv7A",
    span: 6,
  },
];

export const youtubeUrl = (p: Project) =>
  `https://www.youtube.com/watch?v=${p.videoId}${p.start ? `&t=${p.start}s` : ""}`;
