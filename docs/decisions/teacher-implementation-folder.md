---
date: 2026-11-09
issue: 779
status: accepted
area: repo
---

Without this, a contributor rewriting the means of the teacher would write them in the spec MAJOR's folder, beside the protocol rules they serve, and a second implementation of the same spec would then rewrite the spec; or an author of a second spec MAJOR would copy the teacher build of the first into the new MAJOR, so the spec would carry, version by version, what only one target needs.

The implementation of the teacher of a spec MAJOR lives in `teacher-builder/<spec>/<MAJOR>/` (`teacher-builder/linear-fr/1/`): its means, what renders them for a course (the instructions, the composition of the parts of a classroom, the learner templates, the rendering of the parts as one document and its shape, its test), the format of the learner memory, the words of the waiting phrases, and the reading of the course through the spec's parser, so that the course map holds the annexes as the course does. The spec holds no teacher build: the teacher's part of a spec MAJOR is its description, its protocol rules and its lexicon. The implementation reads the spec (its manifest, its lexicons, its course parser, its sample course), as a spec follows its directives; the spec never reads the implementation, so no script of a spec MAJOR reads a file of `teacher-builder/`. `teacher-builder/` keeps the common engine: the dispatcher `build-teacher`, which reads `spec: <name>@<MAJOR>` in a course's `course.yaml` and runs the implementation folder of that MAJOR, refusing a MAJOR with none; its test `test-build`; the teacher template; the harness of the fresh tests. The commit a classroom records as its tooling is the last of `teacher-builder/` alone. This replaces the cut of the teacher build in two halves, the spec MAJOR's half rendering the parts and the root realising them, which existed only to keep `teacher-builder/` independent of any spec.

The site keeps its two halves for now: the spec MAJOR's half of the site build reads the course and gives its published parts, the engine at the root renders them. The asymmetry is a symptom, not a choice: what of the site the spec fixes is idea #759.

## Options ruled out

- An implementation folder inside the spec MAJOR (`products/teacher/implementation/`): the spec would hold one target's means, and a second implementation would change the spec.
- A root folder apart from `teacher-builder/` (`teacher-implementations/`): two roots for one product, the engine and the means of one target split for no reader.
- An extraction tool kept in the spec, as the site's half is: the spec would still read the course for one target's needs and carry the composition, which is a means.

## Consequences

- A second spec MAJOR, or a second spec, writes its own `teacher-builder/<spec>/<MAJOR>/`; the spec MAJOR itself holds nothing for its teacher's build.
- A change of the implementation is not a change of the spec: no bump of the spec, no entry in its `CHANGELOG.md`; the classroom records it by its tooling commit.
- The test scenarios of the fresh tests left the spec with the build, git keeping them; the harness stays in `teacher-builder/`, unrun (decision `teacher-yardstick-cafe-and-maintainer-session`).
- A file the teacher reads is in the spec's language wherever it lives, the implementation's included (decision `language-policy`).
