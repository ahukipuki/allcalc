/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // For self-hosting: standalone output makes deploys easier
  output: 'standalone',
};

module.exports = nextConfig;
