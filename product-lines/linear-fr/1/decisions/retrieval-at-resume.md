---
date: 2026-11-04
issue: 511
status: accepted
area: spec:linear-fr
---

Without this, the teacher would resume a learner who validated the first concept in an earlier session straight on the second, never asking them to retrieve the first unless they ask for practice; what was validated once fades, and the protocol's periodic mini-recap (a re-exposure with no question, which never fires on a two-concept course) does not bring it back.

Retrieval and spacing go to the resume: at the resume of a learner who validated a concept in an earlier session and who has retrieved it on no case since, the teacher poses one case of that concept not yet posed to the learner, from its stock, corrects it as when teaching a unit, then goes on to the next step of the course path; the learner memory keeps the case. A concept marked « à revoir » comes first; among several others, the one retrieved least recently; one case per resume. A wrong answer the follow-ups do not recover marks the concept « à revoir » (epic #757, item 9). This is a rule of the protocol, among those of the resume, the evidence of retrieval practice and spacing (the standards analysis of 2026-10-30): a concept is retrieved once at least, sessions after it was learnt. The periodic mini-recap is unchanged; practice on request too.

The two fresh tests, scenario `retrieval-at-resume` (a returning learner who validated the first concept in session 2, next step the second concept, one case for practice of the first already in the journal) run with `teacher-builder/fresh-test` on a two-concept course, judged on this rule alone:

- necessary: on a classroom built from the protocol before the rule, the teacher recapped, said it moved on to the second concept with no practice pending and taught it; no case of the first concept, none in the journal at the stop; not observed (2026-11-04);
- sufficient: on a classroom built with the rule, the teacher posed a case for practice of the first concept before the second, validated the answer, then announced the second concept, and the stop's journal line named the case; observed, exit 0 (2026-11-04).

## Options ruled out

- A retrieval question after each validated concept from the second on: reached only once, at the end of a two-concept course, so the bench could not show it (the maintainer, 2026-11-04).
- A question added to the periodic mini-recap: it never fires on a two-concept course.

## Consequences

- Amended 2026-11-07 (#715): no case of a course carries « entraînement » any more, the word that marked a supplementary case for practice (decision `cases-name-their-misconceptions`); the frozen teacher keeps the word, moved to `frozen_form` of its own lexicon with its value, and the rule still picks those cases first, so it falls back on the cases of the bank the journal does not name, until the brainstorm on the protocol rules redoes it (idea #597).
- Amended 2026-11-09 (#769): the case retrieved is one not yet posed, from the stock of the concept's units, a concept « à revoir » first, and a wrong answer the follow-ups do not recover marks the concept « à revoir » (epic #757, item 9); the two fresh tests above ran on the earlier rule (a case of the bank, `entraînement` first) and were not rerun, fresh tests being asleep (decision `teacher-yardstick-cafe-and-maintainer-session`).
