---
name: feyn-decision
description: "Tooling of the work cycle, called by `/feyn-triage` and by the contributor of the agent workflow deliver-slice.js: write a decision on feyn (one file by slug, counterfactual first) in the decisions/ folder of the area it binds, or refuse it when no counterfactual is named or the entry bar is not met. Use for \"/feyn-decision <the decision, in a sentence>\"."
argument-hint: "<the decision, in a sentence>"
---

# /feyn-decision

One job: turn a choice into a decision file, or say why it does not deserve one. The format
is `docs/decisions/decision-format.md`; this skill applies it.

## 1. The counterfactual, or nothing

Ask for it if it was not given: "Without this, an agent would…", followed by a concrete wrong
act an agent would do (a file it would write, a command it would run, a choice it would make)
and what that act breaks.

**Refuse**, and write nothing, when the answer is missing, or names no act ("without this,
things would be unclear", "it is better", a restatement of the decision). Say in one line what
is missing, and propose a counterfactual of your own for the maintainer to accept or correct;
a decision is written only on a counterfactual he gave or accepted.

## 2. The entry bar

A decision is written when it spans several files or is costly to undo. Otherwise refuse and
propose instead a comment where the choice applies, or nothing.

A decision on how the teacher teaches (`teacher/`, the protocol of a spec) also needs two
fresh tests that show it necessary or sufficient. Ask for them (which fresh test, what it
showed); without them, refuse and propose the test scenario instead.

## 3. The folder

The most local area the decision binds:

| Binds | Folder |
|---|---|
| one spec | `course-specs/<name>/<MAJOR>/decisions/` of each MAJOR it binds: the current one for a new rule, every live MAJOR for a bug fix |
| one course | `courses/<id>/decisions/` |
| the teacher | `teacher/decisions/` |
| the site | `site/decisions/` |
| the agentic layer (`.claude/`, `.github/`) | `.claude/decisions/` |
| two areas or more, the repository | `docs/decisions/` |

## 4. The slug, and its neighbours

Slug: two to five words, lowercase, hyphens, naming the choice, not the problem
(`classroom-as-build`, not `classroom-problem`). Never a number, never "adr".

Before writing, list every decision and grep them for the decision's key words:
`find . -path '*/decisions/*.md' -not -path '*/node_modules/*' -not -path './.claude/worktrees/*'`,
then `grep -ril --include='*.md' --exclude-dir=worktrees "<key word>" docs course-specs courses teacher site .claude | grep /decisions/`
(quoted globs: zsh stops on a pattern that matches nothing; `.claude/worktrees/` holds the
copies of other branches). A neighbour on the same point, in any of the `decisions/` folders:
show it, and ask whether the new one supersedes it, amends it (an "Amended" line in that file
instead, as `decision-format` says), or is distinct (say why in one line). Same slug already
taken in any folder: the same decision exists; stop. One exception: the same slug in two MAJORs
of one spec (`course-specs/<name>/1/decisions/<slug>.md`,
`course-specs/<name>/2/decisions/<slug>.md`) is one decision, copied with the tree or ported as
a bug fix (decision `versioned-objects-and-spec-layout`), not a collision; a decision written
for several MAJORs is one file in each, under one slug.

## 5. Write it

From [decision-body.md](../../reference/decision-body.md), at `<folder>/<slug>.md`:
- `date`: today; `issue`: the issue number the decision comes from, or `null`;
  `status: accepted`; `area`: the area it binds (`repo`, `agentic`, `site`, `teacher`,
  `spec:<name>`, `course:<id>`);
- first line of the body: the counterfactual, as accepted;
- then the decision in one paragraph: what is decided, where it applies, what it replaces;
- optional sections only when they add: "Options ruled out", "Consequences";
- under 40 lines. Reserved terms of `docs/glossary.md`; "decision" in the text, never "ADR".

A decision it supersedes: in the same commit, change that file's `status` to `superseded` and
add `superseded-by: <slug>` on the line after it (decision `decision-format`).

Commit it on the current issue branch (`git add <file>`,
`git commit -m "decide <slug>"`); on `main`, stop and propose `/feyn-issue` first:
a decision lands through a PR like the rest. Reply with the path and the counterfactual.
