# linear-course: the spec

Version 1.0.0, draft: binding from the tag `linear-course/v1.0.0`. The pedagogical protocol is
not in this file: it is `PROTOCOL.md`, beside it, because this file would exceed about 400 lines
with it. The four parts of the spec are the **structure** and its **reader-text conventions**
(this file), the **diagrams**, their drawing contract and style (this file), the **checks** (this
file, scripts in `checks/`) and the **protocol** (`PROTOCOL.md`).

**Language exception.** The rules of `PROTOCOL.md` are written in French, a bounded exception
to the language policy (`docs/decisions/language-policy.md`): the old teacher was instructed and
corrected in French. Task S2-09 (issue #38) closes it: it translates the rules to English, rule
by rule, and removes this paragraph.

"Mandatory" means an element's absence fails the check named; its form is checked where that
check says so, reviewed otherwise. "Optional" means it may be absent, and when present it
follows the rule given. Every rule names the check that enforces it, in backquotes; a rule with
no check id is enforced by review.

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

**Purpose.** The tree a course is made of: every build and every check finds a file by its
place in it, and the section each line names gives the file's form.

| Reader | Needs | When |
|---|---|---|
| the creator (human or agent) | the files a course has, which are mandatory, where each one's form is given | creating a course; adding a domain or a concept |
| the site | where each file it builds is | at each build |
| the reviewer | that a change sits where the spec puts it, in plain CommonMark | reviewing a change |

```
courses/<id>/
  course.yaml          mandatory   identity, domains, concepts, sub-concepts (section 3)
  plan.md              mandatory   prose: audience, onboarding, stances, writing rules (section 6)
  glossary.md          mandatory   the course glossary (section 6)
  storyline.md         mandatory   the storyline (section 6)
  CHANGELOG.md         mandatory   the course changelog (section 6)
  domains/N-slug.md    mandatory   one domain file per domain (section 5)
  concepts/NN-slug/    mandatory   one concept folder per numbered concept and annex (section 4)
  decisions/           optional    the course's decisions; no build reads it
```

Course Markdown is plain CommonMark with YAML frontmatter where stated: no HTML, no MDX, no
remark directive (`conventions`). Course text follows the typography of the language pack;
its banned characters (French: em-dash, arrows) fail the check (`typography`).

## 3. `course.yaml`

**Purpose.** The map of the course: its identity, its domains, its concepts in course order with
their prerequisites and sub-concept trees, and the identifiers that learner memory and site
addresses cite.

| Reader | Needs | When |
|---|---|---|
| the creator (human or agent) | the course order and the split of each concept into leaf sub-concepts | designing the course; each change of its plan |
| the teacher | the order it teaches in, the prerequisites, one leaf sub-concept per message | each teaching session |
| the site | titles, objectives, durations, the order of the pages and their addresses | at each build |
| the maintainer | the identifiers whose change is a course MAJOR (below) | classing a course change |

Read by the site, the classroom build and the checks (`course-yaml` for every rule here).

| Field | Presence | Meaning |
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
| `concepts` | mandatory | every numbered concept and annex, in course order (below) |
| `annexes` | optional | numbers of the concepts that are annexes; absent means none |

A **domain** entry:

| Field | Presence | Meaning |
|---|---|---|
| `number` | mandatory | integer; the domains are numbered 1, 2, 3… in list order |
| `slug` | mandatory | lowercase ASCII words joined by hyphens |
| `title` | mandatory | the domain title |
| `objective` | mandatory | what the learner can do at the end of the domain, one sentence |
| `duration_min` | mandatory | minutes of conversation with the teacher, low estimate, asides excluded |
| `file` | mandatory | `domains/<number>-<slug>.md`; the file exists |
| `concepts` | mandatory | the numbers of the domain's concepts, in course order |

A **concept** entry (annexes included):

| Field | Presence | Meaning |
|---|---|---|
| `number` | mandatory | the concept's identifier: `0`, `1`… for a numbered concept, `A1`, `A2`… for an annex; a string (an unquoted integer is read as its decimal string) |
| `slug` | mandatory | lowercase ASCII words joined by hyphens |
| `title` | mandatory | the concept title |
| `objective` | mandatory | what the learner can do after the concept, one sentence; restated in « Objectif » (section 4.2) |
| `prerequisites` | mandatory | numbers of the concepts the learner must have validated first; `[]` for none |
| `duration_min` | optional | minutes of conversation with the teacher, low estimate |
| `dir` | mandatory | `concepts/<NN>-<slug>`, `NN` the number on two digits (`09`); an annex keeps its number (`concepts/A1-<slug>`); the folder exists |
| `subconcepts` | mandatory | the concept's sub-concept tree, non-empty (below) |

A **sub-concept** node:

| Field | Presence | Meaning |
|---|---|---|
| `id` | mandatory | first level: the concept number and a letter, from `a` in order (`9a`, `9b`, `A2a`); second level: its parent's id and a digit, from `1` in order (`9a1`, `9a2`) |
| `title` | mandatory | the sub-concept title, as its heading in `concept.md` writes it |
| `children` | optional | second-level nodes, 9 at most (a child id ends in one digit); the tree has two levels at most |

A node without `children` is a **leaf sub-concept**: as a rule, one teacher message with one
question. The teacher cuts a leaf too big for one message (`PROTOCOL.md`, rule
`short-messages`); its « Consignes » (section 4.3) may say how.

Rules:
- concept numbers and sub-concept ids are unique; the concepts come in course order: numbered
  concepts by increasing number, then the annexes;
- every numbered concept belongs to exactly one domain; each domain's concepts are consecutive
  and follow the previous domain's; annexes belong to no domain and are exactly the `A`
  numbers;
- a prerequisite is an existing numbered concept that comes earlier (any numbered concept for
  an annex);
- every folder of `concepts/` is the `dir` of a concept entry.

**Identifiers.** Concept numbers, sub-concept ids, case titles (section 4.3), domain numbers and
their concepts, concept `dir` and domain `file` names are the course's identifiers: learner
memory and site addresses cite them. Changing one is a course MAJOR (section 8).

## 4. The concept folder

```
concepts/09-decoupage-vertical/
  concept.md         mandatory   reader-facing: built by the site, read by the teacher
  teaching.md        mandatory   teacher-only: teaching notes, example bank included; never built
  sources.md         mandatory   reader-facing: built by the site, « Non vérifié » excepted (4.4)
  <stem>.svg         optional    reader-facing: one file per diagram (section 7)
```

Nothing else sits in a concept folder (`concept-folder`). The three Markdown files have no H1:
the title is in `course.yaml`. Sections are `##` headings whose text is the language pack's
heading, in the order given, and no other `##` section exists (`concept-folder`).

### 4.1 `concept.md` frontmatter

| Key | Presence | Meaning |
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
(mandatory, possibly empty: reference ids of `sources.md`, `sources`), `verified` (mandatory
when `refs` is not empty, absent otherwise: a list parallel to `refs`, one entry per reference
in the same order, each the shortest quotation that settles the item, between « », and its
place in parentheses, as the verified column of 4.4; `concept-folder` fails a `verified` whose
length differs from `refs`). A stance or a neighbour is sourced in its item, never by a row of
« Affirmations »: the proof sits beside what it proves. `verified` is audit material, like
« Affirmations »; a re-verification is a change of `concept.md`.

A **diagram** entry, all keys mandatory: `file` (the SVG's file name), `title` (one line: the
SVG `<title>` and the image alt), `caption` (what the diagram shows: the teacher says it, the
site shows it as the legend), `subconcept` (the id of the sub-concept it illustrates). Every
declared file exists and every SVG of the folder is declared (`svg-contract`).

### 4.2 `concept.md` body

In this order (`concept-folder`):

1. « Objectif » (`objective`), mandatory: the concept's `objective`, verbatim, give or take line
   breaks, written with a capital first letter and ending with a period where the field ends
   with no `.`, `!` or `?` (`concept-folder`).
2. « L'essentiel » (`essentials`), mandatory: the definition and why it matters, a few lines;
   may hold a diagram image.
3. The sub-concept sections, mandatory: one per first-level sub-concept, in `course.yaml` order,
   and inside each, one per second-level sub-concept (`concept-folder`; form in section 4.5).
   A leaf section holds the leaf's **reader text**: the explanation as a site reader reads it.
4. « Pièges » (`pitfalls`), mandatory: the pitfalls of the whole concept.
5. « Le test rapide » (`quick_test`), mandatory: the quick test of the whole concept.
6. « Approfondissement » (`deepening`), optional: more matter on the concept, beyond what its
   sub-concept sections teach, for the learner who asks to go further. Its claims are sourced in
   `sources.md` like any other (4.4), and the site builds it like the rest of the file. The
   teacher reads it in an aside, on the learner's request (`PROTOCOL.md`, rule
   `asides-welcome`), never on the course path; no case, of any type, relies on it.

