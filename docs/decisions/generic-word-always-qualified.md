---
date: 2026-11-10
issue: 817
status: accepted
area: repo
---

Without this, a contributor adding a glossary entry would reserve a generic word for one concept after checking only the other entries, while other files of the repository already use it for another concept, so the files name two concepts with one reserved word and an agent reading either use takes the other's meaning (#815 reserved « mark » for a claim's sign while the teacher's form marks and a message of the parser used it).

A generic word likely to collide (too general, likely used in other domains or already used in the repository in another sense) is given a qualified term as soon as the glossary reserves it, the bare word rejected; it is never reserved bare for one concept. Before adding an entry, its writer searches the bare word's uses in the repository, not only in the glossary, and judges whether it is generic enough to collide; a collision, or a likely one, is named, and the qualified terms are chosen, never invented silently. When the bare word is already the term of an entry or used in another sense, the PR that adds the new entry qualifies both senses: the existing entry is renamed to its own qualified term, both entries reject the bare word with the same reason and cite each other, and their `why` keeps that reason so that no later change simplifies the term back. In the same PR, the prose (what an agent reads: READMEs, decisions, rule texts, check messages) takes the qualified terms. An identifier counts as qualified when its parent (a file, a module, a key, a folder) carries the qualifier; a flat identifier is renamed in the same PR when cheap; when costly or breaking (an identifier of a course, whose change is a MAJOR), it stays, the entry's `why` says so, and a story is posed at once for its renaming. This extends decisions `glossary-by-concept` (one term, one concept, in the repository's files) and `word-choices-in-the-glossary` (each word choice stays an entry, its why in the entry), which it does not replace; it applies to every entry added or renamed from now on, the entries already written being qualified when a collision is met.

## Options ruled out

- A rule for « mark » alone: the next generic word would collide the same way.
- A story outside epic #810: the entries its next stories add would be written without the rule.
- A check that the bare word is free in the repository: what collides is a judgment on the sense of each use, which no pattern reads.
- Renaming every identifier with its prose, whatever the cost: the identifier of a course is part of its contract, and its renaming a MAJOR.

## Consequences

- `/feyn-glossary-entry` searches the bare word's uses in the repository at « Add » and renames the colliding entry at « Rename »; the glossary's section on adding or changing an entry states the rule.
