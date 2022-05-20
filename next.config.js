/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.ctfassets.net',
      'avatars.githubusercontent.com'
    ],
  },
}

module.exports = nextConfig
