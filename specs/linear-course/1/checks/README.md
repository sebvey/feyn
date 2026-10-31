# Checks of `linear-course`

Scripts that verify a course against `COURSE.md` and `rules/course.yaml` (listed in `SPEC.md`
section 10), run by `check-course`, and the tests of the spec's own files (`PROTOCOL.md`,
`SPEC.md`, `COURSE.md`, `decisions/`, `rules/`, `schemas/`, `lang/`), run by `check-spec`.
Node 20 or later, CommonJS, run under `mise exec` like every tool here, with the dependencies of
`package.json` (decision `checks-use-ajv-and-yaml`): the course's YAML is read by the package
`yaml` in YAML 1.2 mode, through `lib/yaml-lines.js`, which keeps the line of each key and item
so a failure points at `file:line`; ajv compiles the schemas of `schemas/` through its class
`Ajv2020` (JSON Schema 2020-12); Markdown and SVG are read by the small readers in `lib/`
(`md.js`, `xml.js`), which cover the subset the spec uses. Each rule of `rules/course.yaml`
names in `check` the script that verifies it, and `check-course` takes its checks from there
(`lib/rules.js`); `course-yaml` and `concept-folder` verify the two schema rules with their own
code, not through ajv.

## Install

```
mise exec -- npm ci --prefix specs/linear-course/1/checks
```

From the repository root, once per clone or worktree, and again when `package-lock.json` changes:
`npm ci` installs the locked versions in `node_modules/` here, which git ignores. The command has
no `cd`, so an agent in a worktree can run it. Without it, `check-course`, `check-spec`,
`test-fixtures` and `specs/check-course` stop with one line giving that command (exit code 2).

## Run

```
mise exec -- specs/check-course courses/<id>
mise exec -- specs/check-course courses/<id> --category pedagogy
mise exec -- specs/check-course courses/<id> --only svg-contract
mise exec -- specs/check-course courses/<id> --only concept-folder,sources --concept 9
mise exec -- specs/linear-course/1/checks/check-course --list
```

The checks come from the rule file of a course (`SPEC.md` section 7; decision
`rules-with-level-and-method`): `check-course` runs, in one run, every check named by the
`check` of a rule of `rules/course.yaml` whose method is test. A check's category and level come
from its rules, which `rule-files` (`check-spec`) holds to one category and one level per check,
and its severity follows: it **blocks** when its rules are requirements verified by test,
otherwise it **reports**. A failure of a blocking check sets exit code 1; a failure of a
reporting check is printed the same way, its findings triaged into course issues, and leaves exit
code 0. The blocking checks run first, then the reporting ones, each in the order of
`rules/course.yaml`; no list of checks is written in `check-course`.

A check runs on a course when its method is test and its script is in this folder. The tests of
`check-spec` (`rule-slugs`, `rule-files`, `language-pack-keys`) verify no rule: `check-course`
neither runs nor lists them. A check of another method is not run here: `taught-check`
(analysis) is an agent workflow, run through `/feyn-taught-check`, and a rule verified by
inspection has no check, the review reads it. `--list` names every check, the ones not run here
with how they run.

`specs/check-course` reads `spec: linear-course@<MAJOR>` in the course's `course.yaml` and runs
`specs/linear-course/<MAJOR>/checks/check-course` with the same arguments; it refuses an unknown
spec or MAJOR, naming it, with exit code 2. The `spec:` line names the MAJOR, whose `yaml`
package (in its `checks/node_modules/`) then reads `course.yaml`: the dispatcher needs that
MAJOR's `npm ci` too. This folder's `check-course` runs this MAJOR's checks
directly, `--list` with no course included.

One line per passing check (`<id>: ok`), one line per failure
(`<id>: fail: <file>:<line> <message>`, the file relative to the course folder), whatever the
severity; then one summary line, `summary: <n> blocking checks, <n> failed (<ids>); <n>
reporting checks, <n> failed (<ids>); exit <code>`. The exit code is 0 when no blocking check
fails, 1 when one fails or a check crashes, 2 on a usage error, when the rule files cannot be
read or when the dependencies are not installed.

