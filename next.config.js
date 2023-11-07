/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    domains: ['arweave.net', 'ipfs.io', 'pioneer.mypinata.cloud'],
  }
}

module.exports = nextConfig
