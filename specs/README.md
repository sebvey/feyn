# specs

Summary of decision `versioned-objects-and-spec-layout`; if they differ, the decision wins.

A spec is the contract for a type of course. The only spec is `linear-course`; its MAJOR 1
sits in `specs/linear-course/1/`.

## Layout

One folder per MAJOR, `specs/<name>/<MAJOR>/` (`1/`, not `v1/`), holds:

| File or folder | Holds |
|---|---|
| `SPEC.md` | the frame: scope, conformance, levels, methods, categories, severity, versions, checks |
| `COURSE.md` | what a course is: its files, fields, diagrams, language pack keys |
| `PROTOCOL.md` | the protocol |
| `README.md` | the entry to the MAJOR |
| `checks/` | the checks and their fixtures |
| `decisions/` | the spec's decisions |
| `lang/` | the language packs |
| `templates/` | the course templates |
| `CHANGELOG.md` | the changelog of the spec's versions in this MAJOR |

A new MAJOR copies the tree of the previous one, its decisions under the same slugs.

A course declares the MAJOR it follows in `course.yaml` (`spec: linear-course@1`).
`specs/check-course <course>` reads it, runs `specs/<name>/<MAJOR>/checks`, and refuses an
unknown spec or MAJOR. Its conformity mode, the default, runs the conformity checks; its
quality mode, `--quality`, runs the quality checks.

## Versions

A spec version is tagged `<name>/vX.Y.Z`.

| Bump | When |
|---|---|
| MAJOR | the structure changes (files, fields, mandatory sections); a conformity check added or made stricter; an optional field made mandatory; a quality check moved to conformity |
| MINOR | an optional element; a protocol rule added, changed or renamed (the old slug is burnt); a conformity check made looser or moved to quality; a quality check added or made stricter; a language-pack key added or renamed, every pack updated |
| PATCH | wording; a false positive lifted |

A MAJOR lives while a served course version declares it, a course tag included; then it is
archived. Tooling reads every live MAJOR. An old MAJOR receives bug fixes only, as a PATCH,
never a tightening; a bug fix is ported to every live MAJOR.

## Check families

| | Conformity check | Quality check |
|---|---|---|
| Says | the course is consumable: the site builds, the teacher teaches, identifiers resolve | the course is good: term order, captions, lengths |
| Run by | the machine on every change: `/feyn-pull-request`, CI, the builds | the maintainer on demand; taught-check is one, run by agents |
| Result | a `fail` blocks the merge and the builds | findings, triaged into course issues |

No conformity path runs the quality mode.
