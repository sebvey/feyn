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
const ROOT = '/Users/me/wt'
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
      unlisted_h4: [], target_listing: o.listing ?? ABSENT_GNU, missing: o.missing ?? [],
      cwd: o.cwd ?? (o.agentRoot ? o.agentRoot.replace(/\/$/, '') : ROOT),
      // ls -ld of the root's specs folder the prompt names ("$(pwd)/specs" when dest is relative)
      root_listing: o.rootListing ?? (() => { const m = /run the one command "ls -ld (.*?)specs"* and return/.exec(prompt); const r = !m ? '?' : m[1].startsWith('"$(pwd)/') ? `${o.cwd ?? (o.agentRoot ? o.agentRoot.replace(/\/$/, '') : ROOT)}/` : m[1]; return `drwxr-xr-x 9 sve staff 288 Oct 28 14:21 ${r}specs` })(),
    }
    if (L === 'empty-target') return o.emptied ?? { empty: true, listing: '' }
    if (L === 'colours') return { mapping: o.mapping ?? goodMapping, unused: ['--sch-text-soft'] }
    if (L.startsWith('diagram:')) {
      const stem = L.slice(8)
      return { file: `${stem}.svg`, title: 't', caption: 'c', subconcept: '9a', groups: [`9a-${stem}`],
        tokens: o.tokens?.[stem] ?? (stem === 'gateau' ? ['--sch-s1', '--sch-s2', '--sch-text', '--sch-grey', '--sch-s-ink'] : ['--sch-s1', '--sch-s2', '--sch-text']),
        element_opacities: o.elementOpacities?.[stem] ?? (stem === 'gateau' ? [{ element: '.hatch-line, now the dashed outline of group 9a-couche-entiere', opacity: 0.55 }] : []),
        losses: [`halo dropped in ${TGT}/${stem}.svg`] }
    }
    if (L === 'teaching+sources') return { files: [`${TGT}/teaching.md`, `${TGT}/sources.md`], choices: [`M10: \`course/plan.md\` became \`plan.md\` in ${TGT}/sources.md intro`] }
    if (L === 'concept') return { files: [`${TGT}/concept.md`], choices: ['M4: merged', 'M3: read /Users/someone/elsewhere/notes.md', 'M3: odd contexts path:/Users/me/x, *\/Users/me/x*, {/Users/a}', `M3: course folder path:${TGT.slice(0, -DIR.length - 1)}, the target *${TGT}*`] }
    if (L === 'checks') return { output: CHECKS.map(c => `${c}: ok`).join('\n'), fixes: [`${TGT}/concept.md: heading`], left: [] }
    if (L === 'old-to-new') return { rows: [{ source: 'SF', item: 'intro', where: `${TGT}/sources.md intro`, verdict: 'moved', rule: 'M10', detail: 'course/plan.md: plan.md' }] }
    if (L === 'new-to-old') return { rows: o.invented ?? [] }
    if (L === 'verify') return { verdicts: (JSON.parse(prompt.split('Invented: ')[1] || '[]')).map(r => ({ id: r.id, confirmed: true, reason: 'searched CF « Sous-concepts »: absent' })) }
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

const noAbs = r => (r && /(^|[^\w./~-])\/(Users|private|tmp|workspace)\b/.test(r) ? ['report holds an absolute path'] : [])
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
  ...(report && report.includes('- gateau.svg: element opacity 0.55 kept on .hatch-line, now the dashed outline of group 9a-couche-entiere (M11)') ? [] : ['kept element opacity not in the writing choices']),
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
  ...(report && report.includes('course folder path:courses/parcours-po, the target *concepts/09-decoupage-vertical*') ? [] : ['dest in odd contexts not rewritten']),
  ...(report && !report.includes('feyn/concepts') && report.includes('<absolute path>') ? [] : ['mangled, or the outside path not replaced'])])
fails += await scenario('absolute dest under /Users, paths in odd contexts: none left', {}, ({ error, report }) => [
  ...(error ? [`threw: ${error}`] : []), ...noAbs(report),
  ...(report && report.includes('path:<absolute path>, *<absolute path>*, {<absolute path>}') ? [] : ['odd-context paths not replaced']),
  ...(report && report.includes('course folder path:courses/parcours-po, the target *concepts/09-decoupage-vertical*') ? [] : ['dest not rewritten as literal text'])])
