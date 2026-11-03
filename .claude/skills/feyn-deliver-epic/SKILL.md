---
name: feyn-deliver-epic
description: "Deliver a Ready epic on feyn on its integration branch, from Ready to the maintainer's merge of its epic PR: take it (integration branch, plan comment, Status), pose each story and run it through the agent workflow feyn-deliver-story-workflow, put every structural choice to the maintainer as an open question, have the whole branch reviewed by a fresh agent, hand over the epic PR, then clean up after the merge. Use for \"livre l'epic 342\", \"prends l'epic 318\", \"traite l'epic 318\", \"deliver epic 342\", \"take epic 318\", \"/feyn-deliver-epic 342\"."
argument-hint: "<epic number>"
---

# /feyn-deliver-epic <epic>

One job: deliver epic `<epic>` on its integration branch, as decision
`epic-on-integration-branch` says; the commands are in [project.md](../../reference/project.md),
"Epics", cited here, not copied. The work session is the orchestrator: it poses the stories,
runs the workflow, reads its results, writes the plan comment and the open questions; agents do
the stories' work, the maintainer answers open questions and merges the epic PR. Nothing is
spawned and no run launched before the maintainer's go-ahead (they say "deliver", "go", or name
the epic); that go-ahead covers the stories of this epic. A "debrief rule" is one of the rules
of the debrief of #317, listed in the Material of epic #342.

## Progress

The rule of `/feyn-deliver-story-alone`, "Progress": while runs are in flight, at most three
lines per message (what just finished, what runs now, what is awaited from the maintainer).
After each story merged, the progress report of step 2.7 is that message, in four lines
(maintainer, 2026-10-31). The other exception: new open questions, one line each (step 3). The
full report comes once, at the hand-over (step 5).

## 1. Take the epic

- Read it: `mise exec -- gh issue view <epic> --comments`. Refuse in one line, changing nothing,
  when it has no label `kind:epic`, no Done when, an open blocker
  ([project.md](../../reference/project.md), "Dependencies"), or a Status other than Ready or In
  progress. In progress: resume it, from its integration branch
  (`git ls-remote --heads origin '*/<epic>-*'`) and the last line of its plan comment.
- The integration branch `<type>/<epic>-<slug>` (the epic's `type:` label, three to five words of
  its title; `<integration branch>` in the commands, a story's own branch being
  `<story branch>`), cut from `origin/main` without touching the checkout: `git fetch`, then
  `git push origin origin/main:refs/heads/<integration branch>`.
- The plan comment, as [contributing](../../../docs/contributing.md), "How the work is
  organised", moment 1, says: a Delivery line naming the integration branch, the stories envisaged
  in order with the words "an estimate" (debrief rule 6: #317 planned five slices and delivered
  eight), Unknown, Dropped, then `Next story to pose: story 1.`
- The epic goes In progress with its first story: the contributor sets it (`/feyn-issue-branch`
  step 4); read it after the first run and set it if it is not.

## 2. Each story

One at a time, the next one only (rules of the cycle):

1. **Pose** it: `/feyn-issue story #<epic> <what>`, from the plan comment's
   `Next story to pose`. A story of the epic that a triage or a brainstorm created is born
   Option (by default at a triage, always from a brainstorm: `/feyn-triage` step 4,
   `/feyn-brainstorm` step 4.4): it is not committed, and `/feyn-issue-branch` refuses it. The
   orchestrator asks the maintainer to commit it (set Ready, at an option refinement,
   `/feyn-refine-option`), then names it as `Next story to pose` once they have, without
   running `/feyn-issue`: it poses no twin of it.
2. **`main` moved** (`git fetch`, then
   `git merge-base --is-ancestor origin/main origin/<integration branch>` fails): merge it in,
   never rebase, in a detached worktree of the scratchpad, never from the local integration
   branch, out of date once a story is merged
   (`git worktree add --detach <path> origin/<integration branch>`,
   `git -C <path> merge origin/main`, `git -C <path> push origin HEAD:<integration branch>`,
   `git worktree remove <path>`). A conflict outside the epic's files: tell the maintainer.
3. **Run** `.claude/workflows/deliver-story.js` in epic mode (its `whenToUse` gives the args:
   `issue`, `epic`, `base` the integration branch, `type`, `area`, `work` when the story needs
   guidance beyond its To do), with `scriptPath` absolute. A direct story is not run: "A direct
   story", below, replaces steps 2.3 to 2.5.
