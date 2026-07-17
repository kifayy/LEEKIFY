import type { NextConfig } from "next";

import { REMOTE_IMAGE_PATTERNS } from "./lib/remote-image-patterns";

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    // Hosted scholarship applications accept a supporting PDF (up to 5 MB).
    serverActions: {
      // PEN and similar forms allow multiple 5MB uploads in one request
      bodySizeLimit: "25mb",
    },
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/money-scanner", destination: "/", permanent: true },
      { source: "/student-scanner", destination: "/", permanent: true },
      { source: "/directory", destination: "/browse", permanent: true },
      { source: "/blog", destination: "/browse", permanent: true },
      { source: "/scholarships", destination: "/browse", permanent: true },
      { source: "/scholarships/:path*", destination: "/browse", permanent: true },
      { source: "/scholarship-scanner", destination: "/", permanent: true },
      { source: "/scholarship-quiz", destination: "/", permanent: true },
      { source: "/money-quiz", destination: "/", permanent: true },
    ];
  },
  logging: {
    incomingRequests: false,
  },
  images: {
    remotePatterns: [...REMOTE_IMAGE_PATTERNS],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    qualities: [75, 90],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
