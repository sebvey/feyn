---
name: feyn-deliver-epic
description: "Deliver a Ready epic on its integration branch, story by story through agents, up to the hand-over of its epic PR and the cleanup after its merge. Use for \"livre l'epic 342\", \"prends l'epic 318\", \"traite l'epic 318\", \"deliver epic 342\", \"take epic 318\", \"/feyn-deliver-epic 342\"."
argument-hint: "<epic number>"
---

# /feyn-deliver-epic <epic>

One job: deliver epic `<epic>` on its integration branch, as decision `epic-on-integration-branch` says; the commands are in [project.md](../../reference/project.md), "Epics", cited here, not copied. The work session is the orchestrator: it poses the stories, runs the workflow, reads its results, writes the plan comment and the open questions; agents do the stories' work, the maintainer answers open questions and merges the epic PR. Nothing is spawned and no run launched before the maintainer's go-ahead (they say "deliver", "go", or name the epic); that go-ahead covers the stories of this epic.

## Progress

As `/feyn-deliver-story-alone`, "Progress": a progress message holds at most three lines, what just finished, what runs now, what is awaited from the maintainer. That bound holds for progress messages only: a decision put to the maintainer takes the form of step 3.

## 1. Take the epic

- **Not from the work session that refined it** (cold reading, `/feyn-refine-option` step 1): a work session that did the option refinement of the epic named, or created it Ready, does not deliver it; say so in one line and propose a new work session, started from `/feyn-deliver-epic <epic>` alone. The stories the orchestrator poses itself (step 2.1) are not concerned.
- Read it: `mise exec -- gh issue view <epic> --comments`. Refuse in one line, changing nothing, when it has no label `kind:epic`, no Done when, an open blocker ([project.md](../../reference/project.md), "Dependencies"), or a Status of Idea, Option or Done. In progress: resume it, from its integration branch (`git ls-remote --heads origin '*/<epic>-*'`) and the plan of its plan comment (the story marked next). Ready for review (its epic PR handed over, awaiting the maintainer's merge): resume it at step 6, which stops when the epic PR is not merged yet. A plan comment in an older form (no head, or no `**Log**` line) is rewritten in three parts at this step.
- The epic's Done when, taken for the first time with no baseline under a command: give it its baselines, as a dated amendment of the epic, each output checked against its statement's intent ([done-when.md](../../reference/done-when.md)); a statement they show wrong is put to the maintainer (step 3) before the first story.
- The integration branch `<type>/<epic>-<slug>` (the epic's `type:` label, three to five words of its title; `<integration branch>` in the commands, a story's own branch being `<story branch>`), cut from `origin/main` without touching the checkout: `git fetch`, then `git push origin origin/main:refs/heads/<integration branch>`.
- The plan comment, as [contributing](../../../docs/contributing.md), "How the work is organised", moment 7, says, in the form of [project.md](../../reference/project.md), "Epics", "The plan comment": first, the plan comment head (where the epic stands, what runs, what awaits the maintainer, what comes next; at most ten lines), rewritten whole at each step (steps 2.6, 3 and 5); then the plan (a Delivery line naming the integration branch; the stories envisaged in order with the words "an estimate", since #317 planned five and delivered eight, the first one marked next; Unknown; Dropped), rewritten in place at each change; below, the log, only added to. The comment that adds it and each PATCH that edits it have their output read ([project.md](../../reference/project.md), "GitHub writes").
- The epic goes In progress with its first story: the contributor sets it (`/feyn-issue-branch` step 5); read it after the first run and set it if it is not.

## 2. Each story

One at a time, the next one only (rules of the cycle):

1. **Pose** it: `/feyn-issue story #<epic> <what> --status Ready`, the story the plan marks next. Its Done when carries, copied as written, each statement the epic's Done when sets for every story (the #520 line of an epic that changes `courses/po-essai/`, forgotten for eight stories of epic #450), its command run for the story as below. Before `/feyn-issue`, check its brief: reread its Done when against itself (two statements that cannot both hold) and against the epic's Objective and Material; run each command of its Done when on `origin/<integration branch>` and write its baseline under it, as [done-when.md](../../reference/done-when.md) says, each line checked against the statement's intent and what the command cannot see looked for; check by a command each other statement it makes about the repository (`git grep` on `origin/main` and on `origin/<integration branch>`, `git ls-tree`); settle in it the form of anything foundational (vocabulary, the structure of a file of reference, the teacher's behaviour), from the Material or by an open question (step 3), never left to the contributor's choice. A story of the epic that a triage or a brainstorm created is born Option (by default at a triage, always from a brainstorm: `/feyn-triage` step 4, `/feyn-brainstorm` step 4): it is not committed, and `/feyn-issue-branch` refuses it. The orchestrator asks the maintainer to commit it (set Ready, at an option refinement, `/feyn-refine-option`), then marks it next in the plan once they have, without running `/feyn-issue`: it poses no twin of it.
2. **`main` moved** (`git fetch`, then `git merge-base --is-ancestor origin/main origin/<integration branch>` fails): merge it in, never rebase, in a detached worktree of the scratchpad, never from the local integration branch, out of date once a story is merged (`git worktree add --detach <path> origin/<integration branch>`, `git -C <path> merge origin/main`, `git -C <path> push origin HEAD:<integration branch>`), then clean that worktree as [run-cleanup.md](../../reference/run-cleanup.md) says (the worktree `<path>`, its `HEAD` on the integration branch, no local branch). A conflict outside the epic's files: tell the maintainer.
3. **Run** `.claude/workflows/deliver-story.js` in epic mode (its `whenToUse` gives the args: `issue`, `epic`, `base` the integration branch, `work` when the story needs guidance beyond its To do), with `scriptPath` absolute. A direct story is not run: "A direct story", below, replaces steps 2.3 to 2.5.
4. **Read the result**, every field, never only `status`:
   - `merged`: the workflow wrote its `reviewLine` into the PR's Checks and read it back before the merge; nothing to add.
   - `merged-with-problems`: read its `problems`, a story not closed or not Done, or another problem of the merge. Fix it before the next story (close it, set its Status, [project.md](../../reference/project.md), "Commands"), or report it to the maintainer and wait; never the next story over it.
   - `needs-orchestrator` (blocking findings the fixer left, its `left`): read them; rerun the workflow on the same issue with `work` naming them (its contributor resumes the branch, once step 2.5 moved it to the PR's head), or report them.
   - `blocked`, `failed`, `merge-failed`: `contrib.question`, the `stage` that failed, or the merge's `problems`; a question that leaves the epic's Done when impossible goes to the maintainer (step 3), the rest is rerun. A `blocked` from a baseline at the start, changed or showing a statement wrong (`/feyn-issue-branch` step 4): the orchestrator, the story's author, first rewrites the statement and its baseline as a dated amendment of the story ([done-when.md](../../reference/done-when.md)), checked by running the command on the integration branch, since the rerun resumes the branch and skips that step; then reruns.
   - A statement the PR makes false left in the repository, wherever the result names it (a finding left, `unsure`, the fixer's `left`), a live decision included: rerun the workflow with `work` naming it; a story already merged: a story posed at once corrects it (step 2.1), before the plan's next one (decision `pr-corrects-what-it-makes-false`).
   - `deviations`, whatever the status, and the `choicesMade` that add structure (a new file, a category, a marker, an exception to a principle): each is sorted at once (step 3); the other choices stay in its PR's "Delivery notes".
5. **Clean the run** as [run-cleanup.md](../../reference/run-cleanup.md) says: the run's worktrees `.claude/worktrees/wf_<run id>-<n>`, the integration branch as the base, the local `<story branch>` with the story's PR (`pr`), merged (`merged`, `merged-with-problems`) or not (`needs-orchestrator`, `blocked`, `failed`, `merge-failed`, before a rerun: the worktrees' `HEAD` on `<story branch>`); a run that opened no PR (`pr` 0): no branch on `origin`, its worktrees compared with the base.
6. **The plan comment** ([project.md](../../reference/project.md), "Epics", "The plan comment": find it, read it into a file, edit, PATCH it): in the plan, the story ticked with its PR and the next one marked, the plan rewritten first when the next is not obvious or the epic needs more stories than it envisaged (step 1); after the last story, the whole-branch review marked next (the epic closes only with its epic PR, step 5). In the log, the line `<date> #<n> (PR #<pr>): <what it delivered, in a few words>`. The head rewritten whole: the story delivered, the next one running or to pose, what awaits the maintainer (an open question, a commitment), what comes next.
7. **Tell the maintainer** ("Progress"): what the story changed, what comes next, what is awaited from them.

**A direct story.** A story whose To do opens with the line "Direct delivery" (named `direct` at its creation, [contributing](../../../docs/contributing.md), "How the work is organised", moment 5) is delivered by the orchestrator itself, in the work session, with no workflow run and no fresh-agent review, in place of steps 2.3 to 2.5:
- `/feyn-issue-branch <n> --base <integration branch>`, then the edit;
- `/feyn-pull-request --base <integration branch>`, its Checks saying `Fresh-agent review: none, direct delivery.`; no hand-over: a story never goes Ready for review;
- the merge, as the workflow's Merge stage does: `mise exec -- gh pr merge <pr> --squash --match-head-commit <head sha>`, close the story ([project.md](../../reference/project.md), "Epics", Close) and check it is Done; then the local branch `<type>/<n>-<slug>`, its PR merged, as [run-cleanup.md](../../reference/run-cleanup.md) says; then steps 2.6 and 2.7.

## 3. Sorting, open questions, answers

What a run or a review reports (a deviation, a structural choice made without the maintainer, a finding) is sorted at once, as [sort.md](../../reference/sort.md) says, the path an epic: its four cases, and for what nothing settles, an open question (its form when it reports a defect, its trace on GitHub, the decision put to the maintainer, the answer recorded, the count). An open question added to the log, or its answer recorded, rewrites the plan comment head in the same edit: what awaits the maintainer.

## 4. Review of the whole branch

When the last story is merged and `main` merged in: the fixer, a fresh agent (`Agent`, `subagent_type: "feyn-pr-fixer"`, `isolation: "worktree"`), reviews `origin/main...origin/<integration branch>` against the epic's Done when, statement by statement, its brief adapted by the prompt (the branch in place of a PR, the epic in place of an issue, `git switch --detach origin/<integration branch>`, its push `git push origin HEAD:<integration branch>`, no PR body nor "Delivery notes" to update), and lists every structural choice it finds in the diff that the plan comment holds neither as open nor as answered. A blocking finding it located and prescribed: it corrects it on the integration branch and checks the fix in the diff; a story fixes it (step 2) only when the correction is a work of its own (a behaviour, a new file), which the fixer leaves with that reason. A structural choice: sorted (step 3). Clean its worktree as [run-cleanup.md](../../reference/run-cleanup.md) says: the fixer's worktree `.claude/worktrees/agent-<id>`, its `HEAD` on the integration branch, no local branch.

## 5. The epic PR and the hand-over

When no open question remains and every story is closed and Done ([project.md](../../reference/project.md), "Epics", the stories and their count):
1. Check each statement of the epic's Done when yourself (a command, a file), not from a review.
2. Open the epic PR: `git fetch`, `git switch <integration branch>` (a local branch tracking `origin/<integration branch>`, created by the switch when there is none) and `git pull --ff-only`, then `/feyn-pull-request --base main`, its issue the epic (the integration branch is `<type>/<epic>-<slug>`); its step 1 is the check above.
3. Hand it over as [hand-over.md](../../reference/hand-over.md) says, the path an epic PR: the epic Ready for review, the notification. The merge is the maintainer's.
4. The plan comment head rewritten: the epic PR handed over, the merge awaited from the maintainer, then the cleanup (step 6, which `/feyn-deliver-epic <epic>` resumes).

## 6. After the maintainer's merge

1. `mise exec -- gh pr view <epic PR> --json state,mergedAt` reads `MERGED`; otherwise stop and tell the maintainer.
2. The epic is closed and Done (`mise exec -- gh issue view <epic> --json state,projectItems`); not Done after a few seconds: set it ([project.md](../../reference/project.md), "Commands").
3. `git switch main`, `git pull --ff-only`; then the local integration branch (step 5.2 created it), its PR (the epic PR) merged, as [run-cleanup.md](../../reference/run-cleanup.md) says. Every worktree and `worktree-*` branch of the epic's runs is gone (`git worktree list`, `git branch --list 'worktree-*'`); one left is cleaned the same way, its PR merged.
4. The issues the epic blocked that are now free: as `/feyn-merge-cleanup` step 7, "The issues it blocked", for the epic.

## Tool behaviours

The behaviours the steps above rely on, one line each with its step ([contributing](../../../docs/contributing.md), "Tool behaviours"):

- Step 2.3: an agent workflow runs only in the work session: a subagent has no Workflow tool (Claude Code, observed 2026-10-28, #130).
- Step 2.3: `Workflow` called by name serves a frozen version of the script, hence `scriptPath` absolute (Claude Code, observed 2026-10-29, #269).
