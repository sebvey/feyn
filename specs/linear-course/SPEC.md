# linear-course: the spec

Version 1.0.0, draft: binding from the tag `linear-course/v1.0.0`. The pedagogical protocol is
not in this file: it is `PROTOCOL.md`, beside it, because this file would exceed about 400 lines
with it. The four parts of the spec are the **structure** and its **reader-text conventions**
(this file), the **drawing contract** (this file), the **checks** (this file, scripts in
`checks/`) and the **protocol** (`PROTOCOL.md`).

**Language exception.** The rules of `PROTOCOL.md` are written in French, a bounded exception
to the language policy (`docs/decisions/language-policy.md`): the old teacher was instructed and
corrected in French. Task S2-09 (issue #38) closes it: it translates the rules to English, rule
by rule, and removes this paragraph.

"Mandatory" means a check fails without it; "optional" means it may be absent, and when present
it follows the rule given. Every rule names the check that enforces it, in backquotes; a rule
with no check id is enforced by review.

## 1. Purpose and scope

`linear-course` describes a type of course: a linear introductory course made of ordered
**domains**, ordered **concepts** with prerequisites, **sub-concepts** taught one per teacher
message, a **storyline** the cases live in. A course that does not fit this shape needs another
spec. The spec fixes what a course contains, how the teacher teaches it, and how it is checked.
It holds for every course language: what depends on the language spoken to the learner is in
the **language pack** `lang/<code>.yaml` (phrases, typography, headings, markers, site labels),
and this file names those values by key (section 9). French values are quoted for reference.

Each concept is one source: its folder holds **reader-facing** files (the site builds them, the
teacher reads them) and one **teacher-only** file (the teacher reads it, the site never builds
it). The site and the classroom are builds of the course, without rewriting.

Out of scope here: the protocol (`PROTOCOL.md`), the learner memory files (the protocol, and
`templates/learner/`), how the site and the classroom build (their own folders).

## 2. The course folder

```
courses/<id>/
  course.yaml          mandatory   identity, domains, concepts, sub-concepts (section 3)
  plan.md              mandatory   prose: audience, onboarding, stances, writing rules (section 6)
  glossary.md          mandatory   the course glossary (section 6)
  storyline.md         mandatory   the storyline (section 6)
  CHANGELOG.md         mandatory   the course changelog (section 6)
  domains/N-slug.md    mandatory   one domain file per domain (section 5)
  concepts/NN-slug/    mandatory   one concept folder per concept and annex (section 4)
  decisions/           optional    the course's decisions; no build reads it
```

Course Markdown is plain CommonMark with YAML frontmatter where stated: no HTML, no MDX, no
remark directive (`conventions`). Course text follows the typography of the language pack;
its banned characters (French: em-dash, arrows) fail the check (`typography`).

## 3. `course.yaml`

Read by the site, the classroom build and the checks (`course-yaml` for every rule here).

| Field | Status | Meaning |
|---|---|---|
| `id` | mandatory | the course id: lowercase ASCII words joined by hyphens, equal to the folder name |
| `spec` | mandatory | `linear-course@<MAJOR>`: the spec MAJOR the course follows (section 8) |
| `language` | mandatory | ISO 639-1 code of the language spoken to the learner; `lang/<language>.yaml` exists |
| `title` | mandatory | the course title |
| `subtitle` | optional | one line under the title on the site |
| `audience` | mandatory | one sentence for the site home and previews; the full prose is in `plan.md` |
| `site` | optional | the course's look on the site; omitted keys take the site's defaults |
| `site.icon` | optional | path, relative to the course folder, of an SVG used as the course's mark and favicon |
| `site.color` | optional | the course's accent colour, `#rrggbb` |
| `storyline` | mandatory | path of the storyline file: `storyline.md` |
| `glossary` | mandatory | path of the course glossary: `glossary.md` |
| `domains` | mandatory | the domains, in course order (below) |
| `concepts` | mandatory | every concept and annex, in course order (below) |
| `annexes` | optional | numbers of the concepts that are annexes; absent means none |

A **domain** entry:

| Field | Status | Meaning |
|---|---|---|
| `number` | mandatory | integer; the domains are numbered 1, 2, 3… in list order |
| `slug` | mandatory | lowercase ASCII words joined by hyphens |
| `title` | mandatory | the domain title |
| `objective` | mandatory | what the learner can do at the end of the domain, one sentence |
| `duration_min` | mandatory | minutes of conversation with the teacher, low estimate, asides excluded |
| `file` | mandatory | `domains/<number>-<slug>.md`; the file exists |
| `concepts` | mandatory | the numbers of the domain's concepts, in course order |

A **concept** entry (annexes included):

| Field | Status | Meaning |
|---|---|---|
| `number` | mandatory | the concept's identifier: `0`, `1`… for a concept, `A1`, `A2`… for an annex; a string (an unquoted integer is read as its decimal string) |
| `slug` | mandatory | lowercase ASCII words joined by hyphens |
| `title` | mandatory | the concept title |
| `objective` | mandatory | what the learner can do after the concept, one sentence; restated in « Objectif » (section 4.2) |
| `prerequisites` | mandatory | numbers of the concepts the learner must have validated first; `[]` for none |
| `duration_min` | optional | minutes of conversation with the teacher, low estimate |
| `dir` | mandatory | `concepts/<NN>-<slug>`, `NN` the number on two digits (`09`); an annex keeps its number (`concepts/A1-<slug>`); the folder exists |
| `subconcepts` | mandatory | the concept's sub-concept tree, non-empty (below) |

A **sub-concept** node:

| Field | Status | Meaning |
|---|---|---|
| `id` | mandatory | first level: the concept number and a letter, from `a` in order (`9a`, `9b`, `A2a`); second level: its parent's id and a digit, from `1` in order (`9a1`, `9a2`) |
| `title` | mandatory | the sub-concept title, as its heading in `concept.md` writes it |
| `children` | optional | second-level nodes; the tree has two levels at most |
| `messages` | optional | leaf only: the number of teacher messages the leaf takes, 2 or more; absent means 1 |

A node without `children` is a **leaf sub-concept**: one teacher message with one question
(or `messages` of them).

Rules:
- concept numbers and sub-concept ids are unique; the concepts come in course order: numbered
  concepts by increasing number, then the annexes;
- every numbered concept belongs to exactly one domain; each domain's concepts are consecutive
  and follow the previous domain's; annexes belong to no domain and are exactly the `A`
  numbers;
- a prerequisite is an existing numbered concept that comes earlier (any numbered concept for
  an annex).

**Identifiers.** Concept numbers, sub-concept ids, case titles (section 4.3), domain numbers and
their concepts, concept `dir` and domain `file` names are the course's identifiers: learner
memory and site addresses cite them. Changing one is a course MAJOR (section 8).

## 4. The concept folder

```
concepts/09-decoupage-vertical/
  concept.md         mandatory   reader-facing: built by the site, read by the teacher
  teaching.md        mandatory   teacher-only: teaching notes and example bank; never built
  sources.md         mandatory   reader-facing, filtered by the site (4.4)
  <stem>.svg         optional    reader-facing: one file per diagram (section 7)
```

Nothing else sits in a concept folder (`concept-folder`). The three Markdown files have no H1:
the title is in `course.yaml`. Sections are `##` headings whose text is the language pack's
heading, in the order given, and no other `##` section exists (`concept-folder`).

### 4.1 `concept.md` frontmatter

| Key | Status | Meaning |
|---|---|---|
| `description` | mandatory | one sentence for the site (search engines, previews) |
| `stances` | mandatory | the standing of the concept's claims, three keys, each a list of items, possibly empty |
| `stances.consensus` | mandatory | what is accepted, and by which text (the Scrum Guide, established practice) |
| `stances.school` | mandatory | school of thought: a named author's or current's choice |
| `stances.course` | mandatory | the course's own choices, which no source states as such (an item may cite the sources it comes close to) |
| `neighbors` | optional | neighbouring notions not to confuse with this concept: a list of items |
| `diagrams` | optional | the concept's diagrams, a list (below) |

`stances` and `neighbors` are the one place for the concept's stances and neighbours: the body has no stances
section (`concept-folder`), and the site renders them from the frontmatter, under the heading
`headings.stances`. The reader text may still mark a claim with a stance marker (section 4.5).

An **item**: `text` (mandatory, inline Markdown: bold and italics only), `author` (optional;
expected on consensus and school items: the text or author the claim belongs to), `refs`
(mandatory, possibly empty: reference ids of `sources.md`, `sources`).

A **diagram** entry, all keys mandatory: `file` (the SVG's file name), `title` (one line: the
SVG `<title>` and the image alt), `caption` (what the diagram shows: the teacher says it, the
site shows it as the legend), `subconcept` (the id of the sub-concept it illustrates). Every
declared file exists and every SVG of the folder is declared (`svg-contract`).

### 4.2 `concept.md` body

In this order (`concept-folder`):

1. « Objectif » (`objective`), mandatory: the concept's `objective`, verbatim, give or take line
   breaks, a capital first letter and a final period (`concept-folder`).
2. « L'essentiel » (`essentials`), mandatory: the definition and why it matters, a few lines;
   may hold a diagram image.
3. The sub-concept sections, mandatory: one per first-level sub-concept, in `course.yaml` order,
   and inside each, one per second-level sub-concept (`concept-folder`; form in section 4.5).
   A leaf section holds the leaf's **reader text**: the explanation as a site reader reads it.
4. « Pièges » (`pitfalls`), mandatory: the pitfalls of the whole concept.
5. « Le test rapide » (`quick_test`), mandatory: the quick test of the whole concept.

### 4.3 `teaching.md`

In this order (`concept-folder`):

1. « Consignes » (`instructions`), mandatory: the order of teaching and the split into
   messages, which case to pose at which sub-concept and which as fallback, the
   cross-references not to re-teach, the concept's own vigilance points. Every case of the bank
   is cited here by its title in « » (`concept-folder`; « » and “ ” count as the same quotes,
   spaces inside them ignored).
2. « Faits du fil rouge utilisés » (`storyline_facts`), optional: the storyline facts the cases
   use, and what the storyline leaves unfixed.
3. « Banque d'exemples » (`bank`), mandatory: the example bank, one `###` per case.
4. « Schéma » (`drawing`), optional: the drawing instruction (metaphor, what it shows) behind
   the concept's diagrams.

A **case** heading is `### <title> (<sub-concept>)`, where the parenthesis may add one
qualifier before or after the id, separated by a comma: `(9a1, rechange)`, `(0a2, creusage)`,
`(aparté, 11a)`. The qualifier is free text; the protocol gives meaning to some (a fallback,
a dig, an aside). The case's **title**, its identifier, is the heading without the
parenthesis; titles are unique in the concept. The sub-concept is one of the concept's, at any
level; every leaf sub-concept has at least one case (`concept-folder`).

A case is a list of fields, each item opening with `**<label>** :`, its text on the same line
or in a nested list (`concept-folder`):

| Field (key) | Status | Holds |
|---|---|---|
| « Usage » (`usage`) | optional | when to pose the case, for a case outside the normal order |
| « Explication » (`explanation`) | optional | what the teacher says before the case |
| « Réserve, sur demande » (`reserve`) | optional | what the teacher gives only if the learner asks |
| « Situation » (`situation`) | mandatory | actors and storyline facts |
| « Question » (`question`) | mandatory | the question; the label may carry a qualifier before the colon (« **Question**, en deux parties : ») |
| « Réponse attendue » (`expected_answer`) | mandatory | the right answer, with its nuances |
| « Erreurs fréquentes » (`common_mistakes`) | mandatory | frequent answers and how to correct them, follow-ups inline |
| « Ce qui marche » (`what_works`) | optional | a wording or follow-up that worked |

The optional fields before « Situation » come in any order; the four mandatory fields come in
the order of the table; « Ce qui marche » comes last.

### 4.4 `sources.md`

`sources.md` traces the source of every verifiable claim of the concept folder (definition,
consensus, school and its author, date, figure, quotation), cases included. The teacher reads
it when the learner asks where a claim comes from. A claim of the frontmatter `stances` or
`neighbors` names `headings.stances` (« Consensus et choix d'école ») as its section (the
parenthesis of column 1). The site builds only the « Affirmations » rows whose section is in
`concept.md` or is `headings.stances`, and the « Références » they cite; the other rows (a
section of `teaching.md`) are teacher-only. « Non vérifié » is not built: its items carry no section to
filter on. Storyline facts are invented and have no source. `concept.md` and `teaching.md` cite
no reference: references live in the frontmatter `refs` and here (`sources`).

In this order (`concept-folder`):

1. An introduction, optional: a paragraph that sums up the sources of the concept.
2. « Affirmations » (`claims`), mandatory: one table, four columns in this order: the claim in a
   few words with the section it lives in, in parentheses (a section of `concept.md` or of
   `teaching.md`); its source (reference ids `[S1]`, and paths `concepts/NN-slug/sources.md` of
   another concept where it was verified); what was verified (short quotation when useful);
   its nature: a stance marker word (section 4.5) or empty.
3. « Références » (`references`), mandatory: one table, five columns in this order: id
   (`S<n>`, optionally a lowercase letter: `S5b`); source (author, title, date); link (a URL,
   or empty); type: one or more of `primary`, `secondary`, `marketing`, written as the language
   pack's words and separated by commas, then an optional remark in parentheses (« primaire,
   marketing (aimant à prospects) »); consulted on (starts with `YYYY-MM-DD`).
