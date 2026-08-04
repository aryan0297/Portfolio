import type { NextConfig } from 'next';

/**
 * Applied on every response. `Content-Security-Policy` is excluded in dev:
 * Next.js dev tooling (HMR websockets, eval-based source maps) is blocked by
 * the production policy, so the CSP ships only with production builds.
 */
function securityHeaders() {
  return async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
        },
        // Isolate the browsing context: popup-created contexts can no longer
        // script back into this page, and the page is not embeddable elsewhere.
        { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
        { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
        // Only honoured by browsers over HTTPS; Vercel terminates TLS in
        // production, so this is safe to send unconditionally.
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains',
        },
        ...(process.env.NODE_ENV === 'production'
          ? [
              {
                key: 'Content-Security-Policy',
                value: [
                  "default-src 'self'",
                  // Next.js inlines its bootstrap payload and the JSON-LD blocks
                  // here; 'unsafe-inline' is required without nonce machinery.
                  // Every other vector (external scripts, blob:, data:) is blocked.
                  "script-src 'self' 'unsafe-inline'",
                  // Tailwind, framer-motion, and React inline styles.
                  "style-src 'self' 'unsafe-inline'",
                  "img-src 'self' data: blob:",
                  "font-src 'self' data:",
                  // EmailJS is called from the browser; everything else is same-origin.
                  "connect-src 'self' https://api.emailjs.com",
                  "object-src 'none'",
                  "base-uri 'self'",
                  "form-action 'self'",
                  "frame-ancestors 'self'",
                  'upgrade-insecure-requests',
                ].join('; '),
              },
            ]
          : []),
      ],
    },
  ];
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  experimental: {
    /**
     * Barrel-file optimisation. `lucide-react` re-exports ~1,500 icons from one
     * entry point; without this, a single named import can pull the whole set
     * into the client bundle.
     */
    optimizePackageImports: ['lucide-react', 'framer-motion', '@react-three/drei'],
  },

  images: {
    // AVIF first, WebP fallback — meaningful bytes saved once real screenshots
    // replace the generated project artwork.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [420, 640, 828, 1080, 1200, 1920],
  },

  headers: securityHeaders(),
};

export default nextConfig;
