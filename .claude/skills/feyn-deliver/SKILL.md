---
name: feyn-deliver
description: "Deliver a Ready issue on feyn, a slice or a standalone observation, from Ready to merged: a contributor agent in its own worktree takes the issue, does the work and opens the PR; a fresh agent reviews it against the Done when; a corrections pass; the hand-over to the maintainer, who merges; then the clean-up after the merge. Several issue numbers run in parallel when their files are distinct. Use for \"traite l'issue 240\", \"traite la 240\", \"prends l'issue 240\", \"take 240\", \"take issue 240\", \"deliver issue 240\", \"/feyn-deliver 240\", \"run issue 12 through agents\", \"take 12 and 14 in parallel\"."
argument-hint: "<issue number> [<issue number>…]"
---

# /feyn-deliver <n> [<n>…]

One job: drive issue n from Ready to merged without doing the issue's changes in the work session that runs it.
That work session is the orchestrator: it briefs, checks and relays; a contributor agent
does the work, a fresh agent reviews it, the maintainer merges. Every PR is reviewed by a fresh
agent before it reaches the maintainer (decision `fresh-agent-review-before-maintainer`).

Nothing is spawned before the maintainer's go-ahead: they say "deliver", "go", or name the
issue, in the work session; the same before any agent-workflow run.

## Progress

While the cycle runs, each message to the maintainer holds at most three lines: what just
finished (one fact: a count, a verdict, a PR number), what runs now, and what is awaited from
the maintainer, if anything (asked by the maintainer on 2026-10-28, #184). No report per agent,
no announcement of a review before it exists, no repeat of the previous message. Findings,
counts and before/after go in the PR or the issue, and the message links them. The full report
comes once, at the hand-over (step 5).

## 1. Before spawning

- Read each issue (`mise exec -- gh issue view <n>`).
- **A direct delivery.** An issue whose To do opens with the line "Direct delivery" (named
  `direct` by the maintainer at its creation, [contributing](../../../docs/contributing.md),
  "How the work is organised", moment 2) stops the cycle for that issue, before the refusals
  below: reply "this slice is delivered as a direct delivery (`/feyn-issue-branch`, the edit,
  `/feyn-pull-request`): nothing to spawn", and spawn nothing.
- Then the refusals of `/feyn-issue-branch` step 1 apply: name the reason and stop for that
  issue.
- Several numbers: one contributor agent per issue, in parallel, only when their To do touch
  distinct files. Two issues that share a file run one after the other (the second after the
  first is merged).
- Model of the contributor agent: at the least latitude left to the contributor, `opus` (an
  issue that mixes text or decisions with execution included); `sonnet` only when the To do
  gives the exact change.
- A decision the issue asks for: did the maintainer accept its counterfactual in this
  work session? Then the brief gives it verbatim, with the date. Otherwise the contributor
  takes the decision-awaited path (step 4).
- A Done when that needs an agent-workflow run: a subagent has no Workflow tool. The
  contributor makes the run possible and stops on a draft with an `Awaiting the orchestrator`
  section (exact script path and arguments): the second use of a draft, an awaited
  orchestrator run. Run it after the maintainer's go-ahead (above). The run and its reruns
  after fixes come before step 3: the reviewer needs their transcripts. Resume the contributor
  with the result: it applies it and removes the section; the PR stays a draft until the
  hand-over (step 5). Check it.

## 2. The contributor agent

`Agent` with `isolation: "worktree"`, the model above, and the
[contributor brief](contributor-brief.md) filled in. Keep its id: the corrections pass and the
clean-up need it. Wait for its reply; never do its work in parallel.

Its reply gives the branch, the PR, the files changed, the checks and what it was unsure of.
Check it before going on: the PR exists and is a draft
(`mise exec -- gh pr view <pr> --json title,isDraft,body`), its title follows
`<type>(<area>): <summary>`, the body starts with `Closes #<n>` or `Refs #<n>` (or the awaiting
section), then has the sections of `/feyn-pull-request` step 5 in order (Context, Issues,
Changes, Checks, Review first) within its limits (step 5: 30 lines, blank lines and the
awaiting section excluded), no signature line.

## 3. Independent review

Load `/feyn-pr-review <pr>`: a fresh agent reads the PR, not the contributor's reply. Pass it
what the PR does not hold: for a PR whose evidence is an agent-workflow run, the run ids
`wf_<id>` and their transcript directory. Keep the reviewer's name, which `/feyn-pr-review`
returns with its report: step 4 resumes it. A reviewer given its own worktree (checks to
rerun): once its verification is done (step 4), clean that worktree if it is still there with
steps 6.1, 6.2 and 6.4 only: it holds no issue branch, so no `/feyn-merge-cleanup` for it.

## 4. Corrections pass, decision awaited

- **Findings.** Note the PR's head (`mise exec -- gh pr view <pr> --json headRefOid`), then
  send the blocking findings, and the non-blocking ones worth fixing, to the contributor agent
  with `SendMessage` (its id; its context is intact). It fixes, pushes and updates the PR
  body, adding to its Checks the `Fresh-agent review:` line (`/feyn-pull-request` step 5);
  with no blocking finding, send that line too.
