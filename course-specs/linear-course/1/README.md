# linear-course, MAJOR 1

| Reader | Comes for | Opens |
|---|---|---|
| creator | what a course is, the templates, how to verify | [`course/README.md`](course/README.md), [`course/templates/README.md`](course/templates/README.md), [`course-specs/check-course`](../../check-course) |
| builder | the shape of a course, of learner memory, the lexicons, the protocol | [`course/README.md`](course/README.md), [`course/schemas/`](course/schemas/), [`linear-course/1/teacher/README.md`](teacher/README.md), [`linear-course/1/teacher/rules.yaml`](teacher/rules.yaml), [`teacher/composition.yaml`](teacher/composition.yaml), [`linear-course/1/teacher/templates/learner/`](teacher/templates/learner/), [`course/lexicon.yaml`](course/lexicon.yaml), [`teacher/lexicon.yaml`](teacher/lexicon.yaml), [`site/lexicon.yaml`](site/lexicon.yaml), [`site/url-scheme.yaml`](site/url-scheme.yaml), [`site/build/README.md`](site/build/README.md), [`spec.yaml`](spec.yaml) |
| verifier | the rules as data, the conformance clause, the categories, the checks | [`course/rules.yaml`](course/rules.yaml), [`linear-course/1/teacher/rules.yaml`](teacher/rules.yaml), sections [3](#3-categories) and [5](#5-checks), [`course/checks/README.md`](course/checks/README.md), [`spec-directives/1/README.md`](../../../spec-directives/1/README.md#2-conformance) sections 2 to 5 |
| spec writer | the files, the references, the decisions, the changelog | sections [2](#2-files) and [4](#4-normative-references), [`decisions/`](decisions/), [`CHANGELOG.md`](CHANGELOG.md), [`spec-directives/1/README.md`](../../../spec-directives/1/README.md) |

The readers are defined in [`spec-directives/README.md`](../../../spec-directives/README.md#the-readers).

The spec of linear introductory courses: ordered domains, ordered concepts with prerequisites, each written in one concept file cut into units taught one per teacher message, a storyline. This folder, `course-specs/linear-course/1/`, holds its MAJOR 1, version `1.0.0-alpha` until its tag, binding from the tag `linear-course/v1.0.0` (`spec-directives/1/README.md` section 6); a course follows it by declaring `spec: linear-course@1` in its `course.yaml`.

- `README.md`: this file: scope, files, categories, normative references, the list of checks.
- `course/README.md`: what a course is: course structure, the conventions of the text, diagrams (drawing contract and style), the lexicon of the course files.
- `teacher/README.md`: how a rule of the protocol is written (its notation, its writing rules), the description of the composition of the teacher, the keys and parameters; `teacher/rules.yaml`: the rules of the protocol the teacher executes.
- `teacher/composition.yaml`: the composition of the teacher, its five parts, when each loads and what each draws from (section 2).
- `teacher/build/`: the half of a classroom build that depends on this MAJOR, `render-parts`, which renders the five parts of the composition as text for a course, one JSON document whose shape `parts.schema.yaml` fixes (`teacher/build/README.md`).
- `teacher/tests/`: the test scenarios of the teacher, one YAML file each, whose form `scenario.schema.yaml` fixes, run by `classroom-builder/fresh-test` (`teacher/tests/README.md`).
- `site/`: what the site build needs from the spec and no course file holds: `site/lexicon.yaml`, the words and short texts the site shows for every course of the spec, and `site/url-scheme.yaml`, the address of each page of the site; `site/build/`: the half of a site build that depends on this MAJOR, `render-site`, which gives the published parts of a course as one JSON document whose shape `site.schema.yaml` fixes (`site/build/README.md`).
- `CHANGELOG.md`: the changes of the spec, « Unreleased » until the tag.
- `spec.yaml`: the declaration of this MAJOR, its version, its language (`fr`) and the MAJOR of the spec directives it follows (`spec-directives/1/`: the tests of these files, run by `spec-directives/check-spec course-specs/linear-course/1`, and the `lib/` and package the checks load).
- `course/lexicon.yaml`: the lexicon of the course files, the one source of the words the checks, the classroom build and the site recognise in a course file (headings, block kinds, unit fields and blocks, qualifiers, markers, natures, concept references, source types, typography); `teacher/lexicon.yaml`: the words the teacher says and writes; `site/lexicon.yaml`: the words the site shows for every course and no course file holds.
- `course/checks/`: the check scripts; `course-specs/check-course <course-dir>` runs on a course that declares this MAJOR the checks of the rule files, those that block and those that report, `--category` selecting by category (section 5).
- `course/templates/`: the course templates; `decisions/`: the decisions of this spec.

This file holds no rule on a course or on the teacher: what a course is, is in `course/README.md`; the protocol the teacher executes, in `teacher/rules.yaml`. How a spec is written and read (what a rule file holds, conformance, levels, methods, severity, versions, the tests of these files) is the spec directives this MAJOR follows, `spec-directives/1/README.md`.

## 1. Scope

`linear-course` describes a type of course: a linear introductory course made of ordered **domains**, ordered **concepts** with prerequisites, each cut into **units** taught one per teacher message, a **storyline** the cases live in. A course that does not fit this shape needs another spec. The spec fixes what a course contains, how the teacher teaches it, and how it is checked. The spec is French (`language: fr` in `spec.yaml`): its courses, its lexicons and its protocol are in French, and a course of another language follows another spec, not a translation of this one (decision `lexicon-not-language-pack`). The words a program recognises in a course file are written once, in the **lexicon** `course/lexicon.yaml`, whose keys `course/README.md` section 7 names; the words the teacher says and writes, in `teacher/lexicon.yaml`.

Out of scope here: the learner memory files (the protocol, and `teacher/templates/learner/`), how the site engine lays out its pages, and how a classroom realises the parts of the teacher for its target (their own folders); what this MAJOR renders for a classroom build is `teacher/build/`, and what it gives the site build, the published parts of a course, the words and the addresses of the site, is `site/`. The test scenarios of the teacher, which name the rules of the protocol, are this MAJOR's (`teacher/tests/`); the harness that runs them in a classroom, `classroom-builder/fresh-test`, is not.

## 2. Files

The files of the spec are split by class of products (`spec-directives/1/README.md` section 2), plus this README (decision `spec-files-by-product`):

| File | Holds |
|---|---|
| `README.md` | this file: scope, files, categories, normative references, the list of checks |
| `course/README.md` | what a course is: the course folder, `course.yaml`, the concept folder and its concept file, the unit and its additions, domain files, course files, diagrams, the lexicon of the course files |
| `course/form.yaml` | the form of the files of a course as data: the concept file (the files of a concept folder, the parts of `concept.md` and of its frontmatter, the blocks of a unit with their readers and their fields, its cases, the length of a unit), `sources.md` and the course files (`course.yaml` as the map, `plan.md`, the domain file, `storyline.md`, `glossary.md`, `CHANGELOG.md`), their parts, their order, their presence, published or not, their readers; it names the words by their key in `course/lexicon.yaml` and holds none |
| `teacher/README.md` | how a rule of the protocol is written: its notation, its writing rules; the composition; the keys and parameters |
| `course/rules.yaml` | the rules of a course, in French, one group per section of `course/README.md` that points to rules, each with its `purpose` |
| `teacher/rules.yaml` | the rules of the protocol, in French, one group per family and per group of a family, each with its `purpose` |
| `teacher/composition.yaml` | the composition of the teacher: its five parts, when each loads and what each draws from (`teacher/README.md`, "Composition") |
| `teacher/tests/` | the test scenarios of the teacher (`README.md`: the format, the rules each covers and those none covers), `scenario.schema.yaml` (their form), one YAML file per scenario, run by `classroom-builder/fresh-test` and verified in form by `check-spec` (`scenarios`) |
| `teacher/build/` | `render-parts`, which renders the five parts of the composition as text for a course (the half of a classroom build that depends on this MAJOR, read by `classroom-builder/`), `parts.schema.yaml` (the shape of its output), `test-render`, `README.md` |
| `course/schemas/*.schema.yaml` | the fields of `course.yaml` and of the `concept.md` frontmatter, as JSON Schema 2020-12 written in YAML, each one rule of `course/rules.yaml` |
| `CHANGELOG.md` | the changes of the spec, an « Unreleased » section until the tag |
| `spec.yaml` | the declaration of this MAJOR: `name`, `major`, `version`, `language`, and `directives`, the MAJOR of `spec-directives/` whose tests verify these files and whose `lib/` and package the checks load |
| `course/checks/` | the check scripts, their fixtures and `course/checks/README.md` (how to run them) |
| `course/lexicon.yaml` | the lexicon of the course files (`course/README.md` section 7) |
| `teacher/lexicon.yaml` | the lexicon of the teacher, the words it says and writes (`teacher/README.md`, « Clés et paramètres ») |
| `site/lexicon.yaml` | the lexicon of the site: the words and short texts the site shows for every course of the spec and no course file holds (the words of its navigation and headings that name a thing of the course, the words that come before a value, the headings of its stance columns, the intro lines of its stance columns and of its claims), each with the glossary entry it takes its word from |
| `site/url-scheme.yaml` | the URL scheme of the site: the address of each page, relative to the site's base path, its path words, and how a domain's number and a concept's number are written in it (a concept on two digits, an annex as its id) |
| `site/build/` | `render-site`, which gives the published parts of a course (`course/form.yaml`, `published: true`) with the words, the URL scheme and the language of the site as one JSON document (the half of a site build that depends on this MAJOR, run by `site-builder/`), `site.schema.yaml` (the shape of its output), `test-render`, `README.md` |
| `course/templates/` | the course templates |
| `course/samples/` | the spec's sample courses, one folder per course, each a course of this MAJOR that changes only with it, written for the spec's tests, the classroom build, the site build and a human who plays it: `cafe`, a short course on coffee |
| `teacher/templates/learner/` | the templates of the learner memory files |
| `decisions/` | the decisions of this spec |

What a rule file holds is the directives' (`spec-directives/1/README.md` section 1).

`course/rules.yaml` holds every rule of a course, those the checks verify, taught-check included, and those verified by inspection (the review), one group per section of `course/README.md` that points to rules; `course/schemas/course.schema.yaml` holds the fields of `course.yaml`, and `course/schemas/concept-frontmatter.schema.yaml` the fields of the `concept.md` frontmatter (#329). `teacher/rules.yaml` holds every rule of the protocol (#554); `teacher/README.md` states none.

**Language.** The language of the spec is French (`language: fr` in `spec.yaml`), the language of its courses, of its lexicons and of the rules of `teacher/rules.yaml`, a bounded exception to the language policy (`docs/decisions/language-policy.md`): the v1 protocol is a base inherited from the founding course, whose teacher was instructed and corrected in French. It changes by user story, its fresh tests come with the teacher. A teacher or a course of another language follows another spec, not a translation of this one (decision `lexicon-not-language-pack`).

## 3. Categories

A rule of a course has a category, from a closed list, extended when needed:

| Category | The question it asks |
|---|---|
| `structure` | can the builds read the course? (files, fields, identifiers that resolve) |
| `pedagogy` | what is taught, in what order, what is asked of the learner? |
| `writing` | does the text follow its conventions? |
| `sources` | does every claim trace back to a source? |
| `diagrams` | do the drawings follow their contract? |

For a rule of the protocol, the category is its family (the nine families of `teacher/rules.yaml`), written in `teacher/rules.yaml` as a slug of its title, in their order: `session-start`, `domain-presentation`, `loop`, `message-form`, `storyline`, `stances-and-sources`, `practice-skip-asides`, `learner-memory`, `stop`. No other category exists: the tests of the spec's own files verify no rule and carry none (`spec-directives/1/README.md` section 8).

## 4. Normative references

The standards a rule of this spec depends on, through its text, its check or a schema it names, each with the edition this MAJOR reads and the groups whose rules depend on it: a group of `course/rules.yaml` by its title without its section suffix (its groups have no `id`), a group of `teacher/rules.yaml` by its `id`. A group depends on CommonMark when one of its rules requires or writes a CommonMark construct (a heading, a link, emphasis, a list, a block quote); naming a section by its heading does not count. The standards of the rule model itself (the rule files, the levels, the methods, the versions of a spec) are the directives' (`spec-directives/1/README.md` section 7); YAML, JSON Schema and SemVer are in both lists, there for the rule files and the spec, here for the files and the versions of a course, and their edition is the one the directives give.

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

Node scripts in `course/checks/`, one per id, with the `lib/` and the dependencies of the directives MAJOR that `spec.yaml` declares (`spec-directives/1/package.json`, installed by `npm ci`; decision `checks-use-ajv-and-yaml`); `course/checks/README.md` gives how to install and run them, their options and fixtures. `course-specs/check-course <course-dir>` runs this folder's `course/checks/check-course` on a course. `spec-directives/check-spec <this folder>` runs the tests of the spec's own files (`teacher/README.md`, `README.md`, `course/README.md`, `decisions/`, `course/rules.yaml`, `teacher/rules.yaml`, `teacher/composition.yaml`, `course/schemas/`, the lexicons of the course files and of the teacher, `spec.yaml`, `CHANGELOG.md`), not a course: they are the directives' (`spec-directives/1/tests/`).

`check-course` takes its checks from `course/rules.yaml`: by default it runs, in one run, every check of method test, blocking and reporting, and `--category <c>[,<c>...]` runs the checks of those categories only, a closed list (the categories of a course, an unknown one a usage error). A check of another method is not run by a script: `check-course --list` names it, with how it runs. The tests of `check-spec` are not among its checks: `check-course` neither runs nor lists them.

Both print one line per passing check (`<id>: ok`) and one line per failure (`<id>: fail: <file>:<line> <message>`, the file relative to the course folder, or to the spec folder for `check-spec`), whatever the severity; `check-course` ends with a summary line that counts the failed checks of each severity. The exit code is 1 when a blocking check fails or a check of either severity crashes, 0 otherwise (a reporting check that fails leaves it 0), 2 on a usage error, when the rule files cannot be read or when the dependencies are not installed.

The category, level and method of each check below are those of the rules it verifies, in `course/rules.yaml` (the `check` of each rule); `rule-files` verifies that a check has one category and one level. A rule that no check implements yet is verified by its method alone: the review for an inspection, the fresh tests for a demonstration. The sections are those of `course/README.md`.

| Id | Category | Level | Method | Severity | Verifies | Sections |
|---|---|---|---|---|---|---|
| `course-yaml` | `structure` | requirement | test | blocks | `course.yaml` fields against its schema through `Ajv2020` (no sections nor units: the map of the course), identifiers, order, partition into domains, annexes, prerequisites, paths, no unlisted folder in `concepts/`, spec declared (`course-specs/check-course` refuses an unknown spec or MAJOR); a missing lexicon, a tooling error (no rule) | 2; `spec-directives/1/README.md` 6 |
| `concept-file` | `structure` | requirement | test | blocks | from `course/form.yaml`: the folder's files; the frontmatter against its schema through `Ajv2020`, `verified` parallel to `refs`; the title of `concept.md` (`# Concept <n> : <title>`, the title of `course.yaml`); the parts of `concept.md` in order, its head with no block, the blocks of its foot; the tree of the concept in its headings (each heading opened by its kind; section and unit ids: form, order, uniqueness, one unit at least and at most 9 per section) | 3, 3.1, 3.2 |
| `unit-contract` | `pedagogy` | requirement | test | blocks | from `course/form.yaml`: a section holds its units only; each unit's `####` blocks, titled by their word alone, in order and presence, no line outside a block; the fields of « Leçon » and « Cas du fil rouge », labelled, nothing between a label and its colon, no line outside a field; the cases of « Cas du fil rouge », each opened by its « Titre », its fields in order and presence, « Qualificatif » on a supplementary case only and from the lexicon, every case's title unique in the concept; the misconceptions of « Leçon », each named, its name unique in its unit, with its « Racine » and its « Correction », nothing else under it | 3.3, 7 |
| `conventions` | `writing` | requirement | test | blocks | the conventions of the text of `concept.md`, in the parts the learner reads; no image in `concept.md`; plain Markdown in course files | 1, 3.5 |
| `drawing-contract` | `diagrams` | requirement | test | blocks | every diagram against the drawing contract (a root `<defs>` accepted); declared and present diagrams match, each at a unit of the concept | 3.1, 6.1 |
| `sources` | `sources` | requirement | test | blocks | the form of `sources.md`: no frontmatter, no H1, its three sections in order, a table of five columns in « Affirmations » and « Références »; no introduction; in each claim row: section anchors that exist in `concept.md` among its published parts, a source cell of reference ids or the `markers.course` word, a verification, a nature; reference ids, links (one URL or empty), types, dates; every id cited exists, every reference cited; « Non vérifié » entries anchored | 3.1, 3.4 |
| `course-files` | `structure` | requirement | test | blocks | from `course/form.yaml`: `plan.md` (« Public cible », « Accueil »: one posture paragraph, then its questions, « Progression »), the domain files (no frontmatter, their two sections, no unlisted file in `domains/`), `storyline.md` (« Faits fixés » last, each fact naming a unit of the course), `glossary.md` (four columns, one defining concept per row, a variant in one row), `CHANGELOG.md` | 4, 5 |
| `unit-additions` | `pedagogy` | recommendation | test | reports | each passage in bold of a field of a unit, those of its cases included, that the learner reads is a term of `glossary.md` or one of its variants; bold for emphasis stays possible, a bold that is no term is reported in case the term is missing from the glossary | 3.6 |
| `teacher-message-length` | `pedagogy` | recommendation | test | reports | no teacher message above 12 lines of 100 characters in « Matière », « Ancrage » and « Question », the misconceptions left out | 3.3 |
| `glossary-order` | `pedagogy` | recommendation | test | reports | no glossary term used in a `concept.md`, in the parts the learner reads or in its frontmatter, before its defining concept, unless its sentence carries a concept reference to that concept; each comma variant matched, a qualified row skipped | 5 |
| `typography` | `writing` | recommendation | test | reports | no banned character of the lexicon in course text | 1 |
| `taught-check` | `pedagogy` | recommendation | analysis | reports | no question of a unit or a case asks what the learner has not yet been taught | 3.3 |

**`taught-check`** is not a script: it is an agent workflow, `course/checks/taught-check.js`, run on demand after a change to what a concept teaches, by a work session with `Workflow` and an absolute `scriptPath` (args `{ course, from?, to? }`, `from` the first concept or unit the change touches and `to` the last, a concept by its number, a unit by its id; without them, the whole course); it reads each concept file unit by unit, its form from `course/form.yaml` and its words from `course/lexicon.yaml`, and judges each question, of a unit or of a supplementary case, against what the units before it taught; it modifies no file, and its findings are triaged like the others.
