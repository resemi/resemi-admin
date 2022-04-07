// const path = require('path');

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

  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'src/styles')],
  // },
});

module.exports = nextConfig;
