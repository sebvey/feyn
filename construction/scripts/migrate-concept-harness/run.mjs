// Run from the repository root: mise exec -- node construction/scripts/migrate-concept-harness/run.mjs .claude/workflows/migrate-concept.js
// Stand-in harness for the migrate-concept agent workflow (#170): runs the script with stand-in agents
// and a parallel() that, like the runtime's, turns a thunk that throws into null; no live run.
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

const here = mkdtempSync(join(tmpdir(), 'migrate-concept-harness-'))
const src = readFileSync(process.argv[2], 'utf8').replace(/^export const meta/m, 'const meta')
const wrapped = `export default async function (args, agent, parallel, phase, log) {\n${src}\n}\n`
const mod = join(here, 'wrapped.mjs')
writeFileSync(mod, wrapped)
const run = (await import(mod)).default

const DEST = '/Users/me/wt/courses/parcours-po'
const FROM = '/Users/me/pdx/parcours-po'
const SITE = '/Users/me/pdx/parcours-po-website'
const DIR = 'concepts/09-decoupage-vertical'
const TGT = `${DEST}/${DIR}`
const TGT0 = TGT
const CHECKS = 'course-yaml,concept-folder,conventions,svg-contract,sources,glossary-order,typography'.split(',')

const ABSENT_GNU = `ls: cannot access '${TGT}': No such file or directory\nls: cannot access '${TGT}': No such file or directory`
const ABSENT_MAC = `ls: ${TGT}: No such file or directory\nls: ${TGT}: No such file or directory`
const LD = `drwxr-xr-x 2 sve staff 64 Oct 28 14:21 ${TGT}\n`
const EMPTY = LD + 'total 0\ndrwxr-xr-x 2 sve staff 64 Oct 28 14:21 .\ndrwxr-xr-x 5 sve staff 160 Oct 28 14:21 ..'
const OTHER = `drwxr-xr-x 2 sve staff 64 Oct 28 14:21 ${DEST}/concepts\n` + 'total 0\ndrwxr-xr-x 2 sve staff 64 Oct 28 14:21 .\ndrwxr-xr-x 5 sve staff 160 Oct 28 14:21 ..'
const FULL = LD + `total 8\ndrwxr-xr-x  4 sve staff 128 Oct 28 14:21 .\ndrwxr-xr-x  5 sve staff 160 Oct 28 14:21 ..\n-rw-r--r--@ 1 sve staff 12998 Oct 28 14:21 concept.md\ndrwxr-xr-x  2 sve staff 64 Oct 28 14:21 old dir`

const goodMapping = [
  { token: '--sch-s1', class: 'primary', opacity: 0.85, draws: 'slice 1 (Gateau), slice a (PartRecoupee)' },
  { token: '--sch-s2', class: 'primary', opacity: 0.6, draws: 'slice 2, slice c' },
  { token: '--sch-text', class: 'primary', opacity: 1, draws: 'all text' },
  { token: '--sch-grey', class: 'muted', opacity: 0.35, draws: 'hatch background' },
  { token: '--sch-s-ink', class: 'none', opacity: 0, draws: 'cut lines' },
]

