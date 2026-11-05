---
date: 2026-10-27
issue: 27
status: accepted
area: spec:linear-course
---

Without this, an agent adding a hint for the teacher would write it in `concept.md` under a heading or HTML comment marked teacher-only, so the site would need a filter that one forgotten marker defeats, publishing expected answers, and every fix to the example bank would show in `concept.md`'s history as a change for the reader.

A concept's visibility is carried by its files (`course/README.md` section 3): `concept.md`, `sources.md` and the diagrams are reader-facing, the site builds them and the teacher reads them; `teaching.md` is teacher-only, the teacher reads it and the site never builds it. The reader text and the teaching notes (example bank included) never share a file. This replaces the single concept file of the founding course, where the bank sat beside the reader text under one alignment stamp. No filter inside a file: the site builds every « Affirmations » row of `sources.md` and the « Références »; no row is teacher-only, since `sources.md` traces the body of `concept.md` only (decision `sources-trace-the-concept`). « Non vérifié » is the one section-level exclusion, by its lexicon heading (`course/README.md` 3.4).

## Options ruled out

- Teacher-only sections inside `concept.md`: the site and the checks would have to filter, and a missed filter leaks the answers.

## Consequences

- A writer opens two files per concept; the checks hold them together (every leaf sub-concept has its section in `concept.md` and a case in `teaching.md`).
- A new teacher-only need gets a section of `teaching.md`, never a marker in a reader-facing file.
