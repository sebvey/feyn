---
date: 2026-10-27
issue: null
status: accepted
area: repo
---

Without this, an agent would name a thing with the first generic word at hand, the word would
spread through the repository and turn generic, and one word would end up meaning two things,
such as one name for a group of concepts in a course and for a part of the repository.

Every term of `docs/glossary.md`, the repository glossary, is reserved: it means one thing in
feyn. The generic words in its "Not" column are not used for that meaning, in code, docs,
skills, issues, labels and decisions. Each glossary applies in its own files: the
repository glossary in repository files, a course glossary (`courses/<id>/glossary.md`) in that
course's files; a word may be reserved in both with two meanings, and a repository text that
means the course's sense cites it as such. The repository glossary names the course's French
section headings in English for talking about them.

A new term enters by a PR that adds its row and, in the same PR, replaces the banned words
already in use.

## Consequences

- A vocabulary only holds if something enforces it: `/health` greps the repository docs,
  skills and issue titles for the banned words and flags them. It reports, it does not block.
- Names follow the terms: `feyn-site` (site), the agent workflow `course-batch` (batch), the
  labels `area:…`, `type:…`.
- The old `ecoles` of `parcours-po` became `stances` and `neighbors`.
- Amended 2026-10-29 (#229): each glossary applies in its own files, the repository's in
  repository files and a course's in its course files; a word may be reserved in both with two
  meanings; a repository text that means the course's sense cites it as such; Scrum vocabulary
  is available to the repository ("epic", decision `themes-and-release-milestones`).
