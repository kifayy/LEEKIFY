import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  async redirects() {
    return [
      { source: "/scholarship-scanner", destination: "/money-scanner", permanent: true },
      { source: "/student-scanner", destination: "/money-scanner", permanent: true },
      { source: "/browse", destination: "/scholarships", permanent: true },
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
    ],
  },
};

export default nextConfig;
