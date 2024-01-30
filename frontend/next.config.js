/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DOMAIN: "http://localhost:3000",
    BACKEND_API_BASE_URL: "https://expense-tracker-api-v1.vercel.app/",
  },
};

module.exports = nextConfig;
