---
name: feyn-triage
description: "Triage with the maintainer the ideas of feyn they name (moment 4 of the work cycle, Triage), issues of the old format included: one or more issue numbers, triaged in the order given, one at a time; the work session looks up each one's neighbours (a twin, an epic or an option that covers or overlaps it, an open idea on the same files) and presents it with them, the maintainer decides, and the decision is executed; from an idea it creates the work items the maintainer decides (Option by default, Ready on the maintainer's word) and closes it. An option is not triaged: it goes to `/feyn-refine-option`. With no number, it asks which idea. Use for \"trie l'idea 431\", \"trie les idées 429 et 431\", \"triage idea 431\", \"/feyn-triage 431\", \"/feyn-triage 429 431\"."
argument-hint: "<issue number> [<issue number> …]"
---

# /feyn-triage <n> [<n> …]

One job: triage with the maintainer the ideas they name, one at a time, as
[contributing](../../../docs/contributing.md), "How the work is organised", moment 4, says. The
work session reads each item and its neighbours, presents it, the maintainer decides, the work
session executes. The Project's commands are in [project.md](../../reference/project.md), cited
here, not copied; the neighbour lookups of step 3 are written in step 3. Nothing is executed on
an item before the maintainer's decision on it.

An **idea** (Status Idea) is a finding, never converted: the triage creates from it the work
items it calls for, then closes it; it never adds a Done when or a To do to it, never edits its
body, never sets a kind or a `type:` label on it (decision `idea-is-never-converted`). An
**option** (Status Option) is a work item, epic or story, defined and not committed: it is not
triaged, its commitment is decided at an option refinement (`/feyn-refine-option`; decision
`idea-and-option-before-ready`).

**The markers**: two fixed lines, the close comment of an idea, say that it went through a
triage or a brainstorm, each written by the act it records and read as a marker, never as
content to triage or a defect to correct: "Triaged <YYYY-MM-DD>: <work items>." (step 4) or
"Brainstormed <YYYY-MM-DD>: <options>." (`/feyn-brainstorm`): the idea was triaged, and the
work items named come from it. The markers of an option are `/feyn-refine-option`'s.

## 1. The issues named

The argument is one or more issue numbers, each an idea, triaged in the order given. With no
number, ask which idea to triage and do nothing until the answer.

Read each one: `mise exec -- gh issue view <n> --json number,title,url,state,labels,body,comments,updatedAt,projectItems`
(its Status: [project.md](../../reference/project.md), "Commands", Read). An option (Status
Option) is not triaged: say so in one line, name `/feyn-refine-option <n>`, which treats it,
and go on with the others. One that is closed or whose Status is any other than Idea is not
triaged either: say so in one line, with its Status, and go on. Each idea named is triaged,
whatever it holds: sound or outdated, it goes through steps 3 and 4.

## 2. The working list, with several issues

With one issue named, the triage keeps no working list and writes no progress line: it is that
one item, step 3 then step 4.

