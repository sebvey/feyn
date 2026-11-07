// The Astro configuration of the site engine. `build-site` (this folder) gives the base path and the
// output folder through the environment, and the origin when it is given one (FEYN_SITE_ORIGIN,
// build-site's --origin); it also gives the path of the document to lay out (FEYN_SITE_DATA, read by
// src/lib/site.ts). Built alone, without build-site, Astro stops there.
import { defineConfig } from 'astro/config';

const base = process.env.FEYN_SITE_BASE || '/';
const outDir = process.env.FEYN_SITE_OUT || './dist/astro';
const site = process.env.FEYN_SITE_ORIGIN || undefined;

export default defineConfig({
  base,
  outDir,
  trailingSlash: 'always',
  build: { format: 'directory' },
  // `site`, the origin, only when the build is given one: the pages then write their Open Graph
  // addresses (`og:url`, `og:image`) absolute; without it (a local build), they write neither.
  site,
  devToolbar: { enabled: false },
});
