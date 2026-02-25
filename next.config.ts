import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/api/python/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/api/python/:path*"
            : "/api/index.py", // Vercel API routing target for Python
      },
    ];
  },
};

export default nextConfig;
