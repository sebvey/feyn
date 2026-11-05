---
name: feyn-deliver-epic
description: "Deliver a Ready epic on feyn on its integration branch, from Ready to the maintainer's merge of its epic PR: take it (integration branch, plan comment, Status), pose each story and run it through the agent workflow feyn-deliver-story-workflow, sort every deviation and structural choice, putting to the maintainer as an open question only what nothing settles, have the whole branch reviewed by a fresh agent, hand over the epic PR, then clean up after the merge. Use for \"livre l'epic 342\", \"prends l'epic 318\", \"traite l'epic 318\", \"deliver epic 342\", \"take epic 318\", \"/feyn-deliver-epic 342\"."
argument-hint: "<epic number>"
---

# /feyn-deliver-epic <epic>

One job: deliver epic `<epic>` on its integration branch, as decision
`epic-on-integration-branch` says; the commands are in [project.md](../../reference/project.md),
"Epics", cited here, not copied. The work session is the orchestrator: it poses the stories,
runs the workflow, reads its results, writes the plan comment and the open questions; agents do
the stories' work, the maintainer answers open questions and merges the epic PR. Nothing is
spawned and no run launched before the maintainer's go-ahead (they say "deliver", "go", or name
the epic); that go-ahead covers the stories of this epic.

## Progress

As `/feyn-deliver-story-alone`, "Progress": a progress message holds at most three lines, what
just finished, what runs now, what is awaited from the maintainer. That bound holds for progress
messages only: a decision put to the maintainer takes the form of step 3.

## 1. Take the epic

- Read it: `mise exec -- gh issue view <epic> --comments`. Refuse in one line, changing nothing,
  when it has no label `kind:epic`, no Done when, an open blocker
  ([project.md](../../reference/project.md), "Dependencies"), or a Status other than Ready or In
  progress. In progress: resume it, from its integration branch
  (`git ls-remote --heads origin '*/<epic>-*'`) and the plan of its plan comment (the story
  marked next). A plan comment in the old form (no `**Log**` line) is rewritten in two parts at
  this step.
- The epic's Done when, taken for the first time with no baseline under a command: give it its
  baselines, as a dated amendment of the epic, each output checked against its statement's
  intent ([done-when.md](../../reference/done-when.md)); a statement they show wrong is put to
  the maintainer (step 3) before the first story.
- The integration branch `<type>/<epic>-<slug>` (the epic's `type:` label, three to five words of
  its title; `<integration branch>` in the commands, a story's own branch being
  `<story branch>`), cut from `origin/main` without touching the checkout: `git fetch`, then
  `git push origin origin/main:refs/heads/<integration branch>`.
- The plan comment, as [contributing](../../../docs/contributing.md), "How the work is
  organised", moment 1, says, in the form of [project.md](../../reference/project.md), "Epics",
  "The plan comment": above, the plan (a Delivery line naming the integration branch; the
  stories envisaged in order with the words "an estimate", since #317 planned five and
  delivered eight, the first one marked next; Unknown; Dropped), rewritten in place at each
  change; below, the log, only added to.
- The epic goes In progress with its first story: the contributor sets it (`/feyn-issue-branch`
  step 5); read it after the first run and set it if it is not.

## 2. Each story

One at a time, the next one only (rules of the cycle):

