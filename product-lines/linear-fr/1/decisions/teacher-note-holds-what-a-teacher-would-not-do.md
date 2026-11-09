---
date: 2026-11-07
issue: 713
status: accepted
area: spec:linear-fr
---

Without this, a creator writing the teacher notes of a course would fill them with what holds for every unit (name the taste before the verdict, pose a supplementary case after a wrong answer), with the course's stances and with the obvious, so that one teacher note would hold nothing proper to its unit, and the teacher, given more teacher notes, would teach more rigidly, against its protocol and away from the matter.

The **teacher note** of a unit of `linear-fr` is the boundary of its matter: what the teacher knows and does not say in this unit. A sentence stays in it only if a competent teacher reading the matter, the cases, the misconceptions, the protocol and the course plan would otherwise act differently, and only in this unit. What holds for every unit is a rule of the protocol (when to pose a supplementary case, what to do with a later concept the learner raises); what holds for the whole course is a stance written in the course plan; the obvious goes. What the unit does not teach, and where it is taught, stays: that is the boundary. The teacher note of a concept's foot follows the same criterion for the whole concept. The description of a course says what the teacher note holds, what it does not hold and where the rest goes, and a review holds each sentence to the criterion. A question the course asks again and again keeps its place in the teacher note of its unit, of its concept, or in the course plan: it is a sentence a teacher would not otherwise ask. This narrows the teacher note that decision `unit-is-the-content-unit` places last in a unit, which held what the method has proper to the unit: when to pose a supplementary case, a wording that worked, a cross-reference not to re-teach.

## Options ruled out

- Tying each sentence of a teacher note to what it rests on (the matter, a case, a stance): every sentence finds something to rest on, so the useless ones stay.
- Keeping in the teacher note when to pose a supplementary case: it holds for every unit, a rule of the protocol, written once there rather than in each unit.
- Leaving the teacher note with no criterion: each one grows with what its writer thought useful, and nothing tells a review which sentence goes.

## Consequences

- The sentences that said when to pose a supplementary case, or what to do with a later concept the learner raises, leave the teacher notes for the protocol rules, which the subject « teaching a unit » of `products/teacher/rules.yaml` writes (#771); the means of the teacher implementation serve them.
- A stance of the course that a teacher note stated moves to the course plan, written once.
- Whether a sentence passes the criterion is a review, not a check: no script tells the obvious from the proper.
- Amended 2026-11-09 (#783): the course's block « Consigne au professeur » is the teacher note, no longer the instruction, and this decision takes the term in its body and its file name; the choice is unchanged. Why: « instruction » is the ordinary word of every text an agent or the teacher reads, the means of the teacher implementation among them, and one word named two concepts (the maintainer, epic #757, question 5, 2026-11-09); the glossary's entry **teacher note** holds the word choice.
