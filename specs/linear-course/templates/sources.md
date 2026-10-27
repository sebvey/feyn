<!--
Template of courses/<id>/concepts/<NN>-<slug>/sources.md (SPEC.md section 4.4).
Reader-facing: the site builds it as is; the teacher reads it when asked where a claim comes
from. It traces the source of every verifiable claim of the concept folder, cases included.
Storyline facts are invented and have no source.
How to use: copy to the concept folder, replace every <placeholder>, delete this comment
(from the opening to the closing mark, marks included: no HTML in course Markdown).
- No H1. Optional introduction, then « Affirmations », « Références », « Non vérifié » in
  this order.
- Claims: four columns. The claim in a few words with its section in parentheses; the source
  (ids `[S1]`, or the path `concepts/NN-slug/sources.md` of another concept where it was
  verified, or a word that says there is none); what was verified; the nature (a stance marker
  word: consensus, école, cours; or empty).
- References: id `S<n>` (optional lowercase letter: S5b), source, link (or empty), type
  (primaire, secondaire, marketing, several allowed, a remark in parentheses allowed), and
  « consultée le » starting with YYYY-MM-DD. Ids are unique, every id cited exists, every
  reference is cited by a claim.
- « Non vérifié » is mandatory and may be empty.
-->
<a paragraph that sums up the sources of the concept (optional)>

## Affirmations

| Affirmation (section de `concept.md` ou de `teaching.md`) | Source | Ce qui a été vérifié | Nature |
|---|---|---|---|
| <the claim in a few words> (<section>) | [S1] | <what the source says, a short quotation when useful> | consensus |
| <another claim> (<section>) | [S2] | <what the source says> | école |

## Références

| Réf. | Source (auteur, titre, date) | Lien | Type | Consultée le |
|---|---|---|---|---|
| S1 | <author, title, date> | <URL> | primaire | <YYYY-MM-DD> |
| S2 | <author, title, date> | <URL> | secondaire | <YYYY-MM-DD> |

## Non vérifié

- <a claim that no consulted source confirms, and why; or "Rien.">