function makeAgent(o) {
  const calls = []
  const TGT = o.agentRoot ? `${o.agentRoot}courses/parcours-po/${DIR}` : TGT0
  const agent = async (prompt, opts) => {
    calls.push({ label: opts.label, prompt })
    const L = opts.label
    if (L === 'scope') return {
      spec: 'linear-course', dir: DIR, course_entry: 'number: 9 ...',
      concept_file: `${FROM}/course/concepts/09-decoupage-vertical.md`, sources_file: `${FROM}/course/sources/09-decoupage-vertical.md`,
      mdx_file: `${SITE}/src/content/concepts/fr/09-decoupage-vertical.mdx`,
      diagrams: o.diagrams ?? [
        { component: `${SITE}/src/components/schemas/Gateau.astro`, variant: '', stem: 'gateau', legende: 'Le gâteau', place: 'essentials' },
        { component: `${SITE}/src/components/schemas/PartRecoupee.astro`, variant: '', stem: 'part-recoupee', legende: 'La part', place: '9b1' },
      ],
      unlisted_h4: [], target_listing: o.listing ?? ABSENT_GNU, missing: [],
    }
    if (L === 'empty-target') return o.emptied ?? { empty: true, listing: '' }
    if (L === 'colours') return { mapping: o.mapping ?? goodMapping, unused: ['--sch-text-soft'] }
    if (L.startsWith('diagram:')) {
      const stem = L.slice(8)
      return { file: `${stem}.svg`, title: 't', caption: 'c', subconcept: '9a', groups: [`9a-${stem}`],
        tokens: o.tokens?.[stem] ?? (stem === 'gateau' ? ['--sch-s1', '--sch-s2', '--sch-text', '--sch-grey', '--sch-s-ink'] : ['--sch-s1', '--sch-s2', '--sch-text']),
        element_opacities: o.elementOpacities?.[stem] ?? (stem === 'gateau' ? [{ element: '.hatch-line, group 9a-hatch', opacity: 0.55 }] : []),
        losses: [`halo dropped in ${TGT}/${stem}.svg`] }
    }
    if (L === 'teaching+sources') return { files: [`${TGT}/teaching.md`, `${TGT}/sources.md`], choices: [`M10: \`course/plan.md\` became \`plan.md\` in ${TGT}/sources.md intro`] }
    if (L === 'concept') return { files: [`${TGT}/concept.md`], choices: ['M4: merged', 'M3: read /Users/someone/elsewhere/notes.md'] }
    if (L === 'checks') return { output: CHECKS.map(c => `${c}: ok`).join('\n'), fixes: [`${TGT}/concept.md: heading`], left: [] }
    if (L === 'old-to-new') return { rows: [{ source: 'SF', item: 'intro', where: `${TGT}/sources.md intro`, verdict: 'moved', rule: 'M10', detail: 'course/plan.md: plan.md' }] }
    if (L === 'new-to-old') return { rows: [] }
    if (L === 'report') {
      const body = prompt.split('-----BEGIN REPORT-----\n')[1].split('\n-----END REPORT-----')[0]
      o.report = body
      return { written: true, bytes: Buffer.byteLength(body, 'utf8') }
    }
    throw new Error(`unexpected agent ${L}`)
  }
  return { agent, calls }
}
// as the runtime: a thunk that throws gives null, parallel() never rejects (review of PR #173)
const parallel = async thunks => Promise.all(thunks.map(t => Promise.resolve().then(t).catch(() => null)))

async function scenario(name, o, expect) {
  const { agent, calls } = makeAgent(o)
  let result, error
  try { result = await run({ course: 'parcours-po', concept: '9', dest: DEST, from: FROM, site: SITE, ...(o.args || {}) }, agent, parallel, () => {}, () => {}) }
  catch (e) { error = e.message }
  const problems = expect({ result, error, calls, report: o.report })
  console.log(`${problems.length ? 'FAIL' : 'ok  '} ${name}${problems.length ? `: ${problems.join('; ')}${error ? ` [error: ${error}]` : ''}` : ''}`)
  if (o.dump && o.report) writeFileSync(join(here, `${o.dump}.md`), o.report)
  return problems.length ? 1 : 0
}

