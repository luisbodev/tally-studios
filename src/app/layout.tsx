import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { LoadingScreenRoot } from "@/components/layout/LoadingScreenRoot";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { site } from "@/lib/site";
import "./globals.css";

// Tipografía oficial del manual: Inter (Bold para titulares, Bold Italic como acento)
const inter = Inter({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Tally Studios — Transmisiones en vivo de eventos",
    template: "%s · Tally Studios",
  },
  description: site.description,
  openGraph: {
    title: "Tally Studios",
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "es_SV",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Tally Studios", description: site.description },
};

export const viewport: Viewport = {
  themeColor: "#111010",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} h-full`}>
      <body className="min-h-full">
        <LoadingScreenRoot />
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cream focus:px-4 focus:py-2 focus:text-ink"
        >
          Saltar al contenido
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