1. **Pose** it: `/feyn-issue story #<epic> <what>`, the story the plan marks next. Before
   `/feyn-issue`, check its brief: reread its Done when against itself (two statements that
   cannot both hold) and against the epic's Objective and Material; run each command of its Done
   when on `origin/<integration branch>` and write its baseline under it, as
   [done-when.md](../../reference/done-when.md) says, each line checked against the statement's
   intent and what the command cannot see looked for; check by a command each other statement
   it makes about the repository (`git grep` on `origin/main` and on
   `origin/<integration branch>`, `git ls-tree`); settle in it the form of anything
   foundational (vocabulary, the structure of a file of reference, the teacher's behaviour),
   from the Material or by an open question (step 3), never left to the contributor's choice.
   A story of the epic that a triage or a brainstorm created is born Option (by default at a
   triage, always from a brainstorm: `/feyn-triage` step 4, `/feyn-brainstorm` moment 4): it is
   not committed, and `/feyn-issue-branch` refuses it. The orchestrator asks the maintainer to
   commit it (set Ready, at an option refinement, `/feyn-refine-option`), then marks it next in
   the plan once they have, without running `/feyn-issue`: it poses no twin of it.
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
   - `merged-with-problems`: read its `problems`, a story not closed or not Done, or another
     problem of the merge. Fix it before the next story (close it, set its
     Status, [project.md](../../reference/project.md), "Commands"), or report it to the
     maintainer and wait; never the next story over it.
   - `needs-orchestrator` (blocking findings after two rounds): read them; rerun the workflow on
     the same issue with `work` naming them (its contributor resumes the branch, once step 2.5
     moved it to the PR's head), or report them.
   - `blocked`, `failed`, `merge-failed`: `contrib.question`, the `stage` that failed, or the
     merge's `problems`; a question that leaves the epic's Done when impossible goes to the
     maintainer (step 3), the rest is rerun. A `blocked` from a changed baseline at the start
     (`/feyn-issue-branch` step 4): the orchestrator, the story's author, first rewrites the
     statement and its baseline as a dated amendment of the story
     ([done-when.md](../../reference/done-when.md)), checked by running the command on the
     integration branch, since the rerun resumes the branch and skips that step; then reruns.
   - A statement the PR makes false left in the repository, wherever the result names it (a
     finding left, `unsure`, a round's `left`), a live decision included: rerun the workflow
     with `work` naming it; a story already merged: a story posed at once corrects it (step
     2.1), before the plan's next one (decision `pr-corrects-what-it-makes-false`).
   - `deviations`, whatever the status, and the `choicesMade` that add structure (a new file,
     a category, a marker, an exception to a principle): each is sorted at once (step 3); the
     other choices stay in its PR's "Delivery notes".
5. **Clean the run**, the steps of both delivery skills, `<base>` being the integration branch,
   or `main` for a story without an epic.
   `git worktree list --porcelain` lists the run's worktrees,
   `.claude/worktrees/wf_<run id>-<n>`. A locked one: its agent still runs, wait. For each:
   - `git -C <path> status --porcelain` shows nothing but `node_modules`; anything else: stop
     and show it.
   - A PR not merged (a story without an epic, always; here `needs-orchestrator`, `blocked`,
     `failed`, before a rerun): after `git fetch`, the worktree's `HEAD` is on the PR's branch
     on `origin` (`git -C <path> branch -r --contains HEAD` names `origin/<story branch>`); not
     there: stop and show it. A run that opened no PR (`pr` 0): a worktree whose `HEAD` adds
     nothing to `origin/<base>` (`git -C <path> log origin/<base>..HEAD` prints nothing) is
     removed; one with commits stays, named to the maintainer with the run's status.
   - Then `git worktree remove --force <path>` (an untracked `node_modules` makes a plain
     remove refuse) and `git branch -D worktree-wf_<run id>-<n>`.

   Then the local story branch. A merged PR (`mise exec -- gh pr view <pr> --json state` reads
   `MERGED`): `git branch -D <story branch>`; the remote one goes with the merge, still there
   (`git ls-remote --heads origin <story branch>`): tell the maintainer. A PR not merged: move
   the local story branch to the PR's head, which a corrector's push (`git push origin
   HEAD:<story branch>`, from a detached `HEAD`) does not move: `git branch -f <story branch>
   origin/<story branch>`, never the integration branch. The rerun's contributor switches to it
   and its push is a fast-forward. For a story without an epic, that local branch stays until
   the merge: `/feyn-merge-cleanup` deletes it (its step 4).
6. **The plan comment** ([project.md](../../reference/project.md), "Epics", "The plan
   comment": find it, read it into a file, edit, PATCH it): in the plan, the story ticked with
   its PR and the next one marked, the plan rewritten first when the next is not obvious or the
   epic needs more stories than it envisaged (step 1); after the last story, the whole-branch
   review marked next (the epic closes only with its epic PR, step 5). In the log, the line
   `<date> #<n> (PR #<pr>): <what it delivered, in a few words>`.
7. **Tell the maintainer** ("Progress"): what the story changed, what comes next, what is
   awaited from them.

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

## 3. Sorting, open questions, answers

**The sort.** What a run or a review reports (a deviation, a structural choice made without the
maintainer, a finding) is sorted at once, before anything reaches the maintainer, and the work
goes on; it is never left as a line of Review first:
1. a contradiction in the orchestrator's own brief (a story's Done when against itself, or
   against the epic's Objective or Material), a wrong command among them (a deviation "wrong
   command": a line its command catches that its statement's intent does not target,
   [done-when.md](../../reference/done-when.md)): fix the brief, the story's Done when by a
   dated amendment, and what the run built on it (a rerun, step 2.4), and inform the maintainer;
2. one already settled by a decision, the epic's Material, a rule (`CLAUDE.md`, a skill, a
   spec) or an answer the maintainer gave: apply it, and inform the maintainer;
3. one a story of the plan makes moot: a line in the plan, under that story;
4. the rest, when it is costly to undo or foundational (vocabulary, the structure of a file of
   reference, the teacher's behaviour), becomes an open question; a choice that is neither
   stays in its PR's "Delivery notes".

"Inform" is a line of a progress message ("Progress"), not a question.

**An open question that reports a defect** carries, with it: the correction; the cause (the
instruction, skill step, brief or missing check that produced it or let it pass); the corrective
action at that cause, or why it is not worth one (an isolated slip); and how the next occurrence
will show that it held.

**The trace** is on GitHub, at once: the line `Open question: <the choice>, <the options ruled
out>, <the cost of going back> (#<story>)` in the log of the plan comment
([project.md](../../reference/project.md), "Epics", "The plan comment"), and a comment on the
epic, numbered, with its recommendation, ending "Answer here or in the work session; the plan
comment records the answer."

**The decision** is the message to the maintainer in the work session (GitHub notifies nobody of
the maintainer's own comment, which the orchestrator posts): one question at a time, in the form
`CLAUDE.md`, "Working with the maintainer", gives, with the link to the comment on the epic; the
next one once it is answered. It is not a progress message.

**The answer**, on the epic or in the work session, is recorded at once: the line
`Answered: <the answer> (the maintainer, <where>, <date>)`, `<where>` being `on the epic` or
`in the work session`, right under its `Open question:` line; then the answer is applied, by a
story (posed next) when it needs work.

**The count**: the log's lines starting with `Open question:` that no `Answered:` line follows.
The epic PR is not handed over while one remains.

## 4. Review of the whole branch

When the last story is merged and `main` merged in: a fresh agent (`Agent`, `subagent_type:
"feyn-pr-reviewer"`, `isolation: "worktree"`) reviews `origin/main...origin/<integration
branch>` against the epic's Done when, statement by statement, its reviewer brief adapted by
the prompt (the branch in place of a PR, the epic in place of an issue,
`git switch --detach origin/<integration branch>`), and lists every structural choice it finds
in the diff that the plan comment holds neither as open nor as answered. A blocking finding: a
story fixes it (step 2), then a fresh agent verifies the fix, as
`/feyn-pr-review` step 4 verifies corrections. A structural choice: sorted (step 3).
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
3. Tell the maintainer ("Progress"): the link to the epic PR, what they have to do, what is
   left outside the epic.
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
