import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Error 404</p>
        <h1 className="mt-4 text-headline text-gradient">This page does not exist</h1>
        <p className="mx-auto mt-4 max-w-md text-pretty">
          The link may be outdated, or the section moved. Everything lives on one page here.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to the portfolio
          </Link>
        </Button>
      </div>
    </main>
  );
}
