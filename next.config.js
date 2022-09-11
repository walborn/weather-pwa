/** @type {import('next').NextConfig} */
const runtimeCaching = require('next-pwa/cache')
const withPWA = require('next-pwa')({ dest: 'public', runtimeCaching })
const path = require('path')
const StylelintPlugin = require('stylelint-webpack-plugin')

module.exports = withPWA({
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ['cdn.weatherapi.com'],
    formats: ['image/avif', 'image/webp'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack: (config, options) => {
    config.plugins.push(new StylelintPlugin());
    return config;
  },
})
