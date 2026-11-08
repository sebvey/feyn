---
date: 2026-10-27
issue: 27
status: accepted
area: repo
---

Without this, an agent asked to make a concept read better on the site would edit a page or a data file under `site-builder/` (or add a site-only override field) instead of `concept.md`, and add a stamp to detect drift, so the site and the teacher would show different texts again, as the hand-rewritten MDX of `parcours-po-website` did (five realignments in two days).

Every course text the site shows and the teacher teaches comes from a course file, without rewriting. The course is the input of the builds of its products: the site and the classroom are builds of `courses/<id>/`, never edited by hand and without a version of their own. A site-only text, data copied out of the course, or an alignment stamp is a defect: a missing text is added to the course, under its spec. This replaces the MDX copy of each concept, the three `src/data/*.ts` files and `check-alignment.mjs` of `parcours-po-website`.

## Options ruled out

- The site as a rewritten copy of the course, kept in line by stamps: every fix to the course triggered a realignment, even when nothing the reader sees changed.

## Consequences

- A text the site needs and the course does not have (a domain page sentence, a caption) is given a place in the spec first, then written in the course.
- Where these files live is decision `monorepo-feyn`; what of them the site builds is decision `unit-is-the-content-unit`.
- Amended 2026-11-06 (#638): a third build of the same source, the course-creator, comes later; it leads a creator along the creation path of a course and rewrites none of its texts (epic #475).
- Amended 2026-11-07 (#695): a text the site shows the same for every course of a spec (the words that name a thing of the course on its pages, the intro lines of its stance columns and of its claims) lives in the spec's `products/site/` folder, with the addresses of its pages; the words of the site's interface and the « À propos » page live in `site-builder/`, the site's own text about itself, never a course text (epic #598, Material point 14). A course text the site shows still comes from the course, never rewritten. Without this, a contributor would write those texts in `site-builder/` as site-only texts, or in each course, the same text copied into every course of the spec.
- Amended 2026-11-08 (#730): renamed after the products and their course, and reworded: the course is the input of the builds of its products, the site and the teacher; the course-creator, a product of its own, is not a build, since a build starts from a course and the course-creator writes one (decision `product-line-vocabulary`; epic #729, Material points 1 and 2). It still rewrites none of the texts of the course it leads to. Without this, a contributor would design the course-creator as a script run on a course, like the site build, which has no course to start from.
