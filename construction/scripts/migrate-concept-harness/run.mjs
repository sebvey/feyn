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

// the two old diagrams of concept 9, their legendes, and the inventories the stand-in agents return
const LEG_GATEAU = "Le gâteau en couches. En bas, l'ingestion ; en haut, la restitution. Une couche prise en entier ne sert pas seule ; chaque part verticale sert seule."
const LEG_PART = 'Une part trop grosse, recoupée.'
const el = (id, what, labels, role, state = '', state_words = '') => ({ id, what, labels, role, state, state_words })
// the maintainer's answer of 2026-10-28 on PR #182: the naming sentence to the title, the reading one to
// the labels, the caption only the sentence that carries the idea
const LEG_GATEAU_IDEA = 'Une couche prise en entier ne sert pas seule ; chaque part verticale sert seule.'
const INV_GATEAU = {
  caption_sentences: [
    { sentence: 'Le gâteau en couches.', idea: 'gateau', to: 'title' },
    { sentence: 'En bas, l’ingestion ; en haut, la restitution.', idea: 'gateau', to: 'labels' },
    { sentence: LEG_GATEAU_IDEA, idea: 'gateau', to: 'caption' }],
  ideas: [{ stem: 'gateau', title: 'Le gâteau en couches : une tranche horizontale contre trois tranches verticales', subconcept: '9a',
    justification: 'Une couche prise en entier ne sert pas seule ; chaque part verticale sert seule.', stands_in: 'the legende',
    elements: [el('E1', 'les couches, de l’ingestion à la restitution', ['Ingestion', 'Restitution'], 'context'),
      el('E2', 'une part verticale, au premier niveau', ['tranche 1'], 'series'), el('E3', 'une part verticale, au deuxième niveau', ['tranche 2'], 'series'),
      el('E4', 'la couche prise en entier', ['couche entière'], 'contrast', 'refused', 'ne sert pas seule')],
    relations: ['E2 et E3 traversent E1, de l’ingestion à la restitution'], key: [{ sample: 'E4', words: 'tranche horizontale : ne sert pas seule' }] }],
}
const INV_PART = {
  caption_sentences: [{ sentence: LEG_PART, idea: 'part-recoupee', to: 'caption' }],
  ideas: [{ stem: 'part-recoupee', title: 'Une part trop grosse recoupée en parts verticales plus fines', subconcept: '9b1',
    justification: LEG_PART, stands_in: 'the legende', elements: [el('E1', 'la part trop grosse', ['trop gros pour un sprint'], 'subject')], relations: [], key: [] }],
}
// concept 9's Gateau split in two ideas
const INV_SPLIT = {
  caption_sentences: [
    { sentence: 'Le gâteau en couches.', idea: 'gateau-couches', to: 'caption' },
    { sentence: "En bas, l'ingestion ; en haut, la restitution.", idea: 'gateau-couches', to: 'caption' },
    { sentence: LEG_GATEAU_IDEA, idea: 'gateau-tranches', to: 'caption' }],
  ideas: [
    { ...INV_GATEAU.ideas[0], stem: 'gateau-couches', title: 'Les couches du gâteau', justification: "En bas, l'ingestion ; en haut, la restitution.", elements: [INV_GATEAU.ideas[0].elements[0]], relations: [], key: [] },
    { ...INV_GATEAU.ideas[0], stem: 'gateau-tranches', title: 'Une tranche horizontale contre des tranches verticales', subconcept: '9a1' }],
}

