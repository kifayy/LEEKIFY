import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "storage.googleapis.com", pathname: "/**" },
      { protocol: "https", hostname: "storage.cloud.google.com", pathname: "/**" },
      { protocol: "https", hostname: "my.pathpicker.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
