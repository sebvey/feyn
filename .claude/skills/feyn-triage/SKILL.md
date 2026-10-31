---
name: feyn-triage
description: "Run a pass on the Backlog of feyn with the maintainer (moment 4 of the work cycle, Triage the Backlog): a fresh agent reads every Backlog issue against the repository and reports the stale ones with proof and a verdict, then the work session presents them one at a time, the maintainer decides, and the decision is executed. Use for \"on trie le Backlog\", \"passe sur le Backlog\", \"fais le tri du Backlog\", \"triage the Backlog\", \"Backlog pass\", \"/feyn-triage\"."
---

# /feyn-triage

One job: a pass on the Backlog with the maintainer, as
[contributing](../../../docs/contributing.md), "How the work is organised", moment 4, says. The work
session runs it: only it has the `Agent` tool for the analysing agent. The agent reads, the work
session presents and executes, the maintainer decides each item. The commands are in
[project.md](../../reference/project.md), cited here, not copied. Nothing is executed on an item
before the maintainer's decision on it.

## Progress

The rules of `CLAUDE.md`, "Working with the maintainer", hold throughout, the progress line
included: `Backlog pass: <n>/<N> treated · in progress: #<x>` at the top of each message,
computed from the working list (step 2).

## 1. The analysing agent

Spawn one fresh agent (`Agent`, model `opus`), changing nothing, with this brief, self-contained:
it is given no list of recent changes, which would steer what it sees (on 2026-10-31, an agent
briefed with one skipped #318 without a word).

> You analyse the Backlog of the repository feyn, read-only: no edit, no commit, no comment on
> GitHub. Run `git fetch` and read `origin/main` (`git show origin/main:<path>`,
> `git log origin/main`). `gh` runs through `mise exec --`. Read `CLAUDE.md`,
> `docs/contributing.md` ("How the work is organised") and `docs/glossary.md` first.
>
> The Backlog: `mise exec -- gh project item-list 4 --owner sebvey --limit 200 --format json`,
> the items whose `status` is `Backlog`. For each, read the issue with its comments
> (`mise exec -- gh issue view <n> --comments`), then the repository as it is. Ask first: does
> this issue still deserve to exist, in this form? Only then: what in it is wrong? Find what
> changed yourself: `git log origin/main --since=<the issue's updatedAt>`, the files and issues
> it cites (`git log origin/main -- <file>`, `mise exec -- gh issue view <m>`), the epics it
> could belong to (`mise exec -- gh issue list --label epic --state all --limit 200`).
>
> An issue is stale when it no longer deserves to exist in this form: done, moot, a need that
> is gone, the work of an epic, a list of several observations, a duplicate, or a body the
> repository no longer matches. Only what has a real value is kept: an issue, a file or a piece
> of code that served a need now gone is closed or removed, not kept for a possible later use; a
> need that comes back is solved then, with its context (maintainer, 2026-10-31). A file or code
> of that kind found on the way: name it after the stale issues.
>
> Report only the stale issues, ordered by number, each as: `#<n> <title>`, its frame in one
> line (what it is for, where it belongs), the proof (a commit, a file and line, an issue, each
> named), and one verdict, the first that applies in this order: close (done, or moot), fold
> into an epic (name it), split (name the observations), merge (name the issue it goes into),
> revise (say what). Then one line per Backlog issue you did not treat, with why. End with the
> counts: Backlog issues, read, stale, not treated.

Check what it returns before using it: each proof is named and can be opened, and every Backlog
issue is either reported, sound, or named as not treated.

## 2. The working list

The pass keeps its list in a file `feyn-triage-<date>.md` in the work session's scratchpad (Claude
Code's temporary folder of the work session, given in its environment): not in the repository, and
not in Claude's memory folder. One line per stale issue, in the agent's order,
`#<n> <title> · <verdict proposed> · <status>`, the status being `pending`, `presented`,
`awaiting maintainer action: <what>`, `left open: <why>`, `decided: <decision>` or `executed`.

The list is used, not only written:
- before presenting an item, reread it: a line `awaiting maintainer action` stops the pass on
  that item (step 3); otherwise the next item is the first line neither `executed` nor
  `left open`;
- after each step of an item (presented, decided, executed), write its status;
- the progress line counts its `executed` lines over its lines.

The scratchpad goes with the work session: no purge step. A pass resumed in another work session
does not find the list, and that is accepted: it starts from a new analysis (step 1), where the
issues already treated no longer come up as stale.

## 3. One item at a time

One item per message, under its own level-2 heading:
- its frame in one line: what it is for, where it belongs;
- what no longer holds, with the agent's proof;
- the options in a table (option, what it does, consequence), the verdicts in the order of step
  1;
- one recommendation, with its reason.

The next item is presented only when this one is executed, or left open by the maintainer
(status `left open: <why>`, skipped from then on). An item that waits on an action of the
maintainer (a label, a merge, an answer elsewhere) is `awaiting maintainer action: <what>`: say
what it waits on, and present nothing else.

A requirement added to an epic's Done when, by a fold or otherwise, is the maintainer's decision:
propose it as an option, never write it on the strength of another decision.

## 4. Execute the decision

As the maintainer decided, then the working list:
- **close**: `mise exec -- gh issue close <n> --reason <completed|"not planned"> --comment
  "<the reason, with the links: commit, PR, issue>"`;
- **fold into an epic**: attach it as a slice ([project.md](../../reference/project.md),
  "Epics") or close it with a comment naming the epic that covers it, as decided;
- **split**: one observation per item of its list (`/feyn-issue observation <observation>`, each
  citing the issue), then close it with a comment naming them;
- **merge**: the issue it goes into gets what it lacked (a revised body, below), then close it
  with a comment naming that issue;
- **revise**: edit the body (`mise exec -- gh issue edit <n> --body-file <file>`), ending with
  the line `Revised <YYYY-MM-DD> (Backlog pass)`.

A duplicate comment (posted twice by mistake) is hidden as duplicate, never deleted: on its
page, the comment's menu ⋯, "Hide", reason "Duplicate"; or `mise exec -- gh api graphql -f
query='mutation { minimizeComment(input: {subjectId: "<comment node id>", classifier:
DUPLICATE}) { clientMutationId } }'`, the node id read with `mise exec -- gh api
repos/sebvey/feyn/issues/<n>/comments --jq '.[] | [.node_id, .body[:60]] | @tsv'`.

## 5. End the pass

The sound Backlog issues (an observation to attach, set Ready or make an epic, a proposal to turn
into work) are routed as moment 4 says, under the same rules, one item at a time, only when the
maintainer asks: the working list then takes them as items.

When every item is executed or left open, or when the maintainer stops it: one message with the
counts (stale, executed by verdict, left open with why, not treated by the agent), the issues
created, and the observations the pass raised on its own way of working.

When the maintainer stops the pass ("on s'arrête là"), that message also says, in short, what the
list held and is lost with the work session: the items treated, and the items left with their
proposed verdict.
