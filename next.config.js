/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ]
  },
  resolve: {
    fallback: {
      "fs": false
    },
  }
}

module.exports = nextConfig
