# linear-course, MAJOR 1

| Reader | Comes for | Opens |
|---|---|---|
| creator | what a course is, the templates, how to verify | [`course/README.md`](course/README.md), [`course/templates/README.md`](course/templates/README.md), [`course-specs/check-course`](../../check-course) |
| builder | the shape of a course, of learner memory, the lexicons, the protocol | [`course/README.md`](course/README.md), [`course/schemas/`](course/schemas/), [`linear-course/1/teacher/README.md`](teacher/README.md), [`linear-course/1/teacher/rules.yaml`](teacher/rules.yaml), [`linear-course/1/teacher/templates/learner/`](teacher/templates/learner/), [`course/lexicon.yaml`](course/lexicon.yaml), [`teacher/lexicon.yaml`](teacher/lexicon.yaml), [`spec.yaml`](spec.yaml) |
| verifier | the rules as data, the conformance clause, the categories, the checks | [`course/rules.yaml`](course/rules.yaml), [`linear-course/1/teacher/rules.yaml`](teacher/rules.yaml), sections [3](#3-categories) and [5](#5-checks), [`course/checks/README.md`](course/checks/README.md), [`spec-directives/1/README.md`](../../../spec-directives/1/README.md#2-conformance) sections 2 to 5 |
| spec writer | the files, the references, the decisions, the changelog | sections [2](#2-files) and [4](#4-normative-references), [`decisions/`](decisions/), [`CHANGELOG.md`](CHANGELOG.md), [`spec-directives/1/README.md`](../../../spec-directives/1/README.md) |

The readers are defined in [`spec-directives/README.md`](../../../spec-directives/README.md#the-readers).

The spec of linear introductory courses: ordered domains, ordered concepts with prerequisites,
sub-concepts taught one per teacher message, a storyline. This folder,
`course-specs/linear-course/1/`, holds its MAJOR 1, version `1.0.0-alpha` until its tag,
binding from the tag `linear-course/v1.0.0` (`spec-directives/1/README.md` section 6); a course
follows it by declaring `spec: linear-course@1` in its `course.yaml`.

- `README.md`: this file: scope, files, categories, normative references, the list of checks.
- `course/README.md`: what a course is: course structure, reader-text conventions, diagrams (drawing contract and style), the lexicon of the course files.
- `teacher/README.md`: the pedagogical protocol the teacher executes.
- `CHANGELOG.md`: the changes of the spec, « Unreleased » until the tag.
- `spec.yaml`: the declaration of this MAJOR, its version, its language (`fr`) and the MAJOR of the spec directives it follows (`spec-directives/1/`: the tests of these files, run by `spec-directives/check-spec course-specs/linear-course/1`, and the `lib/` and package the checks load).
- `course/lexicon.yaml`: the lexicon of the course files, the one source of the words the checks, the classroom build and the site recognise in a course file (headings, case fields, qualifiers, markers, natures, concept references, source types, typography); `teacher/lexicon.yaml`: the words the teacher says and writes.
- `course/checks/`: the check scripts; `course-specs/check-course <course-dir>` runs on a course that declares this MAJOR the checks of the rule files, those that block and those that report, `--category` selecting by category (section 5).
- `course/templates/`: the course templates; `decisions/`: the decisions of this spec.

This file holds no rule on a course or on the teacher: what a course is, is in
`course/README.md`; the protocol the teacher executes, in `teacher/README.md`. How a spec is
written and read (what a rule file holds, conformance, levels, methods, severity, versions, the
tests of these files) is the spec directives this MAJOR follows, `spec-directives/1/README.md`.

## 1. Scope

`linear-course` describes a type of course: a linear introductory course made of ordered
**domains**, ordered **concepts** with prerequisites, **sub-concepts** taught one per teacher
message, a **storyline** the cases live in. A course that does not fit this shape needs another
spec. The spec fixes what a course contains, how the teacher teaches it, and how it is checked.
The spec is French (`language: fr` in `spec.yaml`): its courses, its lexicons and its protocol
are in French, and a course of another language follows another spec, not a translation of this
one (decision `lexicon-not-language-pack`). The words a program recognises in a course file are
written once, in the **lexicon** `course/lexicon.yaml`, whose keys `course/README.md` section 7
names; the words the teacher says and writes, in `teacher/lexicon.yaml`.

Out of scope here: the learner memory files (the protocol, and `teacher/templates/learner/`), how
the site and the classroom build (their own folders).

## 2. Files

The files of the spec are split by class of products (`spec-directives/1/README.md` section 2),
plus this README (decision `spec-files-by-product`):

| File | Holds |
|---|---|
| `README.md` | this file: scope, files, categories, normative references, the list of checks |
| `course/README.md` | what a course is: the course folder, `course.yaml`, the concept folder, domain files, course files, diagrams, the lexicon of the course files |
| `teacher/README.md` | the protocol of the teacher: purpose, notation, rules named by slug, keys and parameters |
| `course/rules.yaml` | the rules of a course, in English |
| `teacher/rules.yaml` | the rules of the teacher, in French |
| `course/schemas/*.schema.yaml` | the tables of fields of `course/README.md`, as JSON Schema 2020-12 written in YAML, each one rule of `course/rules.yaml` |
| `CHANGELOG.md` | the changes of the spec, an « Unreleased » section until the tag |
| `spec.yaml` | the declaration of this MAJOR: `name`, `major`, `version`, `language`, and `directives`, the MAJOR of `spec-directives/` whose tests verify these files and whose `lib/` and package the checks load |
| `course/checks/` | the check scripts, their fixtures and `course/checks/README.md` (how to run them) |
| `course/lexicon.yaml` | the lexicon of the course files (`course/README.md` section 7) |
| `teacher/lexicon.yaml` | the lexicon of the teacher, the words it says and writes (`teacher/README.md`, "Keys and parameters") |
| `course/templates/` | the course templates |
| `teacher/templates/learner/` | the templates of the learner memory files |
| `decisions/` | the decisions of this spec |

What a rule file holds is the directives' (`spec-directives/1/README.md` section 1).

`course/rules.yaml` holds the rules the checks of a course verify, taught-check included, and one
rule verified by inspection, the review; `course/schemas/course.schema.yaml` and
`course/schemas/concept-frontmatter.schema.yaml` are the tables of `course/README.md` sections 2 and
3.1 (#329). The other rules of a course leave `course/README.md` for `course/rules.yaml`, and the
rules of the protocol leave `teacher/README.md` for `teacher/rules.yaml`, which holds one today, in
#318. Until that extraction, `course/README.md` and `teacher/README.md` keep their verbal forms of
obligation, read as `course/README.md` says in its opening.

**Language.** The language of the spec is French (`language: fr` in `spec.yaml`), the language
of its courses, of its lexicons and of the rules of `teacher/README.md`, a bounded exception to the
language policy (`docs/decisions/language-policy.md`): the v1 protocol is a base inherited from
`parcours-po`, whose teacher was instructed and corrected in French. It changes by user story, its
fresh tests come with the teacher. A teacher or a course of another language follows another spec,
not a translation of this one (decision `lexicon-not-language-pack`).

## 3. Categories

A rule of a course has a category, from a closed list, extended when needed:

| Category | The question it asks |
|---|---|
| `structure` | can the builds read the course? (files, fields, identifiers that resolve) |
| `pedagogy` | what is taught, in what order, what is asked of the learner? |
| `writing` | does the text follow its conventions? |
| `sources` | does every claim trace back to a source? |
| `diagrams` | do the drawings follow their contract? |

For a rule of the protocol, the category is its family (the nine families of `teacher/README.md`),
written in `teacher/rules.yaml` as a slug of its title, in their order: `session-start`,
`domain-presentation`, `loop`, `message-form`, `storyline`, `stances-and-sources`,
`practice-skip-asides`, `learner-memory`, `stop`. No other category exists: the tests of the
spec's own files verify no rule and carry none (`spec-directives/1/README.md` section 8).

## 4. Normative references

The standards a rule of this spec depends on, beyond those of the directives
(`spec-directives/1/README.md` section 7). #318 adds them as it extracts the rules (CommonMark and
GFM tables, SVG, WCAG 2.2, CLDR, ISO 639-1, ISO 8601).

## 5. Checks

**Purpose.** What verifies a course against this spec, each check with its category, level and
method and the severity that follows (`spec-directives/1/README.md` section 5); the tests of the
spec's own files are the directives' (`spec-directives/1/README.md` section 8).

| Reader | Needs | When |
|---|---|---|
| the creator (human or agent) | which check verifies each rule, and how to run it | after each change, before the PR |
| the reviewer | which rules a script already verified, so the review reads the rest | reviewing a change |
| the maintainer | the reported findings to triage into course issues | on demand |

Node scripts in `course/checks/`, one per id, with the `lib/` and the dependencies of the
directives MAJOR that `spec.yaml` declares (`spec-directives/1/package.json`, installed by
`npm ci`; decision `checks-use-ajv-and-yaml`); `course/checks/README.md` gives how to install and
run them, their options and fixtures. `course-specs/check-course <course-dir>` runs this folder's
`course/checks/check-course` on a course. `spec-directives/check-spec <this folder>` runs the tests
of the spec's own files (`teacher/README.md`, `README.md`, `course/README.md`, `decisions/`,
`course/rules.yaml`, `teacher/rules.yaml`, `course/schemas/`, the two lexicons, `spec.yaml`,
`CHANGELOG.md`), not a course: they are the directives' (`spec-directives/1/tests/`).

`check-course` takes its checks from `course/rules.yaml`: by default it runs, in one run, every
check of method test, blocking and reporting, and `--category <c>[,<c>...]` runs the checks of
those categories only, a closed list (the categories of a course, an unknown one a usage error).
A check of another method is not run by a script: `check-course --list` names it, with how it
runs. The tests of `check-spec` are not among its checks: `check-course` neither runs nor lists
them.

Both print one line per passing check (`<id>: ok`) and one line per failure
(`<id>: fail: <file>:<line> <message>`, the file relative to the course folder, or to the spec
folder for `check-spec`), whatever the severity; `check-course` ends with a summary line that
counts the failed checks of each severity. The exit code is 1 when a blocking check fails or a
check of either severity crashes, 0 otherwise (a reporting check that fails leaves it 0), 2 on a
usage error, when the rule files cannot be read or when the dependencies are not installed.

The category, level and method of each check below are those of the rules it verifies, in
`course/rules.yaml` (the `check` of each rule); `rule-files` verifies that a check has one
category and one level. A rule that no check implements yet is verified by
its method alone: the review for an inspection, the fresh tests for a demonstration. The sections
are those of `course/README.md`.

| Id | Category | Level | Method | Severity | Verifies | Sections |
|---|---|---|---|---|---|---|
| `course-yaml` | `structure` | requirement | test | blocks | `course.yaml` fields, identifiers, order, partition into domains, annexes, prerequisites, at most 9 children per node, paths, no unlisted folder in `concepts/`, spec declared (`course-specs/check-course` refuses an unknown spec or MAJOR), lexicon present | 2; `spec-directives/1/README.md` 6 |
| `concept-folder` | `structure` | requirement | test | blocks | the folder's files; the three files' sections and their order, the column count of the `sources.md` tables; frontmatter keys, `verified` parallel to `refs`; one section per sub-concept; « Objectif » equals `objective` | 3 |
| `case-contract` | `pedagogy` | requirement | test | blocks | case headings and their qualifier, titles unique in the concept, fields, a qualifier on « Question » only, coverage of leaves, citation in « Consignes » | 3.3, 7 |
| `conventions` | `writing` | requirement | test | blocks | the reader-text conventions of `concept.md`; plain Markdown in course files | 1, 3.5 |
| `svg-contract` | `diagrams` | requirement | test | blocks | every diagram against the drawing contract (a root `<defs>` accepted); declared and present diagrams match | 3.1, 6.1 |
| `sources` | `sources` | requirement | test | blocks | no introduction; in each claim row (its five columns are `concept-folder`'s): section anchors that exist in `concept.md`, a source cell of reference ids or the `markers.course` word, a verification, a nature; reference ids, links (one URL or empty), types, dates; every id cited exists, every reference cited; « Non vérifié » entries anchored | 3.1, 3.4 |
| `course-files` | `structure` | requirement | test | blocks | `plan.md` (« Public cible », « Accueil »: one posture paragraph, then its questions), `glossary.md` (four columns, one defining concept per row, a variant in one row), `CHANGELOG.md`, domain files: presence, no unlisted file in `domains/`, frontmatter, sections, leads | 4, 5 |
| `domain-first-sentence` | `writing` | requirement | test | blocks | the first sentence of each paragraph of « Le fil des concepts » ends within 300 characters of the lead | 4 |
| `glossary-order` | `pedagogy` | recommendation | test | reports | no glossary term used in a `concept.md`, body or frontmatter, before its defining concept, unless its sentence carries a concept reference to that concept; each comma variant matched, a qualified row skipped | 5 |
| `typography` | `writing` | recommendation | test | reports | no banned character of the lexicon in course text | 1 |
| `domain-first-sentence-standalone` | `writing` | recommendation | test | reports | the first sentence of each paragraph of « Le fil des concepts » does not open with a word of `checks.anaphora` | 4, 7 |
| `taught-check` | `pedagogy` | recommendation | analysis | reports | no case asks what the learner has not yet been taught | 3.3 |

**`taught-check`** is not a script: it is an agent workflow (`.claude/workflows/taught-check.js`),
run on demand through `/feyn-taught-check`, and its findings are triaged like the others.
