import type { NextConfig } from "next";

import { REMOTE_IMAGE_PATTERNS } from "./lib/remote-image-patterns";

const nextConfig: NextConfig = {
  cacheComponents: true,
  async redirects() {
    return [
      { source: "/browse", destination: "/browse-schools", permanent: false },
      { source: "/money-scanner", destination: "/", permanent: true },
      { source: "/student-scanner", destination: "/", permanent: true },
      { source: "/directory", destination: "/browse-schools", permanent: true },
      { source: "/blog", destination: "/browse-schools", permanent: true },
      { source: "/scholarships", destination: "/browse-schools", permanent: true },
      { source: "/scholarships/:path*", destination: "/browse-schools", permanent: true },
      { source: "/scholarship-scanner", destination: "/", permanent: true },
      { source: "/scholarship-quiz", destination: "/", permanent: true },
      { source: "/money-quiz", destination: "/", permanent: true },
      { source: "/apply/:path*", destination: "/", permanent: true },
      { source: "/awarded-app", destination: "/", permanent: true },
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
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
