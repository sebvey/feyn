<!--
Template of courses/<id>/concepts/<NN>-<slug>/teaching.md (SPEC.md section 4.3).
Teacher-only: the teacher reads it, the site never builds it.
How to use: copy to the concept folder, replace every <placeholder>, delete this comment
(from the opening to the closing mark, marks included: no HTML in course Markdown).
- No H1. Sections in this order: « Consignes » (mandatory), « Faits du fil rouge utilisés »
  (optional), « Banque d'exemples » (mandatory), « Schéma » (optional).
- « Consignes » cites every case of the bank by its title in « ».
- A case is `### <title> (<sub-concept>)`, the sub-concept any of the concept's; one qualifier
  may come before or after the id, after a comma: `(9a1, rechange)`. Titles are unique in the
  concept; every leaf sub-concept has at least one case.
- A case is a list of fields `- **<label>** : <text>`. Mandatory, in this order: Situation,
  Question, Réponse attendue, Erreurs fréquentes. Optional: Usage, Explication, Réserve, sur
  demande (before Situation, any order) and Ce qui marche (last). The first case below shows
  every field; the second only the mandatory ones.
- No reference here: sources are in sources.md.
-->
## Consignes

1. **<n>a1** : poser « <case title for a1> ».
2. **<n>a2** : poser « <case title for a2> ».

<the order of teaching and the split into messages, the cross-references not to re-teach, the
concept's own vigilance points>

## Faits du fil rouge utilisés

<the storyline facts the cases use, and what the storyline leaves unfixed>

## Banque d'exemples

### <case title for a1> (<n>a1)

- **Usage** : <when to pose the case, for a case outside the normal order>
- **Explication** : <what the teacher says before the case>
- **Réserve, sur demande** : <what the teacher gives only if the learner asks>
- **Situation** : <actors and storyline facts>
- **Question** : <the question>
- **Réponse attendue** : <the right answer, with its nuances>
- **Erreurs fréquentes** : <frequent answers and how to correct them, follow-ups inline>
- **Ce qui marche** : <a wording or follow-up that worked>

### <case title for a2> (<n>a2)

- **Situation** : <actors and storyline facts>
- **Question** : <the question>
- **Réponse attendue** : <the right answer, with its nuances>
- **Erreurs fréquentes** : <frequent answers and how to correct them>

## Schéma

<the drawing instruction behind the concept's diagrams: metaphor, what it shows>
