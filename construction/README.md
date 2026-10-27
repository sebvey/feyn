# Construction of feyn

This folder exists **only during the refactoring** (stages 0 to 4 of `design/11-stages.md`).
It is versioned so that every session, worktree and contributor sees the same design and the
same plan. Stage 4 removes it: what it holds has by then become decisions, the repository
glossary, skills and closed issues.

- `design/`: the validated design (entry point `design/README.md`). It is the reference: a task
  that would contradict it stops and writes a note (below).
- `plan/`: the implementation plan, one file per stage, tasks written in the format of the
  issues they become at stage 0.
- `notes/`: findings a task leaves for the maintainer or for a later task (a prototype's
  lessons, a design doubt). One file per note, named by the task id.
- `scripts/`: construction-only scripts (`plan-to-issues`, the stage 1 adapter).
- `overnight.md`: how a night run works (orchestration script, overnight rules, launch,
  morning checklist); `scripts/overnight-<n>.js` are the runs.

## How a work session goes

1. The maintainer opens Claude Code in `~/code/workspaces/perso/feyn/` with the model the task
   names, and says: **"Take S1-04"** (or the issue number once it exists).
2. The agent reads, in this order: the root `CLAUDE.md`, this file, `design/README.md`, the
   design files the task lists, the task itself (in `plan/stage-N.md` or the issue).
3. The agent works on a branch `<type>/<task-id>-<slug>` (by hand before `/start` exists, with
   `/start` afterwards), commits through `mise exec -- git …`, and delivers a PR (by hand
   before `/finish`, with `/finish` afterwards). Squash merge; the title is
   `<type>(<area>): <summary>`.
4. Done means the task's **Done when** holds, verified, not "the code is written". The agent
   says what it verified and how.
5. Marking done: before S0-07 (issues created), tick the task in `plan/stage-N.md` (`[x]`) in
   the same PR; from S0-07 on, the issue is the truth and the plan files are frozen.

Rules for every session:
- The design is not edited by a task. A task that finds the design wrong or incomplete writes
  `notes/<task-id>.md` (what was found, the options, a recommendation), delivers what does not
  depend on it, and stops. The maintainer decides; the design file is then edited in a
  dedicated commit, and the note says so.
- `../pdx/parcours-po` and `../pdx/parcours-po-website` are read-only after the freeze (S0-01).
- Vocabulary: `design/13-glossary.md`. Language: English, French quotes untranslated. Style of
  French text: no em-dashes, no arrows.
- Nothing is pushed to `main` directly. Nothing is force-pushed. Old repositories are never
  pushed to.
- Secrets (deploy keys, tokens) are handled by the maintainer; the agent prepares the command
  and says what it needs.

## Parallel sessions

Tasks marked `parallel=yes` may run at the same time as other tasks of the same stage, each in
its own worktree, on the branch named by the task. Two sessions never touch the same files;
when a task lists a file another running task also lists, it waits. What a task depends on is
its issue's blocked-by links (`depends=` in the stage files was their source); `/start` refuses
an issue with an open blocker.

## Model policy

A recommendation per task, in its metadata line; the maintainer may override.

| Model | For | Why |
|---|---|---|
| **opus** | what is written and thought: `SPEC.md`, the protocol, the teacher template, the migration workflow, the remark plugins, command skills, decisions | the quality of the text is the deliverable |
| **sonnet** | what is executed from a clear contract: skeleton, labels, check scripts, `course.yaml`, the 20 migration runs, ports, fresh tests, the distillation pass (it classifies, the maintainer validates) | cost and speed; the contract is upstream |
| **fable** | two read-only reviews: end of stage 1 (spec, protocol, migrated course) and end of stage 2 (teacher, classroom) | the two pieces where a weakness is paid for months; the output is a report, fixes become issues |

Fresh tests always run the teacher on **sonnet**, whatever the session's model: it is the
model the classroom will run on.

## Task format

```
### S1-04 Write the pedagogical protocol
`area=spec:linear-course type=improvement model=opus depends=S1-01,S1-03 parallel=no`
- **Reads**: design files and sources the task needs.
- **Observation**: what exists, what is missing, where.
- **To do**: the work, as steps when the order matters.
- **Done when**: verifiable statements.
```

The metadata line is parsed by `scripts/plan-to-issues`: `area` and `type` become labels
(`area:…`, `type:…`), the stage file gives the milestone, `depends` becomes blocked-by links
(decision `blocked-by-links-for-dependencies`), the first line of the heading is the issue
title. `parallel` is informational.

Ids: `S<stage>-<nn>`; sub-tasks of a run (the 20 concept migrations) are `S1-10.<nn>` and
become sub-issues.
