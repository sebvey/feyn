# linear-course, MAJOR 1

The spec of linear introductory courses: ordered domains, ordered concepts with prerequisites,
sub-concepts taught one per teacher message, a storyline. This folder,
`course-specs/linear-course/1/`, holds its MAJOR 1, version `1.0.0-alpha` until its tag; a
course follows it by declaring `spec: linear-course@1` in its `course.yaml`.

- `SPEC.md`: the frame: scope, files, conformance, levels, methods, categories, severity, versions, normative references, the list of checks.
- `course/README.md`: what a course is: course structure, reader-text conventions, diagrams (drawing contract and style), language pack keys.
- `teacher/README.md`: the pedagogical protocol the teacher executes.
- `CHANGELOG.md`: the changes of the spec, « Unreleased » until the tag.
- `spec.yaml`: the declaration of this MAJOR, its version and the MAJOR of the spec directives it follows (`spec-directives/1/`: the tests of these files, run by `spec-directives/check-spec course-specs/linear-course/1`, and the `lib/` and package the checks load).
- `lang/<code>.yaml`: the language packs (phrases, typography, headings, markers, site labels).
- `course/checks/`: the check scripts; `course-specs/check-course <course-dir>` runs on a course that declares this MAJOR the checks of the rule files, those that block and those that report, `--category` selecting by category (`SPEC.md` section 10).
- `course/templates/`: the course templates; `decisions/`: the decisions of this spec.
