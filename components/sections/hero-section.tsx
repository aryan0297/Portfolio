'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download, Mail, MousePointerClick } from 'lucide-react';
import { useRef } from 'react';

import { EASE_PREMIUM, fadeUp, staggerContainer } from '@/animations/variants';
import { CodeWindow } from '@/components/sections/hero/code-window';
import { TechOrbit } from '@/components/sections/hero/tech-orbit';
import { Magnetic } from '@/components/shared/magnetic';
import { SceneFrame } from '@/components/three/scene-frame';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { profile } from '@/constants/profile';
import { useTypewriter } from '@/hooks/use-typewriter';

/**
 * Hero.
 *
 * Layout decision: the name is the largest element on the page and is plain,
 * static text — it is the LCP element, so nothing animated or 3D is allowed to
 * gate it. The rotating role, 3D scene, and code window layer in afterwards.
 * The entire right column is decorative (`aria-hidden`), so assistive tech gets
 * a clean name → role → tagline → actions sequence with no visual noise.
 */
export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const typedRole = useTypewriter(profile.roles);

  // Parallax: copy drifts up and fades as the next section arrives; the visual
  // moves further, which is what sells the depth.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 160]);

  return (
    <section
      id="home"
      ref={containerRef}
      aria-labelledby="home-heading"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-32 md:pt-36"
    >
      <div className="container">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* ---------------- Copy ---------------- */}
          <motion.div
            style={{ y: contentY, opacity: contentOpacity }}
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.09, 0.15)}
            className="relative z-10"
          >
            <motion.div variants={fadeUp}>
              <Badge variant="success" className="gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                {profile.availability}
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              id="home-heading"
              className="mt-6 text-display font-semibold uppercase text-gradient"
            >
              {profile.name}
            </motion.h1>

            {/* Rotating role. aria-live keeps the announcement polite, not spammy. */}
            <motion.p
              variants={fadeUp}
              className="mt-4 flex min-h-[2.5rem] items-center font-mono text-lg text-primary-soft sm:text-xl md:text-2xl"
            >
              <span aria-hidden className="mr-2 text-accent">
                &gt;
              </span>
              <span aria-live="polite" aria-atomic="true">
                {typedRole}
              </span>
              <span aria-hidden className="ml-1 inline-block h-6 w-[3px] animate-blink bg-accent md:h-7" />
            </motion.p>

            <motion.p variants={fadeUp} className="mt-6 max-w-xl text-pretty text-base md:text-lg">
              {profile.tagline}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Button asChild size="lg">
                  <a href="#projects">
                    View Projects
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </a>
                </Button>
              </Magnetic>

              <Magnetic>
                <Button asChild size="lg" variant="secondary">
                  <a href={profile.resumePath} download>
                    <Download className="h-4 w-4" aria-hidden />
                    Download Resume
                  </a>
                </Button>
              </Magnetic>

              <Magnetic>
                <Button asChild size="lg" variant="ghost">
                  <a href="#contact">
                    <Mail className="h-4 w-4" aria-hidden />
                    Get In Touch
                  </a>
                </Button>
              </Magnetic>
            </motion.div>

            {/* Credibility strip — only facts that are actually true. */}
            <motion.dl
              variants={fadeUp}
              className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-hairline pt-6"
            >
              {[
                { value: 'Backend', label: 'Node.js · Express · PostgreSQL' },
                { value: 'AI', label: 'OpenAI · Voice · Automation' },
                { value: 'Production', label: 'Live systems since 2026' },
              ].map((stat) => (
                <div key={stat.value}>
                  <dt className="text-sm font-semibold text-white">{stat.value}</dt>
                  <dd className="mt-1 text-[11px] leading-snug text-muted">{stat.label}</dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          {/* ---------------- Visual ---------------- */}
          <motion.div
            aria-hidden
            style={{ y: visualY }}
            className="relative mx-auto h-[400px] w-full max-w-[560px] sm:h-[480px] lg:h-[560px]"
          >
            <SceneFrame className="absolute inset-0" />
            <TechOrbit />
            <CodeWindow className="absolute -bottom-6 left-1/2 w-[94%] max-w-[420px] -translate-x-1/2 lg:-bottom-10 lg:left-auto lg:right-[-4%] lg:translate-x-0" />
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8, ease: EASE_PREMIUM }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-primary-soft lg:flex"
        aria-label="Scroll to the about section"
      >
        <MousePointerClick className="h-4 w-4" aria-hidden />
        <span className="font-mono text-[10px] uppercase tracking-[0.28em]">Scroll</span>
        <span aria-hidden className="h-10 w-px bg-gradient-to-b from-primary/60 to-transparent" />
      </motion.a>
    </section>
  );
}