| Option | Does |
|---|---|
| `--category <c>[,<c>]` | runs the checks of those categories only (repeatable): a closed list, the categories of a course in `rules/course.yaml` (`structure`, `pedagogy`, `writing`, `diagrams`, `sources`); an unknown one is a usage error |
| `--only <id>[,<id>]` | runs those checks only (repeatable); an unknown id (a test of `check-spec` among them), the id of a check not run here, or an id outside `--category` is a usage error |
| `--concept <number>` | the per-concept checks (`concept-folder`, `case-contract`, `conventions`, `svg-contract`, `sources`, `glossary-order`) look at that concept only, and `course-yaml` demands only that concept's folder and does not look for unlisted folders in `concepts/`: for a migration in progress, when the other concept folders do not exist yet |
| `--lang-dir <dir>` | reads the language pack `<dir>/<language>.yaml` instead of this MAJOR's `lang/` (also `LINEAR_COURSE_LANG_DIR`) |
| `--list` | prints every check of `rules/course.yaml`, `--category` applied, in the order of the run: its id, its category, its severity (`blocks` or `reports`), and for a check not run here, how it runs; no course needed |

The flag `--quality`, removed, is a usage error whose one line names its replacement: the
default run, which holds the reporting checks, or `--category`.

## The checks

One script per id, `checks/<id>.js`, exporting `run(ctx)`. The category and the severity are
those `check-course --list` prints, from the rules, in the order of the run.

