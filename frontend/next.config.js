/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DOMAIN: "http://localhost:3000",
    BACKEND_API_BASE_URL: "http://localhost:3001/",
  },
};

module.exports = nextConfig;
