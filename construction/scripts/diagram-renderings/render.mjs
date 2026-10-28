// Renders the diagrams of one migrated concept as PNGs, for the report of migrate-concept (#181): the old
// diagrams from the frozen site's build (each <figure> holding a diagram, with the page's stylesheets, in
// the light theme), the new SVGs as they are (currentColor: one colour). macOS only: qlmanage draws them.
//   mise exec -- node construction/scripts/diagram-renderings/render.mjs --out <dir> [--page <site>dist/concepts/NN/index.html] [--svg <file.svg>]...
// Writes <dir>/old-<n>.png (n: the figure's order on the page) and <dir>/<stem>.png. Prints one JSON line:
// { page: "found" | "absent" | "none", old: [{ n, caption, png }], new: [{ svg, png }], errors: [] }, the PNGs
// named relative to <dir>. A failure to render is listed in errors, never fatal: the report says it.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, renameSync, rmSync } from 'node:fs'
import { join, dirname, basename, resolve } from 'node:path'
import { tmpdir } from 'node:os'
import { spawnSync } from 'node:child_process'

const argv = process.argv.slice(2)
const opt = { svg: [] }
for (let k = 0; k < argv.length; k += 2) {
  const [key, val] = [argv[k], argv[k + 1]]
  if (!val || !['--out', '--page', '--svg'].includes(key)) { console.error(`usage: render.mjs --out <dir> [--page <index.html>] [--svg <file.svg>]...; got ${key}`); process.exit(2) }
  if (key === '--svg') opt.svg.push(val); else opt[key.slice(2)] = val
}
if (!opt.out) { console.error('--out missing'); process.exit(2) }
mkdirSync(opt.out, { recursive: true })
const tmp = mkdtempSync(join(tmpdir(), 'diagram-renderings-'))
const result = { page: opt.page ? 'absent' : 'none', old: [], new: [], errors: [] }

// qlmanage writes <file>.png into the folder given; the PNG is moved to its name in --out
function thumbnail(file, png) {
  const r = spawnSync('qlmanage', ['-t', '-s', '1200', '-o', tmp, file], { encoding: 'utf8' })
  const made = join(tmp, `${basename(file)}.png`)
  if (r.error || !existsSync(made)) { result.errors.push(`${basename(file)}: qlmanage ${r.error ? r.error.message : `made no PNG (${String(r.stderr || r.stdout).trim().split('\n').pop()})`}`); return null }
  renameSync(made, join(opt.out, png))
  return png
}
const text = s => s.replace(/<[^>]+>/g, '').replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d)).replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()

if (opt.page && existsSync(opt.page)) {
  result.page = 'found'
  const html = readFileSync(opt.page, 'utf8')
  // a stylesheet linked from the site root (/_astro/…): looked for in the page's folder and its parents
  const sheet = href => { for (let d = dirname(resolve(opt.page)); d !== dirname(d); d = dirname(d)) { const f = join(d, href); if (existsSync(f)) return readFileSync(f, 'utf8') } result.errors.push(`stylesheet ${href} not found`); return '' }
  const css = [...html.matchAll(/<link[^>]*rel="stylesheet"[^>]*href="(\/[^"]+)"[^>]*>/g)].map(m => sheet(m[1])).join('\n')
    + [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m => m[1]).join('\n')
  const figures = [...html.matchAll(/<figure\b[\s\S]*?<\/figure>/g)].map(m => m[0]).filter(f => /<svg\b[^>]*role="img"/.test(f))
  figures.forEach((fig, k) => {
    const file = join(tmp, `old-${k + 1}.html`)
    writeFileSync(file, `<!doctype html><html lang="fr" data-theme="light"><head><meta charset="utf-8"><style>${css}\nbody{margin:0;background:#fff}figure{margin:0;padding:16px;width:640px}</style></head><body>${fig}</body></html>`)
    const caption = text((/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/.exec(fig) || [, ''])[1])
    result.old.push({ n: k + 1, caption, png: thumbnail(file, `old-${k + 1}.png`) })
  })
}
for (const svg of opt.svg) {
  if (!existsSync(svg)) { result.errors.push(`${basename(svg)}: no such file`); continue }
  result.new.push({ svg: basename(svg), png: thumbnail(svg, `${basename(svg, '.svg')}.png`) })
}
rmSync(tmp, { recursive: true, force: true })
console.log(JSON.stringify(result))
