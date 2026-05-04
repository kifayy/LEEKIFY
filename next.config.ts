import type { NextConfig } from "next";

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
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "storage.googleapis.com", pathname: "/**" },
      { protocol: "https", hostname: "storage.cloud.google.com", pathname: "/**" },
      { protocol: "https", hostname: "my.pathpicker.com", pathname: "/**" },
      { protocol: "https", hostname: "zensignglobal.com", pathname: "/**" },
      { protocol: "https", hostname: "logo.clearbit.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.prod.website-files.com", pathname: "/**" },
      { protocol: "https", hostname: "framerusercontent.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
