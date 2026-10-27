---
date: 2026-10-27
issue: 27
status: accepted
area: spec:linear-course
---

Without this, an agent needing a new reader construct (a definition callout, say) would add an
MDX component or a `:::` directive to the spec and to `concept.md`, so the teacher would read
component markup, and the course could no longer be built without the site's components.

Course Markdown is plain CommonMark with YAML frontmatter: no HTML, no MDX, no remark directive
(`SPEC.md` section 2). The structure the site needs comes from the reader-text conventions of
`SPEC.md` 4.5 (sub-concept headings, concept references, stance markers, storyline blockquote,
diagram images, pitfalls, quick test), enforced by the `conventions` check; the teacher reads
the same file as ordinary Markdown. A new construct gets a natural Markdown form, added to 4.5
and its check, and a site plugin; a directive stays a last resort for a construct with no
natural form, and none of today's needs one. This replaces the MDX bodies of
`parcours-po-website` and their nine components. This decision binds the course side; how the
site maps each convention is the site's decision `markdown-conventions-mapped-by-plugins`.

## Options ruled out

- MDX in the course: it couples the course to the site's components and is noise for the
  teacher.
- Remark directives (`:::storyline`): no construct of the course needs one.

## Consequences

- The visual work of the site is kept; only where its structure comes from changes, at the
  cost of a plugin layer in `site/`.
