import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: false,
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
    "*.local",
    "10.*.*.*",
    "192.168.*.*",
    "172.*.*.*",
  ],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
