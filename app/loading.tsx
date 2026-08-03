/**
 * Route-level suspense fallback. Intentionally minimal — the `Preloader`
 * handles the branded first-paint moment, so this only ever shows during a
 * slow server render.
 */
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background" role="status">
      <div className="flex flex-col items-center gap-5">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">Loading</span>
      </div>
    </div>
  );
}
