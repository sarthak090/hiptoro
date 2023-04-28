/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "www.hiptoro.com",
      "secure.gravatar.com",
      "i.ibb.co",
      "cms.hiptoro.com",
      "img.youtube.com",
      "res.cloudinary.com",
      "secureback.hiptoro.com",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
