# linear-course: the spec

Version 1.0.0-alpha: binding from the tag `linear-course/v1.0.0` (section 8). This file is the
frame of the spec: what it covers, which files hold what, when a product conforms, the levels,
methods and categories a rule carries, how the severity of a check follows from them, the
versions, the normative references and the list of checks. It holds no rule on a course or on
the teacher: what a course is, is in `COURSE.md`; the protocol the teacher executes, in
`PROTOCOL.md`. The frame is decision `rules-with-level-and-method` (the rule model, levels,
methods, severity, categories, conformance clause, normative references) and decision
`spec-files-and-alpha-version` (the files and the version), whose reasons are not restated here.

## 1. Scope

`linear-course` describes a type of course: a linear introductory course made of ordered
**domains**, ordered **concepts** with prerequisites, **sub-concepts** taught one per teacher
message, a **storyline** the cases live in. A course that does not fit this shape needs another
spec. The spec fixes what a course contains, how the teacher teaches it, and how it is checked.
It holds for every course language: what depends on the language spoken to the learner is in
the **language pack** `lang/<code>.yaml` (phrases, typography, headings, markers, site labels),
whose keys `COURSE.md` section 7 names. French values are quoted for reference.

Out of scope here: the learner memory files (the protocol, and `templates/learner/`), how the
site and the classroom build (their own folders).

## 2. Files

The files of the spec are split by class of products (section 3), plus the frame (decision
`spec-files-and-alpha-version`):

| File | Holds |
|---|---|
| `SPEC.md` | the frame: this file |
| `COURSE.md` | what a course is: the course folder, `course.yaml`, the concept folder, domain files, course files, diagrams, the language pack keys |
| `PROTOCOL.md` | the protocol of the teacher: purpose, notation, rules named by slug, keys and parameters |
| `CHANGELOG.md` | the changes of the spec, an « Unreleased » section until the tag |
| `checks/` | the check scripts, their fixtures and `checks/README.md` (how to run them) |
| `lang/<code>.yaml` | the language packs |
| `templates/` | the course templates |
| `decisions/` | the decisions of this spec |

The rules of a course leave `COURSE.md` for `rules/course.yaml`, its tables of fields for
`schemas/*.schema.yaml`, and the rules of the protocol leave `PROTOCOL.md` for
`rules/protocol.yaml`, in slices of #317 and in #318. Until that extraction, `COURSE.md` and
`PROTOCOL.md` keep their verbal forms of obligation, read as `COURSE.md` says in its opening.

**Language exception.** The rules of `PROTOCOL.md` are written in French, a bounded exception
to the language policy (`docs/decisions/language-policy.md`): the v1 protocol is a base inherited
from `parcours-po`, whose teacher was instructed and corrected in French. It changes by user
story, its fresh tests come with the teacher, and the exception stays until a teacher or a course
of another language needs the translation, a spec MINOR that removes this paragraph.

## 3. Conformance

Two classes of products: the **course**, its diagrams included, and the **teacher**.

- A course conforms when it holds every requirement of its rules (today `COURSE.md`, then
  `rules/course.yaml`), whatever the method that verifies each one. The blocking checks are a
  necessary condition, not a sufficient one: the review and taught-check do the rest, and a
  course tag certifies the whole.
- A teacher conforms when it holds every requirement of the protocol (today `PROTOCOL.md`, then
  `rules/protocol.yaml`); the method of a rule of the protocol is demonstration, by the fresh
  tests. No teacher conforms yet, since no fresh test exists.
- Recommendations are outside conformance.

The language pack is not a product: it lives in this folder, written by the spec's authors, and
its consistency is the spec's own (`check-spec`, `language-pack-keys`). A rule on the pack sits
with the spec's own rules and counts toward no course's conformance.

## 4. Levels

A rule has a level, from ISO/IEC Directives Part 2, clause 7. The level is a field of the rule,
never a word parsed from its text; the verb of a rule of the spec matches it.

| Level | English | French |
|---|---|---|
| requirement | "shall", "shall not" | « doit », « ne doit pas » |
| recommendation | "should", "should not" | « il convient de », « il convient de ne pas » |
| permission | "may" (never in the negative) | « peut » |

"must" is not a level: ISO keeps it for external constraints. Possibility and capability ("can",
« peut ») are not a level either. A rule of the protocol is a prompt to the teacher, in « tu », at
the imperative: there the level is the field alone, the imperative counts as a requirement and
« peut » as a permission.

## 5. Methods

A rule states how one knows it holds, by one method of the closed list of ISO/IEC/IEEE 29148,
even before the check that implements it exists. A rule that no method could verify is
rewritten or removed.

