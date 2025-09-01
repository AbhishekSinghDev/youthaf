import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "skillex.t3.storage.dev",
        port: "",
        protocol: "https",
      },
      {
        hostname: "youthaf.t3.storage.dev",
        port: "",
        protocol: "https",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
