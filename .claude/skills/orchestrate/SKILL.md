---
name: orchestrate
description: Run the issue cycle on feyn from the main conversation - a contributor subagent per issue in its own worktree (/start, the work, /finish without merging), an independent review by a fresh agent against the Done when, a corrections pass, the hand-over to the maintainer, then the clean-up after the merge (worktree and worktree-agent branch). Use for "/orchestrate <n>", "run issue 12 through agents", "take 12 and 14 in parallel".
argument-hint: "<issue number> [<issue number>…]"
---

# /orchestrate <n> [<n>…]

One job: drive issue n from Ready to merged without doing the work in the main conversation.
The main conversation is the orchestrator: it briefs, checks and relays; a contributor agent
does the work, a fresh agent reviews it, the maintainer merges. Every PR is reviewed by a fresh
agent before it reaches the maintainer (decision `fresh-agent-review-before-maintainer`).

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
  conversation? Then the brief gives it verbatim, with the date. Otherwise the contributor
  takes the decision-awaited path (step 4).
- A Done when that needs an agent-workflow run: a subagent has no Workflow tool. The
  contributor makes the run possible and stops on a draft with an `Awaiting the orchestrator`
  section (exact script path and arguments). Ask the maintainer for an explicit go-ahead in
  the conversation, run it, and resume the contributor with the result; reruns after fixes are
  part of that validation.

## 2. The contributor agent