- **The reviewer verifies the corrections.** After the contributor's fixes, resume the
  reviewer with `SendMessage` to its name and the brief of `/feyn-pr-review` step 4: the PR
  and the corrections' commit range (the head noted above, then the new head). It rechecks
  each finding it raised, reruns the Done when statements the corrections touch, reads
  everything in the diff beyond its findings, and returns a short verdict: conform, or what is
  missing. What is missing goes back to the contributor, then to the reviewer again. Keep your
  own check of the sensitive points in the diff (`mise exec -- gh pr diff <pr>`): a
  counterfactual, a Done when count, a command that touches `main` or a remote branch, the
  title. A new fresh agent (step 3) only when the reviewer is gone (its name no longer
  resolves). The second-review rule of `/feyn-pull-request` step 7 does not apply here: the
  resumed reviewer rereads whatever changed.
- **Decision awaited.** The contributor that leaves a decision to the maintainer opens a draft
  PR, puts `blocked:maintainer` on the issue only, writes an `Awaiting the maintainer` section
  at the top of the body, and stops (`/feyn-pull-request`, step 6). A decision through
  `/feyn-decision` takes this path unless the maintainer accepted its counterfactual in the
  work session (step 1). Relay the question, the options and the recommendation to the
  maintainer. The maintainer answers with a comment on the issue and removes the label; check
  it is gone (`mise exec -- gh issue view <n> --json labels`), then resume the contributor with
  `SendMessage` and the answer: it applies it and removes the section; the PR stays a draft
  until the hand-over. The reviewer verifies the applied answer as it verifies corrections
  (above), the maintainer's words quoted with the range.
- **A decision after the hand-over.** The maintainer can refuse or settle a choice while the
  PR awaits the merge: relay it to the contributor with `SendMessage`, the maintainer's words
  quoted; the reviewer verifies the change as above.
- **The Status.** A correction asked on a delivered PR (a late finding, a decision after the
  hand-over): set the slice back to In progress ([project.md](../../reference/project.md),
  "Commands"); the renewed hand-over (step 5) sets Ready for review again.

## 5. Hand-over to the maintainer

Set the issue Ready for review, a `Closes` PR only (the contributor's `/feyn-pull-request` left
it In progress; [project.md](../../reference/project.md), "Commands":
`mise exec -- gh project item-edit 4 --owner sebvey --url <issue url> --field Status --value "Ready for review"`),
then mark the PR ready, the review and the corrections being done:
`mise exec -- gh pr ready <pr>`. Then reply with, one line each: the PR URL and title; the
Status; the review (blocking findings found, fixed); what the maintainer should look at first
(the PR's Review first); the merge command `/feyn-pull-request` gives
(`mise exec -- gh pr merge <pr> --squash --delete-branch`). The merge is the maintainer's. Keep
the contributor agent alive until then: a late finding goes back to it.

## 6. After the merge

From the main checkout, on `main`:

1. The worktree: `git worktree list --porcelain` gives its path
   (`.claude/worktrees/agent-<id>`), on a branch `worktree-agent-<id>` cut from `main`'s HEAD;
   `/feyn-merge-cleanup` does not remove it. A worktree with no change at the end of the
   agent's turn is already gone. It is locked while its agent runs
   (`locked claude agent agent-<id>`) and unlocked once the agent has finished. Still locked:
   stop the agent (`TaskStop`), then, if needed, `git worktree unlock <path>`.
2. `git -C <path> status --porcelain` must print nothing; anything printed: stop and show it.
   Then `git worktree remove <path>`. The issue branch is no longer checked out anywhere.
3. `/feyn-merge-cleanup <branch>` for the issue branch: it confirms the change landed, the
   Status, and deletes the local branch. The Project workflow "Item closed" sets Done;
   `/feyn-merge-cleanup` sets it only when that Project workflow is off. Its lines on the
   epic's plan comment, the epic to verify and close (set Ready for review when its plan
   comment says its last slice closed) and the issues now free (`/feyn-merge-cleanup` step 7)
   are relayed to the maintainer in the clean-up reply.
4. `git branch -D worktree-agent-<id>`, the branch the worktree was created on.
   `git worktree list` and `git branch --list 'worktree-agent-*'` show nothing of it left.

## Tool behaviours

The behaviours the steps above rely on, one line each with its step
([contributing](../../../docs/contributing.md), "Tool behaviours"):

- Step 1, an agent-workflow run: a subagent has no Workflow tool
  (Claude Code, observed 2026-10-28, #130).
- Step 6.1: the worktree of an agent spawned with isolation (`.claude/worktrees/agent-<id>`, on
  a branch `worktree-agent-<id>` cut from `main`'s HEAD) is not removed by
  `/feyn-merge-cleanup` (Claude Code, observed 2026-10-27, #115).
- Step 6.1: a worktree with no change at the end of the agent's turn is removed
  (Claude Code, observed 2026-10-28, #171).
- Step 6.1: the worktree is locked while its agent runs (`locked claude agent agent-<id>`)
  (Claude Code, observed 2026-10-28, #128).
- Step 6.1: the worktree is unlocked once the agent has finished
  (Claude Code, observed 2026-10-28, #130).
