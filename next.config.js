/** @type {import('next').NextConfig} */
const isDesktop = process.env.DESKTOP === 'true'

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
