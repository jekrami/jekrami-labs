import type { Metadata, Viewport } from "next";
import { Inter, Manrope, Vazirmatn } from "next/font/google";
import { notFound } from "next/navigation";

import { site } from "@/lib/site";
import { paletteNoFlashScript } from "@/lib/palettes";
import { routedLocales, localeDir, isRoutedLocale, type RoutedLocale } from "@/lib/i18n";
import { structuredData } from "@/lib/structured-data";
import { LocaleProvider } from "@/components/locale-provider";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { CommandPalette } from "@/components/command-palette";
import "../globals.css";

/**
 * Self-hosted fonts via next/font — keeps Lighthouse performance high
 * because the woff2 binaries ship with the build, no third-party CDN.
 * Vazirmatn carries the Farsi locale (body + headings).
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-vazirmatn",
});

export function generateStaticParams() {
  return routedLocales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  generator: "Next.js",
  keywords: [
    "Enterprise AI",
    "Cybersecurity",
    "Intelligent Systems",
    "AI Governance",
    "RAG",
    "Agentic AI",
    "Ekrami Labs",
  ],
  category: "technology",
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/logo.png", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;
  if (!isRoutedLocale(locale)) notFound();
  const routedLocale: RoutedLocale = locale;

  return (
    <html
      lang={routedLocale}
      dir={localeDir(routedLocale)}
      className={`${inter.variable} ${manrope.variable} ${vazirmatn.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: paletteNoFlashScript() }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${site.name} — Articles`}
          href="/articles/rss.xml"
        />
      </head>
      <body className="bg-[var(--color-background)] text-[var(--color-foreground)] antialiased">
        <LocaleProvider locale={routedLocale}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-[var(--color-primary)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--color-primary-foreground)]"
          >
            Skip to main content
          </a>
          <Navigation />
          <main id="main" className="min-h-[60vh]">
            {children}
          </main>
          <Footer />
          <CommandPalette />
        </LocaleProvider>
      </body>
    </html>
  );
}
