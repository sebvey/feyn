---
date: 2026-10-27
issue: 27
status: accepted
area: repo
---

Without this, an agent asked to make a concept read better on the site would edit a page or a
data file under `site/` (or add a site-only override field) instead of `concept.md`, and add a
stamp to detect drift, so the site and the teacher would show different texts again, as the
hand-rewritten MDX of `parcours-po-website` did (five realignments in two days).

Everything the site shows and everything the teacher teaches comes from a course file, without
rewriting. The site and the classroom are builds of `courses/<id>/`, never edited by hand and
without a version of their own. A site-only text, data copied out of the course, or an
alignment stamp is a defect: a missing text is added to the course, under its spec. This
replaces the MDX copy of each concept, the three `src/data/*.ts` files and
`check-alignment.mjs` of `parcours-po-website`.

## Options ruled out

- The site as a rewritten copy of the course, kept in line by stamps: every fix to the course
  triggered a realignment, even when nothing the reader sees changed.

## Consequences

- A text the site needs and the course does not have (a domain page sentence, a caption) is
  given a place in the spec first, then written in the course.
- Where these files live is decision `monorepo-feyn`; which of them the site builds is decision
  `reader-facing-and-teacher-only-files`.
