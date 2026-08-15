import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  /**
   * All media is pre-encoded to AVIF/WebP at fixed widths by scripts/harvest-media.mjs
   * and served as static files, so the built-in image optimiser is unused. Long-lived
   * immutable caching is safe: filenames change when the harvester re-runs.
   */
  async headers() {
    return [
      {
        source: '/media/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default nextConfig;
