import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
export default defineConfig({
  site: process.env.SITE_URL || 'https://unforcedagi.github.io',
  base: process.env.BASE_PATH || '/techne-www',
  trailingSlash: 'always',
  output: 'static',
  integrations: [mdx()],
});
