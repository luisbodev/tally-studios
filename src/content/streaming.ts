export type IconName = "live" | "camera" | "platforms" | "overlay" | "chat" | "rec";

/** El servicio de Tally Studios: transmisiones en vivo. */
export const streaming = {
  title: "Streaming de eventos",
  description:
    "Transmitimos tu evento en vivo y en alta calidad para que llegue a quien no pudo estar ahí. Nos encargamos de la parte técnica de principio a fin para que tú te enfoques en tu evento y en tu audiencia.",
};

/** Tipos de evento (se usan en la tarjeta principal y en el formulario). */
export const eventTypes = [
  "Conferencias",
  "Lanzamientos de producto",
  "Reuniones corporativas",
  "Bodas",
  "Quinceaños",
  "Fiestas y celebraciones",
];

/** Lo que incluye una transmisión. */
export const features: { title: string; description: string; icon: IconName }[] = [
  {
    title: "Multicámara",
    description: "Varios ángulos y cambios de plano en vivo para que nadie se pierda un momento.",
    icon: "camera",
  },
  {
    title: "Multiplataforma",
    description: "YouTube, Facebook, Instagram, Twitch, Zoom, Teams o Google Meet, incluso al mismo tiempo.",
    icon: "platforms",
  },
  {
    title: "Gráficos en vivo",
    description: "Tu marca en pantalla: logos, títulos y nombres de ponentes.",
    icon: "overlay",
  },
  {
    title: "Interacción en tiempo real",
    description: "Chat, encuestas y preguntas para que la audiencia remota también participe.",
    icon: "chat",
  },
  {
    title: "Grabación del evento",
    description: "Te entregamos el archivo completo para compartirlo o volver a publicarlo después.",
    icon: "rec",
  },
];