fails += await scenario('dest under /workspace: none left', { args: { dest: '/workspace/feyn/courses/parcours-po' }, listing: `ls: cannot access '/workspace/feyn/courses/parcours-po/${DIR}': No such file or directory`, agentRoot: '/workspace/feyn/' }, ({ error, report }) => [
  ...(error ? [`threw: ${error}`] : []), ...noAbs(report),
  ...(report && report.includes('| concepts/09-decoupage-vertical/sources.md intro |') && report.includes('check-course courses/parcours-po --only') ? [] : ['paths under /workspace not rewritten'])])
// #178: a label ink on a fill, the ruling-B line, an absent target named under missing, absolute spec paths
const labelMapping = [...goodMapping.slice(0, 4), { token: '--sch-s-ink', class: 'plain', opacity: 1, draws: 'the label on the flag' }]
const writers = calls => calls.filter(c => ['colours', 'teaching+sources', 'concept'].includes(c.label) || c.label.startsWith('diagram:'))
fails += await scenario('label ink on a fill: plain pair, window form in every writer', { mapping: labelMapping }, ({ error, report, calls }) => [
  ...(error ? [`threw: ${error}`] : []),
  ...(calls.find(c => c.label === 'colours')?.prompt.includes('class plain (opacity 1), the label drawn in a window of the fill, never class none') ? [] : ['colour agent not told']),
  ...(calls.filter(c => c.label.startsWith('diagram:')).every(c => c.prompt.includes('--sch-s-ink: plain: a label in a window of its fill') && c.prompt.includes('fill-rule="evenodd"') && c.prompt.includes('Never a filter, a mask')) ? [] : ['a writer lacks the window form']),
  ...(writers(calls).every(c => c.prompt.includes('A contrast ink drawn on a fill as a label') || c.label === 'colours') ? [] : ['M11 lacks the label clause']),
  ...(calls.find(c => c.label === 'checks')?.prompt.includes('the window form of M11, never an outline in place of a fill') ? [] : ['checks agent not told']),
  ...(report && report.includes('| `--sch-s-ink` | plain (no class, a label in a window) | 1 |') ? [] : ['mapping table wrong'])])
fails += await scenario('label ink with an opacity other than 1: stops', { mapping: [...goodMapping.slice(0, 4), { token: '--sch-s-ink', class: 'plain', opacity: 0.8, draws: 'x' }] }, ({ error }) => (error && /class plain .* opacity 0.8, expected 1/.test(error) ? [] : ['not stopped']))
const TEACH = `${TGT}/teaching.md`
const LINE_B = 'Cas de la banque : pour 9a1, « Le compteur de relevés ingérés », « Les tâches de Dana » et « Trois « afin de » à juger » ; pour 9b2, « « Quel patron ? » ».'
fails += await scenario('ruling-B line: counted by design, not invented', { invented: [{ file: TEACH, section: 'Consignes', text: `« ${LINE_B} »`, detail: 'no old text' }] }, ({ error, report, calls }) => [
  ...(error ? [`threw: ${error}`] : []),
  ...(calls.some(c => c.label === 'verify') ? ['sent to verification'] : []),
  ...(report && report.includes(`| teaching.md « Consignes », citation line | by design | M9 | ruling B on #23: ${LINE_B} |`) ? [] : ['no by-design row']),
  ...(report && /\| 1 \| 1 \| 0 \| 0 \| 0 \| pass \|/.test(report) && report.includes('## Invented\n\nNone.') ? [] : ['counts wrong']),
  ...(calls.find(c => c.label === 'teaching+sources')?.prompt.includes('Cas de la banque : pour <id>, « <title> », « <title> » et « <title> » ; pour') ? [] : ['writer lacks the form'])])
fails += await scenario('ruling-B line in another form, a second line, « Poser »: invented', { invented: [
  { file: TEACH, section: 'Consignes', text: 'Cas de la banque : pour 9a1, « Le compteur », puis « Les tâches de Dana ».', detail: 'x' },
  { file: TEACH, section: 'Consignes', text: 'Poser « Le compteur », puis « Les tâches de Dana ».', detail: 'x' },
  { file: TEACH, section: 'Consignes', text: 'Cas de la banque : pour 9a1, « Le compteur ».', detail: 'x' },
  { file: TEACH, section: 'Consignes', text: 'Cas de la banque : pour 9a2, « Les tâches de Dana ».', detail: 'x' },
  { file: TEACH, section: 'Consignes', text: 'Cas de la banque : pour 9a2, « A » et « B » et « C ».', detail: 'x' }] }, ({ error, report }) => [
  ...(error && /4 invented/.test(error) ? [] : ['not failed on 4 invented']),
  ...(report && report.includes(', puis « Les tâches de Dana »') && report.includes('Poser « Le compteur »') && report.includes('« A » et « B » et « C »') && report.includes('| I4 | ') && report.includes('ruling B on #23: Cas de la banque : pour 9a1, « Le compteur ».') ? [] : ['wrong rows'])])
