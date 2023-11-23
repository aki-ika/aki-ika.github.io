/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "",
  reactStrictMode: true,
  experimental: {
    images: {
      unoptimized: true
    }
  },
  images: {
    unoptimized: true
  },
  output: 'export',
}

module.exports = nextConfig