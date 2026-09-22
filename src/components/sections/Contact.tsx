import { CopyEmail } from "@/components/sections/CopyEmail";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LiveDot } from "@/components/ui/Broadcast";
import { site } from "@/lib/site";

const MAILTO = `mailto:${site.email}?subject=${encodeURIComponent("Cotización de transmisión")}&body=${encodeURIComponent(
  "Hola, quiero cotizar la transmisión de un evento.\n\nTipo de evento:\nFecha:\nLugar:\nPlataformas:\n",
)}`;

export function Contact() {
  return (
    <section id="contacto" className="relative scroll-mt-20 overflow-hidden border-t border-cream/10 py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 size-[36rem] rounded-full bg-tally/10 blur-[140px]" />

      <div className="container-site relative">
        <SectionHeading
          index="03"
          eyebrow="Contacto"
          title={
            <>
              ¿Tienes un evento <em>en mente</em>?
            </>
          }
          description="Cuéntanos qué evento quieres transmitir: fecha, lugar y plataformas. Te ayudamos a definir el alcance y te enviamos una propuesta clara."
        />

        <Reveal className="mt-16 rounded-3xl border border-cream/10 bg-ink-800 p-7 md:p-12">
          <p className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-cream/50">
            <LiveDot /> Escríbenos directo
          </p>
          <CopyEmail email={site.email} />

          <div className="mt-10 flex flex-col gap-8 border-t border-cream/10 pt-8 md:flex-row md:items-end md:justify-between">
            <dl className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
              <div>
                <dt className="text-cream/40">Base</dt>
                <dd className="mt-1 font-medium">{site.location}</dd>
              </div>
              <div>
                <dt className="text-cream/40">Cobertura</dt>
                <dd className="mt-1 font-medium">Presencial y remota</dd>
              </div>
            </dl>
            <MagneticButton href={MAILTO}>Cotiza tu transmisión</MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
