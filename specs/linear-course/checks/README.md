# Checks of `linear-course`

Scripts that verify a course against `SPEC.md` (section 10), run by `check-course`, and the spec's
own files (`PROTOCOL.md`, `SPEC.md`, `decisions/`), run by `check-spec`. **Dependency-free Node**
(CommonJS, no `npm install`; Node 20 or later, run under `mise exec` like every tool here): the course's YAML,
Markdown and SVG are read by the small readers in `lib/` (`yaml.js`, `md.js`, `xml.js`), which
cover the subset the spec uses. Chosen once, for every check: a shell version would need a
YAML parser too, and the checks must run the same on a laptop and in CI.

## Run

```
mise exec -- specs/linear-course/checks/check-course courses/<id>
mise exec -- specs/linear-course/checks/check-course courses/<id> --only svg-contract
mise exec -- specs/linear-course/checks/check-course courses/<id> --only concept-folder,sources --concept 9
```

One line per passing check (`<id>: ok`), one line per failure
(`<id>: fail: <file>:<line> <message>`, the file relative to the course folder). The exit code is
0 when every check passes, 1 when one fails, 2 on a usage error.

| Option | Does |
|---|---|
| `--only <id>[,<id>]` | runs those checks only (repeatable); an unknown id is a usage error |
| `--concept <number>` | the per-concept checks (`concept-folder`, `conventions`, `svg-contract`, `sources`, `glossary-order`) look at that concept only, and `course-yaml` demands only that concept's folder: for a migration in progress, when the other concept folders do not exist yet |
| `--lang-dir <dir>` | reads the language pack `<dir>/<language>.yaml` instead of `specs/linear-course/lang/` (also `LINEAR_COURSE_LANG_DIR`) |
| `--list` | prints the check ids |

## The checks

One script per id, `checks/<id>.js`, exporting `run(ctx)`; `check-course` loads them in this order.

| Id | Script | Verifies (SPEC.md) |
|---|---|---|
| `course-yaml` | `course-yaml.js` | fields, identifiers, order, domains, annexes, prerequisites, paths, spec MAJOR, pack present (3, 8) |
| `concept-folder` | `concept-folder.js` | files, sections and their order, frontmatter, sub-concept sections, « Objectif », cases, leaf coverage, citation in « Consignes » (4) |
| `conventions` | `conventions.js` | reader-text conventions of `concept.md`; plain Markdown in every course file (2, 4.5) |
| `svg-contract` | `svg-contract.js` | every diagram against the drawing contract; declared and present diagrams (4.1, 7.1) |
| `sources` | `sources.js` | reference ids, citations, claims, paths (4.1, 4.4) |
| `course-files` | `course-files.js` | `plan.md` (« Public cible », « Accueil »), `glossary.md`, `CHANGELOG.md`, domain files (5, 6) |
| `glossary-order` | `glossary-order.js` | no `concept.md` uses a term before the concept that introduces it, except in a sentence that names that concept (6) |
| `domain-first-sentence` | `domain-first-sentence.js` | first sentence of each paragraph of « Le fil des concepts » stands alone (5) |
| `typography` | `typography.js` | no banned character of the language pack in course text (2) |
| `language-pack-keys` | `language-pack-keys.js` | every key of section 9 and of `PROTOCOL.md` exists in the course's pack (9) |

`language-pack-keys` checks the keys of section 9 and every key `PROTOCOL.md` uses: a row of
the pack tables of its "Keys and parameters" section, or a `{group.key}` in a rule (the check reads
`PROTOCOL.md`, so a new key there is required of the packs at once). A key is a non-empty string;
the lists (`typography.banned`, `checks.anaphora`, the `learner_says` lists) are non-empty lists of
strings. The groups beside those (`site`) are read by the site, not checked here.

A claim of `sources.md` has a source when its source cell is not empty: a reference id
(`[S1]`), a `concepts/NN-slug/sources.md` path, or a word that says there is none (« fil
rouge », « aucune »). Ids and paths in the cell are checked.

