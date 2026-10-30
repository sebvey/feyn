---
date: 2026-10-27
issue: 27
status: accepted
area: spec:linear-course
---

Without this, an agent adding a hint for the teacher would write it in `concept.md` under a
heading or HTML comment marked teacher-only, so the site would need a filter that one forgotten
marker defeats, publishing expected answers, and every fix to the example bank would show in
`concept.md`'s history as a change for the reader.

A concept's visibility is carried by its files (`SPEC.md` section 4): `concept.md`,
`sources.md` and the diagrams are reader-facing, the site builds them and the teacher reads
them; `teaching.md` is teacher-only, the teacher reads it and the site never builds it. The
reader text and the teaching notes (example bank included) never share a file. This replaces the
single concept file of `parcours-po`, where the bank sat beside the reader text under one
alignment stamp. One filter inside a file exists, and only one: the site builds the
« Affirmations » rows of `sources.md` whose section is in `concept.md` or is `headings.stances`
(the frontmatter stances, issue #97), and the « Références » they cite; rows whose section is in `teaching.md` are teacher-only; « Non vérifié » is not built (`SPEC.md`
4.4, issue #98).

## Options ruled out

- Teacher-only sections inside `concept.md`: the site and the checks would have to filter, and
  a missed filter leaks the answers.

## Consequences

- A writer opens two files per concept; the checks hold them together (every leaf sub-concept
  has its section in `concept.md` and a case in `teaching.md`).
- A new teacher-only need gets a section of `teaching.md`, never a marker in a reader-facing
  file.
