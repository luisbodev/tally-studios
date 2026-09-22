import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { FeatureCard, StreamingCard } from "@/components/sections/ServiceCard";
import { eventTypes, features, streaming } from "@/content/streaming";
import { cn } from "@/lib/utils";

/**
 * Bento grid (6 columnas en desktop):
 * [ Streaming (4×2) ][ F1 ]
 * [                 ][ F2 ]
 * [ F3 ][ F4 ][ F5 ]
 */
const FEATURE_LAYOUT = ["lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "md:col-span-2 lg:col-span-2"];

export function Services() {
  return (
    <section id="servicios" className="relative scroll-mt-20 py-24 md:py-32">
      <div className="container-site">
        <SectionHeading
          index="01"
          eyebrow="Qué hacemos"
          title={
            <>
              Una transmisión que se <em>siente</em> presencial.
            </>
          }
          description="Imagen nítida, audio limpio y una audiencia que participa, esté donde esté."
        />

        <Stagger className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-6" interval={0.1}>
          <StaggerItem className="h-full md:col-span-2 lg:col-span-4 lg:row-span-2">
            <StreamingCard title={streaming.title} description={streaming.description} eventTypes={eventTypes} />
          </StaggerItem>
          {features.map((f, i) => (
            <StaggerItem key={f.title} className={cn("h-full", FEATURE_LAYOUT[i])}>
              <FeatureCard {...f} index={i} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
