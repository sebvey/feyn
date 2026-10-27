# 04. Diagrams

## Requirement

A diagram is defined **in the course** and serves both builds: the site shows it, the teacher
can show it to the learner in Claude Code (desktop). Today diagrams are 23 Astro components
(~2400 lines) of the site, invisible to the teacher.

## What we tested (2026-10-26, Claude Code desktop)

- An **SVG** sent with `SendUserFile`, `display: render`: a card in the conversation, rendered
  in the side panel by a browser. **Good enough.**
- A **Mermaid** file (`.mmd`) sent the same way: shown as text (the code), no rendering.
  **Ruled out.**
- The terminal CLI shows no image: a CLI learner gets the caption and the site link.

## Decision: one format, SVG, under contract

A diagram = one `.svg` file in the concept folder, declared in the frontmatter of
`concept.md` (`diagrams`), with a textual **caption** (title, legend, what it shows) that the
teacher reads and says, and that the site uses as legend and `alt`.

Flow diagrams (life of a story, sprint loop) are also drawn in SVG: boxes, arrows, text.
Longer than Mermaid, but the agent writes it under contract and the script validates it.

Excalidraw is not a source: it serves the maintainer to think, not the course.

## The drawing contract (in the spec)

A course SVG:
- has a `viewBox` and no fixed `width`/`height`; the site and the panel resize it;
- uses only `currentColor` and **three semantic classes** (for example `primary`, `secondary`,
  `muted`) for colours; the site's stylesheet (and dark theme) defines them; in the desktop
  panel, `currentColor` follows the text colour;
- writes its text in `<text>` (indexable, readable, translatable), never as paths;
- groups its parts in named `<g id="…">` by sub-concept and element (`id="9a1-couches"`,
  `id="9a1-couteau"`), so the caption can name them and a future progressive display is
  possible;
- contains no script, no embedded bitmap, no external font;
- stays under a reasonable size (to fix: a few tens of KB).

A check (`specs/linear-course/checks/svg-contract`) validates each file: well-formed XML,
forbidden attributes absent, allowed classes only, `<text>` present if the diagram carries
words, `viewBox` present.

## Teacher side

A `show-diagram` skill (in `teacher/skills/`): when the learner asks for a diagram (the
protocol keeps today's rule: never offered, only on request), the teacher reads the caption in
`concept.md`, sends the classroom's SVG file with `display: render`, and says the caption in
one or two lines. In the CLI it can only describe: it says the caption, says it cannot show the drawing here,
and gives the link to the concept's site page (decided 2026-10-27: no learner is excluded).

## Site side

The site reads the SVGs as they are (inline or `<img>`, decided at stage 3 against dark theme
and Pagefind), with the frontmatter caption. The 23 Astro components disappear; their SVGs are
extracted once at migration (see `10-migration.md`).

## Known limit, accepted

Nothing checks automatically that the SVG says the same thing as its caption. A human review
(or a review subagent in the batch workflow) does.
