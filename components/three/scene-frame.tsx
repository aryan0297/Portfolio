'use client';

import dynamic from 'next/dynamic';

/**
 * three.js is ~150 KB gzipped — far too heavy to sit in the initial bundle for
 * a decorative element. Loading it client-side only, behind a lightweight
 * skeleton, keeps the hero's LCP text-driven.
 */
const LaptopScene = dynamic(() => import('@/components/three/laptop-scene'), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="h-48 w-72 animate-pulse rounded-card border border-hairline bg-white/[0.03]" />
    </div>
  ),
});

export function SceneFrame({ className }: { className?: string }) {
  return (
    <div className={className}>
      <LaptopScene />
    </div>
  );
}
