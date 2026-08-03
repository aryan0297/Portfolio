'use client';

import { RotateCcw } from 'lucide-react';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

/**
 * Route error boundary. Must be a client component — it receives a `reset`
 * callback that re-renders the segment without a full page reload.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO(aryan): forward to an error tracker (Sentry, Vercel Observability)
    // if you add one — the digest is what correlates this to the server log.
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
          Something broke
        </p>
        <h1 className="mt-4 text-headline text-gradient">Unexpected error</h1>
        <p className="mx-auto mt-4 max-w-md text-pretty">
          The page failed to render. Trying again usually resolves it.
        </p>
        {error.digest && (
          <p className="mt-3 font-mono text-[11px] text-muted">Reference: {error.digest}</p>
        )}
        <Button onClick={reset} className="mt-8">
          <RotateCcw className="h-4 w-4" aria-hidden />
          Try again
        </Button>
      </div>
    </main>
  );
}
