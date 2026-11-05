---
date: 2026-11-04
issue: 543
status: accepted
area: repo
---

Without this, a contributor who settles which word names a concept would record the choice as a decision and cite that decision from the glossary entry, so the meaning and its why live in two places, kept in step by hand, and the next renaming updates one and leaves the other false.

The glossary and the decisions fix things durably for two objects, one place per object. The glossary answers what a word means and which word names a concept; the decisions answer why a structure or a process is so and what was ruled out. A choice that changes only words (a term chosen, renamed or rejected, a French word given to a concept) is a glossary entry: its why goes in the entry's optional `why` key, written when the choice was discussed or a confusion seen, never in a decision. A choice that changes files, a structure or steps is a decision, which names its concepts by their terms without defining them. A meaning cites nothing: no decision, no document; a citation would bridge the two places and be one more reference kept by hand. Where the glossary and the decisions are written by skills, each refuses the other's object and sends it there. This replaces a word choice recorded as a decision, and the meanings that cited the document or decision their definition came from.

## Options ruled out

- A key of the entry citing the decision that chose its term: the why stays in two places.
- Keeping the decisions that only choose a word: the same choice read in two files.
- A meaning citing the document or decision its definition comes from: a reference kept by hand, which ages when the source is renamed or superseded.
