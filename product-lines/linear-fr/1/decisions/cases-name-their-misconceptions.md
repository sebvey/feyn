---
date: 2026-11-07
issue: 715
status: accepted
area: spec:linear-fr
---

Without this, a creator writing the cases of a unit would write them as a flat list told apart by a field, tie none to the misconceptions of its unit and mark one, here and there, as the case to ask after a wrong answer, so nothing would tie a case to its misconceptions nor a teacher note to the case it announces, the teacher after a wrong answer would have no case that meets the belief it shows, and a course would hold one case meant for a wrong answer for a dozen units, which no check would see.

Every case of a unit of `linear-fr`, the unit's case included, opens with its own heading, the kind word of a case then its title, its id, unique in its concept, and its fields under it: its anchor, its question, its expected answer, then, last, the **misconceptions** of its unit its situation makes tempting, by their names, one at least, only those of its unit. A case writes no misconception: it names them, and the site renders the names with the expected answer, once the reader reveals it, each a link to its misconception. A unit has its case, always asked first, then its supplementary cases, a stock in which the teacher picks: after a wrong answer, a case that names the misconception the answer shows; for practice, a case not yet asked. Any supplementary case may be asked after a wrong answer, so each is self-contained, its own anchor and its own question. Coverage has two requirements, checked by test: each case names one misconception at least, and each misconception of a unit is named by one of its cases at least; and one recommendation, which a check reports: each misconception the unit's case names is named by a supplementary case too, so the teacher has another case to ask. This replaces the word a supplementary case carried, one of three, which gave it a kind and said when to ask it; the teacher keeps those three words, moved to its own lexicon with their values, and loses what they triggered until epic #757 redoes it in the protocol rules.

## Options ruled out

- The fields of a case indented under a line that opens it, or cases told apart by a blank line: the structure would not read from the headings, as the sections and the units above it do.
- The belief of a misconception copied word for word into the case: what repeats is a reference, not content, and a copy drifts.
- A misconception referred to by its number: a number changes when a misconception is added, a name does not.
- The misconception naming its cases: the creator writes the misconceptions before the cases, and the link goes in the order of creation.
- Keeping the word for practice alone, or the three words: the teacher picks by the misconceptions a case names, and a word that says when to ask a case would decide it twice.

## Consequences

- A unit whose case alone names a misconception is reported, not refused: its stock lacks a case, written apart.
- The length of one teacher message still counts the unit's case only; a supplementary case is asked apart.
