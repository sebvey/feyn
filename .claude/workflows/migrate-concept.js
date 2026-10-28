export const meta = {
  name: 'migrate-concept',
  description: 'Migrate one concept of a frozen parcours-po course into a linear-course concept folder, check it, and compare old and new',
  whenToUse: 'Stage 1 only (S1-10): the maintainer asks to migrate concept N of a course from the frozen repositories. args: { course: "<course id>", concept: "<number as in course.yaml: 9, A1>", from?: "<frozen course repo, default ../pdx/parcours-po>", site?: "<frozen site repo, default ../pdx/parcours-po-website>", dest?: "<course folder written into, default courses/<course>>", report?: "<report path, default construction/notes/S1-10-<NN>-report.md>", langDir?: "<language pack dir passed to check-course>", overwrite?: true, accept?: true }.',
  phases: [
    { title: 'Scope', detail: 'finds the old files, the course.yaml entry, the target folder' },
    { title: 'Write', detail: 'the diagrams, concept.md, teaching.md and sources.md' },
    { title: 'Checks', detail: 'check-course on the concept, form fixes only' },
    { title: 'Compare', detail: 'old to new and new to old, flagged rows verified, report written' },
  ],
}

// migrate-concept: one concept of the frozen parcours-po (concept file, sources file, site MDX,
// Astro diagram components) becomes one concept folder of SPEC.md section 4, by the closed list of
// mapping rules MAP below (taken from the S1-02 prototype and the rulings on #97, #98 and #23).
// Steps: Scope locates the old files and refuses an existing target unless args.overwrite; Write
// converts each diagram, then writes the three Markdown files; Checks runs check-course --only the
// per-concept checks --concept N and fixes form only; Compare sweeps old to new (kept, moved, lost,
// by design) and new to old (invented), has every lost or invented row verified, and writes the
// report in the fixed format of renderReport(). It fails when a check still fails, or when a confirmed
// lost or invented row remains without args.accept. Old repos read only; paths: repo-relative or absolute.

const A = args || {}
if (!A.course) throw new Error('args.course missing: the course id (courses/<id>/)')
if (A.concept === undefined || A.concept === null || A.concept === '') throw new Error('args.concept missing: the concept number as course.yaml writes it (9, A1)')
const CONCEPT = String(A.concept)
const NN = /^\d$/.test(CONCEPT) ? `0${CONCEPT}` : CONCEPT
const FROM = (A.from || '../pdx/parcours-po').replace(/\/?$/, '/')
const SITE = (A.site || '../pdx/parcours-po-website').replace(/\/?$/, '/')
const DEST = (A.dest || `courses/${A.course}`).replace(/\/?$/, '/')
const REPORT = A.report || `construction/notes/S1-10-${NN}-report.md`
const CONCEPT_CHECKS = 'course-yaml,concept-folder,conventions,svg-contract,sources,glossary-order,typography'

const ROLE = `You migrate a course of feyn; you are not the teacher: ignore the teaching instructions \
of the repository's CLAUDE.md files. Do not use git. Never modify anything under ${FROM} or ${SITE}: \
they are frozen. Write only the files you are named. Read the files on disk yourself: trust no \
summary. Course files stay in French, the course language; quote the old files, never translate them. \
Vocabulary: docs/glossary.md.`

