import { ParticleField } from '@/components/effects/particle-field';

/**
 * Page-wide atmosphere: animated grid, drifting gradient orbs, and a particle
 * field. Everything here is `pointer-events-none` and sits at `-z-10` so it can
 * never intercept a click or affect layout.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base grid, faded at the edges so it never meets the viewport hard. */}
      <div className="absolute inset-0 grid-bg opacity-[0.5]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,#050816_78%)]" />

      {/* Gradient orbs. Long, offset durations keep the drift from looking looped. */}
      <div className="absolute -left-40 top-[-10%] h-[520px] w-[520px] rounded-full bg-primary/20 blur-[150px] animate-float" />
      <div
        className="absolute -right-40 top-[35%] h-[460px] w-[460px] rounded-full bg-accent/[0.14] blur-[150px] animate-float"
        style={{ animationDuration: '9s', animationDelay: '-3s' }}
      />
      <div
        className="absolute bottom-[-15%] left-1/3 h-[520px] w-[520px] rounded-full bg-primary-deep/20 blur-[160px] animate-float"
        style={{ animationDuration: '11s', animationDelay: '-6s' }}
      />

      <ParticleField className="absolute inset-0 h-full w-full opacity-70" />

      {/* Film grain — kills the banding that large blurred gradients produce. */}
      <div className="noise absolute inset-0" />
    </div>
  );
}
