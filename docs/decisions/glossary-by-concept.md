---
date: 2026-11-04
issue: 539
status: accepted
area: repo
---

Without this, a contributor giving a reserved term its French word would write it in a table apart
from the English one, so a concept lives in two places, its French incomplete, and would list a
neighbouring concept among a term's banned words, which no reader can tell from a word to avoid.

The repository glossary, `docs/glossary.md`, is concept-oriented, as ISO 704 (terminology work,
principles and methods) and ISO 1087 (vocabulary of terminology) describe terminology work: one
entry per concept, with its definition, its designations per language, each with its status
(preferred, rejected), its identifiers in the code, and its relations to neighbouring concepts,
kept apart from the rejected terms. Every term of it is reserved: it means one thing in the
repository's files, and its rejected terms are not used for that concept. Each glossary applies
in its own files: the repository's in repository files, a course glossary in its course's; a word
may be reserved in both with two meanings, and a repository text that means the course's sense
says so; the frame's vocabulary is available to the repository (decision
`kanban-frame-of-the-work`). The glossary's header says what it is for, how to read an entry, how
to add one and which designation applies where; this decision says why.

## Options ruled out

- A French table apart from the English rows (#537): a concept in two places, and the French
  incomplete by construction.
- A French column in the tables: about 125 rows, most of them empty.
- The French word mentioned in the meaning cell: no regular place to read it from.

## Consequences

- The form is regular so that a program can read it: a conversion to YAML, or a check of the
  rejected terms by language, needs no change of form.
- What enforces the vocabulary today: the maintainer's word met with "You said <word>, did you
  mean <term>?", no skill accepting a rejected word silently (`CLAUDE.md`, "Vocabulary").
- Names follow the terms: the labels `area:…`, `type:…`, the agent workflows
  `feyn-<script>-workflow`.
- It supersedes `reserved-vocabulary`, whose reservation and two glossaries it carries over.
