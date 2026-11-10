<!--
Template of courses/<id>/concepts/<NN>-<slug>/concept.md, the concept file (course/README.md sections 3.1 to 3.6; its form is course/form.yaml). One file per concept: the site builds its published parts only, the teacher reads it whole. Nothing about one learner. How to use: copy to the concept folder, replace every <placeholder>, delete this comment (from the opening to the closing delimiter, delimiters included: no HTML in course Markdown).
- Every heading starts with its kind, and one kind is always at one level: the title at #, the head, the sections and the foot at ##, the blocks of the foot and the units at ###, the blocks of a unit at ####, the cases of its « Cas du fil rouge » at #####.
- The title opens the body: `# Concept <n> : <title>` (an annex `# Annexe <id> : <title>`), the title the one course.yaml gives the concept, which keeps it too. The objective is in course.yaml only: it is not written here. The misconceptions of the concept are those of its units, written in their « Leçon ». The ## parts come in this order and no other ## exists: the head, « L'essentiel » (its text, no ### block), the sections, the foot, « Clôture » (its blocks « Se vérifier », « Approfondissement », « Consigne au professeur », each optional: delete the ones you do not write, and « Clôture » with them when none is left).
- The headings are the tree of the concept: one ## section per group of units, `## Section <id> : <title>`, the id the concept number and a letter from a, in order (`<n>a`, `<n>b`); its units, `### Unité <id> : <title>`, the id its own and a digit from 1, in order, one at least and nine at most (`<n>a1`). A section holds its units and nothing else; a section with a single unit keeps its ### heading (as `<n>b` below). A unit is one teacher message.
- A unit is three #### blocks, in the order of writing: teach, ask, instruct. Each heading is the block's word alone; which block is published is course/form.yaml's, not the heading's. « Leçon », the matter of the unit, its two faces: « Matière », what is true, then « Idées fausses », what seems true and is not; « Cas du fil rouge », its cases; these two mandatory and published; then « Consigne au professeur », optional and never published: delete it when the unit has none. No line of a unit stands outside a block.
- In « Leçon » and « Cas du fil rouge », each field opens with its label alone, `- **<label>** : <text>` (nothing between the label and its colon: a precision opens the text, `- **Question** : en deux parties : …`), its following lines indented two spaces (paragraphs, nested lists), and no line stands outside a field. « Idées fausses » holds its misconceptions on the lines below its label, nothing after its colon: each a belief a learner who has read the matter could still hold, `  - **<name>** : « <belief> »`, its name short and unique in the unit, then, indented four spaces, `- **Racine** : <why it seems true>` (an everyday experience, a misleading word, a neighbouring truth stretched too far) and `- **Correction** : <what corrects it, resting on the matter>`, and nothing else under it. A misconception that only negates a sentence of the matter, with no root a learner could follow, is removed; one written on a case's situation, or repeating another of its unit, is rewritten as a general belief, or merged (rule misconception-not-a-negation). « Consigne au professeur » is prose, the boundary of the matter: what the teacher knows and does not say in this unit. A sentence stays only if a competent teacher reading the matter, the cases, the misconceptions, the protocol and plan.md would otherwise act differently, and only in this unit: what holds for every unit is the protocol's, what holds for the whole course goes to the stances of plan.md, the obvious goes (rule teacher-note-beyond-competent-teacher).
- A question the course asks again and again, its own way of making the learner think (« et alors ? », « d'où vient ce chiffre ? »): in the « Consigne au professeur » of its unit, in the one of the foot when it holds for the whole concept, or in a free section of plan.md when it holds for the whole course; never under a misconception, which holds its root and its correction only (rule course-question-in-teacher-note).
- « Cas du fil rouge » holds one case or more, each under its heading `##### Cas : <title>`, a title unique in the concept, then « Ancrage », « Question », « Réponse attendue » and « Idées fausses en jeu ». The first is the unit's case, always posed; each other is a supplementary case, which the teacher may pose after a wrong answer or for practice: it stands alone, its own anchor and its own question. A case writes no misconception: « Idées fausses en jeu » names, by their names separated by « ; », those of its unit its situation makes tempting, one at least. Each misconception of the unit is named by a case at least, and each one the unit's case names is best named by a supplementary case too (case-coverage reports it otherwise). A question often asked outside the course path is not a case: its matter is a unit of an annex, which no unit links to.
- The additions of a unit (course/README.md 3.6): a term a unit puts in bold should be in glossary.md, bold for emphasis staying possible (rule bold-term-in-glossary, a recommendation: a bold that is no term is reported); a fact its anchor uses is in « Faits fixés » of storyline.md, with the unit's id (rule anchor-uses-storyline-facts); a claim of a published field is marked where the text states it, its sources and their quotes in sources.yaml (rule claim-marked-in-text). The matter stays general: it neither takes up the situation of the anchor or of a case nor states the verdict of the expected answer, and the anchor, the questions and the expected answers do not restate the matter (rule no-restatement-matter-and-cases).
- Concept references are plain text: `concept 4`, `concepts 5 et 7b`, `annexe A2`.
- A claim is marked once, where a published field that states claims states it (« L'essentiel », « Matière », a « Racine » or a « Correction », « Se vérifier », « Approfondissement »), never in a case, a misconception's belief or a teacher note: an inline link `[the text claimed](consensus:S1,S2 "name")`, its text exactly what is claimed, its destination its nature, `consensus`, `école`, `fait` or `cours`, alone or followed by `:` and its sources, its title its name (lowercase letters, digits, hyphens, unique in the concept), required when it cites a source. A fait is what a source states and no one has to hold; consensus, école and cours are stances, the field's, someone named's, the course's choice or conclusion. A consensus, école or fait claim cites a source; a cours claim may. A concept reference stays outside the claim mark, in the sentence. A word the course chooses gets its own cours claim mark, the sentence split. An unmarked sentence fails no check: the review reads it. The sources, their quotes and who holds a stance are sources.yaml, at the root of the course.
- Frontmatter: metadata only, `diagrams`; a concept with no diagram has no frontmatter. A neighbouring notion not to confuse with the concept is matter, or a misconception whose root says the confusion.
- A diagram is optional: to have none, delete the frontmatter (from the first `---` to the second, both included). To have one: draw it from diagram.svg and declare it in `diagrams` (all four keys), `unit` the id of the unit it illustrates; the build places it there. No image in the body.
- « Approfondissement »: more matter for the learner who asks to go further, marked like any matter; no unit relies on it. « Consigne au professeur » of the foot: what the teacher knows and does not say in the whole concept, which no unit says alone, under the same rule as a unit's.
-->
---
diagrams:
  - file: <diagram-stem>.svg
    title: "<one line: SVG title>"
    caption: "<what the diagram shows, as the teacher says it>"
    unit: <n>a1
---

# Concept <n> : <concept title>

## L'essentiel

<the definition and why it matters, a few lines>

## Section <n>a : <title of a>

### Unité <n>a1 : <title of a1>

#### Leçon

- **Matière** : <matter of a1: what is true, as the site publishes it and the teacher says it> [<a claim the matter states, as a source says it>](consensus:S1 "<claim-name>").
- **Idées fausses** :
  - **<short name, unique in a1>** : « <a belief a learner who has read the matter could still hold> »
    - **Racine** : <why it seems true: an everyday experience, a misleading word, a neighbouring truth stretched too far>
    - **Correction** : <what corrects it, resting on the matter>

#### Cas du fil rouge

##### Cas : <title of the case of a1>

- **Ancrage** : <the storyline situation where a1 shows: actors, facts, who says what>
- **Question** : <the question of a1>
- **Réponse attendue** : <the right answer, with its nuances>
- **Idées fausses en jeu** : <the names of the misconceptions of a1 it makes tempting>

##### Cas : <title of a supplementary case of a1>

- **Ancrage** : <another storyline situation, standing alone>
- **Question** : <its question>
- **Réponse attendue** : <its right answer>
- **Idées fausses en jeu** : <the names of the misconceptions of a1 it makes tempting>

#### Consigne au professeur

<what the teacher knows and does not say in a1, which a competent teacher would otherwise do differently>

### Unité <n>a2 : <title of a2>

#### Leçon

- **Matière** : <matter of a2> [<a choice or a conclusion of the course>](cours).
- **Idées fausses** :
  - **<short name>** : « <a misconception of a2> »
    - **Racine** : <why it seems true>
    - **Correction** : <what corrects it>

#### Cas du fil rouge

##### Cas : <title of the case of a2>

- **Ancrage** : <the storyline situation where a2 shows>
- **Question** : <the question of a2>
- **Réponse attendue** : <the right answer of a2>
- **Idées fausses en jeu** : <the names of the misconceptions of a2 it makes tempting>

##### Cas : <title of a supplementary case of a2>

- **Ancrage** : <another storyline situation, standing alone>
- **Question** : <its question>
- **Réponse attendue** : <its right answer>
- **Idées fausses en jeu** : <the names of the misconceptions of a2 it makes tempting>

## Section <n>b : <title of b>

### Unité <n>b1 : <title of b1>

#### Leçon

- **Matière** : <matter of b1, the single unit of its section> [<a claim someone named holds>](école:S2 "<school-claim-name>").
- **Idées fausses** :
  - **<short name>** : « <a misconception of b1> »
    - **Racine** : <why it seems true>
    - **Correction** : <what corrects it>

#### Cas du fil rouge

##### Cas : <title of the case of b1>

- **Ancrage** : <the storyline situation where b1 shows>
- **Question** : <the question of b1>
- **Réponse attendue** : <the right answer of b1>
- **Idées fausses en jeu** : <the names of the misconceptions of b1 it makes tempting>

##### Cas : <title of a supplementary case of b1>

- **Ancrage** : <another storyline situation, standing alone>
- **Question** : <its question>
- **Réponse attendue** : <its right answer>
- **Idées fausses en jeu** : <the names of the misconceptions of b1 it makes tempting>

## Clôture

### Se vérifier

<the question the learner asks themself to check an answer, on the whole concept>

### Approfondissement

<more matter on the concept, for the learner who asks to go further>

### Consigne au professeur

<what the teacher knows and does not say in the whole concept, which no unit says alone>
