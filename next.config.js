// next config
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin');

const semi = require('@douyinfe/semi-next').default({
  /* the extension options */
});

/** @type {import('next').NextConfig} */
const nextConfig = semi({
  // enable/disable strict mode
  reactStrictMode: false,
  // distDir: 'dist',
  i18n: {
    locales: ['zh-CN', 'en-US'],
    defaultLocale: 'zh-CN',
    // 禁用自动区域设置检测
    localeDetection: false,
  },

  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin());
    return config;
  },

  rewrites() {
    return {};
  },
});

module.exports = nextConfig;
