// next config
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin');
const SemiWebpackPlugin = require('@douyinfe/semi-webpack-plugin').default;

const semi = require('@douyinfe/semi-next').default({
  /* the extension options */
});

// [[[ Temporarily fix duplicate atom key from https://github.com/facebookexperimental/Recoil/issues/733#issuecomment-923492445
const intercept = require('intercept-stdout');

// safely ignore recoil warning messages in dev (triggered by HMR)
function interceptStdout(text) {
  if (text.includes('Duplicate atom key')) {
    return '';
  }
  return text;
}

if (process.env.NODE_ENV === 'development') {
  intercept(interceptStdout);
}
// ]]]

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
    config.plugins.push(
      new SemiWebpackPlugin({
        theme: '@semi-bot/semi-theme-resemi-admin',
        // include: '~@semi-bot/semi-theme-resemi-admin/scss/local.scss'
      }),
      new WindiCSSWebpackPlugin(),
    );
    return config;
  },

  rewrites() {
    return [
      {
        source: '/',
        destination: '/www',
      },
      {
        source: '/login',
        destination: '/www/login',
      },
      {
        source: '/register',
        destination: '/www/register',
      },
    ];
  },
  redirects() {
    return [
      {
        source: '/www',
        destination: '/',
        permanent: true,
      },
    ];
  },
});

module.exports = nextConfig;
