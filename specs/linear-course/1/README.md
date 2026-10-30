# linear-course, MAJOR 1

The spec of linear introductory courses: ordered domains, ordered concepts with prerequisites,
sub-concepts taught one per teacher message, a storyline. This folder, `specs/linear-course/1/`,
holds its MAJOR 1; a course follows it by declaring `spec: linear-course@1` in its
`course.yaml`.

- `SPEC.md`: the contract: course structure, reader-text conventions, diagrams (drawing contract and style), versions, check ids.
- `PROTOCOL.md`: the pedagogical protocol the teacher executes.
- `lang/<code>.yaml`: the language packs (phrases, typography, headings, markers, site labels).
- `checks/`: the check scripts; `specs/check-course <course-dir>` runs them all on a course that declares this MAJOR.
- `templates/`: the course templates; `decisions/`: the decisions of this spec.
