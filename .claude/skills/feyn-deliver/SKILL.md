---
name: feyn-deliver
description: "Deliver a Ready story without an epic on feyn (a story with no parent epic), from Ready to the maintainer's merge: run it through the agent workflow feyn-deliver-story-workflow with no epic (a contributor agent opens the PR to main, a fresh agent reviews it against the Done when, corrections verified by a fresh agent), read its result, clean the run, hand the PR over to the maintainer, who merges, then clean up after the merge. A story under an epic, direct or not, goes to /feyn-deliver-epic; the direct delivery of a story without an epic is unchanged. Several issue numbers run in parallel when their files are distinct. Use for \"traite l'issue 240\", \"traite la 240\", \"prends l'issue 240\", \"livre la story 240\", \"take 240\", \"take issue 240\", \"deliver issue 240\", \"deliver story 240\", \"/feyn-deliver 240\", \"run issue 12 through agents\", \"take 12 and 14 in parallel\"."
argument-hint: "<issue number> [<issue number>…]"
---

# /feyn-deliver <n> [<n>…]

One job: drive story n, a story without an epic, from Ready to merged without doing the story's
changes in the work session that runs it. That work session is the orchestrator: it runs the
agent workflow `.claude/workflows/deliver-story.js` with no epic, reads its result, cleans the
run and hands over; the workflow's agents contribute, review and correct, the maintainer merges.
Every PR is reviewed by a fresh agent before it reaches the maintainer (decision
`fresh-agent-review-before-maintainer`). A story without an epic stays one PR to `main`, merged
by the maintainer (decisions `epic-on-integration-branch`, `story-with-or-without-an-epic`); the
stories of an epic are delivered by `/feyn-deliver-epic`, which this skill cites rather than
repeats where the two runs are the same.

Nothing is spawned and no run launched before the maintainer's go-ahead: they say "deliver",
"go", or name the issue, in the work session.

## Progress

While the cycle runs, each message to the maintainer holds at most three lines: what just
finished (one fact: a count, a verdict, a PR number), what runs now, and what is awaited from
the maintainer, if anything (asked by the maintainer on 2026-10-28, #184). No report per agent,
no announcement of a review before it exists, no repeat of the previous message. Findings,
counts and before/after go in the PR or the issue, and the message links them. The PR is the
report: its body and its "Delivery notes" comment; the hand-over (step 5) notifies what they do
not hold.

## 1. Before the run

- Read each issue (`mise exec -- gh issue view <n>`).
- **A story under an epic**, direct or not. Its parent
  (`mise exec -- gh api repos/sebvey/feyn/issues/<n>/parent --jq .number`; HTTP 404: none)
  carries the label `epic`: refuse in one line, "#<n> is a story of epic #<epic>:
  `/feyn-deliver-epic <epic>` delivers it" (a direct story included, its step 2, "A direct
  story"), and run nothing for that issue.
- **A direct delivery.** A story whose To do opens with the line "Direct delivery"
  (named `direct` by the maintainer at its creation, [contributing](../../../docs/contributing.md),
  "How the work is organised", moment 2) stops the cycle for that issue, before the refusals
  below: reply "this story is delivered as a direct delivery (`/feyn-issue-branch`, the
  edit, `/feyn-pull-request`): nothing to spawn", and spawn nothing.
- Then the refusals of `/feyn-issue-branch` step 1 apply: name the reason and stop for that
  issue. Except In progress: the run resumes it, its contributor taking the issue's branch and
  PR where they are.
- Several numbers: one run per issue, in parallel, only when their To do touch distinct files.
  Two issues that share a file run one after the other (the second after the first is merged).
- A decision the issue asks for: did the maintainer accept its counterfactual in this
  work session? Then `work` (step 2) gives it as accepted, verbatim, with the date: its exact
  wording is the decision's, the one thing `work` does not restate. Otherwise the contributor
  proposes the counterfactual and lists it in the Choices of "Delivery notes" and in the PR's
  Review first, which step 3 checks. A choice the issue does not settle goes to Choices
  only, unless it needs the maintainer's judgment.
- A Done when that needs an agent-workflow run: the workflow's contributor has no Workflow tool;
  it makes the run possible and names the exact script and arguments in its `unsure`. Step 3
  reads it.

## 2. The run

