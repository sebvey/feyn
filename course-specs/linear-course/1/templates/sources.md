<!--
Template of courses/<id>/concepts/<NN>-<slug>/sources.md (COURSE.md section 3.4).
Reader-facing: the site builds every row of « Affirmations » and « Références »; it never builds
« Non vérifié ». The teacher reads it when asked where a claim comes from.
It traces the verifiable claims of the body of concept.md, and nothing else: a storyline fact, a
teaching device, a stance or neighbour (sourced in its frontmatter item: refs, verified), a
wording of the course is not a row.
How to use: copy to the concept folder, replace every <placeholder>, delete this comment
(from the opening to the closing mark, marks included: no HTML in course Markdown).
- No H1, no introduction: « Affirmations », « Références », « Non vérifié » in this order.
- Claims: five columns. The claim in a few words; its section (sub-concept ids such as 4b, or
  « L'essentiel », « Pièges », « Le test rapide », « Approfondissement », several separated by
  commas, each existing in concept.md); its source (ids `[S1], [S2]`, or the word « cours » for
  a claim the course makes by its own choice, nothing else); what was verified (per id, in
  order, the shortest quotation in « » and its place in parentheses; « absent de » and the place
  for an absence; one line or nothing for a « cours » claim); its nature (consensus, école,
  cours or fait, mandatory).
- References: id `S<n>` (optional lowercase letter: S5b), source (author, title, date), link
  (one URL or empty), type (primaire, secondaire, marketing, several allowed, a remark in
  parentheses allowed), and « consultée le » starting with YYYY-MM-DD. Ids are unique, every id
  cited exists, every reference is cited by a claim or a frontmatter item.
- « Non vérifié » is mandatory and may be empty: a list, each entry opening with its section
  (the same forms, or « Consensus et choix d'école » for a stance or neighbour), then « : »,
  what no consulted source confirms, why, and the instruction when useful.
-->
## Affirmations

| Affirmation | Section | Source | Vérifié | Nature |
|---|---|---|---|---|
| <the claim in a few words> | <section> | [S1] | <« the shortest quotation » (its place)> | consensus |
| <another claim> | <section> | [S2] | <« the shortest quotation » (its place)> | fait |
| <a claim the course makes by its own choice> | <section> | cours | | cours |

## Références

| Réf. | Source (auteur, titre, date) | Lien | Type | Consultée le |
|---|---|---|---|---|
| S1 | <author, title, date> | <URL> | primaire | <YYYY-MM-DD> |
| S2 | <author, title, date> | <URL> | secondaire | <YYYY-MM-DD> |

## Non vérifié

- <section> : <what no consulted source confirms, why, and the instruction when useful>
