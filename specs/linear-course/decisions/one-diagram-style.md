---
date: 2026-10-28
issue: 181
status: accepted
area: spec:linear-course
---

Without this, each writer of a diagram (a migration agent per concept, `course-batch` later)
would choose its own meaning for `primary`, `secondary` and `muted`, and the same notion would be
drawn in a different colour from one concept to the next: in wave 2 of S1-10, the old main text
colour became `muted` in concept 2, `primary` in concepts 3 and 4, `secondary` in concept 5.

Every diagram of a course is drawn in one style, `SPEC.md` section 7.2: one meaning per class
(`primary` what the diagram teaches, its focus; `secondary` the contrast, a second element set
against the first; `muted` the context and the ordinary text), one list of inks (a pair of class
and opacity per role: focus, contrast, text, line, outline, fills), the common forms (a label on
a fill in a window, a cut as a gap, a hatch, an element's own opacity kept on top of its ink) and
the usual measures (stroke widths, text sizes, corner radii). It binds every writer of a diagram,
and a review checks it: the drawing contract of section 7.1 stays the only part a script checks.
The migration of `parcours-po` follows it through one colour table, old token to ink, fixed in
`migrate-concept` for every concept; it replaces the colour mapping that an agent decided per
concept (#23, #173). The meaning of the classes and the counterfactual were accepted by the
maintainer on 2026-10-28 (work session, « Je valide le sens des trois classes »,
« Contrefactuel validé »).

## Options ruled out

- One colour mapping per concept, decided by an agent: the wave-2 drift above.
- The old site's tokens kept as classes: the contract allows three classes, so the site and the
  desktop panel can re-tint a diagram without knowing ten tokens.

## Consequences

- The diagrams of concepts 0 to 5 and 9, migrated before this, are realigned on the style (#180);
  `course-batch` follows it for new diagrams (#142).
- A token the colour table lacks stops a migration: the table grows through an issue, never in a run.
