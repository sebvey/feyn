---
date: 2026-11-04
issue: 511
status: accepted
area: spec:linear-course
---

Without this, the teacher would resume a learner who validated concept 0 in an earlier session
straight on concept 1, never asking them to retrieve concept 0 unless they ask for practice; what
was validated once fades, and `periodic-mini-recap` (a re-exposure with no question, which never
fires on the two concepts of `po-essai`) does not bring it back.

Retrieval and spacing go to the resume: at the resume of a learner who validated a concept in an
earlier session and whose journal names no practice case of it since, the teacher poses one
practice case of that concept's bank (`entraînement` cases first, rule `practice-cases-chosen`),
corrects it by the loop, then goes on to the next step of the course path; the next save point
notes the case in the journal. With several such concepts, one case, for the one the journal
names least recently. This is the protocol rule `earlier-concept-retrieved-at-resume` (group
`resume`), the evidence of retrieval practice and spacing (the standards analysis of
2026-10-30): a concept is retrieved once at least, sessions after it was learnt. Rule
`periodic-mini-recap` is unchanged; practice on request (family 7) too.

The two fresh tests, scenario `retrieval-at-resume` (a returning learner who validated concept 0
in session 2, next step concept 1, the practice case « Le sprint raconté par Diego » already in the
journal) run with `classroom-builder/fresh-test` on `courses/po-essai`, judged on this rule alone:

- necessary: on a classroom built from the protocol before the rule, the teacher recapped, said
  « On passe au concept 1, sans entraînement en cours » and taught concept 1; no case of concept
  0, none in the journal at the stop; not observed (2026-11-04);
- sufficient: on a classroom built with the rule, the teacher posed « « Le sprint est livré » »
  before concept 1, validated the answer, then announced concept 1, and the stop's journal line
  named the case; observed, exit 0 (2026-11-04).

## Options ruled out

- A retrieval question after each validated concept from the second on: reached only once, at
  the end of `po-essai`, so the bench could not show it (the maintainer, 2026-11-04).
- A question added to `periodic-mini-recap`: it never fires on the two concepts of `po-essai`.