### 4.3 `teaching.md`

**Purpose.** `teaching.md` holds what the teacher needs beyond the reader text, above all the
**cases**. A case is the prepared question of the loop: the teacher poses it at a sub-concept and
corrects the answer. It gives coverage (every leaf sub-concept has one, checked), the course's
own position (its expected answer is the stance the concept states: consensus, school or
course), experience (it anticipates the mistakes learners make), anchoring (it lives in the
storyline) and testability (taught-check and fresh tests cite it by its title). A case is created for one of
four needs, its **type** (below): one per leaf sub-concept, on the course path; a fallback, when
the learner fails the first; a practice case, for the learner who wants to practise a validated
concept; an aside, for a frequent question off the course path. A case is never created for what
the reader text does not state: that is a gap of the concept, filled in `concept.md`.

| Reader | Needs | When |
|---|---|---|
| the teacher | the order and split of the concept, the case to pose at each sub-concept, how to correct the answer | each leaf sub-concept; each fallback, practice case or aside |
| the learner | through the teacher, a case's explanation, situation and question; its expected answer never before they answer | each message that poses a case |
| the creator (human or agent) | when to create a case, and what each of its fields may contain | writing or changing a concept's teaching notes |
| taught-check | what each case asks, against what the learner was taught before it | after a change to what a concept teaches |

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

