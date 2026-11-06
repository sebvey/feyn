<!--
Template of courses/<id>/concepts/<NN>-<slug>/concept.md, the concept file (course/README.md sections 3.1 to 3.3, 3.5 and 3.6; its form is course/form.yaml). One file per concept: the site builds its published parts only, the teacher reads it whole. Nothing about one learner. How to use: copy to the concept folder, replace every <placeholder>, delete this comment (from the opening to the closing mark, marks included: no HTML in course Markdown).
- Every heading starts with its kind, and one kind is always at one level: the title at #, the head, the sections and the foot at ##, the blocks of the head and the foot and the units at ###, the blocks of a unit and its supplementary cases at ####.
- The title opens the body: `# Concept <n> : <title>` (an annex `# Annexe <id> : <title>`), the title the one course.yaml gives the concept, which keeps it too. The objective is in course.yaml only, and the concept's « Pièges » on the site is built from the « Pièges » of its units: neither is written here. The ## parts come in this order and no other ## exists: the head, « Ouverture » (its block « L'essentiel »), the sections, the foot, « Clôture » (its blocks « Se vérifier », « Approfondissement », « Consigne », each optional: delete the ones you do not write, and « Clôture » with them when none is left).
- The headings are the tree of the concept: one ## section per group of units, `## Section <id> : <title>`, the id the concept number and a letter from a, in order (`<n>a`, `<n>b`); its units, `### Unité <id> : <title>`, the id its own and a digit from 1, in order, one at least and nine at most (`<n>a1`). A section holds its units and nothing else; a section with a single unit keeps its ### heading (as `<n>b` below). A unit is one teacher message.
- A unit is four #### blocks, in the order of writing: teach, ask, foresee the mistakes, instruct. Each heading names the block, then its reader in parentheses: « pour tous » (published: the site, the teacher and the learner read it), « teacher seulement » (never published: what the learner hears of it, the teacher chooses and says). « Leçon (pour tous) », its fields « Matière » and « Ancrage »; « Exercice (teacher seulement) », its fields « Question » and « Réponse attendue »; « Pièges (pour tous) », the misconceptions; these three mandatory; then « Consigne (teacher seulement) », optional: delete it when the unit has none. No line of a unit stands outside a block.
- In « Leçon » and « Exercice », each field opens with its label, `- **<label>** : <text>`, its following lines indented two spaces (paragraphs, nested lists), and no line stands outside a field. « Pièges » holds its misconceptions directly, one bullet each, `- « <misconception> » : <correction>`, and nothing nested under it. « Consigne » is prose: what the method has proper to the unit.
- A question the course asks again and again, its own way of making the learner think (« et alors ? », « d'où vient ce chiffre ? »): in the « Consigne » of its unit, in the « Consigne » of the foot when it holds for the whole concept, or in a free section of plan.md when it holds for the whole course; never under a misconception (rule course-question-in-instruction).
- A supplementary case, after the unit's blocks: `#### En stock, <qualifier> (teacher seulement) : <title>`, the qualifier « rechange », « entraînement » or « aparté »; its question is the one held in stock, asked when its qualifier says. Its fields, labelled, in this order: « Ancrage », « Question », « Réponse attendue », then « Pièges », its misconceptions nested under it. Unpublished. To have none, delete it.
- The additions of a unit (course/README.md 3.6): a term a unit puts in bold should be in glossary.md, bold for emphasis staying possible (rule bold-term-in-glossary, a recommendation: a bold that is no term is reported); a fact its anchor uses is in « Faits fixés » of storyline.md, with the unit's id (rule anchor-uses-storyline-facts); a claim of a published field has its row in « Affirmations » of sources.md (rule published-claims-in-claims). The matter stays general: it neither takes up the situation of the anchor or of a case nor states the verdict of the expected answer, and the anchor, the questions and the expected answers do not restate the matter (rule no-restatement-matter-and-cases).
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

# Concept <n> : <concept title>

## Ouverture

### L'essentiel

<the definition and why it matters, a few lines>

## Section <n>a : <title of a>

### Unité <n>a1 : <title of a1>

#### Leçon (pour tous)

- **Matière** : <matter of a1: what is true, as the site publishes it and the teacher says it>
- **Ancrage** : <the storyline situation where a1 shows: actors, facts, who says what>

#### Exercice (teacher seulement)

- **Question** : <the question of a1>
- **Réponse attendue** : <the right answer, with its nuances>

#### Pièges (pour tous)

- « <a frequent wrong answer> » : <its correction>

#### Consigne (teacher seulement)

<what the method has proper to a1: when to pose its supplementary case>

#### En stock, rechange (teacher seulement) : <title of a supplementary case of a1>

- **Ancrage** : <another storyline situation, standing alone>
- **Question** : <its question>
- **Réponse attendue** : <its right answer>
- **Pièges** :
  - « <a frequent wrong answer> » : <its correction>

### Unité <n>a2 : <title of a2>

#### Leçon (pour tous)

- **Matière** : <matter of a2>
- **Ancrage** : <the storyline situation where a2 shows>

#### Exercice (teacher seulement)

- **Question** : <the question of a2>
- **Réponse attendue** : <the right answer of a2>

#### Pièges (pour tous)

- « <a frequent wrong answer of a2> » : <its correction>

## Section <n>b : <title of b>

### Unité <n>b1 : <title of b1>

#### Leçon (pour tous)

- **Matière** : <matter of b1, the single unit of its section>
- **Ancrage** : <the storyline situation where b1 shows>

#### Exercice (teacher seulement)

- **Question** : <the question of b1>
- **Réponse attendue** : <the right answer of b1>

#### Pièges (pour tous)

- « <a frequent wrong answer of b1> » : <its correction>

## Clôture

### Se vérifier

<the question the learner asks themself to check an answer, on the whole concept>

### Approfondissement

<more matter on the concept, for the learner who asks to go further>

### Consigne

<the method proper to the whole concept, which no unit says alone>
