'use client';

import { useEffect, useRef } from 'react';

import { useMediaQuery } from '@/hooks/use-media-query';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

const LINK_DISTANCE = 130;

/**
 * Canvas particle field with proximity links.
 *
 * Canvas rather than DOM nodes: 60 animated divs would thrash layout, one
 * canvas costs a single composited layer. Density scales with viewport area and
 * the loop stops entirely when the section scrolls out of view or the user
 * prefers reduced motion.
 */
export function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let particles: Particle[] = [];
    let frame = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(90, Math.floor((width * height) / 16000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: Math.random() * 1.4 + 0.5,
        alpha: Math.random() * 0.4 + 0.25,
      }));
    };

    const draw = () => {
      if (!running) return;
      const { width, height } = canvas.getBoundingClientRect();
      context.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap instead of bounce — avoids visible clustering at the edges.
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        context.beginPath();
        context.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(96, 165, 250, ${p.alpha})`;
        context.fill();

        for (let j = i + 1; j < particles.length; j += 1) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const distance = Math.hypot(dx, dy);
          if (distance > LINK_DISTANCE) continue;

          context.beginPath();
          context.moveTo(p.x, p.y);
          context.lineTo(q.x, q.y);
          context.strokeStyle = `rgba(59, 130, 246, ${0.12 * (1 - distance / LINK_DISTANCE)})`;
          context.lineWidth = 1;
          context.stroke();
        }
      }

      frame = requestAnimationFrame(draw);
    };

    // Pause the loop whenever the field is off-screen.
    const visibility = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
      if (running) {
        frame = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(frame);
      }
    });

    resize();
    visibility.observe(canvas);
    window.addEventListener('resize', resize);
    frame = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      visibility.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, [prefersReducedMotion]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
