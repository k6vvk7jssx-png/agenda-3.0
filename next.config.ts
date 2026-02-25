import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  rewrites: async () => {
    return process.env.NODE_ENV === "development"
      ? [
        {
          source: "/api/python/:path*",
          destination: "http://127.0.0.1:8000/api/python/:path*",
        },
      ]
      : []; // In produzione, Vercel Serverless lo reindirizza automaticamente senza fare rewrite
  },
};

export default nextConfig;
