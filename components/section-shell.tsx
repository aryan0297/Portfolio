'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

export function SectionShell({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        {eyebrow ? (
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-blue-400">{eyebrow}</p>
        ) : null}
        <h2 className="text-3xl font-semibold text-white md:text-4xl">{title}</h2>
      </motion.div>
      {children}
    </section>
  );
}