4. « Non vérifié » (`unverified`), mandatory, possibly empty: a list of the claims no consulted
   source confirms, and why.

Rules (`sources`): reference ids are unique; every id cited (frontmatter `refs`, source column)
exists in « Références »; every reference is cited by at least one claim; every claim has a
source and a verification; a path names a concept `dir` of `course.yaml`.

### 4.5 Reader-text conventions

The structure of `concept.md` is plain Markdown under these conventions. The site maps each to
its HTML and classes; the teacher reads them as ordinary Markdown. Failure messages name the
convention.

| Convention | Form in `concept.md` | Check |
|---|---|---|
| sub-concept section | `## <id> <title>` (first level), then one paragraph entirely in italics: the **promise**; a first-level sub-concept with children holds nothing else; one without children holds its reader text after the promise | `conventions` |
| leaf heading | `### <id> <title>` (second level), then the reader text | `conventions` |
| heading title | the `<title>` of a sub-concept heading equals the `title` of `course.yaml` | `conventions` |
| concept reference | plain text `concept 4`, `concept 8a2`, `(concept 17)`, `concepts 5 et 7b`: the word (`references.concept`, plural `references.concepts`, list joined by `references.and`) then concept numbers or sub-concept ids; each names an existing concept or sub-concept of the course. A bare id with no such word (`qu'en 9a`) is plain text and is not linked | `conventions` |
| stance marker | `[cours]`, `[école]`, `[consensus]` (`markers.course`, `markers.school`, `markers.consensus`) right after the claim it qualifies; no link reference definition carries a marker's label | `conventions` |
| storyline blockquote | a blockquote whose first line starts with `**Fil rouge :**` (`markers.storyline`); in the sub-concept sections, no other blockquote | `conventions` |
| diagram image | `![<title>](<file>)` alone in its paragraph, `<file>` a declared diagram and `<title>` its declared `title`; each declared diagram appears once in the body; the caption comes from the frontmatter | `conventions` |
| pitfalls | « Pièges » is one bulleted list, each item opening with the pitfall in bold | `conventions` |
| quick test | « Le test rapide » is one blockquote (the question), then at most one paragraph (the note) | `conventions` |
| plain Markdown | no H1, no `####` or deeper heading, no HTML tag, no MDX `import`/`export` or component, no `:::` directive | `conventions` |