`Agent` with `isolation: "worktree"`, the model above, and the
[contributor brief](#contributor-brief) filled in. Keep its id: the corrections pass and the
clean-up need it. Wait for its reply; never do its work in parallel.

Its reply gives the branch, the PR, the files changed, the checks and what it was unsure of.
Check it before going on: the PR exists (`mise exec -- gh pr view <pr> --json title,isDraft,body`),
its title follows `<type>(<area>): <summary>`, the body starts with `Closes #<n>` or `Refs #<n>`
(or the awaiting section), no signature line.

## 3. Independent review

A new `Agent` (never the contributor, never resumed from it), `opus`, with the
[reviewer brief](#reviewer-brief). It reads the PR, not the contributor's reply. A PR with
checks to rerun (any check or fixture runner: a course, `site/`, `specs/*/checks/`): give the
reviewer `isolation: "worktree"` too (the brief has it check out the PR head detached), and clean its worktree with steps 6.1,
6.2 and 6.4 only: it holds no issue branch, so no `/finish after-merge` for it.

## 4. Corrections pass, decision awaited

- **Findings.** Send the blocking findings, and the non-blocking ones worth fixing, to the
  contributor agent with `SendMessage` (its id; its context is intact). It fixes, pushes and
  updates the PR body. Then check each fixed point yourself in the diff
  (`mise exec -- gh pr diff <pr>`), never on its word, and recheck the sensitive points: a
  counterfactual, a Done when verdict, a command that touches `main` or a remote branch, the
  title. A correction that rewrote more than the findings named gets a second review (step 3).
- **Decision awaited.** The contributor that leaves a decision to the maintainer opens a draft
  PR, puts `blocked:maintainer` on the issue only, writes an `Awaiting the maintainer` section
  at the top of the body, and stops (`/finish`, step 6). A decision through `/decide` takes
  this path unless the maintainer accepted its counterfactual beforehand. Relay the question,
  the options and the recommendation to the maintainer. The maintainer answers with a comment
  on the issue and removes the label; check it is gone
  (`mise exec -- gh issue view <n> --json labels`), then resume the contributor with
  `SendMessage` and the answer: it applies it, removes the section, runs
  `mise exec -- gh pr ready <pr>`. Check the applied answer yourself.
- **A decision after the hand-over.** The maintainer can refuse or settle a choice while the
  PR awaits the merge: relay it to the contributor the same way, the maintainer's words quoted,
  and review again if the change goes beyond the answer. A `/decide` decision whose
  counterfactual the maintainer accepted in the conversation needs no draft.

## 5. Hand-over to the maintainer

Reply with, one line each: the PR URL and title; the review (blocking findings found, fixed);
what the maintainer should look at first; the merge command `/finish` gives
(`mise exec -- gh pr merge <pr> --squash --delete-branch --subject "<title> (#<pr>)"`).
The merge is the maintainer's. Keep the contributor agent alive until then: a late finding
goes back to it.

## 6. After the merge

From the main checkout, on `main`:

1. The worktree: `git worktree list --porcelain` gives its path
   (`.claude/worktrees/agent-<id>`). It is locked while its agent runs
   (`locked claude agent agent-<id>`) (Claude Code, observed 2026-10-28, #128) and unlocked
   once the agent has finished (Claude Code, observed 2026-10-28, #125). Still locked: stop the
   agent (`TaskStop`), then, if needed, `git worktree unlock <path>`.
2. `git -C <path> status --porcelain` must print nothing; anything printed: stop and show it.
   Then `git worktree remove <path>`. The issue branch is no longer checked out anywhere.
3. `/finish after-merge` for the issue branch: it confirms the change landed, the Status, and
   deletes the local branch. It may have to set Done itself: the Project's workflow did not
   (GitHub, observed 2026-10-28, #125).
4. `git branch -D worktree-agent-<id>`, the branch the worktree was created on.
   `git worktree list` and `git branch --list 'worktree-agent-*'` show nothing of it left.

## Contributor brief

```
You are a feyn contributor working on GitHub issue #<n> ("<title>") in the repo at your current
working directory (a git worktree of <main checkout path>). Read CLAUDE.md first, then the
issue (`mise exec -- gh issue view <n>`), then its "Reads" files.

## How to run the cycle (you are in a worktree)
Follow `.claude/skills/start/SKILL.md` for #<n>, adapted to a worktree:
- Do NOT `git switch main` (main is checked out in the main checkout). `git fetch`, and base
  your branch on `origin/main`.
- `mise exec -- gh issue develop <n> --name <type>/<n>-<slug> --base main` WITHOUT
  `--checkout`, then `git fetch` and `git switch -c <branch> --track origin/<branch>`.
- Before any commit, run `git config --show-origin user.email` and check it shows the
  workspace identity (not empty). Never `git config user.email` nor `git -c user.email=`.
  `git` plain; `gh` and `node` through `mise exec --`.
- Set the issue's Status to In progress as /start says.
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
recommendation), and stop. You will be resumed with the answer.

## An agent-workflow run
You have no Workflow tool. A Done when that needs a run: make it runnable, open a draft with
an "Awaiting the orchestrator" section at the top (exact script path and arguments), and stop.
You will be resumed with the result.

Run the checks that exist (as /finish says). When done, reply with: branch name, PR URL, files
changed, checks run and their results, and anything you were unsure of. Stay available for a
corrections pass: review findings may come back to you.
```

## Reviewer brief

```
You review PR #<pr> (branch <branch>) on feyn, which claims to deliver issue #<n>. You are
not its contributor: trust nothing in the PR body or in any summary; recount and recheck
every claim yourself. Read CLAUDE.md, the issue (`mise exec -- gh issue view <n>`) and the files it lists, then the
PR (`mise exec -- gh pr view <pr>`, `mise exec -- gh pr diff <pr>`); read a file at the PR's
head with `git fetch` and `git show origin/<branch>:<path>`. To rerun checks in a worktree,
`git fetch` then `git switch --detach origin/<branch>` (the branch itself is checked out in
the contributor's worktree, so `git switch <branch>` fails). Change nothing, push nothing,
comment nothing.

The yardstick is the issue's Done when, statement by statement, not the PR's own verdicts.
Recheck yourself:
- each "Done when, verified" line: rerun its command, reread its file; a count, recount it;
- the checks /finish requires for what the PR touches
  (`mise exec -- gh pr diff <pr> --name-only`), rerun them;
- evidence from an agent-workflow run: read the run's transcripts
  (`~/.claude/projects/<project>/<session>/subagents/workflows/wf_*/`) and check what its
  agents actually read and did, not only what they output;
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
