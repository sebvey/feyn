---
date: 2026-11-04
issue: 539
status: accepted
area: repo
---

Without this, a contributor giving a reserved term its French word would write it in a table apart
from the English one, so a concept lives in two places, its French incomplete, and would list a
neighbouring concept among a term's banned words, which no reader can tell from a word to avoid.

The repository glossary, `docs/glossary.md`, is concept-oriented, as ISO 704 and ISO 1087 describe
terminology work: one entry per concept, with no exception, with its definition, its designations
per language, each preferred or rejected, and its relations to neighbouring concepts, kept apart
from the rejected terms. A definition names a file, a folder, a key or an identifier only when the
concept is that thing (teaching notes, the whole of `teaching.md`), never where the concept is
stored, read or written: the spec holds that, and it ages. Every term of it is reserved: it means
one thing in the repository's files, its rejected terms not used for that concept. A course glossary
applies in its course's files; a word may be reserved in both with two meanings, and a repository
text that means the course's sense says so; the frame's vocabulary is available to the repository
(decision `kanban-frame-of-the-work`).

## Options ruled out

- The French apart from the English: a table (#537), a concept in two places; a column, about 125
  rows, most empty; the word in the meaning, no regular place to read it from.
- A link to the code, a key of each entry listing the identifiers that carry the concept: possible,
  not kept today, since nothing reads it and a list kept by hand does not hold on a growing
  repository; a later check that needs it would generate it rather than have it written.

## Consequences

- The form is regular so that a program can read it: a conversion to YAML, or a check of the
  rejected terms by language, needs no change of form.
- What enforces the vocabulary today: the maintainer's word met with "You said <word>, did you
  mean <term>?", no skill accepting a rejected word silently (`CLAUDE.md`, "Vocabulary").
- Names follow the terms: labels `area:…`, `type:…`; agent workflows `feyn-<script>-workflow`.
- It supersedes `reserved-vocabulary`, whose reservation and two glossaries it carries over.
- Amended 2026-11-04 (#541): one entry per concept, no code key, files named only as the concept.
