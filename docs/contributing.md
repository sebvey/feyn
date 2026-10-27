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
labels, sets its blocked-by links and puts it in the Project; `/ticket <n>` summarises one, its
links included. Why: decisions `issue-defines-pr-verifies`, `blocked-by-links-for-dependencies`.

## An issue becomes a branch

`/start <n>` takes the issue: it refuses one that carries `blocked:maintainer` or has an open
blocker (decision `blocked-by-links-for-dependencies`), creates
`<type>/<n>-<slug>` from an up-to-date `main`, sets its Status to In progress, and restates
the Done when as the contract the work is held to. It creates the branch with
`gh issue develop`, so the issue's Development section lists the branch and any PR opened from
it. One branch per issue; commits on it are free-form, only the PR title survives the squash. Why: decision `three-channels`.

## A branch becomes a pull request

`/finish` rereads the Done when, runs the checks that exist for what the branch touches, pushes,
and opens the PR with the title `<type>(<area>): <summary>`, which becomes the squash commit on
`main`. The body starts with `Closes #n` (or `Refs #n` when the PR is one step of the issue),
then "Done when, verified:", one line per statement with its verdict (`met`, `not met`,
`deviation`) and its proof. The PR never redefines the Done when; the issue wins, and the PR
says why it deviates. A `Refs` PR first unlinks the branch from the issue (a linked branch
closes the issue at the merge whatever the body says). Once the PR is open, `/finish` checks
that the issue lists it and the branch (a `Refs` PR: neither). Nothing lands on `main`
without a PR, the author never merges their own, and `main` is never force-pushed. After the merge, `/finish after-merge` confirms the change
landed, checks the issue's Status is Done (and sets it if the Project did not), and deletes
the local branch. Why: decision `issue-defines-pr-verifies`.

## Status, labels and milestones

- Every issue is an item of the Project (the GitHub Project "feyn", number 4), and its Status
  says where it stands: Backlog (proposed, to triage), Ready (decided, free to take),
  In progress (a branch exists), Done (closed by a PR). One at a time. The skills set it:
  `/ticket` Backlog or Ready, `/start` In progress, `/finish after-merge` Done if the Project's
  own workflow did not. There are no state labels. Why: decision
  `project-status-not-state-labels`.
- `blocked:maintainer`: a decision of the maintainer is awaited; on top of the Status, never
  instead of it; only the maintainer removes it. Why: decision `blocked-is-a-label-not-a-state`.
- `type:bug`, `type:course`, `type:improvement`, `type:decision`; `area:*` derived from the
  tree (`spec:<name>`, `course:<id>`, `teacher`, `site`, `agentic`, `repo`).
- Milestones: one per stage of the construction, then one per release of a course or a spec;
  the tooling, at HEAD, carries none. Why: decision `milestones-per-stage-then-release`.

## The maintainer's morning

In the web interface, the Project's Board view, one column per Status. First what waits for
the maintainer: the filter `label:blocked:maintainer` in the Board view (or the same search in the
issue list). Then the In progress column (what moves on its own), then Ready (what can be
taken). An unblock is a comment on the issue that says what was validated, then the label
removed: the comment is the trace a fresh agent reads. Why: decisions
`blocked-is-a-label-not-a-state`, `project-status-not-state-labels`.

## Decisions and vocabulary

A choice that spans several files or is costly to undo becomes a decision file, counterfactual
first ("Without this, an agent would…"), in the `decisions/` folder of the area it binds;
`/decide` writes it and refuses one without a counterfactual. Issues, PRs and documents use the
reserved words of the glossary and avoid the words it lists as "not". Why: decisions
`decision-format`, `reserved-vocabulary`.

## Language

English everywhere, except course material and quotes from it, which stay in French. Why:
decision `language-policy`.
