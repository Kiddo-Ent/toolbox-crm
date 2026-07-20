import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ognamjkjagnxgdznvfbg.supabase.co",
      },
    ],
  },
};

export default nextConfig;