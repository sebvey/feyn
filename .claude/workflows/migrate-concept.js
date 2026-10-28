export const meta = {
  name: 'migrate-concept',
  description: 'Migrate one concept of a frozen parcours-po course into a linear-course concept folder, check it, and compare old and new',
  whenToUse: 'Stage 1 only (S1-10): the maintainer asks to migrate concept N of a course from the frozen repositories. args: { course: "<course id>", concept: "<number as in course.yaml: 9, A1>", from?: "<frozen course repo, default ../pdx/parcours-po>", site?: "<frozen site repo, default ../pdx/parcours-po-website>", dest?: "<course folder written into, default courses/<course>>", report?: "<report path, default construction/notes/S1-10-<NN>-report.md>", langDir?: "<language pack dir passed to check-course>", overwrite?: true, accept?: true }. dest is a full course folder (course.yaml, plan.md, glossary.md, domains/…), a copy when not courses/<course>; overwrite empties the target concept folder first. The defaults of from and site are relative to the working directory: a run from a worktree or a copy passes absolute paths.',
  phases: [
    { title: 'Scope', detail: 'finds the old files, the course.yaml entry, the target folder and its listing' },
    { title: 'Write', detail: 'the diagrams (by the fixed colour table), concept.md, teaching.md and sources.md' },
    { title: 'Checks', detail: 'check-course on the concept, form fixes only' },
    { title: 'Compare', detail: 'old to new and new to old, flagged rows verified, report written' },
  ],
}

// migrate-concept: one concept of the frozen parcours-po (concept file, sources file, site MDX,
// Astro diagram components) becomes one concept folder of SPEC.md section 4, by the closed list of
// mapping rules MAP below (taken from the S1-02 prototype and the rulings on #97, #98 and #23).
// Steps: Scope locates the old files and lists the target (ls -la), and refuses a target whose listing
// shows files (args.overwrite empties it); Write, blind to any other copy of the concept (BLIND), converts
// the diagrams with the one colour table of the course (COLOUR_TABLE, M11, decision one-diagram-style),
// then the Markdown; Checks runs
// check-course --only the per-concept checks --concept N, fixes form only; Compare sweeps old to new
// (kept, moved, lost, by design) and new to old (invented), verifies every lost or invented row, writes
// the report in the fixed format of renderReport(). Fails on a check failing for this concept, or a
// confirmed lost or invented row without args.accept. Old repos read only; paths: cwd-relative or absolute.
// Decided in code, not on an agent's word: the target path, the SVG stems, whether the target holds
// files (read from the listing, which the report shows), the colour table (fixed here, its form checked
// at load, every token a diagram draws with in it), the checks verdict, the citation line of M9 counted
// by design (from its exact form, ruling B on #23), a missing item naming the target ignored, the
// repository root (from an absolute dest, else pwd; the agents get the spec and the glossary under it,
// #178), the report. The report names
// paths relative to the course folder (concepts/NN-slug/...) and the old repositories by their folder
// name: never the absolute paths of args.dest, args.from or args.site (#170).

const A = args || {}
if (!A.course) throw new Error('args.course missing: the course id (courses/<id>/)')
if (A.concept === undefined || A.concept === null || A.concept === '') throw new Error('args.concept missing: the concept number as course.yaml writes it (9, A1)')
// "09" and 9 are concept 9; an annex keeps its letter (A1)
const CONCEPT = /^\d+$/.test(String(A.concept)) ? String(Number(A.concept)) : String(A.concept)
if (!/^(\d+|A\d+)$/.test(CONCEPT)) throw new Error(`args.concept ${A.concept}: a number (9) or an annex (A1)`)
const NN = /^\d$/.test(CONCEPT) ? `0${CONCEPT}` : CONCEPT
const FROM = (A.from || '../pdx/parcours-po').replace(/\/?$/, '/')
const SITE = (A.site || '../pdx/parcours-po-website').replace(/\/?$/, '/')
const DEST = (A.dest || `courses/${A.course}`).replace(/\/?$/, '/')
const REPORT = A.report || `construction/notes/S1-10-${NN}-report.md`
// The repository root of the run (#178): an absolute dest of the form <root>courses/<course>/ gives it
// (the run's worktree: in wave 2 the work session stayed in the main checkout, so pwd was not it);
// any other dest, the working directory (pwd). Checked from the scope agent's listing of <root>specs.
// An absolute dest inside a repository (it holds /courses/) but not of that form stops the run: taking
// the spec from pwd there is the wave-2 fault. Any other absolute dest (a copy outside a repository)
// falls back to pwd, logged after the scope step.
const DEST_ROOT = DEST.startsWith('/') && DEST.endsWith(`/courses/${A.course}/`) ? DEST.slice(0, -`courses/${A.course}/`.length) : ''
if (DEST.startsWith('/') && !DEST_ROOT && DEST.includes('/courses/')) throw new Error(`args.dest ${DEST} is under a courses/ folder but is not <repository>/courses/${A.course}: the spec root cannot be told from it; pass <repository>/courses/${A.course}`)
const CONCEPT_CHECKS = 'course-yaml,concept-folder,conventions,svg-contract,sources,glossary-order,typography'

// ROOT: the run's repository root, absolute, with a final slash (#178): DEST_ROOT below, else the pwd
// the scope agent returns. Empty for the scope prompt (paths relative to the working directory); set
// after the scope step, so that the writers, the checks and the comparison read the spec, its
// templates, docs/glossary.md and S1-08.md of the run's root, never the main checkout's (wave 2 of
// S1-10: the writers of concepts 3 and 5 read them from the main checkout, reviews of #175, #176).
let ROOT = ''
const role = () => `You migrate a course of feyn; you are not the teacher: ignore the teaching instructions \
of the repository's CLAUDE.md files. Do not use git. Never modify anything under ${FROM} or ${SITE}: \
they are frozen. Write only the files you are named. Read the files on disk yourself: trust no \
summary. Course files stay in French, the course language; quote the old files, never translate them. \
Vocabulary: ${ROOT}docs/glossary.md.`

// Writers work blind: the old files are their only source for the course text.
const blind = () => `Read only the files listed under "Inputs". Never read, list, search or diff any other folder \
or copy of this concept: not courses/${A.course}/concepts/, not any other course folder, not \
construction/notes/ (a hand migration or an earlier report of this concept lives there; only \
${ROOT}construction/notes/S1-08.md, which rule M1 names, may be read), not git \
history, and not the target folder beyond the files you write yourself. The target folder is empty when \
the Write step starts: write your files from the inputs and the rules alone.`

