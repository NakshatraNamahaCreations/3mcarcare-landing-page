/** @type {import('next').NextConfig} */
const nextConfig = {
  // Strict mode double-mounts components in dev, which causes ScrollTrigger
  // pin spacers to duplicate — every pinned section gets two spacers and
  // appears to "repeat twice". useGSAP's revert can't always reliably remove
  // the pinSpacer DOM before the second mount, so we disable strict mode.
  reactStrictMode: false,
  // Images are hot-linked from the live 3M site for this demo.
  // In production, self-host them under /public and use next/image.
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '3mcarcarebangalore.com' }
    ]
  }
};
module.exports = nextConfig;
