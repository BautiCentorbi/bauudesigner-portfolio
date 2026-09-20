import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/projects/muta-ai",
        destination: "/projects/bepass",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;