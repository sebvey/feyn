# Templates of `linear-course`

One template per file `COURSE.md` defines. Copy one to the course folder, replace every
`<placeholder>`, delete the header comment (a `#` block in `course.yaml`; a `<!-- -->` block,
the first thing in the file, elsewhere: course Markdown has no HTML). The header says what the
file is, which SPEC section binds it, and the rules a check enforces.

| Template | Becomes | SPEC |
|---|---|---|
| `course.yaml` | `courses/<id>/course.yaml` | 3 |
| `plan.md`, `glossary.md`, `storyline.md`, `CHANGELOG.md` | the same names in `courses/<id>/` | 6 |
| `domain.md` | `courses/<id>/domains/<N>-<slug>.md` | 5 |
| `concept.md`, `teaching.md`, `sources.md` | the same names in `courses/<id>/concepts/<NN>-<slug>/` | 4 |
| `diagram.svg` | `<stem>.svg` in a concept folder, optional | 7 |
| `learner/{apprenant,observations,parcours}.md` | a learner's memory files, ported from the old course; no check reads them | protocol |

The headings and markers in the templates are the French language pack's (`lang/fr.yaml`): a
course in another language translates them from its own pack. Each template shows one domain,
one concept, one first-level sub-concept with two leaves, two cases: repeat the block.

## Smoke run

```
mise exec -- specs/linear-course/1/templates/smoke-test
```

Builds a course from the templates with every placeholder filled by a dummy value (the table
in the script), once with a diagram and once without, and runs `check-course` on it in both
modes, conformity and `--quality`. It fails on an unreplaced placeholder too. A change to a
template that breaks a check, or to a check that a template no longer satisfies, shows here.
