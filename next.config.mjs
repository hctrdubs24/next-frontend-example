/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.es.wired.com",
      },
      {
        protocol: "https",
        hostname: "blocks.astratic.com",
      },
    ],
  },
}

export default nextConfig
