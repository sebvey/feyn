export const meta = {
  name: 'feyn-migrate-concept-workflow',
  description: 'Migrate one concept of a frozen parcours-po course into a linear-course concept folder, check it, and report its diagrams and checks for the review',
  whenToUse: 'Stage 1 only (S1-10): the maintainer asks to migrate concept N of a course from the frozen repositories. args: { course: "<course id>", concept: "<number as in course.yaml: 9, A1>", from?: "<frozen course repo, default ../pdx/parcours-po>", site?: "<frozen site repo, default ../pdx/parcours-po-website>", dest?: "<course folder written into, default courses/<course>>", report?: "<report path, default construction/notes/S1-10-<NN>-report.md>", langDir?: "<language pack dir passed to check-course>", overwrite?: true }. dest is a full course folder (course.yaml, plan.md, glossary.md, domains/…), a copy when not courses/<course>; overwrite empties the target concept folder first. The PNGs of the old and new diagrams go to the folder named after the report (its path without .md). The defaults of from and site are relative to the working directory: a run from a worktree or a copy passes absolute paths.',
  phases: [
    { title: 'Scope', detail: 'finds the old files, the course.yaml entry, the target folder and its listing' },
    { title: 'Inventory', detail: 'what each old diagram shows, grouped by idea; teaching.md and sources.md' },
    { title: 'Write', detail: 'concept.md and its frontmatter diagrams checked, then one diagram per idea, drawn blind from its inventory and concept.md' },
    { title: 'Checks', detail: 'check-course on the concept, form fixes only' },
    { title: 'Report', detail: 'the old and new diagrams rendered, the report written: scope, inventories, caption flags, checks' },
  ],
}

// migrate-concept: one concept of the frozen parcours-po (concept file, sources file, site MDX,
// Astro diagram components) becomes one concept folder of SPEC.md section 4, by the closed list of
// mapping rules MAP below (taken from the S1-02 prototype and the rulings on #97, #98 and #23).
// Steps: Scope locates the old files and lists the target (ls -la), and refuses a target whose listing
// shows files (args.overwrite empties it); Inventory lists what each old diagram shows, grouped by idea
// (M11, #181), while teaching.md and sources.md are written; Write, blind to any other copy of the
// concept (BLIND), writes concept.md, then draws one SVG per idea from its inventory and concept.md only
// (DRAW_ROLE: the drawing agent is given no path of the old repositories, decision one-diagram-style);
// Checks runs check-course --only the per-concept checks --concept N, fixes form only; Report renders the
// old and new diagrams as PNGs and writes the report in the fixed format of renderReport(). No comparison
// with the old course (rule D on #23, #184): the fresh-agent review judges the new concept against
// SPEC.md and PROTOCOL.md, reading the old concept once. Fails on a check failing for this concept. Old
// repos read only; paths: cwd-relative or absolute.
// Decided in code, not on an agent's word: the target path, the SVG stems (format, uniqueness), whether
// the target holds files (read from the listing, which the report shows), the frontmatter entries of the
// diagrams (from the inventory: each caption the legende's sentences of its idea that go to the caption,
// the legende checked whole; then read back from concept.md as written and compared), an inventory free of
// the old drawing's forms (OLD_FORM) and of states no word says, a caption of more than one sentence
// flagged, the checks verdict, a missing item naming the target ignored, the repository root (from an
// absolute dest, else pwd; the agents get the spec and the glossary under it, #178), the report. The
// report names paths relative to the course folder (concepts/NN-slug/...) and the old repositories by
// their folder name: never the absolute paths of args.dest, args.from or args.site (#170).

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
// after the scope step, so that the writers, the drawings and the checks read the spec, its
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

