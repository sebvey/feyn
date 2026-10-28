export const meta = {
  name: 'migrate-concept',
  description: 'Migrate one concept of a frozen parcours-po course into a linear-course concept folder, check it, and compare old and new',
  whenToUse: 'Stage 1 only (S1-10): the maintainer asks to migrate concept N of a course from the frozen repositories. args: { course: "<course id>", concept: "<number as in course.yaml: 9, A1>", from?: "<frozen course repo, default ../pdx/parcours-po>", site?: "<frozen site repo, default ../pdx/parcours-po-website>", dest?: "<course folder written into, default courses/<course>>", report?: "<report path, default construction/notes/S1-10-<NN>-report.md>", langDir?: "<language pack dir passed to check-course>", overwrite?: true, accept?: true }. dest is a full course folder (course.yaml, plan.md, glossary.md, domains/…), a copy when not courses/<course>; overwrite empties the target concept folder first. The PNGs of the old and new diagrams go to the folder named after the report (its path without .md). The defaults of from and site are relative to the working directory: a run from a worktree or a copy passes absolute paths.',
  phases: [
    { title: 'Scope', detail: 'finds the old files, the course.yaml entry, the target folder and its listing' },
    { title: 'Inventory', detail: 'what each old diagram shows, grouped by idea; teaching.md and sources.md' },
    { title: 'Write', detail: 'concept.md, then one diagram per idea, drawn blind from its inventory and concept.md' },
    { title: 'Checks', detail: 'check-course on the concept, form fixes only' },
    { title: 'Compare', detail: 'the diagrams on their inventory, old to new and new to old, flagged rows verified, renderings, report written' },
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
// Checks runs check-course --only the per-concept checks --concept N, fixes form only; Compare checks
// the diagrams on their inventories (information, not forms), sweeps old to new (kept, moved, lost, by
// design) and new to old (invented), verifies every lost or invented row, renders the old and new
// diagrams as PNGs, writes the report in the fixed format of renderReport(). Fails on a check failing for
// this concept, or a confirmed lost or invented row without args.accept. Old repos read only; paths:
// cwd-relative or absolute.
// Decided in code, not on an agent's word: the target path, the SVG stems (format, uniqueness), whether
// the target holds files (read from the listing, which the report shows), the frontmatter entries of the
// diagrams (from the inventory: each caption the legende's sentences of its idea, the legende checked
// whole), an inventory free of the old drawing's forms (OLD_FORM), the checks verdict, the citation line
// of M9 counted by design (from its exact form, ruling B on #23), a missing item naming the target
// ignored, the repository root (from an absolute dest, else pwd; the agents get the spec and the glossary
// under it, #178), the report. The report names paths relative to the course folder (concepts/NN-slug/...)
// and the old repositories by their folder name: never the absolute paths of args.dest, args.from or
// args.site (#170).

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

// The diagrams (M11, #181): never transcribed. An inventory agent reads the old component and the concept
// text and lists what the diagram shows, grouped by idea; a drawing agent draws one SVG per idea under
// SPEC.md section 7.2 from that inventory and concept.md alone; the comparison checks the information.
// The maintainer stopped the transcription on 2026-10-28: the old site drew one hue at three strengths,
// now for a series, now for a contrast, so no table maps its colours (first draft of #181, PR #182).
// The drawing agent's blindness is structural: its prompt (DRAW_ROLE, drawPrompt) names no path of the old
// repositories, and the inventory it gets is refused when it names how the old diagram is drawn (OLD_FORM:
// a colour value or variable, markup, a presentation attribute, a coordinate); the inventory agent is asked
// once more, then the run stops.
const ROLES = ['subject', 'series', 'contrast', 'context', 'text']
const STATES = ['', 'done', 'not done', 'uncertain', 'refused']
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
rendering of its role (7.2, principle 3), a state its form; every element, relation and label of the \
inventory is drawn, each label verbatim (straight apostrophe '); the key of the inventory, and a key \
(a sample and a word) wherever a distinction of form or opacity must be named; no teaching sentence (the \
caption is said beside the diagram, never drawn in it). The composition is yours, under 7.2 principle 5: \
nothing of an older drawing of it is to be kept or matched. <title> is the root's first child and equals \
the entry's title; <desc>, optional, in French, describes the drawing; their ids start with the stem. \
${GROUP_RULE}.`

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
M11 Diagrams. An old diagram (one ASTRO component, one variant per distinct prop value used in MDX, e.g. \
p="a") is not transcribed: it is inventoried, drawn anew, and compared on information (maintainer's \
choice of 2026-10-28 on #181, decision one-diagram-style). The inventory lists what the old diagram \
shows: its elements, labels and relations, the role of each (SPEC.md 7.2: subject, series, contrast, \
context, text; a state: done, not done, uncertain, refused), the key if any, grouped by idea, each idea \
justified by a sentence of the Figure legende or of the concept text, quoted (in doubt, one idea); the \
legende's sentences are shared among the ideas, verbatim and in order; nothing of how the old diagram \
is drawn (no colour, opacity, coordinate, size, font, shape or layout). One SVG per idea, drawn from its \
inventory and the concept text (concept.md) only, never from the old component: its composition, \
geometry and classes are its own. ${DRAW_RULES} Stem: ${STEM_RULE}. Frontmatter diagrams: one entry per \
SVG, set from the inventory: file, title (the old <title>, verbatim; for a split diagram, one line per \
idea from the old title's words and the concept's words), caption (the legende's sentences of its idea, \
verbatim and in order; an idea with none, its justifying sentence), subconcept (the sub-concept the \
diagram illustrates: the one whose section holds the Figure, or for a Figure in « L'essentiel », the \
first-level sub-concept it draws; for a split diagram, its idea's). The comparison is on information, \
never on forms, colours or layout: every element, relation and label of the inventory is in a new \
diagram, every <text> of the old component is in the inventory, every sentence of the legende is in a \
new caption (lost otherwise); an element, a label or a caption sentence that neither the inventory nor \
the concept text carries is invented. The key of a distinction of form or opacity, a group id, the \
<desc>, and the title of a split diagram written from the old title's and the concept's words are not \
invented when they follow this rule.
M12 By design, nowhere: MDX alignement, import lines, the old drawing of a diagram (its geometry, \
colours, styles and Astro code: M11 draws anew), the \
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
    state: { type: 'string', enum: STATES, description: 'the state it says, if any: done, not done, uncertain, refused; empty when it says none' },
  },
  required: ['id', 'what', 'labels', 'role', 'state'],
}
const INVENTORY_SCHEMA = {
  type: 'object',
  properties: {
    caption_sentences: {
      type: 'array',
      description: 'the Figure legende split into its sentences, verbatim and in order, each with the stem of the idea it goes to',
      items: { type: 'object', properties: { sentence: { type: 'string' }, idea: { type: 'string', description: 'the stem of its idea' } }, required: ['sentence', 'idea'] },
    },
    ideas: {
      type: 'array',
      description: 'one item per idea the diagram carries; in doubt, one idea',
      items: {
        type: 'object',
        properties: {
          stem: { type: 'string', description: 'stem by rule M11' },
          title: { type: 'string', description: 'the old <title> verbatim; for a split diagram, one line for this idea (M11)' },
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
  },
  required: ['file', 'groups'],
}

const DIAGRAM_COMPARE_SCHEMA = {
  type: 'object',
  properties: {
    rows: {
      type: 'array',
      description: 'one row per element and per relation of the inventory, per <text> of the old component the inventory lacks, per sentence of the legende',
      items: {
        type: 'object',
        properties: {
          item: { type: 'string', description: 'E1 « labels », a relation, « a text of the old component », or the legende sentence, short' },
          where: { type: 'string', description: 'the new SVG and its group, or concept.md frontmatter caption of <file>, or "none"' },
          verdict: { type: 'string', enum: ['kept', 'moved', 'lost'] },
          detail: { type: 'string', description: 'for moved: what changed (a label reworded, another diagram, a role); for lost: what is missing, quoted' },
        },
        required: ['item', 'where', 'verdict', 'detail'],
      },
    },
    invented: {
      type: 'array',
      description: 'each element, label or caption sentence of a new diagram that neither the inventory nor the concept text carries',
      items: {
        type: 'object',
        properties: { file: { type: 'string' }, text: { type: 'string', description: 'the new text or element, quoted' }, detail: { type: 'string' } },
        required: ['file', 'text', 'detail'],
      },
    },
  },
  required: ['rows', 'invented'],
}

const RENDER_SCHEMA = {
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

// The renderings of the report (#181): one PNG per old diagram (from the frozen site's build, when it has
// one) and per new SVG (one colour, qlmanage), in a folder beside the report, named after it
const RENDER_DIR = `${REPORT.replace(/\.md$/, '')}${/\.md$/.test(REPORT) ? '' : '-renderings'}/`
const renderCmd = svgs => `mise exec -- node ${ROOT}construction/scripts/diagram-renderings/render.mjs --out ${RENDER_DIR} --page ${SITE}dist/concepts/${NN}/index.html${svgs.map(s => ` --svg ${TARGET}${s}`).join('')}`

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
it says. A sentence that names the diagram or tells how to read it goes with the idea it serves.
- ideas: an idea is one thing the diagram teaches, stated by a sentence of the legende or of the concept \
text (its justification, verbatim, and where it stands). Two ideas only when the diagram teaches two \
things that one caption cannot say in one sentence (SPEC.md 7.2, principle 1); in doubt, one idea. Per \
idea: its stem (${STEM_RULE}); its title (the old <title>${d.variant ? ' of the variant' : ''}, verbatim, \
for a diagram not split; for a split one, one line per idea from the old title's words and the concept's \
words); its subconcept (rule M11); its elements, relations and key.
- elements: each thing the diagram shows, in the concept's words, with the words the old diagram writes \
on or beside it (labels, verbatim, straight apostrophe), its role by SPEC.md 7.2 (subject; series: one \
element per level; contrast; context; text: a heading or a note) and the state it says, if any. Every \
<text> of the old component goes in the inventory: a label of an element, a word of the key, or an \
element of role text. The old <desc> says what the diagram shows: use it as information.
- relations: what links the elements, by their ids; an order that carries meaning (the steps from the \
first to the last) is a relation.
- key: the old key, each entry its sample (the id of the element it stands for) and its words, verbatim.
Never write how the old diagram is drawn: no colour, colour variable, opacity, coordinate, size, font, \
shape, line style or place on the drawing (not "the blue column on the left", not "dashed"); a state is \
named as a state (not done, refused), never by its old form. The script refuses an inventory that names a \
colour value or variable, markup, a presentation attribute or a coordinate.

${MAP}`

const [taken, teachingAndSources] = await parallel([
  () => parallel(scope.diagrams.map((d, n) => async () => {
    const opts = { label: `inventory:${n + 1}`, phase: 'Inventory', schema: INVENTORY_SCHEMA }
    const first = await agent(inventoryPrompt(d), opts)
    const forms = first ? oldForms(first) : []
    if (!forms.length) return first
    log(`Inventory ${n + 1} names how the old diagram is drawn (${forms.join(', ')}): asked once more`)
    return agent(`${inventoryPrompt(d)}

Your first inventory named how the old diagram is drawn: ${forms.join(', ')}. Return it again with none \
of that: what the diagram shows only.`, { ...opts, label: `inventory-again:${n + 1}` })
  })),
  () => agent(`${ROLE} ${BLIND}

${INPUTS}

Write ${TARGET}teaching.md by rule M9 and ${TARGET}sources.md by rule M10 (and M13 for both). Copy the \
old texts as they are; change only what a rule names. « Consignes » adds nothing to the old \
« Sous-concepts » but, when a case of the bank is not cited there by its title, the one citation line \
of M9 (ruling B on #23), in its exact form: no « Poser », no « puis », no other sentence. Write only \
those two files. Return the files and every choice a rule left you (the citation line among them).`,
    { label: 'teaching+sources', phase: 'Inventory', schema: WRITE_SCHEMA }),
])
if (!teachingAndSources) throw new Error('teaching.md and sources.md not written: see the workflow log')

// The ideas, decided here from the inventories (M11): each caption is the legende's sentences of its idea,
// and those sentences, put back together, must be the legende (no sentence lost, none reworded); an idea
// with none takes its justifying sentence. The stems are checked here, never trusted.
const norm = s => String(s ?? '').replace(/[’‘]/g, "'").replace(/[\s  ]+/g, ' ').trim()
const inventories = scope.diagrams.map((d, n) => {
  const inv = taken?.[n]
  const name = `${d.component}${d.variant ? ` (${d.variant})` : ''}`
  if (!inv) throw new Error(`No inventory of ${name}: see the workflow log`)
  const forms = oldForms(inv)
  if (forms.length) throw new Error(`The inventory of ${name} still names how the old diagram is drawn (${forms.join(', ')}): its drawing would not be blind. Rerun the workflow (resume) to retry it`)
  if (!inv.ideas.length) throw new Error(`The inventory of ${name} holds no idea`)
  const own = inv.ideas.map(i => i.stem)
  for (const s of inv.caption_sentences) if (!own.includes(s.idea)) throw new Error(`A sentence of the legende of ${name} goes to "${s.idea}", none of its ideas (${own.join(', ')})`)
  if (norm(inv.caption_sentences.map(s => s.sentence).join(' ')) !== norm(d.legende)) throw new Error(`The sentences of the legende of ${name} are not the legende, verbatim and in order: « ${d.legende} »`)
  return inv
})
const ideas = inventories.flatMap((inv, n) => inv.ideas.map(i => {
  const sentences = inv.caption_sentences.filter(s => s.idea === i.stem).map(s => s.sentence.trim())
  // the course writes the straight apostrophe (M13): the old site's typographic one is replaced here
  const straight = s => String(s).trim().replace(/’/g, "'")
  return { ...i, title: straight(i.title), diagram: n, split: inv.ideas.length > 1, caption: straight(sentences.length ? sentences.join(' ') : i.justification) }
}))
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
Each Figure of the MDX becomes the images of its diagrams, in this order, at its place (M6), although the \
files do not exist yet:
${figures || 'none'}
MDX sub-headings not in course.yaml (rule M5): ${scope.unlisted_h4.join(', ') || 'none'}.

Write ${TARGET}concept.md by rules M1 to M8 and M13: frontmatter description, stances, neighbors (if \
MDX has ecoles.voisines), diagrams (the entries above, in body order); body in the order of SPEC.md 4.2. \
Copy the old texts as they are; change only what a rule names. Write only that file. Return it and every \
choice a rule left you.`,
  { label: 'concept', phase: 'Write', schema: WRITE_SCHEMA })
if (!conceptWritten) throw new Error('concept.md not written: see the workflow log')

// The drawing agent is blind by construction (#181): its prompt names no file of the old repositories
// (no CF, MDX, ASTRO, no args.from or args.site), only its inventory, concept.md, the spec and the
// glossary; DRAW_ROLE replaces ROLE, which names the old repositories.
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
relations); contrast; context; text. A state: done, not done, uncertain, refused.

${DRAW_RULES} The concept's other diagrams are drawn at the same time${stems.length > 1 ? ` (${stems.filter(s => s !== i.stem).join(', ')})` : ''}: \
build each group's element part from words of your own idea, so that no id repeats theirs.
Check the file is well-formed (xmllint --noout). Return the file and its group ids.`
const drawn = await parallel(ideas.map((i, k) => () => agent(drawPrompt(i, k), { label: `draw:${i.stem}`, phase: 'Write', schema: DRAW_SCHEMA })))
ideas.forEach((i, k) => {
  const r = drawn?.[k]
  if (!r) throw new Error(`Diagram ${i.stem}.svg not drawn: see the workflow log`)
  if (r.file !== `${i.stem}.svg`) throw new Error(`Diagram ${i.stem} returned the file ${r.file}`)
  i.groups = r.groups
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

// --- Compare ---------------------------------------------------------------------------

phase('Compare')
const COMPARE = `${ROLE} Modify no file.

Old files: CF ${scope.concept_file}, SF ${scope.sources_file}, MDX ${scope.mdx_file}, ASTRO \
${[...new Set(scope.diagrams.map(d => d.component))].join(', ') || '(none)'}. New concept folder: \
${TARGET} (concept.md, teaching.md, sources.md, ${entries.map(d => d.file).join(', ') || 'no SVG'}). \
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
${scope.diagrams.length ? `The diagrams (the ASTRO components, the Figure legendes, the SVGs and the frontmatter diagrams \
entries) are compared on their inventories by the diagram comparison (M11), on information, never on forms, \
colours or layout.` : ''}`

// The diagram comparison (M11, #181): one agent per old diagram, on its inventory. Not blind: it reads the
// old component, to find a <text> the inventory missed.
const diagramCompare = (d, n) => agent(`${COMPARE}

Compare one old diagram with the new diagrams drawn from it, on information, never on forms, colours or \
layout: the new drawing is free (M11), its composition, shapes and classes are not the old ones.
The old diagram: ${d.component}${d.variant ? `, variant ${d.variant} only` : ''}; its Figure legende: \
« ${d.legende} ».
Its inventory: ${JSON.stringify(inventories[n])}
The new diagrams drawn from it: ${ideas.filter(i => i.diagram === n).map(i => `${TARGET}${i.stem}.svg`).join(', ')}, \
and their entries in the frontmatter of ${TARGET}concept.md.
Give one row:
- per element and per relation of the inventory: kept (in a new diagram, its labels verbatim, its role \
and state carried), moved (carried with a change: a label reworded, in another of the new diagrams, a \
role or a state changed), lost (in no new diagram: quote what is missing);
- per <text> of the old component that the inventory lacks: lost, the item « not in the inventory: \
<the text> »;
- per sentence of the legende: kept when a caption of these diagrams in the frontmatter holds it \
verbatim, moved when reworded, lost when missing.
Then, under invented, each element, label or caption sentence of a new diagram that neither the \
inventory nor the concept text carries. A key naming a distinction of form or opacity, a group id, the \
<desc>, the title of a split diagram from the old title's and the concept's words are not invented.`,
  { label: `compare-diagram:${n + 1}`, phase: 'Compare', schema: DIAGRAM_COMPARE_SCHEMA })

const [oldSweep, newSweep, rendered, ...compared] = await parallel([
  () => agent(`${COMPARE}

Old to new. Walk the old files section by section, in their order: every heading, frontmatter key, \
component, paragraph, list item, case field and table row. For each item, find where \
it is in the new folder and give one row: kept (same text, at the place its rule gives), moved (carried, \
with a change its rule names: merged, converted, renamed, placed elsewhere, or carried out of the folder \
to course.yaml or the protocol), lost (some of its text is in no new file and no rule drops it: quote \
what is missing), by design (rule M12 or another rule's clause drops it: name the clause). One row per \
section; one row per item inside a section only when its verdict differs from its section's, or for \
every case field, table row and frontmatter item that is moved or lost. Never use by design for a \
drop no rule names. The citation line of M9 is new text, not an old item: give it no row (the other \
sweep reports it). The ASTRO components and the Figure legendes are the diagram comparison's: give them \
no row; a <Figure> gets one row, for the place of its images (M6).`,
    { label: 'old-to-new', phase: 'Compare', schema: OLD_SWEEP_SCHEMA }),
  () => agent(`${COMPARE}

New to old. Walk every file of the new folder, sentence by sentence (frontmatter items, body \
sentences, list items, case fields, table rows). For each, find the old text that carries \
it. Report only what is invented: a sentence, a clause, a precision, a reference, a figure or a claim \
that no old file carries, or a rewording that says more or less than the old text. Text that a rule \
produces (a heading from course.yaml, the Nature column of M10, "[cours]" for a pastille, an SVG id) is \
not invented when it follows the rule. Compare every source cell of sources.md and every refs list \
of the frontmatter with the old one, id by id, and report each added or replaced id, and each \
replaced no-source word, that is not the orphan case of M10. Report also every line of « Consignes » \
that the old « Sous-concepts » does not carry, the citation line of M9 included, as one row each, its \
text quoted whole and exact, section « Consignes »: the script counts a line in the exact form of M9 \
by design (ruling B on #23), any other as invented. The SVGs and the frontmatter diagrams entries are \
the diagram comparison's: give them no row. Return an empty list when nothing is invented.`,
    { label: 'new-to-old', phase: 'Compare', schema: NEW_SWEEP_SCHEMA }),
  () => ideas.length ? agent(`Run this one command and return its standard output verbatim, every line. \
Modify nothing else; do not use git.
${renderCmd(entries.map(e => e.file))}`, { label: 'renderings', phase: 'Compare', schema: RENDER_SCHEMA, model: 'sonnet', effort: 'low' }) : null,
  ...scope.diagrams.map((d, n) => () => diagramCompare(d, n)),
])
if (!oldSweep || !newSweep) throw new Error('A comparison sweep returned nothing: rerun the workflow (resume) to retry it')
if (compared.some(c => !c)) throw new Error('A diagram comparison returned nothing: rerun the workflow (resume) to retry it')
// The diagrams are judged by the diagram comparison alone (M11): a sweep's row on an ASTRO component or
// an SVG is dropped (it would judge forms against the old drawing), and the comparison's rows join the
// sweeps', so that its lost and invented rows are verified and counted like the others.
const dropped = oldSweep.rows.filter(r => r.source === 'ASTRO').length + newSweep.rows.filter(r => /\.svg\b/.test(r.file)).length
oldSweep.rows = oldSweep.rows.filter(r => r.source !== 'ASTRO')
newSweep.rows = newSweep.rows.filter(r => !/\.svg\b/.test(r.file))
if (dropped) log(`${dropped} sweep row(s) on the diagrams dropped: the diagram comparison judges them (M11)`)
compared.forEach(c => {
  for (const r of c.rows) oldSweep.rows.push({ source: 'ASTRO', item: r.item, where: r.where, verdict: r.verdict, rule: 'M11', detail: r.detail })
  for (const r of c.invented) newSweep.rows.push({ file: r.file, section: 'diagram', text: r.text, detail: r.detail })
})
// The renderings: the last line of the render command's output is its JSON; none, the report says so
let renderings = null
if (ideas.length) {
  const line = String(rendered?.output ?? '').trim().split('\n').filter(l => l.trim().startsWith('{')).pop()
  try { renderings = JSON.parse(line) } catch { renderings = { errors: [`the render command printed no JSON: ${String(rendered?.output ?? 'no answer').slice(0, 300)}`] } }
}

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
${scope.diagrams.length ? `A row on a diagram (source ASTRO, section diagram) is judged on information, never on forms, \
colours or layout (M11): for a lost one, search the texts and the groups of the new SVGs; for an invented \
one, the inventories and the concept text. The inventories: ${JSON.stringify(inventories)}
` : ''}
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
// the renderings' folder as the report links it: relative to the report's own folder
const RENDER_LINK = `${lastPart(RENDER_DIR)}/`
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
  out.push('', '## Diagrams (M11)', '')
  if (!scope.diagrams.length) out.push('No diagram.')
  else {
    out.push('Each old diagram was inventoried (what it shows, by idea), drawn anew from its inventory and concept.md alone under SPEC.md 7.2, and compared on information (the ASTRO rows above). Renderings: the old diagram from the frozen site\'s build, the new one in one colour.', '')
    // an old figure of the build: the one whose caption is the legende; else, as many figures as diagrams, by order
    const oldPng = (d, n) => {
      const old = renderings?.old || []
      const hit = old.find(o => norm(o.caption) === norm(d.legende)) || (old.length === scope.diagrams.length ? old[n] : null)
      return hit?.png ? `![old diagram ${n + 1}](${RENDER_LINK}${hit.png})` : `${renderings?.page === 'absent' ? 'no site build' : 'not rendered'}: source \`${d.component}\``
    }
    scope.diagrams.forEach((d, n) => {
      const mine = ideas.filter(i => i.diagram === n)
      out.push(`### \`${d.component}\`${d.variant ? `, ${d.variant}` : ''}`, '')
      out.push(`Figure legende, in ${place(d)}: « ${plain(d.legende)} »`, '', mine.length > 1 ? `Split by idea: ${mine.length} diagrams.` : 'One idea.', '')
      for (const i of mine) {
        out.push(`#### ${i.stem}.svg`, '')
        out.push(`- Title: ${plain(i.title)}`, `- Caption: ${plain(i.caption)}`, `- Sub-concept: ${i.subconcept}`, `- Idea: « ${plain(i.justification)} » (${plain(i.stands_in)})`, '')
        out.push('| Id | Element | Labels | Role | State |', '|---|---|---|---|---|')
        for (const e of i.elements) out.push(`| ${cell(e.id)} | ${cell(e.what)} | ${cell(e.labels.map(l => `« ${l} »`).join(', ')) || 'none'} | ${e.role} | ${e.state || 'none'} |`)
        out.push('', ...(i.relations.length ? ['Relations:', ...i.relations.map(r => `- ${plain(r)}`)] : ['Relations: none.']), '')
        out.push(`Key: ${i.key.length ? i.key.map(k => `${k.sample} « ${plain(k.words)} »`).join('; ') : 'none'}.`, '')
      }
      out.push('| Old | New |', '|---|---|')
      mine.forEach((i, k) => {
        const png = (renderings?.new || []).find(x => x.svg === `${i.stem}.svg`)?.png
        out.push(`| ${k === 0 ? oldPng(d, n) : ''} | ${png ? `![${i.stem}.svg](${RENDER_LINK}${png})` : `${i.stem}.svg: not rendered`} |`)
      })
      out.push('')
    })
    const errors = renderings?.errors || []
    out.push(`Renderings in \`${RENDER_LINK}\`, beside this report${errors.length ? `; errors: ${errors.map(plain).join('; ')}` : ''}.`)
  }
  out.push('', '## Writing choices', '')
  const choices = [...teachingAndSources.choices, ...conceptWritten.choices]
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

const summary = { concept: CONCEPT, folder: TARGET, report: REPORT, checks: checksPassed ? 'pass' : 'fail', kept: count('kept'), moved: count('moved'), by_design: count('by design'), lost: lostLeft.length, invented: inventedLeft.length, target_existed: targetHeldFiles, accepted: !!A.accept, diagrams: entries.map(e => e.file), renderings: ideas.length ? RENDER_DIR : null }
log(`Report: ${REPORT}; ${JSON.stringify(summary)}`)
if (failed) throw new Error(`migrate-concept failed for concept ${CONCEPT}: ${!checksPassed ? 'checks fail; ' : ''}${lostLeft.length} lost, ${inventedLeft.length} invented${A.accept ? ' (accepted)' : ''}. Report: ${REPORT}`)
return summary
