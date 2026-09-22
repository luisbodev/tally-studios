import type { IconName } from "@/content/streaming";

/**
 * Iconos en el estilo del manual: formas sólidas redondeadas, bloque principal
 * en currentColor y acento rojo.
 */
export function ServiceIcon({ name, className }: { name: IconName; className?: string }) {
  switch (name) {
    case "live":
      return (
        <svg viewBox="0 0 64 48" className={className} aria-hidden>
          <rect x="4" y="12" width="12" height="28" rx="3" fill="currentColor" />
          <rect x="20" y="12" width="12" height="28" rx="3" fill="currentColor" />
          <path d="M38 19.5c0-3.3 3.3-5.5 6.4-4.2l14 6.3c3 1.4 3 5.7 0 7.1l-14 6.3c-3.1 1.3-6.4-.9-6.4-4.2z" fill="var(--color-tally)" />
        </svg>
      );
    case "camera":
      return (
        <svg viewBox="0 0 64 48" className={className} aria-hidden>
          <rect x="4" y="8" width="40" height="32" rx="6" fill="currentColor" />
          <path d="M18 17.5v13c0 1.2 1.3 1.9 2.3 1.3l11-6.5c1-.6 1-2 0-2.6l-11-6.5c-1-.6-2.3.1-2.3 1.3z" fill="var(--color-tally)" />
          <rect x="48" y="12" width="12" height="24" rx="6" fill="var(--color-tally)" />
        </svg>
      );
    case "platforms":
      return (
        <svg viewBox="0 0 64 48" className={className} aria-hidden>
          <rect x="4" y="4" width="36" height="26" rx="5" fill="currentColor" opacity="0.35" />
          <rect x="14" y="12" width="36" height="26" rx="5" fill="currentColor" opacity="0.6" />
          <rect x="24" y="20" width="36" height="26" rx="5" fill="currentColor" />
          <path d="M38 28v12c0 1 1.1 1.7 2 1.2l10-6c.9-.5.9-1.9 0-2.4l-10-6c-.9-.5-2 .2-2 1.2z" fill="var(--color-tally)" />
        </svg>
      );
    case "overlay":
      return (
        <svg viewBox="0 0 64 48" className={className} aria-hidden>
          <rect x="4" y="6" width="56" height="38" rx="6" fill="currentColor" />
          <rect x="10" y="11" width="44" height="7" rx="2.5" fill="var(--color-tally)" />
          <rect x="10" y="22" width="44" height="16" rx="2.5" fill="var(--color-ink)" />
          <circle cx="48" cy="33" r="3.5" fill="var(--color-tally)" />
        </svg>
      );
    case "chat":
      return (
        <svg viewBox="0 0 64 48" className={className} aria-hidden>
          <path d="M8 6h34a6 6 0 0 1 6 6v16a6 6 0 0 1-6 6H22l-10 8v-8H8a6 6 0 0 1-6-6V12a6 6 0 0 1 6-6z" fill="currentColor" />
          <path d="M52 18h4a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6h-2v6l-8-6H36a6 6 0 0 1-5-3" fill="var(--color-tally)" />
          <rect x="12" y="15" width="24" height="4" rx="2" fill="var(--color-ink)" />
          <rect x="12" y="22" width="15" height="4" rx="2" fill="var(--color-ink)" />
        </svg>
      );
    case "rec":
      return (
        <svg viewBox="0 0 64 48" className={className} aria-hidden>
          <rect x="4" y="6" width="56" height="36" rx="6" fill="currentColor" />
          <circle cx="20" cy="24" r="7" fill="var(--color-tally)" />
          <rect x="32" y="18" width="20" height="4" rx="2" fill="var(--color-ink)" />
          <rect x="32" y="26" width="13" height="4" rx="2" fill="var(--color-ink)" />
        </svg>
      );
  }
}
