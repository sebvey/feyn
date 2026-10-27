# Checks of `linear-course`

Scripts that verify a course against `SPEC.md` (section 10). **Dependency-free Node**
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
| `svg-contract` | `svg-contract.js` | every diagram against the drawing contract; declared and present diagrams (4.1, 7) |
| `sources` | `sources.js` | reference ids, citations, claims, paths (4.1, 4.4) |
| `course-files` | `course-files.js` | `plan.md`, `glossary.md`, `CHANGELOG.md`, domain files (5, 6) |
| `glossary-order` | `glossary-order.js` | no `concept.md` uses a term before the concept that introduces it (6) |
| `domain-first-sentence` | `domain-first-sentence.js` | first sentence of each paragraph of « Le fil des concepts » stands alone (5) |
| `typography` | `typography.js` | no banned character of the language pack in course text (2) |
| `language-pack-keys` | `language-pack-keys.js` | every key of section 9 exists in the course's pack (9) |

`language-pack-keys` checks the keys of section 9. The keys `PROTOCOL.md` uses are listed in its
"Keys and parameters" section; S1-05 adds them to the check with the real pack. The pack is read as
a map of the groups of section 9 (`headings`, `case_fields`, `markers`, `references`,
`source_types`, `typography.banned`, `checks.anaphora`); S1-05 writes the real pack and may add
groups beside them.

A claim of `sources.md` has a source when its source cell is not empty: a reference id
(`[S1]`), a `concepts/NN-slug/sources.md` path, or a word that says there is none (« fil
rouge », « aucune »). Ids and paths in the cell are checked.

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
- `fixtures/lang/fr.yaml`: the pack the fixtures use (the keys of section 9, French values).

The fixtures are plain files: change `valid/` and the broken copies together, then run the
test. A new check adds a script, a line in `check-course`, a row above and a broken fixture.
