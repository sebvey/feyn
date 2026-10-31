# Checks of `linear-course`

Scripts that verify a course against `COURSE.md` (listed in `SPEC.md` section 10), run by
`check-course`, and the spec's own files (`PROTOCOL.md`, `SPEC.md`, `COURSE.md`, `decisions/`), run
by `check-spec`. **Dependency-free Node**
(CommonJS, no `npm install`; Node 20 or later, run under `mise exec` like every tool here): the course's YAML,
Markdown and SVG are read by the small readers in `lib/` (`yaml.js`, `md.js`, `xml.js`), which
cover the subset the spec uses. Chosen once, for every check: a shell version would need a
YAML parser too, and the checks must run the same on a laptop and in CI.

## Run

```
mise exec -- specs/check-course courses/<id>
mise exec -- specs/check-course courses/<id> --quality
mise exec -- specs/check-course courses/<id> --only svg-contract
mise exec -- specs/check-course courses/<id> --only concept-folder,sources --concept 9
```

Two modes (decision `versioned-objects-and-spec-layout`). The **conformity mode**, the default,
runs the conformity checks: whether the course is consumable; the machine runs it on every
change, and a `fail` blocks. The **quality mode**, `--quality`, runs the quality checks: whether
the course is good; the maintainer runs it on demand, and its failures are findings, triaged into
course issues. No conformity path runs the quality mode.

`specs/check-course` reads `spec: linear-course@<MAJOR>` in the course's `course.yaml` and runs
`specs/linear-course/<MAJOR>/checks/check-course` with the same arguments; it refuses an unknown
spec or MAJOR, naming it, with exit code 2. This folder's `check-course` runs this MAJOR's checks
directly, `--list` with no course included.

One line per passing check (`<id>: ok`), one line per failure
(`<id>: fail: <file>:<line> <message>`, the file relative to the course folder). The exit code is
0 when every check passes, 1 when one fails, 2 on a usage error.

| Option | Does |
|---|---|
| `--quality` | runs the quality checks instead of the conformity checks |
| `--only <id>[,<id>]` | runs those checks of the mode only (repeatable); an unknown id, or an id of the other mode, is a usage error |
| `--concept <number>` | the per-concept checks (`concept-folder`, `conventions`, `svg-contract`, `sources`, `glossary-order`) look at that concept only, and `course-yaml` demands only that concept's folder and does not look for unlisted folders in `concepts/`: for a migration in progress, when the other concept folders do not exist yet |
| `--lang-dir <dir>` | reads the language pack `<dir>/<language>.yaml` instead of this MAJOR's `lang/` (also `LINEAR_COURSE_LANG_DIR`) |
| `--list` | prints the check ids of the mode |

`--only` takes ids of the current mode only: conformity and quality checks need two runs.

## The checks

One script per id, `checks/<id>.js`, exporting `run(ctx)`; `check-course` loads the checks of
its mode in this order.

