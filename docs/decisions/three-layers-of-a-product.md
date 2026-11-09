---
date: 2026-11-09
issue: 763
status: accepted
area: repo
---

Without this, a contributor writing the spec of the teacher would put in it what one target needs to make a behaviour hold (a skill per moment, a file layout of learner memory, the words of a waiting phrase, a sentence of the teacher's instructions that repeats a rule), so a teacher scaled up, with no local memory and no skills, would rewrite the spec, a change of a prompt would be a MINOR of the spec, and the judge of a session would read a sentence of the teacher's instructions as a criterion (#509).

A product is cut in three layers. The spec holds what is expected of the product, its behaviour, observable in the conversation or in what it records, written as protocol rules, and what it needs, its capabilities, with no target term: for the teacher, read the course, retrieve and record what it knows of the learner, know the site addresses, search outside the course, show a diagram or know it cannot, know the title and « L'essentiel » of each concept and each annex. The teacher implementation holds the rest: its means, which it chooses freely (a passage of the teacher's instructions, a skill, a hook that rereads a message before it is sent, a script, a preparation at build time), each linked by slug to the protocol rules it serves. The sieve, asked of each element: would a teacher scaled up, with no local memory and no skills, still have to honour it? Yes, it is the spec's; no, the implementation's; an element that mixes both is split. The spec of a product writes no means, and an implementation answers the spec, each of its means questioned on whether it serves a protocol rule. The teacher of `linear-fr` is brought to this cut by epic #757, its protocol rewritten from the essence of the current texts of its protocol rules; until a story of that epic moves a file, the spec keeps its current cut. The site's part of the spec is idea #759.

## Options ruled out

- The behaviour alone in the spec, the capabilities left to the implementation: two implementations could not resume the same learner.
- The spec as it is, behaviour and means in one text: scaling the teacher up would rewrite it, a change of a prompt is a MINOR of the spec, and the judge reads a sentence of the teacher's instructions as a criterion (#509).
- The behaviours given as the default prompt, the rule noted on paper beside it: the spec would still hold one target's means.
- A prompt generated from the behaviours: what makes a behaviour hold is not always a text that repeats it, and the best means depends on the target.
- Two fields per protocol rule, its behaviour and its prompt: the prompt stays in the spec.
