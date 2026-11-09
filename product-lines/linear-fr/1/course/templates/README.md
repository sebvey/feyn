# Templates of `linear-fr`

One template per file `course/README.md` defines, except `logo.svg`, which has none (course/README.md section 1: copied unchanged, a template would give several courses the same logo). Copy one to the course folder, replace every `<placeholder>`, delete the header comment (a `#` block in `course.yaml`; a `<!-- -->` block, the first thing in the file, elsewhere: course Markdown has no HTML). The header says what the file is, which course/README.md section describes it (its rules are the groups of `course/rules.yaml` that section points to), and the rules a check enforces.

| Template | Becomes | course/README.md |
|---|---|---|
| `course.yaml` | `courses/<id>/course.yaml` | 2 |
| `plan.md`, `glossary.md`, `storyline.md`, `CHANGELOG.md` | the same names in `courses/<id>/` | 5 |
| `domain.md` | `courses/<id>/domains/<N>-<slug>.md` | 4 |
| `concept.md`, `sources.md` | the same names in `courses/<id>/concepts/<NN>-<slug>/` | 3 |
| `diagram.svg` | `<stem>.svg` in a concept folder, optional | 6 |

The templates of a learner's memory files are not the course's: they are the teacher implementation's, outside the spec, which the spec never reads; the smoke run reads the templates of this folder only.

The headings and markers in the templates are the words of the lexicon of the course files (`course/lexicon.yaml`), in French, the language of the spec. Each template shows one domain, one concept opening on its title, a section with two units, each with a supplementary case after its own case in « Cas du fil rouge », each case under its heading, then a section with a single unit, which keeps its `###` heading: repeat the block. Their parts are the form of `course/form.yaml`: `plan.md` its three sections, then the course's own; `domain.md` its two sections, no frontmatter; `storyline.md` the world, then « Faits fixés », each fact with the id of its unit.

## Smoke run

```
mise exec -- product-lines/linear-fr/1/course/templates/smoke-test
```

Builds a course from the templates with every placeholder filled by a dummy value (the table in the script), and a dummy `logo.svg`, once with a diagram and once without, and runs `check-course` on it with the default, the blocking and the reporting checks, each of which must pass. It fails on an unreplaced placeholder too. A change to a template that breaks a check, or to a check that a template no longer satisfies, shows here.
