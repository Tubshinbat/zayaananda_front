const nextConfig = {
  // strictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  experimental: {
    appDir: true,
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
