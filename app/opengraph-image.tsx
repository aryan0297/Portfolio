import { ImageResponse } from 'next/og';

import { profile } from '@/constants/profile';

export const alt = `${profile.name} — Backend Software Engineer & AI Automation Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Social card generated at build time with next/og.
 *
 * Generating rather than shipping a static PNG keeps the card in sync with the
 * profile constants — change the tagline once and the preview follows.
 * No custom font is loaded on purpose: it would mean a network fetch during the
 * build for a marginal typographic gain.
 */
export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#050816',
          backgroundImage:
            'radial-gradient(circle at 15% 15%, rgba(59,130,246,0.35), transparent 45%), radial-gradient(circle at 85% 80%, rgba(34,211,238,0.22), transparent 45%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            color: '#60A5FA',
            fontSize: 24,
            letterSpacing: 6,
            textTransform: 'uppercase',
          }}
        >
          <div style={{ width: 48, height: 2, background: '#3B82F6' }} />
          Portfolio
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 92,
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: -3,
          }}
        >
          {profile.name}
        </div>

        <div style={{ marginTop: 12, fontSize: 40, color: '#22D3EE' }}>
          Backend Software Engineer · AI Automation
        </div>

        <div
          style={{
            marginTop: 32,
            fontSize: 26,
            color: '#A1A1AA',
            maxWidth: 900,
            lineHeight: 1.45,
          }}
        >
          {profile.tagline}
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 44 }}>
          {['Node.js', 'PostgreSQL', 'REST APIs', 'OpenAI', 'Voice AI'].map((tag) => (
            <div
              key={tag}
              style={{
                padding: '10px 22px',
                borderRadius: 999,
                border: '1px solid rgba(148,163,184,0.25)',
                color: '#E2E8F0',
                fontSize: 22,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
