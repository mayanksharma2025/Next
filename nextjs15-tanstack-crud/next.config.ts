/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: { appDir: true },
  reactStrictMode: true,
  outputFileTracingRoot: __dirname, // ensures Next.js treats this folder as root
}

module.exports = nextConfig
