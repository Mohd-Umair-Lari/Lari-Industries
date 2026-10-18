/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // ensures local images with spaces and special chars render flawlessly
  },
};

module.exports = nextConfig;
