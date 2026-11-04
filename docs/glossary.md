# Repository glossary

The repository glossary holds the reserved terms of feyn, one entry per concept. It is there for:

- one concept, one term, and one term, one concept: a reserved term means one thing in the
  repository's files (code, docs, skills, issues, decisions, specs), and its concept takes no
  other word;
- a shared definition: the maintainer, a contributor and an agent give a term the same meaning;
- the boundaries between neighbouring concepts: what a term is not, and which entry holds that;
- the correspondence between the repository's English, the French of a spec and the code;
- a regular form that a program can read.

Why this form: decision `glossary-by-concept`.

## Reading an entry

An entry is a heading, the term, then fixed keys in this order, each on its own line:

- `means`: the definition, in English.
- `en`: the preferred English term, then, after ` · rejected: `, its rejected English terms.
- `fr`: the preferred French term, then, after ` · rejected: `, its rejected French terms;
  `to settle` when no French text of a spec writes the concept yet.
- `code`: the keys, files or identifiers that carry the concept.
- `not to confuse with`: links to the entries of neighbouring concepts.

A key with nothing to say is left out, `means`, `en` and `fr` excepted. A rejected term is a word
banned for that concept only: never use it where the concept applies. A word may be preferred for
one concept and rejected for another; both entries then say so (« schéma »). A neighbouring
concept is never a rejected term: it is a `not to confuse with` link.

## Which designation applies where

- `en` in the repository's English files: code, docs, skills, issues, decisions, and the English
  texts of a spec.
- `fr` in a French text of a spec, which speaks the language of its courses (decision
  `language-policy`): `course/README.md`, `course/rules.yaml`, `course/lexicon.yaml`,
  `teacher/README.md`, `teacher/rules.yaml` of `course-specs/linear-course/1/`. A heading or a
  value of a lexicon quoted in « » is a word of the course files, not the spec's word for a
  concept: « Schéma », the heading of the drawing instruction in `teaching.md`, names that
  section, not a diagram.