| Method | What it does | What implements it in feyn |
|---|---|---|
| test | a deterministic run says yes or no | the scripts of `checks/` |
| analysis | reasoning over the whole course | taught-check (an agent workflow) |
| inspection | a reading, by a human or an agent | the review |
| demonstration | the system runs and is observed | the fresh tests of the teacher |

## 6. Categories

A rule of a course has a category, from a closed list, extended when needed:

| Category | The question it asks |
|---|---|
| `structure` | can the builds read the course? (files, fields, identifiers that resolve) |
| `pedagogy` | what is taught, in what order, what is asked of the learner? |
| `writing` | does the text follow its conventions? |
| `sources` | does every claim trace back to a source? |
| `diagrams` | do the drawings follow their contract? |

For a rule of the protocol, the category is its family (the nine families of `PROTOCOL.md`).

## 7. Severity

The severity of a check's failure is not declared: it follows from the rules the check verifies.
A check **blocks** when it verifies a requirement by test; in every other case it **reports**.
A check verifies rules of one category and one level, or it is split; its category and level
follow from its rules, and the check itself carries only its implementation (a script or an
agent).

## 8. Versions

**Purpose.** What a spec version and a course version promise, so that a change is classed
before it lands and a course runs against the checks of the MAJOR it declares.

| Reader | Needs | When |
|---|---|---|
| the maintainer | the bump a change makes, to the spec or to a course | classing a change; each release |
| the creator (human or agent) | the course changes that are a MAJOR (an identifier) | changing a released course |
| the reviewer | the class a course change claims in `CHANGELOG.md` | reviewing a course change |

The spec's versions and its MAJOR folders are decision `versioned-objects-and-spec-layout`
(`docs/decisions/versioned-objects-and-spec-layout.md`), summarised in `specs/README.md`. A
spec version is tagged `linear-course/vX.Y.Z`.

**The alpha.** A MAJOR in preparation carries `<MAJOR>.0.0-alpha` in its folder until its tag,
with no prerelease number and no prerelease tag: this MAJOR is `1.0.0-alpha` in `1/` until
`linear-course/v1.0.0`. During the alpha, the entries of `CHANGELOG.md` carry no bump class; its
« Unreleased » section becomes `1.0.0` at the tag.

**The bump of a spec change**, from the tag on, written in levels for the rules of a course:

| Bump | When |
|---|---|
| MAJOR | the structure changes (files, fields, mandatory sections); a requirement added or made stricter; an optional field made mandatory; a recommendation made a requirement |
| MINOR | an optional element; a protocol rule added, changed or renamed (the old slug is burnt); a requirement made looser or made a recommendation; a recommendation added or made stricter; a language-pack key added or renamed, every pack updated |
| PATCH | wording; a false positive lifted |

A MAJOR lives while a served course version declares it, a course tag included; then it is
archived. Tooling reads every live MAJOR. An old MAJOR receives bug fixes only, as a PATCH,
never a tightening; a bug fix is ported to every live MAJOR.

A course declares the MAJOR it follows: `spec: linear-course@1`. `specs/check-course` reads it
and runs this MAJOR's checks (section 10).

A course has its own version, tagged `<id>/vX.Y.Z` and recorded in its `CHANGELOG.md`: MAJOR
when an identifier changes (`COURSE.md` section 2) or the course moves to a new spec MAJOR,
MINOR when what is taught changes (a case, a sub-concept, a stance, a duration), PATCH for
wording. A course in 0.x can still change anything, identifiers included.

## 9. Normative references

The standards a rule of the frame depends on, with the edition the frame reads:

- ISO/IEC Directives Part 2, 9th edition (2021): the levels (section 4).
- ISO/IEC/IEEE 29148:2018: the methods (section 5).
- SemVer 2.0.0: the versions (section 8).
- YAML 1.2.2: the rule files and the schemas.
- JSON Schema 2020-12: the schemas, read by ajv's class `Ajv2020` (decision
  `checks-use-ajv-and-yaml`).

#318 adds the others as it extracts the rules (CommonMark and GFM tables, SVG, WCAG 2.2, CLDR,
ISO 639-1, ISO 8601).

## 10. Checks

**Purpose.** What verifies a course, and the spec's own files, against this spec: each check
with its category, level and method, and the severity that follows (section 7).

| Reader | Needs | When |
|---|---|---|
| the creator (human or agent) | which check verifies each rule, and how to run it | after each change, before the PR |
| the reviewer | which rules a script already verified, so the review reads the rest | reviewing a change |
| the maintainer | the reported findings to triage into course issues | on demand |

