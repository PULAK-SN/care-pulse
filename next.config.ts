import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    ENDPOINT: process.env.NEXT_PUBLIC_ENDPOINT,
    PROJECT_ID: process.env.PROJECT_ID,
    API_KEY: process.env.API_KEY,
  },
};

export default nextConfig;