Everything else (bold, italics, lists, paragraphs, catalogues in bold) is ordinary Markdown.
In `teaching.md`, concept references follow the same form, not checked.

## 5. Domain files

`domains/<number>-<slug>.md`, one per domain of `course.yaml` (`course-files`). Reader-facing:
the site builds it, the teacher reads it. It teaches no concept and makes no claim that a
concept of the domain does not make: it has no sources file. No H1.

Frontmatter: `description` (mandatory, one sentence for the site), nothing else; number, title,
objective and duration are in `course.yaml` (`course-files`).

Body, all mandatory, in this order (`course-files`):

1. « Le problème » (`problem`): the difficulty met without the domain's concepts.
2. « Le fil des concepts » (`concept_thread`): one short paragraph per concept of the domain,
   in order, opening with `**<number>. <concept title>.**`, the title as in `course.yaml`
   (`course-files`). A domain of one concept has one paragraph for the concept, then one per
   first-level sub-concept, opening with `**<id>. <title>.**`. The site shows the first
   sentence after the lead on the domain page: that sentence stands alone (below).
3. « D'où l'on vient, où l'on va » (`from_to`): what the previous domain gives this one, and
   what this one gives the next.
4. « Un cas qui traverse le domaine » (`crossing_case`): a storyline situation where each
   concept of the domain serves, in order, without giving the answer.

