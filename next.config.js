/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['zh-CN', 'en-US'],
    defaultLocale: 'zh-CN',
    // 禁用自动区域设置检测
    localeDetection: false,
  },
}

module.exports = nextConfig
