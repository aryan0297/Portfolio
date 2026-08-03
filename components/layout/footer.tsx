import { ArrowUp } from 'lucide-react';

import { navItems } from '@/constants/navigation';
import { profile, socialLinks } from '@/constants/profile';

/**
 * Server component — the year is computed at request/build time, so no client
 * JS ships just to render a date.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-hairline">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a href="#home" className="flex items-center gap-2.5" aria-label="Back to top">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 font-mono text-xs font-bold text-primary-soft">
                AT
              </span>
              <span className="text-sm font-semibold text-white">{profile.name}</span>
            </a>
            <p className="mt-4 text-sm">{profile.tagline}</p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-primary-soft"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <ul className="flex flex-col gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-white"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline transition-colors group-hover:border-primary/50">
                    <Icon className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-hairline pt-6 sm:flex-row">
          <p className="text-xs text-muted">
            Designed &amp; Developed by{' '}
            <span className="text-white">{profile.name}</span> · © {year}
          </p>
          <a
            href="#home"
            className="group inline-flex items-center gap-2 text-xs text-muted transition-colors hover:text-primary-soft"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