1. **Run** `.claude/workflows/deliver-story.js` as `/feyn-deliver-epic` step 2.3 says (its
   `whenToUse`, `scriptPath` absolute), with no epic: `issue`, `type` and `area` (the
   issue's labels without their prefix), no `epic`, no `base`; `work` only when the issue needs
   guidance beyond its To do. `work` stands on its own: the workflow's agents get it in their
   prompt and do not see the conversation, so it never points to the conversation nor quotes
   it. When `work` carries a maintainer's request, it states it restated (what to change, why)
   and dated ("asked by the maintainer on <date>"); the workflow asks its contributor to record
   it in "Delivery notes" and gives `work` to its reviewer and verifier, who check a choice said
   to be the maintainer's against it. No comment is posted on the issue or the PR to carry it.
   Beyond such a request, `work` cites only what an agent can read itself (repository files on
   `main`, issues and their comments, PRs). A note that changes the issue's Done when before
   the run is written into the issue's body
   (`mise exec -- gh issue edit <n> --body-file <file>`), not into a comment.
   While a run is launched or running, no `cd`: absolute paths and `git -C <path>`.
2. **Clean the run** as `/feyn-deliver-epic` step 2.5 says for its worktrees and their
   `worktree-wf_<run id>-<n>` branches, with one more check before each removal, since the PR is
   not merged yet: after `git fetch`, the worktree's `HEAD` is on the PR's branch on `origin`
   (`git -C <path> branch -r --contains HEAD` names `origin/<branch>`); not there: stop and show
   it. A run that opened no PR (`pr` 0, a `blocked` or `failed` run) has no branch to test: a
   worktree whose `HEAD` adds nothing to `origin/main` (`git -C <path> log origin/main..HEAD`
   prints nothing) is removed after the status check; one with commits stays, named to the
   maintainer with the run's status. Then, when the PR exists, move the local issue branch to
   its head, which a corrector's push (`git push origin HEAD:<branch>`, from a detached `HEAD`)
   does not move: `git branch -f <branch> origin/<branch>`, its worktree being gone. The local
   issue branch stays: `/feyn-merge-cleanup` deletes it after the merge (step 6).

## 3. Read the result

Every field, never only `status`:
- `ready-for-handover`: the PR is a draft
  (`mise exec -- gh pr view <pr> --json title,isDraft,body`), its title follows
  `<type>(<area>): <summary>`, the body starts with `Closes #<n>`, then has the sections of
  `/feyn-pull-request` step 5 in order (Context, Issues, Changes, Checks, Review first) within
  its limits (30 lines, blank lines and the awaiting section excluded; Review first 1 to 3
  bullets), no signature line; its `reviewLine` is in the PR's Checks, as `/feyn-deliver-epic`
  step 2.4 says for `merged`;
  the PR has one "Delivery notes" comment (`mise exec -- gh pr view <pr> --comments`,
  `/feyn-pull-request` step 5), which holds the detail: a body over its limits is fixed by
  moving its overflow to that comment, never by dropping it. Keep your own check of the
  sensitive points in the diff (`mise exec -- gh pr diff <pr>`): a counterfactual, a Done when
  count, a command that touches `main` or a remote branch, the title.
- `deviations`, whatever the status, and the `choicesMade` that add structure (a new file, a
  category, a marker, an exception to a principle): each is named in the PR's Review first (one
  bullet can name several), its options ruled out and its cost of going back in "Delivery
  notes". One missing is added by a rerun (step 4) or by your own edit of the body
  (`mise exec -- gh pr edit <pr> --body-file <file>`, within its limits) and of "Delivery notes"
  (in place, `/feyn-pull-request` step 6); the notification (step 5) names that edit.
- `unsure` that names an agent-workflow run the Done when needs: ask the maintainer for a
  go-ahead for that run, then run it; then a new run of the workflow (step 4) with `work`
  giving the run ids `wf_<id>`, their transcript directory and the result: its contributor
  applies it and its reviewer reads the transcripts.
- `needs-orchestrator`, `blocked`, `failed`: as `/feyn-deliver-epic` step 2.4 says, a question
  going to the maintainer as a decision awaited (step 4).

## 4. Reruns: corrections, decision awaited