## Checks of the spec itself

```
mise exec -- specs/linear-course/checks/check-spec
mise exec -- specs/linear-course/checks/check-spec <spec-dir> --only rule-slugs
```

`check-spec` checks the spec's own files, not a course: `PROTOCOL.md`, `SPEC.md` and
`decisions/` of `<spec-dir>` (default: `specs/linear-course`). Same output, exit codes and
`--only`, `--list` as `check-course`; the file in a failure line is relative to `<spec-dir>`.

| Id | Script | Verifies |
|---|---|---|
| `rule-slugs` | `rule-slugs.js` | every rule and every group of rules of `PROTOCOL.md` is named by a slug, defined once in one namespace; every rule or group cited in `PROTOCOL.md`, `SPEC.md` and `decisions/` is cited by a slug that is defined, a group as a group and a rule as a rule; none is named or cited by a number, no range « `a` à `b` » (decisions `rules-named-by-slug`, `rule-groups-replace-ranges`) |

A rule's slug is defined by a line of a rule family (`## <n>. …`) that opens on `**<slug>** `, or
by a table row of a family whose first cell is `**<slug>**` (the save-point table); a group's slug
by a heading of a family, « ### <title> (`<slug>`) » (one to five words). Rules and groups share
one namespace: a slug is defined once. A rule is cited by a
code span: in a rule family, every code span shaped like a slug (two to five lowercase words
joined by hyphens); in the tables of `PROTOCOL.md`, every code span of a "Used in" or "Rule"
column; elsewhere, the code spans that follow « rule », « rules », « règle » or « règles »,
joined by commas, « and », « to », « et », « à » (« rules `a`, `b` and `c` »). A check id or a
decision slug in code is not a rule, as long as no such word leads it. Everywhere, the code spans
that follow « group », « groups », « groupe » or « groupes » must be groups, and those that follow
« rule(s) » or « règle(s) » must be rules. A range, « `a` à `b` » or « `a` to `b` », fails in
`PROTOCOL.md` and `SPEC.md`; `decisions/` are not read for ranges, since they quote the ones they
replaced.

Known limits:
- A code span after « group » that names something other than a rule group fails as a missing group.
- A `####` heading inside a family is neither a group nor read by the check: the rules under it stay in the group above.

## Tests

```
mise exec -- specs/linear-course/checks/test-fixtures
```

- `fixtures/valid/`: a minimal valid course (four concepts, one annex, one diagram); every
  check passes.
- `fixtures/broken/<name>/`: a copy of it with one defect; its `EXPECT` file names the check
  that must fail and the message it must give. No other check may fail (the test says so),
  except for the broken language pack.
- `fixtures/prototype/`: the course-level files around the concept 9 prototype
  (`courses/parcours-po/concepts/09-decoupage-vertical`, copied in at test time); every check
  passes with `--concept 9`. The real course files come with S1-08.
- `fixtures/lang/fr.yaml`: the pack the fixtures use (the groups the checks read: section 9 and the
  keys of `PROTOCOL.md`, French values of the real pack `lang/fr.yaml`, without `site`; change both
  together). `fixtures/lang-broken*/`: packs with one missing key, for the broken copies that name them.
- `fixtures/spec/valid/`: a minimal spec (`PROTOCOL.md`, `SPEC.md`, one decision); every
  `check-spec` check passes. `fixtures/spec/broken/<name>/`: a copy of it with one defect and its
  `EXPECT` file (a missing slug, a duplicate slug, a rule cited by number, a missing group, a
  group whose slug is a rule's, a range, a group cited as a rule). The test also runs
  `check-spec` on `specs/linear-course`, which must pass.

The fixtures are plain files: change `valid/` and the broken copies together, then run the
test. A new check adds a script, a line in `check-course` (or `check-spec` for a check of the
spec's own files), a row above and a broken fixture.