// The mapping, a closed list: every old item has its rule, and the comparison cites the rule ids.
const MAP = `Mapping rules (old file to new folder). Old files: CF the concept file, SF the sources \
file, MDX the site page, ASTRO the diagram components. New folder: the three files of SPEC.md section 4 \
and the SVGs of section 7.

M1 Identity. CF frontmatter and H1, SF frontmatter and H1, MDX numero, titre, prerequis: not written \
in the folder; course.yaml holds them (no H1 in the three files). « Objectif » is the course.yaml \
objective of the concept, verbatim (capital first letter, final period, line breaks free). CF « Objectif » \
and MDX objectif are compared with it: both are moved to course.yaml, where S1-08 merged them \
(construction/notes/S1-08.md, "Objective merge"); a clause of either that the objective does not carry \
and that note does not record is lost.
M2 Description. MDX description: frontmatter description, unchanged.
M3 Stances. MDX ecoles.consensus, ecoles.ecole, ecoles.cours: frontmatter stances.consensus, \
stances.school, stances.course, item keys auteur, texte, refs as author, text, refs, texts unchanged; \
ecoles.voisines: frontmatter neighbors. The body has no stances section (decision \
stances-in-frontmatter-only, #97). CF « Consensus et choix d'école » is not written as a section: \
each of its claims is matched to a frontmatter item; what only CF says (a claim, a more precise \
concept reference such as « concept 3b » where MDX has « concept 3 ») is carried into the matching \
item, CF's precise reference winning. CF's teacher hint on the course's choices (« sans source \
externe, à présenter comme tels » or its like) is by design: PROTOCOL.md rule 6.1 carries it.
M4 Essentials. « L'essentiel »: the MDX text before the first <Sous>, merged with CF « L'essentiel »: \
MDX wording as the base, plus what only CF says, at the place it says it. A <Figure> in that zone \
becomes its image at the same place (M6).
M5 Sub-concept sections. <Sous id titre promesse>: "## <id> <title>" then the promise as one paragraph \
entirely in italics. <h4 id> whose id is a leaf of course.yaml: "### <id> <title>". The <title> is the \
course.yaml title (a different MDX titre is moved). Reader text unchanged, in MDX order. An <h4> whose \
id course.yaml does not list (ruling on #23): a paragraph of its parent leaf's reader text, led by its \
title in bold; counted moved. Sections follow course.yaml order (SPEC.md 4.2).
M6 Components. <Renvoi n="4"/>: "concept 4"; n="8a2": "concept 8a2"; consecutive renvois in one \
parenthesis or list: "concepts 5 et 7b"; an annex (n="A2", "A2d"): "annexe A2" as the site printed it, \
plain text. <Pastille kind="cours|ecole|consensus"/>: "[cours]", "[école]", "[consensus]" where the \
pastille stood. <FilRouge>: a blockquote whose first line starts with "**Fil rouge :**". <Figure \
legende> holding a diagram component: "![<title>](<stem>.svg)" alone in its paragraph, at the same \
place; legende is the frontmatter caption. <Reflexe note>: « Le test rapide » (M8). <Erreurs>: \
« Pièges » (M7). import lines: by design, nothing.
M7 Pitfalls. « Pièges »: the MDX <Erreurs> list merged with CF « Pièges »: MDX order and sentences; \
CF's more precise references kept (CF « concept 8a2 » where MDX had « concept 8 », a named author \
where MDX was generic); a CF sentence absent from MDX kept in its item; a CF item absent from MDX \
added at its CF place. One bulleted list, each item opening with the pitfall in bold.
M8 Quick test. « Le test rapide »: the CF question (or the <Reflexe> slot when CF has none) as one \
blockquote, then the <Reflexe> note as at most one paragraph; what only CF adds goes in that paragraph.
M9 Teaching notes. teaching.md: CF « Sous-concepts » becomes « Consignes », verbatim (every case cited \
by its title in « », exactly as its heading writes it, inner quotes « » or “ ” as they are). The lead \
paragraph of CF « Banque d'exemples » that lists the storyline facts used (and what is not fixed) \
becomes « Faits du fil rouge utilisés », its lead words dropped; any other lead text stays at the top \
of « Banque d'exemples ». The cases: « Banque d'exemples », same ### headings, every field verbatim, \
fields as SPEC.md 4.3 lists them (labels « **<label>** : »). CF « Schéma »: « Schéma », verbatim.
M10 Sources. sources.md from SF: frontmatter and H1 dropped (M1); the intro paragraph kept; \
« Affirmations »: same rows, same order, texts unchanged, the header « Affirmation (section de \
\`concept.md\` ou de \`teaching.md\`) | Source | Ce qui a été vérifié | Nature », a fourth column \
Nature: when an MDX sources.affirmations item states the same claim, its kind (cours, école, \
consensus; MDX ecole is written école), and empty when that item has no kind (the absence is the \
site's choice); only when no MDX item states the claim, the stance of the MDX ecoles item the claim \
matches (consensus, ecole, cours), else empty. Source column: copied as it is, never an id added, \
removed or replaced, never « aucune » or another no-source word replaced, with one exception, the \
orphan: a reference of « Références » that no source cell of the file cites (the sources check fails \
on it) and that exactly one row names in its verification column as what supports the claim \
(« l'affiche [S5b] ajoute … ») is added to that row's source column, after the ids already there; \
counted moved, detail "orphan [Sx] added". An id the verification column names as a contrast, a source \
that does not say it, a nuance not retained or a neighbouring idea is not support: it stays out. An \
orphan with no such row is left, and the run fails on it. A row's section name « Sous-concepts » becomes « Consignes », « Consensus et choix d'école » \
stays (headings.stances); paths course/sources/NN-slug.md become concepts/NN-slug/sources.md; rows \
whose section is in teaching.md stay (the site filters them, ruling on #98). « Références » and \
« Non vérifié »: unchanged. The MDX sources texts (the reader paraphrase): by design, only their kind \
is used.
M11 Diagrams. One ASTRO component (one variant per distinct prop value used in MDX, e.g. p="a") \
becomes one SVG under the drawing contract (SPEC.md section 7). Stem: a named component gives its name in \
lowercase words joined by hyphens (Gateau: gateau, PartRecoupee: part-recoupee); a numbered one \
(Schema13, SchemaA1, Schema16Prevision, any variant) gives two to four words of its <title>, lowercase \
ASCII without accents, joined by hyphens; stems are unique in the concept. Same viewBox and geometry; JS loops and conditions \
written out; <title> kept (it is the frontmatter title and the image alt) and <desc> kept, ids \
prefixed with the stem; colour tokens (--sch-*), <style> and patterns become currentColor with \
fill-opacity / stroke-opacity and the classes primary, secondary, muted, the losses (a second colour, \
a hatch, a halo) recorded. The drawing must stay readable in one colour: shapes the old drawing told \
apart by colour get distinct opacities (three slice colours: 0.85, 0.6, 0.4), not only distinct \
classes; a contrast ink drawn over a shape (the cut lines across a slice) becomes a gap, the shape \
drawn as segments 2 units apart, never a line of another class over it; a hatch becomes a muted fill \
under a dashed outline; a legend swatch is drawn as the element it stands for (same fill, same \
outline). Groups "<sub-concept>-<element>", never a bare sub-concept id, the sub-concept being the \
leaf the part illustrates (9a1-couches, not 9a-couches). Frontmatter \
diagrams entry: file, title (the <title>), caption (the Figure legende), subconcept (the sub-concept \
the diagram illustrates: the one whose section holds it, or for a diagram in « L'essentiel », the \
first-level sub-concept it draws).
M12 By design, nowhere: MDX alignement, import lines, Astro frontmatter code once written out, the \
CF teacher hint of M3, the H1s and frontmatters of M1, the MDX sources texts of M10.
M13 Form. Plain CommonMark under SPEC.md 4.5, no HTML, no MDX, no directive. Banned characters of the \
language pack (French: em-dash, arrows) replaced by the smallest change (comma, colon, a word); each \
replacement is moved. The course writes the straight apostrophe: a typographic one (’) becomes ' in \
every file, SVG text included (form, not counted). Nothing else is reworded: a text the rules do not \
touch is copied as it is.`