// The diagrams (M11, #181): never transcribed. An inventory agent reads the old component and the concept
// text and lists what the diagram shows, grouped by idea; a drawing agent draws one SVG per idea under
// SPEC.md section 7.2 from that inventory and concept.md alone; the fresh-agent review judges the result.
// The maintainer stopped the transcription on 2026-10-28: the old site drew one hue at three strengths,
// now for a series, now for a contrast, so no table maps its colours (first draft of #181, PR #182).
// The drawing agent's blindness rests on its prompt, not on a sandbox: the prompt (DRAW_ROLE, drawPrompt)
// names no path of the old repositories and forbids reading any file but concept.md, the spec and the
// glossary; the run's transcripts show what each drawing agent read (wf_90327be3-efc: those three and its
// own SVG). The inventory it gets is refused when it names how the old diagram is drawn (OLD_FORM: a colour
// value or variable, markup, a presentation attribute, a coordinate), when it gives a state that no word
// says (a state read from a line style alone: the dashed outlines of PartRecoupee became « pas fait »,
// review of PR #182), or when a legende sentence it gives to the title is not in that title; the inventory
// agent is asked once more, then the run stops.
const ROLES = ['subject', 'series', 'contrast', 'context', 'text']
const STATES = ['', 'done', 'not done', 'uncertain', 'refused']
// where a sentence of the old legende goes (maintainer's answer of 2026-10-28 on PR #182): the caption keeps
// the sentences that carry the idea; a sentence that names the diagram goes to its title, one that tells how
// to read it to its labels
const CAPTION_TO = ['caption', 'title', 'labels']
const OLD_FORM = /(?:^|[^\w-])--[a-z][\w-]*|<\/?[a-z][\w:-]*[\s/>]|#[0-9a-f]{3}(?:[0-9a-f]{3})?\b|\b(?:rgba?|hsla?)\(|\.astro\b|\bviewBox\b|\b(?:fill|stroke)(?:-opacity|-width|-dasharray)?\b|\bopacity\b|\b(?:x|y|x1|y1|x2|y2|cx|cy|r|rx|ry|width|height|transform|font-size|font-weight)\s*=/i
const oldForms = v => {
  const t = JSON.stringify({ ...v, caption_sentences: undefined })
  return [...new Set((t.match(new RegExp(OLD_FORM.source, 'gi')) || []).map(s => s.replace(/^[^-\w<#.]/, '').trim()))]
}
const STEM_RULE = `a diagram not split: a named component gives its name in lowercase words joined by hyphens \
(Escalier: escalier, CoutDuRetard: cout-du-retard), a numbered one (Schema13, SchemaA1, Schema16Prevision, \
any variant) two to four words of its <title>; a diagram split by idea: two to four words of each idea's \
title; lowercase ASCII without accents, joined by hyphens; stems are unique in the concept`
const GROUP_RULE = `Groups "<sub-concept>-<element>", never a bare sub-concept id, the sub-concept being the \
leaf the part illustrates (2c1-etapes, not 2c-etapes): the leaf whose reader text explains what that part \
shows, which may differ from the diagram's subconcept (labels naming the techniques a later leaf teaches \
take that later leaf); group ids are unique across the concept's diagrams`
// How a diagram is drawn, given to the drawing agent and restated in M11 for the other agents
const DRAW_RULES = `Draw under SPEC.md section 7 to the letter: 7.1 the contract (the check svg-contract), \
7.2 the style (the meaning of the classes and the six principles). Each element of the inventory takes the \
rendering of its role (7.2, principle 3), a state its form; in one colour nothing is more marked than the \
subject, and the contrast differs from it by opacity or form, never by hue alone. Text is \`muted\`; \
\`primary\` only for the words of the subject; never \`secondary\`, not even a label of the contrast. Every \
element, relation and label of the inventory is drawn, each label verbatim (straight apostrophe '). A key \
(a sample and its words) only when a distinction of form or opacity must be named: the inventory's key, \
or a key whose words come only from the inventory (a label, a key entry, a state's words) or from \
concept.md, never words of your own (a key word nowhere in them is invented). No teaching sentence (the \
caption is said beside the diagram, never drawn in it). The composition is yours, under 7.2 principle 5: \
nothing of an older drawing of it is to be kept or matched. <title> is the root's first child and equals \
the entry's title; <desc>, optional, in French, describes the drawing; their ids start with the stem. \
${GROUP_RULE}.`

// The mapping, a closed list: every old item has its rule, and the writers cite the rule ids in their choices.
const mapRules = () => `Mapping rules (old file to new folder). Old files: CF the concept file, SF the sources \
file, MDX the site page, ASTRO the diagram components. New folder: the three files of SPEC.md section 4 \
and the SVGs of section 7.

M1 Identity. CF frontmatter and H1, SF frontmatter and H1, MDX numero, titre, prerequis: not written \
in the folder; course.yaml holds them (no H1 in the three files). « Objectif » is the course.yaml \
objective of the concept, verbatim (capital first letter, final period, line breaks free). CF « Objectif » \
and MDX objectif are read against it: both went to course.yaml, where S1-08 merged them \
(${ROOT}construction/notes/S1-08.md, "Objective merge"); a clause of either that the objective does not carry \
and that note does not record is a writing choice to report.
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
becomes its \`![…](<stem>.svg)\` lines at the same place (M6).
M5 Sub-concept sections. <Sous id titre promesse>: "## <id> <title>" then the promise as one paragraph \
entirely in italics. <h4 id> whose id is a leaf of course.yaml: "### <id> <title>". The <title> is the \
course.yaml title (a different MDX titre gives way to it). Reader text unchanged, in MDX order. An <h4> whose \
id course.yaml does not list (ruling on #23): a paragraph of its parent leaf's reader text, led by its \
title in bold. Sections follow course.yaml order (SPEC.md 4.2).
M6 Components. <Renvoi n="4"/>: "concept 4"; n="2c1": "concept 2c1"; consecutive renvois in one \
parenthesis or list: "concepts 2 et 3a"; an annex (n="A2", "A2d"): "annexe A2" as the site printed it, \
plain text. <Pastille kind="cours|ecole|consensus"/>: "[cours]", "[école]", "[consensus]" where the \
pastille stood. <FilRouge>: a blockquote whose first line starts with "**Fil rouge :**". <Figure \
legende> holding a diagram component: one "![<title>](<stem>.svg)" per SVG drawn from it (M11), each \
alone in its paragraph, at the same place, in the order of its ideas; legende: the frontmatter captions \
(M11). <Reflexe note>: « Le test rapide » (M8). <Erreurs>: \
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
No line when the old « Sous-concepts » cites every case. A line in another form, or any other \
sentence added to « Consignes » (« Poser « … », puis « … ». »), breaks this rule. The lead \
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
a writing choice, "orphan [Sx] added". An id the verification column names as a contrast, a source \
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
(old text, new text). The MDX sources texts (the reader paraphrase): by design, only \
their kind is used.
M11 Diagrams. An old diagram (one ASTRO component, one variant per distinct prop value used in MDX, e.g. \
p="a") is not transcribed: it is inventoried and drawn anew (maintainer's \
choice of 2026-10-28 on #181, decision one-diagram-style). The inventory lists what the old diagram \
shows: its elements, labels and relations, the role of each (SPEC.md 7.2: subject, series, contrast, \
context, text), the key if any, grouped by idea, each idea justified by a sentence of the Figure legende \
or of the concept text, quoted (in doubt, one idea); a state (done, not done, uncertain, refused) only \
when words say it (the old diagram's words, its <desc> or the concept text, quoted), never from a line \
style or any other form alone; nothing of how the old diagram is drawn (no colour, opacity, coordinate, \
size, font, shape or layout). Each sentence of the legende goes, verbatim and in order, to one idea and \
to one place (maintainer's answer of 2026-10-28 on PR #182): the caption when it carries the idea; the \
title when it only names the diagram (« Le gâteau en couches. »); the labels when it only tells how to \
read it (« En bas, l'ingestion des données ; en haut, la restitution, ce que voit l'utilisateur. »): each \
of its parts becomes a label of the element it reads, its words in the inventory's labels (« l'ingestion \
des données », « la restitution, ce que voit l'utilisateur »), so that the drawing writes them. A state \
quotes its words (state_words), from the old diagram's <text> or <desc>, CF, MDX or \
concept.md. One SVG per idea, drawn from \
its inventory and the concept text (concept.md) only, never from the old component: its composition, \
geometry and classes are its own. ${DRAW_RULES} Stem: ${STEM_RULE}. Frontmatter diagrams: one entry per \
SVG, set from the inventory: file, title (the old <title>, verbatim, or, when a legende sentence goes to \
the title and the old <title> does not carry it, that sentence without its final period; for a split \
diagram, one line per idea from the old title's words and the concept's words), caption (the legende's \
sentences of its idea that go to the caption, verbatim and in order; an idea with none, its justifying \
sentence), subconcept (the sub-concept the diagram illustrates: the one whose section holds the \
Figure, or for a Figure in « L'essentiel », the first-level sub-concept it draws; for a split diagram, \
its idea's).
M12 By design, nowhere: MDX alignement, import lines, the old drawing of a diagram (its geometry, \
colours, styles and Astro code: M11 draws anew), the \
CF teacher hint of M3, the H1s and frontmatters of M1, the MDX sources texts of M10.
M13 Form. Plain CommonMark under SPEC.md 4.5, no HTML, no MDX, no directive. Banned characters of the \
language pack (French: em-dash, arrows) replaced by the smallest change (comma, colon, a word); each \
replacement is a writing choice. The course writes the straight apostrophe: a typographic one (’) becomes ' in \
every file, SVG text included (form, not a writing choice). Nothing else is reworded: a text the rules do not \
touch is copied as it is.`

const SCOPE_SCHEMA = {
  type: 'object',
  properties: {
    spec: { type: 'string', description: 'the spec course.yaml declares, name and MAJOR as written (linear-course@1)' },
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
          legende: { type: 'string', description: 'the legende of the enclosing <Figure>, verbatim' },
          place: { type: 'string', description: 'where the Figure stands: "essentials" or the id of the <Sous> or <h4> section holding it' },
        },
        required: ['component', 'variant', 'legende', 'place'],
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

const ELEMENT = {
  type: 'object',
  properties: {
    id: { type: 'string', description: 'E1, E2… in the order the idea reads' },
    what: { type: 'string', description: 'what the element is, in the concept\'s words (a notion, a step, an actor, a group of items); never how it was drawn' },
    labels: { type: 'array', items: { type: 'string' }, description: 'the words the old diagram writes on or beside it, verbatim (straight apostrophe), possibly none' },
    role: { type: 'string', enum: ROLES, description: 'its role, SPEC.md 7.2 principle 2: the subject, a level of a series (the subject in levels), the contrast, the context, or text (a heading, a note)' },
    state: { type: 'string', enum: STATES, description: 'the state it says, if any: done, not done, uncertain, refused; empty when no word says one (a line style alone is no state)' },
    state_words: { type: 'string', description: 'the words that say its state, verbatim, from the old diagram, its <desc> or the concept text; empty when state is empty' },
  },
  required: ['id', 'what', 'labels', 'role', 'state', 'state_words'],
}
const INVENTORY_SCHEMA = {
  type: 'object',
  properties: {
    caption_sentences: {
      type: 'array',
      description: 'the Figure legende split into its sentences, verbatim and in order, each with the stem of the idea it goes to and the place it goes to',
      items: {
        type: 'object',
        properties: {
          sentence: { type: 'string' },
          idea: { type: 'string', description: 'the stem of its idea: the stem of one of the ideas returned, copied exactly' },
          to: { type: 'string', enum: CAPTION_TO, description: 'caption: it carries the idea; title: it only names the diagram; labels: it only tells how to read it (M11)' },
        },
        required: ['sentence', 'idea', 'to'],
      },
    },
    ideas: {
      type: 'array',
      description: 'one item per idea the diagram carries; in doubt, one idea',
      items: {
        type: 'object',
        properties: {
          stem: { type: 'string', description: 'stem by rule M11' },
          title: { type: 'string', description: 'the old <title> verbatim, or the legende sentence going to the title that it does not carry; for a split diagram, one line for this idea (M11)' },
          subconcept: { type: 'string', description: 'the sub-concept id this idea illustrates (M11)' },
          justification: { type: 'string', description: 'the sentence of the legende or of the concept text that states this idea, verbatim' },
          stands_in: { type: 'string', description: 'where that sentence stands: the legende, CF « <section> », or the MDX section id' },
          elements: { type: 'array', items: ELEMENT },
          relations: { type: 'array', items: { type: 'string' }, description: 'what links the elements, one line each naming their ids (E2 crosses E1 to E4; E1 to E4 in this order, from … to …); an order that carries meaning included' },
          key: {
            type: 'array',
            description: 'the key of the old diagram for this idea: each entry the element id its sample stands for and its words verbatim; empty when it has none',
            items: { type: 'object', properties: { sample: { type: 'string' }, words: { type: 'string' } }, required: ['sample', 'words'] },
          },
        },
        required: ['stem', 'title', 'subconcept', 'justification', 'stands_in', 'elements', 'relations', 'key'],
      },
    },
  },
  required: ['caption_sentences', 'ideas'],
}

const DRAW_SCHEMA = {
  type: 'object',
  properties: {
    file: { type: 'string', description: 'the file name written (<stem>.svg)' },
    groups: { type: 'array', items: { type: 'string' }, description: 'the group ids of the SVG' },
    key: { type: 'array', items: { type: 'string' }, description: 'the words of each key entry drawn, verbatim; empty when the SVG has no key' },
  },
  required: ['file', 'groups', 'key'],
}

// a command run by an agent: the renderings, the frontmatter diagrams of concept.md as written
const OUTPUT_SCHEMA = {
  type: 'object',
  properties: { output: { type: 'string', description: 'the standard output of the command, verbatim' } },
  required: ['output'],
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
    bytes: { type: 'integer', description: 'its size in bytes, the first number the command prints' },
    trimmed_bytes: { type: 'integer', description: 'its size in bytes without its trailing whitespace, the second number the command prints' },
  },
  required: ['written', 'bytes', 'trimmed_bytes'],
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


// --- Scope -----------------------------------------------------------------------------

phase('Scope')
const scope = await agent(`${role()}

Locate the inputs of the migration of concept ${CONCEPT} of the course ${A.course}.
- ${DEST}course.yaml: the concept entry whose number is "${CONCEPT}" (copy it whole), and the spec it \
declares (field spec, as written: linear-course@1).
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
Run each ls with its paths exactly as written above${DEST.startsWith('/') ? ' (absolute)' : ''}: no cd before it, no path \
shortened or made relative.

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
const SPEC_MATCH = /^([a-z0-9]+(?:-[a-z0-9]+)*)@(\d+)$/.exec(String(scope.spec ?? '').trim())
if (!SPEC_MATCH) throw new Error(`Unexpected spec: ${scope.spec} (expected <name>@<MAJOR>)`)
// The root (#178): from an absolute dest (DEST_ROOT), else the working directory (pwd, absolute, not /).
// The spec, its templates, the glossary, S1-08.md and the check command are given from it.
// A resume replays the answer of an agent that returned before the throw, so only a fresh launch asks the
// scope agent anew (Claude Code, observed 2026-10-28, #191).
const RETRY_SCOPE = 'launch the workflow afresh to retry the scope step: a resume replays the same scope answer'
const cwd = String(scope.cwd ?? '').trim()
if (!/^\/[^\n]*$/.test(cwd) || cwd === '/' || /\/\.\.?(\/|$)/.test(cwd)) throw new Error(`The working directory "${cwd}" is not an absolute path other than / (pwd): ${RETRY_SCOPE}`)
ROOT = DEST_ROOT || cwd.replace(/\/?$/, '/')
// The scope agent may list a path relative to its working directory although the prompt gives it absolute
// (wave 3, concepts 8 and 10: "ls -ld specs", "ls: cannot access 'courses/parcours-po/concepts/08-…'").
// Such a path is read as the one asked when, resolved against pwd, it is that path: never its last component
// alone, since from another working directory (the main checkout, wave 2) it names another folder.
// asListed(p): the forms under which ls may print the path p (as given, absolute, or relative to pwd).
const CWD = cwd.replace(/\/?$/, '/')
const asListed = p => {
  const abs = p.startsWith('/') ? p : `${CWD}${p}`
  const forms = [p, abs]
  if (abs.startsWith(CWD) && abs !== CWD) forms.push(abs.slice(CWD.length), `./${abs.slice(CWD.length)}`)
  return [...new Set(forms)].flatMap(f => [f, `${f}/`])
}
const rootLine = String(scope.root_listing ?? '').trim().split('\n')[0].trim()
if (!/^d/.test(rootLine) || !asListed(`${ROOT}specs`).some(f => rootLine.endsWith(` ${f}`))) throw new Error(`The repository root ${ROOT} shows no specs/ folder (ls -ld: ${JSON.stringify(scope.root_listing)}): pass args.dest as <repository>/courses/${A.course}, or run from the repository root; if the folder is there, ${RETRY_SCOPE}`)
if (DEST_ROOT && DEST_ROOT !== cwd.replace(/\/?$/, '/')) log(`Repository root from args.dest: ${ROOT} (the working directory is ${cwd})`)
if (DEST.startsWith('/') && !DEST_ROOT) log(`args.dest ${DEST} is outside a repository: the spec, the glossary and the checks are taken from the working directory ${ROOT}`)
const ROLE = role(), BLIND = blind(), MAP = mapRules()
// built here, not taken from an agent: the checks and the spec are the ones of the run's root, the spec
// read from the folder of the MAJOR the course declares
const SPEC_DIR = `specs/${SPEC_MATCH[1]}/${SPEC_MATCH[2]}/`
const DIR = String(scope.dir).replace(/^courses\/[^/]+\//, '').replace(/\/?$/, '/')
// the target is emptied below: its path is checked here, never trusted from the scope agent
if (!new RegExp(`^concepts/${NN}-[a-z0-9]+(-[a-z0-9]+)*/$`).test(DIR)) throw new Error(`Refused concept dir "${scope.dir}": expected concepts/${NN}-<slug>`)
const TARGET = `${DEST}${DIR}`
if (TARGET === DEST || !TARGET.startsWith(`${DEST}concepts/`) || TARGET.length <= `${DEST}concepts/`.length) throw new Error(`Refused target ${TARGET}: not strictly under ${DEST}concepts/`)
// Whether the target holds files is read here from the listing the scope agent returns (ls -la), not
// taken as its yes or no: the first run of concept 0 (wf_18b79caf-82d) stopped on a scope agent that
// said an absent folder held files (#170). The report shows the listing.
// The listing is "ls -ld <target>; ls -la <target>": the first line names the folder listed, so the
// script checks it is this target. Absent: the errors of ls, naming the target. Present: the ls -ld
// line of a folder ending with the target path, then "total", "." and ".." for an empty folder;
// anything else that ls -l prints for an entry is a file. A listing that is neither stops the run.
function listedFiles(listing) {
  const T = TARGET.replace(/\/$/, '')
  const forms = asListed(T)
  const lines = String(listing ?? '').split('\n').map(l => l.trim()).filter(Boolean)
  // the path an error of ls names: GNU "ls: cannot access '<path>': No such…", BSD "ls: <path>: No such…"
  const errorPath = l => (/cannot access '(.*)': No such file or directory/.exec(l) || /^ls: (.*): No such file or directory/.exec(l))?.[1]
  if (lines.length && lines.every(l => /No such file or directory/.test(l))) return lines.every(l => l.includes(T) || forms.includes(errorPath(l))) ? { exists: false, files: [] } : null
  if (!lines.length || !/^d/.test(lines[0]) || !(lines[0].endsWith(`/${T}`) || lines[0].endsWith(`${T}/`) || forms.some(f => lines[0].endsWith(` ${f}`)))) return null
  const rest = lines.slice(1)
  const entries = rest.filter(l => /^[-dlbcpsD][-rwxsStT]{9}/.test(l))
  const other = rest.filter(l => !entries.includes(l) && !/^total \d+$/.test(l))
  if (!entries.length || other.length) return null
  return { exists: true, files: entries.filter(l => !/\s\.\.?$/.test(l)) }
}
const listed = listedFiles(scope.target_listing)
if (!listed) throw new Error(`The listing of ${TARGET} reads as neither an ls -la output nor its "No such file or directory": ${JSON.stringify(scope.target_listing)}: ${RETRY_SCOPE}`)
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

const CHECK_CMD = `mise exec -- ${ROOT}specs/check-course ${DEST.replace(/\/$/, '')} --only ${CONCEPT_CHECKS} --concept ${CONCEPT}${A.langDir ? ` --lang-dir ${A.langDir}` : ''}`

// The renderings of the report (#181): one PNG per old diagram (from the frozen site's build, when it has
// one) and per new SVG (one colour, qlmanage), in a folder beside the report, named after it
const RENDER_DIR = `${REPORT.replace(/\.md$/, '')}${/\.md$/.test(REPORT) ? '' : '-renderings'}/`
// (with no site build, it prints the old components' sources, which the report quotes, as #181 asks)
const renderCmd = svgs => `mise exec -- node ${ROOT}construction/scripts/diagram-renderings/render.mjs --out ${RENDER_DIR} --page ${SITE}dist/concepts/${NN}/index.html${[...new Set(scope.diagrams.map(d => d.component))].map(c => ` --component ${c}`).join('')}${svgs.map(s => ` --svg ${TARGET}${s}`).join('')}`

// --- Inventory -------------------------------------------------------------------------

phase('Inventory')
const place = d => d.place === 'essentials' ? '« L\'essentiel »' : `the section ${d.place}`
const inventoryPrompt = d => `${ROLE}

Take the inventory of one old diagram of concept ${CONCEPT}: what it shows, never how it is drawn (rule \
M11 below). A drawing agent will draw it anew from your inventory and the concept text alone, under \
SPEC.md section 7.2, without ever seeing the old diagram: everything it must show is in your inventory, \
and nothing of the old drawing is.
Read only: the component ${d.component}${d.variant ? ` (variant ${d.variant} only)` : ''}; the concept \
text, CF ${scope.concept_file} and MDX ${scope.mdx_file} (the Figure stands in ${place(d)}); \
${ROOT}${SPEC_DIR}SPEC.md section 7.2. The course.yaml entry: ${scope.course_entry}. Never read, list or \
search another folder or copy of this concept (courses/${A.course}/concepts/, construction/notes/, git \
history). Modify no file.

The Figure legende: « ${d.legende} ».
- caption_sentences: the legende split into its sentences, verbatim and in order, each given to the idea \
it serves and to one place (rule M11). Its idea is the stem of one of the ideas you return, copied \
exactly: never another name for it. to: caption when it carries the idea; title when it only names \
the diagram (« Le gâteau en couches. »); labels when it only tells how to read it (« En bas, \
l'ingestion des données ; en haut, la restitution, ce que voit l'utilisateur. »). A labels sentence is \
split into its parts, and each part becomes a label of the element it reads, its words verbatim in that \
element's labels (« l'ingestion des données » on the ingestion layer, « la restitution, ce que voit \
l'utilisateur » on the restitution layer): the drawing writes the labels and nothing else of the \
sentence, so a word left out of the labels is lost. A caption keeps one sentence per idea when it can \
(SPEC.md 7.2, principle 1).
- ideas: an idea is one thing the diagram teaches, stated by a sentence of the legende or of the concept \
text (its justification, verbatim, and where it stands). Two ideas only when the diagram teaches two \
things that one caption cannot say in one sentence (SPEC.md 7.2, principle 1); in doubt, one idea. Per \
idea: its stem (${STEM_RULE}); its title (the old <title>${d.variant ? ' of the variant' : ''}, verbatim, \
for a diagram not split, or, when a sentence goes to the title and the old <title> does not carry it, \
that sentence without its final period; for a split one, one line per idea from the old title's words \
and the concept's words, carrying the sentence that goes to its title, if any); its subconcept (rule \
M11); its elements, relations and key.
- elements: each thing the diagram shows, in the concept's words, with the words the old diagram writes \
on or beside it (labels, verbatim, straight apostrophe), its role by SPEC.md 7.2 (subject; series: one \
element per level; contrast; context; text: a heading or a note) and its state. A state only when words \
say it: words of the old diagram, of its <desc> or of the concept text, quoted in state_words; never \
from a line style, a fill or any other form alone (an outline drawn dashed that no word calls not done \
says no state); no such words, state and state_words empty. Every \
<text> of the old component goes in the inventory: a label of an element, a word of the key, or an \
element of role text. The old <desc> says what the diagram shows: use it as information.
- relations: what links the elements, by their ids; an order that carries meaning (the steps from the \
first to the last) is a relation.
- key: the old key, each entry its sample (the id of the element it stands for) and its words, verbatim.
Never write how the old diagram is drawn: no colour, colour variable, opacity, coordinate, size, font, \
shape, line style or place on the drawing (not "the blue column on the left", not "dashed"); a state is \
named as a state (not done, refused), never by its old form. The script refuses an inventory that names a \
colour value or variable, markup, a presentation attribute or a coordinate, a state with no words, a \
sentence going to a title that does not carry it, or a sentence going to an idea that is none of its ideas.

${MAP}`

const norm = s => String(s ?? '').replace(/[’‘]/g, "'").replace(/[\s  ]+/g, ' ').trim()
// What makes an inventory refused (M11), read in code: a form of the old drawing (OLD_FORM); a state no
// word says (review of PR #182: dashed outlines became « not done », then a key « pas fait »); a legende
// sentence given to a title that does not carry it; a sentence given to an idea that is none of its ideas
// (#198). Each fault is one phrase after "the inventory".
const carries = (title, sentence) => norm(title).toLowerCase().includes(norm(sentence).replace(/[.!?…]+$/, '').trim().toLowerCase())
function inventoryFaults(inv) {
  const out = []
  const forms = oldForms(inv)
  if (forms.length) out.push(`names how the old diagram is drawn: ${forms.join(', ')}`)
  const unsaid = (inv.ideas || []).flatMap(i => (i.elements || []).filter(e => e.state && !String(e.state_words ?? '').trim()).map(e => `${i.stem} ${e.id} (${e.state})`))
  if (unsaid.length) out.push(`gives a state that no word says: ${unsaid.join(', ')}`)
  // #198: a sentence given to an idea name that is no stem of the inventory (concept 13: twice in one run);
  // the fault names the stems so the second inventory can copy them. Still there after it: refused below,
  // with its own message
  const own = (inv.ideas || []).map(i => i.stem)
  const stray = (inv.caption_sentences || []).filter(s => !own.includes(s.idea)).map(s => `« ${s.sentence} » to "${s.idea}"`)
  if (stray.length) out.push(`gives a sentence to an idea that is not one of its ideas: ${stray.join(', ')} (its ideas: ${own.map(s => `"${s}"`).join(', ') || 'none'})`)
  const titleOf = s => (inv.ideas || []).find(i => i.stem === s.idea)?.title
  const untitled = (inv.caption_sentences || []).filter(s => s.to === 'title' && titleOf(s) !== undefined && !carries(titleOf(s), s.sentence)).map(s => `« ${s.sentence} »`)
  if (untitled.length) out.push(`gives to a title a sentence that title does not carry: ${untitled.join(', ')}`)
  return out
}

const [taken, teachingAndSources] = await parallel([
  () => parallel(scope.diagrams.map((d, n) => async () => {
    const opts = { label: `inventory:${n + 1}`, phase: 'Inventory', schema: INVENTORY_SCHEMA }
    const first = await agent(inventoryPrompt(d), opts)
    const faults = first ? inventoryFaults(first) : []
    if (!faults.length) return first
    log(`Inventory ${n + 1} ${faults.join('; ')}: asked once more`)
    return agent(`${inventoryPrompt(d)}

Your first inventory ${faults.join('; it ')}. Return it again with none of that: what the diagram shows \
only, a state only where words say it, a sentence to a title only when that title carries it, each \
sentence to an idea by the stem of one of the ideas you return, copied exactly.`, { ...opts, label: `inventory-again:${n + 1}` })
  })),
  () => agent(`${ROLE} ${BLIND}

${INPUTS}

Write ${TARGET}teaching.md by rule M9 and ${TARGET}sources.md by rule M10 (and M13 for both). Copy the \
old texts as they are; change only what a rule names. « Consignes » adds nothing to the old \
« Sous-concepts » but, when a case of the bank is not cited there by its title, the one citation line \
of M9 (ruling B on #23), in its exact form: no « Poser », no « puis », no other sentence. Write only \
those two files. Return the files and every choice a rule left you (the citation line among them).`,
    // a verbatim copy under rules M9, M10 and M13: sonnet (#184: 15 % of the run on the default model, 13 turns)
    { label: 'teaching+sources', phase: 'Inventory', schema: WRITE_SCHEMA, model: 'sonnet' }),
])
if (!teachingAndSources) throw new Error('teaching.md and sources.md not written: see the workflow log')

// The ideas, decided here from the inventories (M11): each caption is the legende's sentences of its idea
// that go to the caption, and all the sentences, put back together, must be the legende (no sentence lost,
// none reworded); an idea with none takes its justifying sentence. A caption of more than one sentence is
// flagged in the report (SPEC.md 7.2, principle 1), not refused. The stems are checked here, never trusted.
const inventories = scope.diagrams.map((d, n) => {
  const inv = taken?.[n]
  const name = `${d.component}${d.variant ? ` (${d.variant})` : ''}`
  if (!inv) throw new Error(`No inventory of ${name}: see the workflow log`)
  if (!inv.ideas.length) throw new Error(`The inventory of ${name} holds no idea`)
  // the last guard of a sentence to an unknown idea, before the faults, so that it keeps its own message
  const own = inv.ideas.map(i => i.stem)
  for (const s of inv.caption_sentences) if (!own.includes(s.idea)) throw new Error(`A sentence of the legende of ${name} goes to "${s.idea}", none of its ideas (${own.join(', ')})`)
  const faults = inventoryFaults(inv)
  if (faults.length) throw new Error(`The inventory of ${name} still ${faults.join('; it still ')}: its drawing would not be blind to the old one's forms, or its caption not set. Rerun the workflow (resume) to retry it`)
  if (norm(inv.caption_sentences.map(s => s.sentence).join(' ')) !== norm(d.legende)) throw new Error(`The sentences of the legende of ${name} are not the legende, verbatim and in order: « ${d.legende} »`)
  return inv
})
// sentence ends inside a text: a period, ! or ? followed by a space and more text
const sentenceCount = t => (String(t).match(/[.!?…](?=\s+\S)/g) || []).length + 1
const ideas = inventories.flatMap((inv, n) => inv.ideas.map(i => {
  const mine = to => inv.caption_sentences.filter(s => s.idea === i.stem && s.to === to).map(s => s.sentence.trim())
  const sentences = mine('caption')
  // the course writes the straight apostrophe (M13): the old site's typographic one is replaced here
  const straight = s => String(s).trim().replace(/’/g, "'")
  const caption = straight(sentences.length ? sentences.join(' ') : i.justification)
  return { ...i, title: straight(i.title), diagram: n, split: inv.ideas.length > 1, caption, reading: mine('labels').map(straight), sentences: Math.max(sentences.length, sentenceCount(caption)) }
}))
const longCaptions = ideas.filter(i => i.sentences > 1)
if (longCaptions.length) log(`Captions of more than one sentence (SPEC.md 7.2, principle 1): ${longCaptions.map(i => `${i.stem}.svg (${i.sentences})`).join(', ')}`)
for (const i of ideas) {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(i.stem)) throw new Error(`Refused SVG stem "${i.stem}": lowercase ASCII words joined by hyphens`)
  if (!i.title || /\n/.test(i.title)) throw new Error(`Diagram ${i.stem}: its title is empty or not one line`)
  if (!i.caption) throw new Error(`Diagram ${i.stem}: no caption (no sentence of the legende, no justification)`)
  if (!/^[A-Za-z0-9]+$/.test(String(i.subconcept))) throw new Error(`Diagram ${i.stem}: subconcept "${i.subconcept}" is not a sub-concept id`)
  const ids = i.elements.map(e => e.id)
  if (!ids.length || new Set(ids).size !== ids.length) throw new Error(`Diagram ${i.stem}: no element, or element ids not unique (${ids.join(', ')})`)
}
const stems = ideas.map(i => i.stem)
if (new Set(stems).size !== stems.length) throw new Error(`SVG stems not unique: ${stems.join(', ')}`)
const entries = ideas.map(i => ({ file: `${i.stem}.svg`, title: i.title, caption: i.caption, subconcept: i.subconcept }))
const splitOnes = scope.diagrams.filter((d, n) => inventories[n].ideas.length > 1)
if (scope.diagrams.length) log(`Inventory: ${scope.diagrams.length} old diagram(s), ${ideas.length} idea(s)${splitOnes.length ? `; split by idea: ${splitOnes.map(d => d.component.split('/').pop()).join(', ')}` : ''}`)

// --- Write -----------------------------------------------------------------------------

phase('Write')
const figures = scope.diagrams.map((d, n) => `- the Figure in ${place(d)} whose legende is « ${d.legende} »: ${ideas.filter(i => i.diagram === n).map(i => `${i.stem}.svg`).join(', ')}`).join('\n')
const conceptWritten = await agent(`${ROLE} ${BLIND}

${INPUTS}

The diagrams are set by their inventories (M11) and drawn after you, from these entries and your \
concept.md. Their frontmatter entries, verbatim: ${JSON.stringify(entries)}.
Each Figure of the MDX becomes the \`![…](<stem>.svg)\` lines of its diagrams, in this order, at its place (M6), although the \
files do not exist yet:
${figures || 'none'}
MDX sub-headings not in course.yaml (rule M5): ${scope.unlisted_h4.join(', ') || 'none'}.

Write ${TARGET}concept.md by rules M1 to M8 and M13: frontmatter description, stances, neighbors (if \
MDX has ecoles.voisines), diagrams (the entries above, in body order); body in the order of SPEC.md 4.2. \
Copy the old texts as they are; change only what a rule names. Write only that file. Return it and every \
choice a rule left you.`,
  { label: 'concept', phase: 'Write', schema: WRITE_SCHEMA })
if (!conceptWritten) throw new Error('concept.md not written: see the workflow log')

// The frontmatter diagrams of concept.md as written must be the entries set above (review of PR #182): read
// by the spec's own frontmatter parser (checks/lib/md.js), compared here by file, key by key (whitespace
// aside); any other entry, key or value stops the run before any drawing. The order is the body's, free.
const ENTRY_KEYS = ['file', 'title', 'caption', 'subconcept']
const ws = s => String(s ?? '').replace(/\s+/g, ' ').trim()
if (entries.length) {
  const read = await agent(`Run this one command and return its standard output verbatim, every line. \
Modify nothing; do not use git.
mise exec -- node -e 'const m = require(process.argv[1]); const t = require("fs").readFileSync(process.argv[2], "utf8"); console.log(JSON.stringify(m.split(t).data?.diagrams ?? null))' ${ROOT}${SPEC_DIR}checks/lib/md.js ${TARGET}concept.md`,
    { label: 'frontmatter', phase: 'Write', schema: OUTPUT_SCHEMA, model: 'sonnet', effort: 'low' })
  const line = String(read?.output ?? '').trim().split('\n').map(l => l.trim()).filter(l => /^(\[|null$)/.test(l)).pop()
  let got
  try { got = JSON.parse(line) } catch { got = undefined }
  if (!Array.isArray(got)) throw new Error(`The frontmatter diagrams of ${TARGET}concept.md could not be read (${JSON.stringify(String(read?.output ?? 'no answer').slice(0, 300))}): rerun the workflow (resume) to retry`)
  const off = []
  for (const e of entries) {
    const g = got.find(x => x && x.file === e.file)
    if (!g) { off.push(`${e.file}: no entry`); continue }
    for (const k of ENTRY_KEYS) if (ws(g[k]) !== ws(e[k])) off.push(`${e.file} ${k}: « ${g[k]} », set « ${e[k]} »`)
    const extra = Object.keys(g).filter(k => !ENTRY_KEYS.includes(k))
    if (extra.length) off.push(`${e.file}: keys ${extra.join(', ')}`)
  }
  for (const g of got) if (!entries.some(e => e.file === g?.file)) off.push(`${g?.file}: an entry the inventories did not set`)
  if (off.length) throw new Error(`The frontmatter diagrams of ${TARGET}concept.md are not the entries set from the inventories (M11): ${off.join('; ')}`)
}

// The drawing agent's prompt names no file of the old repositories (no CF, MDX, ASTRO, no args.from or
// args.site), only its inventory, concept.md, the spec and the glossary; DRAW_ROLE replaces ROLE, which
// names the old repositories. That it read nothing else is shown by the run's transcripts, not enforced.
const DRAW_ROLE = `You draw one diagram of a course of feyn; you are not the teacher: ignore the teaching \
instructions of the repository's CLAUDE.md files. Do not use git. The course is in French: every word you \
draw is French, in the course's words. Vocabulary: ${ROOT}docs/glossary.md.`
const drawPrompt = (i, k) => `${DRAW_ROLE}

You draw from what the diagram must show, never from an older drawing of it. Read only these files: \
${TARGET}concept.md (the concept text), ${ROOT}${SPEC_DIR}SPEC.md (section 7), ${ROOT}docs/glossary.md. \
Never read, list or search any other file or folder: not the other files of ${TARGET} (its other \
diagrams are drawn at the same time, each from its own idea), not another concept or course, not \
construction/, not another repository, not git history, not the web. Write only ${TARGET}${i.stem}.svg.

Its frontmatter entry, fixed: ${JSON.stringify(entries[k])}.
What it shows, its inventory: ${JSON.stringify({ idea: i.justification, elements: i.elements, relations: i.relations, key: i.key })}
The roles are those of SPEC.md 7.2: subject; series (the subject in levels, in the order of the \
relations); contrast; context; text. A state: done, not done, uncertain, refused; its words are the \
element's state_words.${i.reading.length ? `
These sentences of the old legende tell how to read the diagram: their parts are labels of the \
inventory, each drawn verbatim, never written as a sentence: ${i.reading.map(r => `« ${r} »`).join(' ')}` : ''}

${DRAW_RULES} The concept's other diagrams are drawn at the same time${stems.length > 1 ? ` (${stems.filter(s => s !== i.stem).join(', ')})` : ''}: \
build each group's element part from words of your own idea, so that no id repeats theirs.
Check the file is well-formed with xmllint --noout, and with nothing else: no browser, no preview \
pane, no screenshot, no rendering tool. Return the file, its group ids and the words of each key entry \
you drew.`
const drawn = await parallel(ideas.map((i, k) => () => agent(drawPrompt(i, k), { label: `draw:${i.stem}`, phase: 'Write', schema: DRAW_SCHEMA })))
ideas.forEach((i, k) => {
  const r = drawn?.[k]
  if (!r) throw new Error(`Diagram ${i.stem}.svg not drawn: see the workflow log`)
  // the file may come back as its name or its path (wf_90327be3-efc: one drawing agent gave the absolute
  // path); any other file stops the run
  const named = [`${i.stem}.svg`, `${TARGET}${i.stem}.svg`, ...(TARGET.startsWith('/') ? [] : [`${cwd.replace(/\/?$/, '/')}${TARGET}${i.stem}.svg`])]
  if (!named.includes(String(r.file ?? '').trim())) throw new Error(`Diagram ${i.stem} returned the file ${r.file}`)
  i.groups = r.groups
  i.drawnKey = (r.key || []).map(w => String(w).trim()).filter(Boolean)
})

// --- Checks ----------------------------------------------------------------------------

phase('Checks')
const checks = await agent(`${ROLE}

The concept folder ${TARGET} has just been migrated from ${scope.concept_file}, ${scope.sources_file} \
and ${scope.mdx_file} by the rules below.

${MAP}

Run "${CHECK_CMD}". For each failure in a file of ${TARGET}: fix it when the fix is form only (a heading, \
a label, a list shape, a frontmatter key, an id, an SVG attribute, a quote character, a wrapped line, \
the orphan reference of rule M10 added to the source column of the one row that names it as support, \
and no other source-column change; a colour, a style or a filter the contract forbids in an SVG: \
currentColor with the class and opacity of its role by SPEC.md 7.2, never a text knocked out of a fill); \
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

// --- Report ----------------------------------------------------------------------------

// No comparison with the old course (rule D on #23, #184): the new concept is judged by check-course and
// by the fresh-agent review against SPEC.md and PROTOCOL.md. The report shows what the review reads: the
// scope, each diagram's inventory and where each legende sentence went, the caption flags, the checks and
// the old and new renderings side by side.
phase('Report')
const rendered = ideas.length ? await agent(`Run this one command and return its standard output verbatim, every line. \
Modify nothing else; do not use git.
${renderCmd(entries.map(e => e.file))}`, { label: 'renderings', phase: 'Report', schema: OUTPUT_SCHEMA, model: 'sonnet', effort: 'low' }) : null
// The renderings: the last line of the render command's output is its JSON; none, the report says so.
// With no site build, the lines before it give each old component's source and its size in bytes: the
// report quotes a source only when its size is the one the script measured (no copy cut short by the agent).
const utf8Length = str => { let n = 0; for (const ch of str) { const c = ch.codePointAt(0); n += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4 } return n }
let renderings = null
const quoted = new Map()
if (ideas.length) {
  const lines = String(rendered?.output ?? '').trim().split('\n').map(l => l.trim()).filter(l => l.startsWith('{'))
  try { renderings = JSON.parse(lines.pop()) } catch { renderings = { errors: [`the render command printed no JSON: ${String(rendered?.output ?? 'no answer').slice(0, 300)}`] } }
  for (const l of lines) {
    let q = null
    try { q = JSON.parse(l) } catch { continue }
    if (typeof q?.source !== 'string' || !q.component) continue
    if (utf8Length(q.source) === q.bytes) quoted.set(q.component, q.source)
    else (renderings.errors ||= []).push(`the source of ${q.component} came back cut (${utf8Length(q.source)} bytes, ${q.bytes} measured): not quoted`)
  }
}

// The report is outside the course folder: the language pack's banned characters do not bind it, and no
// check reads it. Old texts (legende sentences, titles, captions, inventories) and the agents' own lines
// (writing choices, render errors) are shown as written, arrows included (#191: an arrow made a colon
// garbled the M13 choices of concept 8 and the quoted legende no longer matched the old file). A table
// cell only escapes its pipes and joins its lines.
const cell = s => String(s ?? '').replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ')
// The report is merged into the repository and read after the run's dest (a contributor worktree) is
// gone (#170). Guaranteed: the rendered report holds no absolute path; one left stops the run. On the
// whole rendered text, agent texts included (inventories, choices, check output, listing):
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
// the renderings' folder as the report links it: relative to the report's own folder
const RENDER_LINK = `${lastPart(RENDER_DIR)}/`
const failed = !checksPassed

function renderReport() {
  const out = []
  out.push(`# Migration report: concept ${CONCEPT}`, '')
  out.push(`Workflow \`feyn-migrate-concept-workflow\`, course \`${A.course}\`, concept folder \`${DIR}\`. Paths in the course folder are relative to it; the old files are named from their repository folder (\`${lastPart(FROM)}\`, \`${lastPart(SITE)}\`).`)
  out.push(`Old files: \`${scope.concept_file}\` (CF), \`${scope.sources_file}\` (SF), \`${scope.mdx_file}\` (MDX)${scope.diagrams.length ? `, ${[...new Set(scope.diagrams.map(d => `\`${d.component}\``))].join(', ')} (ASTRO)` : ''}.`, '')
  out.push('## Summary', '')
  out.push('| checks | target existed | old diagrams | new diagrams | captions of more than one sentence |')
  out.push('|---|---|---|---|---|')
  out.push(`| ${checksPassed ? 'pass' : 'fail'} | ${targetHeldFiles ? 'yes, emptied' : 'no'} | ${scope.diagrams.length} | ${ideas.length} | ${longCaptions.length} |`, '')
  out.push(`Result: **${failed ? 'failed' : 'passed'}**. checks is read in code from the output below, which the check agent returns; target existed is read in code from the listing below, which the scope agent returns. The new concept is not compared with the old one (rule D on #23): the fresh-agent review judges it against SPEC.md and PROTOCOL.md.`, '')
  if (longCaptions.length) out.push(`Captions of more than one sentence (SPEC.md 7.2, principle 1: a caption that needs two sentences means two diagrams): ${longCaptions.map(i => `${i.stem}.svg (${i.sentences} sentences)`).join(', ')}. Flagged for the review, not refused.`, '')
  out.push('## Target before the run', '')
  out.push(`\`ls -ld ${DIR.replace(/\/$/, '')}; ls -la ${DIR.replace(/\/$/, '')}\`, as the scope agent returned it: ${!listed.exists ? 'no such folder' : targetHeldFiles ? `${listed.files.length} entr${listed.files.length === 1 ? 'y' : 'ies'}, emptied (args.overwrite)` : 'an empty folder'}.`, '', '```', String(scope.target_listing).trim(), '```', '')
  out.push('## Diagrams (M11)', '')
  if (!scope.diagrams.length) out.push('No diagram.')
  else {
    // an old figure of the build: the one whose caption is the legende; else, as many figures as diagrams, by order
    // else, with no site build, the component's source, quoted below the table once per component (#181)
    const shown = new Set()
    const oldHit = (d, n) => {
      const old = renderings?.old || []
      return old.find(o => norm(o.caption) === norm(d.legende)) || (old.length === scope.diagrams.length ? old[n] : null)
    }
    const oldPng = (d, n) => {
      const hit = oldHit(d, n)
      if (hit?.png) return `![old diagram ${n + 1}](${RENDER_LINK}${hit.png})`
      const why = renderings?.page === 'absent' ? 'no site build' : 'not rendered'
      return quoted.has(d.component) ? `${why}: its source ${shown.has(d.component) ? 'above' : 'below'}` : `${why}: source \`${d.component}\``
    }
    // the sentence follows what was found: every old diagram matched a figure of the build, some, or none
    const matched = scope.diagrams.filter((d, n) => oldHit(d, n)?.png).length
    const oldWay = renderings?.page === 'found'
      ? (matched === scope.diagrams.length ? 'the old diagram from the frozen site\'s build' : `the old diagram from the frozen site's build when a figure of the page matched its legende (${matched} of ${scope.diagrams.length}), else not rendered`)
      : renderings?.page === 'absent' || renderings?.page === 'none' ? 'no site build, so the old diagram is its component\'s source, quoted when it came back whole' : 'the old diagram not rendered'
    out.push(`Each old diagram was inventoried (what it shows, by idea), drawn anew from its inventory and concept.md alone under SPEC.md 7.2. Renderings: ${oldWay}; the new one in one colour.`, '')
    const fence = t => '`'.repeat(Math.max(3, ...(String(t).match(/`+/g) || []).map(r => r.length + 1)))
    scope.diagrams.forEach((d, n) => {
      const mine = ideas.filter(i => i.diagram === n)
      out.push(`### \`${d.component}\`${d.variant ? `, ${d.variant}` : ''}`, '')
      out.push(`Figure legende, in ${place(d)}: « ${d.legende} »`, '', mine.length > 1 ? `Split by idea: ${mine.length} diagrams.` : 'One idea.', '')
      out.push('Its sentences, where the inventory sends them (M11):', ...inventories[n].caption_sentences.map(c => `- « ${c.sentence} »: ${c.to} of ${c.idea}.svg`), '')
      for (const i of mine) {
        out.push(`#### ${i.stem}.svg`, '')
        out.push(`- Title: ${i.title}`, `- Caption: ${i.caption}${i.sentences > 1 ? ` (**${i.sentences} sentences**: SPEC.md 7.2, principle 1)` : ''}`, `- Sub-concept: ${i.subconcept}`, `- Idea: « ${i.justification} » (${i.stands_in})`, '')
        out.push('| Id | Element | Labels | Role | State |', '|---|---|---|---|---|')
        for (const e of i.elements) out.push(`| ${cell(e.id)} | ${cell(e.what)} | ${cell(e.labels.map(l => `« ${l} »`).join(', ')) || 'none'} | ${e.role} | ${e.state ? cell(`${e.state} (« ${e.state_words} »)`) : 'none'} |`)
        out.push('', ...(i.relations.length ? ['Relations:', ...i.relations.map(r => `- ${r}`)] : ['Relations: none.']), '')
        out.push(`Key of the inventory: ${i.key.length ? i.key.map(k => `${k.sample} « ${k.words} »`).join('; ') : 'none'}. Key drawn: ${i.drawnKey?.length ? i.drawnKey.map(w => `« ${w} »`).join('; ') : 'none'}.`, '')
      }
      out.push('| Old | New |', '|---|---|')
      mine.forEach((i, k) => {
        const png = (renderings?.new || []).find(x => x.svg === `${i.stem}.svg`)?.png
        out.push(`| ${k === 0 ? oldPng(d, n) : ''} | ${png ? `![${i.stem}.svg](${RENDER_LINK}${png})` : `${i.stem}.svg: not rendered`} |`)
      })
      out.push('')
      if (quoted.has(d.component) && !shown.has(d.component) && !oldHit(d, n)?.png) {
        const src = quoted.get(d.component)
        out.push(`Source of \`${d.component}\`, as the old rendering:`, '', `${fence(src)}astro`, src.replace(/\n$/, ''), fence(src), '')
        shown.add(d.component)
      }
    })
    const errors = renderings?.errors || []
    out.push(`Renderings in \`${RENDER_LINK}\`, beside this report${errors.length ? `; errors: ${errors.join('; ')}` : ''}.`)
  }
  out.push('', '## Writing choices', '')
  const choices = [...teachingAndSources.choices, ...conceptWritten.choices]
  out.push(...(choices.length ? choices.map(c => `- ${c}`) : ['None.']))
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
const summary = { concept: CONCEPT, folder: TARGET, report: REPORT, checks: checksPassed ? 'pass' : 'fail', target_existed: targetHeldFiles, diagrams: entries.map(e => e.file), long_captions: longCaptions.map(i => `${i.stem}.svg`), renderings: ideas.length ? RENDER_DIR : null }
// logged before the report is checked: a report check that fails no longer loses the run's result (concept 11)
log(`Report: ${REPORT}; ${JSON.stringify(summary)}`)
const written = await agent(`Write the file ${REPORT} with exactly the content between the two markers below (the markers \
excluded), byte for byte, creating its folder if needed. Do not use git. Then run this one command and \
return the two numbers it prints: bytes, the file's size, and trimmed_bytes, its size without its trailing \
whitespace.
mise exec -- node -e 'const t = require("fs").readFileSync(process.argv[1], "utf8"); console.log(Buffer.byteLength(t), Buffer.byteLength(t.trimEnd()))' "${REPORT}"
-----BEGIN REPORT-----
${report}
-----END REPORT-----`,
  { label: 'report', phase: 'Report', schema: WRITTEN_SCHEMA, model: 'sonnet', effort: 'low' })
// compared without trailing whitespace on both sides: the writing tool may add or drop blank lines at the
// end (concept 11, wf_576195d2-f18: one blank line more, 14723 bytes for 14721, a complete report refused)
const expected = utf8Length(report.trimEnd())
if (!written || !written.written || written.trimmed_bytes !== expected) throw new Error(`The report ${REPORT} was not written as rendered (${written ? `${written.trimmed_bytes} bytes without trailing whitespace, ${written.bytes} in all` : 'no answer'}; ${expected} expected without trailing whitespace): the run's result is in the workflow log`)
if (written.bytes !== utf8Length(report)) log(`The report ${REPORT} differs from the rendered one in its trailing whitespace only (${written.bytes} bytes, ${utf8Length(report)} rendered)`)
if (failed) throw new Error(`feyn-migrate-concept-workflow failed for concept ${CONCEPT}: checks fail (${blocking.join('; ')}). Report: ${REPORT}`)
return summary