function makeAgent(o) {
  const calls = []
  const TGT = o.agentRoot ? `${o.agentRoot}courses/parcours-po/${DIR}` : TGT0
  const agent = async (prompt, opts) => {
    calls.push({ label: opts.label, prompt, opts })
    const L = opts.label
    if (L === 'scope') return {
      spec: 'linear-course', dir: o.dir ?? DIR, course_entry: 'number: 9 ...',
      concept_file: `${FROM}/course/concepts/09-decoupage-vertical.md`, sources_file: `${FROM}/course/sources/09-decoupage-vertical.md`,
      mdx_file: `${SITE}/src/content/concepts/fr/09-decoupage-vertical.mdx`,
      diagrams: o.diagrams ?? [
        { component: `${SITE}/src/components/schemas/Gateau.astro`, variant: '', legende: LEG_GATEAU, place: 'essentials' },
        { component: `${SITE}/src/components/schemas/PartRecoupee.astro`, variant: '', legende: LEG_PART, place: '9b1' },
      ],
      unlisted_h4: [], target_listing: o.listing ?? ABSENT_GNU, missing: o.missing ?? [],
      cwd: o.cwd ?? (o.agentRoot ? o.agentRoot.replace(/\/$/, '') : ROOT),
      // ls -ld of the root's specs folder the prompt names ("$(pwd)/specs" when dest is relative)
      root_listing: o.rootListing ?? (() => { const m = /run the one command "ls -ld (.*?)specs"* and return/.exec(prompt); const r = !m ? '?' : m[1].startsWith('"$(pwd)/') ? `${o.cwd ?? (o.agentRoot ? o.agentRoot.replace(/\/$/, '') : ROOT)}/` : m[1]; return `drwxr-xr-x 9 sve staff 288 Oct 28 14:21 ${r}specs` })(),
    }
    if (L === 'empty-target') return o.emptied ?? { empty: true, listing: '' }
    if (L.startsWith('inventory:') || L.startsWith('inventory-again:')) {
      const n = Number(L.split(':')[1]) - 1
      const again = L.startsWith('inventory-again:')
      const given = again ? o.inventoriesAgain?.[n] : o.inventories?.[n]
      return structuredClone(given ?? (o.inventories?.[n] && again ? o.inventories[n] : [INV_GATEAU, INV_PART][n]))
    }
    if (L.startsWith('draw:')) { const stem = L.slice(5); return { file: o.drawnFile?.[stem] ?? `${stem}.svg`, groups: [`9a-${stem}`], key: o.drawnKey?.[stem] ?? [] } }
    // the frontmatter diagrams of concept.md as written: by default, the entries the concept writer was given
    if (L === 'frontmatter') {
      if (o.frontmatterOut !== undefined) return { output: o.frontmatterOut }
      const m = /Their frontmatter entries, verbatim: (\[.*?\])\.\n/.exec(calls.find(c => c.label === 'concept')?.prompt ?? '')
      const fm = m ? JSON.parse(m[1]) : null
      return { output: `mise WARN a stale tool\n${JSON.stringify(o.frontmatter ? o.frontmatter(fm) : fm)}` }
    }
    if (L === 'renderings') {
      if (o.renderOut !== undefined) return { output: o.renderOut }
      const svgs = [...prompt.matchAll(/--svg (\S+)/g)].map(m => m[1].split('/').pop())
      return { output: `mise WARN a stale tool\n${JSON.stringify({ page: 'found', old: [{ n: 1, caption: LEG_GATEAU.replaceAll("'", '’'), png: 'old-1.png' }, { n: 2, caption: LEG_PART, png: 'old-2.png' }], new: svgs.map(s => ({ svg: s, png: s.replace(/\.svg$/, '.png') })), errors: [] })}` }
    }
    if (L === 'teaching+sources') return { files: [`${TGT}/teaching.md`, `${TGT}/sources.md`], choices: [`M10: \`course/plan.md\` became \`plan.md\` in ${TGT}/sources.md intro`] }
    if (L === 'concept') return { files: [`${TGT}/concept.md`], choices: ['M4: merged', 'M3: read /Users/someone/elsewhere/notes.md', 'M3: odd contexts path:/Users/me/x, *\/Users/me/x*, {/Users/a}', `M3: course folder path:${TGT.slice(0, -DIR.length - 1)}, the target *${TGT}*`] }
    if (L === 'checks') return { output: o.checksOut ?? CHECKS.map(c => `${c}: ok`).join('\n'), fixes: [`${TGT}/concept.md: heading`], left: [] }
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
  const logs = []
  try { result = await run({ course: 'parcours-po', concept: '9', dest: DEST, from: FROM, site: SITE, ...(o.args || {}) }, agent, parallel, () => {}, m => logs.push(m)) }
  catch (e) { error = e.message }
  const problems = expect({ result, error, calls, report: o.report, logs })
  console.log(`${problems.length ? 'FAIL' : 'ok  '} ${name}${problems.length ? `: ${problems.join('; ')}${error ? ` [error: ${error}]` : ''}` : ''}`)
  if (o.dump && o.report) writeFileSync(join(here, `${o.dump}.md`), o.report)
  return problems.length ? 1 : 0
}

const noAbs = r => (r && /(^|[^\w./~-])\/(Users|private|tmp|workspace)\b/.test(r) ? ['report holds an absolute path'] : [])
const drawers = calls => calls.filter(c => c.label.startsWith('draw:'))
const threw = error => (error ? [`threw: ${error}`] : [])
let fails = 0

// #181: no token table is left in the workflow
{
  const left = src.split('\n').map((l, i) => [i + 1, l]).filter(([, l]) => l.includes('sch-'))
  console.log(`${left.length ? 'FAIL' : 'ok  '} no old colour token in the workflow${left.length ? `: line ${left.map(([i]) => i).join(', ')}` : ''}`)
  if (left.length) fails++
}
fails += await scenario('two diagrams, target absent (GNU ls): inventory, blind drawing, renderings, relative paths', { dump: 'report-two-diagrams' }, ({ error, report, calls }) => [
  ...threw(error), ...noAbs(report),
  ...(calls.some(c => /colour/.test(c.label)) ? ['a colour agent was called'] : []),
  ...(calls.filter(c => c.label.startsWith('inventory:')).length === 2 ? [] : ['not one inventory per old diagram']),
  ...(drawers(calls).map(c => c.label).join() === 'draw:gateau,draw:part-recoupee' ? [] : ['not one drawing per idea']),
  ...(report && (report.match(/## Diagrams \(M11\)/g) || []).length === 1 && !/## Colour table/.test(report) ? [] : ['diagrams section not shown once']),
  ...(report && report.includes('| ![old diagram 1](S1-10-09-report/old-1.png) | ![gateau.svg](S1-10-09-report/gateau.png) |') && report.includes('| ![old diagram 2](S1-10-09-report/old-2.png) | ![part-recoupee.svg](S1-10-09-report/part-recoupee.png) |') && report.includes('Renderings: the old diagram from the frozen site\'s build;') ? [] : ['renderings not side by side']),
  ...(report && report.includes('| E4 | la couche prise en entier | « couche entière » | contrast | refused (« ne sert pas seule ») |') && report.includes('Key of the inventory: E4 « tranche horizontale : ne sert pas seule ». Key drawn: none.') ? [] : ['inventory not in the report']),
  ...(report && report.includes('- « Le gâteau en couches. »: title of gateau.svg\n- « En bas, l’ingestion ; en haut, la restitution. »: labels of gateau.svg\n- « Une couche') && !report.includes('Captions of more than one sentence') ? [] : ['legende sentences not shown with their place, or a caption flagged']),
  ...(report && report.includes('### `parcours-po-website/src/components/schemas/Gateau.astro`') ? [] : ['old component not named relative']),
  ...(report && report.includes('| `parcours-po-website/src/components/schemas/Gateau.astro` |') ? ['component path in a table'] : []),
  ...(report && report.includes('| checks | target existed | old diagrams | new diagrams | captions of more than one sentence |\n|---|---|---|---|---|\n| pass | no | 2 | 2 | 0 |') && report.includes('Result: **passed**.') ? [] : ['summary table wrong']),
  ...(report && report.includes('no such folder') && report.includes("ls: cannot access 'concepts/09") ? [] : ['listing section wrong']),
  ...(report && report.includes('concept folder `concepts/09-decoupage-vertical/`') && report.includes('`parcours-po/course/concepts/09') ? [] : ['header paths wrong']),
  ...(report && report.includes('check-course courses/parcours-po --only') ? [] : ['check command wrong']),
  ...(calls.some(c => c.label === 'empty-target') ? ['emptied an absent folder'] : []),
])
fails += await scenario('inventory: captions from the legende\'s sentences to the caption, set in code for concept.md', {}, ({ error, calls, result }) => {
  const inv = calls.find(c => c.label === 'inventory:1')?.prompt ?? ''
  const concept = calls.find(c => c.label === 'concept')?.prompt ?? ''
  return [...threw(error),
    ...([`${SITE}/src/components/schemas/Gateau.astro`, `${FROM}/course/concepts/09-decoupage-vertical.md`, `${SITE}/src/content/concepts/fr/09-decoupage-vertical.mdx`, `${ROOT}/specs/linear-course/SPEC.md section 7.2`, 'never how it is drawn', `« ${LEG_GATEAU} »`, 'in doubt, one idea'].filter(p => !inv.includes(p)).map(p => `inventory prompt lacks ${p}`)),
    ...(concept.includes(JSON.stringify({ file: 'gateau.svg', title: INV_GATEAU.ideas[0].title, caption: LEG_GATEAU_IDEA, subconcept: '9a' })) ? [] : ['concept.md not given the caption made of the legende\'s sentences to the caption']),
    ...(concept.includes(`whose legende is « ${LEG_PART} »: part-recoupee.svg`) ? [] : ['Figure-to-images line missing']),
    ...(result?.diagrams?.join() === 'gateau.svg,part-recoupee.svg' ? [] : ['summary lacks the diagrams'])]
})
const LEAKY = structuredClone(INV_GATEAU)
LEAKY.ideas[0].elements[1].what = 'une part verticale en var(--sch-s1), fill-opacity 0.7'
fails += await scenario('inventory naming the old drawing: asked once more, then drawn', { inventories: [LEAKY], inventoriesAgain: [INV_GATEAU] }, ({ error, calls, logs }) => [
  ...threw(error),
  ...(calls.some(c => c.label === 'inventory-again:1' && c.prompt.includes('Your first inventory names how the old diagram is drawn: --sch-s1')) ? [] : ['not asked again with the forms named']),
  ...(logs.some(l => /^Inventory 1 names how the old diagram is drawn/.test(l)) ? [] : ['not logged']),
  ...(drawers(calls).every(c => !/sch-|fill-opacity/.test(c.prompt)) ? [] : ['a form reached the drawing'])])
fails += await scenario('inventory naming the old drawing twice: stops before any drawing', { inventories: [LEAKY], inventoriesAgain: [LEAKY] }, ({ error, calls }) => [
  ...(error && /Gateau\.astro still names how the old diagram is drawn: .*--sch-s1/.test(error) ? [] : ['not stopped']),
  ...(drawers(calls).length || calls.some(c => c.label === 'concept') ? ['drew or wrote anyway'] : [])])
{
  const reworded = structuredClone(INV_GATEAU); reworded.caption_sentences[2].sentence = 'Une couche entière ne sert à rien.'
  fails += await scenario('legende sentences reworded: stops', { inventories: [reworded] }, ({ error }) => (error && /are not the legende, verbatim and in order/.test(error) ? [] : ['not stopped']))
  const stray = structuredClone(INV_GATEAU); stray.caption_sentences[0].idea = 'gateau-bis'
  fails += await scenario('a sentence given to no idea: stops', { inventories: [stray] }, ({ error }) => (error && /goes to "gateau-bis", none of its ideas/.test(error) ? [] : ['not stopped']))
  const twin = structuredClone(INV_PART); twin.ideas[0].stem = 'gateau'; twin.caption_sentences[0].idea = 'gateau'
  fails += await scenario('two ideas of the concept with one stem: stops', { inventories: [INV_GATEAU, twin] }, ({ error }) => (error && /SVG stems not unique: gateau, gateau/.test(error) ? [] : ['not stopped']))
  const bad = structuredClone(INV_PART); bad.ideas[0].stem = 'Part_Recoupée'; bad.caption_sentences[0].idea = 'Part_Recoupée'
  fails += await scenario('a stem out of form: stops', { inventories: [INV_GATEAU, bad] }, ({ error }) => (error && /Refused SVG stem "Part_Recoupée"/.test(error) ? [] : ['not stopped']))
}
fails += await scenario('blind drawing: the drawing agent is given no old file, only its inventory and concept.md, after concept.md', {}, ({ error, calls }) => {
  const d = drawers(calls)
  const order = calls.map(c => c.label)
  return [...threw(error),
    ...(d.length === 2 ? [] : ['drawers not called']),
    ...d.flatMap(c => [FROM, SITE, '.astro', 'components/schemas', 'parcours-po-website', '.mdx', '/course/concepts/', 'sch-'].filter(p => c.prompt.includes(p)).map(p => `${c.label} names ${p}`)),
    ...d.flatMap(c => [`${TGT}/concept.md (the concept text)`, `${ROOT}/specs/linear-course/SPEC.md (section 7)`, `${ROOT}/docs/glossary.md`, 'Never read, list or search any other file or folder', 'never from an older drawing', 'Draw under SPEC.md section 7 to the letter']
      .filter(p => !c.prompt.includes(p)).map(p => `${c.label} lacks ${p}`)),
    ...(calls.find(c => c.label === 'draw:gateau')?.prompt.includes('"labels":["couche entière"],"role":"contrast","state":"refused"') ? [] : ['the inventory not given to its drawer']),
    ...(calls.find(c => c.label === 'draw:gateau')?.prompt.includes('Le gâteau en couches : une tranche horizontale') && !calls.find(c => c.label === 'draw:gateau')?.prompt.includes('trop gros pour un sprint') ? [] : ['a drawer got another idea']),
    ...(order.indexOf('concept') < order.indexOf('draw:gateau') ? [] : ['drawn before concept.md'])]
})
fails += await scenario('split: one old diagram, two ideas, two SVGs at the Figure\'s place, the old rendering beside the first', { inventories: [INV_SPLIT] }, ({ error, calls, report, result }) => {
  const concept = calls.find(c => c.label === 'concept')?.prompt ?? ''
  return [...threw(error),
    ...(drawers(calls).map(c => c.label).join() === 'draw:gateau-couches,draw:gateau-tranches,draw:part-recoupee' ? [] : ['not one drawing per idea']),
    ...(concept.includes(`whose legende is « ${LEG_GATEAU} »: gateau-couches.svg, gateau-tranches.svg`) ? [] : ['the Figure does not become both images, in order']),
    ...(concept.includes(JSON.stringify({ file: 'gateau-couches.svg', title: 'Les couches du gâteau', caption: "Le gâteau en couches. En bas, l'ingestion ; en haut, la restitution.", subconcept: '9a' })) && concept.includes('"caption":"Une couche prise en entier ne sert pas seule ; chaque part verticale sert seule.","subconcept":"9a1"') ? [] : ['captions not split by idea']),
    ...(report && report.includes('\n\nSplit by idea: 2 diagrams.\n') && report.includes('| ![old diagram 1](S1-10-09-report/old-1.png) | ![gateau-couches.svg](S1-10-09-report/gateau-couches.png) |\n|  | ![gateau-tranches.svg](S1-10-09-report/gateau-tranches.png) |') ? [] : ['split not shown in the report']),
    ...(result?.diagrams?.length === 3 ? [] : ['summary not three diagrams'])]
})
// wf_90327be3-efc: a drawing agent returned its file as an absolute path
fails += await scenario('drawn file returned as its absolute path: accepted', { drawnFile: { 'part-recoupee': `${TGT}/part-recoupee.svg` } }, ({ error, report }) => [
  ...threw(error), ...noAbs(report)])
fails += await scenario('drawn file returned as its path under a relative dest: accepted', { args: { dest: 'courses/parcours-po' }, listing: `ls: cannot access 'courses/parcours-po/${DIR}': No such file or directory`, cwd: '/Users/me/main', drawnFile: { gateau: `courses/parcours-po/${DIR}/gateau.svg`, 'part-recoupee': `/Users/me/main/courses/parcours-po/${DIR}/part-recoupee.svg` } }, ({ error }) => threw(error))
fails += await scenario('drawn file another one: stops', { drawnFile: { 'part-recoupee': `${TGT}/gateau.svg` } }, ({ error }) => (error && /Diagram part-recoupee returned the file .*\/gateau\.svg$/.test(error) ? [] : ['not stopped']))
fails += await scenario('drawn file in another folder: stops', { drawnFile: { 'part-recoupee': `/Users/me/other/${DIR}/part-recoupee.svg` } }, ({ error }) => (error && /Diagram part-recoupee returned the file \/Users\/me\/other\//.test(error) ? [] : ['not stopped']))
fails += await scenario('a drawn key: shown in the report beside the inventory\'s key, the run passes', {
  drawnKey: { gateau: ['tranche horizontale : ne sert pas seule'] },
}, ({ error, report }) => [
  ...threw(error),
  ...(report && report.includes('Key of the inventory: E4 « tranche horizontale : ne sert pas seule ». Key drawn: « tranche horizontale : ne sert pas seule ».') ? [] : ['drawn key not in the report'])])
{
  const unsaid = structuredClone(INV_PART); unsaid.ideas[0].elements[0].state = 'not done'
  fails += await scenario('a state no word says: asked once more, then drawn', { inventories: [INV_GATEAU, unsaid], inventoriesAgain: [undefined, INV_PART] }, ({ error, calls, logs }) => [
    ...threw(error),
    ...(calls.some(c => c.label === 'inventory-again:2' && c.prompt.includes('Your first inventory gives a state that no word says: part-recoupee E1 (not done)')) ? [] : ['not asked again']),
    ...(logs.some(l => l.startsWith('Inventory 2 gives a state that no word says')) ? [] : ['not logged']),
    ...(calls.find(c => c.label === 'inventory:1')?.prompt.includes('never from a line style, a fill or any other form alone') ? [] : ['inventory prompt lacks the rule'])])
  fails += await scenario('a state no word says, twice: stops before any drawing', { inventories: [INV_GATEAU, unsaid], inventoriesAgain: [undefined, unsaid] }, ({ error, calls }) => [
    ...(error && /PartRecoupee\.astro still gives a state that no word says: part-recoupee E1/.test(error) ? [] : ['not stopped']),
    ...(drawers(calls).length ? ['drew anyway'] : [])])
}
// review of PR #182, B2: a caption keeps the sentence of its idea; naming and reading sentences go to the
// title and the labels; a caption of more than one sentence is flagged
fails += await scenario('legende sentences to the title and the labels: out of the caption, given to the drawer', {}, ({ error, calls, result, report }) => {
  const draw = calls.find(c => c.label === 'draw:gateau')?.prompt ?? ''
  const inv = calls.find(c => c.label === 'inventory:1')?.prompt ?? ''
  return [...threw(error),
    ...(draw.includes('tell how to read the diagram') && draw.includes('« En bas, l\'ingestion ; en haut, la restitution. »') && !draw.includes('« Le gâteau en couches. »') ? [] : ['drawer not given the reading sentence alone']),
    ...(inv.includes('each part becomes a label of the element it reads, its words verbatim in that element\'s labels') ? [] : ['inventory not told to make its parts labels']),
    ...(report && report.includes('- « Le gâteau en couches. »: title of gateau.svg') && report.includes(': labels of gateau.svg') ? [] : ['report does not say where each sentence went']),
    ...(result?.long_captions?.length === 0 ? [] : ['a caption flagged'])]
})
{
  const whole = structuredClone(INV_GATEAU); whole.caption_sentences.forEach(c => { c.to = 'caption' })
  fails += await scenario('a caption of three sentences: flagged in the report, not refused', { inventories: [whole] }, ({ error, report, result, logs }) => [
    ...threw(error),
    ...(report && report.includes('Captions of more than one sentence (SPEC.md 7.2, principle 1: a caption that needs two sentences means two diagrams): gateau.svg (3 sentences).') && report.includes('(**3 sentences**: SPEC.md 7.2, principle 1)') ? [] : ['not flagged in the report']),
    ...(result?.long_captions?.join() === 'gateau.svg' && logs.some(l => l.startsWith('Captions of more than one sentence')) ? [] : ['not in the summary or the log'])])
  const lumped = structuredClone(INV_PART); lumped.caption_sentences[0].sentence = LEG_PART
  fails += await scenario('a caption of one sentence given whole: not flagged', { inventories: [INV_GATEAU, lumped] }, ({ error, result }) => [...threw(error), ...(result?.long_captions?.length ? ['flagged'] : [])])
  const untitled = structuredClone(INV_GATEAU); untitled.ideas[0].title = 'Une tranche horizontale contre trois tranches verticales'
  fails += await scenario('a sentence to a title that does not carry it: asked once more', { inventories: [untitled], inventoriesAgain: [INV_GATEAU] }, ({ error, calls }) => [
    ...threw(error),
    ...(calls.some(c => c.label === 'inventory-again:1' && c.prompt.includes('gives to a title a sentence that title does not carry: « Le gâteau en couches. »')) ? [] : ['not asked again'])])
  fails += await scenario('a sentence to a title that does not carry it, twice: stops', { inventories: [untitled], inventoriesAgain: [untitled] }, ({ error, calls }) => [
    ...(error && /still gives to a title a sentence that title does not carry/.test(error) ? [] : ['not stopped']),
    ...(drawers(calls).length ? ['drew anyway'] : [])])
}
fails += await scenario('renderings: a build but no figure matching: the sentence says so', { renderOut: JSON.stringify({ page: 'found', old: [{ n: 1, caption: 'another legende', png: 'old-1.png' }], new: [{ svg: 'gateau.svg', png: 'gateau.png' }, { svg: 'part-recoupee.svg', png: 'part-recoupee.png' }], errors: [] }) }, ({ error, report }) => [
  ...threw(error),
  ...(report && report.includes("Renderings: the old diagram from the frozen site's build when a figure of the page matched its legende (0 of 2), else not rendered;") && report.includes('| not rendered: source `parcours-po-website/src/components/schemas/Gateau.astro` |') ? [] : ['sentence not following the figures found'])])
fails += await scenario('a Figure becomes the diagrams\' lines, never "images"', {}, ({ error, calls }) => [
  ...threw(error),
  ...(['concept', 'teaching+sources'].flatMap(l => /\bimages?\b/.test(calls.find(c => c.label === l)?.prompt ?? '') ? [`${l} prompt says image`] : []))])
fails += await scenario('drawing agents told to check with xmllint only', {}, ({ error, calls }) => [
  ...threw(error),
  ...(['never words of your own', 'nothing is more marked than the', 'never `secondary`'].filter(t => !(calls.find(c => c.label === 'draw:part-recoupee')?.prompt ?? '').includes(t)).map(t => `drawer lacks: ${t}`)),
  ...(drawers(calls).every(c => c.prompt.includes('with xmllint --noout, and with nothing else: no browser, no preview pane, no screenshot')) ? [] : ['drawer not told'])])
// review of PR #182: the frontmatter diagrams of concept.md as written are the entries set in code
fails += await scenario('frontmatter diagrams as set, in another order: drawn', { frontmatter: fm => [...fm].reverse() }, ({ error, calls }) => [
  ...threw(error),
  ...(calls.find(c => c.label === 'frontmatter')?.prompt.includes(`${ROOT}/specs/linear-course/checks/lib/md.js ${TGT}/concept.md`) ? [] : ['frontmatter command wrong']),
  ...(calls.map(c => c.label).indexOf('frontmatter') < calls.map(c => c.label).indexOf('draw:gateau') ? [] : ['not read before the drawing'])])
fails += await scenario('frontmatter caption reworded: stops before any drawing', { frontmatter: fm => fm.map(e => e.file === 'gateau.svg' ? { ...e, caption: `${e.caption} Et plus.` } : e) }, ({ error, calls }) => [
  ...(error && /are not the entries set from the inventories \(M11\): gateau\.svg caption:/.test(error) ? [] : ['not stopped']),
  ...(drawers(calls).length ? ['drew anyway'] : [])])
fails += await scenario('frontmatter with an entry missing and one more key: stops', { frontmatter: fm => [{ ...fm[0], alt: 'x' }] }, ({ error }) => (error && /gateau\.svg: keys alt; part-recoupee\.svg: no entry/.test(error) ? [] : ['not stopped']))
fails += await scenario('frontmatter unreadable: stops', { frontmatterOut: 'node: command not found' }, ({ error }) => (error && /could not be read/.test(error) ? [] : ['not stopped']))
fails += await scenario('renderings: the command, PNGs beside the report', { args: { report: '/Users/me/wt/construction/notes/181-concept-9-report.md' } }, ({ error, calls, report }) => [
  ...threw(error), ...noAbs(report),
  ...(calls.find(c => c.label === 'renderings')?.prompt.includes(`mise exec -- node ${ROOT}/construction/scripts/diagram-renderings/render.mjs --out /Users/me/wt/construction/notes/181-concept-9-report/ --page ${SITE}/dist/concepts/09/index.html --component ${SITE}/src/components/schemas/Gateau.astro --component ${SITE}/src/components/schemas/PartRecoupee.astro --svg ${TGT}/gateau.svg --svg ${TGT}/part-recoupee.svg`) ? [] : ['render command wrong']),
  ...(report && report.includes('![gateau.svg](181-concept-9-report/gateau.png)') && report.includes('Renderings in `181-concept-9-report/`, beside this report.') ? [] : ['links not relative to the report'])])
fails += await scenario('renderings: no site build, the old component\'s source named', { renderOut: JSON.stringify({ page: 'absent', old: [], new: [{ svg: 'gateau.svg', png: 'gateau.png' }, { svg: 'part-recoupee.svg', png: null }], errors: [] }) }, ({ error, report }) => [
  ...threw(error), ...noAbs(report),
  ...(report && report.includes('| no site build: source `parcours-po-website/src/components/schemas/Gateau.astro` | ![gateau.svg](S1-10-09-report/gateau.png) |') && report.includes('| part-recoupee.svg: not rendered |') ? [] : ['no-build row wrong']),
  ...(report && report.includes('Renderings: no site build, so the old diagram is its component\'s source') && !report.includes('from the frozen site\'s build') ? [] : ['renderings sentence names a build'])])
const SRC_GATEAU = '---\nconst { p } = Astro.props\n---\n<svg viewBox="0 0 10 10" role="img"><text>Ingestion</text></svg>\n<!-- `code` -->\n'
const srcLine = (c, source, bytes = Buffer.byteLength(source, 'utf8')) => JSON.stringify({ component: c, source, bytes })
fails += await scenario('renderings: no site build, the old component\'s source quoted; a source cut short, named only', { renderOut: [
  srcLine(`${SITE}/src/components/schemas/Gateau.astro`, SRC_GATEAU), srcLine(`${SITE}/src/components/schemas/PartRecoupee.astro`, '<svg>cut', 900),
  JSON.stringify({ page: 'absent', old: [], new: [{ svg: 'gateau.svg', png: 'gateau.png' }, { svg: 'part-recoupee.svg', png: 'part-recoupee.png' }], errors: [] })].join('\n') }, ({ error, report }) => [
  ...threw(error), ...noAbs(report),
  ...(report && report.includes('| no site build: its source below | ![gateau.svg](S1-10-09-report/gateau.png) |') && report.includes('Source of `parcours-po-website/src/components/schemas/Gateau.astro`, as the old rendering:\n\n```astro\n---\nconst { p } = Astro.props') && report.includes('<!-- `code` -->\n```\n') ? [] : ['source not quoted']),
  ...(report && report.includes('| no site build: source `parcours-po-website/src/components/schemas/PartRecoupee.astro` |') && report.includes('the source of parcours-po-website/src/components/schemas/PartRecoupee.astro came back cut (8 bytes, 900 measured): not quoted') ? [] : ['cut source not named only'])])
fails += await scenario('renderings: no JSON, the report says so, the run goes on', { renderOut: 'qlmanage: command not found' }, ({ error, report }) => [
  ...threw(error),
  ...(report && report.includes('| not rendered: source `parcours-po-website/src/components/schemas/Gateau.astro` | gateau.svg: not rendered |') && report.includes('errors: the render command printed no JSON: qlmanage: command not found') ? [] : ['failure not reported'])])
fails += await scenario('target absent (macOS ls)', { listing: ABSENT_MAC }, ({ error, report }) => [...threw(error), ...noAbs(report)])
fails += await scenario('target an empty folder: no refusal, no emptying', { listing: EMPTY }, ({ error, report, calls }) => [
  ...threw(error), ...(calls.some(c => c.label === 'empty-target') ? ['emptied'] : []),
  ...(report && report.includes('an empty folder') ? [] : ['listing verdict wrong'])])
fails += await scenario('target holds files, no overwrite: refused', { listing: FULL }, ({ error }) => (error && /holds files/.test(error) && /concept\.md/.test(error) ? [] : ['not refused']))
fails += await scenario('target holds files, overwrite: emptied', { listing: FULL, args: { overwrite: true } }, ({ error, report, calls }) => [
  ...threw(error), ...(calls.some(c => c.label === 'empty-target') ? [] : ['not emptied']),
  ...(report && report.includes('| yes, emptied |') && report.includes('2 entries, emptied') ? [] : ['report wrong'])])
fails += await scenario('emptying agent says empty but lists a file: stops', { listing: FULL, args: { overwrite: true }, emptied: { empty: true, listing: 'concept.md' } }, ({ error }) => (error && /could not be emptied/.test(error) ? [] : ['not stopped']))
fails += await scenario('listing unreadable: stops', { listing: 'the folder holds files' }, ({ error }) => (error && /reads as neither/.test(error) ? [] : ['not stopped']))
fails += await scenario('listing of another existing folder: stops', { listing: OTHER }, ({ error }) => (error && /reads as neither/.test(error) ? [] : ['not stopped']))
fails += await scenario('error naming another path: stops', { listing: `ls: cannot access '${DEST}/concepts': No such file or directory` }, ({ error }) => (error && /reads as neither/.test(error) ? [] : ['not stopped']))
fails += await scenario('no diagram: no inventory, no drawing, no rendering', { diagrams: [] }, ({ error, report, calls }) => [
  ...threw(error), ...(calls.some(c => /^(inventory|draw|renderings)/.test(c.label)) ? ['a diagram agent called'] : []),
  ...(report && report.includes('## Diagrams (M11)\n\nNo diagram.') ? [] : ['no-diagram line missing'])])
fails += await scenario('relative dest, agents give absolute paths: none left, none mangled', { args: { dest: 'courses/parcours-po' }, listing: `ls: cannot access 'courses/parcours-po/${DIR}': No such file or directory`, agentRoot: '/private/tmp/feyn/' }, ({ error, report }) => [
  ...threw(error), ...noAbs(report),
  ...(report && report.includes('in concepts/09-decoupage-vertical/sources.md intro') ? [] : ['course-folder path wrong']),
  ...(report && report.includes('course folder path:courses/parcours-po, the target *concepts/09-decoupage-vertical*') ? [] : ['dest in odd contexts not rewritten']),
  ...(report && !report.includes('feyn/concepts') && report.includes('<absolute path>') ? [] : ['mangled, or the outside path not replaced'])])
fails += await scenario('absolute dest under /Users, paths in odd contexts: none left', {}, ({ error, report }) => [
  ...threw(error), ...noAbs(report),
  ...(report && report.includes('path:<absolute path>, *<absolute path>*, {<absolute path>}') ? [] : ['odd-context paths not replaced']),
  ...(report && report.includes('course folder path:courses/parcours-po, the target *concepts/09-decoupage-vertical*') ? [] : ['dest not rewritten as literal text'])])
fails += await scenario('dest under /workspace: none left', { args: { dest: '/workspace/feyn/courses/parcours-po' }, listing: `ls: cannot access '/workspace/feyn/courses/parcours-po/${DIR}': No such file or directory`, agentRoot: '/workspace/feyn/' }, ({ error, report }) => [
  ...threw(error), ...noAbs(report),
  ...(report && report.includes('in concepts/09-decoupage-vertical/sources.md intro') && report.includes('check-course courses/parcours-po --only') ? [] : ['paths under /workspace not rewritten'])])
// #178: the ruling-B line, an absent target named under missing, absolute spec paths
const writers = calls => calls.filter(c => ['teaching+sources', 'concept'].includes(c.label))
fails += await scenario('checks agent: a forbidden colour fixed by the role, never knocked-out text', {}, ({ error, calls }) => [
  ...threw(error),
  ...(calls.find(c => c.label === 'checks')?.prompt.includes('currentColor with the class and opacity of its role by SPEC.md 7.2, never a text knocked out of a fill') ? [] : ['checks agent not told'])])
// ruling B on #23: the writer of teaching.md is given the one form of the citation line
fails += await scenario('ruling-B line: the writer of teaching.md is given its one form', {}, ({ error, calls }) => [
  ...threw(error),
  ...(calls.find(c => c.label === 'teaching+sources')?.prompt.includes('Cas de la banque : pour <id>, « <title> », « <title> » et « <title> » ; pour') && calls.find(c => c.label === 'teaching+sources')?.prompt.includes('no « Poser », no « puis »') ? [] : ['writer lacks the form'])])
// #184, rule D on #23: no comparison with the old course; the agents that remain, and their models
const COMPARISON = /^(old-to-new|new-to-old|compare-diagram|verify)\b/
fails += await scenario('no comparison: no comparison agent spawned, the summary without lost, invented or accepted', { args: { accept: true } }, ({ error, calls, result, report }) => [
  ...threw(error),
  ...(calls.some(c => COMPARISON.test(c.label)) ? [`a comparison agent spawned: ${calls.filter(c => COMPARISON.test(c.label)).map(c => c.label).join(', ')}`] : []),
  ...(calls.map(c => c.label).sort().join() === 'checks,concept,draw:gateau,draw:part-recoupee,frontmatter,inventory:1,inventory:2,renderings,report,scope,teaching+sources' ? [] : [`agents not the eleven of concept 9: ${calls.map(c => c.label).join()}`]),
  ...(result && ['lost', 'invented', 'accepted', 'kept', 'moved', 'by_design'].every(k => !(k in result)) ? [] : ['summary holds a comparison count']),
  ...(result && ['checks', 'diagrams', 'long_captions', 'renderings'].every(k => k in result) ? [] : ['summary lacks checks, diagrams, long_captions or renderings']),
  ...(report && !/## (Lost|Invented|Refuted|CF: old to new|SF: old to new|MDX: old to new|ASTRO: old to new)\b/.test(report) && !/accepted/.test(report) ? [] : ['report holds a comparison section']),
  ...(/\baccept/.test(src) ? ['the workflow still names accept'] : [])])
fails += await scenario('models: teaching+sources on sonnet; inventory, draw and concept on the default model', {}, ({ error, calls }) => [
  ...threw(error),
  ...(calls.find(c => c.label === 'teaching+sources')?.opts.model === 'sonnet' ? [] : ['teaching+sources not on sonnet']),
  ...calls.filter(c => /^(inventory:|draw:|concept$)/.test(c.label) && c.opts.model !== undefined).map(c => `${c.label} given model ${c.opts.model}`),
  ...(calls.filter(c => /^(inventory:|draw:|concept$)/.test(c.label)).length === 5 ? [] : ['inventory, draw or concept not called'])])
fails += await scenario('checks failing for the concept: the run fails, the report written', { checksOut: CHECKS.map(c => c === 'svg-contract' ? `${c}: fail: ${DIR}/gateau.svg:3 a fill` : `${c}: ok`).join('\n') }, ({ error, report }) => [
  ...(error && /checks fail \(svg-contract: fail: concepts\/09-decoupage-vertical\/gateau\.svg:3 a fill\)/.test(error) ? [] : ['not failed on the checks']),
  ...(report && report.includes('Result: **failed**') && report.includes('| fail | no | 2 | 2 | 0 |') ? [] : ['report not failed'])])
for (const [name, item] of [['absolute', `target folder ${TGT} does not exist`], ['course-relative', `target courses/parcours-po/${DIR}: No such file or directory.`], ['bare dir', `the target folder ${DIR} does not exist yet`]])
  fails += await scenario(`absent target named under missing (${name}): ignored`, { missing: [item] }, ({ error }) => threw(error))
fails += await scenario('a missing old file under concepts/: stops', { missing: [`target folder ${TGT} does not exist`, `${FROM}/course/concepts/09-decoupage-vertical.md`] }, ({ error }) => (error && /Inputs missing: \/Users\/me\/pdx\/parcours-po\/course\/concepts\/09-decoupage-vertical\.md$/.test(error) ? [] : ['not stopped on the old file alone']))
fails += await scenario('one item naming the target and a missing input: stops', { missing: [`target folder ${TGT} does not exist; ${FROM}/course/sources/09-decoupage-vertical.md not found`] }, ({ error }) => (error && /Inputs missing: target folder .*sources\/09-decoupage-vertical\.md not found$/.test(error) ? [] : ['not stopped']))
fails += await scenario('spec paths absolute in the writers\', inventories\' and drawers\' inputs', {}, ({ error, calls }) => {
  const inventories = calls.filter(c => c.label.startsWith('inventory:'))
  return [...threw(error),
    ...(writers(calls).length === 2 && inventories.length === 2 && drawers(calls).length === 2 ? [] : ['writers, inventories or drawers not all called']),
    ...[...writers(calls), ...inventories].flatMap(c => [`${ROOT}/specs/linear-course/SPEC.md`, `${ROOT}/docs/glossary.md`, `${ROOT}/construction/notes/S1-08.md`]
      .filter(p => !c.prompt.includes(p)).map(p => `${c.label} lacks ${p}`)),
    ...writers(calls).filter(c => !c.prompt.includes(`${ROOT}/specs/linear-course/templates/`)).map(c => `${c.label} lacks the templates`),
    ...[...writers(calls), ...inventories, ...drawers(calls)].filter(c => /(^|[^\w/])(specs\/linear-course\/|docs\/glossary\.md|construction\/notes\/S1-08\.md)/.test(c.prompt)).map(c => `${c.label} has a relative spec path`)]
})
fails += await scenario('working directory not absolute: stops', { cwd: 'feyn' }, ({ error }) => (error && /not an absolute path/.test(error) ? [] : ['not stopped']))
fails += await scenario('working directory /: stops', { cwd: '/' }, ({ error }) => (error && /not an absolute path other than \//.test(error) ? [] : ['not stopped']))
// wave 2: the work session stayed in the main checkout, dest was the worktree's course folder
fails += await scenario('pwd not dest\'s root: the root is dest\'s, checks, drawings and renderings included', { cwd: '/Users/me/main' }, ({ error, report, calls }) => [
  ...threw(error), ...noAbs(report),
  ...[...writers(calls), ...drawers(calls)].filter(c => !c.prompt.includes(`${ROOT}/specs/linear-course/SPEC.md`) || c.prompt.includes('/Users/me/main')).map(c => `${c.label} not on dest's root`),
  ...(calls.find(c => c.label === 'checks')?.prompt.includes(`mise exec -- ${ROOT}/specs/linear-course/checks/check-course ${DEST} --only`) ? [] : ['check command not on dest\'s root']),
  ...(calls.find(c => c.label === 'renderings')?.prompt.includes(`node ${ROOT}/construction/scripts/diagram-renderings/render.mjs`) ? [] : ['render command not on dest\'s root']),
  ...(calls.find(c => c.label === 'scope')?.prompt.includes(`ls -ld ${ROOT}/specs"`) ? [] : ['scope not asked to list dest\'s root'])])
fails += await scenario('relative dest: the root is pwd', { args: { dest: 'courses/parcours-po' }, listing: `ls: cannot access 'courses/parcours-po/${DIR}': No such file or directory`, cwd: '/Users/me/main' }, ({ error, calls }) => [
  ...threw(error),
  ...(calls.find(c => c.label === 'checks')?.prompt.includes('mise exec -- /Users/me/main/specs/linear-course/checks/check-course courses/parcours-po --only') ? [] : ['check command not on pwd']),
  ...([...writers(calls), ...drawers(calls)].every(c => c.prompt.includes('/Users/me/main/docs/glossary.md')) ? [] : ['writers or drawers not on pwd'])])
fails += await scenario('root without specs/: stops', { rootListing: `ls: ${ROOT}/specs: No such file or directory` }, ({ error }) => (error && /shows no specs\/ folder/.test(error) ? [] : ['not stopped']))
fails += await scenario('absolute dest under courses/ of another form: stops', { args: { dest: '/Users/me/wt/courses/other/parcours-po' } }, ({ error, calls }) => [
  ...(error && /is under a courses\/ folder but is not <repository>\/courses\/parcours-po/.test(error) ? [] : ['not stopped']),
  ...(calls.length ? ['agents called before the refusal'] : [])])
fails += await scenario('absolute dest outside a repository: pwd root, logged', { args: { dest: '/private/tmp/copy/parcours-po' }, listing: `ls: cannot access '/private/tmp/copy/parcours-po/${DIR}': No such file or directory`, cwd: '/Users/me/main' }, ({ error, calls, logs }) => [
  ...threw(error),
  ...(logs.some(l => /outside a repository: the spec, the glossary and the checks are taken from the working directory \/Users\/me\/main\//.test(l)) ? [] : ['no log line']),
  ...(calls.find(c => c.label === 'checks')?.prompt.includes('mise exec -- /Users/me/main/specs/linear-course/checks/check-course /private/tmp/copy/parcours-po --only') ? [] : ['check command not on pwd'])])
fails += await scenario('relative dest, target named by an absolute path under missing: ignored', { args: { dest: 'courses/parcours-po' }, listing: `ls: cannot access 'courses/parcours-po/${DIR}': No such file or directory`, cwd: '/abs/feyn', missing: [`target folder /abs/feyn/courses/parcours-po/${DIR} does not exist`] }, ({ error, logs }) => [
  ...threw(error),
  ...(logs.some(l => l.startsWith('Ignored as missing')) ? [] : ['not logged as ignored'])])
console.log(fails ? `${fails} scenario(s) failed` : 'all scenarios pass')
process.exit(fails ? 1 : 0)
