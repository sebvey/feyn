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
add: options ruled out, consequences. No index: `ls` and the frontmatter suffice.

A live decision states what holds today; git keeps the before. A mechanism of it that changes
(a skill or a path renamed, a file moved, a step that now runs elsewhere, a tool removed) is
corrected in place in its body, with no "Amended" line. A change of the scope of the choice
while it still holds (an exception added, a case it now covers or no longer covers) is written
in the body too, and gets one line `- Amended <date> (#<n>): …` under a `## Consequences`
heading, added when the file has none, saying what changed and why. A decision that no longer
holds is superseded (`status: superseded` and `superseded-by: <slug>`), never amended. A
superseded decision and a released CHANGELOG entry are history: a later change leaves them as
they are. An "Amended" line keeps its account of the change of scope; a mechanism it names that
changes is corrected in place, as in the body.

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
- An "Amended" line for every mechanism change, the rest of the body untouched (the rule until
  #370): each stale sentence stays beside its correction, and the before is already in git
  (decision `construction-in-history`).

## Consequences

- Amended 2026-11-01 (#370): an "Amended" line no longer records a mechanism change, only a
  change of scope; a mechanism is corrected in place in the body. Without this, an agent reads
  a mechanism the decision no longer has (`construction-in-history` told a new run of a removed
  workflow to restore its files, and only the line below said it was gone) and must reconcile
  the two. The mechanism-only lines of the live decisions were folded into their bodies.
