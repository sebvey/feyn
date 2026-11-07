---
date: 2026-11-07
issue: 707
status: accepted
area: site
---

Without this, a contributor giving a convention of the course text its look on the site would render it with an MDX component or an HTML snippet written into the course, or rewrite the course text to fit a component (a marker reworded, a text capitalised after its field's name), so the course would no longer be plain Markdown the teacher reads as written, and the site would show a text the course does not hold.

The site's engine maps each convention of the course text (`course/README.md` 3.5 of the spec, its rules in `course/rules.yaml`) onto the HTML of a page by its own code, from the published text of the document the spec half of the site build gives it, and changes no word of that text. The course's Markdown, CommonMark, is rendered as written by a remark pipeline, raw HTML left out: `**gras**` is bold, and nothing else of the course is read as markup. A concept reference becomes a link to the page of its concept, section or unit, by a remark plugin that recognises only the references the document lists with their targets (its `concept_refs`, found by the spec's parser), so a bare id stays plain text. A stance marker (`[consensus]`, `[école]`, `[cours]`, the course lexicon's `markers`) becomes the badge of its stance (the old site's `Pastille`) holding the marker's word, kept out of the search index. A field is shown after its name from the lexicon and the separator « : », its text as written, its first letter kept (« Objectif : dire si … », « Réponse attendue : trop peu : … »): no script capitalises a course text. French typography (no-break spaces before « : » and inside « », narrow ones before « ; ? ! », curly apostrophes) is applied to every page's HTML at build time, outside code, adding spaces and curling apostrophes only. The course holds no MDX, no HTML and no directive (decision `markdown-conventions-not-mdx`); a new convention of the course gets its mapping here, in the engine, never a markup in the course.

## Options ruled out

- MDX components or HTML in the course for markers and references: the course would depend on the site's components and the teacher would read their markup (decision `markdown-conventions-not-mdx`).
- Capitalising a text after its field's name: it rewrites the course, and lowercase after « : » is correct French.
- The engine finding concept references by its own pattern: a second parser of the course, which would link what the spec leaves as plain text.

## Consequences

- A convention added to the course text (`course/README.md` 3.5 and its rules) needs its mapping in the engine (`src/lib/site.ts` for the text, `src/lib/typo-fr.ts` and `src/middleware.ts` for the typography), described in `site-builder/README.md`, "How the engine lays the document out".