// The colour table (M11, #181): one ink of SPEC.md section 7.2 per old colour token, fixed for the course,
// the same in every concept (decision one-diagram-style). Not decided per concept: in wave 2 of S1-10 a
// colour agent per concept drew --sch-text muted in concept 2, primary in 3 and 4, secondary in 5.
// INKS restates the inks of SPEC.md 7.2 (class, opacity); --sch-s-ink, the old contrast ink, has no
// ink of its own: it takes the form label on a fill or cut of SPEC.md 7.2 by what it draws.
const INKS = {
  focus: ['primary', 1], contrast: ['secondary', 0.7], 'light contrast': ['secondary', 0.4],
  text: ['muted', 1], 'soft text': ['muted', 0.75], line: ['muted', 0.6], outline: ['muted', 0.45],
  'grey fill': ['muted', 0.25], 'light fill': ['muted', 0.12],
}
const CONTRAST_INK = 'label on a fill or cut'
const COLOUR_TABLE = [
  { token: '--sch-s1', ink: 'focus', draws: 'the darkest blue: the element taught (a flag, the epic, the precise cards, slice 1, the « afin de » block, a focus outline or arrow)' },
  { token: '--sch-s2', ink: 'contrast', draws: 'the middle blue: the second element (the Résultat frame, the features, the conversation bubble, slice 2, the other dots)' },
  { token: '--sch-s3', ink: 'light contrast', draws: 'the light blue: a third element (slice 3, the stories, the retrospective) and the light fill of nodes' },
  { token: '--sch-text', ink: 'text', draws: 'the main text, and the strokes drawn in it (a cross, a strike, a time line, a dashed curve)' },
  { token: '--sch-text-soft', ink: 'soft text', draws: 'notes, legends, column heads, arrows and their heads' },
  { token: '--sch-grey-line', ink: 'line', draws: 'links, axes, ticks, dashed outlines, hatch lines, small marks (a lock, a knob)' },
  { token: '--sch-band-line', ink: 'outline', draws: 'the outline of boxes and cards, separators' },
  { token: '--sch-grey', ink: 'grey fill', draws: 'the fill of a hatch, of a shape set aside (blocked, in doubt); a halo (a loss)' },
  { token: '--sch-band', ink: 'light fill', draws: 'the fill of boxes and cards; also var(--sch-bg, var(--sch-band)), --sch-bg being undefined' },
  { token: '--sch-s-ink', ink: CONTRAST_INK, draws: 'light words or marks on a dark shape: a label on a fill in a window, a line or mark across a shape a cut (a gap)' },
]
// --sch-bg is defined by no old stylesheet: var(--sch-bg, var(--sch-band)) draws --sch-band (Schema17)
const TOKEN_ALIAS = { '--sch-bg': '--sch-band' }
{
  const TOKEN = /^--sch-[a-z0-9]+(-[a-z0-9]+)*$/
  const seen = new Set(), pairs = new Map()
  for (const r of COLOUR_TABLE) {
    if (!TOKEN.test(r.token) || seen.has(r.token)) throw new Error(`COLOUR_TABLE: ${r.token} malformed or twice`)
    seen.add(r.token)
    if (r.ink === CONTRAST_INK) continue
    if (!INKS[r.ink]) throw new Error(`COLOUR_TABLE: ${r.token} has the ink "${r.ink}", which SPEC.md 7.2 lacks`)
    const pair = INKS[r.ink].join(' ')
    if (pairs.has(pair)) throw new Error(`COLOUR_TABLE: ${pairs.get(pair)} and ${r.token} share the pair ${pair}`)
    pairs.set(pair, r.token)
  }
}
const inkText = r => r.ink === CONTRAST_INK
  ? `${r.token}: the contrast ink, no pair: drawn on a fill as a label (a <text>), the form label on a fill (the label in a window of the fill, fill="currentColor", no class, no opacity attribute); drawn over a shape as a line, a mark or a shape, the form cut (a gap)`
  : `${r.token}: ${r.ink}, class ${INKS[r.ink][0]}, opacity ${INKS[r.ink][1]}`
const TABLE_TEXT = COLOUR_TABLE.map(inkText).join('; ')
const tableToken = t => TOKEN_ALIAS[t] || t