| Id | Category, severity | Script | Verifies (COURSE.md) |
|---|---|---|---|
| `course-yaml` | `structure`, blocks | `course-yaml.js` | fields, identifiers, order, domains, annexes, prerequisites, at most 9 children per node, paths, no unlisted folder in `concepts/` (not looked for under `--concept`), spec declared, pack present (2; `SPEC.md` 8) |
| `concept-folder` | `structure`, blocks | `concept-folder.js` | files, sections and their order, the column count of the `sources.md` tables, frontmatter (`verified` parallel to `refs`, absent without `refs`), sub-concept sections, « Objectif » (3) |
| `case-contract` | `pedagogy`, blocks | `case-contract.js` | the cases of `teaching.md`: in the heading, a sub-concept of the concept and at most one qualifier, a value of the pack's `qualifiers`; titles unique in the concept; fields (known labels, a qualifier on « Question » only, the mandatory ones once and in order); leaf coverage; citation in « Consignes » (3.3, 7). Split from `concept-folder` (#329): the `pedagogy` part of the concept folder |
| `conventions` | `writing`, blocks | `conventions.js` | reader-text conventions of `concept.md`; plain Markdown in every course file (1, 3.5) |
| `domain-first-sentence` | `writing`, blocks | `domain-first-sentence.js` | the first sentence of each paragraph of « Le fil des concepts » ends with `.`, `?` or `!` within 300 characters of the lead (4) |
| `svg-contract` | `diagrams`, blocks | `svg-contract.js` | every diagram against the drawing contract, a root `<defs>` accepted; declared and present diagrams (3.1, 6.1) |
| `sources` | `sources`, blocks | `sources.js` | no introduction; in each « Affirmations » row of five cells (the column count is `concept-folder`'s): section anchors that exist in `concept.md`, a source cell of reference ids or the `markers.course` word, a verification (empty for a « cours » claim only), a nature (`markers` consensus, school, course, or `natures.fact`); reference ids, links (one URL or empty), types, dates; every id cited exists, every reference is cited by a claim or a frontmatter item; « Non vérifié » entries open with their section (3.1, 3.4) |
| `course-files` | `structure`, blocks | `course-files.js` | `plan.md` (« Public cible », « Accueil »: one posture paragraph, then its questions), `glossary.md` (four columns, one concept number in the fourth, no variant in two rows), `CHANGELOG.md`, domain files, no unlisted file in `domains/` (4, 5) |
| `domain-first-sentence-standalone` | `writing`, reports | `domain-first-sentence-standalone.js` | the first sentence of each paragraph of « Le fil des concepts » does not open with a word of the pack's `checks.anaphora` list; a pack without that list is a failure of this check (4, 7) |
| `typography` | `writing`, reports | `typography.js` | no banned character of the language pack in course text (1) |
| `glossary-order` | `pedagogy`, reports | `glossary-order.js` | no `concept.md`, body or frontmatter (stance and neighbour texts, diagram titles and captions), uses a glossary term before its defining concept (the fourth column), unless the sentence carries a concept reference to that concept (`lib/refs.js`, the grammar `conventions` checks); every use is reported; each comma variant of the term cell is matched whole word, case ignored; a row whose term cell has a parenthesis is skipped (5) |

A claim's source cell holds reference ids (`[S1], [S2]`) or the `markers.course` word
(« cours »), nothing else: free text (« aucune », « fil rouge ») and a path to another concept
fail. A section anchor is a sub-concept id or a fixed section by its pack value
(`headings.essentials`, `pitfalls`, `quick_test`, `deepening`) whose heading exists in
`concept.md`; a « Non vérifié » entry is a list item `<anchors> : <text>`, and may also name
`headings.stances`. The form of the verified cell (a quotation and its place) is reviewed.

## Tests of the spec itself

```
mise exec -- specs/linear-course/1/checks/check-spec
mise exec -- specs/linear-course/1/checks/check-spec <spec-dir> --only rule-slugs
```

`check-spec` runs the tests of the spec's own files, not a course: `PROTOCOL.md`, `SPEC.md`,
`COURSE.md`, `decisions/`, `rules/`, `schemas/` and `lang/` of `<spec-dir>` (default: this
MAJOR's folder, `specs/linear-course/1`). Same output and `--only` as `check-course`, with no
summary line and a `--list` of ids alone; the file in a failure line is relative to
`<spec-dir>`. Its tests are not rules (decision `rules-with-level-and-method`, amended by #339):
they carry no category and no level, and each failure blocks `check-spec` (exit code 1). Their
list is written in `check-spec`.

| Id | Script | Verifies |
|---|---|---|
| `rule-slugs` | `rule-slugs.js` | every rule and every group of rules of `PROTOCOL.md` is named by a slug, defined once in one namespace; every rule or group cited in `PROTOCOL.md`, `SPEC.md`, `COURSE.md` and `decisions/` is cited by a slug that is defined, a group as a group and a rule as a rule; none is named or cited by a number, no range « `a` à `b` » (decisions `rules-named-by-slug`, `rule-groups-replace-ranges`) |
| `rule-files` | `rule-files.js` | `rules/course.yaml` and `rules/protocol.yaml` exist; a group has a non-empty `rules` list and may declare `id`, `title`, `category`, `method`; a rule has `id` (a slug), `level`, `category` and `method` (on the rule or its group), `text`, optional `check` and `why`, and in the protocol `origin`, no other key; a group of `rules/protocol.yaml` has an `id` that is a group of `PROTOCOL.md`; the closed lists (levels, methods, the categories of a course, the families of the protocol; a rule of the protocol is a demonstration); ids of rules and groups unique across the two files; every check named exists (`checks/<id>.js` or `.claude/workflows/<id>.js`); one category and one level per check; each `schemas/*.schema.yaml` compiles under `Ajv2020` and is named by the text of one rule of `rules/course.yaml`, and a schema named there exists (`SPEC.md` 2, 4 to 6) |
| `language-pack-keys` | `language-pack-keys.js` | every pack of `lang/` holds every key of `COURSE.md` section 7 and every key `PROTOCOL.md` uses (`COURSE.md` 7) |

`language-pack-keys` tests each `lang/*.yaml` of `<spec-dir>` against the keys of `COURSE.md`
section 7 and every key `PROTOCOL.md` uses: a row of the pack tables of its "Keys and parameters"
section, or a `{group.key}` in a rule (the test reads the `PROTOCOL.md` of `<spec-dir>`, so a new
key there is required of the packs at once). A key is a non-empty string; the lists
(`typography.banned`, the `learner_says` lists) are non-empty lists of strings.
`checks.anaphora` is optional: `domain-first-sentence-standalone` reads it. The groups beside
those (`site`) are read by the site, not tested here. A `<spec-dir>` with no pack in `lang/` has
none to test. A course's checks read the pack of its language as before (`--lang-dir` included)
and say "see COURSE.md section 7" when it is unusable; a pack given with `--lang-dir` lies
outside the spec's `lang/`, so no test verifies its keys.

A rule's slug is defined by a line of a rule family (`## <n>. …`) that opens on `**<slug>** `, or
by a table row of a family whose first cell is `**<slug>**` (the save-point table); a group's slug
by a heading of a family, « ### <title> (`<slug>`) » (one to five words). The `**Purpose.**`
paragraph that opens a family or a group defines nothing. Rules and groups share
one namespace: a slug is defined once. A rule is cited by a
code span: in a rule family, every code span shaped like a slug (two to five lowercase words
joined by hyphens); in the tables of `PROTOCOL.md`, every code span of a "Used in" or "Rule"
column; elsewhere, the code spans that follow « rule », « rules », « règle » or « règles »,
joined by commas, « and », « to », « et », « à » (« rules `a`, `b` and `c` »). A check id or a
decision slug in code is not a rule, as long as no such word leads it. Everywhere, the code spans
that follow « group », « groups », « groupe » or « groupes » must be groups, and those that follow
« rule(s) » or « règle(s) » must be rules. A range, « `a` à `b` » or « `a` to `b` », fails in
`PROTOCOL.md`, `SPEC.md` and `COURSE.md`; `decisions/` are not read for ranges, since they quote the ones they
replaced.

Known limits:
- A code span after « group » that names something other than a rule group fails as a missing group.
- A `####` heading inside a family is neither a group nor read by the check: the rules under it stay in the group above.

## Tests

```
mise exec -- specs/linear-course/1/checks/test-fixtures
```

Every course fixture runs once, with the default; the test reads `rules/course.yaml` itself and
holds each run's exit code to the severity of the check that fails: 1 for a blocking check, 0
for a reporting one. `--list` must name every check of `rules/course.yaml` with the category and
the severity of its rules, and none of the tests of `check-spec`; a run must run every check
`--list` does not mark "not run here". `--category` runs the checks of its categories only
(`writing`, `pedagogy`, `structure,diagrams`; `broken/svg-contract` passes with `--category
writing`); an unknown category (the name of the spec among them), the flag `--quality`, removed,
an id of a test of `check-spec` and an id outside `--category` are usage errors (exit code 2).

- `fixtures/valid/`: a minimal valid course (four concepts, one annex, one diagram with a root
  `<defs>`; a glossary with a comma variant, a qualified row used before its concept, an empty
  English cell, and earlier uses silenced by a concept reference, one of them to an annex
  sub-concept; in `sources.md`, a claim on two anchors, a « cours » claim with no verification,
  a `fait` claim on « Approfondissement », « Non vérifié » entries anchored to a sub-concept and
  to the stances, stance items with `verified`); every check passes, and its
  `course.yaml` and the frontmatter of each `concept.md` are valid against `schemas/` under
  `Ajv2020`.
- `fixtures/broken/<name>/`: a copy of it with one defect; its `EXPECT` file names the check
  that must fail and the message it must give, with the exit code its severity gives. No other
  check may fail (the test says so).
  `broken/course-yaml-unlisted-folder` also runs with `--concept 0`, where `course-yaml` passes.
- No real course is a fixture: `specs/check-course courses/parcours-po` checks the real course,
  and a change to the spec reports its new failures there.
- `fixtures/lang/fr.yaml`: the pack the fixtures use (the groups the checks read: `COURSE.md`
  section 7 and the keys of `PROTOCOL.md`, French values of the real pack `lang/fr.yaml`, without
  `site`; change both together). `fixtures/lang-no-anaphora/`: the pack without the optional
  `checks.anaphora`; `valid/` with it fails `domain-first-sentence-standalone` only, a reporting
  check, so with exit code 0 (a reporting failure alone); `broken/course-files` with it fails a
  blocking and a reporting check, exit code 1.
- `fixtures/spec/valid/`: a minimal spec (`PROTOCOL.md` with a string key and a list key,
  `SPEC.md`, `COURSE.md`, one decision, the two rule files with a rule of each method, one
  schema, `lang/fr.yaml`: the fixtures' pack plus the key of its `PROTOCOL.md`); every
  `check-spec` test passes. `fixtures/spec/broken/<name>/`: a copy of it with one defect and its
  `EXPECT` file; no other `check-spec` test may fail. The copies for `rule-slugs` and
  `rule-files` have no `lang/`, so `language-pack-keys` has no pack to test there. For
  `language-pack-keys`: a key of `COURSE.md` section 7 missing, a group missing (`natures`), a
  key of `PROTOCOL.md` missing, a list key of `PROTOCOL.md` given as a string. For `rule-slugs`:
  a missing slug, a duplicate slug, a rule cited by number, a missing group, a group whose slug
  is a rule's, a range, a range in `COURSE.md`, a group cited as a rule. For `rule-files`: a
  missing level; a level, a method, a category and a family off their lists; a protocol group
  that `PROTOCOL.md` does not define; an id in both rule files; a check that does not exist; a
  check over two categories; a check over two levels; a schema that does not compile; a schema
  no rule names. The test also runs
  `check-spec` on `specs/linear-course/1`, which must pass.
- `fixtures/dispatcher/<name>/`: a `course.yaml` that `specs/check-course` refuses, `other-spec`
  (an unknown spec, `other@1`) and `unknown-major` (`linear-course@9`); the test also runs
  `specs/check-course` on `valid/`, with the default and with `--category writing`, which must
  pass.

The fixtures are plain files: change `valid/` and the broken copies together, then run the
test. A new check of a course adds a script, the rules it verifies in `rules/course.yaml` (their
`check`), from which `check-course` takes it, a row above with its category and severity, a row
in `SPEC.md` section 10 and a broken fixture. A new test of the spec's own files adds a script,
its id in the list of `check-spec`, a row in the tables of `check-spec` here and in `SPEC.md`
section 10, and a broken fixture under `fixtures/spec/broken/`; it verifies no rule.
