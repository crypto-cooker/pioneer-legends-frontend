/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: ['arweave.net', 'ipfs.io', 'pioneer.mypinata.cloud'],
  },
  resolve: {
    fallback: {
      "fs": false
    },
  }
}

module.exports = nextConfig