// The mapping, a closed list: every old item has its rule, and the comparison cites the rule ids.
const mapRules = () => `Mapping rules (old file to new folder). Old files: CF the concept file, SF the sources \
file, MDX the site page, ASTRO the diagram components. New folder: the three files of SPEC.md section 4 \
and the SVGs of section 7.

M1 Identity. CF frontmatter and H1, SF frontmatter and H1, MDX numero, titre, prerequis: not written \
in the folder; course.yaml holds them (no H1 in the three files). « Objectif » is the course.yaml \
objective of the concept, verbatim (capital first letter, final period, line breaks free). CF « Objectif » \
and MDX objectif are compared with it: both are moved to course.yaml, where S1-08 merged them \
(${ROOT}construction/notes/S1-08.md, "Objective merge"); a clause of either that the objective does not carry \
and that note does not record is lost.
M2 Description. MDX description: frontmatter description, unchanged.
M3 Stances. MDX ecoles.consensus, ecoles.ecole, ecoles.cours: frontmatter stances.consensus, \
stances.school, stances.course, item keys auteur, texte, refs as author, text, refs, texts unchanged; \
ecoles.voisines: frontmatter neighbors. The body has no stances section (decision \
stances-in-frontmatter-only, #97). CF « Consensus et choix d'école » is not written as a section: \
each of its claims is matched to a frontmatter item; what only CF says (a claim, a more precise \
concept reference such as « concept 2c » where MDX has « concept 2 ») is carried into the matching \
item, CF's precise reference winning. CF's teacher hint on the course's choices (« sans source \
externe, à présenter comme tels » or its like) is by design: the protocol rule stances-told-apart (present the course's choices as such) carries it.
M4 Essentials. « L'essentiel »: the MDX text before the first <Sous>, merged with CF « L'essentiel »: \
MDX wording as the base, plus what only CF says, at the place it says it. A <Figure> in that zone \
becomes its image at the same place (M6).
M5 Sub-concept sections. <Sous id titre promesse>: "## <id> <title>" then the promise as one paragraph \
entirely in italics. <h4 id> whose id is a leaf of course.yaml: "### <id> <title>". The <title> is the \
course.yaml title (a different MDX titre is moved). Reader text unchanged, in MDX order. An <h4> whose \
id course.yaml does not list (ruling on #23): a paragraph of its parent leaf's reader text, led by its \
title in bold; counted moved. Sections follow course.yaml order (SPEC.md 4.2).
M6 Components. <Renvoi n="4"/>: "concept 4"; n="2c1": "concept 2c1"; consecutive renvois in one \
parenthesis or list: "concepts 2 et 3a"; an annex (n="A2", "A2d"): "annexe A2" as the site printed it, \
plain text. <Pastille kind="cours|ecole|consensus"/>: "[cours]", "[école]", "[consensus]" where the \
pastille stood. <FilRouge>: a blockquote whose first line starts with "**Fil rouge :**". <Figure \
legende> holding a diagram component: "![<title>](<stem>.svg)" alone in its paragraph, at the same \
place; legende is the frontmatter caption. <Reflexe note>: « Le test rapide » (M8). <Erreurs>: \
« Pièges » (M7). import lines: by design, nothing.
M7 Pitfalls. « Pièges »: the MDX <Erreurs> list merged with CF « Pièges »: MDX order and sentences; \
CF's more precise references kept (CF « concept 2c1 » where MDX had « concept 2 », a named author \
where MDX was generic); a CF sentence absent from MDX kept in its item; a CF item absent from MDX \
added at its CF place. One bulleted list, each item opening with the pitfall in bold.
M8 Quick test. « Le test rapide »: the CF question (or the <Reflexe> slot when CF has none) as one \
blockquote, then the <Reflexe> note as at most one paragraph; what only CF adds goes in that paragraph.
M9 Teaching notes. teaching.md: CF « Sous-concepts » becomes « Consignes », verbatim. Its one \
addition (ruling B on #23): when a case of « Banque d'exemples » is not cited in it by its title in « » \
(concept-folder requires every case cited), « Consignes » ends with one citation line, a paragraph of \
its own, in this form and no other: \`Cas de la banque : pour <id>, « <title> », « <title> » et \
« <title> » ; pour <id>, « <title> ».\`: one « pour <id> » per sub-concept that has an uncited case \
(<id> as the case heading's parenthesis gives it, its qualifier dropped), in bank order, the groups \
separated by « ; »; after it, the titles of its uncited cases only, in bank order, separated by \
commas, « et » before the last of two or more, each exactly as its heading writes it (inner quotes \
« » or “ ” as they are). No verb, no order of teaching, no other word. \
No line when the old « Sous-concepts » cites every case. The comparison counts that line by design \
(M9, ruling B on #23), never invented; a line in another form, or any other sentence added to \
« Consignes » (« Poser « … », puis « … ». »), is invented. The lead \
paragraph of CF « Banque d'exemples » that lists the storyline facts used (and what is not fixed) \
becomes « Faits du fil rouge utilisés », its lead words dropped; any other lead text stays at the top \
of « Banque d'exemples ». The cases: « Banque d'exemples », same ### headings, every field verbatim, \
fields as SPEC.md 4.3 lists them (labels « **<label>** : »). CF « Schéma »: « Schéma », verbatim.
M10 Sources. sources.md from SF: frontmatter and H1 dropped (M1); the intro paragraph kept, but for \
the old paths below; \
« Affirmations »: same rows, same order, texts unchanged, the header « Affirmation (section de \
\`concept.md\` ou de \`teaching.md\`) | Source | Ce qui a été vérifié | Nature », a fourth column \
Nature: when an MDX sources.affirmations item states the same claim, its kind (cours, école, \
consensus; MDX ecole is written école), and empty when that item has no kind (the absence is the \
site's choice); only when no MDX item states the claim, the stance of the MDX ecoles item the claim \
matches (consensus, ecole, cours), else empty. Source column: copied as it is, never an id added, \
removed or replaced, never « aucune » or another no-source word replaced, with two exceptions: the \
old paths below, and the orphan: a reference of « Références » that no source cell of the file cites (the sources check fails \
on it) and that exactly one row names in its verification column as what supports the claim \
(« la page [S3b] ajoute … ») is added to that row's source column, after the ids already there; \
counted moved, detail "orphan [Sx] added". An id the verification column names as a contrast, a source \
that does not say it, a nuance not retained or a neighbouring idea is not support: it stays out. An \
orphan with no such row is left, and the run fails on it. A row's section name « Sous-concepts » becomes « Consignes », « Consensus et choix d'école » \
stays (headings.stances); rows whose section is in teaching.md stay (the site filters them, ruling on \
#98). « Références » and « Non vérifié »: unchanged, but for the old paths below. Old paths: a path of \
the old repository, anywhere in the file, becomes its path in the course folder: course/plan.md: \
plan.md; course/glossary.md: glossary.md; course/fil-rouge-*.md: storyline.md; \
course/concepts/NN-slug.md: concepts/NN-slug/concept.md; course/sources/NN-slug.md: \
concepts/NN-slug/sources.md; an old decision number (ADR-018): the course decision of the decisions/ \
folder of the course that says it carries that old decision over (decisions/<slug>.md), else it has no \
new path. The intro and « Non vérifié » are prose the teacher reads, not source cells (the site builds \
neither, SPEC.md 4.4): there, a pointer with no new path (an old \
decision no course decision carries over, off-course.md, the old repository's git history, a task id \
such as T-021) is dropped by the smallest change, and the claim it points from stays; elsewhere (a \
source cell, « Références ») it stays as it is. The intro's pointer to the « Consensus et choix \
d'école » section of the concept stays: the site shows the frontmatter stances under that heading \
(headings.stances). Each path rewritten and each pointer dropped is a writing choice, one line each \
(old text, new text), counted moved. The MDX sources texts (the reader paraphrase): by design, only \
their kind is used.
M11 Diagrams. One ASTRO component (one variant per distinct prop value used in MDX, e.g. p="a") \
becomes one SVG under the drawing contract and in the style of SPEC.md section 7 (7.1 the contract; \
7.2 the style: the meaning of the classes, the inks, the common forms, the measures). Stem: a named component gives its name in \
lowercase words joined by hyphens (Escalier: escalier, CoutDuRetard: cout-du-retard); a numbered one \
(Schema13, SchemaA1, Schema16Prevision, any variant) gives two to four words of its <title>, lowercase \
ASCII without accents, joined by hyphens; stems are unique in the concept. Same viewBox and geometry; JS loops and conditions \
written out; <title> kept (it is the frontmatter title and the image alt) and <desc> kept, ids \
prefixed with the stem; colour tokens (--sch-*), <style> and patterns become currentColor with \
fill-opacity / stroke-opacity and the classes primary, secondary, muted, by the colour table of the \
course below, the losses (a second colour, a hatch, a halo) recorded. The colour table is fixed, the \
same for every concept and every diagram (decision one-diagram-style): each old token draws with its \
ink, never another pair, and no writer decides a mapping of its own; a token the table lacks stops \
the run. The colour table: ${TABLE_TEXT}. The report shows the table once, and the losses do not \
repeat it. An opacity the old component sets on an individual element or class beyond its token's \
colour (a class .ribbon at 0.7 and .ribbon.thin at 0.45 on the same token, a rect with opacity="0.5") \
is an element opacity (SPEC.md 7.2): kept as that element's opacity attribute, on top of its ink; \
never folded into the ink, never dropped (a contrast ink drawn as a cut has no element to keep it on: \
a loss; the opacity of a hatch's lines, .hatch-line, goes on the dashed outline that replaces the \
hatch); the report lists each kept element opacity under the writing choices (maintainer's ruling \
of 2026-10-28). The contrast ink --sch-s-ink takes the forms of SPEC.md 7.2 by what it draws: a label \
on a fill (a <text>: light words on a dark card) is drawn in a window of the fill, the form label on a \
fill (maintainer's ruling of 2026-10-28 on #23); a line, a mark or a shape over a shape (the cut lines \
across a slice, a tick on a disc) is a cut, a gap. A token that draws both keeps both: its labels in \
windows, its lines and marks as gaps. The losses, one line each: a label no longer a second ink on its \
fill, a border under 6 units, a hatch, a halo. A hatch, a legend swatch, a dash: the forms of SPEC.md \
7.2. Groups "<sub-concept>-<element>", never a bare sub-concept id, the sub-concept being the \
leaf the part illustrates (2c1-etapes, not 2c-etapes): the leaf whose reader text explains what that \
part shows, which may differ from the diagram's subconcept (labels naming the techniques a later leaf \
teaches take that later leaf). Frontmatter \
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
    spec: { type: 'string', description: 'the spec name course.yaml declares, without its MAJOR (linear-course@1: linear-course)' },
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
    target_listing: { type: 'string', description: 'the output of "ls -ld <dest><dir>; ls -la <dest><dir>" (dir as returned above), verbatim, every line, errors included' },
    cwd: { type: 'string', description: 'the output of the command pwd, verbatim: the absolute path of the working directory' },
    root_listing: { type: 'string', description: 'the output of the ls -ld command on the specs folder of the repository root given in the prompt, verbatim, errors included' },
    missing: { type: 'array', items: { type: 'string' }, description: 'the inputs that could not be found (an old file, a diagram component, the concept in course.yaml); empty when all are found. Never the target folder: it is not an input, it may not exist yet, and target_listing says whether it does' },
  },
  required: ['spec', 'dir', 'course_entry', 'concept_file', 'sources_file', 'mdx_file', 'diagrams', 'unlisted_h4', 'target_listing', 'cwd', 'root_listing', 'missing'],
}

const DIAGRAM_SCHEMA = {
  type: 'object',
  properties: {
    file: { type: 'string' },
    title: { type: 'string' },
    caption: { type: 'string' },
    subconcept: { type: 'string' },
    groups: { type: 'array', items: { type: 'string' }, description: 'the group ids of the SVG' },
    tokens: { type: 'array', items: { type: 'string' }, description: 'the old colour tokens (--sch-*) this drawing draws with: for var(--a, var(--b)) with --a undefined in the old stylesheet, --b' },
    element_opacities: {
      type: 'array',
      description: 'each opacity the old component set on an element or class beyond its token, kept as the element opacity attribute (M11)',
      items: {
        type: 'object',
        properties: {
          element: { type: 'string', description: 'the old element or class (.ribbon.thin, the rect of the legend), and its group or id in the SVG' },
          opacity: { type: 'number', description: 'the opacity kept, as the old component set it' },
        },
        required: ['element', 'opacity'],
      },
    },
    losses: { type: 'array', items: { type: 'string' }, description: 'what the drawing contract could not carry (a second colour, a hatch, a halo), one line each; not the colour table' },
  },
  required: ['file', 'title', 'caption', 'subconcept', 'groups', 'tokens', 'element_opacities', 'losses'],
}

const EMPTY_SCHEMA = {
  type: 'object',
  properties: {
    empty: { type: 'boolean', description: 'ls -A of the folder printed nothing' },
    listing: { type: 'string', description: 'the output of ls -A, verbatim' },
  },
  required: ['empty', 'listing'],
}

const WRITTEN_SCHEMA = {
  type: 'object',
  properties: {
    written: { type: 'boolean', description: 'the file exists with the content asked' },
    bytes: { type: 'integer', description: 'its size, from wc -c' },
  },
  required: ['written', 'bytes'],
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
    output: { type: 'string', description: 'the output of the last run, verbatim, every line' },
    fixes: { type: 'array', items: { type: 'string' }, description: 'form fixes applied, one line each: file, what, which failure' },
    left: { type: 'array', items: { type: 'string' }, description: 'failures in the target folder not fixed because the fix would change what the text says, with why' },
  },
  required: ['output', 'fixes', 'left'],
}

const ROW = {
  type: 'object',
  properties: {
    source: { type: 'string', enum: ['CF', 'SF', 'MDX', 'ASTRO'] },
    item: { type: 'string', description: 'the old section or item (a heading, a frontmatter key, a component, a row), short' },
    where: { type: 'string', description: 'where it is now: file and section (concept.md « 2c1 … », frontmatter stances.school), course.yaml, or "none"' },
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
const scope = await agent(`${role()}

