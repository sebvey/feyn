<!--
Template of courses/<id>/concepts/<NN>-<slug>/concept.md (SPEC.md sections 4.1, 4.2, 4.5).
Reader-facing: the site builds it, the teacher teaches from it. Nothing about one learner.
How to use: copy to the concept folder, replace every <placeholder>, delete this comment
(from the opening to the closing mark, marks included: no HTML in course Markdown).
- No H1: the title is in course.yaml. The ## sections come in this order and no other ## exists.
- « Objectif » is the `objective` of course.yaml, verbatim, with a capital and a final period.
- One ## section per first-level sub-concept of course.yaml, in order: `## <id> <title>` (the
  title as in course.yaml), then the promise, one paragraph all in italics. With children it
  holds only the ### sections of its children; without, its reader text follows the promise.
- Concept references are plain text: `concept 4`, `concepts 5 et 7b`, `annexe A2`. Stance
  markers `[cours]`, `[école]`, `[consensus]` come right after the claim they qualify.
- Storyline blockquote: starts with `**Fil rouge :**`; no other blockquote in the sub-concept
  sections.
- Frontmatter: `stances` (three keys, each a list, possibly empty), `neighbors` (optional).
  An item has `text` (bold and italics only), `author` (expected on consensus and school) and
  `refs` (ids of sources.md, possibly empty). They are the one place for the stances: the
  body has no stances section, and the site renders them from the frontmatter.
- A diagram is optional: to have none, delete the `diagrams` key and the image line below. To
  have one: draw it from diagram.svg, declare it in `diagrams` (all four keys), and put the
  image alone in its paragraph, once, in the section of its `subconcept` or in « L'essentiel »;
  the alt text is the declared `title`.
- « Pièges »: one bulleted list, each item opening with the pitfall in bold. « Le test
  rapide »: one blockquote (the question), then at most one paragraph (the note).
- « Approfondissement » is optional: more matter for the learner who asks to go further,
  sourced in sources.md; no case relies on it. To have none, delete the section.
-->
---
description: "<one sentence for the site>"
stances:
  consensus:
    - text: "<what is accepted>"
      author: "<the text or author it belongs to>"
      refs: [S1]
  school:
    - text: "<a school of thought's choice>"
      author: "<author or current>"
      refs: [S2]
  course:
    - text: "<the course's own choice>"
      refs: []
neighbors:
  - text: "<a neighbouring notion not to confuse with this concept>"
    refs: []
diagrams:
  - file: <diagram-stem>.svg
    title: "<one line: SVG title and image alt>"
    caption: "<what the diagram shows, as the teacher says it>"
    subconcept: <n>a1
---

## Objectif

<concept objective, capitalised, with a final period>

## L'essentiel

<the definition and why it matters, a few lines>

![<one line: SVG title and image alt>](<diagram-stem>.svg)

## <n>a <title of a>

*<promise of a: what the learner will be able to say after it, in one sentence>*

### <n>a1 <title of a1>

<reader text of a1: the explanation as a site reader reads it>

> **Fil rouge :** <a storyline fact that illustrates a1>

### <n>a2 <title of a2>

<reader text of a2>

## Pièges

- **<a pitfall>** : <why it happens and how to spot it>
- **<another pitfall>** : <why it happens and how to spot it>

## Le test rapide

> <one question that checks in ten seconds that the concept is applied>

<the note: what a right answer looks like>

## Approfondissement

<more matter on the concept, for the learner who asks to go further>
