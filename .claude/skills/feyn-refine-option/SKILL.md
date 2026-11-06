---
name: feyn-refine-option
description: "Refine one option with the maintainer, against the purpose of feyn and the repository, up to its commitment, rework, brainstorm or close. Use for \"raffine l'option 435\", \"refine option 435\", \"/feyn-refine-option 435\"."
argument-hint: "<option number>"
---

# /feyn-refine-option <n>

One job: the **option refinement** of one option the maintainer names, as [contributing](../../../docs/contributing.md), "How the work is organised", says: the work session analyses it against the purpose of feyn (which product consumes it, [vision.md](../../../docs/vision.md)) and the repository, presents it with the result of its checks, the maintainer decides, the work session executes. It is not a replenishment: it never reviews the Option column as a whole nor chooses among the options which enter Ready; feyn commits its options one by one ([kanban](../../../docs/kanban.md), "The upstream"). The Project's commands are in [project.md](../../reference/project.md), the checks of step 2 in the files of `reference/` it names, cited here, not copied. Nothing is executed on the option before the maintainer's decision on it.

An **option** (Status Option) is a work item, epic or story, defined and not committed: the option refinement commits it, reworks it, opens a brainstorm from it, merges it, splits it, folds it into an epic or closes it (decision `idea-and-option-before-ready`). An **idea** (Status Idea) is not an option: it is triaged (`/feyn-triage`), never refined here.

**The markers**: fixed lines, the last line of an option's body, each written by the act it records and read as a marker, never as content to refine or a defect to correct; its body was rewritten in place on that date, from which what changed in the repository is read:
- `Reworked <YYYY-MM-DD> (refinement)`, written by the action rework (step 4);
- `Refined <YYYY-MM-DD> (brainstorm)`, written by `/feyn-brainstorm` when it reworks the option it opened from (its step 4);
- `Refined <YYYY-MM-DD> (triage)`, on an option reworked before the option refinement had its own skill (#444): read as a marker, never edited into the new form; a rework replaces it with its own line, as it does any earlier marker.

## 1. The option named

An option refinement is a cold reading of the option. A work session that posed the option, or wrote the material it rests on (a brainstorm, a review), does not refine it: it would reread its own work through the reasoning that produced it. Say so in one line and propose a new work session, which starts from `/feyn-refine-option <n>` alone.

The argument is one issue number. With no number, ask which option to refine and do nothing until the answer: never list the Option column to pick one. With several numbers, refine the first, and name the others at the end of the reply, each for its own `/feyn-refine-option`.

Read it: `mise exec -- gh issue view <n> --json number,title,url,state,labels,body,comments,updatedAt,projectItems` (its Status: [project.md](../../reference/project.md), "Commands", Read). Then:
- Status Idea: not refined; say so in one line and name `/feyn-triage <n>`, which treats it;
- closed, or any Status other than Option and Idea: not refined; say so in one line, with its Status.

An option named is refined whatever it holds: sound or outdated, it goes through steps 2 to 4.

## 2. The checks, before it is presented

The checks of a commitment ([commitment.md](../../reference/commitment.md), "The checks"), run on the option whatever the decision turns out to be: **Purpose** first ([purpose-reading.md](../../reference/purpose-reading.md), the `stale` reread included), then **Staleness**, then **Overlap** ([neighbours.md](../../reference/neighbours.md), the Statuses Done and Idea left out). Each command is run, not assumed.

## 3. Present it

One message, under its own level-2 heading, the decision put to the maintainer in the form the maintainer's instructions give a decision. What it holds:
- its frame in one line: epic or story, what it is for, where it belongs;
- **Purpose**, **Staleness** and **Overlap**, as their files say (step 2);
- what it still calls for, and what no longer holds, each with its proof (a commit, a file and line, an issue, each named);
- a condition of the commitment that does not hold, with what would make it hold ([commitment.md](../../reference/commitment.md), "The conditions of the act"), the #520 line proposed there when it is missing;
- the options, from the actions of step 4 that apply: close (done, moot, or a duplicate of a twin), fold into an epic, merge (into another option), split, brainstorm, rework, commit. **Brainstorm** applies when the staleness check finds that what the option builds on has changed (a product delivered, a file removed, a decision replaced), each change named with its proof: rewriting its body would rework it on a basis that no longer holds, so the choice comes before rework.

The decision asked: commit, rework (what changes), brainstorm, merge (into which option), split (into which work items), fold (into which epic), or close (completed or not planned, and why).

An option the maintainer leaves open stays Option, and the reply says so. An option that waits on an action of the maintainer (a label, a merge, an answer elsewhere): say what it waits on.

An epic's Done when gaining a requirement: [commitment.md](../../reference/commitment.md), "The conditions of the act".

## 4. Execute the decision

As the maintainer decided. Which form an issue is in is read as `/feyn-issue` reads it ([its skill](../feyn-issue/SKILL.md), "Read an issue").

An option labelled `stale`: [project.md](../../reference/project.md), "Labels that are not a Status".

- **commit**: set its Status to Ready, as [commitment.md](../../reference/commitment.md), "The conditions of the act", says (a statement the baselines show wrong: rework, below);
- **rework**: its body rewritten (`mise exec -- gh issue edit <n> --body-file <file>`, from the template of its kind), or its kind changed, a story rewritten as an epic or the reverse, in the template of its new kind, its kind label with it (`mise exec -- gh issue edit <n> --remove-label <old kind> --add-label <new kind>`), and its title ("Epic: …" for an epic); a story becoming an epic is detached from its epic, if it had one ([project.md](../../reference/project.md), "Epics", Detach). The body ends with the line `Reworked <YYYY-MM-DD> (refinement)`, in place of any earlier marker. It stays Option;
- **brainstorm**: nothing written on the option, which stays Option, its label `stale` kept until the brainstorm reworks or replaces it; the option refinement ends, and `/feyn-brainstorm <n>` opens from the option, with the changes the staleness check found;
- **merge**: the option it goes into gets what it lacked (rework, above), then close it as completed with a comment naming that option;
- **split**: one option per work item it holds, each citing it, created with `/feyn-issue` and its parameters: `--status Option`, or `--status Ready` when the maintainer says a part is committed and the conditions of a commitment hold for it; `--origin`, the origin of the option it splits, never a new form; `--opened-from #<n>`, the option, left out of the twin search. Then close the option as completed with a comment naming them. A story under an epic is created only when it is the next one the epic's plan comment marks (the policies of [contributing](../../../docs/contributing.md)); otherwise that part is folded into the epic (below);
- **fold into an epic**: close it as completed with a comment naming the epic that covers it; what it adds goes into the epic's Material when the epic is still an option, as decided (a requirement added to its Done when: [commitment.md](../../reference/commitment.md), "The conditions of the act");
- **close**: done, moot or a duplicate ([project.md](../../reference/project.md), "Issues", Close).

## 5. End it

The reply that reports the decision executed ends the option refinement: what was committed, reworked, closed or created, each with its link; the other numbers named, if any (step 1). A brainstorm decided: the reply names `/feyn-brainstorm <n>`, which the same work session runs on the maintainer's word.