**First sentence** (`domain-first-sentence`): it ends with `.`, `?` or `!` within 300
characters of the lead, and does not open with a word of the language pack's
`checks.anaphora` list (French: « Il », « Elle », « Ce », « Cette », « Puis »…).

## 6. Course files

- **`plan.md`** (`course-files`): a first `##` section « Public cible » (`audience`, mandatory),
  the full audience prose; a `##` section « Accueil » (`onboarding`, mandatory), what the
  teacher takes from the course to welcome a new learner: a paragraph giving the teacher's
  posture (« Posture : Product Owner senior qui forme l'apprenant. »), then a numbered list of
  the onboarding questions, at least one, each `<n>. **<question label>** : <question>`, the
  question labels distinct; the list ends the section, nothing follows it (`course-files`).
  The protocol asks the learner's nickname first, then these questions in their order, and
  says where the answers go (`PROTOCOL.md`, rules `teacher-posture-from-plan`,
  `onboarding-questions-announced`, `onboarding-questions-order` and `onboarding-profile-written`);
  a question on pace does
  not belong here, the teacher adjusts the pace as the course goes. Then optional `##` sections the teacher reads: the course's stances
  (« Parti pris : une équipe en sprints »), its own writing rules. An H1 is allowed.
- **`glossary.md`** (`course-files`): an optional introduction; one table, four columns in this
  order: the course term, its English term, the definition, the concepts that use it (numbers
  separated by commas; the first one introduces it). Optionally a section « Termes à éviter »
  (`avoid`): one table, three columns: the term to avoid, what to say instead, why. An H1 is
  allowed. The site reads the first table as is.
  **Order** (`glossary-order`): the `concept.md` of a concept does not use a term (the term
  cell, without its parenthesis, whole word, case ignored) introduced by a concept that comes
  later in course order.
- **`storyline.md`**: the storyline, free prose in the course language, read by the teacher and
  shown by the site. The cases take their actors and facts from it, without contradicting it
  (review).
- **`CHANGELOG.md`** (`course-files`): an optional introduction; a section « Non publié »
  (`unreleased`), mandatory, possibly empty; then one section per release, newest first,
  `## X.Y.Z, YYYY-MM-DD`. An entry is one line `- MAJOR|MINOR|PATCH, <where> : <what>`. A last
  free paragraph is allowed (the line that links the course to its history before 0.1.0).

## 7. The drawing contract

A **diagram** is one SVG in the concept folder, declared in `diagrams` (section 4.1). It serves
both builds: the site shows it (inline or as an image), the teacher sends it to the desktop
panel and says its caption; in the terminal, the teacher says the caption and gives the site
link. All rules are `svg-contract`.

- **File**: `<stem>.svg`, the stem lowercase ASCII words joined by hyphens; well-formed XML;
  32 KB at most.
- **Frame**: the root `<svg>` has `xmlns` and a `viewBox`, and no `width` or `height`.
- **Colour**: the root has `fill="currentColor"`. Every `fill` and `stroke` is `currentColor`
  or `none`; shades come from `fill-opacity`, `stroke-opacity` and `opacity`. No other colour
  value (hex, `rgb()`, named), no `style` attribute, no `<style>` element. The only classes are
  `primary`, `secondary` and `muted`: the site's stylesheet sets their `color` (and the dark
  theme's), which re-tints `currentColor`. Outside the site (desktop panel, any viewer) the
  drawing stays readable in one colour.
- **Text**: words are `<text>` (and `<tspan>`), never paths; the diagram has at least one
  `<text>`. Fonts: only the attribute `font-family` with generic families (`system-ui`,
  `sans-serif`, `serif`, `monospace`); no font file, no `@font-face`.
- **Accessibility**: the root has `role="img"` and `aria-labelledby` naming its `<title>` (and
  `<desc>` if present). `<title>` is the root's first child and equals the frontmatter `title`;
  `<desc>`, optional, describes the drawing for screen readers. Their ids start with the stem
  (`gateau-titre`).
- **Groups**: every drawn child of the root is a `<g>` with an `id`. Group ids are
  `<sub-concept>-<element>`: a sub-concept id of the concept, a hyphen, lowercase ASCII letters
  and digits joined by hyphens (`9a1-couches`, `9a1-tranche-1`); never a bare sub-concept id, which is the reader-text
  anchor. Ids are unique across the concept's diagrams.
- **Forbidden**: `<script>`, `on*` attributes, `<image>`, `<foreignObject>`, any `href` or
  `xlink:href` not starting with `#`, any external resource.

Nothing checks that the drawing says what its caption says: a review does.

## 8. Versions

The spec has a version `MAJOR.MINOR.PATCH`, tagged `linear-course/vX.Y.Z` on `main`:

| Bump | When |
|---|---|
| MAJOR | the structure changes: a file, a field or a mandatory section added, removed or renamed; builds and checks must follow |
| MINOR | an optional section or field added, a protocol rule added or changed |
| PATCH | the contract's wording, with no change to what is checked or taught |

A course declares the MAJOR it follows: `spec: linear-course@1`. The checks of this folder
verify a course against its declared MAJOR and fail on a MAJOR they do not know
(`course-yaml`); the teacher, the site and the classroom build refuse it. Tooling has no
version: it reads every spec MAJOR still alive.

A course has its own version, tagged `<id>/vX.Y.Z` and recorded in its `CHANGELOG.md`: MAJOR
when an identifier changes (section 3) or the course moves to a new spec MAJOR, MINOR when what
is taught changes (a case, a sub-concept, a stance, a duration), PATCH for wording. A course
in 0.x may still move anything, identifiers included. The spec's own changelog,
`specs/linear-course/CHANGELOG.md`, opens with v1.0.0.

## 9. Language pack keys

The language pack of the course language holds every key below; `language-pack-keys` verifies
it, with the keys `PROTOCOL.md` uses. French values, for reference:

| Group | Keys and French values |
|---|---|
| `headings` | `objective` « Objectif », `essentials` « L'essentiel », `stances` « Consensus et choix d'école » (the site's heading for the frontmatter stances, and the section a `sources.md` claim names for them: no `concept.md` section has it), `pitfalls` « Pièges », `quick_test` « Le test rapide »; `instructions` « Consignes », `storyline_facts` « Faits du fil rouge utilisés », `bank` « Banque d'exemples », `drawing` « Schéma »; `claims` « Affirmations », `references` « Références », `unverified` « Non vérifié »; `problem` « Le problème », `concept_thread` « Le fil des concepts », `from_to` « D'où l'on vient, où l'on va », `crossing_case` « Un cas qui traverse le domaine »; `audience` « Public cible », `onboarding` « Accueil », `avoid` « Termes à éviter », `unreleased` « Non publié » |
| `case_fields` | `usage` « Usage », `explanation` « Explication », `reserve` « Réserve, sur demande », `situation` « Situation », `question` « Question », `expected_answer` « Réponse attendue », `common_mistakes` « Erreurs fréquentes », `what_works` « Ce qui marche » |
| `markers` | `storyline` « Fil rouge », `consensus` « consensus », `school` « école », `course` « cours » |
| `references` | `concept` « concept », `concepts` « concepts », `and` « et » |
| `source_types` | `primary` « primaire », `secondary` « secondaire », `marketing` « marketing » |
| `typography` | `banned`: the characters course text never uses (French: em-dash, arrows) |
| `checks` | `anaphora`: the words a domain paragraph's first sentence does not open with |

## 10. Checks

Dependency-light scripts in `checks/`, one per id, run on a course by
`checks/check-course <course-dir>` (one line per check, `ok` or `fail: <file>:<line> <message>`,
non-zero exit on any failure, `--only <id>`), locally and in CI.

| Id | Verifies | Sections |
|---|---|---|
| `course-yaml` | `course.yaml` fields, identifiers, order, partition into domains, annexes, prerequisites, paths, supported spec MAJOR, language pack present | 3, 8 |
| `concept-folder` | the folder's files; the three files' sections and their order; frontmatter keys; one section per sub-concept; « Objectif » equals `objective`; case headings, fields, coverage of leaves, citation in « Consignes » | 4 |
| `conventions` | the reader-text conventions of `concept.md`; plain Markdown in course files | 2, 4.5 |
| `svg-contract` | every diagram against the drawing contract; declared and present diagrams match | 4.1, 7 |
| `sources` | reference ids, citations, claims, paths | 4.1, 4.4 |
| `course-files` | `plan.md` (« Public cible », « Accueil » and its questions), `glossary.md`, `CHANGELOG.md`, domain files: presence, frontmatter, sections, leads | 5, 6 |
| `glossary-order` | no term used before the concept that introduces it | 6 |
| `domain-first-sentence` | the first sentence of each paragraph of « Le fil des concepts » stands alone | 5 |
| `typography` | no banned character of the language pack in course text | 2 |
| `language-pack-keys` | every key of section 9 and of `PROTOCOL.md` exists in the course's language pack | 9 |

**`taught-check`** is not a script: it is an agent workflow (`.claude/workflows/taught-check.js`)
that verifies that no case asks what the learner has not yet been taught. It is mandatory after
any change to what is taught (`teaching.md`, a sub-concept, an order), before the merge.
