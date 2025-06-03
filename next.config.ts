/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,  // ✅ 告诉 Vercel 你在用 app/
  },
}

export default nextConfig