const SCOPE_SCHEMA = {
  type: 'object',
  properties: {
    spec_dir: { type: 'string', description: 'specs/<name>/ of the spec that course.yaml declares, ends with /' },
    dir: { type: 'string', description: 'the concept dir as course.yaml writes it (concepts/09-decoupage-vertical)' },
    course_entry: { type: 'string', description: 'the concept entry of course.yaml, copied whole: number, slug, title, objective, prerequisites, dir, subconcepts' },
    concept_file: { type: 'string', description: 'path of the old concept file (CF), <from>course/concepts/NN-*.md' },
    sources_file: { type: 'string', description: 'path of the old sources file (SF), <from>course/sources/NN-*.md' },
    mdx_file: { type: 'string', description: 'path of the site page (MDX), <site>src/content/concepts/fr/NN-*.mdx' },
    diagrams: {
      type: 'array',
      description: 'one item per diagram the MDX shows: per component, per distinct variant prop value; in MDX order',
      items: {
        type: 'object',
        properties: {
          component: { type: 'string', description: 'path of the .astro file, from the MDX import line' },
          variant: { type: 'string', description: 'the prop that selects the variant, as written (p="a"), or empty string' },
          stem: { type: 'string', description: 'stem by rule M11' },
          legende: { type: 'string', description: 'the legende of the enclosing <Figure>, verbatim' },
          place: { type: 'string', description: 'where the Figure stands: "essentials" or the id of the <Sous> or <h4> section holding it' },
        },
        required: ['component', 'variant', 'stem', 'legende', 'place'],
      },
    },
    unlisted_h4: { type: 'array', items: { type: 'string' }, description: 'ids of MDX <h4> that are not sub-concepts of the course.yaml entry (rule M5)' },
    target_exists: { type: 'boolean', description: 'the folder <dest><dir> exists and holds at least one file' },
    missing: { type: 'array', items: { type: 'string' }, description: 'what could not be found (a file, the concept in course.yaml); empty when all is found' },
  },
  required: ['spec_dir', 'dir', 'course_entry', 'concept_file', 'sources_file', 'mdx_file', 'diagrams', 'unlisted_h4', 'target_exists', 'missing'],
}

