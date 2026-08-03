import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Toaster } from 'sonner';

import { AmbientBackground } from '@/components/effects/ambient-background';
import { CustomCursor } from '@/components/effects/custom-cursor';
import { MouseGlow } from '@/components/effects/mouse-glow';
import { PageTransition } from '@/components/effects/page-transition';
import { Preloader } from '@/components/effects/preloader';
import { ScrollProgress } from '@/components/effects/scroll-progress';
import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { personJsonLd, projectsJsonLd, siteMetadata, websiteJsonLd } from '@/lib/seo';

import './globals.css';

/**
 * `display: swap` plus preloaded subsets: text paints immediately in the
 * fallback and swaps when the webfont lands, so the hero headline never blocks
 * LCP on a font download.
 */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = siteMetadata;

export const viewport: Viewport = {
  themeColor: '#050816',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      {/*
       * `suppressHydrationWarning` on <html> and <body>: browser extensions
       * (Grammarly, ad blockers, popup blockers) mutate these two elements
       * before React hydrates — injecting `data-gr-*` attributes and their own
       * <script> tags. Those edits are outside our control and harmless, but
       * they shift child indices and produce a hydration mismatch. The flag is
       * one level deep only, so genuine mismatches inside the app still surface.
       */}
      <body className="relative min-h-screen" suppressHydrationWarning>
        {/*
         * Structured data is rendered in the body rather than a manual <head>.
         * It still lands in the initial server HTML — which is all crawlers
         * need — while staying out of the element extensions fight over.
         */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd()) }}
        />
        <Preloader />
        <AmbientBackground />
        <MouseGlow />
        <ScrollProgress />
        <CustomCursor />

        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />

        <Toaster
          position="bottom-right"
          theme="dark"
          closeButton
          toastOptions={{
            classNames: {
              toast: 'glass-card !bg-elevated/95 !text-white !border-hairline',
              description: '!text-muted',
            },
          }}
        />
      </body>
    </html>
  );
}
