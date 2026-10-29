---
name: feyn-course-batch
description: "Tooling of the work cycle, called by the maintainer and by `/feyn-deliver`'s contributor on a batch issue: run the agent workflow feyn-course-batch-workflow on a batch of concepts of a course (sources, writing, two reviews, fixes, checks), or list its steps with a dry run, then triage what it leaves open. Use for \"/feyn-course-batch parcours-po 42\", \"/feyn-course-batch parcours-po 9 10 --dry-run\"."
argument-hint: "<course id> <issue number | concept numbers> [--dry-run]"
---

# /feyn-course-batch

One job: run the agent workflow `feyn-course-batch-workflow` (`course-batch.js` of
`.claude/workflows/`) on a batch, then triage what it leaves open. A course changes only
through an issue or a batch: work on the batch issue's branch (`/feyn-issue-branch`).

## 1. Run

Arguments of the workflow: `{ course, concepts?, issue?, work?, dryRun? }`.

- `course`: the course id (`courses/<id>/`). `issue`: the batch issue, whose To do names the
  concepts and gives the instructions. `concepts`: the concept numbers, when no issue says them.
- `work`: folder of the intermediate products (`<n>-needs.md`, `<n>-errors.md`), default
  `batch-work/`; it is not committed.
- `dryRun: true` (with `concepts`): spawns no agent and lists the steps per concept. Run it
  first on a batch you have not run before.

Per concept, the workflow writes `sources.md`, then `concept.md` and `teaching.md`, has them
reviewed on substance and on form, fixes, runs the `check-course` checks on the concept, and
does a second round only for a review that had a blocking finding. It touches nothing outside
the concept folders.

## 2. Triage what it returns

Read the report, then every file it changed (never trust the summary).

- `open` findings, `needs` (a storyline fact or a glossary term): settle each as small as
  possible, never contradict the existing text, never settle a real business fact; leave
  unfixed what no case depends on. Each settlement and the option dropped go in the PR's
  Review first (`/feyn-pull-request` step 5), grouped in one bullet when there are several.
- `<n>-errors.md`: errors found in the old files; say them in the PR's Review first, one
  bullet with their count and the file.
- A review missing (`reviews_missing`) or a concept `failed`: rerun the workflow on those
  concepts alone.

## 3. Finish

Run `mise exec -- specs/<name>/checks/check-course courses/<id>` on the whole course, then
`/feyn-taught-check` ([feyn-taught-check](../feyn-taught-check/SKILL.md)) from the first concept
touched, and `/feyn-pull-request`.
