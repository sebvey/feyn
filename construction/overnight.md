# Overnight runs

A night run is one Claude Code session, opened in `~/code/workspaces/perso/feyn/`, that runs
an orchestration script (`scripts/overnight-<n>.js`) through the Workflow tool. The script is
the orchestrator: deterministic, no model in the loop between tasks. Each task is a **fresh
agent** with the model its task names; each delivered PR is **reviewed by a second fresh
agent** against the task's Done when, fixed once if needed, then **squash-merged** by a third.
The session's own context stays empty: it only receives the final report.

Tasks run **serially** in night 1 (one task at a time, in the single checkout): slower than
worktrees, but no branch races and no stale-checkout bugs on the first night. Night 2 runs
the 20 concept migrations in parallel worktrees (one agent per sub-issue) and merges them one
at a time.

## What the night may do without the maintainer

Authorised by the maintainer on 2026-10-27, for nights 1 and 2 (night 2's extension is under
"Night 2 scope", confirmed on 2026-10-27), as the list below and nothing more:
- create the public repositories `sebvey/feyn` and `sebvey/feyn-site`, push to them;
- create labels, milestones and issues on `feyn`; open, review and squash-merge PRs on `feyn`;
- create the deploy key on `feyn-site` and the secret on `feyn` (the `gh` token has the `repo`
  scope, which is enough);
- open and merge one PR on each frozen repository (`sebvey/feyn-o0o`, local clone
  `parcours-po`, and `sebvey/parcours-po-website`) that adds the freeze line to the README;
- push the issue branches `gh issue develop` creates (`/start`), and set the Status of the
  issues in the Project (In progress, Done);
- open and squash-merge the night's report PR;
- nothing else outward: no archive, no deletion, no force-push, no push to the old
  repositories beyond that PR.

For the night, this list overrides the root `CLAUDE.md` line that leaves merging, remote
branches and the Project to the maintainer: the orchestrator's merge agents merge, the task
agents push their branches and set the Status.

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
- Whatever the status, leave the checkout clean and on `main`: a note written for a blocked
  task is committed and pushed on the issue branch. The next task's `/start` refuses a dirty
  tree.
- No signature line in a PR body (`/finish` step 5).
- Return raw facts, not a message: status, PR number, branch, what was verified, what the
  maintainer must do.

## Agents in worktrees

What an agent working in a worktree (a subagent with `isolation: "worktree"`, night 2) meets.
Each line is a behaviour found, with its mark ([docs/contributing.md](../docs/contributing.md),
"Tool behaviours"):
- The worktree is `.claude/worktrees/agent-<id>`, on a branch `worktree-agent-<id>` cut from
  `main`'s HEAD; `/finish after-merge` does not remove it (Claude Code, observed 2026-10-27, #115).
