import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * ESLint 9 flat config.
 *
 * Migrated from `.eslintrc.json` + `next lint` for two reasons:
 *   1. `next lint` is deprecated and is removed in Next.js 16.
 *   2. ESLint 8 is end-of-life and is the sole source of the deprecated
 *      transitive packages (rimraf@3, glob@7, inflight@1,
 *      @humanwhocodes/config-array, @humanwhocodes/object-schema).
 *
 * `eslint-config-next` still ships eslintrc-style configs, so FlatCompat
 * translates them. This is the same shape create-next-app generates.
 */
const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
  ...compat.extends('next/core-web-vitals'),
  {
    rules: {
      // Apostrophes in prose read better unescaped; JSX text is not an
      // injection surface here.
      'react/no-unescaped-entities': 'off',
    },
  },
];

export default eslintConfig;
