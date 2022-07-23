/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'source.unsplash.com'],
  },
  devIndicators: {
    buildActivity: false,
    autoPrerender: false,
  },
  i18n: {
    locales: ['en-US', 'ru-RU', 'uk-UA'],
    defaultLocale: 'en-US',
  },
};

module.exports = nextConfig;
