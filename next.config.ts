import type { NextConfig } from "next";

import { REMOTE_IMAGE_PATTERNS } from "./lib/remote-image-patterns";

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
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
      { source: "/directory", destination: "/", permanent: true },
      { source: "/blog", destination: "/", permanent: true },
      { source: "/scholarships", destination: "/", permanent: true },
      { source: "/scholarships/:path*", destination: "/", permanent: true },
      { source: "/scholarship-scanner", destination: "/", permanent: true },
      { source: "/scholarship-quiz", destination: "/", permanent: true },
      { source: "/money-quiz", destination: "/", permanent: true },
      { source: "/browse", destination: "/", permanent: true },
      { source: "/browse-schools", destination: "/", permanent: true },
      { source: "/schools/:path*", destination: "/", permanent: true },
      { source: "/discover/:path*", destination: "/", permanent: true },
      { source: "/college-search/:path*", destination: "/", permanent: true },
      { source: "/college-match-quiz", destination: "/", permanent: true },
      { source: "/gpa-calculator", destination: "/", permanent: true },
      { source: "/awarded-app", destination: "/", permanent: true },
      { source: "/apply/:path*", destination: "/", permanent: true },
      { source: "/extinct-degrees", destination: "/", permanent: true },
      { source: "/3-personality-traits", destination: "/", permanent: true },
      { source: "/llms", destination: "/", permanent: true },
      { source: "/llms.txt", destination: "/", permanent: true },
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
    qualities: [75, 80, 85, 90],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
