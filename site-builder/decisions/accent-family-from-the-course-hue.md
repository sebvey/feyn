---
date: 2026-11-07
issue: 721
status: accepted
area: site
---

Without this, an agent giving a course's site its look would write a palette per course in the engine's stylesheet, or paint the links, the duration badges and the diagrams in the course's accent colour as it is declared, whatever its lightness against the background of each theme, and leave the focus in the fixed orange, so that a second course's site would need its own stylesheet, a dark accent colour would make the links unreadable in the dark theme, and a brown or orange accent would hide the keyboard focus beside the links.

The site's engine derives the whole accent family of a course's site from the hue of the course's accent colour (decision `course-logo-and-accent-colour` of the spec), at build time, in OKLCH. It keeps that hue and gives each token of the family (the accent and its ink, the duration badges, the diagrams' fills and their ink in the dark theme) the lightness and chroma its place has, in each theme: those of the blue family the engine wrote before, measured once, the lightness being what carries the contrast with the background; a chroma that leaves the sRGB gamut is reduced until it is in. The focus takes the hue opposite the accent (the accent's plus 180°) with the lightness and chroma of the former orange focus, which was that opposite of the former blue. An accent colour with no hue (a grey) gives a grey family, the focus then keeping its chroma on the former orange's hue so that it stays apart from the links. The tokens are written as custom properties in the same three blocks as the rest of the palette (the light theme, the system's dark theme, the dark theme the reader chose). The header paints the course's logo in the accent through `currentColor`, so that it follows the theme the reader picks; the favicon, the `theme-color` of each theme and the share image are drawn by the build from the logo and the accent of each theme. The engine's stylesheet writes no accent and no focus value, and the engine keeps no logo.

## Options ruled out

- A course declaring a light and a dark accent colour, or its whole palette: the contrast of each theme becomes a check of every course.
- The declared colour used as it is: its lightness, chosen for one background, fails the other theme.
- A focus in the ink colour: less visible beside the text.
- The fixed orange focus: it disappears beside a brown or orange accent.

## Consequences

- A token added to the accent family gets its lightness and chroma, per theme, in the engine's derivation, never a colour in the stylesheet.