| Id | Family | Script | Verifies (COURSE.md) |
|---|---|---|---|
| `course-yaml` | conformity | `course-yaml.js` | fields, identifiers, order, domains, annexes, prerequisites, at most 9 children per node, paths, no unlisted folder in `concepts/` (not looked for under `--concept`), spec declared, pack present (2; `SPEC.md` 8) |
| `concept-folder` | conformity | `concept-folder.js` | files, sections and their order, the column count of the `sources.md` tables, frontmatter (`verified` parallel to `refs`, absent without `refs`), sub-concept sections, « Objectif », cases (in the heading, at most one qualifier, a value of the pack's `qualifiers`; a qualifier on « Question » only), leaf coverage, citation in « Consignes » (3, 7) |
| `conventions` | conformity | `conventions.js` | reader-text conventions of `concept.md`; plain Markdown in every course file (1, 3.5) |
| `svg-contract` | conformity | `svg-contract.js` | every diagram against the drawing contract, a root `<defs>` accepted; declared and present diagrams (3.1, 6.1) |
| `sources` | conformity | `sources.js` | no introduction; in each « Affirmations » row of five cells (the column count is `concept-folder`'s): section anchors that exist in `concept.md`, a source cell of reference ids or the `markers.course` word, a verification (empty for a « cours » claim only), a nature (`markers` consensus, school, course, or `natures.fact`); reference ids, links (one URL or empty), types, dates; every id cited exists, every reference is cited by a claim or a frontmatter item; « Non vérifié » entries open with their section (3.1, 3.4) |
| `course-files` | conformity | `course-files.js` | `plan.md` (« Public cible », « Accueil »: one posture paragraph, then its questions), `glossary.md` (four columns, one concept number in the fourth, no variant in two rows), `CHANGELOG.md`, domain files, no unlisted file in `domains/` (4, 5) |
| `domain-first-sentence` | conformity | `domain-first-sentence.js` | the first sentence of each paragraph of « Le fil des concepts » ends with `.`, `?` or `!` within 300 characters of the lead (4) |
| `language-pack-keys` | conformity | `language-pack-keys.js` | every key of `COURSE.md` section 7 and of `PROTOCOL.md` exists in the course's pack (7) |
| `glossary-order` | quality | `glossary-order.js` | no `concept.md`, body or frontmatter (stance and neighbour texts, diagram titles and captions), uses a glossary term before its defining concept (the fourth column), unless the sentence carries a concept reference to that concept (`lib/refs.js`, the grammar `conventions` checks); every use is reported; each comma variant of the term cell is matched whole word, case ignored; a row whose term cell has a parenthesis is skipped (5) |
| `typography` | quality | `typography.js` | no banned character of the language pack in course text (1) |
| `domain-first-sentence-standalone` | quality | `domain-first-sentence-standalone.js` | the first sentence of each paragraph of « Le fil des concepts » does not open with a word of the pack's `checks.anaphora` list; a pack without that list is a failure of this check (4, 7) |

`language-pack-keys` checks the keys of `COURSE.md` section 7 and every key `PROTOCOL.md` uses: a row of
the pack tables of its "Keys and parameters" section, or a `{group.key}` in a rule (the check reads
`PROTOCOL.md`, so a new key there is required of the packs at once). A key is a non-empty string;
the lists (`typography.banned`, the `learner_says` lists) are non-empty lists of strings.
`checks.anaphora` is optional: `domain-first-sentence-standalone` reads it. The groups beside
those (`site`) are read by the site, not checked here.

A claim's source cell holds reference ids (`[S1], [S2]`) or the `markers.course` word
(« cours »), nothing else: free text (« aucune », « fil rouge ») and a path to another concept
fail. A section anchor is a sub-concept id or a fixed section by its pack value
(`headings.essentials`, `pitfalls`, `quick_test`, `deepening`) whose heading exists in
`concept.md`; a « Non vérifié » entry is a list item `<anchors> : <text>`, and may also name
`headings.stances`. The form of the verified cell (a quotation and its place) is reviewed.

## Checks of the spec itself

```
mise exec -- specs/linear-course/1/checks/check-spec
mise exec -- specs/linear-course/1/checks/check-spec <spec-dir> --only rule-slugs
```

`check-spec` checks the spec's own files, not a course: `PROTOCOL.md`, `SPEC.md`, `COURSE.md`
and `decisions/` of `<spec-dir>` (default: this MAJOR's folder, `specs/linear-course/1`). Same
output, exit codes and `--only`, `--list` as `check-course`; the file in a failure line is
relative to `<spec-dir>`. It has one mode: its checks are conformity checks.

| Id | Family | Script | Verifies |
|---|---|---|---|
| `rule-slugs` | conformity | `rule-slugs.js` | every rule and every group of rules of `PROTOCOL.md` is named by a slug, defined once in one namespace; every rule or group cited in `PROTOCOL.md`, `SPEC.md`, `COURSE.md` and `decisions/` is cited by a slug that is defined, a group as a group and a rule as a rule; none is named or cited by a number, no range « `a` à `b` » (decisions `rules-named-by-slug`, `rule-groups-replace-ranges`) |

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

Every course fixture runs in both modes; `--list` and `--quality --list` must print two disjoint
lists, and a run must run the checks of its mode and no other.

- `fixtures/valid/`: a minimal valid course (four concepts, one annex, one diagram with a root
  `<defs>`; a glossary with a comma variant, a qualified row used before its concept, an empty
  English cell, and earlier uses silenced by a concept reference, one of them to an annex
  sub-concept; in `sources.md`, a claim on two anchors, a « cours » claim with no verification,
  a `fait` claim on « Approfondissement », « Non vérifié » entries anchored to a sub-concept and
  to the stances, stance items with `verified`); every check of both modes passes.
- `fixtures/broken/<name>/`: a copy of it with one defect; its `EXPECT` file names the check
  that must fail, in its mode, and the message it must give. No other check of either mode may
  fail (the test says so), except for the broken language pack.
  `broken/course-yaml-unlisted-folder` also runs with `--concept 0`, where `course-yaml` passes.
- No real course is a fixture: `specs/check-course courses/parcours-po` checks the real course,
  and a change to the spec reports its new failures there.
- `fixtures/lang/fr.yaml`: the pack the fixtures use (the groups the checks read: `COURSE.md` section 7 and the
  keys of `PROTOCOL.md`, French values of the real pack `lang/fr.yaml`, without `site`; change both
  together). `fixtures/lang-broken*/`: packs with one missing key (`lang-broken-natures`: the group
  `natures`), for the broken copies that name them.
  `fixtures/lang-no-anaphora/`: the pack without the optional `checks.anaphora`; `valid/` with it
  passes the conformity mode, and the quality mode fails `domain-first-sentence-standalone` only.
- `fixtures/spec/valid/`: a minimal spec (`PROTOCOL.md`, `SPEC.md`, `COURSE.md`, one
  decision); every `check-spec` check passes. `fixtures/spec/broken/<name>/`: a copy of it with
  one defect and its `EXPECT` file (a missing slug, a duplicate slug, a rule cited by number, a
  missing group, a group whose slug is a rule's, a range, a range in `COURSE.md`, a group cited
  as a rule). The test also runs
  `check-spec` on `specs/linear-course/1`, which must pass.
- `fixtures/dispatcher/<name>/`: a `course.yaml` that `specs/check-course` refuses, `other-spec`
  (an unknown spec, `other@1`) and `unknown-major` (`linear-course@9`); the test also runs
  `specs/check-course` on `valid/` in both modes, which must pass.

The fixtures are plain files: change `valid/` and the broken copies together, then run the
test. A new check adds a script, a line in the list of its mode in `check-course` (or in
`check-spec` for a check of the spec's own files), a row above with its family, a row in
`SPEC.md` section 10 and a broken fixture.
