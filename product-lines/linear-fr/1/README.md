# linear-fr, MAJOR 1

| Reader | Comes for | Opens |
|---|---|---|
| creator | what a course is, its form, the templates, how to verify | [`course/README.md`](course/README.md), [`course/form.md`](course/form.md), [`course/templates/README.md`](course/templates/README.md), [`product-lines/check-course`](../../check-course); the files of [section 2](#2-files) whose readers name the creator |
| builder | the shape of a course, of learner memory, the lexicons, the protocol | the files of [section 2](#2-files) whose readers name the builder, [`spec.yaml`](spec.yaml); the teacher's, not declared while it is frozen: [`products/teacher/README.md`](products/teacher/README.md), [`products/teacher/rules.yaml`](products/teacher/rules.yaml), [`products/teacher/composition.yaml`](products/teacher/composition.yaml), [`products/teacher/templates/learner/`](products/teacher/templates/learner/), [`products/teacher/lexicon.yaml`](products/teacher/lexicon.yaml) |
| verifier | the rules as data, the conformance clause, the categories, the checks | [`course/rules.yaml`](course/rules.yaml), [`linear-fr/1/products/teacher/rules.yaml`](products/teacher/rules.yaml), sections [3](#3-categories) and [5](#5-checks), [`course/checks/README.md`](course/checks/README.md), [`spec-directives/1/README.md`](../../../spec-directives/1/README.md#2-conformance) sections 2 to 5 |
| spec writer | the files, the references, the decisions, the changelog | sections [2](#2-files) and [4](#4-normative-references), [`decisions/`](decisions/), [`CHANGELOG.md`](CHANGELOG.md), [`spec-directives/1/README.md`](../../../spec-directives/1/README.md) |

The readers are defined in [`spec-directives/README.md`](../../../spec-directives/README.md#the-readers).

The spec of the product line of linear introductory courses in French, the contract of its courses and of its products: courses of ordered domains, ordered concepts with prerequisites, each written in one concept file cut into units taught one per teacher message, a storyline. This folder, `product-lines/linear-fr/1/`, holds its MAJOR 1, version `1.0.0-alpha` until its tag, binding from the tag `linear-fr/v1.0.0` (`spec-directives/1/README.md` section 6); a course follows it by declaring `spec: linear-fr@1` in its `course.yaml`.

Its files, what each holds, who reads it and what tests it are the map, section 2, generated from its manifest, `spec.yaml`.

This file holds no rule on a course or on the teacher: what a course is, is in `course/README.md`; the protocol the teacher executes, in `products/teacher/rules.yaml`. How a spec is written and read (what a rule file holds, conformance, levels, methods, severity, versions, the tests of these files) is the spec directives this MAJOR follows, `spec-directives/1/README.md`.

## 1. Scope

`linear-fr` is the contract of a product line ([`docs/glossary.md`](../../../docs/glossary.md#spec)): the form of its courses, a linear introductory course made of ordered **domains**, ordered **concepts** with prerequisites, each cut into **units** taught one per teacher message, a **storyline** the cases live in. A course that does not fit this shape needs another spec. The spec fixes what a course contains and how it is checked (`course/`), and what each of its products takes from it: the site, how it shows a course (`products/site/`), and the teacher, how it teaches one (`products/teacher/`). The spec is French (`language: fr` in `spec.yaml`): its courses, its lexicons and its protocol are in French, and a course of another language follows another spec, not a translation of this one (decision `lexicon-not-language-pack`). The words a program recognises in a course file are written once, in the **lexicon** `course/lexicon.yaml`, whose keys `course/README.md` section 7 names; the words the teacher says and writes, in `products/teacher/lexicon.yaml`.

Out of scope here: the learner memory files (the protocol, and `products/teacher/templates/learner/`), how the site engine lays out its pages, and how a classroom realises the parts of the teacher for its target (their own folders); what this MAJOR renders for a teacher build is `products/teacher/build/`, and what it gives the site build, the published parts of a course, the words and the addresses of the site, is `products/site/`. The test scenarios of the teacher, which name the rules of the protocol, are this MAJOR's (`products/teacher/tests/`); the harness that runs them in a classroom, `teacher-builder/fresh-test`, is not.

The files of the spec are split by the course and by product (`spec-directives/1/README.md` section 2), plus this README (decision `spec-files-by-product`); what a rule file holds is the directives' (`spec-directives/1/README.md` section 1). `course/rules.yaml` holds every rule of a course, those the checks verify, taught-check included, and those verified by inspection (the review), one group per section of `course/README.md` that points to rules; `course/schemas/course.schema.yaml` holds the fields of `course.yaml`, and `course/schemas/concept-frontmatter.schema.yaml` the fields of the `concept.md` frontmatter (#329). `products/teacher/rules.yaml` holds every rule of the protocol (#554); `products/teacher/README.md` states none.

**Language.** The language of the spec is French (`language: fr` in `spec.yaml`), the language of its courses, of its lexicons and of the rules of `products/teacher/rules.yaml`, a bounded exception to the language policy (`docs/decisions/language-policy.md`): the v1 protocol is a base inherited from the founding course, whose teacher was instructed and corrected in French. It changes by user story, its fresh tests come with the teacher. A teacher or a course of another language follows another spec, not a translation of this one (decision `lexicon-not-language-pack`).

## 2. Files

Generated from `spec.yaml` by `mise exec -- spec-directives/generate-map product-lines/linear-fr/1`: do not edit it by hand, change the manifest (its roles and its `map:`) and run the command again.

The files of this MAJOR, one table per owner, a row per role the manifest declares: the file, what it holds and who reads it (`map:`), its kind, told from its path (`data` a `.yaml`, `prose` a `.md`, `script` a program, `folder`), and what tests it, the tests of `check-spec` and the checks of a course that read it, as each says. The readers are defined in `spec-directives/README.md`, « The readers »; the tests of `check-spec` in `spec-directives/1/README.md` section 8, the checks of a course in `course/checks/README.md`.

### The spec

| File | Holds | Kind | Readers | Tested by |
|---|---|---|---|---|
| [`spec.yaml`](spec.yaml) | the manifest of this MAJOR: its identity, the MAJOR of the spec directives it follows, its files by role, the lists its tests hold them to, and this map | data | builder, verifier, spec writer | check-spec: `map`, `spec-yaml` |
| [`README.md`](README.md) | the entry to this MAJOR: its scope, its files (this map), the categories, the normative references, the list of checks | prose | creator, builder, verifier, spec writer | check-spec: `map` |
| [`CHANGELOG.md`](CHANGELOG.md) | the changes of the spec, an « Unreleased » section until the tag | prose | spec writer | check-spec: `spec-yaml` |
| [`decisions/`](decisions/) | the decisions of this spec | folder | spec writer | none |

### The course

| File | Holds | Kind | Readers | Tested by |
|---|---|---|---|---|
| [`course/README.md`](course/README.md) | what a course is: the course folder, `course.yaml`, the concept folder and its concept file, the unit and its additions, domain files, course files, diagrams, the lexicon of the course files | prose | creator, builder, spec writer | none |
| [`course/rules.yaml`](course/rules.yaml) | the rules of a course, in French, one group per section of `course/README.md` that points to rules, each with its `purpose` | data | verifier, spec writer | check-spec: `rule-files` |
| [`course/lexicon.yaml`](course/lexicon.yaml) | the lexicon of the course files: the words a program recognises in a course file, by key (`course/README.md` section 7) | data | creator, builder, spec writer | check-spec: `lexicon-keys`; check-course: `course-yaml`, `course-files`, `conventions`, `typography`, `concept-file`, `unit-contract`, `case-coverage`, `teacher-message-length`, `sources`, `unit-additions`, `glossary-order` |
| [`course/form.yaml`](course/form.yaml) | the form of the files of a course as data: their parts, their order, their presence, published or not, their readers; it names the words by their key in `course/lexicon.yaml` and holds none | data | builder, verifier, spec writer | check-course: `course-yaml`, `course-files`, `conventions`, `concept-file`, `unit-contract`, `case-coverage`, `teacher-message-length`, `sources`, `unit-additions`, `glossary-order` |
| [`course/form.md`](course/form.md) | the form of the files of a course, readable: each file with its parts in order, mandatory or not, published or not, their readers and their words | prose | creator, builder | check-spec: `map` |
| [`course/schemas/`](course/schemas/) | the fields of `course.yaml` and of the `concept.md` frontmatter, as JSON Schema 2020-12 written in YAML, each one rule of `course/rules.yaml` | folder | builder, verifier, spec writer | check-spec: `rule-files`; check-course: `course-yaml`, `concept-file` |
| [`course/checks/`](course/checks/) | the check scripts of a course, their fixtures and `README.md` (how to run them); `product-lines/check-course <course-dir>` runs them | folder | creator, verifier | check-spec: `rule-files` |
| [`course/parser.js`](course/parser.js) | the parser of a course: it loads a course folder and reads the tree and the parts of each `concept.md` and the fixed facts of `storyline.md`, for the checks and the site build | script | builder, verifier | check-course: `course-yaml`, `course-files`, `conventions`, `typography`, `concept-file`, `drawing-contract`, `unit-contract`, `case-coverage`, `teacher-message-length`, `sources`, `unit-additions`, `glossary-order` |
| [`course/views.js`](course/views.js) | the renderer of the views of the course's files that generate-map writes: `course/form.md`, from `course/form.yaml` and `course/lexicon.yaml` | script | spec writer | check-spec: `map` |
| [`course/templates/`](course/templates/) | the course templates | folder | creator | none |
| [`course/samples/`](course/samples/) | the spec's sample courses, one folder per course, each a course of this MAJOR that changes only with it, written for the spec's tests, the teacher build, the site build and a human who plays it: `cafe`, a short course on coffee | folder | creator, builder, verifier | none |

### The product `site`

| File | Holds | Kind | Readers | Tested by |
|---|---|---|---|---|
| [`products/site/lexicon.yaml`](products/site/lexicon.yaml) | the lexicon of the site: the words and short texts the site shows for every course of the spec and no course file holds, each with the glossary entry it takes its word from | data | builder | check-spec: `lexicon-keys` |
| [`products/site/url-scheme.yaml`](products/site/url-scheme.yaml) | the URL scheme of the site: the address of each page, relative to the site's base path, its path words, and how the number of a domain and of a concept is written in it | data | builder | none |
| [`products/site/build/`](products/site/build/) | the half of a site build that depends on this MAJOR: `render-site`, which gives the published parts of a course with the words, the URL scheme and the language of the site as one JSON document, run by `site-builder/`; `site.schema.yaml`, the shape of its output; `test-render`; `README.md` | folder | builder | none |

Built from the course by [`products/site/build/`](products/site/build/).

### The product `teacher`

[`products/teacher/`](products/teacher/), not declared while it is frozen (decision `teacher-frozen-until-the-protocol-brainstorm`, idea #687): the protocol, the composition, the lexicon, the build and the test scenarios of the teacher, and the templates of learner memory.

## 3. Categories

A rule of a course has a category, from a closed list, extended when needed:

| Category | The question it asks |
|---|---|
| `structure` | can the builds read the course? (files, fields, identifiers that resolve) |
| `pedagogy` | what is taught, in what order, what is asked of the learner? |
| `writing` | does the text follow its conventions? |
| `sources` | does every claim trace back to a source? |
| `diagrams` | do the drawings follow their contract? |

For a rule of the protocol, the category is its family (the nine families of `products/teacher/rules.yaml`), written in `products/teacher/rules.yaml` as a slug of its title, in their order: `session-start`, `domain-presentation`, `loop`, `message-form`, `storyline`, `stances-and-sources`, `practice-skip-asides`, `learner-memory`, `stop`. No other category exists: the tests of the spec's own files verify no rule and carry none (`spec-directives/1/README.md` section 8).

## 4. Normative references

The standards a rule of this spec depends on, through its text, its check or a schema it names, each with the edition this MAJOR reads and the groups whose rules depend on it: a group of `course/rules.yaml` by its title without its section suffix (its groups have no `id`), a group of `products/teacher/rules.yaml` by its `id`. A group depends on CommonMark when one of its rules requires or writes a CommonMark construct (a heading, a link, emphasis, a list, a block quote); naming a section by its heading does not count. The standards of the rule model itself (the rule files, the levels, the methods, the versions of a spec) are the directives' (`spec-directives/1/README.md` section 7); YAML, JSON Schema and SemVer are in both lists, there for the rule files and the spec, here for the files and the versions of a course, and their edition is the one the directives give.

| Standard | Edition | Groups |
|---|---|---|
| [CommonMark](https://spec.commonmark.org/0.31.2/) | 0.31.2 (2024-01-28) | « Le dossier du cours », « Le dossier de concept », « Le frontmatter de concept.md », « Le corps de concept.md », « L'unité », « Le fichier sources.md », « Les conventions du texte », « Les ajouts d'une unité », « Les fichiers de domaine », « Les fichiers du cours »; `onboarding`, `resume`, `domain-presentation`, `loop`, `message-form`, `learner-memory` |
| [GitHub Flavored Markdown, tables](https://github.github.com/gfm/#tables-extension-) | 0.29-gfm (2019-04-06) | « Le fichier sources.md », « Les fichiers du cours » |
| [YAML](https://yaml.org/) | the directives' (`spec-directives/1/README.md` section 7) | « Le fichier course.yaml », « Le dossier de concept », « Le frontmatter de concept.md », « Les fichiers de domaine » |
| [JSON Schema](https://json-schema.org/) | the directives' (`spec-directives/1/README.md` section 7) | « Le fichier course.yaml », « Le frontmatter de concept.md » |
| [XML](https://www.w3.org/TR/2008/REC-xml-20081126/) | 1.0, Fifth Edition (2008-11-26) | « Le contrat de dessin » |
| [SVG](https://www.w3.org/TR/2018/CR-SVG2-20181004/) | SVG 2, Candidate Recommendation (2018-10-04) | « Le contrat de dessin », « Le style des schémas » |
| [WAI-ARIA](https://www.w3.org/TR/wai-aria-1.2/) | 1.2 (2023-06-06) | « Le contrat de dessin » |
| [ISO 8601-1](https://www.iso.org/standard/70907.html) | 2019 | « Le fichier sources.md », « Les fichiers du cours » |
| [SemVer](https://semver.org/) | the directives' (`spec-directives/1/README.md` section 7) | « Les fichiers du cours » |

## 5. Checks

**Purpose.** What verifies a course against this spec, each check with its category, level and method and the severity that follows (`spec-directives/1/README.md` section 5); the tests of the spec's own files are the directives' (`spec-directives/1/README.md` section 8).

| Reader | Needs | When |
|---|---|---|
| the creator (human or agent) | which check verifies each rule, and how to run it | after each change, before the PR |
| the reviewer | which rules a script already verified, so the review reads the rest | reviewing a change |
| the maintainer | the reported findings to triage into course issues | on demand |

Node scripts in `course/checks/`, one per id, with the `lib/` and the dependencies of the directives MAJOR that `spec.yaml` declares (`spec-directives/1/package.json`, installed by `npm ci`; decision `checks-use-ajv-and-yaml`); `course/checks/README.md` gives how to install and run them, their options and fixtures. `product-lines/check-course <course-dir>` runs this folder's `course/checks/check-course` on a course. `spec-directives/check-spec <this folder>` runs the tests of the spec's own files, those `spec.yaml` declares (which test reads which file: the map, [section 2](#2-files), « Tested by »), not a course: they are the directives' (`spec-directives/1/tests/`). The teacher's files, not declared while it is frozen, are tested by none: `rule-slugs`, `composition` and `scenarios` say they checked nothing.

`check-course` takes its checks from `course/rules.yaml`: by default it runs, in one run, every check of method test, blocking and reporting, and `--category <c>[,<c>...]` runs the checks of those categories only, a closed list (the categories of a course, an unknown one a usage error). A check of another method is not run by a script: `check-course --list` names it, with how it runs. The tests of `check-spec` are not among its checks: `check-course` neither runs nor lists them.

Both print one line per passing check (`<id>: ok`) and one line per failure (`<id>: fail: <file>:<line> <message>`, the file relative to the course folder, or to the spec folder for `check-spec`), whatever the severity; `check-course` ends with a summary line that counts the failed checks of each severity. The exit code is 1 when a blocking check fails or a check of either severity crashes, 0 otherwise (a reporting check that fails leaves it 0), 2 on a usage error, when the rule files cannot be read or when the dependencies are not installed.

The category, level and method of each check below are those of the rules it verifies, in `course/rules.yaml` (the `check` of each rule); `rule-files` verifies that a check has one category and one level. A rule that no check implements yet is verified by its method alone: the review for an inspection, the fresh tests for a demonstration. The sections are those of `course/README.md`.

| Id | Category | Level | Method | Severity | Verifies | Sections |
|---|---|---|---|---|---|---|
| `course-yaml` | `structure` | requirement | test | blocks | `course.yaml` fields against its schema through `Ajv2020` (no sections nor units: the map of the course; `site.accent_color`), identifiers, order, partition into domains, annexes, prerequisites, paths, no unlisted folder in `concepts/`; `logo.svg` present, square, one colour in `currentColor`, no script and no external resource; spec declared (`product-lines/check-course` refuses an unknown spec or MAJOR); a missing lexicon, a tooling error (no rule) | 2; `spec-directives/1/README.md` 6 |
| `concept-file` | `structure` | requirement | test | blocks | from `course/form.yaml`: the folder's files; the frontmatter against its schema through `Ajv2020`, `verified` parallel to `refs`; the title of `concept.md` (`# Concept <n> : <title>`, the title of `course.yaml`); the parts of `concept.md` in order, its head with no block, the blocks of its foot; the tree of the concept in its headings (each heading opened by its kind; section and unit ids: form, order, uniqueness, one unit at least and at most 9 per section) | 3, 3.1, 3.2 |
| `unit-contract` | `pedagogy` | requirement | test | blocks | from `course/form.yaml`: a section holds its units only; each unit's `####` blocks, titled by their word alone, in order and presence, no line outside a block; the fields of « Leçon » and « Cas du fil rouge », labelled, nothing between a label and its colon, no line outside a field; the cases of « Cas du fil rouge », each under its heading `##### Cas : <title>`, its fields in order and presence, « Idées fausses en jeu » last, every case's title unique in the concept; each case names one misconception of its unit at least, and only those of its unit; each misconception named by a case at least; the misconceptions of « Leçon », each named, its name unique in its unit, with its « Racine » and its « Correction », nothing else under it | 3.3, 7 |
| `conventions` | `writing` | requirement | test | blocks | the conventions of the text of `concept.md`, in the parts the learner reads; no image in `concept.md`; plain Markdown in course files | 1, 3.5 |
| `drawing-contract` | `diagrams` | requirement | test | blocks | every diagram against the drawing contract (a root `<defs>` accepted); declared and present diagrams match, each at a unit of the concept | 3.1, 6.1 |
| `sources` | `sources` | requirement | test | blocks | the form of `sources.md`: no frontmatter, no H1, its three sections in order, a table of five columns in « Affirmations » and « Références »; no introduction; in each claim row: section anchors that exist in `concept.md` among its published parts, a source cell of reference ids or the `markers.course` word, a verification, a nature; reference ids, links (one URL or empty), types, dates; every id cited exists, every reference cited; « Non vérifié » entries anchored | 3.1, 3.4 |
| `course-files` | `structure` | requirement | test | blocks | from `course/form.yaml`: `plan.md` (« Public cible », « Accueil »: one posture paragraph, then its questions, « Progression »), the domain files (no frontmatter, their two sections, no unlisted file in `domains/`), `storyline.md` (« Faits fixés » last, each fact naming a unit of the course), `glossary.md` (four columns, one defining concept per row, a variant in one row), `CHANGELOG.md` | 4, 5 |
| `unit-additions` | `pedagogy` | recommendation | test | reports | each passage in bold of a field of a unit, those of its cases included, that the learner reads is a term of `glossary.md` or one of its variants; bold for emphasis stays possible, a bold that is no term is reported in case the term is missing from the glossary | 3.6 |
| `case-coverage` | `pedagogy` | recommendation | test | reports | each misconception the unit's case names in « Idées fausses en jeu » is named by a supplementary case of the unit too | 3.3 |
| `teacher-message-length` | `pedagogy` | recommendation | test | reports | no teacher message above 12 lines of 100 characters in « Matière », « Ancrage » and « Question », the misconceptions left out | 3.3 |
| `glossary-order` | `pedagogy` | recommendation | test | reports | no glossary term used in a `concept.md`, in the parts the learner reads or in its frontmatter, before its defining concept, unless its sentence carries a concept reference to that concept; each comma variant matched, a qualified row skipped | 5 |
| `typography` | `writing` | recommendation | test | reports | no banned character of the lexicon in course text | 1 |
| `taught-check` | `pedagogy` | recommendation | analysis | reports | no question of a unit or a case asks what the learner has not yet been taught | 3.3 |

**`taught-check`** is not a script: it is an agent workflow, `course/checks/taught-check.js`, run on demand after a change to what a concept teaches, by a work session with `Workflow` and an absolute `scriptPath` (args `{ course, from?, to? }`, `from` the first concept or unit the change touches and `to` the last, a concept by its number, a unit by its id; without them, the whole course); it reads each concept file unit by unit, its form from `course/form.yaml` and its words from `course/lexicon.yaml`, and judges each question, of a unit or of a supplementary case, against what the units before it taught; it modifies no file, and its findings are triaged like the others.
