// The Astro configuration of the site engine. `build-site` (this folder) gives the base path and the
// output folder through the environment; it also gives the path of the document to lay out
// (FEYN_SITE_DATA, read by src/lib/site.ts). Built alone, without build-site, Astro stops there.
import { defineConfig } from 'astro/config';

const base = process.env.FEYN_SITE_BASE || '/';
const outDir = process.env.FEYN_SITE_OUT || './dist/astro';

export default defineConfig({
  base,
  outDir,
  trailingSlash: 'always',
  build: { format: 'directory' },
  // No `site`: the build is given a base path, not an origin; no page writes a canonical address.
  devToolbar: { enabled: false },
});