for (const [name, item] of [['absolute', `target folder ${TGT} does not exist`], ['course-relative', `target courses/parcours-po/${DIR}: No such file or directory.`], ['bare dir', `the target folder ${DIR} does not exist yet`]])
  fails += await scenario(`absent target named under missing (${name}): ignored`, { missing: [item] }, ({ error }) => (error ? [`threw: ${error}`] : []))
fails += await scenario('a missing old file under concepts/: stops', { missing: [`target folder ${TGT} does not exist`, `${FROM}/course/concepts/09-decoupage-vertical.md`] }, ({ error }) => (error && /Inputs missing: \/Users\/me\/pdx\/parcours-po\/course\/concepts\/09-decoupage-vertical\.md$/.test(error) ? [] : ['not stopped on the old file alone']))
fails += await scenario('one item naming the target and a missing input: stops', { missing: [`target folder ${TGT} does not exist; ${FROM}/course/sources/09-decoupage-vertical.md not found`] }, ({ error }) => (error && /Inputs missing: target folder .*sources\/09-decoupage-vertical\.md not found$/.test(error) ? [] : ['not stopped']))
fails += await scenario('spec paths absolute in the writers\' inputs', {}, ({ error, calls }) => [
  ...(error ? [`threw: ${error}`] : []),
  ...(writers(calls).length === 5 ? [] : ['writers not all called']),
  ...writers(calls).flatMap(c => [`${ROOT}/specs/linear-course/SPEC.md`, `${ROOT}/specs/linear-course/templates/`, `${ROOT}/docs/glossary.md`, `${ROOT}/construction/notes/S1-08.md`]
    .filter(p => !c.prompt.includes(p)).map(p => `${c.label} lacks ${p}`)),
  ...writers(calls).filter(c => /(^|[^\w/])(specs\/linear-course\/|docs\/glossary\.md|construction\/notes\/S1-08\.md)/.test(c.prompt)).map(c => `${c.label} has a relative spec path`)])
fails += await scenario('working directory not absolute: stops', { cwd: 'feyn' }, ({ error }) => (error && /not an absolute path/.test(error) ? [] : ['not stopped']))
fails += await scenario('working directory /: stops', { cwd: '/' }, ({ error }) => (error && /not an absolute path other than \//.test(error) ? [] : ['not stopped']))
// wave 2: the work session stayed in the main checkout, dest was the worktree's course folder
fails += await scenario('pwd not dest\'s root: the root is dest\'s, checks included', { cwd: '/Users/me/main' }, ({ error, report, calls }) => [
  ...(error ? [`threw: ${error}`] : []), ...noAbs(report),
  ...writers(calls).filter(c => !c.prompt.includes(`${ROOT}/specs/linear-course/SPEC.md`) || c.prompt.includes('/Users/me/main')).map(c => `${c.label} not on dest's root`),
  ...(calls.find(c => c.label === 'checks')?.prompt.includes(`mise exec -- ${ROOT}/specs/linear-course/checks/check-course ${DEST} --only`) ? [] : ['check command not on dest\'s root']),
  ...(calls.find(c => c.label === 'scope')?.prompt.includes(`ls -ld ${ROOT}/specs"`) ? [] : ['scope not asked to list dest\'s root'])])
fails += await scenario('relative dest: the root is pwd', { args: { dest: 'courses/parcours-po' }, listing: `ls: cannot access 'courses/parcours-po/${DIR}': No such file or directory`, cwd: '/Users/me/main' }, ({ error, calls }) => [
  ...(error ? [`threw: ${error}`] : []),
  ...(calls.find(c => c.label === 'checks')?.prompt.includes('mise exec -- /Users/me/main/specs/linear-course/checks/check-course courses/parcours-po --only') ? [] : ['check command not on pwd']),
  ...(writers(calls).every(c => c.prompt.includes('/Users/me/main/docs/glossary.md')) ? [] : ['writers not on pwd'])])
fails += await scenario('root without specs/: stops', { rootListing: `ls: ${ROOT}/specs: No such file or directory` }, ({ error }) => (error && /shows no specs\/ folder/.test(error) ? [] : ['not stopped']))
console.log(fails ? `${fails} scenario(s) failed` : 'all scenarios pass')
process.exit(fails ? 1 : 0)
