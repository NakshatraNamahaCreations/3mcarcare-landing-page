// STATIC_EXPORT=1 produces a static `out/` (for Hostinger).
// Unset (e.g. on Vercel) keeps API routes alive.
const isStaticExport = process.env.STATIC_EXPORT === '1';

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isStaticExport ? { output: 'export', trailingSlash: true } : {}),
  reactStrictMode: false,
  images: {
    unoptimized: isStaticExport,
    remotePatterns: [
      { protocol: 'https', hostname: '3mcarcarebangalore.com' }
    ]
  }
};
module.exports = nextConfig;
