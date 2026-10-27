# linear-course

The spec of linear introductory courses: ordered domains, ordered concepts with prerequisites,
sub-concepts taught one per teacher message, a storyline. A course follows it by declaring
`spec: linear-course@1` in its `course.yaml`.

- `SPEC.md`: the contract: course structure, reader-text conventions, drawing contract, versions, check ids.
- `PROTOCOL.md`: the pedagogical protocol the teacher executes.
- `lang/<code>.yaml`: the language packs (phrases, typography, headings, markers, site labels).
- `checks/`: the check scripts; `checks/check-course <course-dir>` runs them all.
- `templates/`: the course templates; `decisions/`: the decisions of this spec.
