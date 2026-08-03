import { MapPin } from 'lucide-react';

import { fadeRight, fadeUp } from '@/animations/variants';
import { ContactForm } from '@/components/sections/contact/contact-form';
import { QrCard } from '@/components/sections/contact/qr-card';
import { Reveal } from '@/components/shared/reveal';
import { Section, SectionHeading } from '@/components/shared/section';
import { GlassCard } from '@/components/ui/glass-card';
import { profile, socialLinks } from '@/constants/profile';

/**
 * Contact.
 *
 * Design decision: the direct channels sit beside the form, not below it.
 * Plenty of people will never fill in a form — giving them a visible email
 * address and profile links costs nothing and converts better.
 */
export function ContactSection() {
  return (
    <Section id="contact">
      <SectionHeading
        id="contact"
        eyebrow="Contact"
        title="Let's build something solid"
        description="Open to backend and AI engineering roles, and to interesting automation problems. The fastest way to reach me is a direct message."
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal variants={fadeUp}>
          <ContactForm />
        </Reveal>

        <Reveal variants={fadeRight} className="flex flex-col gap-5">
          <GlassCard className="p-6 md:p-7">
            <h3 className="text-sm font-semibold text-white">Direct channels</h3>

            <ul className="mt-5 flex flex-col gap-3">
              {socialLinks.map(({ label, href, icon: Icon, handle }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3.5 rounded-2xl border border-hairline bg-white/[0.02] p-3.5 transition-colors duration-300 hover:border-primary/40 hover:bg-white/[0.05]"
                  >
                    <span
                      aria-hidden
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-hairline text-primary-soft transition-colors group-hover:border-primary/50 group-hover:text-accent"
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-white">{label}</span>
                      <span className="block truncate font-mono text-[11px] text-muted">
                        {handle}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-5 flex items-center gap-2 text-xs text-muted">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {profile.location}
            </p>
          </GlassCard>

          {/* Rendered on the server and passed through `Reveal` as children,
              so the async component never crosses a client boundary. */}
          <QrCard />
        </Reveal>
      </div>
    </Section>
  );
}
