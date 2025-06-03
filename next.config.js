/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  basePath: '/YITA-Aviation-Site',
  assetPrefix: '/YITA-Aviation-Site/',
};

module.exports = nextConfig;