- A course glossary in its course. Each course has its own [course glossary](#course-glossary),
  which belongs to the course, follows the course's language and applies in that course's
  files. A word may be reserved in both with two meanings (**epic**); a repository text that
  speaks of the course's meaning says so ("epic, in the course's sense"). French course files
  keep their French section headings (« Objectif », « L'essentiel », « Pièges »…); the English
  terms here are how we talk about them in code, docs and issues.

## Adding or changing an entry

A PR adds or changes the entry and, in the same PR, replaces the rejected words in use for that
concept. The text that first writes a concept in French fills its `fr` in the same PR. An entry
cites no rule id, of a rule or of a group (decision `decision-format`).

## The things we build

### feyn

- means: the monorepo and the project
- en: feyn · rejected: "the platform", "the system"
- fr: to settle

### spec

- means: the contract of a *type of course*: the shape of its courses (structure, drawing contract, checks) and the generic way to teach every course of the type, its **protocol**; versioned, one folder per MAJOR. Neither "spec" nor "specification" names anything else (an issue, a design)
- en: spec
- fr: « spec »
- code: `course-specs/<name>/<MAJOR>/`; named `linear-course`
- not to confuse with: [spec directives](#spec-directives), [protocol](#protocol)

### spec directives

- means: what says how a spec is written and read: the rule model, levels, methods, severity, conformance clause, versions, their normative references, and the tests of a spec's files; one folder per MAJOR, versioned like a spec; a spec MAJOR declares the one it follows
- en: spec directives · rejected: "frame" (the frame of the work is Kanban), "framework", "metamodel"
- fr: « directives de spec »
- code: `spec-directives/<MAJOR>/` (`spec-directives/1/README.md`); `spec.yaml` of a spec MAJOR
- not to confuse with: [spec](#spec)

### course

- means: what one course teaches and how to teach it: its reader-facing files (what it teaches) and its teacher-only files (how to teach it, `teaching.md`), identified by its **course id** (`po-essai`)
- en: course · rejected: "content" (as a noun for the course), "material", "data"
- fr: « cours »
- code: `courses/<id>/`

### build

- means: (noun and verb) producing an output from a course: the **site build**, and the **classroom build**, made in two halves, the spec MAJOR's `teacher/build/` rendering the parts of the **composition** as text and `classroom-builder/` realising them in Claude Code. Rendering the parts as text is a step of the classroom build, not a build. Builds have no version of their own
- en: build · rejected: "render" for a build, "generate", "export", "compile", "publish"
- fr: « build » (noun), « construire » (verb)
- code: `site-builder/`, `classroom-builder/`, `teacher/build/` of a spec MAJOR (`render-parts`)
- not to confuse with: [release](#release)

### site

- means: the published website and its engine
- en: site · rejected: "website", "web", "pages"
- fr: « site »
- code: `site-builder/`

### teacher

- means: the generic Claude Code agent that teaches: a `CLAUDE.md` and the teacher skills of its moments, built from the teacher template, the protocol and the lexicons of its spec, as the **composition** of its spec says
- en: teacher · rejected: "prof", "tutor", "coach", "agent" alone
- fr: « professeur » · rejected: « prof »
- code: `classroom-builder/`
- not to confuse with: [classroom](#classroom), [composition](#composition)

### classroom

- means: the folder built outside the repo, from the parts the spec MAJOR's `teacher/build/` renders, where the teacher runs: `CLAUDE.md`, the teacher skills of the moments and the permissions (`.claude/`), course copy, `course.lock`, `learner/`, its own git; what it gives the teacher, part by part, is the **composition**
- en: classroom · rejected: "workspace", "instance", "environment"
- fr: « classe » (in the rules of a diagram, « classe » is an SVG class, `primary`, `secondary`, `muted`, not this concept)
- code: `classroom-builder/`
- not to confuse with: [composition](#composition), [channel](#channel)

### learner

- means: the person being taught; **learner memory** is what the teacher keeps of them
- en: learner · rejected: "student", "user"
- fr: « apprenant »; its memory, « mémoire de l'apprenant »
- code: `learner/` (learner memory)
- not to confuse with: [maintainer](#maintainer)

### maintainer

- means: Seb: owns decisions, releases, freezes
- en: maintainer · rejected: "owner", "admin"
- fr: « mainteneur »
- not to confuse with: [contributor](#contributor)

### contributor

- means: anyone who delivers an issue by PR (course files or code)
- en: contributor · rejected: "author", "developer"
- fr: to settle
- not to confuse with: [maintainer](#maintainer)

## Inside a course

### domain

- means: an ordered group of concepts with its own page and presentation, described by its **domain file**. Course vocabulary only: never a part of the repo
- en: domain
- fr: « domaine »; its file, « fichier de domaine » · rejected: « fiche »
- code: `domains` of `course.yaml`; `domains/<n>-<slug>.md`
- not to confuse with: [area](#area)

### concept

- means: a numbered unit of the course (`0`..`17`, `A1`, `A2`); its **concept folder** holds `concept.md`, `teaching.md`, `sources.md`, diagrams
- en: concept · rejected: "fiche", "lesson", "chapter", "page"
- fr: « concept »; its folder, « dossier de concept » · rejected: « fiche »
- code: `concepts` of `course.yaml` (its `dir`)
- not to confuse with: [sub-concept](#sub-concept), [numbered concept](#numbered-concept), [annex](#annex)

### numbered concept

- means: a concept whose number is an integer (`0`, `1`…): it belongs to exactly one domain, and the numbered concepts come first in course order
- en: numbered concept · rejected: "regular concept", "main concept"
- fr: « concept numéroté »
- not to confuse with: [annex](#annex)

### annex

- means: a concept numbered `A1`, `A2`…: it belongs to no domain and comes after the numbered concepts
- en: annex · rejected: "appendix", "bonus concept"
- fr: « annexe »
- code: `annexes` of `course.yaml`
- not to confuse with: [numbered concept](#numbered-concept)

### sub-concept

- means: a node of a concept's teaching tree (`9a`, `9a1`); a **leaf sub-concept** is, as a rule, one teacher message with one question
- en: sub-concept · rejected: "section", "step", "unit"
- fr: « sous-concept »; a leaf, « sous-concept feuille »
- not to confuse with: [concept](#concept)

### objective

- means: what the learner can do after the concept, in one sentence. One term for the current « Objectif » and « À la fin, l'apprenant sait »
- en: objective · rejected: "goal", "outcome", "aim"
- fr: « objectif »
- code: `objective` of a concept in `course.yaml`; `headings.objective` (« Objectif »)

### reader text

- means: the reader-facing explanation of a sub-concept in `concept.md`, what the site shows
- en: reader text · rejected: "body", "content", "copy"
- fr: « texte lecteur »
- not to confuse with: [teaching notes](#teaching-notes)

### reader-facing

- means: the visibility class of the course files a reader sees: `concept.md`, `sources.md`, diagrams
- en: reader-facing · rejected: "public" (it describes the repository)
- fr: « côté lecteur »
- not to confuse with: [teacher-only](#teacher-only)

### teacher-only

- means: the visibility class of the course files only the teacher reads: `teaching.md`
- en: teacher-only · rejected: "private" (it describes the repository)
- fr: « professeur seul »
- not to confuse with: [reader-facing](#reader-facing)

### teaching notes

- means: the whole of `teaching.md`, the example bank included: the instructions (« Consignes »), the storyline facts used, the example bank, the drawing instruction (« Schéma »)
- en: teaching notes · rejected: "guide", "notes", "answers"
- fr: « notes d'enseignement »
- code: `teaching.md`
- not to confuse with: [reader text](#reader-text)

### example bank

- means: the set of **cases** of a concept, in its teaching notes
- en: example bank · rejected: "examples", "exercises", "questions"
- fr: « banque d'exemples », « banque »
- code: `headings.bank` (« Banque d'exemples »)
- not to confuse with: [example](#example), [case](#case)

### case

- means: one entry of the bank: situation, question, expected answer, common mistakes, follow-ups; its **title** is its id (learner memory cites it). The bank's heading, « Banque d'exemples », keeps its French word: the entries under it are cases, never called examples
- en: case · rejected: "example", "exercise", "scenario"
- fr: « cas » · rejected: « exemple »
- code: `case_fields`
- not to confuse with: [example](#example), [practice case](#practice-case), [test scenario](#test-scenario)

### practice case

- means: a case qualified « entraînement »: more practice on what a validated concept taught, posed when the learner asks to practise, or unasked at the resume to retrieve a concept validated in an earlier session, without re-explaining. The other qualifiers make a **fallback** case (« rechange ») and an **aside** case (« aparté »)
- en: practice case · rejected: "dig case", "exercise"
- fr: « cas d'entraînement »; the others, « cas de rechange », « aparté »
- code: `qualifiers.practice`, `qualifiers.fallback`, `qualifiers.aside`
- not to confuse with: [deepening](#deepening), [case](#case)

### example

- means: in a teacher message, the illustration that precedes the question (« Exemple »); a case may serve as one, but the heading « Banque d'exemples » names the bank of cases, not a list of examples
- en: example
- fr: « exemple »
- not to confuse with: [case](#case), [example bank](#example-bank)

### follow-up

- means: the targeted re-question after a partial or wrong answer; ranked 1 or 2
- en: follow-up · rejected: "retry", "hint", "probe"
- fr: « relance »

### storyline

- means: the running world the cases live in (the bike-share operator)
- en: storyline · rejected: "red thread", "thread", "fil rouge", "narrative"
- fr: « fil rouge »
- code: `storyline.md`; `storyline` of `course.yaml`
- not to confuse with: [course path](#course-path)

### stances

- means: the standing of each claim of a concept, structured in the frontmatter: **consensus** (Scrum Guide, established practice), **school** (short for school of thought: a named author's or current's choice), **course** (this course's own choice). A stance is also any stated position of a course (« une équipe en sprints »)
- en: stances · rejected: "schools", "opinions", "positions", "status"
- fr: « positions » (« consensus », « choix d'école », « choix du cours »)
- code: `stances` of the frontmatter of `concept.md`
- not to confuse with: [neighbors](#neighbors), [concept status](#concept-status)

### neighbors

- means: the neighbouring notions not to confuse with the concept, a frontmatter key of their own
- en: neighbors · rejected: "related", "see also"
- fr: « voisins », « notions voisines »
- code: `neighbors` of the frontmatter of `concept.md`
- not to confuse with: [stances](#stances)

### sources

- means: the file that traces the body of `concept.md`: **claims** (claim, section, source, verified, **nature**: consensus, school, course, or **fact**, what a source states with no stance), **references**, **unverified**. A stance or a neighbour is sourced in its frontmatter item: `refs` and `verified`, the quotation and its place per reference
- en: sources · rejected: "bibliography", "citations"
- fr: « sources » (« affirmations », « références », « fait »)
- code: `sources.md`; `headings.claims`, `headings.references`, `headings.unverified`
- not to confuse with: [concept reference](#concept-reference)

### diagram

- means: an SVG of a concept under the **drawing contract**, with its **caption**
- en: diagram · rejected: "schema" (a JSON Schema), "figure", "image", "illustration"
- fr: « schéma »; its caption, « légende » · rejected: « diagramme », « figure », « illustration », « croquis », « graphique »
- not to confuse with: [schema](#schema), [drawing contract](#drawing-contract)

### schema

- means: a JSON Schema of a spec, which says the fields a file holds
- en: schema
- fr: « schéma JSON » · rejected: « schéma » alone
- code: `*.schema.yaml`; `course/schemas/` of a spec MAJOR, the fields of a course file
- not to confuse with: [diagram](#diagram)

### drawing contract

- means: the SVG rules of the spec, those of `course/rules.yaml` that `course/README.md` 6.1 points to (viewBox, currentColor, three classes, `<text>`, named groups); the style of 6.2 is not part of it
- en: drawing contract · rejected: "style guide"
- fr: « contrat de dessin »
- not to confuse with: [diagram](#diagram)

### pitfalls

- means: the « Pièges » section of `concept.md`
- en: pitfalls
- fr: to settle
- code: `headings.pitfalls` (« Pièges »)

### essentials

- means: the « L'essentiel » section of `concept.md`
- en: essentials
- fr: to settle
- code: `headings.essentials` (« L'essentiel »)

### quick test

- means: the « Le test rapide » section of `concept.md`
- en: quick test
- fr: to settle
- code: `headings.quick_test` (« Le test rapide »)

### deepening

- means: the optional « Approfondissement » section of `concept.md`: more matter on the concept, sourced in `sources.md`, built by the site, read by the teacher in an aside on the learner's request; no case relies on it
- en: deepening · rejected: "dig", "reserve"
- fr: « approfondissement »
- code: `headings.deepening`
- not to confuse with: [practice case](#practice-case)

### concept reference

- means: in reader text, the words that name a concept, a sub-concept or an annex: « concept 4 », « concepts 5 et 7b », « annexe A2 » (`course/README.md` 3.5)
- en: concept reference · rejected: "reference" alone
- fr: « renvoi » (and nothing else: a pointer to a group or a file is a « lien »)
- code: the lexicon group `concept_refs`
- not to confuse with: [sources](#sources) (its references)

### course glossary

- means: the glossary of a course, course material: its terms, each with its defining concept
- en: course glossary
- fr: « glossaire du cours »
- code: `courses/<id>/glossary.md`; `glossary` of `course.yaml`
- not to confuse with: [repository glossary](#repository-glossary)

### defining concept

- means: the concept of a course glossary row (its fourth column): the concept a learner opens to dig into the term, the one whose reader text teaches it (the rules of the course files in `course/rules.yaml`); never a concept that only uses the term or defines it in passing
- en: defining concept · rejected: "introducing concept", "first concept"
- fr: « concept de définition »

## How the teacher works

### protocol

- means: the pedagogical protocol: the testable teaching rules of a spec, each named by a slug, set in families and **groups** of rules, each group named by a slug too. A rule of it is a **protocol rule**
- en: protocol · rejected: "the loop", "pedagogy", "rules", "behaviour"
- fr: « protocole »; a rule of it, « règle du protocole »
- code: `teacher/README.md`, `teacher/rules.yaml` of a spec MAJOR
- not to confuse with: [rule](#rule), [composition](#composition)

### lexicon

- means: a file of the words of a spec, written once and read by key: `course/lexicon.yaml`, the words a program recognises in a course file (headings, case fields, qualifiers, markers, natures, concept references, source types, typography, the word lists of the checks), read by the checks, the classroom build and the site; `teacher/lexicon.yaml`, the words the teacher says and writes. Not a translation file: the language is the spec's (decision `lexicon-not-language-pack`)
- en: lexicon · rejected: "language pack", "i18n", "locale", "strings"
- fr: « lexique »
- code: `course/lexicon.yaml`, `teacher/lexicon.yaml` of a spec MAJOR; `language` of `spec.yaml`

### teaching session

- means: always qualified: one conversation between the teacher and a learner; **resume** is the first message of a teaching session with an existing learner; **onboarding** is that of a new learner
- en: teaching session · rejected: "session" alone, "course session"
- fr: « session »; « reprise » (resume), « accueil » (onboarding) · rejected: « séance »
- not to confuse with: [work session](#work-session)

### course path

- means: the course as the teacher leads the learner through it, concept after concept in course order; the teacher proposes to come back to it after an aside
- en: course path · rejected: "main line", "track"
- fr: « parcours » (« dans le parcours », « hors du parcours », « revenir au parcours ») · rejected: « fil » alone
- code: `learner/parcours.md` (where the learner stands on it)
- not to confuse with: [storyline](#storyline), the « Le fil des concepts » section of a domain file (`headings.concept_thread`)

### concept status

- means: where a learner stands on a concept, in learner memory: validated, in progress, skipped, to review; a concept absent from the table is to do
- en: concept status · rejected: "state", "level"
- fr: « statut »
- code: `learner/parcours.md`; the lexicon group `status`
- not to confuse with: [Status](#status), the `status` key of a decision's frontmatter, [level](#level)

### save point

- means: a moment where the teacher writes and commits learner memory
- en: save point · rejected: "checkpoint", "sync"
- fr: « point de sauvegarde »

### composition

- means: what a teacher is made of, beside how it behaves: five parts, each defined by when it loads and what it draws from the spec, the course, learner memory and the classroom; described by `teacher/README.md`, "Composition", with no Claude Code term: its realisation is `classroom-builder/`'s
- en: composition · rejected: "architecture", "the instructions"
- fr: « composition »
- code: `course-specs/<name>/<MAJOR>/teacher/composition.yaml`; its parts `permanent`, `on-demand`, `course-reads`, `learner-memory`, `permissions`
- not to confuse with: [protocol](#protocol)

### mini-recap

- means: the five-line recap every 3 or 4 validated concepts
- en: mini-recap · rejected: "summary"
- fr: « mini-récap »

### course.lock

- means: the classroom's record: course id, ref, course sha, tooling sha, channel, `site_url`, date
- en: course.lock · rejected: "manifest"
- fr: to settle
- code: `course.lock`

## Rules and checks

The **spec directives** (`spec-directives/1/README.md`) and, for the categories and the checks of a
spec, the `README.md` of its MAJOR (decision `rules-with-level-and-method`).

### rule

- means: the unit of a spec, which binds a product (a course or a teacher): one provision held as data in a rule file, apart from the prose that describes it, with an `id` (a slug), a **level**, a **category**, a **method**, the `check` that implements the method when one exists, a `text` and, where an observed counterfactual exists, a `why`; a rule of the protocol, a **protocol rule**, also has an `origin`. The spec's own files are verified by the tests of `check-spec`, which are not rules
- en: rule · rejected: "requirement" for a rule of any level, "constraint", "criterion"
- fr: « règle »
- code: `course/rules.yaml`, `teacher/rules.yaml` of `course-specs/<name>/<MAJOR>/`
- not to confuse with: [requirement](#requirement), [check](#check), [policy](#policy)

### level

- means: how binding a rule is: **requirement**, **recommendation** or **permission** (ISO/IEC Directives Part 2, clause 7); a field of the rule, never a word parsed from its text: the verb of a rule of the spec matches it, and the field is authoritative
- en: level · rejected: "priority", "severity"
- fr: « niveau » (the « premier niveau » of a sub-concept and the level of a heading are not this concept)
- code: `level` of a rule
- not to confuse with: [severity](#severity), [concept status](#concept-status)

### requirement

- means: a rule of the level requirement: "shall", "shall not" (« doit », « ne doit pas »); in the protocol, the imperative. A product conforms when it holds every requirement of its class; a requirement verified by test has a blocking check
- en: requirement · rejected: "must" (ISO keeps it for external constraints)
- fr: to settle
- not to confuse with: [rule](#rule)

### recommendation

- means: a rule of the level recommendation: "should", "should not" (« il convient de », « il convient de ne pas »); outside conformance; its check reports, whatever its method
- en: recommendation · rejected: "guideline", "soft rule", "best practice"
- fr: to settle

### permission

- means: a rule of the level permission: "may", never in the negative (« peut »): an element that may be absent, or an act the teacher may do. Possibility and capability ("can", « peut ») are not a level
- en: permission · rejected: "can" for a permission
- fr: to settle

### method

- means: how one knows a rule holds, from the closed list of ISO/IEC/IEEE 29148: **test** (a deterministic run: the scripts of `course/checks/`), **analysis** (reasoning over the whole course: taught-check), **inspection** (a reading by a human or an agent: the review), **demonstration** (the system runs and is observed: the fresh tests). A rule states its method even before its check exists
- en: method · rejected: "taught-check" for a method
- fr: « méthode »
- code: `method` of a rule
- not to confuse with: [check](#check), [taught-check](#taught-check)

### category

- means: what a rule is about, from a closed list, extended when needed: for a course `structure`, `pedagogy`, `writing`, `sources`, `diagrams`; for a protocol rule, its family (the nine families of `course-specs/linear-course/1/teacher/README.md`). A check's category is its rules'; `check-course --category` selects checks by it. The tests of `check-spec` have none
- en: category · rejected: "family" for a category of a course, "kind"
- fr: « catégorie »; of a protocol rule, its « famille »
- code: `category` of a rule
- not to confuse with: [label](#label) (its kind)

### severity

- means: what a check's failure does, derived from its rules, never declared: a check **blocks** when it verifies a requirement by test (a **blocking check**: a `fail` sets exit code 1 of `course-specs/check-course`), and **reports** in every other case (a **reporting check**: a `fail` is printed, leaves the exit code 0, and its findings are triaged into course issues). The field `severity` of a review finding in the agent workflows (`blocking` or `minor`, `course-batch.js` and `taught-check.js` of `.claude/workflows/`) is a finding's weight, not a check's severity
- en: severity · rejected: "warning", "soft check", "hard check"
- fr: « sévérité »
- not to confuse with: [level](#level)

### check

- means: a verification of a course against its spec, that implements the method of rules of one category and one level: the scripts that `check-course` runs (method test) and taught-check (method analysis). Its category and level are its rules', its severity follows from them; `check-course --list` prints each check with its category and severity. The spec's own files are verified by the tests of the spec directives it follows, run by `spec-directives/check-spec` (`spec-directives/1/README.md` section 8), which verify no rule, carry no category and no level, and each failure blocks `check-spec`
- en: check · rejected: "test" (a method, not the check), "lint", "validation"
- fr: « check »
- code: `course/checks/` of a spec MAJOR; `course-specs/check-course`
- not to confuse with: [method](#method), [fresh test](#fresh-test), [rule](#rule)

### taught-check

- means: the check of a `pedagogy` recommendation by analysis, run by agents: the agent workflow that verifies no case asks what the learner has not yet been taught, run on demand through `/feyn-taught-check`; it reports
- en: taught-check
- fr: « taught-check »
- code: `taught-check.js` of `.claude/workflows/`
- not to confuse with: [method](#method)

### conformity

- means: the conformance clause (`spec-directives/1/README.md` section 2): a product, the course (its diagrams included) or the teacher, **conforms** when it holds every requirement of its class, whatever the method that verifies each one. The blocking checks are a necessary condition, not a sufficient one: the review and taught-check do the rest, and a course tag certifies the whole. The lexicons of a spec are not products
- en: conformity · rejected: "conforming" for a course that only passes the blocking checks, "compliance"
- fr: « conformité »

## How we work

The frame of the work is Kanban, with ADR for the decisions and GitHub flow for the branches
(decision `kanban-frame-of-the-work`): what the frame says is in `docs/kanban.md`, how feyn
applies it in `docs/contributing.md`. Its words below are the frame's; the others name feyn's own
mechanisms, which the frame does not name.

### area

- means: the part of the repo an issue or PR belongs to, derived from the tree: `spec:<name>`, `spec-directives`, `course:<id>`, `teacher`, `site`, `agentic`, `repo`
- en: area · rejected: "domain", "component", "module", "scope"
- fr: to settle
- code: the labels `area:<area>`
- not to confuse with: [domain](#domain)

### issue

- means: the GitHub object; it has no form of its own: it carries a **work item**, of one of two kinds, an **epic** or a **story**, or an **idea**, which has no kind; what it carries gives its body template and its labels (decision `issue-carries-a-work-item-or-an-idea`)
- en: issue · rejected: "ticket", "task"
- fr: to settle
- not to confuse with: [epic](#epic), [story](#story), [idea](#idea)

### epic

- means: a work item: an objective delivered in several stories, which closes on a verifiable Done when (common agile and GitHub vocabulary, `docs/kanban.md`): an issue titled "Epic: …", in five sections (Objective, Why now, Material, Done when, Out of scope), parent of its stories, split one story at a time when taken; its plan is a **plan comment** on it (decision `themes-and-release-milestones`). No Done when, no epic
- en: epic · rejected: "theme", "subject", "initiative", "stream", "phase"
- fr: to settle
- code: the label `kind:epic`
- not to confuse with: [story](#story), [milestone](#milestone)

### story

- means: a work item: a unit of work delivered in one PR, with a verifiable Done when (common agile and GitHub vocabulary, `docs/kanban.md`; a story need not be written as a user story), with or without a parent epic; under an epic, a sub-issue whose PR targets the epic's integration branch; without one, its PR targets `main` and the maintainer merges it (decision `story-with-or-without-an-epic`)
- en: story · rejected: "slice", "task", "sub-task"
- fr: to settle
- code: the label `kind:story`
- not to confuse with: [epic](#epic), [idea](#idea)

### idea

- means: what enters the upstream (`docs/kanban.md`): an issue holding a finding and no solution, in three sections (Where, Why, Observation), with no kind, only its `area:` label, in the Status Idea; it is never converted: the triage creates from it the work items it calls for, then closes it (decisions `issue-carries-a-work-item-or-an-idea`, `idea-is-never-converted`). Its Observation is a section, not a kind
- en: idea · rejected: "observation" for the issue, "Backlog" for its Status, "suggestion"
- fr: to settle
- not to confuse with: [option](#option)

### option

- means: a work item, epic or story, defined but not committed (`docs/kanban.md`): it has the body of its kind, Done when included, in the Status Option, and waits for the maintainer to commit it (set Ready) or close it, one option at a time, at an **option refinement** (`/feyn-refine-option`); until Ready its kind and body may change. A work item a triage creates is born Option unless the maintainer commits it at its creation; one a brainstorm creates is always born Option; a work item the maintainer asks for directly, a story or an epic, is born Option, or Ready on their word (decision `idea-and-option-before-ready`)
- en: option · rejected: "proposal", "candidate"
- fr: to settle
- not to confuse with: [idea](#idea)

### label

- means: always qualified: **type** (`type:bug`, `type:course`, `type:improvement`, `type:decision`), set on a work item, never on an idea; **area** (`area:<area>`); **kind** (`kind:epic`, `kind:story`: exactly one on a work item, none on an idea; decision `kind-label-per-work-item`); `blocked:maintainer` (a maintainer decision is awaited; on the issue only); and `stale` (an idea or an option posed before the frame of 2026-11-03, re-read at its triage or option refinement, which removes it). No state label: where an issue stands is its **Status**
- en: label
- fr: to settle
- not to confuse with: [Status](#status), [category](#category)

### Project

- means: the GitHub Project "feyn" (number 4) that holds every issue with its Status: what the maintainer looks at in the web interface, through its **views** (read with a query of `.claude/reference/project.md`), and what the agent lists (`gh project item-list`)
- en: Project · rejected: "board" for the Project itself, "dashboard"
- fr: to settle
- not to confuse with: [Project workflow](#project-workflow)

### Status

- means: the Project's field that says where an issue stands, in this order and nothing else: **Idea** (an idea, to triage), **Option** (a work item defined, not committed), **Ready** (committed, free to take: the **commitment point**), **In progress** (a branch exists), **Ready for review** (the work claims done, the maintainer reviews and concludes: a story without an epic whose PR is open after the fresh-agent review, or with the line `Fresh-agent review: none, direct delivery.`, which the maintainer merges; an epic whose epic PR is handed over, whose Done when the maintainer verifies before merging it; a story of an epic never has it), **Done** (closed; the close reason stays on GitHub). A decision awaited is the label `blocked:maintainer`, on any Status (decision `idea-and-option-before-ready`). It replaces the state labels. Written with a capital when it names the field; the lowercase `status` key of a decision's frontmatter is a different, allowed key; an issue's `state` is GitHub's open or closed
- en: Status · rejected: "state" for where the work stands
- fr: to settle
- not to confuse with: [concept status](#concept-status), [label](#label), [blocked](#blocked)

### commitment point

- means: where an option is taken and becomes committed work: in feyn, the Status **Ready**, set by the maintainer, or given at creation to a story posed by the orchestrator of a taken epic; from it the work item's form freezes and its Done when becomes the contract (decision `issue-defines-pr-verifies`). What the frame says: `docs/kanban.md`, "The upstream"
- en: commitment point
- fr: to settle

### WIP limit

- means: a limit on the work in progress, the items started and not finished, per Status or for the whole workflow: a new item is pulled only when one leaves. What the frame says: `docs/kanban.md`, "Kanban"; how feyn applies it: `docs/contributing.md`
- en: WIP limit
- fr: to settle
- not to confuse with: [draft](#draft)

### triage

- means: reading the ideas that came in and deciding what each one calls for: the work items it calls for, each citing it, the idea then closed as completed; or nothing, the idea closed as not planned, with the reason. In feyn, run with the maintainer on the ideas they name, one at a time (`/feyn-triage`); an option is not triaged, it goes to an **option refinement**. What the frame says: `docs/kanban.md`, "The upstream"
- en: triage · rejected: "Backlog pass", "grooming"
- fr: to settle
- not to confuse with: [option refinement](#option-refinement)

### option refinement

- means: the analysis of one named option against the purpose of feyn (which product consumes it, `docs/vision.md`) and against the repository (what changed in the files it names since it was last updated, the work items and ideas that cover or overlap it), up to a decision on it alone: commit it (set Ready), rework it, open a brainstorm from it (what it builds on has changed), merge it, split it, fold it into an epic or close it; run with the maintainer, one option at a time (`/feyn-refine-option`). It never reviews all the options nor chooses among them. What the frame says: `docs/kanban.md`, "The upstream"
- en: option refinement · rejected: "replenishment", "grooming"
- fr: to settle
- not to confuse with: [replenishment](#replenishment), [triage](#triage)

### replenishment

- means: the Kanban review of all the options against the capacity of the downstream, choosing which enter Ready. Not practised in feyn, where a commitment is decided option by option, at an **option refinement**. What the frame says: `docs/kanban.md`, "The upstream"
- en: replenishment
- fr: to settle
- not to confuse with: [option refinement](#option-refinement)

### policy

- means: what the workflow asks, written down where everyone reads it: what an item must hold to enter or leave a Status, the WIP limits, what is done first, who decides what; feyn's are in `docs/contributing.md`, the decisions and the skills. What the frame says: `docs/kanban.md`, "Kanban"
- en: policy · rejected: "rule", "convention"
- fr: to settle
- not to confuse with: [rule](#rule)

### draft

- means: a PR that cannot be merged until it is marked ready (`gh pr ready`); `/feyn-pull-request` opens one when a maintainer decision is awaited (the issue, not the PR, carries `blocked:maintainer`), and under `/feyn-deliver-story-alone` and `/feyn-deliver-epic` every PR is one until its review and corrections are done (marked ready at the hand-over of a story without an epic, `/feyn-deliver-story-alone` step 5, or at the merge of a story of an epic into its integration branch, `/feyn-deliver-epic` step 2)
- en: draft · rejected: "WIP" for a draft PR
- fr: to settle
- not to confuse with: [WIP limit](#wip-limit)

### blocked

- means: two senses, never mixed. "Blocked by #n": a blocked-by link between issues (decision `blocked-by-links-for-dependencies`), lifted when the blocking issue closes. `blocked:maintainer`: a maintainer decision is awaited, on the issue only, lifted when the maintainer removes the label
- en: blocked · rejected: "on hold", "Needs Decision" (a Status removed)
- fr: to settle
- code: the label `blocked:maintainer`
- not to confuse with: [Status](#status), [open question](#open-question)

### work session

- means: always qualified: one Claude Code conversation on the feyn repository: a **brainstorm** (with the maintainer, subject by subject, ending in a plan of work items, `/feyn-brainstorm`), the delivery of a story without an epic (`/feyn-deliver-story-alone`) or of an epic (`/feyn-deliver-epic`), a triage (`/feyn-triage`), an option refinement (`/feyn-refine-option`), a construction task (historical). A construction task left a **session note** in `construction/notes/`, removed on 2026-10-31 and read at `2c16adf3e66a` (decision `construction-in-history`)
- en: work session · rejected: "session" alone
- fr: to settle
- not to confuse with: [teaching session](#teaching-session)

### integration branch

- means: the branch an epic is delivered on: cut from `main` by the epic's orchestrator when the epic is taken, named like an issue branch after the epic (`<type>/<epic>-<slug>`); each story of the epic is a PR to it, reviewed by a fresh agent and merged by the orchestrator; `main` is merged into it, never rebased; it reaches `main` only by its **epic PR** (decision `epic-on-integration-branch`)
- en: integration branch · rejected: "epic branch", "feature branch", "develop", "staging branch"
- fr: to settle
- not to confuse with: [channel](#channel), [epic PR](#epic-pr)

### epic PR

- means: the PR from an epic's integration branch to `main`, its body starting with `Closes #<epic>`: handed over to the maintainer once the last story is merged, the whole branch reviewed by a fresh agent and no open question left; the maintainer validates the whole epic by merging it (squash), which closes the epic
- en: epic PR · rejected: "integration PR", "final PR", "release PR"
- fr: to settle
- not to confuse with: [integration branch](#integration-branch), [release](#release)

### open question

- means: a choice of a story of an epic that departs from the epic's Done when or adds structure (a new file, a category, a marker, an exception to a principle), put to the maintainer at once as a line of the plan comment and a comment on the epic; the work goes on, and the epic PR is handed over only when none remains
- en: open question · rejected: "pending decision", "escalation", "blocker"
- fr: to settle
- not to confuse with: [blocked](#blocked)

### direct delivery

- means: a story, alone or under an epic, of one edit with no behaviour, named `direct` by the maintainer at its creation (`/feyn-issue`), its To do opening with the line "Direct delivery": the maintainer's work session delivers it with `/feyn-issue-branch` and `/feyn-pull-request`, without a contributor or a fresh-agent review; its PR's Checks say `Fresh-agent review: none, direct delivery.` (`docs/contributing.md`, moment 2). A delivery policy, not a form. The direct path is another thing: `/feyn-pull-request` run without `/feyn-deliver-story-alone`, its fresh-agent review included
- en: direct delivery · rejected: "direct path"
- fr: to settle

### milestone

- means: a release target: named after the tag that closes it (`linear-course/v1.0.0`, `po-essai/v0.2.0`), holding the stories that must close before the tag, created when a release is in sight; an epic may target one; tooling has none
- en: milestone · rejected: "sprint", "phase", "version" for the milestone itself
- fr: to settle
- not to confuse with: [stage](#stage), [release](#release), [epic](#epic)

### stage

- means: historical: one of the five milestones of the construction plan of 2026-10-27 (stage 0 to 4), abandoned on 2026-10-29 for epics; the word stays only in `construction/` (read at `2c16adf3e66a`, decision `construction-in-history`) and in old issues
- en: stage · rejected: "lot", "phase", "sprint", "iteration"
- fr: to settle
- not to confuse with: [milestone](#milestone), [channel](#channel)

### batch

- means: a set of concepts written in one run of the agent workflow `course-batch.js` of `.claude/workflows/` (ex `course-lot`), through `/feyn-course-batch`
- en: batch · rejected: "lot", "chunk"
- fr: to settle
- not to confuse with: [stage](#stage)

### decision

- means: a recorded decision: one file by slug in a `decisions/` folder, with its counterfactual. "ADR" names the frame's complement, the practice of recording decisions (`docs/kanban.md`, "ADR"; decision `kanban-frame-of-the-work`)
- en: decision · rejected: "ADR" for one decision or in file names, "RFC", "design doc"
- fr: « décision »
- code: `decisions/<slug>.md`

### counterfactual

- means: the first line of a decision, `Without this, <who acts> would…`: the wrong act that whoever it binds (an agent, the common case, a contributor, the teacher, a workflow, the maintainer) would commit without it, and what that breaks
- en: counterfactual · rejected: "rationale", "motivation"
- fr: to settle

### fresh test

- means: a run of the teacher in a disposable classroom, following a **test scenario**, judged slug by slug: it builds the classroom, runs the teacher with `claude -p` turn by turn (Sonnet), and judges the transcript by a script (the form rules) and a fresh agent (`claude -p` on Sonnet, no tool: the others); the implementation of the method demonstration
- en: fresh test · rejected: "e2e", "smoke test", "simulation"
- fr: « fresh test »
- code: `classroom-builder/fresh-test`
- not to confuse with: [check](#check), [test scenario](#test-scenario)

### test scenario

- means: one YAML file of a spec MAJOR's `teacher/tests/`: the learner memory a fresh test starts from, the learner's messages in order, the acts expected of the teacher and the slugs of the rules they exercise (`teacher/tests/README.md`)
- en: test scenario · rejected: "test case", "script", "fixture"
- fr: to settle
- code: `teacher/tests/*.yaml` of a spec MAJOR
- not to confuse with: [case](#case), [fresh test](#fresh-test)

### review

- means: a reading of a change against the spec by an agent or a human
- en: review · rejected: "audit", "QA"
- fr: « revue »

### skill

- means: a Claude Code skill, folder and name prefixed `feyn-`, invoked as `/feyn-<name>` or loaded from its description; a **job skill** does the job of one moment of the work and is named by a verb (`feyn-deliver-story-alone`, `feyn-brainstorm`); the **work-cycle tooling** is the other skills, called by the job skills or directly for a one-off act, each named by what it produces or handles (`feyn-issue-branch`, `feyn-pull-request`); "tooling" alone is the build, site and teacher code; a **teacher skill** is a skill of a classroom's `.claude/skills/`, built by `classroom-builder/` from the moments of the **composition** as the spec MAJOR's `teacher/build/` renders them, one per moment that has rules, named `feyn-teacher-<moment>` (`feyn-teacher-onboarding`, `feyn-teacher-stop`), apart from Claude Code's own (`/resume`)
- en: skill · rejected: "command", "prompt", "recipe"
- fr: to settle
- code: `.claude/skills/`
- not to confuse with: [agent workflow](#agent-workflow), [project subagent](#project-subagent)

### agent workflow

- means: a Claude Code multi-agent script
- en: agent workflow
- fr: to settle
- code: `.claude/workflows/`; its name (`meta.name`) is `feyn-<script>-workflow`, so that the skill listing tells it from a skill
- not to confuse with: [CI workflow](#ci-workflow), [Project workflow](#project-workflow), [skill](#skill)

### project subagent

- means: a Claude Code custom subagent, named `feyn-<role>` (`feyn-pr-reviewer`): a reused brief as its system prompt, its tools limited by its frontmatter, spawned by name (`subagent_type` of `Agent`, `agentType` of an agent workflow's `agent()`)
- en: project subagent · rejected: "persona", "bot"
- fr: to settle
- code: `.claude/agents/`
- not to confuse with: [skill](#skill)

### CI workflow

- means: a GitHub Actions file
- en: CI workflow · rejected: "pipeline", "action"
- fr: to settle
- code: `.github/workflows/`
- not to confuse with: [agent workflow](#agent-workflow), [Project workflow](#project-workflow)

### Project workflow

- means: a built-in automation of the Project ("Auto-add to project", "Auto-add sub-issues to project", "Item added to project", "Item closed"), turned on in the web interface; `.claude/reference/project.md` lists which are on
- en: Project workflow · rejected: "automation", "workflow" alone
- fr: to settle
- not to confuse with: [agent workflow](#agent-workflow), [CI workflow](#ci-workflow)

### template

- means: always qualified: **course templates** (model files of a course), **learner templates** (model files of learner memory, in French for now), **teacher template** (part of the Claude Code realisation of the **composition**, filled from the parts the spec MAJOR's `teacher/build/` renders), **issue template**, **body template** (the body of an epic, a story, an idea or a decision, one per form, and the **PR body template**)
- en: course template, learner template, teacher template, issue template, body template · rejected: "template" alone, "boilerplate", "scaffold"
- fr: « modèle » (learner templates); the others, to settle
- code: `course-specs/<name>/<MAJOR>/course/templates/` (course), `course-specs/<name>/<MAJOR>/teacher/templates/learner/` (learner), `classroom-builder/CLAUDE.template.md` (teacher), `.claude/reference/*-body.md` (body; `.claude/reference/pr-body.md` for a PR)

### channel

- means: where a build is served from: **prod** (a course tag), **next** (`main`), **preview** (a PR)
- en: channel · rejected: "environment", "stage", "env"
- fr: to settle
- not to confuse with: [stage](#stage), [integration branch](#integration-branch)

### release

- means: tagging a course version (`<id>/vX.Y.Z`) and deploying prod; "publish" means a release, never a build
- en: release · rejected: "deploy" alone, "ship"
- fr: « publier », « version publiée »
- not to confuse with: [build](#build), [milestone](#milestone)

### course version

- means: one of the three versioned objects (decision `versioned-objects-and-spec-layout`), with the spec version and the **spec directives**; the site and the tooling have no version, only a **commit sha**
- en: course version · rejected: "site version"
- fr: « version du cours »
- code: the tag `<id>/vX.Y.Z`
- not to confuse with: [spec version](#spec-version), [release](#release)

### spec version

- means: one of the three versioned objects (decision `versioned-objects-and-spec-layout`), with the course version and the **spec directives**; the teacher and the tooling have no version, only a **commit sha**
- en: spec version · rejected: "teacher version"
- fr: to settle
- code: the tag `<name>/vX.Y.Z`; one folder per MAJOR
- not to confuse with: [course version](#course-version)

### freeze

- means: the moment after which the old repositories no longer change; announced by the agent
- en: freeze
- fr: to settle

### health

- means: a report on the repository's state; no skill produces it yet
- en: health · rejected: "status", "doctor"
- fr: to settle

### repository glossary

- means: this file
- en: repository glossary
- fr: to settle
- code: `docs/glossary.md`
- not to confuse with: [course glossary](#course-glossary)
