/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
        port: '',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Add React strict mode to help catch issues
  reactStrictMode: true,
  // Improve hydration error handling
  experimental: {
    // This helps with hydration errors by suppressing them in production
    // while still showing them in development
    suppressHydrationWarning: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
