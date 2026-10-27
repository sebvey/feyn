---
name: decide
description: Write a decision on feyn (one file by slug, counterfactual first) in the decisions/ folder of the area it binds; refuse it when no counterfactual is named or the entry bar is not met. Use for "/decide", "record this decision", "write an ADR for…".
argument-hint: "<the decision, in a sentence>"
---

# /decide

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
| one spec | `specs/<name>/decisions/` |
| one course | `courses/<id>/decisions/` |
| the teacher | `teacher/decisions/` |
| the site | `site/decisions/` |
| two areas or more, the repository, the agentic layer | `docs/decisions/` |

## 4. The slug, and its neighbours

Slug: two to five words, lowercase, hyphens, naming the choice, not the problem
(`classroom-as-build`, not `classroom-problem`). Never a number, never "adr".

Before writing, list every decision: `ls docs/decisions specs/*/decisions courses/*/decisions teacher/decisions site/decisions`,
and grep their first lines for the decision's key words. A neighbour on the same point: show
it, and ask whether the new one supersedes it, amends it (edit that file instead), or is
distinct (say why in one line). Same slug already taken: the same decision exists; stop.

## 5. Write it

From [decision.md](decision.md), at `<folder>/<slug>.md`:
- `date`: today; `issue`: the issue number the decision comes from, or `null`;
  `status: accepted`; `scope`: the area it binds (`repo`, `site`, `teacher`, `spec:<name>`,
  `course:<id>`);
- first line of the body: the counterfactual, as accepted;
- then the decision in one paragraph: what is decided, where it applies, what it replaces;
- optional sections only when they add: "Options ruled out", "Consequences";
- under 40 lines. Reserved terms of `docs/glossary.md`; "decision" in the text, never "ADR".

A decision it supersedes: change that file's `status` to `superseded-by: <slug>` in the same
commit.

Commit it on the current issue branch (`mise exec -- git add <file>`,
`mise exec -- git commit -m "decide <slug>"`); on `main`, stop and propose `/ticket` first:
a decision lands through a PR like the rest. Reply with the path and the counterfactual.
