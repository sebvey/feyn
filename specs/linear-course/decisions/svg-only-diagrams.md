---
date: 2026-10-27
issue: 27
status: accepted
area: spec:linear-course
---

Without this, an agent drawing a flow diagram (the life of a story) would write it in Mermaid,
which is shorter, or as an Astro component under `site/`, so the desktop panel would show the
Mermaid code instead of the drawing, and the teacher could not send a component at all: the
learner in Claude Code loses the diagram.

A diagram is one SVG file in the concept folder, under the drawing contract (`SPEC.md`
section 7, check `svg-contract`), declared in the frontmatter of `concept.md` with a title (the SVG
`<title>` and the image alt) and a caption that the teacher says and the site shows as legend
(`SPEC.md` 4.1, 4.5). Flow diagrams are SVG too: boxes,
arrows, `<text>`. Mermaid, site components and Excalidraw are not course sources. This rests on
the test of 2026-10-26 in Claude Code desktop: an SVG sent to the panel rendered, a Mermaid file
showed as text. It replaces the 23 Astro diagram components of `parcours-po-website`, which the
teacher could not show.

## Options ruled out

- Mermaid: not rendered in the desktop panel.
- Diagrams as site components: invisible to the teacher, and they tie the course to the site.

## Consequences

- An SVG is longer to write than Mermaid; the contract and its check make an agent's SVG
  reliable.
- When the teacher shows a diagram is not this decision's: protocol rules `diagram-only-on-request`,
  `requested-diagram-shown` and `diagram-fallback` settle it.
