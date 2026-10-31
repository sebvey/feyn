---
date: 2026-10-30
issue: 217
status: accepted
area: spec:linear-course
---

Without this, an agent writing or fixing a concept's sources would follow decision
`where-a-claim-goes` as written: keep a claim only `teaching.md` states as a teacher-only row
with a `teaching.md` section, restate each frontmatter stance as a row under « Consensus et
choix d'école », and verify a claim by a path to another concept's `sources.md`, so the site
would need a row filter that one malformed section cell defeats (a case reaches the reader),
each stance would be written twice with no checkable join, and a concept could not be
re-verified from its own folder.

`sources.md` traces the body of `concept.md` only, and five tests, in order, place a claim:
(1) a storyline fact leaves `sources.md`, for `storyline.md` and « Faits du fil rouge
utilisés »; (2) a claim the body of `concept.md` states is a row of « Affirmations »: its
section (sub-concept ids or fixed sections), its source (reference ids of this concept, or the
`markers.course` word « cours » for a choice or an example of the course), what was verified,
its nature (`consensus`, `école`, `cours`, `fait`); (3) a stance or a neighbour is sourced in
its frontmatter item (`refs`, `verified`), never by a row; (4) a claim only `teaching.md`
states is a gap of the concept (added to `concept.md`, then test 2) or no claim to source (a
teaching device): no row is teacher-only; (5) a claim no source settles and the course does not
state goes in « Non vérifié », opening with its section, as what must not be asserted and why,
with the instruction when useful (« écrire X, pas Y »); the trace of a removed claim is
dropped, git history holds it. Free text (« aucune », « fil rouge ») and a path to another
concept are not sources. The site builds every row; « Non vérifié » is the one section never
built. `SPEC.md` 4.1 and 4.4 and the `sources` and `concept-folder` checks carry it (#217,
triage T04, T05, T07, R-B1, R-B3, R-R2 of 2026-10-29). This replaces decision
`where-a-claim-goes` (#99).

## Options ruled out

- Amending `where-a-claim-goes`: its tests 2 and 3 and the one filter it grounds change in
  substance, and an agent reading its body would still write teacher-only and stance rows.
- A course-level `references.md`: it wins only on repeated descriptions, and loses for the
  site, the teacher, parallel writers and the reviewer, who would leave the concept folder.
- A source "the model's knowledge": it fits only the course's own examples, which nature
  `cours` names, and would make a guardrail look like a source.
