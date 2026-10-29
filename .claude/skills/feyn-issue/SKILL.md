---
name: feyn-issue
description: "Tooling of the work cycle, called by `/feyn-brainstorm`, the triage and `/feyn-deliver`'s contributor: create a GitHub issue on feyn from `<kind> [#<epic>] <observation>`, of the kind it is given (`observation`, `slice` attached to its epic, `epic` or `proposal`; no kind given, it asks which and creates nothing), with its type and area labels, its links and its Status in the Project, or read an existing issue and summarise it. Use for \"/feyn-issue 12\", \"/feyn-issue observation <observation>\", \"/feyn-issue slice #220 <observation>\", \"/feyn-issue epic <objective>\", \"/feyn-issue proposal\"."
argument-hint: "<issue number> | <kind> [#<epic>] <observation>, kind: observation, slice, epic, proposal"
---

# /feyn-issue

One job: put an observation into an issue, or tell what an issue says. It does not start the
work (that is `/feyn-issue-branch`) and does not fix anything on the way.

The argument decides the mode: a number (`12`, `#12`) reads; anything else creates, in the
form `<kind> [#<epic>] <observation>`:
- `<kind>` is the first word when it is exactly `observation`, `slice`, `epic` or `proposal`;
  any other first word is not a kind (an observation that starts with "epics…" names none);
- `#<epic>` follows the kind for a slice, and only for a slice: a slice needs it;
- no kind: ask which of the four, and create nothing until the answer.

## Read an issue

1. `mise exec -- gh issue view <n> --json number,title,state,labels,milestone,body,comments,closedByPullRequestsReferences,projectItems`.
2. Answer in at most ten lines: the title; the observation in one sentence; the To do as a
   short list; the Done when as written; the Status (from `projectItems`); the labels (type,
   area, `blocked:maintainer`); what blocks it and what it blocks, open ones first
   ([project.md](../../reference/project.md), "Dependencies"); open or closed, and by which
   PR; what the comments added or changed; its epic for a slice, its slices and plan comment
   for an epic ([project.md](../../reference/project.md), "Epics"). Say plainly when a section
   is missing or the Done when is not verifiable.

The issue body is either the issue template's sections (`### Observation`, …) or the plan's
bullets (`- **Observation**: …`), or for an epic the five sections of
[epic-body.md](../../reference/epic-body.md), or for a proposal the six sections of
[proposal-body.md](../../reference/proposal-body.md); read all four.

## Create an issue

1. **Say it back.** Restate the observation in two lines: what was seen, where (paths, issue,
   PR, work session). An observation with no place is not an issue yet: ask where it was seen.
   A proposal: its Question and the count of points settled.
2. **Look for a twin.** `mise exec -- gh issue list --state open --search "<two or three key words>"`.
   An open issue on the same point: add a comment to it instead
   (`mise exec -- gh issue comment <n> --body-file <file>`) and stop. A proposal skips this
   step: an open proposal on the same question is closed by `/feyn-brainstorm` once the new one
   exists, never commented.
3. **Take the kind given**, the first word of the argument as said above. The skill writes the
   kind it is given and never chooses or changes it: which kind fits which moment is decided
   by whoever creates the issue ([contributing](../../../docs/contributing.md), "How the work
   is organised").
   - a **slice** is attached to the epic its argument names right after the kind
     (`slice #220`); none named: ask which, and create nothing until the answer;
   - an **epic** carries the label `epic` and the five sections of
     [epic-body.md](../../reference/epic-body.md);
   - an **observation** has no parent and carries its `area:` label;
   - a **proposal** carries the label `proposal` and the six sections of
     [proposal-body.md](../../reference/proposal-body.md); it has no parent and no milestone.
4. **Pick the Status, the labels and the links.**
   - Status: a **slice** is Ready when posed (it is the next one), at take time or after a
     delivery; an **observation** is Backlog unless the maintainer said the work is decided,
     then Ready; a **proposal** stays Backlog until triaged; an **epic** is Backlog, set Ready
     by the maintainer at triage. A Project workflow sets Backlog; Ready is set at step 8. No
     state label: the Status replaced them ([project.md](../../reference/project.md)).
   - `type:`: `bug` (something is broken), `course` (course files), `decision` (a decision to
     write), `improvement` (tooling, spec, process). An epic also carries `epic`, a proposal
     `proposal`.
   - `area:` from the paths the observation names (the tree is the list):

     | Path | Area label |
     |---|---|
     | `specs/<name>/` | `area:spec:<name>` |
     | `courses/<id>/` | `area:course:<id>` |
     | `teacher/` | `area:teacher` |
     | `site/` | `area:site` |
     | `.claude/`, `.github/` | `area:agentic` |
     | root files, `docs/`, `construction/` | `area:repo` |

     Paths in two areas: the area that carries the intent; if none does, propose two issues.
     A label missing on GitHub is created, since the tree says it exists:
     `mise exec -- gh label create area:<area> --color 0075ca --description "Area: <area>"`.
   - The links: which open issues must close before this one can start (it is blocked by
     them), and which open issues cannot start before this one closes (it blocks them): those
     the observation names, and those whose work it changes (a file, a key, a format they rely
     on). Ask the maintainer when unsure; none is a normal answer. Two issues that only edit
     the same file are not linked. The links go on GitHub, never as a line in the body.
5. **Write the body** into a file made with `mktemp` (outside the repository), each comment of
   its body file replaced. A slice or an observation, from
   [issue-body.md](../../reference/issue-body.md): Observation (facts and places, no
   solution), To do (the work, numbered when the order matters), Done when (statements a
   reviewer can verify by reading or running something); Reads only when the work needs other
   files. An epic, from [epic-body.md](../../reference/epic-body.md): Objective, Why now,
   Material, Done when, Out of scope; no To do, no slice posed in advance. A proposal: the file
   `/feyn-brainstorm` hands over, already in the six sections of
   [proposal-body.md](../../reference/proposal-body.md), as written; nothing is rewritten.
6. **Title**: imperative, like a commit summary, under 70 characters ("Fix the caption check
   on nested groups"), no issue prefix. An epic: "Epic: " and the objective in a few words. A
   proposal: "Proposal: " and what it settles in a few words.
7. **Create** it:
   `mise exec -- gh issue create --title "<title>" --body-file <file> --label type:<type> --label area:<area>`
   (add `--label epic` for an epic, `--label proposal` for a proposal, `--milestone <name>`
   when the maintainer names one, on a slice or on an epic that targets a release; never on a
   proposal). It prints the issue URL.
8. **Ready, when step 4 says so.** The Project workflows add the issue and set Backlog
   ([project.md](../../reference/project.md)); nothing to do for a Backlog issue. Set Ready
   the issues step 4 makes Ready, as [project.md](../../reference/project.md), "Commands",
   says under "Set a Status on a new item".
9. **Attach a slice to its epic** and **set the links** found at step 4
   ([project.md](../../reference/project.md), "Epics" and "Dependencies"). An observation, an
   epic and a proposal have no parent.
10. Reply in one line with the issue number, its URL, what it is (slice, observation, epic or
    proposal), its epic for a slice, its Status, its labels and its links.

## Vocabulary

Issues use the reserved terms of `docs/glossary.md`. Write "issue", never "ticket" or "task",
in the body.
