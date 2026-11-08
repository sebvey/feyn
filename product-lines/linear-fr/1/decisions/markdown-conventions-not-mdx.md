---
date: 2026-10-27
issue: 27
status: accepted
area: spec:linear-fr
---

Without this, an agent needing a new reader construct (a definition callout, say) would add an MDX component or a `:::` directive to the spec and to `concept.md`, so the teacher would read component markup, and the course could no longer be built without the site's components.

Course Markdown is plain CommonMark with YAML frontmatter: no HTML, no MDX, no remark directive (the rules of the course folder in `course/rules.yaml`). The structure the site needs comes from the form of the concept file (its headings, its labelled fields, `course/form.yaml`), held by the `concept-file` and `unit-contract` checks, and from the conventions of the text, the rules of `course/rules.yaml` for `course/README.md` 3.5 (concept references, stance markers, no image), enforced by the `conventions` check; the teacher reads the same file as ordinary Markdown. A new construct gets a natural Markdown form, added to those rules and their check, and a site plugin; a directive would need this decision and the `conventions` check to change, and none of today's constructs needs one. This replaces the MDX bodies of the site repository that preceded feyn and their nine constructs. This decision binds the course side; how the site maps each convention is the site decision `markdown-conventions-mapped-by-plugins` (`site-builder/decisions/`).

## Options ruled out

- MDX in the course: it couples the course to the site's components and is noise for the teacher.
- Remark directives (`:::storyline`): no construct of the course needs one.

## Consequences

- The visual work of the site is kept; only where its structure comes from changes, at the cost of a plugin layer in `site-builder/`.