Locate the inputs of the migration of concept ${CONCEPT} of the course ${A.course}.
- ${DEST}course.yaml: the concept entry whose number is "${CONCEPT}" (copy it whole), and the spec it \
declares (field spec: linear-course@1 is the spec linear-course).
- The old concept file ${FROM}course/concepts/${NN}-*.md, the old sources file \
${FROM}course/sources/${NN}-*.md, the site page ${SITE}src/content/concepts/fr/${NN}-*.mdx.
- The diagram components the MDX imports (its import lines under components/schemas/), and every \
use of each in the MDX: one item per distinct variant prop, with the legende of its <Figure> and the \
section that holds it.
- The MDX <h4 id> that are not sub-concept ids of the course.yaml entry.
- The listing of the target: with <path> the dir of the course.yaml entry under ${DEST} \
(${DEST}concepts/${NN}-<slug>), run the one command line "ls -ld <path>; ls -la <path>" and return \
its output verbatim, every line, errors included (when the folder does not exist, both commands print \
an error). Do not summarise it. The target is not an input: whether it exists or not, it never goes \
under missing.
- The working directory: run pwd and return its output verbatim.
- The repository root: run the one command "ls -ld ${DEST_ROOT ? `${DEST_ROOT}specs` : '"$(pwd)/specs"'}" and return its \
output verbatim, errors included.