const DIAGRAM_SCHEMA = {
  type: 'object',
  properties: {
    file: { type: 'string' },
    title: { type: 'string' },
    caption: { type: 'string' },
    subconcept: { type: 'string' },
    groups: { type: 'array', items: { type: 'string' }, description: 'the group ids of the SVG' },
    losses: { type: 'array', items: { type: 'string' }, description: 'what the drawing contract could not carry (a second colour, a hatch, a halo), one line each' },
  },
  required: ['file', 'title', 'caption', 'subconcept', 'groups', 'losses'],
}

const WRITE_SCHEMA = {
  type: 'object',
  properties: {
    files: { type: 'array', items: { type: 'string' }, description: 'the files written' },
    choices: { type: 'array', items: { type: 'string' }, description: 'each place where a rule left a choice (a merge, an inferred Nature, a replaced character), one line each, with the rule id' },
  },
  required: ['files', 'choices'],
}

const CHECKS_SCHEMA = {
  type: 'object',
  properties: {
    passed: { type: 'boolean', description: 'the last run of the command exited 0' },
    output: { type: 'string', description: 'the output of the last run, verbatim' },
    fixes: { type: 'array', items: { type: 'string' }, description: 'form fixes applied, one line each: file, what, which failure' },
    left: { type: 'array', items: { type: 'string' }, description: 'failures not fixed because the fix would change what the text says, with why' },
  },
  required: ['passed', 'output', 'fixes', 'left'],
}

const ROW = {
  type: 'object',
  properties: {
    source: { type: 'string', enum: ['CF', 'SF', 'MDX', 'ASTRO'] },
    item: { type: 'string', description: 'the old section or item (a heading, a frontmatter key, a component, a row), short' },
    where: { type: 'string', description: 'where it is now: file and section (concept.md « 9a1 … », frontmatter stances.school), course.yaml, or "none"' },
    verdict: { type: 'string', enum: ['kept', 'moved', 'lost', 'by design'] },
    rule: { type: 'string', description: 'the mapping rule id (M1 to M13)' },
    detail: { type: 'string', description: 'for moved: what changed; for lost: the old text missing, quoted; for by design: the rule clause; for kept: empty or one remark' },
  },
  required: ['source', 'item', 'where', 'verdict', 'rule', 'detail'],
}
const OLD_SWEEP_SCHEMA = {
  type: 'object',
  properties: { rows: { type: 'array', items: ROW } },
  required: ['rows'],
}
const NEW_SWEEP_SCHEMA = {
  type: 'object',
  properties: {
    rows: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          file: { type: 'string' },
          section: { type: 'string' },
          text: { type: 'string', description: 'the new text, quoted' },
          detail: { type: 'string', description: 'why no old text carries it, or what it adds to the old text' },
        },
        required: ['file', 'section', 'text', 'detail'],
      },
    },
  },
  required: ['rows'],
}
const VERIFY_SCHEMA = {
  type: 'object',
  properties: {
    verdicts: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'the id of the flagged row (L1, I1…)' },
          confirmed: { type: 'boolean', description: 'true when the row is right: the text really is lost, or really is invented' },
          reason: { type: 'string', description: 'the evidence: where the text was found, or the search that found nothing' },
        },
        required: ['id', 'confirmed', 'reason'],
      },
    },
  },
  required: ['verdicts'],
}