const noAbs = r => (r && /(^|[\s`'"(])\/(abs|Users|private|tmp)\//.test(r) ? ['report holds an absolute path'] : [])
let fails = 0
fails += await scenario('two diagrams, target absent (GNU ls): one mapping, relative paths', { dump: 'report-two-diagrams' }, ({ error, report, calls }) => [
  ...(error ? [`threw: ${error}`] : []), ...noAbs(report),
  ...(calls.filter(c => c.label === 'colours').length === 1 ? [] : ['colours not called once']),
  ...(calls.filter(c => c.label.startsWith('diagram:')).every(c => c.prompt.includes('--sch-s2: class primary, opacity 0.6')) ? [] : ['a writer lacks the mapping']),
  ...(report && (report.match(/## Colour mapping/g) || []).length === 1 ? [] : ['mapping not shown once']),
  ...(report && report.includes('| `--sch-s1` | primary | 0.85 |') && report.includes('gateau.svg, part-recoupee.svg') ? [] : ['mapping table wrong']),
  ...(report && report.includes('| no | no |') ? [] : ['target existed not "no"']),
  ...(report && report.includes('no such folder') && report.includes("ls: cannot access 'concepts/09") ? [] : ['listing section wrong']),
  ...(report && report.includes('concept folder `concepts/09-decoupage-vertical/`') && report.includes('`parcours-po/course/concepts/09') ? [] : ['header paths wrong']),
  ...(report && report.includes('check-course courses/parcours-po --only') ? [] : ['check command wrong']),
  ...(calls.some(c => c.label === 'empty-target') ? ['emptied an absent folder'] : []),
  ...(calls.filter(c => c.label.startsWith('diagram:')).every(c => c.prompt.includes("keep it as that element's") && c.prompt.includes('element_opacities')) ? [] : ['a writer lacks the element-opacity rule']),
  ...(report && report.includes('- gateau.svg: element opacity 0.55 kept on .hatch-line, group 9a-hatch (M11)') ? [] : ['kept element opacity not in the writing choices']),
])
fails += await scenario('element opacity out of range: stops', { elementOpacities: { gateau: [{ element: '.bar', opacity: 75 }] } }, ({ error }) => (error && /element opacity 75 on \.bar/.test(error) ? [] : ['not stopped']))
fails += await scenario('target absent (macOS ls)', { listing: ABSENT_MAC }, ({ error, report }) => [...(error ? [`threw: ${error}`] : []), ...noAbs(report)])
fails += await scenario('target an empty folder: no refusal, no emptying', { listing: EMPTY }, ({ error, report, calls }) => [
  ...(error ? [`threw: ${error}`] : []), ...(calls.some(c => c.label === 'empty-target') ? ['emptied'] : []),
  ...(report && report.includes('an empty folder') ? [] : ['listing verdict wrong'])])
fails += await scenario('target holds files, no overwrite: refused', { listing: FULL }, ({ error }) => (error && /holds files/.test(error) && /concept\.md/.test(error) ? [] : ['not refused']))
fails += await scenario('target holds files, overwrite: emptied', { listing: FULL, args: { overwrite: true } }, ({ error, report, calls }) => [
  ...(error ? [`threw: ${error}`] : []), ...(calls.some(c => c.label === 'empty-target') ? [] : ['not emptied']),
  ...(report && report.includes('| yes, emptied |') && report.includes('2 entries, emptied') ? [] : ['report wrong'])])
fails += await scenario('emptying agent says empty but lists a file: stops', { listing: FULL, args: { overwrite: true }, emptied: { empty: true, listing: 'concept.md' } }, ({ error }) => (error && /could not be emptied/.test(error) ? [] : ['not stopped']))
fails += await scenario('listing unreadable: stops', { listing: 'the folder holds files' }, ({ error }) => (error && /reads as neither/.test(error) ? [] : ['not stopped']))
fails += await scenario('listing of another existing folder: stops', { listing: OTHER }, ({ error }) => (error && /reads as neither/.test(error) ? [] : ['not stopped']))
fails += await scenario('error naming another path: stops', { listing: `ls: cannot access '${DEST}/concepts': No such file or directory` }, ({ error }) => (error && /reads as neither/.test(error) ? [] : ['not stopped']))
fails += await scenario('mapping gives one pair twice: stops', { mapping: [...goodMapping, { token: '--sch-s3', class: 'primary', opacity: 0.6, draws: 'x' }] }, ({ error }) => (error && /share the pair primary 0.6/.test(error) ? [] : ['not stopped']))
fails += await scenario('mapping maps a token twice: stops', { mapping: [...goodMapping, { ...goodMapping[0] , opacity: 0.5 }] }, ({ error }) => (error && /mapped twice/.test(error) ? [] : ['not stopped']))
fails += await scenario('class none with an opacity: stops', { mapping: [...goodMapping.slice(0, 4), { token: '--sch-s-ink', class: 'none', opacity: 0.6, draws: 'x' }] }, ({ error }) => (error && /class none/.test(error) ? [] : ['not stopped']))
fails += await scenario('a writer draws with an unmapped token: stops', { tokens: { 'part-recoupee': ['--sch-s1', '--sch-band'] } }, ({ error }) => (error && /--sch-band.*lacks/.test(error) ? [] : ['not stopped']))
fails += await scenario('no diagram: no colour agent', { diagrams: [] }, ({ error, report, calls }) => [
  ...(error ? [`threw: ${error}`] : []), ...(calls.some(c => c.label === 'colours') ? ['colours called'] : []),
  ...(report && report.includes('## Colour mapping (M11)\n\nNo diagram.') ? [] : ['no-diagram line missing'])])
fails += await scenario('relative dest, agents give absolute paths: none left, none mangled', { args: { dest: 'courses/parcours-po' }, listing: `ls: cannot access 'courses/parcours-po/${DIR}': No such file or directory`, agentRoot: '/private/tmp/feyn/' }, ({ error, report }) => [
  ...(error ? [`threw: ${error}`] : []), ...noAbs(report),
  ...(report && report.includes('| concepts/09-decoupage-vertical/sources.md intro |') ? [] : ['course-folder path wrong']),
  ...(report && !report.includes('feyn/concepts') && report.includes('<absolute path>') ? [] : ['mangled, or the outside path not replaced'])])
console.log(fails ? `${fails} scenario(s) failed` : 'all scenarios pass')
process.exit(fails ? 1 : 0)