Stem rule (M11): a named component gives its name in lowercase words joined by hyphens (Escalier: \
escalier, CoutDuRetard: cout-du-retard); a numbered one (Schema13, SchemaA1, Schema16Prevision, any \
variant) gives two to four words of its <title> (the variant's), lowercase ASCII without accents, \
joined by hyphens; stems are unique in the concept.
Modify no file.`,
  { label: 'scope', schema: SCOPE_SCHEMA, model: 'sonnet', effort: 'low' })

if (!scope) throw new Error('Scope agent returned nothing')
// The target folder is not an input: the first run of concept 2 (wf_415d3d2a-1d2) stopped here on a
// missing item "target folder … does not exist" (#178). The target's mention is dropped from an item:
// the course.yaml dir (concepts/NN-slug), after dest, courses/<course>/, the start or a space or quote,
// and not followed by .md or .mdx, so that an old file (course/concepts/NN-slug.md) is never taken for it.
// The item is ignored only when what is left names no other path or file: an item naming the target
// and a real missing input still stops the run.
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const dirGiven = String(scope.dir || '').replace(/^courses\/[^/]+\//, '').replace(/\/$/, '')
const dirValid = new RegExp(`^concepts/${NN}-[a-z0-9]+(-[a-z0-9]+)*$`).test(dirGiven)
const TARGET_NAMED = `(?:^|[\\s'"«\`(:]|${esc(DEST)}|(?:/[^\\s'"«»\`()]*/)?${esc(`courses/${A.course}/`)})${esc(dirGiven)}(?=$|/|\\.(?:\\s|$)|[^\\w.-])`
const namesTarget = m => {
  if (!dirValid || !new RegExp(TARGET_NAMED).test(m)) return false
  const rest = m.replace(new RegExp(TARGET_NAMED, 'g'), ' ')
  return !/[\w.-]\/[\w.-]|\.(mdx?|astro|ya?ml)\b/.test(rest)
}
const missingInputs = scope.missing.filter(m => !namesTarget(m))
if (missingInputs.length < scope.missing.length) log(`Ignored as missing (the target is not an input): ${scope.missing.filter(namesTarget).join('; ')}`)
if (missingInputs.length) throw new Error(`Inputs missing: ${missingInputs.join('; ')}`)
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(scope.spec)) throw new Error(`Unexpected spec name: ${scope.spec}`)
// The root (#178): from an absolute dest (DEST_ROOT), else the working directory (pwd, absolute, not /).
// The spec, its templates, the glossary, S1-08.md and the check command are given from it.
const cwd = String(scope.cwd ?? '').trim()
if (!/^\/[^\n]*$/.test(cwd) || cwd === '/' || /\/\.\.?(\/|$)/.test(cwd)) throw new Error(`The working directory "${cwd}" is not an absolute path other than / (pwd): rerun the workflow (resume) to retry the scope step`)
ROOT = DEST_ROOT || cwd.replace(/\/?$/, '/')
const rootLine = String(scope.root_listing ?? '').trim().split('\n')[0].trim()
if (!/^d/.test(rootLine) || !(rootLine.endsWith(` ${ROOT}specs`) || rootLine.endsWith(` ${ROOT}specs/`))) throw new Error(`The repository root ${ROOT} shows no specs/ folder (ls -ld: ${JSON.stringify(scope.root_listing)}): pass args.dest as <repository>/courses/${A.course}, or run from the repository root`)
if (DEST_ROOT && DEST_ROOT !== cwd.replace(/\/?$/, '/')) log(`Repository root from args.dest: ${ROOT} (the working directory is ${cwd})`)
if (DEST.startsWith('/') && !DEST_ROOT) log(`args.dest ${DEST} is outside a repository: the spec, the glossary and the checks are taken from the working directory ${ROOT}`)
const ROLE = role(), BLIND = blind(), MAP = mapRules()
// built here, not taken from an agent: the checks and the spec are the ones of the run's root
const SPEC_DIR = `specs/${scope.spec}/`
const DIR = String(scope.dir).replace(/^courses\/[^/]+\//, '').replace(/\/?$/, '/')
// the target is emptied below: its path is checked here, never trusted from the scope agent
if (!new RegExp(`^concepts/${NN}-[a-z0-9]+(-[a-z0-9]+)*/$`).test(DIR)) throw new Error(`Refused concept dir "${scope.dir}": expected concepts/${NN}-<slug>`)
const TARGET = `${DEST}${DIR}`
if (TARGET === DEST || !TARGET.startsWith(`${DEST}concepts/`) || TARGET.length <= `${DEST}concepts/`.length) throw new Error(`Refused target ${TARGET}: not strictly under ${DEST}concepts/`)
const stems = scope.diagrams.map(d => d.stem)
for (const st of stems) if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(st)) throw new Error(`Refused SVG stem "${st}": lowercase ASCII words joined by hyphens`)
if (new Set(stems).size !== stems.length) throw new Error(`SVG stems not unique: ${stems.join(', ')}`)
// Whether the target holds files is read here from the listing the scope agent returns (ls -la), not
// taken as its yes or no: the first run of concept 0 (wf_18b79caf-82d) stopped on a scope agent that
// said an absent folder held files (#170). The report shows the listing.
// The listing is "ls -ld <target>; ls -la <target>": the first line names the folder listed, so the
// script checks it is this target. Absent: the errors of ls, naming the target. Present: the ls -ld
// line of a folder ending with the target path, then "total", "." and ".." for an empty folder;
// anything else that ls -l prints for an entry is a file. A listing that is neither stops the run.
function listedFiles(listing) {
  const T = TARGET.replace(/\/$/, '')
  const lines = String(listing ?? '').split('\n').map(l => l.trim()).filter(Boolean)
  if (lines.length && lines.every(l => /No such file or directory/.test(l))) return lines.every(l => l.includes(T)) ? { exists: false, files: [] } : null
  if (!lines.length || !/^d/.test(lines[0]) || !(lines[0].endsWith(` ${T}`) || lines[0].endsWith(`/${T}`) || lines[0].endsWith(`${T}/`))) return null
  const rest = lines.slice(1)
  const entries = rest.filter(l => /^[-dlbcpsD][-rwxsStT]{9}/.test(l))
  const other = rest.filter(l => !entries.includes(l) && !/^total \d+$/.test(l))
  if (!entries.length || other.length) return null
  return { exists: true, files: entries.filter(l => !/\s\.\.?$/.test(l)) }
}
const listed = listedFiles(scope.target_listing)
if (!listed) throw new Error(`The listing of ${TARGET} reads as neither an ls -la output nor its "No such file or directory": ${JSON.stringify(scope.target_listing)}. Rerun the workflow (resume) to retry the scope step`)
const targetHeldFiles = listed.files.length > 0
if (targetHeldFiles && !A.overwrite) throw new Error(`${TARGET} holds files (ls -la: ${listed.files.join('; ')}): pass args.overwrite to replace them, or args.dest to write elsewhere`)
if (targetHeldFiles) {
  const emptied = await agent(`Empty the folder ${TARGET}: delete every file and folder inside it, and \
nothing outside it (for example: find ${TARGET} -mindepth 1 -delete). Do not use git. Then list it \
(ls -A ${TARGET}) and return whether it is empty, and the listing verbatim.`,
    { label: 'empty-target', phase: 'Scope', schema: EMPTY_SCHEMA, model: 'sonnet', effort: 'low' })
  // ls -A of an empty folder prints nothing: the listing, not the agent's yes, decides
  if (!emptied || !emptied.empty || String(emptied.listing).trim()) throw new Error(`${TARGET} could not be emptied: ${emptied ? emptied.listing : 'no answer'}`)
  log(`${TARGET} emptied (args.overwrite)`)
}
log(`Concept ${CONCEPT}: ${scope.concept_file}, ${scope.sources_file}, ${scope.mdx_file}, ${scope.diagrams.length} diagram(s); writing ${TARGET}`)
if (scope.unlisted_h4.length) log(`MDX sub-headings not in course.yaml (rule M5, paragraphs): ${scope.unlisted_h4.join(', ')}`)

const INPUTS = `Inputs (read them on disk):
- CF, the old concept file: ${scope.concept_file}
- SF, the old sources file: ${scope.sources_file}
- MDX, the site page: ${scope.mdx_file}
- ASTRO, the diagram components: ${[...new Set(scope.diagrams.map(d => d.component))].join(', ') || '(none)'}
- the course.yaml entry: ${scope.course_entry}
- the spec: ${ROOT}${SPEC_DIR}SPEC.md (sections 4 and 7), the templates in ${ROOT}${SPEC_DIR}templates/
- the repository glossary: ${ROOT}docs/glossary.md
- the course decisions, for rule M10's old decision numbers only: ${DEST}decisions/ (if it exists)
Target concept folder: ${TARGET}

${MAP}`

const CHECK_CMD = `mise exec -- ${ROOT}${SPEC_DIR}checks/check-course ${DEST.replace(/\/$/, '')} --only ${CONCEPT_CHECKS} --concept ${CONCEPT}${A.langDir ? ` --lang-dir ${A.langDir}` : ''}`

// --- Write -----------------------------------------------------------------------------

phase('Write')
const [drawnDiagrams, teachingAndSources] = await parallel([
  async () => {
    const drawn = await parallel(scope.diagrams.map(d => () => agent(`${ROLE} ${BLIND}

${INPUTS}

Convert one diagram by rule M11: the component ${d.component}${d.variant ? `, variant ${d.variant} only` : ''}, \
into ${TARGET}${d.stem}.svg. Its Figure legende: « ${d.legende} ». It stands in: ${d.place}. Follow the \
drawing contract of SPEC.md section 7 to the letter; \
check the file is well-formed (xmllint --noout). Write only that file.
Read SPEC.md section 7.2 whole (the classes, the inks, the common forms, the measures): the style of \
every diagram of the course.
The colour table of the course, fixed for every concept (M11): ${TABLE_TEXT}. Draw each element of a \
token with that token's class and opacity (fill-opacity for a fill, stroke-opacity for a stroke), \
never another pair; do not decide a mapping of your own. A token this drawing draws with that the \
table lacks: stop and return it in tokens, without inventing a pair.
A label in --sch-s-ink stands on a fill: the form label on a fill of SPEC.md 7.2, the fill one <path> \
with fill-rule="evenodd" and the fill's own ink, its outline then a rectangle around the label (a \
circle on a disc), the fill left as a border 6 units wide or more all round, or as wide as fits and \
at least 2 units where 6 do not fit (a loss to record); the label inside, at its place, size and \
weight, fill="currentColor", no class, no opacity attribute. Never a filter, a mask, knocked-out \
text, or an outline in place of the fill. Record the loss in losses.
An opacity the component sets on an individual element or class beyond its token's colour (a class \
at 0.7 and another at 0.45 on the same token, opacity="0.5" on a rect): keep it as that element's \
opacity attribute, on top of the token's pair; never fold it into the pair, never drop it. The \
opacity of a hatch's lines (.hatch-line) goes on the dashed outline that replaces the hatch, as that \
outline's opacity. A contrast ink drawn as a gap has no element left: its opacity is a loss. Return \
each one kept in element_opacities, naming the element that carries it in the SVG.
Return its frontmatter entry, its group ids, the old colour tokens it draws with, the element \
opacities kept, and the losses (not the colour table: the report lists it once).`,
      { label: `diagram:${d.stem}`, phase: 'Write', schema: DIAGRAM_SCHEMA })))
    return drawn
  },
  () => agent(`${ROLE} ${BLIND}

${INPUTS}

Write ${TARGET}teaching.md by rule M9 and ${TARGET}sources.md by rule M10 (and M13 for both). Copy the \
old texts as they are; change only what a rule names. « Consignes » adds nothing to the old \
« Sous-concepts » but, when a case of the bank is not cited there by its title, the one citation line \
of M9 (ruling B on #23), in its exact form: no « Poser », no « puis », no other sentence. Write only \
those two files. Return the files and every choice a rule left you (the citation line among them).`,
    { label: 'teaching+sources', phase: 'Write', schema: WRITE_SCHEMA }),
])

const diagramEntries = (drawnDiagrams || []).filter(Boolean)
if (diagramEntries.length < scope.diagrams.length) throw new Error(`${scope.diagrams.length - diagramEntries.length} diagram(s) not converted: see the workflow log`)
diagramEntries.forEach((e, i) => { if (e.file !== `${stems[i]}.svg`) throw new Error(`Diagram ${stems[i]} returned the file ${e.file}`) })
const tableTokens = new Set(COLOUR_TABLE.map(r => r.token))
for (const e of diagramEntries) {
  e.tokens = [...new Set(e.tokens.map(tableToken))]
  const unmapped = e.tokens.filter(t => !tableTokens.has(t))
  if (unmapped.length) throw new Error(`${e.file} draws with ${unmapped.join(', ')}, which the colour table of the course lacks (COLOUR_TABLE, M11): give the token an ink of SPEC.md 7.2 in the table through an issue, then rerun`)
  // element opacities are kept as the element's opacity attribute (M11, maintainer's ruling of 2026-10-28)
  for (const o of e.element_opacities) if (!(o.opacity > 0 && o.opacity <= 1)) throw new Error(`${e.file}: element opacity ${o.opacity} on ${o.element}, expected above 0 and at most 1`)
}
if (!teachingAndSources) throw new Error('teaching.md and sources.md not written: see the workflow log')

const conceptWritten = await agent(`${ROLE} ${BLIND}

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
and no other source-column change; a filter, mask or colour attribute the contract forbids around a \
label: the form label on a fill of SPEC.md 7.2, never an outline in place of a fill); \
leave it when the fix would change what the text says, and say why. Rerun after fixing, at most three \
runs in all. A failure in a file outside ${TARGET} is not yours: leave it. Return the last output \
verbatim, every line: the verdict is read from it.`,
  { label: 'checks', phase: 'Checks', schema: CHECKS_SCHEMA, model: 'sonnet' })
if (!checks) throw new Error('Checks agent returned nothing')
// The verdict is read from the output, line by line ("<id>: ok" or "<id>: fail: <file>:<line> <message>").
// A per-concept check that fails fails the run, whatever the file (a broken language pack is reported
// against course.yaml). A course-yaml or typography failure is excused only when it names neither this
// concept nor the language pack; a check with no line at all fails the run.
const PER_CONCEPT = ['concept-folder', 'conventions', 'svg-contract', 'sources', 'glossary-order']
const checkLines = checks.output.split('\n').map(l => l.trim()).filter(Boolean)
const blocking = [], excused = []
for (const id of CONCEPT_CHECKS.split(',')) {
  const mine = checkLines.filter(l => l.startsWith(`${id}: `))
  if (!mine.length) { blocking.push(`${id}: no line in the output`); continue }
  for (const l of mine.filter(l => l.startsWith(`${id}: fail`))) {
    const namesThis = l.includes(DIR.replace(/\/$/, '')) || new RegExp(`\\bconcepts? ${CONCEPT}\\b`).test(l) || /language pack|lang\//.test(l)
    if (PER_CONCEPT.includes(id) || namesThis) blocking.push(l)
    else excused.push(l)
  }
}
const checksPassed = !blocking.length
log(`Checks: ${checksPassed ? 'pass' : 'fail'}${checks.fixes.length ? `, ${checks.fixes.length} form fix(es)` : ''}${excused.length ? `, ${excused.length} failure(s) outside the concept excused` : ''}`)

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
replaced) or lost (an id removed). An old path M10 rewrites to its path in the course folder, and a \
pointer with no new path that M10 drops from the intro or « Non vérifié », are not a change of \
sourcing: they are moved, the detail giving the old and the new text.
${diagramEntries.length ? `The colours of the diagrams follow the colour table of the course (M11): ${TABLE_TEXT}.` : ''}`

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
drop no rule names. The citation line of M9 is new text, not an old item: give it no row (the other \
sweep reports it).`,
    { label: 'old-to-new', phase: 'Compare', schema: OLD_SWEEP_SCHEMA }),
  () => agent(`${COMPARE}

New to old. Walk every file of the new folder, sentence by sentence (frontmatter items, body \
sentences, list items, case fields, table rows, SVG texts). For each, find the old text that carries \
it. Report only what is invented: a sentence, a clause, a precision, a reference, a figure or a claim \
that no old file carries, or a rewording that says more or less than the old text. Text that a rule \
produces (a heading from course.yaml, the Nature column of M10, "[cours]" for a pastille, an SVG id) is \
not invented when it follows the rule. Compare every source cell of sources.md and every refs list \
of the frontmatter with the old one, id by id, and report each added or replaced id, and each \
replaced no-source word, that is not the orphan case of M10. Report also every line of « Consignes » \
that the old « Sous-concepts » does not carry, the citation line of M9 included, as one row each, its \
text quoted whole and exact, section « Consignes »: the script counts a line in the exact form of M9 \
by design (ruling B on #23), any other as invented. Return an empty list when nothing is invented.`,
    { label: 'new-to-old', phase: 'Compare', schema: NEW_SWEEP_SCHEMA }),
])
if (!oldSweep || !newSweep) throw new Error('A comparison sweep returned nothing: rerun the workflow (resume) to retry it')

