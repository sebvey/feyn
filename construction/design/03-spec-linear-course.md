# 03. The `linear-course` spec

A spec describes a **type of course**: what a course must contain, how the teacher teaches it,
how we check it. `linear-course` is the spec of linear introductory courses (ordered domains,
ordered concepts with prerequisites, sub-concepts taught one per message, a storyline). A
course that does not fit this shape will need another spec.

The spec is versioned (see `07-versions-channels-flow.md`). A course declares `spec:
linear-course@1`. Tooling (teacher, site, checks) can read every spec MAJOR still alive.

The spec has four parts: the **structure** (files and fields), the **protocol** (how the
teacher teaches), the **drawing contract** (`04-diagrams.md`) and the **checks**.

## Structure of a course

### `course.yaml`

Replaces the tables of `course/plan.md`, the awk-built `map.md`, and the site's three `.ts`
files. Read by the site, the classroom build and the checks.

```yaml
id: parcours-po
spec: linear-course@1
language: fr
title: Parcours PO
subtitle: …
audience: …                  # one sentence for the site home and previews; the full prose stays in plan.md
site:
  icon: …
  color: …
storyline: storyline.md
glossary: glossary.md
domains:
  - number: 1
    slug: le-cadre
    title: Le cadre
    duration_min: 90
    file: domains/1-le-cadre.md
    concepts: [0, 1, 2]
concepts:
  - number: 0                 # "0".."17", "A1", "A2": the concept's identifier, a MAJOR contract
    slug: scrum
    title: Scrum en bref et l'incrément
    objective: situer PO, Scrum Master et Developers… ; distinguer sprint et incrément   # the one term for « Objectif » and « À la fin, l'apprenant sait »
    prerequisites: []
    duration_min: …
    dir: concepts/00-scrum
    subconcepts:              # tree: 0a (0a1, 0a2, 0a3), 0b; each leaf = one teacher message
      - id: 0a
        title: le cadre
        children:
          - { id: 0a1, title: les responsabilités, messages: 4 }
          - { id: 0a2, title: le sprint et ses quatre événements, messages: 5 }
          - { id: 0a3, title: les artefacts et leurs engagements }
      - { id: 0b, title: sprint et incrément }
annexes: [A1, A2]             # outside domains
```

What stays as prose in `plan.md`: the full audience (the `audience` line of `course.yaml` is
its one-sentence form), the stances (« une équipe en sprints »), writing rules specific to the
course. `map.md` disappears: the
teacher reads `course.yaml` (or a projection built into the classroom).

### The concept folder

```
concepts/09-decoupage-vertical/
  concept.md          # READER-FACING: what the learner may read; built by the site, read by the teacher
  teaching.md         # TEACHER-ONLY: teaching notes and example bank; never built by the site
  sources.md          # READER-FACING: claims, references, unverified
  gateau.svg          # READER-FACING: diagrams under the drawing contract, one file per diagram
  part-recoupee.svg
```

**`concept.md`** (reader-facing): YAML frontmatter + Markdown body.
- Frontmatter: `description` (one sentence for the site), `stances` (today's `ecoles` of the
  site, minus the neighbours: the standing of each claim, `consensus`, `school`, `course`,
  each a list of items `text`, `author?`, `refs[]`), `neighbors` (notions not to confuse with
  this one, a list of the same items), `diagrams` (list: file, title, caption, sub-concept it
  illustrates).
- Body, by section and in order: « Objectif » (the `objective` of `course.yaml`, restated), « L'essentiel », « Consensus et choix d'école »
  (prose; the structured detail is in the frontmatter), then **one section per leaf
  sub-concept** (`### 9a1 La tranche qui sert seule`) holding the reader text: the explanation
  as a site reader reads it (today the MDX body of the site, rewritten by hand from the concept
  file; it becomes the source), « Pièges », « Le test rapide ».
- What the site builds: all of `concept.md`, `sources.md`, the diagrams. What the teacher
  reads: the same, plus `teaching.md`.

### Reader text conventions: what the site builds from

