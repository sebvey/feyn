# Overnight runs

A night run is one Claude Code session, opened in `~/code/workspaces/perso/feyn/`, that runs
an orchestration script (`scripts/overnight-<n>.js`) through the Workflow tool. The script is
the orchestrator: deterministic, no model in the loop between tasks. Each task is a **fresh
agent** with the model its task names; each delivered PR is **reviewed by a second fresh
agent** against the task's Done when, fixed once if needed, then **squash-merged** by a third.
The session's own context stays empty: it only receives the final report.

Tasks run **serially** in night 1 (one task at a time, in the single checkout): slower than
worktrees, but no branch races and no stale-checkout bugs on the first night. Night 2 (the 20
concept migrations) will use worktrees.

## What the night may do without the maintainer

Authorised by the maintainer on 2026-10-27, for night 1, as the list below and nothing more:
- create the public repositories `sebvey/feyn` and `sebvey/feyn-site`, push to them;
- create labels, milestones and issues on `feyn`; open, review and squash-merge PRs on `feyn`;
- create the deploy key on `feyn-site` and the secret on `feyn` (the `gh` token has the `repo`
  scope, which is enough);
- open and merge one PR on each frozen repository (`sebvey/feyn-o0o`, local clone
  `parcours-po`, and `sebvey/parcours-po-website`) that adds the freeze line to the README;
- nothing else outward: no archive, no deletion, no force-push, no push to the old
  repositories beyond that PR.

## Overnight rules for a task agent

In addition to `README.md` ("How a work session goes"):
- Never ask the maintainer anything. When a step needs him (a validation, a secret you cannot
  create, a design doubt), do everything that does not depend on it, write
  `construction/notes/<task-id>.md` saying exactly what is needed, and return `blocked`. The
  issue, if it exists, gets the `blocked:maintainer` label.
- Do not merge your own PR: open it, make sure the checks that exist pass, and return its
  number. The orchestrator reviews and merges.
  Exception: a task that works in the old repositories (S0-01) opens and merges its PRs there
  itself, as the script says; the orchestrator reviews the result afterwards.
- A "Done when" that says "the maintainer has read it" is satisfied overnight by the note
  being written and the PR being open; say so in the PR body.
- Before S0-07 (issues exist), tick the task in `plan/stage-N.md` in the same PR. From S0-07
  on, `/start` and `/finish` are the flow.
- Return raw facts, not a message: status, PR number, branch, what was verified, what the
  maintainer must do.

## Night 1 scope

Stage 0 complete (S0-01 to S0-07), then the stage 1 tasks that need no maintainer validation
first: S1-01 (the distillation table, left for validation), S1-02 (the concept 9 prototype),
S1-03 (`SPEC.md` draft), then S1-06, S1-07, S1-08, S1-11. The night stops there: S1-04 needs
the validated table, S1-09 and S1-10 should not build on a spec the maintainer has not read.

## Launch (night 1)

1. Make sure nothing is uncommitted in `feyn/` (there is no git yet before S0-02: fine).
2. Open a **new** Claude Code session in `~/code/workspaces/perso/feyn/`, model **Opus**,
   permission mode **bypass** (the night cannot answer prompts).
3. Paste:

```
Relaunch night run 1 of the feyn construction. Use a workflow: run the script
construction/scripts/overnight-1.js with args
{"date": "<today>", "night": 1, "accepted": ["S0-01", "S0-02", "S0-03", "S0-04", "S0-05", "S0-06", "S0-07", "S1-01"]}.
Those eight are done and merged; nothing of them is to be redone. About 25 agents are
expected; that scale is intended. Do not ask me anything. When the workflow returns, make
sure construction/notes/night-1.md exists (overwrite the previous report), then stop.
```

4. Go to bed. The run writes `construction/notes/night-1.md` at the end.

## Morning checklist (after night 1)

1. Read `construction/notes/night-1.md`: tasks done, blocked, failed; PRs merged; what needs
   you.
2. `git log --oneline main` on `feyn`: one squash commit per task; skim the ones you care about.
3. Validate the distillation table (`construction/notes/S1-01-distillation.md`): comment on the
   S1-01 issue, remove `blocked:maintainer`.
4. Read `construction/notes/S1-02-prototype.md` and `specs/linear-course/SPEC.md`; file issues
   for what you want changed.
5. Check `https://sebvey.github.io/feyn-site/` serves the placeholder.
6. Launch night 2 (below) with the gates set truthfully.

## Night 2

Script: `scripts/overnight-2.js`. Two **gates** are the maintainer's and are passed as
arguments; a phase whose gate is false is skipped and the run continues with the rest:

| Gate | Means | Unlocks |
|---|---|---|
| `distillationValidated` | you have read `construction/notes/S1-01-distillation.md`, corrected what you wanted, and removed `blocked:maintainer` from the S1-01 issue | S1-04 (protocol), then S1-05 (language pack) and S1-14 (spec and course decisions) in parallel |
| `specRead` | you have read `specs/linear-course/SPEC.md` and `construction/notes/S1-02-prototype.md`, and filed issues for what you want changed (or there is nothing) | S1-09 (migrate-concept workflow), then S1-10: the 20 concept migrations in parallel worktrees, each reviewed against the old files, merged serially; then S1-12: taught-check (the ported agent workflow, run as a child), two independent course reviews, fixes |

Not in night 2, by design: S1-13 (the old-teacher guard needs a fresh test, which an agent inside
a workflow cannot run) and S1-15 (the Fable review). Both are daytime sessions, after night 2.

Launch, same setup as night 1 (new session in `feyn/`, Opus, bypass), paste:

```
Night run 2 of the feyn construction. Use a workflow: run the script
construction/scripts/overnight-2.js with args
{"date": "<today>", "night": 2, "gates": {"distillationValidated": true, "specRead": true}}.
Set a gate to false if I have not done it. About 90 agents are expected; that scale is
intended. Do not ask me anything. When the workflow returns, make sure
construction/notes/night-2.md exists, then stop.
```

`accepted` lists the tasks the maintainer counts as done: they are not run again and their
dependants may start. After the first run of night 1 (2026-10-27), stage 0 and S1-01 are done
and merged, so the launch text above lists the eight; six tasks remain for the relaunch
(S1-02, S1-03, S1-06, S1-07, S1-08, S1-11).

If night 1 left tasks blocked (see `night-1.md`), unblock them first or accept that night 2
skips what depends on them.

## After night 2 (daytime)

S1-13 (guard), S1-15 (Fable review), S1-16 (fixes and the `linear-course/v1.0.0` tag); then
the stage 2 nights, whose scripts are written after stage 1 is tagged.
