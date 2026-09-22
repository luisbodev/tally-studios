# Tally Studios — sitio web

Next.js 16 (App Router) · Tailwind CSS v4 · Motion · TypeScript

```bash
npm install
npm run dev   # http://localhost:3000
```

## Estructura

```
src/
├─ app/
│  ├─ layout.tsx            # Fuente Inter, metadata SEO, MotionProvider
│  ├─ page.tsx              # Ensambla las secciones
│  ├─ globals.css           # Tokens de marca (@theme) y utilidades
│  └─ icon.tsx              # Favicon generado con el logo secundario
├─ components/
│  ├─ layout/               # Navbar (se oculta al bajar), Footer
│  ├─ sections/             # Hero, Manifesto, Services, Projects, Contact (+ subcomponentes)
│  ├─ ui/                   # Reveal, MagneticButton, Logo, Broadcast, SectionHeading, ServiceIcons
│  └─ providers/            # MotionConfig (respeta "reducir movimiento")
├─ content/                 # streaming.ts y projects.ts — edita el contenido aquí
└─ lib/                     # site.ts (correo, nav, redes), motion.ts (presets), utils.ts
public/brand/               # Logos oficiales en SVG (negro y crema)
```

## Contenido

- **Correo, navegación, redes:** `src/lib/site.ts`
- **Servicio de streaming** (descripción, tipos de evento, qué incluye): `src/content/streaming.ts`
- **Portafolio:** `src/content/projects.ts` — transmisiones de YouTube. Para agregar una, copia un objeto y cambia el `videoId`; la miniatura se toma de YouTube y el video se reproduce dentro del sitio.

## Animaciones (Motion)

| Patrón | Dónde |
| --- | --- |
| Aparición al hacer scroll (`whileInView`) | `components/ui/Reveal.tsx` → `<Reveal>`, `<Stagger>`, `<MaskReveal>` |
| Parallax con `useScroll` + `useTransform` | `sections/Hero.tsx` |
| Texto que se ilumina con el scroll | `sections/Manifesto.tsx` |
| Botón magnético (`useMotionValue` + `useSpring`) | `ui/MagneticButton.tsx` |
| Spotlight que sigue al cursor (`useMotionTemplate`) | `sections/ServiceCard.tsx` |
| Hover coordinado y reproductor en galería | `sections/ProjectsGallery.tsx` |
| `AnimatePresence` (menú móvil, miniatura → reproductor) | `layout/Navbar.tsx`, `sections/ProjectsGallery.tsx` |