`teaching.md` never overrides a protocol rule: it says what to teach, `PROTOCOL.md` says how and
when (« Schéma » says what to draw, not when to send a diagram); a « Consignes » that
contradicts a rule is a defect of the concept (review). A case restates only the storyline facts
listed in « Faits du fil rouge utilisés », which takes them from `storyline.md`; it adds the
unfolding (who says what, when), never a new fact (review).

A **case** heading is `### <title> (<sub-concept>)`. The parenthesis holds the sub-concept id
and at most one **qualifier**, before or after the id, separated by a comma: `(9a1, rechange)`,
`(aparté, 11a)`; nothing else (`concept-folder`). The qualifier is a value of the language
pack's `qualifiers` group and gives the case its type:

| Type | Qualifier (key) | The teacher poses it |
|---|---|---|
| main | none | at its sub-concept, on the course path, in the order of « Consignes » |
| fallback | « rechange » (`qualifiers.fallback`) | when the learner fails the case of the same sub-concept; it stands alone: its own situation and question, nothing borrowed from the failed case |
| practice | « entraînement » (`qualifiers.practice`) | when the learner practises a validated concept, one case per message, without re-explaining (`PROTOCOL.md`, rules `validated-concept-exercises` and `digging-cases-chosen`) |
| aside | « aparté » (`qualifiers.aside`) | in an aside, on a question off the course path (rule `asides-welcome`) |

The case's **title**, its identifier, is the heading without the parenthesis; titles are unique
in the concept. The sub-concept is one of the concept's, at any level; every leaf sub-concept
has at least one case (`concept-folder`).

A case is a list of fields, each item opening with `**<label>** :`, its text on the same line
or in a nested list; only the « Question » label may carry a qualifier of its own before the
colon (« **Question**, en deux parties : ») (`concept-folder`):

| Field (key) | Presence | May contain | Who reads it | When the teacher uses it |
|---|---|---|---|---|
| « Usage » (`usage`) | optional | when to pose the case, for a case off the course path: a fallback, a practice case, an aside | the teacher | choosing the next case |
| « Explication » (`explanation`) | optional | what the teacher says before the case: the source of its explanation of the sub-concept; without it, the teacher explains from the leaf's reader text | the teacher, then the learner | in the message that poses the case, before the situation |
| « Situation » (`situation`) | mandatory | the actors and the storyline facts posed up front, and the unfolding (who says what, when) | the teacher, then the learner | in the message that poses the case, before the question |
| « Question » (`question`) | mandatory | the question the case asks | the teacher, then the learner; taught-check | at the end of the message that poses the case |
| « Réponse attendue » (`expected_answer`) | mandatory | the right answer with its nuances: the course's position as `concept.md` states it | the teacher; taught-check | correcting the learner's answer |
| « Erreurs fréquentes » (`common_mistakes`) | mandatory | frequent answers and how to correct them, follow-ups inline | the teacher | correcting a partial or wrong answer, and in its follow-ups |
| « Ce qui marche » (`what_works`) | optional | a wording or follow-up a teacher saw work; empty in a new course; the maintainer adds it from what the teacher notes in learner memory (`PROTOCOL.md`, rule `save-levers`) | the teacher | posing the case and correcting the answer |

The optional fields before « Situation » come in any order; the four mandatory fields come in
the order of the table; « Ce qui marche » comes last.

### 4.4 `sources.md`

**Purpose.** `sources.md` shows that the concept is grounded, and lets anyone trace a claim of
its body to what it rests on. « Références » serves the site reader first; « Affirmations »
serves the audit (the reviewer, the maintainer, the teacher on request). Traceability is worth
its re-verification, not its volume.

| Reader | Needs | When |
|---|---|---|
| the site reader | to know the course is grounded; where to read further; which claim is consensus, school or the course's choice | reading a concept |
| the teacher | the source as described, to answer « d'où ça vient ? », and what is not verified (`PROTOCOL.md`, rules `origin-from-sources-file` and `unverified-part-told`) | on the learner's request |
| the creator (human or agent) | what to source and what not to; where to put what could not be confirmed | writing the concept |
| the reviewer | that a claim is backed by what it cites: the quotation, the place | reviewing a change |
| the maintainer | when a source changes or a section is rewritten, what to re-verify; when it was consulted | months later |

Only `concept.md` is sourced. « Affirmations » covers the verifiable claims of its body (a
definition, a date, a figure, a quotation, what a guide says or does not say). Not a row: a
storyline fact (invented, in `storyline.md`), a teaching device (an invented example, a
deduction of a case), a stance or a neighbour (sourced in its frontmatter item, 4.1), a wording
of the course. A claim only `teaching.md` states is a gap of the concept, added to `concept.md`
first, or no claim to source. `concept.md` and `teaching.md` cite no reference: references live
in the frontmatter `refs` and here (`sources`).

The site builds every row of « Affirmations » and « Références »: no row is teacher-only.
« Non vérifié » is the one section never built (by its pack heading); the classroom copies the
whole file.

The file has no H1 and no introduction: it opens on « Affirmations » (`sources`). In this order
(`concept-folder`):

