import { LogoMark, LogoWordmark } from "@/components/ui/Logo";
import { Marquee } from "@/components/ui/Broadcast";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-cream text-ink">
      {/* Patrón de marca (manual: iconos + patrón) en movimiento */}
      <div aria-hidden>
        <Marquee duration={40} className="border-b border-ink/10 py-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-14 pr-14">
              <LogoWordmark className="w-28" />
              <LogoMark className="w-20" />
            </div>
          ))}
        </Marquee>
      </div>

      <div className="container-site grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <Reveal className="md:col-span-6">
          <p className="max-w-md text-3xl font-bold leading-[1.02] tracking-display md:text-4xl">
            Studio creativo que transforma ideas en <em className="text-tally">experiencias visuales</em> de alto impacto.
          </p>
        </Reveal>

        <nav aria-label="Pie de página" className="text-sm md:col-span-3">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-ink/45">Sitio</p>
          <ul className="space-y-2">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="font-medium transition-colors hover:text-tally">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-sm md:col-span-3">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-ink/45">Contacto</p>
          <a href={`mailto:${site.email}`} className="font-medium transition-colors hover:text-tally">
            {site.email}
          </a>
          <p className="mt-2 text-ink/60">{site.location}</p>
          {site.socials.length > 0 && (
            <ul className="mt-4 flex gap-4">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="font-medium hover:text-tally">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="container-site flex flex-col gap-2 border-t border-ink/10 py-8 text-xs text-ink/50 sm:flex-row sm:justify-between">
        <p>© {year} Tally Studios. Todos los derechos reservados.</p>
        <a href="#inicio" className="hover:text-tally">
          Volver arriba ↑
        </a>
      </div>
    </footer>
  );
}
