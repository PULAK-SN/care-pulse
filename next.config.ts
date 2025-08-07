import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    ENDPOINT: process.env.NEXT_PUBLIC_ENDPOINT,
    PROJECT_ID: process.env.PROJECT_ID,
    API_KEY: process.env.API_KEY,
    BUCKET_ID: process.env.NEXT_PUBLIC_BUCKET_ID,
    DATABASE_ID: process.env.DATABASE_ID,
    PATIENT_COLLECTION_ID: process.env.PATIENT_COLLECTION_ID,
    APPOINTMENT_COLLECTION_ID: process.env.APPOINTMENT_COLLECTION_ID,
  },
};

export default nextConfig;
