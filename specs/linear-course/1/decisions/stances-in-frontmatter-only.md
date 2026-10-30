---
date: 2026-10-28
issue: 97
status: accepted
area: spec:linear-course
---

Without this, the migration workflow (S1-09, #22) would write each concept's stances twice, in
the frontmatter `stances` and in a « Consensus et choix d'école » body section, for 20 concepts,
and the two copies would drift with no check to catch it: the concept 9 prototype already did
(the frontmatter said « concept 3 » and « concept 17 » where the section said « concept 3b » and
« concept 17b1 », and lacked the section's « concept 7 » on INVEST), so the site and the teacher
would show two versions of the same stance.

The stances and neighbours of a concept live in the frontmatter of `concept.md` only: `stances`
(consensus, school, course) and `neighbors` (`SPEC.md` 4.1). The body has no « Consensus et
choix d'école » section; the site renders them from the frontmatter under `headings.stances`,
and `concept-folder` fails a concept that still has the section. `headings.stances` stays in the
language pack as that heading and as the section a `sources.md` claim names for a stance or a
neighbour; the site builds those rows (`SPEC.md` 4.4). This replaces the mandatory body section
of `SPEC.md` 4.2 and its review-only rule « says nothing the frontmatter contradicts ».

## Options ruled out

- A fixture with the old section passing, ignored: an old concept file copied by the migration
  would bring the second copy back unseen.
- Dropping `headings.stances`: the stance claims of `sources.md` would name no built section,
  and the site would stop building them.

## Consequences

- Rule `stances-told-apart` of `PROTOCOL.md` reads the frontmatter `stances` and carries over, not decides, the
  hint « à présenter comme tels » the old concept files had in that section: « Présente les
  choix du cours comme tels : des choix du cours, qu'aucune source n'énonce tels quels. »
  `SPEC.md` 4.1 `stances.course` says the same.
- Decision `reader-facing-and-teacher-only-files`: its one filter includes `headings.stances`.
