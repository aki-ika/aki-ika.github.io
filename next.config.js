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
  }
}

module.exports = nextConfig