// --- Scope -----------------------------------------------------------------------------

phase('Scope')
const scope = await agent(`${ROLE}

Locate the inputs of the migration of concept ${CONCEPT} of the course ${A.course}.
- ${DEST}course.yaml: the concept entry whose number is "${CONCEPT}" (copy it whole), and the spec it \
declares (field spec: linear-course@1 is specs/linear-course/).
- The old concept file ${FROM}course/concepts/${NN}-*.md, the old sources file \
${FROM}course/sources/${NN}-*.md, the site page ${SITE}src/content/concepts/fr/${NN}-*.mdx.
- The diagram components the MDX imports (its import lines under components/schemas/), and every \
use of each in the MDX: one item per distinct variant prop, with the legende of its <Figure> and the \
section that holds it.
- The MDX <h4 id> that are not sub-concept ids of the course.yaml entry.
- Whether ${DEST}<dir>/ exists and holds a file.

Stem rule (M11): a named component gives its name in lowercase words joined by hyphens (Gateau: \
gateau, PartRecoupee: part-recoupee); a numbered one (Schema13, SchemaA1, Schema16Prevision, any \
variant) gives two to four words of its <title> (the variant's), lowercase ASCII without accents, \
joined by hyphens; stems are unique in the concept.
Modify no file.`,
  { label: 'scope', schema: SCOPE_SCHEMA, model: 'sonnet', effort: 'low' })