4. **Read the result**, every field, never only `status`:
   - `merged`: its `reviewLine` must be in the PR's Checks
     (`mise exec -- gh pr view <pr> --json body`); missing, add it
     (`mise exec -- gh pr edit <pr> --body-file <file>`).
   - `merged-with-problems`: read its `problems`, a story not closed or not Done (debrief rule
     4), or another problem of the merge. Fix it before the next story (close it, set its
     Status, [project.md](../../reference/project.md), "Commands"), or report it to the
     maintainer and wait; never the next story over it.
   - `needs-orchestrator` (blocking findings after two rounds): read them; rerun the workflow on
     the same issue with `work` naming them (its contributor resumes the branch, once step 2.5
     moved it to the PR's head), or report them.
   - `blocked`, `failed`, `merge-failed`: `contrib.question`, the `stage` that failed, or the
     merge's `problems`; a question that leaves the epic's Done when impossible goes to the
     maintainer (step 3), the rest is rerun.
   - A statement the PR makes false left in the repository, wherever the result names it (a
     finding left, `unsure`, a round's `left`), a live decision included: rerun the workflow
     with `work` naming it; a story already merged: a story posed at once corrects it (step
     2.1), before the plan's next one (decision `pr-corrects-what-it-makes-false`).
   - `deviations`, whatever the status: each becomes an open question at once (step 3).
     `choicesMade`: a structural one (a new file, a category, a marker, an exception to a
     principle) too (debrief rule 1); the others wait for the hand-over.
5. **Clean the run.** `git worktree list --porcelain` lists its worktrees,
   `.claude/worktrees/wf_<run id>-<n>`. A locked one: its agent still runs, wait. For each,
   `git -C <path> status --porcelain` must show nothing but `node_modules`; anything else: stop
   and show it. Then `git worktree remove --force <path>` (an untracked `node_modules` makes a
   plain remove refuse), `git branch -D worktree-wf_<run id>-<n>`, and the local story branch,
   `git branch -D <story branch>`, once `mise exec -- gh pr view <pr> --json state` reads
   `MERGED`. The remote story branch goes with the merge; still there
   (`git ls-remote --heads origin <story branch>`): tell the maintainer.
   A PR not merged (`needs-orchestrator`, `blocked`, `failed`, before a rerun), as
   `/feyn-deliver-story-alone` step 2.2 does: before each removal, after `git fetch`, the
   worktree's `HEAD` is on the PR's branch on `origin` (`git -C <path> branch -r --contains
   HEAD` names `origin/<story branch>`; not there: stop and show it); the worktrees gone, move
   the local story branch to the PR's head, which a corrector's push (`git push origin
   HEAD:<story branch>`, from a detached `HEAD`) does not move: `git branch -f <story branch>
   origin/<story branch>`, never the integration branch. The rerun's contributor switches to it
   and its push is a fast-forward. A run that opened no PR: as `/feyn-deliver-story-alone` step
   2.2 says, with `origin/<integration branch>` in place of `origin/main`.
6. **Two lines on the plan comment** ([project.md](../../reference/project.md), "Epics", "The
   plan comment": find it, read it into a file, append, PATCH it): `#<n> (PR #<pr>): <what it
   delivered, in a few words>`, then `Next story to pose: <the next, from the plan's order>`;
   not obvious, rewrite the plan first (step 1). After the last story:
   `Next story to pose: none, the whole-branch review is next.` (the epic closes only with its
   epic PR, step 5).
7. **The progress report** to the maintainer, at most four lines (maintainer, 2026-10-31):
   ```
   #<n> <title> (PR #<pr>) merged: <what it delivered>.
   Stories: <planned> planned (an estimate), <done> done, <in progress> in progress, <remaining> remaining.
   Open questions: <count>, <their stories, or none>.
   Next: <the next story to pose, or the whole-branch review>.
   ```
   `<planned>` is the count of stories the plan comment envisages, as last rewritten (debrief
   rule 6); `<done>` and `<in progress>` count the epic's stories closed and open
   ([project.md](../../reference/project.md), "Epics", the stories and their count);
   `<remaining>` is `<planned>` minus the other two, and when it falls below zero, the line says
   "plan exceeded" and the plan is rewritten (step 1); the open questions are counted as step 3
   says.

**A direct story.** A story whose To do opens with the line "Direct delivery" (named `direct` at
its creation, [contributing](../../../docs/contributing.md), "How the work is organised", moment
2) is delivered by the orchestrator itself, in the work session, with no workflow run and no
fresh-agent review, in place of steps 2.3 to 2.5:
- `/feyn-issue-branch <n>`, its branch cut from the integration branch (its step 3:
  `git switch -c <type>/<n>-<slug> origin/<integration branch>`), then the edit;
- `/feyn-pull-request`, the integration branch standing in for `main` throughout (its diff in
  step 2, its PR in step 6: `--base <integration branch>`), its Checks saying
  `Fresh-agent review: none, direct delivery.`, and without its step 8: a story never goes
  Ready for review;
- the merge, as the workflow's Merge stage does: `mise exec -- gh pr merge <pr> --squash
  --match-head-commit <head sha>`, close the story
  ([project.md](../../reference/project.md), "Epics", Close) and check it
  is Done; then `git switch main` and `git branch -D <type>/<n>-<slug>`; then steps 2.6 and 2.7.

## 3. Open questions

What a run or a review reports as a deviation, or as a structural choice made without the
maintainer, reaches the maintainer as an open question, never only as a line of Review first
(debrief rules 1 and 2):
- at once, and the work goes on: the line `Open question: <the choice>, <the options ruled
  out>, <the cost of going back> (#<story>)` on the plan comment
  ([contributing](../../../docs/contributing.md), "How the work is organised"), and a comment
  on the epic, numbered, each with its recommendation, ending "Answer here; the plan comment
  records the answer.";
- at once too, in the work session: tell the maintainer each new open question with its
  recommendation, one line each, `#<story>: <the choice>; recommended: <the recommendation>`,
  then the link to the comment on the epic, in the next message (after step 2.7's report when
  a story was just merged): the other exception to the line cap ("Progress"), since the
  comment on the epic notifies nobody: the orchestrator posts it from the maintainer's own
  account, and GitHub notifies nobody of their own comment (debrief rule 2);
- answered on the epic: the line `Answered: <the answer> (<date>)` right under its
  `Open question:` line, and apply the answer, by a story (posed next) when it needs work;
- the count: the plan comment's lines starting with `Open question:` that no `Answered:` line
  follows. The epic PR is not handed over while one remains.

## 4. Review of the whole branch

When the last story is merged and `main` merged in: a fresh agent (`Agent`, `subagent_type:
"feyn-pr-reviewer"`, `isolation: "worktree"`) reviews `origin/main...origin/<integration
branch>` against the epic's Done when, statement by statement, its reviewer brief adapted by
the prompt (the branch in place of a PR, the epic in place of an issue,
`git switch --detach origin/<integration branch>`), and lists every structural choice it finds
in the diff that the plan comment holds neither as open nor as answered. A blocking finding: a
story fixes it (step 2), then a fresh agent verifies the fix, as
`/feyn-pr-review` step 4 verifies corrections. A structural choice: an open question (step 3).
Clean its worktree as `/feyn-pr-review` step 2 says for a reviewer's `agent-<id>` worktree
(`TaskStop`, then unlock and remove).

## 5. The epic PR and the hand-over

When no open question remains and every story is closed and Done
([project.md](../../reference/project.md), "Epics", the stories and their count):
1. Check each statement of the epic's Done when yourself (a command, a file), not from a review.
2. Open the epic PR: `mise exec -- gh pr create --base main --head <integration branch>`, title
   `<type>(<area>): <summary>`, body starting with `Closes #<epic>`, then the sections of
   `/feyn-pull-request` step 5, Issues listing every story with its PR. Set the epic Ready for
   review ([project.md](../../reference/project.md), "Commands").
3. The hand-over message (debrief rule 5), in this order, every issue and PR number with its
   title:
   - **In short**: where the epic stands, what is awaited from the maintainer, the link to the epic PR;
   - **Context**: the epic's objective, in two lines;
   - **Course of the stories**: a table (story, PR, what it delivered, review), then the events
     off plan (stories added, reruns, problems);
   - **Result and the epic's Done when**: each statement, its verdict and its proof, checked by
     the orchestrator itself;
   - **Choices made without the maintainer**: the open questions and their answers, then the
     other choices of the runs, grouped;
   - **Off the epic**: the ideas opened, what was seen and left;
   - **After the merge**: what step 6 will do, and what the merge frees.
4. The merge is the maintainer's: the PR page, "Squash and merge".

## 6. After the maintainer's merge

1. `mise exec -- gh pr view <epic PR> --json state,mergedAt` reads `MERGED`; otherwise stop and
   tell the maintainer.
2. The epic is closed and Done (`mise exec -- gh issue view <epic> --json state,projectItems`);
   not Done after a few seconds: set it ([project.md](../../reference/project.md), "Commands").
3. `git pull --ff-only` on `main`; the local integration branch,
   `git branch -D <integration branch>` if it exists (`git branch --list <integration branch>`:
   step 1 creates none); the remote one goes with the merge (checked as in step 2.5). Every
   worktree and `worktree-*` branch of the epic's runs is gone (`git worktree list`,
   `git branch --list 'worktree-*'`).
4. The issues the epic blocked that are now free: as `/feyn-merge-cleanup` step 7, "The issues
   it blocked", for the epic.

## Tool behaviours

The behaviours the steps above rely on, one line each with its step
([contributing](../../../docs/contributing.md), "Tool behaviours"):

- Step 2.3: an agent workflow runs only in the work session: a subagent has no Workflow tool
  (Claude Code, observed 2026-10-28, #130).
- Step 2.3: `Workflow` called by name serves a frozen version of the script, hence `scriptPath`
  absolute (Claude Code, observed 2026-10-29, #269).
- Step 2.5: a workflow agent spawned with isolation works in `.claude/worktrees/wf_<run id>-<n>`
  on a branch `worktree-wf_<run id>-<n>`, kept after the run when it holds a change
  (Claude Code, observed 2026-10-31, #348).
- Step 2.5: the repository deletes a PR's head branch on its merge
  (GitHub, observed 2026-10-31, #342).
- Step 2.4: a Project workflow "Auto-archive items" archived closed slices, whose items then
  left the Project and could not be set Done; it is off since 2026-10-31
  (GitHub, observed 2026-10-31, #317).
