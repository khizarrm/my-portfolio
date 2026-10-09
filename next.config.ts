import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // 1280 covers the 640px hero at 2x without jumping to 1920.
    deviceSizes: [640, 750, 828, 1080, 1280, 1920, 2048],
    // Next only accepts quality values listed here. 90 is for the hero paintings and portraits.
    qualities: [75, 90],
  },
  async redirects() {
    return [
      // URLs from the previous version of the site.
      { source: '/essays/:slug', destination: '/writing/:slug', permanent: true },
      { source: '/ugc', destination: '/content', permanent: true },
    ]
  },
}

export default nextConfig