if (!scope) throw new Error('Scope agent returned nothing')
if (scope.missing.length) throw new Error(`Inputs missing: ${scope.missing.join('; ')}`)
const DIR = scope.dir.replace(/^courses\/[^/]+\//, '').replace(/\/?$/, '/')
const TARGET = `${DEST}${DIR}`
if (scope.target_exists && !A.overwrite) throw new Error(`${TARGET} already holds files: pass args.overwrite to replace them, or args.dest to write elsewhere`)
log(`Concept ${CONCEPT}: ${scope.concept_file}, ${scope.sources_file}, ${scope.mdx_file}, ${scope.diagrams.length} diagram(s); writing ${TARGET}`)
if (scope.unlisted_h4.length) log(`MDX sub-headings not in course.yaml (rule M5, paragraphs): ${scope.unlisted_h4.join(', ')}`)

const INPUTS = `Inputs (read them on disk):
- CF, the old concept file: ${scope.concept_file}
- SF, the old sources file: ${scope.sources_file}
- MDX, the site page: ${scope.mdx_file}
- ASTRO, the diagram components: ${[...new Set(scope.diagrams.map(d => d.component))].join(', ') || '(none)'}
- the course.yaml entry: ${scope.course_entry}
- the spec: ${scope.spec_dir}SPEC.md (sections 4 and 7), the templates in ${scope.spec_dir}templates/
- the reference migration of concept 9, done by hand: construction/notes/S1-02-prototype.md (its \
"Checklist" tables show each rule applied; where it disagrees with the rules below, the rules win)
Target concept folder: ${TARGET}

${MAP}`

const CHECK_CMD = `mise exec -- ${scope.spec_dir}checks/check-course ${DEST.replace(/\/$/, '')} --only ${CONCEPT_CHECKS} --concept ${CONCEPT}${A.langDir ? ` --lang-dir ${A.langDir}` : ''}`

// --- Write -----------------------------------------------------------------------------

phase('Write')
const [diagrams, teachingAndSources] = await parallel([
  () => parallel(scope.diagrams.map(d => () => agent(`${ROLE}

${INPUTS}

Convert one diagram by rule M11: the component ${d.component}${d.variant ? `, variant ${d.variant} only` : ''}, \
into ${TARGET}${d.stem}.svg. Its Figure legende: « ${d.legende} ». It stands in: ${d.place}. Follow the \
drawing contract of SPEC.md section 7 to the letter (the prototype's gateau.svg and \
part-recoupee.svg in courses/parcours-po/concepts/09-decoupage-vertical/ on main show it met); \
check the file is well-formed (xmllint --noout). Write only that file. Return its frontmatter entry, its \
group ids and the losses.`,
    { label: `diagram:${d.stem}`, phase: 'Write', schema: DIAGRAM_SCHEMA }))),
  () => agent(`${ROLE}

${INPUTS}

Write ${TARGET}teaching.md by rule M9 and ${TARGET}sources.md by rule M10 (and M13 for both). Copy the \
old texts as they are; change only what a rule names. Write only those two files. Return the files and \
every choice a rule left you.`,
    { label: 'teaching+sources', phase: 'Write', schema: WRITE_SCHEMA }),
])

const diagramEntries = (diagrams || []).filter(Boolean)
if (diagramEntries.length < scope.diagrams.length) throw new Error(`${scope.diagrams.length - diagramEntries.length} diagram(s) not converted: see the workflow log`)
if (!teachingAndSources) throw new Error('teaching.md and sources.md not written: see the workflow log')

const conceptWritten = await agent(`${ROLE}

${INPUTS}

The diagrams are written; their frontmatter entries: ${JSON.stringify(diagramEntries.map(({ file, title, caption, subconcept }) => ({ file, title, caption, subconcept })))}.
MDX sub-headings not in course.yaml (rule M5): ${scope.unlisted_h4.join(', ') || 'none'}.

Write ${TARGET}concept.md by rules M1 to M8 and M13: frontmatter description, stances, neighbors (if \
MDX has ecoles.voisines), diagrams (the entries above, in body order); body in the order of SPEC.md 4.2. \
Copy the old texts as they are; change only what a rule names. Write only that file. Return it and every \
choice a rule left you.`,
  { label: 'concept', phase: 'Write', schema: WRITE_SCHEMA })
if (!conceptWritten) throw new Error('concept.md not written: see the workflow log')

// --- Checks ----------------------------------------------------------------------------

phase('Checks')
const checks = await agent(`${ROLE}

The concept folder ${TARGET} has just been migrated from ${scope.concept_file}, ${scope.sources_file} \
and ${scope.mdx_file} by the rules below.

${MAP}

Run "${CHECK_CMD}". For each failure in a file of ${TARGET}: fix it when the fix is form only (a heading, \
a label, a list shape, a frontmatter key, an id, an SVG attribute, a quote character, a wrapped line, \
the orphan reference of rule M10 added to the source column of the one row that names it as support, \
and no other source-column change); \
leave it when the fix would change what the text says, and say why. Rerun after fixing, at most three \
runs in all. A failure in a file outside ${TARGET} is not yours: leave it. Return the last output.`,
  { label: 'checks', phase: 'Checks', schema: CHECKS_SCHEMA, model: 'sonnet' })
if (!checks) throw new Error('Checks agent returned nothing')
log(`Checks: ${checks.passed ? 'pass' : 'fail'}${checks.fixes.length ? `, ${checks.fixes.length} form fix(es)` : ''}`)

// --- Compare ---------------------------------------------------------------------------

phase('Compare')
const COMPARE = `${ROLE} Modify no file.

Old files: CF ${scope.concept_file}, SF ${scope.sources_file}, MDX ${scope.mdx_file}, ASTRO \
${[...new Set(scope.diagrams.map(d => d.component))].join(', ') || '(none)'}. New concept folder: \
${TARGET} (concept.md, teaching.md, sources.md, ${diagramEntries.map(d => d.file).join(', ') || 'no SVG'}). \
The course.yaml entry: ${scope.course_entry}

${MAP}

The comparison is semantic: line breaks, Markdown form and the conversions the rules name do not count; \
a sentence, a clause, a precision, a reference, a figure, a nuance, a case field does.
Sourcing counts too. A source cell of « Affirmations » (column 2) or a frontmatter refs list that \
differs from its old one by an id added, removed or replaced, or by a no-source word (« aucune ») \
replaced, is a change of sourcing: it is never moved by default. It is moved only when it is the orphan \
case of M10, and the row's detail then names the orphan and quotes the verification text that names \
it as support. Any other change of sourcing is invented (an id added or replaced, a no-source word \
replaced) or lost (an id removed).`

const [oldSweep, newSweep] = await parallel([
  () => agent(`${COMPARE}

Old to new. Walk the old files section by section, in their order: every heading, frontmatter key, \
component, paragraph, list item, case field, table row and drawn element. For each item, find where \
it is in the new folder and give one row: kept (same text, at the place its rule gives), moved (carried, \
with a change its rule names: merged, converted, renamed, placed elsewhere, or carried out of the folder \
to course.yaml or the protocol), lost (some of its text is in no new file and no rule drops it: quote \
what is missing), by design (rule M12 or another rule's clause drops it: name the clause). One row per \
section; one row per item inside a section only when its verdict differs from its section's, or for \
every case field, table row and frontmatter item that is moved or lost. Never use by design for a \
drop no rule names.`,
    { label: 'old-to-new', phase: 'Compare', schema: OLD_SWEEP_SCHEMA }),
  () => agent(`${COMPARE}

New to old. Walk every file of the new folder, sentence by sentence (frontmatter items, body \
sentences, list items, case fields, table rows, SVG texts). For each, find the old text that carries \
it. Report only what is invented: a sentence, a clause, a precision, a reference, a figure or a claim \
that no old file carries, or a rewording that says more or less than the old text. Text that a rule \
produces (a heading from course.yaml, the Nature column of M10, "[cours]" for a pastille, an SVG id) is \
not invented when it follows the rule. Compare every source cell of sources.md and every refs list \
of the frontmatter with the old one, id by id, and report each added or replaced id, and each \
replaced no-source word, that is not the orphan case of M10. Return an empty list when nothing is \
invented.`,
    { label: 'new-to-old', phase: 'Compare', schema: NEW_SWEEP_SCHEMA }),
])
if (!oldSweep || !newSweep) throw new Error('A comparison sweep returned nothing: rerun the workflow (resume) to retry it')

const lostRows = oldSweep.rows.filter(r => r.verdict === 'lost').map((r, i) => ({ id: `L${i + 1}`, ...r }))
const inventedRows = newSweep.rows.map((r, i) => ({ id: `I${i + 1}`, ...r }))
let verdicts = []
if (lostRows.length || inventedRows.length) {
  const v = await agent(`${COMPARE}

Two sweeps flagged these rows. Try to refute each one: for a lost row, search every new file for the \
quoted text, in any wording that keeps the meaning; for an invented row, search every old file \
(CF, SF, MDX frontmatter and body, ASTRO) for what carries it, and check whether a rule produces it. \
confirmed: true only when your search finds nothing; say where you looked or what you found. A \
change of sourcing (an id added, removed or replaced in a source cell or a refs list, a no-source word \
replaced) is refuted only when it is the orphan case of M10: the reference is cited by no other source \
cell of the new sources.md, and the row's verification text names it as support, not as a contrast or \
a nuance not retained.

Lost: ${JSON.stringify(lostRows)}
Invented: ${JSON.stringify(inventedRows)}`,
    { label: 'verify', phase: 'Compare', schema: VERIFY_SCHEMA })
  verdicts = v ? v.verdicts : []
}
const verdictOf = id => verdicts.find(v => v.id === id)
// a row with no verdict stays flagged: no silent pass
const confirmed = r => { const v = verdictOf(r.id); return !v || v.confirmed }
const lostLeft = lostRows.filter(confirmed)
const inventedLeft = inventedRows.filter(confirmed)

// --- Report ----------------------------------------------------------------------------

const cell = s => String(s ?? '').replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ')
const count = v => oldSweep.rows.filter(r => r.verdict === v).length
const failed = !checks.passed || ((lostLeft.length || inventedLeft.length) && !A.accept)

function renderReport() {
  const out = []
  out.push(`# Migration report: concept ${CONCEPT}`, '')
  out.push(`Workflow \`migrate-concept\`, course \`${A.course}\`, concept folder \`${TARGET}\`.`)
  out.push(`Old files: \`${scope.concept_file}\` (CF), \`${scope.sources_file}\` (SF), \`${scope.mdx_file}\` (MDX)${scope.diagrams.length ? `, ${[...new Set(scope.diagrams.map(d => `\`${d.component}\``))].join(', ')} (ASTRO)` : ''}.`, '')
  out.push('## Summary', '')
  out.push('| kept | moved | by design | lost | invented | checks | accepted |')
  out.push('|---|---|---|---|---|---|---|')
  out.push(`| ${count('kept')} | ${count('moved')} | ${count('by design')} | ${lostLeft.length} | ${inventedLeft.length} | ${checks.passed ? 'pass' : 'fail'} | ${A.accept ? 'yes' : 'no'} |`, '')
  out.push(`Result: **${failed ? 'failed' : (lostLeft.length || inventedLeft.length) ? 'passed, accepted' : 'passed'}**. lost and invented count the rows confirmed by the verification; the rows it refuted are listed at the end.`, '')
  for (const src of ['CF', 'SF', 'MDX', 'ASTRO']) {
    const rows = oldSweep.rows.filter(r => r.source === src)
    if (!rows.length) continue
    out.push(`## ${src}: old to new`, '')
    out.push('| Old item | Where it is now | Verdict | Rule | Detail |', '|---|---|---|---|---|')
    for (const r of rows) {
      const flagged = lostRows.find(l => l === r || (l.item === r.item && l.source === r.source && l.detail === r.detail))
      const verdict = flagged ? `lost (${flagged.id}${confirmed(flagged) ? '' : ', refuted'})` : r.verdict
      out.push(`| ${cell(r.item)} | ${cell(r.where)} | ${verdict} | ${cell(r.rule)} | ${cell(r.detail)} |`)
    }
    out.push('')
  }
  out.push('## Lost', '')
  if (!lostLeft.length) out.push('None.')
  else { out.push('| Id | Source | Old item | Missing | Verification |', '|---|---|---|---|---|'); for (const r of lostLeft) out.push(`| ${r.id} | ${r.source} | ${cell(r.item)} | ${cell(r.detail)} | ${cell(verdictOf(r.id)?.reason ?? 'not verified')} |`) }
  out.push('', '## Invented', '')
  if (!inventedLeft.length) out.push('None.')
  else { out.push('| Id | File | Section | New text | Why | Verification |', '|---|---|---|---|---|---|'); for (const r of inventedLeft) out.push(`| ${r.id} | ${cell(r.file)} | ${cell(r.section)} | ${cell(r.text)} | ${cell(r.detail)} | ${cell(verdictOf(r.id)?.reason ?? 'not verified')} |`) }
  const refuted = [...lostRows, ...inventedRows].filter(r => !confirmed(r))
  out.push('', '## Refuted by the verification', '')
  if (!refuted.length) out.push('None.')
  else { out.push('| Id | Flagged | Found |', '|---|---|---|'); for (const r of refuted) out.push(`| ${r.id} | ${cell(r.item || r.text)} | ${cell(verdictOf(r.id).reason)} |`) }
  out.push('', '## Writing choices', '')
  const choices = [...teachingAndSources.choices, ...conceptWritten.choices, ...diagramEntries.flatMap(d => d.losses.map(l => `${d.file}: ${l} (M11)`))]
  out.push(...(choices.length ? choices.map(c => `- ${c}`) : ['None.']))
  out.push('', '## Checks', '')
  out.push(`\`${CHECK_CMD}\``, '', '```', checks.output.trim(), '```')
  if (checks.fixes.length) out.push('', 'Form fixes:', ...checks.fixes.map(f => `- ${f}`))
  if (checks.left.length) out.push('', 'Left:', ...checks.left.map(f => `- ${f}`))
  out.push('')
  return out.join('\n')
}

const report = renderReport()
await agent(`Write the file ${REPORT} with exactly the content between the two markers below (the markers \
excluded), byte for byte, creating its folder if needed. Do nothing else. Return "written".
-----BEGIN REPORT-----
${report}
-----END REPORT-----`,
  { label: 'report', phase: 'Compare', model: 'sonnet', effort: 'low' })

const summary = { concept: CONCEPT, folder: TARGET, report: REPORT, checks: checks.passed ? 'pass' : 'fail', kept: count('kept'), moved: count('moved'), by_design: count('by design'), lost: lostLeft.length, invented: inventedLeft.length, accepted: !!A.accept }
log(`Report: ${REPORT}; ${JSON.stringify(summary)}`)
if (failed) throw new Error(`migrate-concept failed for concept ${CONCEPT}: ${!checks.passed ? 'checks fail; ' : ''}${lostLeft.length} lost, ${inventedLeft.length} invented${A.accept ? ' (accepted)' : ''}. Report: ${REPORT}`)
return summary
