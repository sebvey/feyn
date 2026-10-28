---
date: 2026-10-29
issue: 205
status: accepted
area: spec:linear-course
---

Without this, every brief mention of a notion taught later forces the course to rename it with
a vaguer or wrong term, as #203 did (« intervenants » for acteurs, « aller plus haut » for
escalade).

A `concept.md` may use a glossary term before the concept that introduces it when the sentence
of that use names the introducing concept by a concept reference (`concept 14`,
`(concept 13)`, `concepts 6 et 7`, `concept 14b`): a **forward mention**. The maintainer ruled
it on 2026-10-29: « Le cours doit avoir le droit de citer une notion non introduite brièvement
s'il mentionne que ce sera introduit plus tard ». `SPEC.md` section 6 (glossary, **Order**)
states it and defines the sentence and the reference; `glossary-order` checks it. A reference
to another concept, a mention in another sentence, or none, still fails, and each use of the
term is held to it. This amends the Order rule, which refused every earlier use.

## Options ruled out

- Rewording the mention with a vaguer term (#203): the course then teaches a wrong word.
- Excusing the term for the whole concept once it is mentioned with its concept: a later use
  with no announcement would pass unseen.
- Any word that names a later concept (« l'annexe A2 »): only the concept reference of
  section 4.5 is read, the form the site links.
