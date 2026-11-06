// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import { defaultLocale, sitemapLocales } from './src/i18n/config.ts';
import { site } from './src/i18n/site.ts';

// https://astro.build/config
export default defineConfig({
  site: site.url,
  trailingSlash: 'always',
  integrations: [sitemap({
      i18n: { defaultLocale, locales: sitemapLocales },
      filter: (page) => !page.includes('/obrigado/'),
    })],
  vite: {
    plugins: [tailwindcss()],
  },
});
