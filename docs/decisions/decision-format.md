---
date: 2026-10-27
issue: null
status: accepted
scope: repo
---

Without this, an agent would number decisions in sequence, so two agents on two independent
issues would take the same number, and would record a choice without saying what goes wrong
without it.

A decision is one Markdown file named by its slug (`two-versioned-objects.md`); the slug is its
identifier, cited as "decision two-versioned-objects". Its frontmatter holds `date`, `issue`
(the originating issue number, or `null`), `status` (`accepted` or `superseded-by: <slug>`) and
`scope` (the area it binds). After the frontmatter, the first line is the **counterfactual**,
"Without this, an agent would…"; then the decision in one paragraph. Optional headings,
only when they add: options ruled out, consequences. No index: `ls` and the frontmatter
suffice.

A decision lives in the `decisions/` folder of the most local area it binds:
`specs/<name>/decisions/`, `courses/<id>/decisions/`, `teacher/decisions/`, `site/decisions/`;
two areas or more, `docs/decisions/`.

A decision is written when its counterfactual can be named and it spans several files or is
costly to undo; otherwise a comment where it applies, or nothing. Decisions on how the teacher
teaches (`teacher/` and the spec's protocol) also follow the two-tests rule: they enter only
after two fresh tests show them necessary or sufficient. A site or structure decision is taken
on argument. The `/decide` skill applies this file: it refuses a decision without a
counterfactual, picks the folder, checks for a neighbouring slug.

## Options ruled out

- Sequential numbers: they collide between parallel branches. Two slugs collide only for the
  same decision, and the git conflict is then the right signal.
- The issue number as identifier: it ties a decision to GitHub and forces an issue for a
  decision taken in a PR.
- "ADR" in paths: it is the known synonym in conversation only.