Today's site bodies are MDX with nine constructs (`<Sous>`, `<h4 id>`, `<Pastille>`,
`<Renvoi>`, `<FilRouge>`, `<Figure>`, `<Reflexe>`, `<Erreurs>`, `<Schema>`). The visual work
of the site (CSS, layout components, tabs, badges, callouts) is **kept as is**; what changes is
where the structure comes from. In `concept.md` the structure is plain Markdown under
**conventions fixed by the spec**, and the site's remark/rehype plugins map each convention to
the same HTML and classes as today. The teacher reads the same file as ordinary Markdown. The
checks enforce the conventions.

| Site construct today | Markdown convention in `concept.md` | Mapped by |
|---|---|---|
| `<Sous id="9a" titre promesse>` | `## 9a La tranche verticale`, then one italic-only paragraph: the **promise** | section plugin: groups the heading and what follows until the next `##` |
| `<h4 id="9a1"><span class="num">` | `### 9a1 La tranche qui sert seule` | heading plugin: splits number and title |
| `<Renvoi n="4" />` | plain text `concept 4`, `concept 7b`, `(concept 17)`, as the teacher protocol already writes | autolink plugin on the `concept N[sub]` pattern |
| `<Pastille kind="cours" />` | an inline marker `[cours]`, `[école]`, `[consensus]` right after the claim | inline plugin: marker to badge |
| `<FilRouge>` | a blockquote whose first line is `**Fil rouge :**` | blockquote plugin, by lead |
| `<Figure legende>` + `<Gateau />` | image syntax `![caption](gateau.svg)`; caption may also come from the `diagrams` frontmatter | image plugin: inlines the SVG (or `<img>`), wraps in a figure with the caption |
| `<Reflexe note>` | the « Le test rapide » section: a blockquote with the question, then one paragraph for the note | section plugin |
| `<Erreurs>` | the « Pièges » section: a list | section plugin |
| `<Schema>` / `<SchemaA>` | image syntax, as above | image plugin |

Everything else (bold, lists, paragraphs, `**SPIDR**` catalogues) is already plain Markdown.
The leads (`**Fil rouge :**`) and markers (`[cours]`) are the French course's; the language
pack names them, like the teacher's phrases.

Why conventions over standard Markdown, not MDX nor directives: MDX in the course would couple
the course to the site's components and be noise for the teacher; remark directives
(`:::storyline`) are a fallback only for a construct with no natural Markdown form, and none of
the nine needs one. Cost: a plugin layer in `site/` (a few hundred lines) and strict
conventions, which is what the checks are for.

Astro reads the course directly: a content collection with the `glob` loader and
`base: '../courses/<id>/concepts'`, pattern `*/concept.md`; `sources.md` and the domain files
the same way; `course.yaml`, `glossary.md` and `storyline.md` as data files.

**`teaching.md`** (teacher-only):
- « Consignes »: the order and the split into messages (today's « Sous-concepts » section:
  which case to pose at which sub-concept, which case as fallback, which cross-references not
  to re-teach), the concept's own vigilance points.
