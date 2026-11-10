---
date: 2026-11-10
issue: 815
status: accepted
area: spec:linear-fr
---

Without this, an agent writing or fixing a concept would write each claim up to three times, in the matter, in a stance of the frontmatter and in a row of the concept's sources table, with no join between the copies, so the copies drift (a figure corrected in the matter stays wrong in the stance), a stance marker after a sentence leaves to judgment how much of the sentence it covers, and no check can tell which words a source proves.

A claim of a course of `linear-fr` is written once, in the **published** field of the **concept file** that states it (« L'essentiel », the matter of a unit, the roots and the corrections of its misconceptions, the landmarks, « Approfondissement »), and marked there by a **claim mark**, a CommonMark inline link whose text is exactly what is claimed, whose destination is its **nature**, alone or followed by its **sources**, and whose title is its name: `[the text claimed](consensus:S2,S3 "name")`. The nature is a fact, which a source states and no one has to hold, or one of the three **stances**, the field's consensus, a school (someone named) and the course's own choice or conclusion; a fact is not a stance. A fact, a consensus or a school claim cites a source; a course claim may cite some, when it concludes from them. A claim that cites a source has a name, unique in its concept, by which each quote that proves it names it (`<concept>/<name>`), since one source often proves several claims of a unit and a claim with no proof would otherwise pass. Who holds a stance, its **holder**, is written under the claim's name in the course's sources file, not in the claim mark, which has no room left, nor taken from the author of the source, which it often is not. The text of a claim mark holds no concept reference: the reference stays in the sentence, outside the claim mark, since it is the course's navigation, not what a source or a stance claims, and on the site it would be a link inside a link. The frontmatter keeps metadata only, the diagrams; a notion not to confuse with the concept is matter, or a misconception whose root says the confusion. What holds of the decision this replaces stays: only the published fields that state claims are marked; the cases of a unit are not, their anchor being the storyline's and their expected answer restating the matter, and a claim mark in a case, a misconception's belief or a teacher note fails the check. Marking a claim is recommended, not required, an unmarked sentence being the review's; a claim mark that is there must be coherent (decision `sources-a-course-file`). The site builds « Consensus et choix d'école » from the claim marks, and the teacher reads them as written. This replaces decisions `stances-in-frontmatter-only` and `sources-trace-the-concept`: the stances and neighbours of the frontmatter, the stance marker after a sentence and the table of claims of each concept's sources.

## Options ruled out

- A marker after the sentence, as before: how much of the sentence it covers stays a judgment, and no check can read it.
- Keeping the list of stances in the frontmatter: the copy of the claim stays.
- The table of claims with an anchor in the text: each claim still written twice.
- The neighbours as a foot block or as a frontmatter item marked: both repeated the matter, and only the site read them, to show a duplicate.
- The unit, or the claim's text, as the key a quote names: a unit holds several claims a source proves, and the text would be written twice.
- The holder in the prose alone, deduced from the author of the source, or in the claim mark: no check sees the first, the second is wrong when the two differ, the claim mark has no room for the third.
- The claim mark rendered as its text and its badge with a concept reference keeping its link inside: the claim mark grows wider than its claim.

## Consequences

- A creator marks a claim where it is written, `cours` until its sources are found; adding a source to it adds a quote and, for a school, a holder.
- The words a claim mark carries are the nature words of the lexicon of the course files; the claim mark is read by one reader, shared by the checks and the site build (decision `claim-marks-read-by-one-reader`).
