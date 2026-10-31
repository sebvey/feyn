---
date: 2026-10-27
issue: null
status: accepted
area: repo
---

Without this, an agent would number decisions in sequence, so two agents on two independent
issues would take the same number, and would record a choice without saying what goes wrong
without it.

A decision is one Markdown file named by its slug (`two-versioned-objects.md`); the slug is its
identifier, cited as "decision two-versioned-objects". Its frontmatter holds `date`, `issue`
(the originating issue number, or `null`), `status` (`accepted` or `superseded`), followed,
only when superseded, by `superseded-by: <slug>` (the decision that replaces it), and `area`
(the area it binds). After the frontmatter, the first line is the **counterfactual**, "Without
this, an agent would…"; then the decision in one paragraph. Optional headings, only when they
add: options ruled out, consequences. No index: `ls` and the frontmatter suffice. A decision
that still holds but whose mechanism changed (a skill renamed, a file moved, a step that now
runs elsewhere) gets one line `- Amended <date> (#<n>): …` under a `## Consequences` heading,
added when the file has none; the rest of the file stays untouched. A decision that no longer
holds is superseded (`status: superseded` and `superseded-by: <slug>`), never amended.

A decision lives in the `decisions/` folder of the most local area it binds:
`course-specs/<name>/<MAJOR>/decisions/` (a new MAJOR copies them under the same slugs),
`courses/<id>/decisions/`, `teacher/decisions/`, `site/decisions/`; the agentic layer
(`.claude/`, `.github/`), `.claude/decisions/`; two areas or more, `docs/decisions/`.

A decision is written when its counterfactual can be named and it spans several files or is
costly to undo; otherwise a comment where it applies, or nothing. Decisions on how the teacher
teaches (`teacher/` and the spec's protocol) also follow the two-tests rule: they enter only
after two fresh tests show them necessary or sufficient. A site or structure decision is taken
on argument. The `/feyn-decision` skill applies this file: it refuses a decision without a
counterfactual, picks the folder, checks for a neighbouring slug.

## Options ruled out

- Sequential numbers: they collide between parallel branches. Two slugs collide only for the
  same decision, and the git conflict is then the right signal.
- The issue number as identifier: it ties a decision to GitHub and forces an issue for a
  decision taken in a PR.
- "ADR" in paths: it is the known synonym in conversation only.

## Consequences

- Amended 2026-10-30 (#252): the agentic layer has its own folder, `.claude/decisions/`; the
  "Amended" line is the written practice. The two sentences of the body that state them changed
  too, an exception to that practice named here: `decision-format` is the rule itself, and an
  agent reads the rule in its body.
- Amended 2026-10-30 (#215): a spec's decisions live in each MAJOR folder,
  `specs/<name>/<MAJOR>/decisions/` (decision `versioned-objects-and-spec-layout`), and
  `/decide` is now `/feyn-decision` (#247). The body says so too, the exception named by #252:
  this file is the rule itself, and an agent reads the rule in its body.
- Amended 2026-10-31 (#321): a superseded decision has two keys, `status: superseded` and
  `superseded-by: <slug>`, in place of `status: superseded-by: <slug>`, which a YAML 1.2.2
  parser refuses (a plain scalar never contains ": "); a tool filters on `status` without
  parsing a string. The body says so too, the exception named by #252: this file is the rule
  itself, and an agent reads the rule in its body.
- Amended 2026-10-31 (#340): the folder of the specs is `course-specs/`, so a spec's decisions
  live in `course-specs/<name>/<MAJOR>/decisions/` (decision
  `versioned-objects-and-spec-layout`). The body says so too, the exception named by #252.
