import type { NextConfig } from 'next';

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

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
