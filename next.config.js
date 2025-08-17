/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/autonitylend',
  images: {
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig