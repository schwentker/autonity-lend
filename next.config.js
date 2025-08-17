/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/autonitylend',
  assetPrefix: '/autonitylend',
  images: {
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig