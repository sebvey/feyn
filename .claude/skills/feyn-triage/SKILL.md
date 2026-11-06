---
name: feyn-triage
description: "Triage with the maintainer the ideas they name, one at a time, into the work items they decide or a close. Use for \"trie l'idea 431\", \"trie les idées 429 et 431\", \"triage idea 431\", \"/feyn-triage 431\", \"/feyn-triage 429 431\"."
argument-hint: "<issue number> [<issue number> …]"
---

# /feyn-triage <n> [<n> …]

One job: triage with the maintainer the ideas they name, one at a time, as [contributing](../../../docs/contributing.md), "How the work is organised", moment 2, says. The work session reads each item and its neighbours, presents it, the maintainer decides, the work session executes. The Project's commands are in [project.md](../../reference/project.md), the checks of step 3 in the files of `reference/` it names, cited here, not copied. Nothing is executed on an item before the maintainer's decision on it.

An **idea** (Status Idea) is a finding, never converted: the triage creates from it the work items it calls for, then closes it; it never adds a Done when or a To do to it, never edits its body, never sets a kind or a `type:` label on it (decision `idea-is-never-converted`). An **option** (Status Option) is a work item, epic or story, defined and not committed: it is not triaged, its commitment is decided at an option refinement (`/feyn-refine-option`; decision `idea-and-option-before-ready`).

**The markers**: two fixed lines, the close comment of an idea, say that it went through a triage or a brainstorm, each written by the act it records and read as a marker, never as content to triage or a defect to correct: "Triaged <YYYY-MM-DD>: <work items>." (step 4) or "Brainstormed <YYYY-MM-DD>: <work items>." (`/feyn-brainstorm`): the idea was triaged, and the work items named come from it. The markers of an option are `/feyn-refine-option`'s.

## 1. The issues named

The argument is one or more issue numbers, each an idea, triaged in the order given. With no number, ask which idea to triage and do nothing until the answer.

Read each one: `mise exec -- gh issue view <n> --json number,title,url,state,labels,body,comments,updatedAt,projectItems` (its Status: [project.md](../../reference/project.md), "Commands", Read). An option (Status Option) is not triaged: say so in one line, name `/feyn-refine-option <n>`, which treats it, and go on with the others. One that is closed or whose Status is any other than Idea is not triaged either: say so in one line, with its Status, and go on. Each idea named is triaged, whatever it holds: sound or outdated, it goes through steps 3 and 4.

## 2. The working list, with several issues

With one issue named, the triage keeps no working list and writes no progress line: it is that one item, step 3 then step 4.

With several, it keeps its list in a file `feyn-triage-<date>.md` in the work session's scratchpad (Claude Code's temporary folder of the work session, given in its environment): not in the repository, and not in Claude's memory folder. One line per issue, in the order given, `#<n> <title> · <status>`, the status being `pending`, `presented`, `awaiting maintainer action: <what>`, `left open: <why>`, `decided: <decision>` or `executed`. The maintainer's rules for a pass over a list (the maintainer's instructions) hold then: the progress line `Triage: <n>/<N> treated · in progress: #<x>` at the top of each message, computed from the list.

The list is used, not only written:
- before presenting an item, reread it: a line `awaiting maintainer action` stops the triage on that item (step 3); otherwise the next item is the first line neither `executed` nor `left open`;
- after each step of an item (presented, decided, executed), write its status;
- the progress line counts its `executed` lines over its lines.

The scratchpad goes with the work session: no purge step. A triage resumed in another work session does not find the list, and that is accepted: the maintainer names the issues left.

## 3. One item at a time

**The checks**, before it is presented: those of a commitment ([commitment.md](../../reference/commitment.md), "The checks"), since a triage may create a work item Ready: the reading against the purpose first ([purpose-reading.md](../../reference/purpose-reading.md), the `stale` reread included), the staleness check, and the neighbours ([neighbours.md](../../reference/neighbours.md), the Status Done left out). Ask first: does it still deserve to exist, in this form?

One item per message, under its own level-2 heading, the decision put to the maintainer in the form the maintainer's instructions give a decision. What it holds:
- its frame in one line: an idea, what it is for, where it belongs;
- what the checks show, as their files say (purpose, staleness, neighbours);
- what it calls for, and what no longer holds, each with its proof (a commit, a file and line, an issue, each named);
- the options, from the actions of step 4 that apply to its form: close (done, moot, or a duplicate of a twin), fold into an epic, create the work items.

The questions the skill asks the maintainer after that decision, each its own decision, before it acts on the answer:
- for an idea: which work items it calls for, if any (their kind, story or epic; a story alone or under which epic; their cut, one or several), and for each its `type:` label;
- for each work item it creates: committed now (Ready) or not (Option, the default): ask, and without a clear "committed", create it Option. Committed, it is created Ready only once the conditions of a commitment hold ([commitment.md](../../reference/commitment.md), "The conditions of the act"); one that does not hold is reported with the creation, and the work item is created Option.

An item the maintainer leaves open stays Idea, and the reply says so; with several issues, its line in the working list becomes `left open: <why>`, skipped from then on. The next item is presented only when this one is executed or left open. An item that waits on an action of the maintainer (a label, a merge, an answer elsewhere): say what it waits on, and present nothing else; with several issues, its line becomes `awaiting maintainer action: <what>`.

An epic's Done when gaining a requirement: [commitment.md](../../reference/commitment.md), "The conditions of the act".

## 4. Execute the decision

As the maintainer decided, then the working list when there is one (step 2). Which form an issue is in is read as `/feyn-issue` reads it ([its skill](../feyn-issue/SKILL.md), "Read an issue").

An item labelled `stale`: [project.md](../../reference/project.md), "Labels that are not a Status".

**An idea:**
- **create the work items**: each with `/feyn-issue` in the form the maintainer chose, `story <what>`, `story #<epic> <what>` or `epic <objective>`, and its parameters: `--status Option`, or `--status Ready` when the maintainer said it is committed and the conditions of a commitment hold (step 3); `--origin`, the line its template gives for a work item from the idea #<n>; `--opened-from #<n>`, the idea, left out of the twin search. A story under an epic is created only when it is the next one the epic's plan comment marks (the policies of [contributing](../../../docs/contributing.md)); otherwise the idea is folded into that epic (below). Then close the idea as completed: `mise exec -- gh issue close <n> --reason completed --comment "Triaged <YYYY-MM-DD>: <the work items created from it, each #<m>>."`;
- **fold into an epic**: close it as completed with a comment naming the epic that covers it; what the finding adds goes into the epic's Material when the epic is still an option, as decided (a requirement added to its Done when: [commitment.md](../../reference/commitment.md), "The conditions of the act"). It is the one write to an option a triage makes: the epic is the idea's destination, not triaged, and its marker is left as it is; any other change to the epic goes to `/feyn-refine-option`;
- **close**: done, moot or a duplicate ([project.md](../../reference/project.md), "Issues", Close);
- **leave it**: it stays Idea, and the reply says so (with several issues, its line in the working list: `left open: <why>`), for instance to open a brainstorm from it (`/feyn-brainstorm`, which is then its triage).

## 5. End the triage

With one issue, the reply that reports the decision executed ends it: what was closed, created or changed, each with its link.

With several, when every item is executed or left open, or when the maintainer stops it: one message with the counts (named, executed by action, left open with why, not triaged with why), the ideas closed and the work items created from them, the options named and sent to `/feyn-refine-option`, and the findings the triage raised on its own way of working. When the maintainer stops the triage ("on s'arrête là"), that message also says, in short, what the list held and is lost with the work session: the items treated, and the items left.