1. « Affirmations » (`claims`), mandatory: one table, five columns in this order:
   - **claim**: the claim in a few words;
   - **section**: where `concept.md` makes it: sub-concept ids (`4b`, `9a1`) and fixed sections
     by their pack value, « L'essentiel », « Pièges », « Le test rapide », « Approfondissement »
     (`headings.essentials`, `pitfalls`, `quick_test`, `deepening`), several separated by
     commas, never a heading's text; each exists in `concept.md` (`sources`). « Objectif » is
     not one: it states what the learner will do, not a claim;
   - **source**: reference ids `[S1]`, separated by commas, or the `markers.course` word
     (« cours ») for a claim the course makes by its own choice; nothing else: no free text, no
     path to another concept, whose verification each concept repeats with its own reference
     (`sources`);
   - **verified**: per reference of the source cell, in the same order, the shortest quotation
     that settles the claim, between « », then its place in parentheses (section, page,
     heading); for an absence, « absent de » and the place searched; for a « cours » claim, one
     line saying what it follows from, or nothing. No reasoning, no pointer to « Non vérifié »:
     what cannot be quoted goes there (review). The cell is empty only for a « cours » claim
     (`sources`);
   - **nature**, mandatory: `consensus`, `école`, `cours` (the stance markers
     `markers.consensus`, `markers.school`, `markers.course`) or `fait` (`natures.fact`: what a
     source states with no stance, a tool's default, a date, a figure) (`sources`). A claim the
     reader text marks with a stance marker has that marker's nature; a « cours » source has
     nature `cours` (review).
2. « Références » (`references`), mandatory: one table, five columns in this order: **id**
   (`S<n>`, optionally a lowercase letter: `S5b`), unique; **source** (author, title, date: how
   the teacher names it; a description repeated from another concept is copied identically);
   **link**, one URL or empty: a second place is a second reference, never a second URL nor a
   path to a repository file (`sources`); **type**, how much to trust it and how to name it: one
   or more of `primary` (the text itself), `secondary` (someone reporting it), `marketing` (a
   vendor's or a training's page), written as the language pack's words and separated by
   commas, then an optional remark in parentheses (« primaire, marketing (aimant à
   prospects) »); **consulted on**, when this reference was read for this concept: it starts
   with `YYYY-MM-DD`. References are per concept: each concept cites its own.
3. « Non vérifié » (`unverified`), mandatory, possibly empty: a list; each entry opens with its
   section, in the forms of the section column or `headings.stances` (« Consensus et choix
   d'école ») for a stance or a neighbour, then « : » (`sources`), then what no consulted source
   confirms, why, and, when useful, the instruction that follows (« écrire X, pas Y »). It holds
   no trace of a removed claim: git history is the trace.

Rules (`sources`): every id cited (frontmatter `refs`, source column) exists in « Références »;
every reference is cited by a claim or a frontmatter item.

### 4.5 Reader-text conventions

The structure of `concept.md` is plain Markdown under these conventions. The site maps each to
its HTML and classes; the teacher reads them as ordinary Markdown. Failure messages name the
convention.

| Convention | Form in `concept.md` | Check |
|---|---|---|
| sub-concept section | `## <id> <title>` (first level), then one paragraph entirely in italics: the **promise**; a first-level sub-concept with children holds nothing else; one without children holds its reader text after the promise | `conventions` |
| leaf heading | `### <id> <title>` (second level), then the reader text | `conventions` |
| heading title | the `<title>` of a sub-concept heading equals the `title` of `course.yaml` | `conventions` |
| concept reference | plain text `concept 4`, `concept 8a2`, `(concept 17)`, `concepts 5 et 7b`: the word (`concept_refs.concept`, plural `concept_refs.concepts`, list joined by `concept_refs.and`) then concept numbers or sub-concept ids; each names an existing concept or sub-concept of the course. To an annex, `annexe A2`, `annexe A2b`: the word `concept_refs.annex` then an annex number or the sub-concept id of an annex, which exists in the course. A bare id with no such word (`qu'en 9a`) is plain text and is not linked | `conventions` |
| stance marker | `[cours]`, `[école]`, `[consensus]` (`markers.course`, `markers.school`, `markers.consensus`) right after the claim it qualifies; no link reference definition carries a marker's label | `conventions` |
| storyline blockquote | a blockquote whose first line starts with `**Fil rouge :**` (`markers.storyline`); in the sub-concept sections, no other blockquote | `conventions` |
| diagram image | `![<title>](<file>)` alone in its paragraph, `<file>` a declared diagram and `<title>` its declared `title`; each declared diagram appears once in the body; the caption comes from the frontmatter. The image sits in the section of its `subconcept` (one of its `###` sections included) or in « L'essentiel » (review) | `conventions` |
| pitfalls | « Pièges » is one bulleted list, each item opening with the pitfall in bold | `conventions` |
| quick test | « Le test rapide » is one blockquote (the question), then at most one paragraph (the note) | `conventions` |
| plain Markdown | no H1, no `####` or deeper heading, no HTML tag, no MDX `import`/`export` or component, no `:::` directive | `conventions` |

Everything else (bold, italics, lists, paragraphs, catalogues in bold) is ordinary Markdown.
In `teaching.md`, concept references follow the same form, not checked.

## 5. Domain files

**Purpose.** A domain file is the way into a domain: the problem it settles, how its concepts
follow one another, where it sits in the course, and a storyline situation that crosses it. The
same text serves the reader and the teacher.

| Reader | Needs | When |
|---|---|---|
| the learner | why the domain matters and how its concepts connect | before its concepts |
| the teacher | what it says to present the domain (`domain-presented-from-sheet`) | before the first concept of a domain |
| the creator (human or agent) | what each section says, and that it teaches no concept | writing or changing a domain |

`domains/<number>-<slug>.md`, one per domain of `course.yaml`, and no other file in `domains/`
(`course-files`). Reader-facing:
the site builds it, the teacher reads it. It holds no text for the teacher only: its whole text
is for the reader. It teaches no concept and makes no claim that a concept of the domain does
not make: it has no sources file. No H1.

Frontmatter: `description` (mandatory, one sentence for the site), nothing else; number, title,
objective and duration are in `course.yaml` (`course-files`).

Body, all mandatory, in this order (`course-files`):

1. « Le problème » (`problem`): the difficulty met without the domain's concepts.
2. « Le fil des concepts » (`concept_thread`): one short paragraph per concept of the domain,
   in order, opening with `**<number>. <concept title>.**`, the title as in `course.yaml`
   (`course-files`). A domain of one concept has one paragraph for the concept, then one per
   first-level sub-concept, opening with `**<id>. <title>.**`. Each paragraph's first sentence
   after the lead stands alone, so that a consumer can show it alone (below).
3. « D'où l'on vient, où l'on va » (`from_to`): what the previous domain gives this one, and
   what this one gives the next.
4. « Un cas qui traverse le domaine » (`crossing_case`): a storyline situation where each
   concept of the domain serves, in order, without giving the answer.

**First sentence**: it ends with `.`, `?` or `!` within 300 characters of the lead, so that
the site can show it (`domain-first-sentence`, a conformity check), and does not open with a
word of the language pack's `checks.anaphora` list (French: « Il », « Elle », « Ce », « Cette »,
« Puis »…), so that it stands alone (`domain-first-sentence-standalone`, a quality check).

## 6. Course files

**Purpose.** The files that hold what spans the whole course: who it is for and how the teacher
welcomes a learner (`plan.md`), its terms (`glossary.md`), the world its cases live in
(`storyline.md`), its history (`CHANGELOG.md`).

| Reader | Needs | When |
|---|---|---|
| the teacher | its posture, the onboarding questions, the course's stances, the storyline facts its cases use | onboarding; each case it poses |
| the learner | the course glossary and the storyline | reading the course on the site |
| the creator (human or agent) | the terms to use and the defining concept of each, the storyline facts a case may draw on | writing a concept or a case |
| the maintainer | what changed in each course version | each release |

- **`plan.md`** (`course-files`): a first `##` section « Public cible » (`audience`, mandatory),
  the full audience prose; a `##` section « Accueil » (`onboarding`, mandatory), what the
  teacher takes from the course to welcome a new learner: one paragraph giving the teacher's
  posture (« Posture : Product Owner senior qui forme l'apprenant. »), then a numbered list of
  the onboarding questions, at least one, each `<n>. **<question label>** : <question>`, the
  question labels distinct; the list ends the section, nothing follows it (`course-files`).
  The protocol asks the learner's nickname first, then these questions in their order, and
  says where the answers go (`PROTOCOL.md`, rules `teacher-posture-from-plan`,
  `onboarding-questions-announced`, `onboarding-questions-order` and `onboarding-profile-written`);
  a question on pace does not belong here, the teacher adjusts the pace as the course goes. Then
  optional `##` sections the teacher reads: the course's stances
  (« Parti pris : une équipe en sprints »), its own writing rules. An H1 is allowed.
- **`glossary.md`** (`course-files`): an optional introduction; one table, before any `##`
  section, of four columns in this order (`course-files` checks their count; this file names
  them by their meaning, and their header text is the course's, « Concept » or « Défini dans »):
  1. the course term, in the **term cell** (below);
  2. its English term, empty when the term has no useful English equivalent or when the course
     term already is the English word;
  3. the definition;
  4. the **defining concept**: one concept number of `course.yaml`, the concept a learner
     opens to dig into the term: the one whose reader text teaches it (its objective or one of
     its sub-concepts is about it), not one that uses it or defines it in passing with a
     concept reference to another concept (`course-files` checks the form; review checks the
     choice). Two concepts that teach the term as deeply usually mean two terms, in two rows;
     otherwise the defining concept is the first in course order. A term no concept teaches is
     a gap of the course (its explanation enters a concept) or leaves the glossary. The
     definition sums up the defining concept's reader text and states nothing it does not. No
     list of the concepts that use the term: a script or the site computes it from the
     variants.

  Optionally a section « Termes à éviter » (`avoid`): one table, three columns: the term to
  avoid, what to say instead, why. An H1 is allowed. The site reads the first table as is.

  **Term cell**: one term, or its variants separated by commas (« Product Owner, PO »), each
  matched whole word, case ignored. A parenthesis is a sense qualifier (« État (d'un
  élément) »): a row whose term cell has one is skipped by the order check, since no script
  tells the senses of a homonym apart; review does. A variant belongs to one row: no two rows
  hold the same variant, case ignored, its qualifier included (`course-files`).

  **Order** (`glossary-order`, a quality check: it reports, it does not block): a term is used
  after its defining concept, in course order. The scope is the reader text, the
  `concept.md` of each concept: its body and its frontmatter (the texts of `stances` and
  `neighbors`, the `title` and `caption` of `diagrams`); `teaching.md` is not read. Every use
  counts, not only the first. In the `concept.md` of a concept that comes before the defining
  concept, a term is used only in a sentence that carries a concept reference (4.5) to the
  defining concept or to one of its sub-concepts (« annexe A2 », « annexe A2b » for an annex),
  or that defines the term in passing (review). A sentence ends at « . », « ? », « ! » or « … »
  followed by a space or the end of its block; « : » and « ; » do not end it. A paragraph, a
  blockquote, a list item, a heading, a table row and a frontmatter text are blocks, and a
  sentence never crosses one.
- **`storyline.md`**: the storyline, free prose in the course language, read by the teacher and
  shown by the site. The cases take their actors and facts from it, without contradicting it
  (review).
- **`CHANGELOG.md`** (`course-files`): an optional introduction; a section « Non publié »
  (`unreleased`), mandatory, possibly empty; then one section per release, newest first,
  `## X.Y.Z, YYYY-MM-DD`. An entry is one line `- MAJOR|MINOR|PATCH, <where> : <what>`. A last
  free paragraph is allowed (the line that links the course to its history before 0.1.0).

## 7. Diagrams

**Purpose.** A diagram shows in one drawing what a sub-concept teaches. One SVG serves every
place the learner meets it, so it is complete on its own and no consumer asks it to change.

| Reader | Needs | When |
|---|---|---|
| the learner | a drawing readable on the site in both themes and in the desktop panel; in the terminal, its caption and the site link | at the sub-concept it illustrates |
| the creator (human or agent) | the contract an SVG meets (7.1) and the style it is drawn in (7.2) | drawing or redrawing a diagram |
| the site | the one property a consumer keeps when it displays a diagram (below) | at each build |
| the teacher | the same property, in the desktop panel | sending a diagram |
| the reviewer | the style and the match with the caption, which no script checks | reviewing a diagram |

A **diagram** is one SVG in the concept folder, declared in `diagrams` (section 4.1). It serves
both builds: the site shows it, the teacher sends it to the desktop panel and says its caption;
in the terminal, the teacher says the caption and gives the site link. A consumer displays the
SVG so that `currentColor` follows the colour of the text around it, and may tint the three
classes of 7.1, never must. Section 7.1 is the drawing contract, checked by `svg-contract`
where a script can tell, by review otherwise; section 7.2 is the style every diagram of a course
shares, for the writers and the reviews.

### 7.1 Drawing contract

**Purpose.** The rules that keep one SVG safe and readable in every consumer: `svg-contract`
checks what a script can tell, a review the rest (below).

| Reader | Needs | When |
|---|---|---|
| the creator (human or agent) | what an SVG may hold, to pass `svg-contract` | drawing a diagram |
| the site | an SVG shown as it is: no script, no external resource, colours that follow the text around it | at each build |
| the teacher | an SVG the desktop panel shows as it is | sending a diagram |
| the learner | with a screen reader, the title and description of the drawing | reading a concept on the site |

- **File**: `<stem>.svg`, the stem lowercase ASCII words joined by hyphens; well-formed XML;
  32 KB at most.
- **Frame**: the root `<svg>` has `xmlns` and a `viewBox`, and no `width` or `height`.
- **Colour**: the root has `fill="currentColor"`. Every `fill` and `stroke` is `currentColor`
  or `none`; shades come from `fill-opacity`, `stroke-opacity` and `opacity`. No other colour
  value (hex, `rgb()`, named), no `style` attribute, no `<style>` element. The only classes are
  `primary`, `secondary` and `muted`: a consumer's stylesheet may set their `color` (and the
  dark theme's), which re-tints `currentColor`. Outside the site (desktop panel, any viewer) the
  drawing stays readable in one colour.
- **Text**: words are `<text>` (and `<tspan>`), never paths; the diagram has at least one
  `<text>`. Fonts: only the attribute `font-family` with generic families (`system-ui`,
  `sans-serif`, `serif`, `monospace`); no font file, no `@font-face`.
- **Accessibility**: the root has `role="img"` and `aria-labelledby` naming its `<title>` (and
  `<desc>` if present). `<title>` is the root's first child and equals the frontmatter `title`;
  `<desc>`, optional, describes the drawing for screen readers. Their ids start with the stem
  (`gateau-titre`).
- **Groups**: every drawn child of the root is a `<g>` with an `id`; a `<defs>`, which is not
  drawn, may sit at the root beside them, and what it holds follows this contract. Group ids are
  `<sub-concept>-<element>`: a sub-concept id of the concept, a hyphen, lowercase ASCII letters
  and digits joined by hyphens (`9a1-couches`, `9a1-tranche-1`); never a bare sub-concept id, which is the reader-text
  anchor. Ids are unique across the concept's diagrams.
- **Forbidden**: `<script>`, `on*` attributes, `<image>`, `<foreignObject>`, any `href` or
  `xlink:href` not starting with `#`, any external resource.

Nothing checks that the drawing says what its caption says: a review does.

### 7.2 Style

**Purpose.** One meaning per class and six principles, so that the same role looks the same from
one concept to the next, whoever draws it.

| Reader | Needs | When |
|---|---|---|
| the creator (human or agent) | which class and opacity each role takes, what a diagram holds | drawing or redrawing a diagram |
| the reviewer | the principles a diagram is judged against | reviewing a diagram |

Every diagram of a course is drawn in one style, whoever draws it (a migration, `course-batch`,
a contributor): the same role takes the same class from one concept to the next (decision
`one-diagram-style`). It is written for the diagrams to draw, not for compatibility with older
ones: six principles. No script checks it: a review does.

Each class means one thing in every diagram: **`primary`** what the diagram teaches, its focus;
**`secondary`** the contrast, a second element set against the first; **`muted`** the context
and the ordinary text.

1. **One idea per diagram.** A diagram shows what its caption says; a caption that needs two
   sentences means two diagrams.
2. **Roles.** A diagram has a subject, at most one contrast, a context and text. A series is the
   subject in levels; a state (done, not done, refused) is said by form.
3. **Rendering of the roles.**
   - subject: `primary`, opacity 1;
   - series: `primary` at falling opacity (1, 0.7, 0.4);
   - contrast: `secondary`;
   - context: `muted`, a low opacity for fills, a middle one for lines;
   - text: `muted`, opacity 1; `primary` only when the word is the subject;
   - state: solid for done, dashed for not done or uncertain, struck for refused.

   In one colour, nothing is more marked than the subject; the contrast differs from the subject
   by opacity or form, not by hue alone.
4. **Readable in one colour.** Opacity and form carry every distinction, never the hue alone.
   Text is always legible: never knocked out of a fill, never on a fill darker than itself.
5. **Composition.** The `viewBox` is 600 units wide by default. The diagram reads left to right
   or top to bottom; it holds few elements, with space between them. Its text is in the
   course's words, never under 14 units.
6. **Text the diagram holds.** Its labels, and a key (a sample and a word) when a distinction of
   form or opacity must be named. No teaching sentence: that is the `caption`. No decoration,
   icon or gradient.

## 8. Versions

**Purpose.** What a spec version and a course version promise, so that a change is classed
before it lands and a course runs against the checks of the MAJOR it declares.

| Reader | Needs | When |
|---|---|---|
| the maintainer | the bump a change makes, to the spec or to a course | classing a change; each release |
| the creator (human or agent) | the course changes that are a MAJOR (an identifier) | changing a released course |
| the reviewer | the class a course change claims in `CHANGELOG.md` | reviewing a course change |

The spec's versions, its MAJOR folders and what each bump means are decision
`versioned-objects-and-spec-layout` (`docs/decisions/versioned-objects-and-spec-layout.md`),
summarised in `specs/README.md`.

A course declares the MAJOR it follows: `spec: linear-course@1`. `specs/check-course` reads it
and runs this MAJOR's checks (section 10).

A course has its own version, tagged `<id>/vX.Y.Z` and recorded in its `CHANGELOG.md`: MAJOR
when an identifier changes (section 3) or the course moves to a new spec MAJOR, MINOR when what
is taught changes (a case, a sub-concept, a stance, a duration), PATCH for wording. A course
in 0.x may still move anything, identifiers included.

## 9. Language pack keys

**Purpose.** The words that depend on the course language, named by key so that this file, the
checks and the protocol hold for every language.

| Reader | Needs | When |
|---|---|---|
| the creator (human or agent) | the headings, case field labels, qualifiers, markers and natures to write, in the course language | writing any course file |
| the maintainer | the keys a new language's pack must hold | adding a language |

The language pack of the course language holds every key below, `checks.anaphora` excepted,
which is optional; `language-pack-keys` verifies it, with the keys `PROTOCOL.md` uses. French
values, for reference:

| Group | Keys and French values |
|---|---|
| `headings` | `objective` « Objectif », `essentials` « L'essentiel », `stances` « Consensus et choix d'école » (the site's heading for the frontmatter stances, and the section a « Non vérifié » entry of `sources.md` names for a stance or a neighbour: no `concept.md` section has it), `pitfalls` « Pièges », `quick_test` « Le test rapide », `deepening` « Approfondissement »; `instructions` « Consignes », `storyline_facts` « Faits du fil rouge utilisés », `bank` « Banque d'exemples », `drawing` « Schéma »; `claims` « Affirmations », `references` « Références », `unverified` « Non vérifié »; `problem` « Le problème », `concept_thread` « Le fil des concepts », `from_to` « D'où l'on vient, où l'on va », `crossing_case` « Un cas qui traverse le domaine »; `audience` « Public cible », `onboarding` « Accueil », `avoid` « Termes à éviter », `unreleased` « Non publié » |
| `case_fields` | `usage` « Usage », `explanation` « Explication », `situation` « Situation », `question` « Question », `expected_answer` « Réponse attendue », `common_mistakes` « Erreurs fréquentes », `what_works` « Ce qui marche » |
| `qualifiers` | `fallback` « rechange », `practice` « entraînement », `aside` « aparté »: the closed list of a case heading's qualifiers (4.3) |
| `markers` | `storyline` « Fil rouge », `consensus` « consensus », `school` « école », `course` « cours » |
| `natures` | `fact` « fait »: the nature of a `sources.md` claim that a source states with no stance (4.4); the other natures are the stance markers `consensus`, `school`, `course`. Read by `sources` only: never a marker of the reader text, which `conventions` checks |
| `concept_refs` | `concept` « concept », `concepts` « concepts », `and` « et », `annex` « annexe »: the words of a concept reference (4.5) |
| `source_types` | `primary` « primaire », `secondary` « secondaire », `marketing` « marketing » |
| `typography` | `banned`: the characters course text never uses (French: em-dash, arrows) |
| `checks` | `anaphora`, optional: the words a domain paragraph's first sentence does not open with; without it, `domain-first-sentence-standalone` fails |

## 10. Checks

**Purpose.** What verifies a course against this spec, in two families: a conformity check says
whether the course can be consumed and blocks a change; a quality check says whether it is good
and feeds course issues.

| Reader | Needs | When |
|---|---|---|
| the creator (human or agent) | which check enforces each rule, and how to run it | after each change, before the PR |
| the reviewer | which rules a script already verified, so the review reads the rest | reviewing a change |
| the maintainer | the quality findings to triage into course issues | on demand |

Dependency-free Node scripts in `checks/`, one per id; `checks/README.md` gives their options
and fixtures. `specs/check-course <course-dir>` runs this folder's `checks/check-course` in one
of two modes (decision `versioned-objects-and-spec-layout`), locally and in CI:

- the **conformity mode**, the default, runs the conformity checks: whether the course is
  consumable (the site builds, the teacher teaches, identifiers resolve). The machine runs it on
  every change (`/feyn-pull-request`, CI, the builds), and a `fail` blocks.
- the **quality mode**, `--quality`, runs the quality checks: whether the course is good. The
  maintainer runs it on demand; its failures are findings, triaged into course issues. No
  conformity path runs it.

`checks/check-spec` checks the spec's own files (`PROTOCOL.md`, `SPEC.md`, `decisions/`), not a
course; it has one mode, and its checks are conformity checks.

Both print one line per passing check (`<id>: ok`) and one line per failure
(`<id>: fail: <file>:<line> <message>`, the file relative to the course folder, or to the spec
folder for `check-spec`). The exit code is 0 when every check passes, 1 when one fails, 2 on a
usage error.

| Id | Family | Verifies | Sections |
|---|---|---|---|
| `course-yaml` | conformity | `course.yaml` fields, identifiers, order, partition into domains, annexes, prerequisites, at most 9 children per node, paths, no unlisted folder in `concepts/`, spec declared (`specs/check-course` refuses an unknown spec or MAJOR), language pack present | 3, 8 |
| `concept-folder` | conformity | the folder's files; the three files' sections and their order; frontmatter keys, `verified` parallel to `refs`; one section per sub-concept; « Objectif » equals `objective`; case headings and their qualifier, fields, a qualifier on « Question » only, coverage of leaves, citation in « Consignes » | 4, 9 |
| `conventions` | conformity | the reader-text conventions of `concept.md`; plain Markdown in course files | 2, 4.5 |
| `svg-contract` | conformity | every diagram against the drawing contract (a root `<defs>` accepted); declared and present diagrams match | 4.1, 7.1 |
| `sources` | conformity | no introduction; claims in five columns: section anchors that exist in `concept.md`, a source cell of reference ids or the `markers.course` word, a verification, a nature; reference ids, links (one URL or empty), types, dates; every id cited exists, every reference cited; « Non vérifié » entries anchored | 4.1, 4.4 |
| `course-files` | conformity | `plan.md` (« Public cible », « Accueil »: one posture paragraph, then its questions), `glossary.md` (four columns, one defining concept per row, a variant in one row), `CHANGELOG.md`, domain files: presence, no unlisted file in `domains/`, frontmatter, sections, leads | 5, 6 |
| `domain-first-sentence` | conformity | the first sentence of each paragraph of « Le fil des concepts » ends within 300 characters of the lead | 5 |
| `language-pack-keys` | conformity | every key of section 9 and of `PROTOCOL.md` exists in the course's language pack | 9 |
| `glossary-order` | quality | no glossary term used in a `concept.md`, body or frontmatter, before its defining concept, unless its sentence carries a concept reference to that concept; each comma variant matched, a qualified row skipped | 6 |
| `typography` | quality | no banned character of the language pack in course text | 2 |
| `domain-first-sentence-standalone` | quality | the first sentence of each paragraph of « Le fil des concepts » does not open with a word of `checks.anaphora` | 5, 9 |
| `rule-slugs` | conformity (`check-spec`) | `PROTOCOL.md` names each of its rules and groups by a slug defined once; `PROTOCOL.md`, `SPEC.md` and `decisions/` cite them by a defined slug, never by a number or a range | `PROTOCOL.md` |

**`taught-check`** is not a script: it is an agent workflow (`.claude/workflows/taught-check.js`)
that verifies that no case asks what the learner has not yet been taught. It is a quality check,
run on demand through `/feyn-taught-check`, and its findings are triaged like the others.