- « Faits du fil rouge utilisés » and what is not fixed (today's bank header).
- « Banque d'exemples »: one case per title, with its sub-concept in parentheses, and today's
  fields: Explication, Situation, Question, Réponse attendue, Erreurs fréquentes, Relances.
  Case titles are identifiers: learner memory cites them.
- « Schéma »: the drawing instruction (metaphor, what it shows) that goes with the SVGs.

**Why two files rather than teacher-only sections in one**: the site and the checks have
nothing to filter; a `git log` on `concept.md` shows only what changes for the reader; the
alignment stamp disappears since the site reads the source. Cost: the writer opens two files;
the checks verify consistency (every sub-concept of `course.yaml` has its section in
`concept.md` and at least one case in `teaching.md`).

**`sources.md`**: unchanged in spirit (« Affirmations » with their references and
verification state, « Références » with id, text, url, type, consultation date, « Non
vérifié »). The site builds it as is; the teacher answers from it when the learner asks where
a claim comes from.

### Domains, course glossary, storyline

- `domains/N-slug.md`: reduced frontmatter (number, title and duration are in `course.yaml`)
  and today's four sections: « Le problème », « Le fil des concepts », « D'où l'on vient, où
  l'on va », « Un cas qui traverse le domaine ». The site builds the reader-facing sections;
  the teacher reads all. The « accroches » the site rewrites today in its frontmatter disappear
  (decided 2026-10-27): the domain page shows the first sentence of each concept's paragraph in
  « Le fil des concepts », so that paragraph opens with a sentence that stands alone (a check).
- `glossary.md`: today's table (term, English, definition, concept). The site reads it
  directly (end of `glossaire.ts`).
- `storyline.md`: the storyline, unchanged (end of `fil-rouge.ts`).

## Protocol

The part of the spec the teacher executes. It takes over « La boucle du cours » of today's
`CLAUDE.md` and the behaviour rules distilled from the teacher's ADRs (see `10-migration.md`,
"Decision distillation"). Written as numbered, testable rules, each with a "why" line when useful (the
counterfactual: what the teacher would do without it). In French first, English after the
stage 2 fresh tests (`05-teacher-classroom.md`, "Rewrite risk").

Rule families, as they exist today:
- session start: new learner (onboarding) or resume (two-line reminder, « on continue » or
  choice), readings to do before teaching;
- presenting a domain (no teaching, no question, ends with the announcement of what comes);
- the loop: one sub-concept per message, one question per message, wait for the answer,
  partial / wrong / follow-ups / re-explanation, correct frankly, mini-recap every 3 or 4
  concepts, site page on validation;
- the shape of a message: short (about fifteen lines), concept title linked to the site, a
  quote block for the example and the question, literal phrases (language pack);
- storyline: actors named with their role, facts taken from the file, improvisation without
  contradicting it;
- consensus vs school of thought vs course stance, sources, origin of a term;
- dig, skip, unvalidated prerequisites, asides, refocusing;
- learner memory: save points, what to write where, commit;
- stop: save, reread as a fresh agent, two lines.

What leaves the protocol because it is one course's own: the site address, the storyline's
name and actors, the course's file names, durations. All of it comes from `course.yaml` and
the course, injected at classroom build.

## Language pack (`lang/fr.yaml`)

Everything that depends on the language spoken to the learner, and nothing else:
- literal phrases: `question_lead: "Question pour toi"`, `example_lead: "Exemple"`,
  `continue_prompt: "Des questions ? J'enchaîne ?"`, `next_lead: "La suite :"`,
  `concept_title: "Concept {n} : {title}"`, `domain_title: "Domaine {n} : {title}"`;
- typography rules (space before colon and semicolon, « » quotes, no em-dashes, no arrows);
- site labels (« Domaines », « Concepts », « Rechercher », tabs « Comprendre », « Consensus ou
  école », « Sources »…).

The protocol refers to these values by key; the classroom build and the site inject the
course's language values. **One spec for every language**; an English course would need
`en.yaml`, nothing else.

## Checks (`checks/`)

Dependency-light scripts, runnable locally and in CI, on a given course:
- `course.yaml` valid (schema), unique identifiers, prerequisites existing and earlier,
  concepts partitioned into domains, annexes outside domains;
- every concept has its folder, its three files, the mandatory sections in order, one section
  per leaf sub-concept in `concept.md`, at least one case per leaf sub-concept in
  `teaching.md`, every case attached to an existing sub-concept;
- every declared diagram exists and passes the drawing contract (`04-diagrams.md`); every
  present SVG is declared;
- course glossary: a term used in `concept.md` is not introduced by a later concept (today's
  glossary rule);
- sources: every cited reference exists, every claim has a state;
- the `taught-check` (agent workflow, see `08-agentic.md`): no case asks what the learner has
  not yet received. Not a script, an agent workflow; the spec names it as a mandatory check
  after a teaching change.

Old tickets T-050h (quality controls) and T-052 (no rule duplication) are absorbed here.
