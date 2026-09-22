import { MaskReveal, Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  /** Usa <em> dentro del título para la itálica roja de marca. */
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
};

/**
 * Encabezado de sección: índice + etiqueta, título con máscara animada
 * y descripción opcional. Es un Server Component que usa <Reveal> (cliente).
 */
export function SectionHeading({ index, eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("grid gap-8 md:grid-cols-12 md:items-end", className)}>
      <div className="md:col-span-8">
        <Reveal className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-cream/50">
          <span className="font-mono text-tally">{index}</span>
          <span className="h-px w-8 bg-cream/20" />
          <span>{eyebrow}</span>
        </Reveal>
        <h2 className="text-[clamp(2.5rem,6.5vw,5.75rem)] font-bold leading-[0.92] tracking-display text-balance [&_em]:text-tally">
          <MaskReveal>{title}</MaskReveal>
        </h2>
      </div>
      {description && (
        <Reveal delay={0.15} className="text-base leading-relaxed text-cream/60 md:col-span-4 md:pb-3 md:text-lg">
          {description}
        </Reveal>
      )}
    </div>
  );
}
