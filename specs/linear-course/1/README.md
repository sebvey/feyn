# linear-course, MAJOR 1

The spec of linear introductory courses: ordered domains, ordered concepts with prerequisites,
sub-concepts taught one per teacher message, a storyline. This folder, `specs/linear-course/1/`,
holds its MAJOR 1, version `1.0.0-alpha` until its tag; a course follows it by declaring
`spec: linear-course@1` in its `course.yaml`.

- `SPEC.md`: the frame: scope, files, conformance, levels, methods, categories, severity, versions, normative references, the list of checks.
- `COURSE.md`: what a course is: course structure, reader-text conventions, diagrams (drawing contract and style), language pack keys.
- `PROTOCOL.md`: the pedagogical protocol the teacher executes.
- `CHANGELOG.md`: the changes of the spec, « Unreleased » until the tag.
- `lang/<code>.yaml`: the language packs (phrases, typography, headings, markers, site labels).
- `checks/`: the check scripts; `specs/check-course <course-dir>` runs on a course that declares this MAJOR the checks of the rule files, those that block and those that report, `--category` selecting by category (`SPEC.md` section 10).
- `templates/`: the course templates; `decisions/`: the decisions of this spec.
