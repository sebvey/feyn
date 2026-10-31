---
date: 2026-10-28
issue: 99
status: superseded
superseded-by: sources-trace-the-concept
area: spec:linear-course
---

Without this, an agent writing or fixing a concept would put a storyline fact, a teaching
device or the trace of a removed claim in `sources.md` as if it were sourced (concept 9:
« fil rouge » and « aucune » as sources, an example listed twice, two traces in « Non vérifié »),
the site would build it for the reader, and the check would pass on free text.

Five tests, in order, place a claim: (1) a storyline fact leaves `sources.md`, for
`storyline.md` and « Faits du fil rouge utilisés »; (2) a claim the reader text states
(`concept.md`, frontmatter `stances` and `neighbors`) is a row of « Affirmations » with its
`concept.md` section or `headings.stances`, nature `cours` for a choice or an example of the
course; (3) a claim only `teaching.md` states is a gap of the course if the learner must know
it (added to `concept.md`, then test 2); a teaching device (a deduction, an invented example)
has nature `cours`, and it and a sourced claim given only on demand stay teacher-only, with a
section of `teaching.md`; (4) a claim no source settles and the course does not state goes in
« Non vérifié »; (5) the trace of a removed claim is dropped: git history is the trace. A claim
the course states as a fact that no source settles is sourced, rewritten into a guardrail, or
removed. A row's parenthesis names sections of one file only, so a case title never reaches
the site (maintainer's choice, 2026-10-28). The site builds the « Affirmations » rows whose
section is in `concept.md` or is `headings.stances`, `cours` ones included, and the
« Références » they cite; the classroom copies the whole file. « Non vérifié » is never built:
it holds what must not be asserted and why, as an instruction (« écrire X, pas Y », « ne pas
dater »), for the teacher who speaks and whoever writes or fixes the course. A `cours` claim may
cite no reference, its source cell then holding the `markers.course` word (« cours »); any
other claim without a reference fails, and free text (« aucune », « fil rouge ») is not a
source. This grounds the one filter of decision `reader-facing-and-teacher-only-files`.
`SPEC.md` 4.4 and the `sources` check change with the course pass (#140, then #141), not before.

## Options ruled out

- A source "the model's knowledge": it fits only the course's examples, which nature `cours`
  names, and would make a guardrail look like a source.
- Traces in « Non vérifié »: git history holds them, and a writer would protect them as claims.