With several, it keeps its list in a file `feyn-triage-<date>.md` in the work session's
scratchpad (Claude Code's temporary folder of the work session, given in its environment): not
in the repository, and not in Claude's memory folder. One line per issue, in the order given,
`#<n> <title> · <status>`, the status being `pending`, `presented`,
`awaiting maintainer action: <what>`, `left open: <why>`, `decided: <decision>` or `executed`.
The rules of `CLAUDE.md`, "Working with the maintainer", for a pass over a list hold then: the
progress line `Triage: <n>/<N> treated · in progress: #<x>` at the top of each message,
computed from the list.

The list is used, not only written:
- before presenting an item, reread it: a line `awaiting maintainer action` stops the triage on
  that item (step 3); otherwise the next item is the first line neither `executed` nor
  `left open`;
- after each step of an item (presented, decided, executed), write its status;
- the progress line counts its `executed` lines over its lines.

The scratchpad goes with the work session: no purge step. A triage resumed in another work
session does not find the list, and that is accepted: the maintainer names the issues left.

## 3. One item at a time

**Read it against the purpose**, before anything else: [vision.md](../../../docs/vision.md)
(what feyn is for, the yardstick of a change); does what it calls for serve the teacher or the
site, and how? An item labelled `stale` (posed before the frame of 2026-11-03) is, in this same
reading, re-read against that frame: against `vision.md` (the purpose, the yardstick, the
lessons) and against what replaced its frame since it was posed (a decision, a PR, a skill,
each named); it is not a second reading, and the maintainer decides whether it still holds.

**Read it against the repository.** What changed since the issue was last updated
(`git fetch`, then `git log origin/main --since=<its updatedAt>`), the files and issues it cites
(`git log origin/main -- <file>`, `mise exec -- gh issue view <m>`). Ask first: does it still
deserve to exist, in this form? An issue in Idea whose body already defines a work (a Done
when, a To do) is of the old format (step 4).

**Its neighbours**, looked up before it is presented, each command run, not assumed:
- a **twin**, an open issue on the same point:
  `mise exec -- gh issue list --state open --search "<two or three key words of its title>" --json number,title --jq '.[] | [.number, .title] | @tsv'`;
- an **epic or an option** that covers it or that it overlaps: the open items of the Project,
  with their Status and labels,
  `mise exec -- gh project item-list 4 --owner sebvey --limit 200 --format json -q '.items[] | select(.status != "Done") | [.content.number, .status, (.labels // [] | join(",")), .content.title] | @tsv'`,
  then the body of each epic or option whose title or area meets the item's
  (`mise exec -- gh issue view <m>`);
- an **open idea on the same files**: for each file or folder the item names,
  `mise exec -- gh issue list --state open --search "<path> in:body" --json number,title --jq '.[] | [.number, .title] | @tsv'`.

The item itself comes up in these searches: it is not its own neighbour.

One item per message, under its own level-2 heading:
- its frame in one line: an idea or an issue of the old format, what it is for, where it
  belongs;
- an item labelled `stale`: whether it still holds against `vision.md`, as written, reworked,
  or not at all (what replaced it), with its proof;
- its neighbours, each `#<m> <title>` with what it shares with the item (twin, covers it,
  overlaps it, same files), or "No neighbour" when the three lookups find none;
- what it calls for, and what no longer holds, each with its proof (a commit, a file and line,
  an issue, each named);
- the choices in a table (choice, what it does, consequence), from the actions of step 4 for
  its form, in this order where they apply: close (done, moot, or a duplicate of a twin), fold
  into an epic, recreate (the old format), create the work items;
- one recommendation, with its reason.

The questions the skill asks the maintainer, each before it acts on the answer:
- for an idea: which work items it calls for, if any (their kind, story or epic; a story
  alone or under which epic; their cut, one or several), and for each its `type:` label;
- for each work item it creates: committed now (Ready) or not (Option, the default): ask, and
  without a clear "committed", create it Option.

An item the maintainer leaves open stays Idea, and the reply says so;
with several issues, its line in the working list becomes `left open: <why>`, skipped from then
on. The next item is presented only when this one is executed or left open. An item that waits
on an action of the maintainer (a label, a merge, an answer elsewhere): say what it waits on,
and present nothing else; with several issues, its line becomes
`awaiting maintainer action: <what>`.

A requirement added to an epic's Done when, by a fold or otherwise, is the maintainer's decision:
propose it as a choice, never write it on the strength of another decision.

## 4. Execute the decision

As the maintainer decided, then the working list when there is one (step 2). Which form an
issue is in is read as `/feyn-issue` reads it ([its skill](../feyn-issue/SKILL.md), "Read an
issue"). The issue being triaged is not a twin of the work items created from it: when
`/feyn-issue`'s step 2, "Look for a twin", finds it, it goes on to create them, the triaged
issue left as it is and closed after.

An item labelled `stale` (step 3): the act that executes the decision removes the label when
the item holds, as written or reworked (`mise exec -- gh issue edit <n> --remove-label stale`),
before it is closed; when it no longer holds, its close comment names what replaced it. An item
left open keeps the label: it has not been decided.

**An idea:**
- **create the work items**: each with `/feyn-issue` in the form the maintainer chose,
  `story <what>`, `story #<epic> <what>` or `epic <objective>`, its Status Option, or Ready
  when the maintainer said it is committed (step 3). A story's Context ends with the origin
  line "From idea #<n>."; an epic's Material cites "idea #<n>". A story under an epic is
  created only when it is the next one the epic's plan comment names (the policies of
  [contributing](../../../docs/contributing.md)); otherwise the idea is folded into that epic
  (below). Then close the idea as completed:
  `mise exec -- gh issue close <n> --reason completed --comment "Triaged <YYYY-MM-DD>: <the work items created from it, each #<m>>."`;
- **fold into an epic**: close it as completed with a comment naming the epic that covers it;
  what the finding adds goes into the epic's Material when the epic is still an option, as
  decided (a requirement added to its Done when: step 3). It is the one write to an option a
  triage makes: the epic is the idea's destination, not triaged, and its marker is left as it
  is; any other change to the epic goes to `/feyn-refine-option`;
- **close**: done, moot or a duplicate, as not planned with the reason, or as completed when
  work already delivered settled it:
  `mise exec -- gh issue close <n> --reason <completed|"not planned"> --comment "<the reason, with the links: commit, PR, issue>"`;
- **leave it**: it stays Idea, and the reply says so (with several issues, its line in the
  working list: `left open: <why>`), for instance to open a brainstorm from it
  (`/feyn-brainstorm`, which is then its triage).

**An issue of the old format** (in Idea, its body already defining a work: a Done when, a To
do; decision `idea-is-never-converted`; an issue numbered below #424, the epic PR of epic #392,
#425 excepted, `/feyn-issue`, "Read an issue"): never rewritten in place. It is recreated as a story or
an epic, or several, as for an idea above, with `/feyn-issue`, the work it defines restated in
the new work item's form, Option or Ready as the maintainer says. Its blocked-by links, both
ways ([project.md](../../reference/project.md), "Dependencies", Read), are set again on the new
work item (Set); then it is closed as completed with a comment naming what replaces it.

A duplicate comment (posted twice by mistake) is hidden as duplicate, never deleted: on its
page, the comment's menu ⋯, "Hide", reason "Duplicate"; or `mise exec -- gh api graphql -f
query='mutation { minimizeComment(input: {subjectId: "<comment node id>", classifier:
DUPLICATE}) { clientMutationId } }'`, the node id read with `mise exec -- gh api
repos/sebvey/feyn/issues/<n>/comments --jq '.[] | [.node_id, .body[:60]] | @tsv'`.

## 5. End the triage

With one issue, the reply that reports the decision executed ends it: what was closed, created
or changed, each with its link.

With several, when every item is executed or left open, or when the maintainer stops it: one
message with the counts (named, executed by action, left open with why, not triaged with why),
the ideas closed and the work items created from them, the options named and sent to
`/feyn-refine-option`, and the findings the triage raised on its own way of working. When the
maintainer stops the triage ("on s'arrête là"), that message also says, in short, what the list
held and is lost with the work session: the items treated, and the items left.