Node scripts in `checks/`, one per id, with the dependencies of `checks/package.json` installed
by `npm ci` (decision `checks-use-ajv-and-yaml`); `checks/README.md` gives how to install and run
them, their options and fixtures. `specs/check-course <course-dir>` runs this folder's
`checks/check-course` on a course; until the checks read the rules (#317), it runs the checks that
block by default and the checks that report with `--quality`. `checks/check-spec` checks the spec's own files
(`PROTOCOL.md`, `SPEC.md`, `COURSE.md`, `decisions/`), not a course.

Both print one line per passing check (`<id>: ok`) and one line per failure
(`<id>: fail: <file>:<line> <message>`, the file relative to the course folder, or to the spec
folder for `check-spec`). The exit code is 0 when every check passes, 1 when one fails, 2 on a
usage error or when the dependencies are not installed.

The level of each check below is the one its rules carry today; the rules themselves move to
`rules/course.yaml` in a slice of #317. The sections are those of `COURSE.md`.

| Id | Category | Level | Method | Severity | Verifies | Sections |
|---|---|---|---|---|---|---|
| `course-yaml` | `structure` | requirement | test | blocks | `course.yaml` fields, identifiers, order, partition into domains, annexes, prerequisites, at most 9 children per node, paths, no unlisted folder in `concepts/`, spec declared (`specs/check-course` refuses an unknown spec or MAJOR), language pack present | 2; `SPEC.md` 8 |
| `concept-folder` | `structure` (its cases part is `pedagogy`, split in a slice of #317) | requirement | test | blocks | the folder's files; the three files' sections and their order, the column count of the `sources.md` tables; frontmatter keys, `verified` parallel to `refs`; one section per sub-concept; « Objectif » equals `objective`; case headings and their qualifier, fields, a qualifier on « Question » only, coverage of leaves, citation in « Consignes » | 3, 7 |
| `conventions` | `writing` | requirement | test | blocks | the reader-text conventions of `concept.md`; plain Markdown in course files | 1, 3.5 |
| `svg-contract` | `diagrams` | requirement | test | blocks | every diagram against the drawing contract (a root `<defs>` accepted); declared and present diagrams match | 3.1, 6.1 |
| `sources` | `sources` | requirement | test | blocks | no introduction; in each claim row (its five columns are `concept-folder`'s): section anchors that exist in `concept.md`, a source cell of reference ids or the `markers.course` word, a verification, a nature; reference ids, links (one URL or empty), types, dates; every id cited exists, every reference cited; « Non vérifié » entries anchored | 3.1, 3.4 |
| `course-files` | `structure` | requirement | test | blocks | `plan.md` (« Public cible », « Accueil »: one posture paragraph, then its questions), `glossary.md` (four columns, one defining concept per row, a variant in one row), `CHANGELOG.md`, domain files: presence, no unlisted file in `domains/`, frontmatter, sections, leads | 4, 5 |
| `domain-first-sentence` | `writing` | requirement | test | blocks | the first sentence of each paragraph of « Le fil des concepts » ends within 300 characters of the lead | 4 |
| `language-pack-keys` | none: a rule of the spec itself (section 3) | requirement | test | blocks | every key of `COURSE.md` section 7 and of `PROTOCOL.md` exists in the course's language pack | 7 |
| `glossary-order` | `pedagogy` | recommendation | test | reports | no glossary term used in a `concept.md`, body or frontmatter, before its defining concept, unless its sentence carries a concept reference to that concept; each comma variant matched, a qualified row skipped | 5 |
| `typography` | `writing` | recommendation | test | reports | no banned character of the language pack in course text | 1 |
| `domain-first-sentence-standalone` | `writing` | recommendation | test | reports | the first sentence of each paragraph of « Le fil des concepts » does not open with a word of `checks.anaphora` | 4, 7 |
| `rule-slugs` (`check-spec`) | none: a rule of the spec itself | requirement | test | blocks | `PROTOCOL.md` names each of its rules and groups by a slug defined once; `PROTOCOL.md`, `SPEC.md`, `COURSE.md` and `decisions/` cite them by a defined slug, never by a number or a range | `PROTOCOL.md` |
| `taught-check` | `pedagogy` | recommendation | analysis | reports | no case asks what the learner has not yet been taught | 3.3 |

**`taught-check`** is not a script: it is an agent workflow (`.claude/workflows/taught-check.js`),
run on demand through `/feyn-taught-check`, and its findings are triaged like the others.