// Ruling B on #23 (M9): one citation line of case titles in « Consignes », in the exact form, is by design,
// never invented (#178). Decided here from the form, not on an agent's word: the first row of the new-to-old
// sweep in teaching.md « Consignes » whose text is that line becomes a by-design row of the old-to-new
// table; a second such line, or a line in any other form (« Poser « … », puis « … ». »), stays invented.
const CASE_TITLE = '«\\s*(?:[^«»]|«[^«»]*»)+?\\s*»'
const CITE_GROUP = `pour [A-Za-z0-9]+, ${CASE_TITLE}(?:, ${CASE_TITLE})*(?: et ${CASE_TITLE})?`
const CITATION_LINE = new RegExp(`^Cas de la banque : ${CITE_GROUP}(?: ; ${CITE_GROUP})*\\.$`)
const unquote = t => { const s = String(t ?? '').trim().replace(/^[`"“]+|[`"”]+$/g, '').trim(); const m = /^«\s*(Cas de la banque .*»\.)\s*»$/.exec(s); return m ? m[1] : s }
const citationAt = newSweep.rows.findIndex(r => /teaching\.md/.test(r.file) && /Consignes/.test(r.section) && CITATION_LINE.test(unquote(r.text)))
if (citationAt >= 0) {
  const line = unquote(newSweep.rows[citationAt].text)
  oldSweep.rows.push({ source: 'CF', item: '« Sous-concepts »: the cases it does not cite by title', where: 'teaching.md « Consignes », citation line', verdict: 'by design', rule: 'M9', detail: `ruling B on #23: ${line}` })
  newSweep.rows.splice(citationAt, 1)
  log('« Consignes »: the citation line of M9 counted by design (ruling B on #23)')
}
const lostRows = oldSweep.rows.map((r, row) => ({ row, ...r })).filter(r => r.verdict === 'lost').map((r, i) => ({ id: `L${i + 1}`, ...r }))
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
a nuance not retained; or when it is an old path M10 rewrites or a pointer it drops.

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

const plain = s => String(s ?? '').replace(/\s*(->|=>|\u2192)\s*/g, ': ')
const cell = s => plain(s).replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ')
const count = v => oldSweep.rows.filter(r => r.verdict === v).length
// The report is merged into the repository and read after the run's dest (a contributor worktree) is
// gone (#170). Guaranteed: the rendered report holds no absolute path; one left stops the run. On the
// whole rendered text, agent texts included (rows, choices, check output, listing):
// 1. the run's own absolute args are replaced as literal text, wherever they stand: args.dest/ by
//    nothing (paths relative to the course folder, concepts/NN-slug/...), args.dest itself by
//    courses/<course>; args.from and args.site by their repository folder (parcours-po/course/...);
//    args.langDir by its specs/... tail; the run's working directory (ROOT, the scope agent's pwd) by
//    nothing (paths relative to the repository root: specs/..., docs/...);
// 2. any other absolute path (after any non-word character, under a usual root or a root of the run's
//    own absolute args): under courses/ or a repository folder, relative to the repository root
//    (courses/..., specs/...), the old repositories by their folder; anything else "<absolute path>";
// 3. a path under courses/<course>/, and a relative args.dest, from or site, as in 1.
const lastPart = p => p.replace(/\/$/, '').split('/').pop()
const absArgs = [DEST, FROM, SITE, ROOT, A.langDir ? String(A.langDir) : ''].filter(p => p.startsWith('/'))
const ROOTS = [...new Set(['Users', 'private', 'tmp', 'home', 'var', 'Volumes', 'opt', 'root', 'workspace', 'workspaces', 'mnt', 'srv', ...absArgs.map(p => p.split('/')[1]).filter(Boolean)])]
  .map(r => r.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
const ABS_PATH = `(^|[^\\w./~-])(\\/(?:${ROOTS.join('|')})(?:\\/[^\\s\`'"()\\[\\]{}|<>»,;*]*)?)`
const literal = [
  [DEST, ''], [DEST.replace(/\/$/, ''), `courses/${A.course}`],
  [FROM, `${lastPart(FROM)}/`], [FROM.replace(/\/$/, ''), lastPart(FROM)],
  [SITE, `${lastPart(SITE)}/`], [SITE.replace(/\/$/, ''), lastPart(SITE)],
  ...(A.langDir ? [[String(A.langDir), String(A.langDir).match(/\/(specs\/.*)$/)?.[1] ?? '<langDir>']] : []),
  [ROOT, ''],
]
const absLiteral = literal.filter(([p]) => p.startsWith('/')).sort((a, b) => b[0].length - a[0].length)
// relative args: the folder itself (no slash) is left as written (the check command names it)
const relLiteral = [...literal.filter(([p]) => p.endsWith('/')), [`courses/${A.course}/`, '']]
  .filter(([p]) => !p.startsWith('/')).sort((a, b) => b[0].length - a[0].length)
function toRel(p) {
  let m = p.match(/\/(courses\/.*)$/)
  if (m) return m[1]
  for (const repo of [lastPart(SITE), lastPart(FROM)]) { const i = p.indexOf(`/${repo}/`); if (i >= 0) return p.slice(i + 1) }
  m = p.match(/\/((?:specs|construction|docs|site|teacher|\.claude)\/.*)$/)
  return m ? m[1] : '<absolute path>'
}
function relPaths(text) {
  let t = absLiteral.reduce((acc, [abs, shown]) => acc.split(abs).join(shown), text)
  t = t.replace(new RegExp(ABS_PATH, 'g'), (all, pre, p) => pre + toRel(p))
  t = relLiteral.reduce((acc, [rel, shown]) => acc.split(rel).join(shown), t)
  const left = t.match(new RegExp(ABS_PATH))
  if (left) throw new Error(`The report still holds an absolute path: ${left[2]}`)
  return t
}
const failed = !checksPassed || ((lostLeft.length || inventedLeft.length) && !A.accept)

function renderReport() {
  const out = []
  out.push(`# Migration report: concept ${CONCEPT}`, '')
  out.push(`Workflow \`migrate-concept\`, course \`${A.course}\`, concept folder \`${DIR}\`. Paths in the course folder are relative to it; the old files are named from their repository folder (\`${lastPart(FROM)}\`, \`${lastPart(SITE)}\`).`)
  out.push(`Old files: \`${scope.concept_file}\` (CF), \`${scope.sources_file}\` (SF), \`${scope.mdx_file}\` (MDX)${scope.diagrams.length ? `, ${[...new Set(scope.diagrams.map(d => `\`${d.component}\``))].join(', ')} (ASTRO)` : ''}.`, '')
  out.push('## Summary', '')
  out.push('| kept | moved | by design | lost | invented | refuted | checks | target existed | accepted |')
  out.push('|---|---|---|---|---|---|---|---|---|')
  out.push(`| ${count('kept')} | ${count('moved')} | ${count('by design')} | ${lostLeft.length} | ${inventedLeft.length} | ${lostRows.length + inventedRows.length - lostLeft.length - inventedLeft.length} | ${checksPassed ? 'pass' : 'fail'} | ${targetHeldFiles ? 'yes, emptied' : 'no'} | ${A.accept ? 'yes' : 'no'} |`, '')
  out.push(`Result: **${failed ? 'failed' : (lostLeft.length || inventedLeft.length) ? 'passed, accepted' : 'passed'}**. lost and invented count the rows confirmed by the verification; the rows it refuted (refuted) are listed at the end and count in no other column. checks is read in code from the output below, which the check agent returns; target existed is read in code from the listing below, which the scope agent returns.`, '')
  out.push('## Target before the run', '')
  out.push(`\`ls -ld ${DIR.replace(/\/$/, '')}; ls -la ${DIR.replace(/\/$/, '')}\`, as the scope agent returned it: ${!listed.exists ? 'no such folder' : targetHeldFiles ? `${listed.files.length} entr${listed.files.length === 1 ? 'y' : 'ies'}, emptied (args.overwrite)` : 'an empty folder'}.`, '', '```', String(scope.target_listing).trim(), '```', '')
  for (const src of ['CF', 'SF', 'MDX', 'ASTRO']) {
    const rows = oldSweep.rows.filter(r => r.source === src)
    if (!rows.length) continue
    out.push(`## ${src}: old to new`, '')
    out.push('| Old item | Where it is now | Verdict | Rule | Detail |', '|---|---|---|---|---|')
    for (const r of rows) {  // rows are the oldSweep.rows objects themselves: indexOf finds them
      const flagged = lostRows.find(l => l.row === oldSweep.rows.indexOf(r))
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
  out.push('', '## Colour table (M11)', '')
  if (!diagramEntries.length) out.push('No diagram.')
  else {
    out.push('The colour table of the course, fixed in the workflow, the same for every concept: one ink of SPEC.md 7.2 per old colour token.', '')
    out.push('| Token | Ink | Class | Opacity | Draws (old site) | Diagrams |', '|---|---|---|---|---|---|')
    for (const r of COLOUR_TABLE) {
      const contrast = r.ink === CONTRAST_INK
      out.push(`| \`${r.token}\` | ${r.ink} | ${contrast ? 'none' : INKS[r.ink][0]} | ${contrast ? 'none' : INKS[r.ink][1]} | ${cell(r.draws)} | ${diagramEntries.filter(d => d.tokens.includes(r.token)).map(d => d.file).join(', ') || 'none'} |`)
    }
  }
  out.push('', '## Writing choices', '')
  const choices = [...teachingAndSources.choices, ...conceptWritten.choices, ...diagramEntries.flatMap(d => d.element_opacities.map(o => `${d.file}: element opacity ${o.opacity} kept on ${o.element} (M11)`)), ...diagramEntries.flatMap(d => d.losses.map(l => `${d.file}: ${l} (M11)`))]
  out.push(...(choices.length ? choices.map(c => `- ${plain(c)}`) : ['None.']))
  out.push('', '## Checks', '')
  out.push(`\`${CHECK_CMD}\``, '', '```', checks.output.trim(), '```')
  if (checks.fixes.length) out.push('', 'Form fixes:', ...checks.fixes.map(f => `- ${f}`))
  if (checks.left.length) out.push('', 'Left:', ...checks.left.map(f => `- ${f}`))
  if (blocking.length) out.push('', 'Failing the run:', ...blocking.map(f => `- ${f}`))
  if (excused.length) out.push('', 'Outside the concept, excused (names neither this concept nor the language pack):', ...excused.map(f => `- ${f}`))
  out.push('')
  return relPaths(out.join('\n'))
}

const report = renderReport()
const written = await agent(`Write the file ${REPORT} with exactly the content between the two markers below (the markers \
excluded), byte for byte, creating its folder if needed. Do not use git. Then run wc -c on it and return \
whether it is written and its size.
-----BEGIN REPORT-----
${report}
-----END REPORT-----`,
  { label: 'report', phase: 'Compare', schema: WRITTEN_SCHEMA, model: 'sonnet', effort: 'low' })
const utf8Length = str => { let n = 0; for (const ch of str) { const c = ch.codePointAt(0); n += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4 } return n }
// one byte of slack: a final newline added or dropped by the writing tool
if (!written || !written.written || Math.abs(written.bytes - utf8Length(report)) > 1) throw new Error(`The report ${REPORT} was not written as rendered (${written ? written.bytes : 'no'} bytes, ${utf8Length(report)} expected): the run's result is in the workflow log`)

const summary = { concept: CONCEPT, folder: TARGET, report: REPORT, checks: checksPassed ? 'pass' : 'fail', kept: count('kept'), moved: count('moved'), by_design: count('by design'), lost: lostLeft.length, invented: inventedLeft.length, target_existed: targetHeldFiles, accepted: !!A.accept }
log(`Report: ${REPORT}; ${JSON.stringify(summary)}`)
if (failed) throw new Error(`migrate-concept failed for concept ${CONCEPT}: ${!checksPassed ? 'checks fail; ' : ''}${lostLeft.length} lost, ${inventedLeft.length} invented${A.accept ? ' (accepted)' : ''}. Report: ${REPORT}`)
return summary
