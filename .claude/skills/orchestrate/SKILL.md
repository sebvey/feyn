---
name: orchestrate
description: Run the issue cycle on feyn from one work session - a contributor subagent per issue in its own worktree (/start, the work, /finish without merging), an independent review by a fresh agent against the Done when, a corrections pass, the hand-over to the maintainer, then the clean-up after the merge (worktree and worktree-agent branch). Use for "/orchestrate <n>", "run issue 12 through agents", "take 12 and 14 in parallel".
argument-hint: "<issue number> [<issue number>…]"
---

# /orchestrate <n> [<n>…]

One job: drive issue n from Ready to merged without doing the issue's changes in the work session that runs it.
That work session is the orchestrator: it briefs, checks and relays; a contributor agent
does the work, a fresh agent reviews it, the maintainer merges. Every PR is reviewed by a fresh
agent before it reaches the maintainer (decision `fresh-agent-review-before-maintainer`).

## Progress

While the cycle runs, each message to the maintainer holds at most three lines: what just
finished (one fact: a count, a verdict, a PR number), what runs now, and what is awaited from
the maintainer, if anything (asked by the maintainer on 2026-10-28, #184). No report per agent,
no announcement of a review before it exists, no repeat of the previous message. Findings,
counts and before/after go in the PR or the issue, and the message links them. The full report
comes once, at the hand-over (step 5).

## 1. Before spawning

- Read each issue (`mise exec -- gh issue view <n>`): the refusals of `/start` step 1 apply here
  first: name the reason and stop for that issue.
- Several numbers: one contributor agent per issue, in parallel, only when their To do touch
  distinct files. Two issues that share a file run one after the other (the second after the
  first is merged).
- Model of the contributor agent: `opus` for text and decisions (skills, docs, decisions,
  course material, a To do that leaves choices); `sonnet` for execution from a clear contract
  (the To do gives the exact change). The reviewer is always `opus`.
- A decision the issue asks for: did the maintainer accept its counterfactual in this
  work session? Then the brief gives it verbatim, with the date. Otherwise the contributor
  takes the decision-awaited path (step 4).
- A Done when that needs an agent-workflow run: a subagent has no Workflow tool (Claude Code,
  observed 2026-10-28, #130). The contributor makes the run possible and stops on a draft with
  an `Awaiting the orchestrator` section (exact script path and arguments): the second use of a
  draft, an awaited orchestrator run. Ask the maintainer for an explicit go-ahead in the
  work session, then run it. The run and its reruns after fixes come before step 3: the
  reviewer needs their transcripts. Resume the contributor with the result: it applies it,
  removes the section and runs `mise exec -- gh pr ready <pr>`; check it.
  - **The worktree.** A contributor that stops with no file change loses its worktree at the
    end of its turn (Claude Code, observed 2026-10-28, #171). Once it pushed its branch:
    `git worktree add -q <main checkout>/.claude/worktrees/<name> -B <branch> origin/<branch>`,
    `git -C <path> branch --set-upstream-to=origin/<branch>`, and resume it with that path.
  - **A two-phase migration** (a run whose output a contributor then fixes and delivers, as the
    S1-10 sub-issues): the orchestrator creates the branch and the worktree itself before the
    run: `git fetch origin`, `git push origin origin/main:refs/heads/<branch>`,
    `git fetch origin <branch>`,
    `git worktree add <main checkout>/.claude/worktrees/<name> -B <branch> origin/<branch>`,
    `git -C <path> branch --set-upstream-to=origin/<branch>`; sets the Status to In progress
    (`/start` step 4); runs with absolute `dest` and `report` paths into that worktree, no `cd`
    (the workflow takes its spec root from an absolute `dest`). After the run, the contributor
    is spawned without `isolation`: its current directory is the main checkout, which its brief
    forbids it to touch; it works with absolute paths, `git -C <path>` and
    `gh pr create --head <branch>`, and its brief marks the steps of `/start` already done. A
    contributor spawned with `isolation: "worktree"` cannot write nor run git in another
    worktree: Edit, `git -C` and `cd` to it are refused
    (Claude Code, observed 2026-10-28, #178). Other issues keep the path above, where the
    contributor runs `/start` first.
  - **A blind run** (a run that must not see a file). Its agents run in the work session's
    working directory (Claude Code, observed 2026-10-28, #130); a copy of the repository
    outside it cannot hold the work session: a `cd` there is reset, and `change_directory`
    did not move the next run (Claude Code, observed 2026-10-28, #171). In the run's
    worktree, delete the file (and the construction notes the workflow does not allow), then
    `cd <worktree>`: the work session's primary working directory moves there
    (Claude Code, observed 2026-10-28, #171). Run; then read `git -C <worktree> status
    --porcelain`, restore only the deleted paths the run did not rewrite (the construction
    notes), and `cd <main checkout>`. The reviewer searches its transcripts (step 3).
  - **No other `cd`.** A `cd` into a worktree moves the work session even for one command, and
    a run launched then runs its agents there (Claude Code, observed 2026-10-28, #171): while
    a run is launched or running, absolute paths and `git -C <path>`.

## 2. The contributor agent

`Agent` with `isolation: "worktree"` (none for a two-phase migration, step 1), the model above,
and the [contributor brief](#contributor-brief) filled in. Keep its id: the corrections pass and the
clean-up need it. Wait for its reply; never do its work in parallel.

Its reply gives the branch, the PR, the files changed, the checks and what it was unsure of.
Check it before going on: the PR exists (`mise exec -- gh pr view <pr> --json title,isDraft,body`),
its title follows `<type>(<area>): <summary>`, the body starts with `Closes #<n>` or `Refs #<n>`
(or the awaiting section), then has the sections of `/finish` step 5 in order (Context, Issues,
Changes, Checks, Review first) within its limits (step 5: 30 lines, blank lines and the
awaiting section excluded), no signature line.

## 3. Independent review

A new `Agent` (never the contributor, never resumed from it), `opus`, with the
[reviewer brief](#reviewer-brief). It reads the PR, not the contributor's reply. A PR with
checks to rerun (any check or fixture runner: a course, `site/`, `specs/*/checks/`): give the
reviewer `isolation: "worktree"` too (the brief has it check out the PR head detached), and
clean its worktree with steps 6.1, 6.2 and 6.4 only: it holds no issue branch, so no
`/finish after-merge` for it. A PR whose evidence is an agent-workflow run: give the reviewer
the run ids `wf_<id>` and their transcript directory, and for a blind run the deleted paths
and the worktree. A `migrate-concept` PR (the S1-10 sub-issues): add the
[migration variant](#migration-variant) to the brief; with no prototype of the concept, the run
ids given are "none" (the PR still cites its run id).

## 4. Corrections pass, decision awaited

- **Findings.** Send the blocking findings, and the non-blocking ones worth fixing, to the
  contributor agent with `SendMessage` (its id; its context is intact). It fixes, pushes and
  updates the PR body, adding to its Checks the line
  `Fresh-agent review: <N> blocking findings, fixed.` (`/finish` step 5). With no blocking
  finding, send that line too: `Fresh-agent review: no blocking finding.` A second review
  updates the same line, `<N>` counting the blocking findings of all the reviews. Then check
  each fixed point yourself in the diff (`mise exec -- gh pr diff <pr>`), never on its word,
  and recheck the sensitive points: a counterfactual, a Done when count, a command that
  touches `main` or a remote branch, the title. A second review (step 3) whenever the change
  adds or edits a decision or a check, or goes beyond the findings or the answer.
- **Decision awaited.** The contributor that leaves a decision to the maintainer opens a draft
  PR, puts `blocked:maintainer` on the issue only, writes an `Awaiting the maintainer` section
  at the top of the body, and stops (`/finish`, step 6). A decision through `/decide` takes
  this path unless the maintainer accepted its counterfactual in the work session (step 1).
  Relay the question,
  the options and the recommendation to the maintainer. The maintainer answers with a comment
  on the issue and removes the label; check it is gone
  (`mise exec -- gh issue view <n> --json labels`), then resume the contributor with
  `SendMessage` and the answer: it applies it, removes the section, runs
  `mise exec -- gh pr ready <pr>`. Check the applied answer yourself.
- **A decision after the hand-over.** The maintainer can refuse or settle a choice while the
  PR awaits the merge: relay it to the contributor with `SendMessage`, the maintainer's words
  quoted; the second-review rule above applies.

## 5. Hand-over to the maintainer

Reply with, one line each: the PR URL and title; the review (blocking findings found, fixed);
what the maintainer should look at first (the PR's Review first); the merge command `/finish`
gives (`mise exec -- gh pr merge <pr> --squash --delete-branch`).
The merge is the maintainer's. Keep the contributor agent alive until then: a late finding
goes back to it.

## 6. After the merge

From the main checkout, on `main`:

1. The worktree: `git worktree list --porcelain` gives its path
   (`.claude/worktrees/agent-<id>`), on a branch `worktree-agent-<id>` cut from `main`'s HEAD;
   `/finish after-merge` does not remove it (Claude Code, observed 2026-10-27, #115). A
   worktree with no change at the end of the agent's turn is removed
   (Claude Code, observed 2026-10-28, #171). It is locked while its agent runs
   (`locked claude agent agent-<id>`) (Claude Code, observed 2026-10-28, #128) and unlocked
   once the agent has finished (Claude Code, observed 2026-10-28, #130). Still locked: stop the
   agent (`TaskStop`), then, if needed, `git worktree unlock <path>`.
2. `git -C <path> status --porcelain` must print nothing; anything printed: stop and show it.
   Then `git worktree remove <path>`. The issue branch is no longer checked out anywhere.
3. `/finish after-merge` for the issue branch: it confirms the change landed, the Status, and
   deletes the local branch. The Project workflow "Item closed" sets Done;
   `/finish after-merge` sets it only when that Project workflow is off. Its line on the
   parent issue to close and the issues now free (`/finish`, "Clean up", step 7) is relayed
   to the maintainer in the clean-up reply.
4. `git branch -D worktree-agent-<id>`, the branch the worktree was created on.
   `git worktree list` and `git branch --list 'worktree-agent-*'` show nothing of it left.

A worktree you created (step 1, `.claude/worktrees/<name>`): steps 2 and 3 the same way. It
holds the issue branch, so there is no `worktree-agent-*` branch for it; but the lost
worktree of its contributor leaves its `worktree-agent-<id>` branch behind
(Claude Code, observed 2026-10-28, #171): delete that one with step 4. A contributor spawned
without `isolation` (a two-phase migration) has no worktree of its own: no
`worktree-agent-*` branch to delete.

## Contributor brief

```
You are a feyn contributor working on GitHub issue #<n> ("<title>") in the repo at your current
working directory (a git worktree of <main checkout path>; for a two-phase migration, the
worktree <path>, your working directory being the main checkout). Read CLAUDE.md first, then the
issue (`mise exec -- gh issue view <n>`), then its "Reads" files.

## How to run the cycle (in a worktree)
Follow `.claude/skills/start/SKILL.md` for #<n>, adapted to a worktree:
- Do NOT `git switch main` (main is checked out in the main checkout): it fails in a worktree
  (Claude Code, observed 2026-10-27, #115). `git fetch`, then
  `git switch -c <type>/<n>-<slug> origin/main` and `git push -u origin <type>/<n>-<slug>`.
- Before any commit, run `git config --show-origin user.email` and check it shows the
  workspace identity (not empty). Never `git config user.email` nor `git -c user.email=`.
  `git` plain; `gh` and `node` through `mise exec --`.
- Set the issue's Status to In progress as /start says.
- `git push` can fail to resolve github.com from the sandbox while `gh` works; retry the push
  outside the sandbox (Claude Code, observed 2026-10-27, #27).
(Two-phase migration, spawned without isolation: your current directory is the main checkout:
never edit, commit or switch there. The branch, the worktree <path> and the Status are done:
skip their steps above. Absolute paths, `git -C <path>`, `gh pr create --head <branch>`.)
Then do the work, then follow `.claude/skills/finish/SKILL.md` to push and open the PR. Do NOT
merge. No signature or generated-by line in the PR body (the squash uses it as the commit
message).

## The work
<the To do items this agent owns, with what the orchestrator already knows: files to match,
reserved terms, counterfactuals the maintainer accepted (verbatim, with the date)>

## A decision for the maintainer
A choice the issue does not settle, or a /decide decision whose counterfactual the maintainer
has not accepted: open the PR as a draft, put `blocked:maintainer` on the issue only (not the
PR), write an "Awaiting the maintainer" section at the top of the body (question, options,
recommendation), and stop. You cannot ask the maintainer, so work needing their acceptance
runs in two phases: you deliver what does not depend on it, the maintainer answers, then you
are resumed with the answer and the work resumes (Claude Code, observed 2026-10-27, #27).

## An agent-workflow run
You have no Workflow tool. A Done when that needs a run: make it runnable, open a draft with
an "Awaiting the orchestrator" section at the top (exact script path and arguments), and stop.
The orchestrator runs it and resumes you with the result: apply it, remove the section, run
`mise exec -- gh pr ready <pr>`. Spawned with isolation, your worktree is removed when you stop
with no file change: the orchestrator creates one on your branch and resumes you with its
absolute path. From then on (from the start, spawned without isolation), never `cd`: absolute paths for every file, `git -C <path>` for every git command,
including those of /finish (`git -C <path> status --porcelain`, `git -C <path> push`).

Run the checks that exist (as /finish says). When done, reply with: branch name, PR URL, files
changed, checks run and their results, and anything you were unsure of. Stay available for a
corrections pass: review findings may come back to you.
```

## Reviewer brief

```
You review PR #<pr> (branch <branch>) on feyn, which claims to deliver issue #<n>. You are
not its contributor: trust nothing in the PR body or in any summary; recount and recheck
every claim yourself. Read CLAUDE.md, the issue (`mise exec -- gh issue view <n>`) and the
files it lists, then the PR (`mise exec -- gh pr view <pr>`, `mise exec -- gh pr diff <pr>`); read a file at the PR's
head with `git fetch` and `git show origin/<branch>:<path>`. To rerun checks in a worktree,
`git fetch` then `git switch --detach origin/<branch>` (the branch itself is checked out in
the contributor's worktree, so `git switch <branch>` fails). Change nothing, push nothing,
comment nothing.

The yardstick is the issue's Done when, statement by statement, not the PR's own verdicts.
Recheck yourself:
- each statement of the issue's Done when: find the proof yourself (run a command, read a
  file; a count, recount it); the PR gives only the verdict counts and why a statement is not
  met or deviates, and those you check too;
- the checks /finish requires for what the PR touches
  (`mise exec -- gh pr diff <pr> --name-only`), rerun them;
- evidence from an agent-workflow run
  (<run ids wf_<id> and transcript directory, or "none">): read the run's transcripts and check what its agents actually read and did, not only what
  they output. The directory moves with the work session's working directory (Claude Code,
  observed 2026-10-28, #130); not found: `find ~/.claude/projects -type d -name 'wf_<id>*'`.
  A blind run (<the deleted paths and the worktree, or "none">): each agent's `"cwd"` is that
  worktree, and no tool call reads a deleted path or the main checkout's copy of it, or runs
  `git` (the workflow's agents are told not to use git: a `git` call can reach the deleted
  file through history);
- reserved terms of docs/glossary.md and the words it bans; the rules of CLAUDE.md
  (language, no em-dashes in French, title `<type>(<area>): <summary>`, `Closes #<n>`, no
  signature line);
- consistency with the files the change must match (sibling skills, docs/contributing.md,
  decisions it names), and that every path, command and decision slug it cites exists;
- a decision: its counterfactual names a concrete wrong act, and the maintainer accepted it.

Report, nothing else:
- Verdict per Done when statement: met, not met, deviation, with your own proof.
- Blocking findings (the PR must not reach the maintainer as is): file, line, what is wrong,
  what fixes it.
- Non-blocking findings: same format, one line each.
- What you could not check, and why.
```

### Migration variant

Appended to the reviewer brief for a PR that delivers a `migrate-concept` run (rule D on #23,
2026-10-28: the comparison with the old course is dropped; what counts is the quality of the
new concept):

```
This PR migrates concept <n> into <concept folder>. Judge the new concept, not its likeness to
the old one:
- against specs/linear-course/SPEC.md: the reader text of concept.md, the frontmatter, the
  three files of section 4, and each diagram under section 7.2 (open the SVGs and the
  renderings of the report);
- against specs/linear-course/PROTOCOL.md: what the teacher reads in teaching.md and
  sources.md;
- under rules A to C of #23: glossary-order failures listed under Checks, not fixed (A); the
  citation line of « Consignes » in its one form, no teaching content added (B); each orphan
  reference tied to the claim it supports or removed, the PR saying which (C);
- read the old concept once (<old concept file>, <site page>), as the only guard against a
  passage lost: name a lost passage as a finding, never a rewording that keeps the meaning.
This replaces the brief's bullet on evidence from an agent-workflow run: read the run's
transcripts only when a hand migration of this concept existed before the run (a prototype in
construction/notes/), to check that no agent of the run read it. With no prototype, the
transcripts are not read.
```
