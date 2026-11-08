---
date: 2026-11-08
issue: 730
status: accepted
area: repo
---

Without this, a contributor writing the manifest of a spec (epic #522) would put the course and the teacher in one folder of products and leave the site and the course-creator out of it, would design the course-creator as a third build run on a course, and would name a second spec by its type alone, so the tree, the manifest and the vision would each count the products differently, and a creator would pick for a course in English a spec whose name hides that it is French.

feyn makes three products, the site, the teacher and the course-creator: the site and the teacher are built from a course, the course-creator writes one, and the course itself is the input of those builds, not a product; `docs/vision.md` says so, which this decision amends. The tree follows the product lines: a spec MAJOR lives in `product-lines/<name>/<MAJOR>/`, which holds `course/` and, later, `products/` with one folder per product (`site/`, `teacher/`, then `creator/`); the builder of the teacher is `teacher-builder/`, as the site's is `site-builder/`. A spec is named by its type and its language (`linear-fr`), the two things that make a course follow it. This replaces the two products of the vision, the course-creator as a third build of the course, the root `product-lines/`, the folder `teacher-builder/` and a spec name that leaves its language out.

## Options ruled out

- The course as a product: the vision would be rewritten around it, and a folder of products would not hold all of them.
- The course-creator as a build of the course: a build starts from a course, and the course-creator starts from none.
- `course/`, `site/` and `teacher/` side by side in a spec MAJOR for good: the tree would hide which folder is the course and which are the products.
- A spec named by its type alone (`linear`): it would read as the one that holds for every language, while a course of another language follows another spec.

## Consequences

- The paths, the spec's name and the test of `check-spec` that holds its language to `spec.yaml`, the builder of the teacher and its script, the GitHub label and milestone, the area table of `/feyn-issue` and the deploy workflows follow in the renaming story of epic #729, before the epic reaches `main`; until it lands, the tree keeps `product-lines/linear-fr/1/` and `teacher-builder/`.
- The move of `site/` and `teacher/` under `products/` is epic #522's, after this one.
- Decisions `conformity-of-the-course-and-products`, `products-built-from-one-course`, `spec-files-by-product`, `lexicon-not-language-pack`, `versioned-objects-and-spec-layout`, `teacher-frozen-until-the-protocol-brainstorm` and `agentic-rules-file` are reworded or amended to match.
