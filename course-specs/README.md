# course-specs

Summary of decision `versioned-objects-and-spec-layout`; if they differ, the decision wins.

A spec is the contract for a type of course. The only spec is `linear-course`; its MAJOR 1
sits in `course-specs/linear-course/1/`.

## Layout

One folder per MAJOR, `course-specs/<name>/<MAJOR>/` (`1/`, not `v1/`), holds:

| File or folder | Holds |
|---|---|
| `SPEC.md` | the frame: scope, conformance, levels, methods, categories, severity, versions, checks |
| `COURSE.md` | what a course is: its files, fields, diagrams, language pack keys |
| `PROTOCOL.md` | the protocol |
| `rules/` | the rules as data, two files: of a course, of the protocol |
| `schemas/` | the JSON Schemas of a course's files |
| `README.md` | the entry to the MAJOR |
| `checks/` | the checks of a course, the tests of the spec's own files, their fixtures |
| `decisions/` | the spec's decisions |
| `lang/` | the language packs |
| `templates/` | the course templates |
| `CHANGELOG.md` | the changelog of the spec's versions in this MAJOR |

A new MAJOR copies the tree of the previous one, its decisions under the same slugs.

A course declares the MAJOR it follows in `course.yaml` (`spec: linear-course@1`).
`course-specs/check-course <course>` reads it, runs `course-specs/<name>/<MAJOR>/checks`, and
refuses an unknown spec or MAJOR. The MAJOR's `check-course` takes its checks from the MAJOR's
rule files and runs them in one run: a failure of a check that blocks sets exit code 1, a failure
of a check that reports is printed and leaves 0; `--category` selects checks by category.

## Versions

A spec version is tagged `<name>/vX.Y.Z`. From the MAJOR's tag on, the bump of a spec change
is written in the levels of the rules of a course (requirement, recommendation), as the
MAJOR's `SPEC.md` writes it (`linear-course`: sections 4 and 8):

| Bump | When |
|---|---|
| MAJOR | the structure changes (files, fields, mandatory sections); a requirement added or made stricter; an optional field made mandatory; a recommendation made a requirement |
| MINOR | an optional element; a protocol rule added, changed or renamed (the old slug is burnt); a requirement made looser or made a recommendation; a recommendation added or made stricter; a language-pack key added or renamed, every pack updated |
| PATCH | wording; a false positive lifted |

A MAJOR lives while a served course version declares it, a course tag included; then it is
archived. Tooling reads every live MAJOR. An old MAJOR receives bug fixes only, as a PATCH,
never a tightening; a bug fix is ported to every live MAJOR.