Every change to the PR after a run goes through a new run of the workflow on the same issue,
with `work` naming the change: its contributor resumes the PR from the local issue branch,
which step 2.2 moved to the PR's head, a fresh agent reviews it, and step 2.2 cleans the run.
- **Decision awaited.** A run `blocked` on a choice only the maintainer can make (its
  `contrib.question`): put `blocked:maintainer` on the issue
  (`mise exec -- gh issue edit <n> --add-label blocked:maintainer`) and relay the question, the
  options and the recommendation. The maintainer answers with a comment on the issue and removes
  the label; check it is gone (`mise exec -- gh issue view <n> --json labels`), then rerun with
  the answer restated in `work` (step 2.1), which names that comment (its URL).
- **A late finding or a decision after the hand-over.** The maintainer can ask for a correction,
  refuse or settle a choice while the PR awaits the merge: rerun with the maintainer's request
  restated in `work` (step 2.1), in place of their words quoted; the contributor records it in
  "Delivery notes" (Choices, or a deviation when it departs from the Done when).
- **The Status.** A correction asked on a delivered PR: set the issue back to In progress
  ([project.md](../../reference/project.md), "Commands") and turn the PR back into a draft
  (`mise exec -- gh pr ready --undo <pr>`); the renewed hand-over (step 5) marks it ready and
  sets Ready for review again.

## 5. Hand-over to the maintainer

Mark the PR ready, the review and the corrections being done: `mise exec -- gh pr ready <pr>`.
Then, for a `Closes` PR only (a `Refs` issue stays In progress), set the issue Ready for review
([project.md](../../reference/project.md), "Commands":
`mise exec -- gh project item-edit 4 --owner sebvey --url <issue url> --field Status --value "Ready for review"`).
Then notify the maintainer. The PR is the report: the reply does not restate its body nor its
"Delivery notes" (the review, Review first, the deviations and the choices are there; the
Status and the path to merge the maintainer knows). It has this exact form, written in the
language of the conversation, and nothing more (asked by the maintainer on 2026-11-01, #381):

```
## PR ready to merge

- **PR**: sebvey/feyn#<pr>
- **To read**: the PR's body and its "Delivery notes"
- **Outside the PR**: <what you did on it after the run, or an anomaly of the run or its clean-up; or "nothing">
- **After the merge**: <clean-up (step 6), then the next topic if one is set>
```

The PR is named only by its bare reference `sebvey/feyn#<pr>`, never in the heading nor as a
Markdown link: the app renders that reference once, with the PR's state. "Outside the PR" is
what the PR does not hold: a line you added to Checks, a body or "Delivery notes" edited at
step 3, an anomaly of the run or of its clean-up.

A finding outside the PR that calls for follow-up work (a stale section of another file, an
issue to open) is not prose in the notification: it goes to the maintainer as a question with
buttons, the recommended option first. The merge is the maintainer's.

## 6. After the merge

From the main checkout, on `main`:

1. `mise exec -- gh pr view <pr> --json state,mergedAt` shows `MERGED`; otherwise stop and tell
   the maintainer.
2. Nothing of the runs is left: `git worktree list` and `git branch --list 'worktree-wf_*'` show
   none of their worktrees and branches; one left: clean it as step 2.2 says.
3. `/feyn-merge-cleanup <branch>` for the issue branch: it confirms the change landed, the
   Status, deletes the local branch, and names the issues now free, relayed to the maintainer in
   the clean-up reply.

## Tool behaviours

The behaviours the steps above rely on, one line each with its step
([contributing](../../../docs/contributing.md), "Tool behaviours"); those of the run and its
clean-up are in `/feyn-deliver-epic`, "Tool behaviours" (steps 2.3 and 2.5):

- Step 1, an agent-workflow run: a subagent has no Workflow tool
  (Claude Code, observed 2026-10-28, #130).
- Step 2.1: an agent workflow's agents run in the work session's working directory
  (Claude Code, observed 2026-10-28, #130).
- Step 2.1: a `cd` into a worktree moves the work session even for one command, and a run
  launched then runs its agents there (Claude Code, observed 2026-10-28, #171).
- Step 2.2: a worktree with no change at the end of its agent's turn is removed
  (Claude Code, observed 2026-10-28, #171).
- Step 2.2: the worktree is locked while its agent runs
  (Claude Code, observed 2026-10-28, #128).
- Step 6.1: a merge can fail on a GitHub error the maintainer does not see
  (GitHub, observed 2026-10-30, #320).
