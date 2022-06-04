/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  alternateRefs: [
    {
      href: 'https://example.com',
      hreflang: 'zh-CN',
    },
    {
      href: 'https://example.com/en-US',
      hreflang: 'en-US',
    },
  ],
  transform: (config, path) => {
    if (path.indexOf('/www') !== -1) {
      return {
        loc: path.replace('/www', '/'),
        changefreq: config.changefreq, // 'weekly',
        priority: config.priority,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        alternateRefs: config.alternateRefs ?? [],
      };
    }

    // Use default transformation for all others cases
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
