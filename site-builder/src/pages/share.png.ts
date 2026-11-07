// The share image (Open Graph's `og:image`), written by the build: a PNG of 1200 x 630, the course's
// logo alone in the accent of the light theme, centred on the light background (src/lib/look.ts).
// Most platforms refuse an SVG there; the title of a shared link comes from `og:title`. Rendered by
// resvg (`@resvg/resvg-js`, prebuilt, no native build). Base.astro points `og:image` to it when the
// build is given an origin.
import type { APIRoute } from 'astro';
import { Resvg } from '@resvg/resvg-js';
import { logo, accent } from '../lib/look';

const WIDTH = 1200;
const HEIGHT = 630;
const SIZE = 360;
/** The light background of the site, global.css's `--bg`. */
const BACKGROUND = '#fbfaf6';

export const GET: APIRoute = () => {
  const drawing = logo({
    x: String((WIDTH - SIZE) / 2), y: String((HEIGHT - SIZE) / 2), width: String(SIZE), height: String(SIZE), color: accent.light,
  });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">`
    + `<rect width="${WIDTH}" height="${HEIGHT}" fill="${BACKGROUND}"/>${drawing}</svg>`;
  const png = new Resvg(svg, { font: { loadSystemFonts: false } }).render().asPng();
  return new Response(new Uint8Array(png), { headers: { 'content-type': 'image/png' } });
};
