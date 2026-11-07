// The look of a course's site, derived from what the document gives (decision
// `accent-family-from-the-course-hue`): the course's logo (`course.logo`, one colour in
// `currentColor`) and its accent colour (`course.accent_color`, `#rrggbb`). The engine writes no
// colour and no logo of a course: it keeps the hue of the accent colour and gives each token of the
// accent family the lightness and chroma of its place, in each theme, the lightness carrying the
// contrast with the background; the focus takes the opposite hue.
import { doc } from './site';

type Theme = 'light' | 'dark';
/** A colour in OKLCH without its hue: lightness (0 to 1) and chroma. */
type LC = { l: number; c: number };

// The lightness and chroma of each token, per theme: those of the blue family the old site wrote,
// measured in OKLCH (its hue was about 248°). `--bulle-fg` is `--accent-ink`, `--sch-s1` is `--accent`.
const FAMILY: Record<string, Record<Theme, LC | null>> = {
  '--accent': { light: { l: 0.457, c: 0.105 }, dark: { l: 0.786, c: 0.079 } },
  '--accent-ink': { light: { l: 0.4, c: 0.095 }, dark: { l: 0.852, c: 0.057 } },
  '--bulle-bg': { light: { l: 0.938, c: 0.016 }, dark: { l: 0.298, c: 0.043 } },
  '--bulle-fg': { light: { l: 0.4, c: 0.095 }, dark: { l: 0.852, c: 0.057 } },
  '--bulle-alt': { light: { l: 0.883, c: 0.03 }, dark: { l: 0.363, c: 0.055 } },
  '--sch-s1': { light: { l: 0.457, c: 0.105 }, dark: { l: 0.786, c: 0.079 } },
  '--sch-s2': { light: { l: 0.607, c: 0.098 }, dark: { l: 0.647, c: 0.092 } },
  '--sch-s3': { light: { l: 0.754, c: 0.067 }, dark: { l: 0.52, c: 0.092 } },
  // The ink on a filled shape of a diagram: white in the light theme (global.css), tinted in the dark.
  '--sch-s-ink': { light: null, dark: { l: 0.212, c: 0.025 } },
};
// The focus, on the hue opposite the accent: the lightness and chroma of the old site's orange focus,
// which was that opposite of its blue.
const FOCUS: Record<Theme, LC> = { light: { l: 0.555, c: 0.145 }, dark: { l: 0.779, c: 0.126 } };
/**
 * Below this chroma the accent colour is a grey: its hue means nothing, so its family is grey and
 * the focus keeps its chroma on the hue of the old site's orange focus, to stay apart from the links.
 */
const ACHROMATIC = 0.01;
const GREY_FOCUS_HUE = 49;

// ---- OKLab (Björn Ottosson's matrices) and sRGB
const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toGamma = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

function oklch(hex: string): { l: number; c: number; h: number } {
  const [r, g, b] = [1, 3, 5].map((i) => toLinear(parseInt(hex.slice(i, i + 2), 16) / 255));
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return { l: L, c: Math.hypot(A, B), h: ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360 };
}

/** The linear sRGB of an OKLCH colour, each channel possibly out of [0, 1]. */
function linearRgb(L: number, C: number, h: number): [number, number, number] {
  const a = C * Math.cos((h * Math.PI) / 180);
  const b = C * Math.sin((h * Math.PI) / 180);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}
const EPS = 1e-6;
const inGamut = (rgb: number[]) => rgb.every((v) => v >= -EPS && v <= 1 + EPS);

/** The `#rrggbb` of a lightness, a chroma and a hue, the chroma reduced until it is in the sRGB gamut. */
function colour({ l, c }: LC, h: number): string {
  let chroma = c;
  if (!inGamut(linearRgb(l, chroma, h))) {
    let lo = 0;
    let hi = c;
    for (let i = 0; i < 30; i++) {
      const mid = (lo + hi) / 2;
      if (inGamut(linearRgb(l, mid, h))) lo = mid;
      else hi = mid;
    }
    chroma = lo;
  }
  const rgb = linearRgb(l, chroma, h).map((v) => Math.round(toGamma(Math.min(1, Math.max(0, v))) * 255));
  return `#${rgb.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

const declared = oklch(doc.course.accent_color);
const grey = declared.c < ACHROMATIC;
const hue = declared.h;
const focusHue = grey ? GREY_FOCUS_HUE : (hue + 180) % 360;

/** The custom properties of a theme: the accent family and the focus. */
function tokens(theme: Theme): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [name, lc] of Object.entries(FAMILY)) {
    const v = lc[theme];
    if (v) out[name] = colour(grey ? { l: v.l, c: 0 } : v, hue);
  }
  out['--focus'] = colour(FOCUS[theme], focusHue);
  return out;
}
export const light = tokens('light');
export const dark = tokens('dark');

/** The accent of each theme, the colour the logo is painted in. */
export const accent: Record<Theme, string> = { light: light['--accent'], dark: dark['--accent'] };

const block = (t: Record<string, string>) => Object.entries(t).map(([k, v]) => `${k}:${v};`).join('');
/**
 * The stylesheet of the course's tokens, in the three blocks of global.css: the light theme, the
 * system's dark theme unless the reader chose light, and the dark theme the reader chose.
 */
export const tokensCss = `:root{${block(light)}}`
  + `@media (prefers-color-scheme: dark){:root:not([data-theme='light']){${block(dark)}}}`
  + `:root[data-theme='dark']{${block(dark)}}`;

// ---- the logo
/** The course's `logo.svg` from its `<svg` element on (no XML declaration, no comment before it). */
const logoSvg = doc.course.logo.slice(doc.course.logo.indexOf('<svg'));

/** The logo, its root `<svg>` given these attributes in place of its own width and height. */
export function logo(attributes: Record<string, string>): string {
  return logoSvg.replace(/^<svg\b([^>]*)>/, (_m, attrs: string) => {
    const kept = attrs.replace(/\s(width|height)\s*=\s*("[^"]*"|'[^']*')/g, '');
    const added = Object.entries(attributes).map(([k, v]) => ` ${k}="${v}"`).join('');
    return `<svg${kept}${added}>`;
  });
}

/** The favicon: the logo in the accent of the light theme, of the dark one under `prefers-color-scheme: dark`. */
export const favicon = logo({ width: '32', height: '32' }).replace(
  /^<svg\b[^>]*>/,
  (open) => `${open}<style>svg{color:${accent.light}}@media (prefers-color-scheme: dark){svg{color:${accent.dark}}}</style>`,
);
