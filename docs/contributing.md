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
labels; `/ticket <n>` summarises one. Why: decision `issue-defines-pr-verifies`.

## An issue becomes a branch

`/start <n>` takes the issue: it refuses one that carries `blocked:maintainer`, creates
`<type>/<n>-<slug>` from an up-to-date `main`, sets `state:wip`, and restates the Done when
as the contract the work is held to. One branch per issue; commits on it are free-form, only
the PR title survives the squash. Why: decision `three-channels`.

## A branch becomes a pull request

`/finish` rereads the Done when, runs the checks that exist for what the branch touches, pushes,
and opens the PR with the title `<type>(<area>): <summary>`, which becomes the squash commit on
`main`. The body starts with `Closes #n` (or `Refs #n` when the PR is one step of the issue),
then "Done when, verified:", one line per statement with its verdict (`met`, `not met`,
`deviation`) and its proof. The PR never redefines the Done when; the issue wins, and the PR
says why it deviates. Nothing lands on `main` without a PR, the author never merges their own,
and `main` is never force-pushed. After the merge, `/finish after-merge` confirms the change
landed and deletes the local branch. Why: decision `issue-defines-pr-verifies`.

## Labels and milestones

- `state:proposed` (to triage), `state:todo` (decided, free to take), `state:wip` (a branch
  exists): one at a time, none once the issue is closed. A GitHub Project will replace them
  (issue #64). Why: decision `state-labels-until-the-project`.
- `blocked:maintainer`: a decision of the maintainer is awaited; on top of the state, never
  instead of it; only the maintainer removes it. Why: decision `blocked-is-a-label-not-a-state`.
- `type:bug`, `type:course`, `type:improvement`, `type:decision`; `area:*` derived from the
  tree (`spec:<name>`, `course:<id>`, `teacher`, `site`, `agentic`, `repo`).
- Milestones: one per stage of the construction, then one per release of a course or a spec;
  the tooling, at HEAD, carries none. Why: decision `milestones-per-stage-then-release`.

## The maintainer's morning

Three searches in the issue list: `label:blocked:maintainer` (what waits for them, first),
`is:open label:state:wip -label:blocked:maintainer` (what moves on its own), `label:state:todo`
(what can be taken). An unblock is a comment on the issue that says what was validated, then the
label removed: the comment is the trace a fresh agent reads. Why: decision
`blocked-is-a-label-not-a-state`.

## Decisions and vocabulary

A choice that spans several files or is costly to undo becomes a decision file, counterfactual
first ("Without this, an agent would…"), in the `decisions/` folder of the area it binds;
`/decide` writes it and refuses one without a counterfactual. Issues, PRs and documents use the
reserved words of the glossary and avoid the words it lists as "not". Why: decisions
`decision-format`, `reserved-vocabulary`.

## Language

English everywhere, except course material and quotes from it, which stay in French. Why:
decision `language-policy`.
