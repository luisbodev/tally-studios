export default function Home() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-hidden bg-[#070707] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,255,255,0.12),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(120,90,255,0.08),transparent_45%)]"
      />

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.35em] text-white/45">
          Tally Studios
        </p>

        <h1 className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-7xl">
          Próximamente
        </h1>

        <p className="mt-6 max-w-lg text-base leading-relaxed text-white/55 sm:text-lg">
          Estamos preparando algo especial. Un espacio para crear, contar historias
          y dar forma a ideas con intención.
        </p>

        <div className="mt-12 h-px w-16 bg-white/20" />

        <p className="mt-8 text-sm text-white/35">
          Muy pronto estaremos en línea.
        </p>
      </main>

      <footer className="relative z-10 px-6 pb-8 text-center text-xs text-white/25">
        © {new Date().getFullYear()} Tally Studios
      </footer>
    </div>
  );
}
