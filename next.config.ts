import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  async redirects() {
    return [
      { source: "/browse", destination: "/browse-schools", permanent: false },
      { source: "/money-scanner", destination: "/scholarship-scanner", permanent: true },
      { source: "/student-scanner", destination: "/scholarship-scanner", permanent: true },
      { source: "/directory", destination: "/scholarships", permanent: true },
      { source: "/blog", destination: "/scholarships", permanent: true },
    ];
  },
  logging: {
    incomingRequests: false,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "storage.googleapis.com", pathname: "/**" },
      { protocol: "https", hostname: "storage.cloud.google.com", pathname: "/**" },
      { protocol: "https", hostname: "my.pathpicker.com", pathname: "/**" },
      { protocol: "https", hostname: "zensignglobal.com", pathname: "/**" },
      { protocol: "https", hostname: "logo.clearbit.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.prod.website-files.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
