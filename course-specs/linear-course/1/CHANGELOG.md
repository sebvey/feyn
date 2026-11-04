# Changelog of the spec

`linear-course`, MAJOR 1. No version of it is tagged yet.

The spec carries a version `MAJOR.MINOR.PATCH` (see `spec-directives/1/README.md`, section 6,
and decision `alpha-version-until-tag` of the directives): `1.0.0-alpha` until the tag
`linear-course/v1.0.0`, when « Unreleased » becomes `1.0.0`. From the tag on, the bump table of
`spec-directives/1/README.md` section 6 classes each change, and the entries are ranked by bump,
as Changesets does.

One line per change: `- CLASS, file or area: what changes`. During the alpha, an entry carries
no class: `- file or area: what changes`.

## Unreleased

- `decisions/`: the model of the spec as three decisions (#322): `rules-with-level-and-method`
  (the rule as the unit, with a level from ISO/IEC Directives Part 2, a method from
  ISO/IEC/IEEE 29148, a category; the severity of a check derived; the conformance clause; the
  normative references), `spec-files-and-alpha-version` (the files by class of products, the
  version `1.0.0-alpha`, this changelog), `checks-use-ajv-and-yaml` (the checks take ajv and the
  `yaml` package); `versioned-objects-and-spec-layout`, `rules-named-by-slug` and
  `rule-groups-replace-ranges` amended.
- `SPEC.md`, `COURSE.md`: `SPEC.md` becomes the spec's description (scope, files, conformance,
  levels, methods, categories, severity, versions, normative references, the checks with their
  category, level, method and severity); sections 2 to 7 and 9 move to `COURSE.md` as written,
  renumbered 1 to 7 (#323). `check-spec`'s `rule-slugs` reads `COURSE.md` too.
- `SPEC.md`, `PROTOCOL.md`: version `1.0.0-alpha`, "draft" gone (#323).
- `checks/`: the checks read YAML with the package `yaml` (YAML 1.2), installed by `npm ci` from
  `checks/package.json`; `lib/yaml.js` removed; the same failures at the same `file:line` (#327).
- `rules/`, `schemas/`, `checks/`: the rules the checks of a course verify as data in
  `rules/course.yaml`, the teacher's in `rules/protocol.yaml` (one rule), at least one rule of
  each method across them; the tables of `COURSE.md` 2 and 3.1 as
  `schemas/course.schema.yaml` and `schemas/concept-frontmatter.schema.yaml`; `concept-folder`
  split, its cases part now `case-contract` (`pedagogy`), the same failures at the same
  `file:line`; `check-spec`'s new `rule-files` validates the rule files and the schemas, with ajv
  (`Ajv2020`) (#329).
- `checks/`: `check-course` takes its checks, their category and their severity from
  `rules/course.yaml` (`lib/rules.js`) and runs, by default, every check of
  method test in one run: a failure of a blocking check sets exit code 1, a failure of a
  reporting check is printed and leaves 0, and a summary line counts both; `--category` selects
  by category, `--list` prints each check with its category and severity; `--quality` is gone, a
  usage error naming its replacement; `test-fixtures` runs each fixture once and checks the exit
  code against the severity (#331).
- `COURSE.md`, `checks/`, `lang/`: the words of the rule model replace the two check families in
  three lines of `COURSE.md` (otherwise as moved), the comments of the checks and of the
  language pack and its fixtures: a check blocks or reports; `checks/README.md` names the removed
  flag `--quality`; no behaviour changes (#333).
- `checks/`, `decisions/`: the checks of `check-spec` (`rule-slugs`, `rule-files`,
  `language-pack-keys`) are tests of the spec's own files, not rules: no category, no level,
  each failure blocks `check-spec`; `language-pack-keys` leaves `check-course` and tests every
  pack of `lang/` in `check-spec`; decision `rules-with-level-and-method` amended, a rule binds a
  product (#339).
- folder, `decisions/`: the spec moves from `specs/` to `course-specs/` (#340); paths updated
  in `SPEC.md`, the README, the checks and the decisions `rules-named-by-slug`,
  `checks-use-ajv-and-yaml`, `spec-files-and-alpha-version`.
- `decisions/`: decision `one-diagram-style` amended, the workflow `migrate-concept` it names
  removed and read in the history (#365).
- `decisions/`, `rules/`: the mechanism-only "Amended" lines of the live decisions folded into
  their bodies, the lines of #329 reversed by #339 removed; the lines that stay record a change
  of scope (decision `decision-format`, #370).
- folder, `decisions/`: the MAJOR is cut by product, `course/` (`README.md`, formerly
  `COURSE.md`; `rules.yaml`; `schemas/`; `templates/`; `checks/`) and `teacher/` (`README.md`,
  formerly `PROTOCOL.md`; `rules.yaml`; `templates/learner/`); no rule changes; paths updated in
  the spec, its checks and the decisions `checks-use-ajv-and-yaml`, `rule-groups-replace-ranges`,
  `rules-named-by-slug`, `rules-with-level-and-method`, `spec-files-and-alpha-version`,
  `stances-in-frontmatter-only` (#455).
- `spec.yaml`, `course/checks/`, `decisions/`: `spec.yaml` declares the MAJOR (`name`, `major`,
  `directives: 1`, `version: 1.0.0-alpha`); the tests of the spec's own files (`check-spec`,
  `rule-slugs`, `rule-files`, `language-pack-keys`, their fixtures), `lib/` and the package move
  to the spec directives, `spec-directives/1/`, run by `spec-directives/check-spec`; the checks
  load `lib/`, `yaml` and `ajv` from the directives MAJOR that `spec.yaml` declares;
  `test-fixtures` split in two; no rule changes; decisions `checks-use-ajv-and-yaml` and
  `rules-named-by-slug` updated (#459).
- `spec.yaml`: the test `spec-yaml` of the directives verifies it and holds `version` to this
  changelog's first section, « Unreleased » until the tag (#461).
- `SPEC.md`, `README.md`, `decisions/`: `SPEC.md` is split and removed: what says how a spec is
  written and read (what a rule file holds, the conformance clause, the levels, the methods, the
  severity, the versions, the normative references of the rule model) moves to the spec
  directives, `spec-directives/1/README.md`; the scope, the files, the categories, the normative
  references of the rules and the list of checks move to this MAJOR's `README.md`, which
  `rule-slugs` reads in its place; the tests of the spec's own files are described in the
  directives, the checks' README keeping a pointer; no rule changes; the citations of `SPEC.md` updated in the
  spec, its checks and the decisions
  `domains-partition-the-course`, `markdown-conventions-not-mdx`, `one-diagram-style`,
  `reader-facing-and-teacher-only-files`, `rules-named-by-slug`, `rules-with-level-and-method`,
  `sources-trace-the-concept`, `spec-files-and-alpha-version`, `stances-in-frontmatter-only`,
  `svg-only-diagrams` (#463).
- `decisions/`: `rules-with-level-and-method` and `checks-use-ajv-and-yaml` move to the spec
  directives, `spec-directives/1/decisions/`, since they bind every spec that follows them;
  `spec-files-and-alpha-version` is split: its files part stays here as `spec-files-by-product`,
  its alpha part becomes the directives' decision `alpha-version-until-tag`; the citations follow;
  no rule changes (#465).
- `README.md`, `course/README.md`, `teacher/README.md`: each opens with the table Reader, Comes
  for, Opens over the four readers of a spec (the creator, the builder, the verifier, the spec
  writer), defined in `spec-directives/README.md`; no rule changes (#467).
- `spec.yaml`, `lang/`, `course/`, `teacher/`: the language is the spec's, `language: fr` in
  `spec.yaml`, no longer a field of `course.yaml` (`course-yaml` accepts a `language` key and
  ignores it, for `courses/parcours-po` until its migration; removed by #521, below); the language pack `lang/fr.yaml`
  becomes two lexicons, `course/lexicon.yaml` (the words of the course files: headings, case
  fields, qualifiers, markers, natures, concept references, source types, typography, the word
  lists of the checks) and `teacher/lexicon.yaml` (phrases, learner words, memory, statuses); its
  `site` group leaves the spec; `check-course --lexicon <file>` replaces `--lang-dir` and
  `LINEAR_COURSE_LANG_DIR`; `course/README.md` section 7 becomes « The lexicon of the course
  files »; the rule `language-pack-exists` is removed (the lexicon is a file of the spec, which
  no course can break: a missing or unreadable lexicon fails `course-yaml` as a tooling error,
  and `lexicon-keys` of `check-spec` tests the file), `case-qualifier-from-pack` and
  `reference-type-from-pack` become `case-qualifier-from-lexicon` and
  `reference-type-from-lexicon`, their texts naming the lexicon; decision
  `lexicon-not-language-pack` written, `language-policy` amended; no protocol rule text changes
  (#493).
- `teacher/`: the composition of the teacher as data, `teacher/composition.yaml`: five parts
  (`permanent`, `on-demand`, `course-reads`, `learner-memory`, `permissions`), each with when it
  loads and what it draws from the spec, the course, learner memory and the classroom, with no
  term of a target; `teacher/README.md` gains the section "Composition" that describes it, and
  its reader table names it; `composition`, a test of `check-spec`, verifies its form; no rule
  changes (#497).
- `teacher/build/`: the half of the classroom build that depends on this MAJOR, `render-parts`,
  which renders the five parts of `teacher/composition.yaml` as text for a course from the
  protocol, the composition, the two lexicons, the learner templates and the course, printed as
  one JSON document whose shape `parts.schema.yaml` fixes, with its `test-render` and its
  `README.md`; `classroom-builder/build-classroom` runs it and realises the parts. The filling
  drops the period after a « » phrase that ends with one and keeps one pair of parentheses around
  a value already in parentheses inside a link (#501).
- `teacher/README.md`: wording, `first-message-presents-course` no longer writes « ses
  {course.domain_count} domaines », which read « ses 1 domaines » for a course of one domain: it
  gives the number and has the teacher write `phrases.domains_one` (« son domaine ») or
  `phrases.domains_many` (« ses {n} domaines ») by it, two keys `teacher/lexicon.yaml` gains; a
  PATCH (#501).
- `teacher/tests/`: the test scenarios of the teacher, one YAML file each, whose form
  `scenario.schema.yaml` fixes (`id`, `title`, `learner`, `turns` with their `expect` and an
  optional `if`, `rules`), and five scenarios for `courses/po-essai`: `onboarding`, `concept-0`,
  `stop`, `resume`, `concept-1`; `README.md` lists the rules of the families 1, 3, 4, 5, 8 and 9
  no scenario names, and why; `classroom-builder/fresh-test` runs them (#507).
- `teacher/rules.yaml`, `teacher/README.md`: the rule `teacher-loads-composition` (group
  `composition-loading` of family 1, requirement, demonstration): the teacher loads each part of
  its composition when and from where `composition.yaml` says, so that a teacher that loads the
  onboarding at every message does not conform; "Composition" says so (#507).
- `teacher/composition.yaml`: the `what` and `when` texts in French, since the teacher skills
  print them (decision `language-policy`); `teacher/build/render-parts` reads the permissions in
  French (« peut s'écrire », « en lecture seule ») (#507).
- `teacher/build/`: a moment's draw from a course file with no slot that names a heading
  (`headings.onboarding`) carries the section under it, `text` (`parts.schema.yaml`), so that
  the onboarding questions of `plan.md` reach the onboarding skill and its first message needs no
  read (#507).
- `teacher/README.md`, `teacher/rules.yaml`: the rule `earlier-concept-retrieved-at-resume`
  (group `resume`, requirement, demonstration): at the resume of a learner who validated a
  concept in an earlier session and whose journal names no practice case of it since, a practice
  case of that concept's bank is posed and corrected before the next step (decision
  `retrieval-at-resume`); `periodic-mini-recap` unchanged (#511).
- `teacher/README.md`, `teacher/rules.yaml`, `teacher/composition.yaml`: the rule
  `declared-diagram-shown` (new group `diagram-showing` of family 4, with `requested-diagram-shown` and
  `diagram-not-displayable`; requirement, demonstration) replaces `diagram-only-on-request`: at
  the message of the sub-concept a declared diagram's `subconcept` names, the teacher shows it and
  says its caption, unasked; the moment `diagram` also comes at that sub-concept (decision
  `diagram-shown-at-its-subconcept`) (#511).
- `teacher/tests/`: the scenarios `retrieval-at-resume` and `declared-diagram`, the two tests of
  each decision, each naming only its decision's rule; `concept-0` no longer names
  `diagram-only-on-request` (#511).
- `teacher/README.md`, `teacher/rules.yaml`, `teacher/composition.yaml`: the protocol names no
  Claude Code mechanism: `teacher-loads-composition` no longer says where the rules of a moment
  are loaded from, `classroom-exchanges-exempt` says « ses outils » for « les skills », the
  comments of `composition.yaml` say the teacher reads the French texts; `README.md` and the
  header of `teacher/rules.yaml` no longer count the rules of `teacher/rules.yaml`, and
  `course/checks/README.md` points to `spec-directives/1/README.md` section 8 for the tests of
  `check-spec` (#515).
- `course/checks/`, `course/schemas/course.schema.yaml`: a `language` key in `course.yaml` fails
  `course-yaml` as an unknown field, the tolerance kept for the founding course gone with it
  (decision `parcours-po-archived`); the fixture `broken/course-yaml-language`; the checks'
  README names `courses/po-essai` as the real course a change of the spec is run on (#521).
- `course/rules.yaml`, `course/README.md`: every rule of `course/README.md` sections 1, 2, 4 and
  5 is data in `course/rules.yaml`, those verified by inspection included (21 new rules, the
  learner's role in the storyline among them), in four groups, one per section, each with its
  `purpose`, in French; those four sections become a French description that cites rule ids,
  with no Purpose paragraph; `course/templates/storyline.md` has a placeholder for the
  learner's role; no rule changes what it asks (#524).
