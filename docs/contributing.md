# Contributing to feyn

How a change happens here, from the first observation to `main`, for a reader who has never
opened this repository. Every section ends with the decision it rests on, in
[`docs/decisions/`](decisions/); the reserved words are in [`glossary.md`](glossary.md).

## Where things are

`specs/` holds the contracts a course is written against, `courses/` the courses, `teacher/`
the template that turns a course into a classroom, `site/` the engine that publishes it,
`.claude/` the skills and agent workflows, `docs/` what belongs to no single area. During the
construction, `construction/` holds the design, the plan and the session notes; it is removed
at the end of stage 4. Why: decision `monorepo-feyn`.

## An observation becomes an issue

GitHub Issues is the only backlog; nothing is tracked in a local file. An issue has three
sections: Observation (what was seen, where), To do, Done when (statements a reviewer can
verify by reading a file or running a command). `/ticket <observation>` writes it with its
labels and sets its blocked-by links; the Project's workflows add it to the Project in Backlog,
and `/ticket` sets Ready when the maintainer decided the work; `/ticket <n>` summarises one, its
links included. Why: decisions `issue-defines-pr-verifies`, `blocked-by-links-for-dependencies`.

## An issue becomes a branch

`/start <n>` takes the issue: it refuses one that carries `blocked:maintainer` or has an open
blocker (decision `blocked-by-links-for-dependencies`), creates
`<type>/<n>-<slug>` from an up-to-date `main`, sets its Status to In progress, and restates
the Done when as the contract the work is held to. It creates the branch with git, not linked
to the issue: the PR's `Closes #n` links them. One branch per issue; commits on it are
free-form, only the PR title survives the squash. Why: decisions `three-channels`,
`no-branch-link`.

## A branch becomes a pull request

`/finish` rereads the Done when, runs the checks that exist for what the branch touches, pushes,
and opens the PR with the title `<type>(<area>): <summary>`, which becomes the squash commit on
`main`. The body starts with `Closes #n` (or `Refs #n` when the PR is one step of the issue),
then, under `##` headings, Context, Issues, Changes, Checks and Review first, within the
limits of `/finish` step 5, so that the maintainer gets back into the subject from the PR
alone. Checks counts the Done when verdicts (`met`, `not met`, `deviation`) without restating
the statements, and says why for each `not met` or `deviation`; on a PR that goes through
`/orchestrate`, the fresh-agent reviewer reruns every statement. The PR
never redefines the Done when; the issue wins, and the PR says why it deviates. Once the PR is open, `/finish` checks that the issue lists it (a
`Refs` PR: it lists nothing). A branch that leaves a decision to
the maintainer opens as a draft PR, with `blocked:maintainer` on its issue only, and an
"Awaiting the maintainer" section above `Closes #n`. The maintainer answers with a comment
and removes the label from the issue; only then does the agent apply the answer, remove the
section and mark the PR ready. Nothing lands on `main` without a PR, the author never merges
their own, and `main` is never force-pushed. After the
merge, `/finish after-merge` confirms the change landed, checks the issue's Status is Done
(the Project's workflow sets it; `/finish` sets it only when that workflow is off; a `Refs`
issue stays open and In progress), and deletes
the local branch. `/orchestrate <n>` runs this whole cycle from one work session: a
contributor agent per issue in its own worktree, a review by a fresh agent before the PR
reaches the maintainer, then the clean-up of the worktree after the merge. Why: decisions
`issue-defines-pr-verifies`, `fresh-agent-review-before-maintainer`.

## Status, labels and milestones

- Every issue is an item of the Project (the GitHub Project "feyn", number 4), and its Status
  says where it stands: Backlog (proposed, to triage), Ready (decided, free to take),
  In progress (a branch exists), Done (closed; the close reason stays on GitHub). One at a
  time. The Project's workflows add every open issue, set Backlog when it is added and Done
  when it closes; the skills set the rest: `/ticket` Ready when the maintainer decided,
  `/start` In progress. `.claude/skills/ticket/project.md` says who sets each Status. There
  are no state labels. Why: decision `project-status-not-state-labels`.
- `blocked:maintainer`: a decision of the maintainer is awaited; on the issue only (its PR is
  a draft, which keeps it from being merged); on top of the Status, never instead of it; only
  the maintainer removes it. Why: decision `blocked-is-a-label-not-a-state`.
- `type:bug`, `type:course`, `type:improvement`, `type:decision`; `area:*` derived from the
  tree (`spec:<name>`, `course:<id>`, `teacher`, `site`, `agentic`, `repo`).
- Milestones: one per stage of the construction, then one per release of a course or a spec;
  the tooling, at HEAD, carries none. Why: decision `milestones-per-stage-then-release`.

## The maintainer's morning

In the web interface, the Project's Board view, one column per Status. First what waits for
the maintainer: the filter `label:blocked:maintainer` in the Board view (or the same search in
the issue list); the PR list shows the draft PRs. Then the In progress column (what moves on
its own), then Ready (what can be taken). An unblock is a comment on the issue that says what
was validated, then the label removed: the comment is the trace a fresh agent reads. Why:
decisions
`blocked-is-a-label-not-a-state`, `project-status-not-state-labels`.

## Tool behaviours

The flow relies on how GitHub and Claude Code behave, and these are found in work sessions, then
lost. A behaviour the flow relies on is written at its point of use (the skill step or document
that depends on it), in one line ending with a mark `(<tool>, <status> <date>, #<n>)`: `<tool>`
is `GitHub` or `Claude Code`; `<status>` is `tested` (provoked on purpose), `observed` (seen
happen), `inferred` (deduced from other facts) or `documented` (stated by the tool's
documentation); `<date>` is `YYYY-MM-DD`; `#<n>` is the issue or PR that holds the proof: a
PR holds it on the `Behaviours:` line of its Checks, an issue in a comment (`/finish` step 5).
The line goes with its step. A
line the tool disproves is corrected or removed. `grep -rn '(GitHub,\|(Claude Code,' .claude docs construction`
lists them all. There is no separate reference file: it would be read at the wrong moment.

## Decisions and vocabulary

A choice that spans several files or is costly to undo becomes a decision file, counterfactual
first ("Without this, an agent would…"), in the `decisions/` folder of the area it binds;
`/decide` writes it and refuses one without a counterfactual. Issues, PRs and documents use the
reserved words of the glossary and avoid the words it lists as "not". Why: decisions
`decision-format`, `reserved-vocabulary`.

## Language

English everywhere, except course material and quotes from it, which stay in French. Why:
decision `language-policy`.