- A worktree with no change at the end of the agent's turn is removed (Claude Code, inferred 2026-10-27, #27).
- `git switch main` fails in a worktree (Claude Code, observed 2026-10-27, #115). `/start` there
  runs `mise exec -- gh issue develop <n> --name <branch> --base main` without `--checkout`, then
  `git fetch origin <branch>` and `git switch -c <branch> --track origin/<branch>`.
- `git push` can fail to resolve github.com from the sandbox while `gh` works; retry the push
  outside the sandbox (Claude Code, observed 2026-10-27, #27).
- A subagent cannot ask the maintainer, so work needing their acceptance runs in two phases:
  the agent delivers what does not depend on it, the maintainer answers, then the work resumes
  (Claude Code, observed 2026-10-27, #27).

## Night 1 scope

Stage 0 complete (S0-01 to S0-07), then the stage 1 tasks that need no maintainer validation
first: S1-01 (the distillation table, left for validation), S1-02 (the concept 9 prototype),
S1-03 (`SPEC.md` draft), then S1-06, S1-07, S1-08, S1-11. The night stops there: S1-04 needs
the validated table, S1-09 and S1-10 should not build on a spec the maintainer has not read.

The relaunch runs S1-07 before S1-06 (the templates must pass the checks S1-07 writes). S1-11
cannot run taught-check on the migrated course before S1-10: its PR says `Refs #24`, reports
that statement as a deviation, and issue #24 stays open. The report lands on `main` through
its own PR, merged by the night.

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
expected; that scale is intended. Do not ask me anything. When the workflow returns, check
that construction/notes/night-1.md is on main (the report PR is merged) and that
"git status --porcelain" prints nothing; do not edit or commit anything
yourself; then stop.
```

4. Go to bed. The run writes `construction/notes/night-1.md` at the end and merges it through
   a PR.

## Morning checklist (after night 1)

1. Read `construction/notes/night-1.md`: tasks done, blocked, failed; PRs merged; what needs
   you.
2. `git log --oneline main` on `feyn`: one squash commit per task; skim the ones you care about.
3. The distillation table (`construction/notes/S1-01-distillation.md`) is already validated:
   issue #14 is closed. Nothing to do.
4. Read `construction/notes/S1-02-prototype.md` and `specs/linear-course/SPEC.md`; file issues
   for what you want changed.
5. Check `https://sebvey.github.io/feyn-site/` serves the placeholder.
6. Launch night 2 (below) once its conditions hold.

## Night 2 scope

Script: `scripts/overnight-2.js`. It holds no gate and no list of dependencies: the blocked-by
links on GitHub are the single source (decision `blocked-by-links-for-dependencies`), and
`/start`'s refusal is the only check. A task `/start` refuses returns `blocked`, writes nothing,
and the night goes on with the next one that can run. `accepted` lists the tasks the maintainer
counts as done (ids as in the table below); they are not run again.

| Phase | Task | Issue | How |
|---|---|---|---|
| Wave 3 | S1-05 French language pack | #18 | main checkout, one task at a time, sonnet |
| Wave 3 | S1-09 migrate-concept workflow | #22 | same, opus |
| Migration | S1-10 20 concept migrations | #23 | one sub-issue per concept (`S1-10.<nn>`), created by the night if missing; 19 in parallel worktrees, then A2; each reviewed (opus, against the old files), fixed once, merged one at a time; then the umbrella is closed if `check-course` passes on the whole course |
| Taught-check | S1-11 run on the migrated course | #24 | the `taught-check` workflow on `parcours-po`; the issue closes once the run produced its inventory |
| Review | S1-12 full review | #25 | two independent reviewers (opus), a third merges their findings; one PR fixes or files every finding (and the taught-check's); a second taught-check run decides whether #25 closes |

S1-14 (#27) is not in the list: it runs in the daytime. S1-13 and S1-15 are daytime tasks too.

The conditions at launch are expressed through the links only:
- #93 and #22 are merged. If #22 is already merged, S1-09 is recorded done (its issue is
  closed, `/start` refuses it, the script counts a closed issue as done); the same holds for
  any task or sub-issue already closed.
- S1-05 (#18) is taken by the night, and the migration needs `lang/fr.yaml`: #23 and each
  sub-issue are blocked by #18 (the night links each sub-issue it creates; the link on #23 is
  the maintainer's). #18's own blockers (#87, #88 as the maintainer links them) must be merged,
  else #18 returns `blocked`.
- #100 blocks the A2 sub-issue only, not #23; A2 goes last. An open blocker on #23 makes the
  night skip the whole migration.
- No `blocked:maintainer` on #18, #22, #23, #24, #25.

A task already In progress with a branch is resumed, not refused; one already closed is done.

Night 2 needs, on top of the list under "What the night may do", for the plan the maintainer
set on 2026-10-27 (confirmed by the maintainer on 2026-10-27): creating the 20 sub-issues of #23
and their blocked-by links (labels, milestone, Project, parent); working in worktrees under
`.claude/worktrees/` and removing those of this night's merged branches (never forced); merging
PRs (squash); commenting on issues; reopening an issue GitHub closed at a merge (#94
workaround, S1-12); adding `blocked:maintainer` to the issue of a task that needs the
maintainer; closing #23 (through a PR that adds a line to the course's `CHANGELOG.md`), #24
and #25 when their Done when holds. Nothing else outward; the night changes no existing link
and removes no label.

The migration's rules are the maintainer's rulings on #23 (sub-headings of the site become
bold-led paragraphs, reported as "moved"; objectives 10 and 14 as they are; A2 through #100);
they are in every sub-issue's body, not in the script.

## Launch (night 2)

Same setup as night 1 (new session in `feyn/`, Opus, bypass). First check the conditions above
(`gh issue view <n> --json state` on #93 and #22, the links of #18, #23 and #100 as described, and
`main` clean).
Paste:

```
Night run 2 of the feyn construction. Use a workflow: run the script
construction/scripts/overnight-2.js with args
{"date": "<today>", "night": 2, "accepted": []}.
Add to accepted the ids of tasks I did by hand (S1-05, S1-09, S1-10, S1-11, S1-12, or a
sub-task S1-10.<nn>). About 90 agents are expected; that scale is intended. Do not ask me
anything. When the workflow returns, check that construction/notes/night-2.md is on main (the
report PR is merged) and that "git status --porcelain" prints nothing; do not edit
or commit anything yourself; then stop.
```

If night 1 or an earlier part of night 2 left tasks blocked (see the report), unblock them first
or accept that what depends on them is skipped.

## After night 2 (daytime)

S1-13 (guard), S1-15 (Fable review), S1-16 (fixes and the `linear-course/v1.0.0` tag); then
the stage 2 nights, whose scripts are written after stage 1 is tagged.
