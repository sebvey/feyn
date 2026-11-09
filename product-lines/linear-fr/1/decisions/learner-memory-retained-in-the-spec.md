---
date: 2026-11-09
issue: 777
status: accepted
area: spec:linear-fr
---

Without this, a contributor writing a second teacher implementation would copy the three Markdown files of learner memory, their headings and their line formats, as the spec, though a teacher with no local memory cannot keep them; or would leave out of the spec what a cut loses, so that a learner whose progress is not kept is never told.

The spec of the teacher names in prose what the learner memory retains and what each thing means (`products/teacher/README.md`, « Mémoire de l'apprenant »): the profile, the next step, the status of each concept, the end of the course, the cases posed, the last mini-recap, the annexes seen, the levers, the vigilances, the acquired, the preferences. Where and in what form it is stored (files, headings, lines, git) is the teacher implementation's. A thing retained enters the spec only if one protocol rule says when the teacher writes it and another when it reads it. What to write, when, and the sorting (a thing retained only if the next teacher would act otherwise without it) are protocol rules, judged by reading the memory after the session. Saving is a guarantee at the latest (the end of onboarding, a concept closed, the stop), and a resume after a cut restarts at the latest at the start of the concept in progress; an implementation may save more often. When the memory cannot be saved, the teacher says so once, in one line, and goes on. Settled with the maintainer, epic #757, item 8; the points announced for later were dropped from it for now (2026-11-09).

## Options ruled out

- A data model of the memory: premature, with no second implementation to judge it.
- The Markdown templates as the spec: a teacher with no local memory would rewrite it.
- The sorting in the memory's spec: it leaves no requirement on what the teacher writes.
- Fixed save points: they impose on every implementation a cost of Claude Code.
- Nothing on saving in the spec: what a cut loses would no longer be said.
- The failure of git left to the implementation: the learner would not be told their progress is not kept.
