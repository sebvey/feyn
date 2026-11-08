---
date: 2026-11-07
issue: 720
status: accepted
area: spec:linear-fr
---

Without this, an agent building the site of a course would keep a logo and a colour in the site engine, so that every course's site shows the same drawing and the same blue; or would declare the logo by a free path in `course.yaml`, a key and a file to keep in line; or would let a course set its whole palette, so that the contrast of each theme becomes a check of every course and breaks on the first course that misses it.

What is one course's own look lives in the course, as two mandatory parts. The logo is `logo.svg` at the root of the course folder, its name fixed by the spec and named by no key of `course.yaml`: square, since it sits in square slots (the site's header, the favicon); one colour, `currentColor`, the contract of the diagrams (decision `one-diagram-style`: readable in one colour), so that the site paints it in the course's accent colour in each theme, the one the reader picks with the site's button included; with no script and no external resource, so that the build renders the favicon and the share image from it alone. The accent colour is `site.accent_color` of `course.yaml`, one `#rrggbb`: the engine keeps its hue and derives the whole accent family of each theme with its own lightness, so that contrast stays the engine's. The block `site` says only how a course looks on its site, never whether it has one: every course has a site, on its three channels. The checks of the course hold both, a missing logo being a blocking failure; the half of the site build that depends on the spec passes them to the engine as the course declares them, the logo as its file's text, and the engine derives everything else and keeps no default of either. This replaces the optional `site` block, its free path to an SVG and its optional colour, which no course declared and no build read.

## Options ruled out

- The presence of the block `site` deciding whether a course is deployed, or a switch to publish it: no course is to have no site, and the course's tag already guards the public channel.
- A free path to the logo in `course.yaml`, or a fixed name kept as a key: a key and a file to keep in line, or a key that never changes.
- A default logo in the engine: the engine keeps a logo, and every course without one looks the same.
- A logo with its own colours: they follow only the system's theme, not the one the reader picks, and make two sources of colour; a logo with no contract, which no check can hold.
- A light and a dark accent colour, or the whole palette, given by the course: contrast becomes a check of every course.
- A default accent colour: every course that forgets it looks the same.
- The half of the site build that depends on the spec computing the palette: part of the site's look would then live in the spec.
- A template of a logo among the templates of a course: copied unchanged, it gives several courses the same logo.
