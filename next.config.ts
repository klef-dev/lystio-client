import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-alpha-sig.figma.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "cdn.lystio.co",
        port: ""
      }
    ]
  }
};

export default nextConfig;
