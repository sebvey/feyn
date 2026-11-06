<!--
Template of courses/<id>/concepts/<NN>-<slug>/concept.md, the concept file (course/README.md sections 3.1 to 3.3 and 3.5; its form is course/form.yaml). One file per concept: the site builds its published parts only, the teacher reads it whole. Nothing about one learner. How to use: copy to the concept folder, replace every <placeholder>, delete this comment (from the opening to the closing mark, marks included: no HTML in course Markdown).
- No H1: the title is in course.yaml; the objective too, and « Pièges » is built from the misconceptions: neither is written here. The ## parts come in this order and no other ## exists: the head (« L'essentiel »), the sections, the foot (« Repères », « Approfondissement », « Consigne », each optional: delete the ones you do not write).
- The headings are the tree of the concept: one ## section per group of units, `## <id> <title>`, the id the concept number and a letter from a, in order (`<n>a`, `<n>b`); its units, `### <id> <title>`, the id its own and a digit from 1, in order, nine at most (`<n>a1`). A section holds its units and nothing else. A section of one unit has no ###: it holds the fields of that unit (as `<n>b` below). A unit is one teacher message.
- A unit is a list of fields, in this order: « Matière », « Ancrage », « Question », « Réponse attendue », « Idées fausses » (mandatory), then « Repères », « Consigne » (optional). A field's text follows its label; its following lines are indented two spaces (paragraphs, nested lists). No line of a unit stands outside a field. Published: « Matière », « Ancrage », « Idées fausses » without their follow-ups, « Repères »; the rest is the teacher's.
- « Idées fausses »: one nested bullet per misconception, `- « <misconception> » : <correction>`; its follow-ups nested under it, `- **Relance** : <follow-up>`.
- A supplementary case: `#### <title> (<qualifier>)` inside a unit, the qualifier « rechange », « entraînement » or « aparté »; the fields of a unit without « Matière » and « Consigne ». Unpublished. To have none, delete it.
- Concept references are plain text: `concept 4`, `concepts 5 et 7b`, `annexe A2`. Stance markers `[cours]`, `[école]`, `[consensus]` come right after the claim they qualify.
- Frontmatter: `stances` (three keys, each a list, possibly empty), `neighbors` (optional). An item has `text` (bold and italics only), `author` (expected on consensus and school), `refs` (ids of sources.md, possibly empty) and, when `refs` is not empty, `verified`: one entry per id, in the same order, the shortest quotation in « » and its place in parentheses. They are the one place for the stances and their sources: the body has no stances section, « Affirmations » of sources.md has no stance row, and the site builds them from the frontmatter.
- A diagram is optional: to have none, delete the `diagrams` key. To have one: draw it from diagram.svg and declare it in `diagrams` (all four keys), `unit` the id of the unit it illustrates; the build places it there. No image in the body.
- « Approfondissement »: more matter for the learner who asks to go further, sourced in sources.md; no unit relies on it. « Consigne » of the foot: the method proper to the whole concept, which no unit says alone.
-->
---
stances:
  consensus:
    - text: "<what is accepted>"
      author: "<the text or author it belongs to>"
      refs: [S1]
      verified: ["<« the shortest quotation » (its place)>"]
  school:
    - text: "<a school of thought's choice>"
      author: "<author or current>"
      refs: [S2]
      verified: ["<« the shortest quotation » (its place)>"]
  course:
    - text: "<the course's own choice>"
      refs: []
neighbors:
  - text: "<a neighbouring notion not to confuse with this concept>"
    refs: []
diagrams:
  - file: <diagram-stem>.svg
    title: "<one line: SVG title>"
    caption: "<what the diagram shows, as the teacher says it>"
    unit: <n>a1
---

## L'essentiel

<the definition and why it matters, a few lines>

## <n>a <title of a>

### <n>a1 <title of a1>

- **Matière** : <matter of a1: what is true, as the site publishes it and the teacher says it>
- **Ancrage** : <the storyline situation where a1 shows: actors, facts, who says what>
- **Question** : <the question of a1>
- **Réponse attendue** : <the right answer, with its nuances>
- **Idées fausses** :
  - « <a frequent wrong answer> » : <its correction>
    - **Relance** : <a follow-up question>
- **Repères** : <what the learner keeps to recognise a1>
- **Consigne** : <what the method has proper to a1: when to pose its supplementary case>

#### <title of a supplementary case of a1> (rechange)

- **Ancrage** : <another storyline situation, standing alone>
- **Question** : <its question>
- **Réponse attendue** : <its right answer>
- **Idées fausses** :
  - « <a frequent wrong answer> » : <its correction>

### <n>a2 <title of a2>

- **Matière** : <matter of a2>
- **Ancrage** : <the storyline situation where a2 shows>
- **Question** : <the question of a2>
- **Réponse attendue** : <the right answer of a2>
- **Idées fausses** :
  - « <a frequent wrong answer of a2> » : <its correction>

## <n>b <title of b>

- **Matière** : <matter of b, a section of one unit>
- **Ancrage** : <the storyline situation where b shows>
- **Question** : <the question of b>
- **Réponse attendue** : <the right answer of b>
- **Idées fausses** :
  - « <a frequent wrong answer of b> » : <its correction>

## Repères

<what the learner keeps of the whole concept: a question to ask oneself, a rule of thumb>

## Approfondissement

<more matter on the concept, for the learner who asks to go further>

## Consigne

<the method proper to the whole concept, which no unit says alone>
