# Templates of `linear-course`

One template per file `course/README.md` defines. Copy one to the course folder, replace every `<placeholder>`, delete the header comment (a `#` block in `course.yaml`; a `<!-- -->` block, the first thing in the file, elsewhere: course Markdown has no HTML). The header says what the file is, which course/README.md section describes it (its rules are the groups of `course/rules.yaml` that section points to), and the rules a check enforces.

| Template | Becomes | course/README.md |
|---|---|---|
| `course.yaml` | `courses/<id>/course.yaml` | 2 |
| `plan.md`, `glossary.md`, `storyline.md`, `CHANGELOG.md` | the same names in `courses/<id>/` | 5 |
| `domain.md` | `courses/<id>/domains/<N>-<slug>.md` | 4 |
| `concept.md`, `teaching.md`, `sources.md` | the same names in `courses/<id>/concepts/<NN>-<slug>/` | 3 |
| `diagram.svg` | `<stem>.svg` in a concept folder, optional | 6 |

The templates of a learner's memory files are the teacher's, in `teacher/templates/learner/` (`apprenant.md`, `observations.md`, `parcours.md`), ported from the old course: no check reads them, the smoke run only scans them for unreplaced placeholders.

The headings and markers in the templates are the words of the lexicon of the course files (`course/lexicon.yaml`), in French, the language of the spec. Each template shows one domain, one concept, one first-level sub-concept with two leaves, two cases: repeat the block.

## Smoke run

```
mise exec -- course-specs/linear-course/1/course/templates/smoke-test
```

Builds a course from the templates with every placeholder filled by a dummy value (the table in the script), once with a diagram and once without, and runs `check-course` on it with the default, the blocking and the reporting checks, each of which must pass. It fails on an unreplaced placeholder too. A change to a template that breaks a check, or to a check that a template no longer satisfies, shows here.
