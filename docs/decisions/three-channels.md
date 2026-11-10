---
date: 2026-10-27
issue: null
status: accepted
area: repo
---

Without this, an agent would serve the learner whatever is on `main`, or add a permanent deployment per branch, a `develop` branch or an integration branch to hold unfinished work away from the learner.

A build is served from one of three channels, the same for the site and the classroom:

| Channel | Source | Site | Classroom |
|---|---|---|---|
| prod | the course tag `<id>/vX.Y.Z` | `/<course>/` | `~/classrooms/<course>/` |
| next | `main` | `/next/<course>/` | `~/classrooms/<course>-next/` |
| preview | the branch of a PR to `main` | `/pr-N/<course>/` | a disposable classroom (fresh tests) or a local one |

Prod is a tag, so `main` can move every day without reaching the learner. `main` is always buildable (spec checks green, site builds), since it is the next channel. One branch per issue, merged into `main` by PR with a squash; no long-lived branch besides `main` but the integration branch of an epic (decision `epic-on-integration-branch`), which is not a channel. The preview is the next channel with one more prefix: one mechanism, not three.

## Options ruled out

- A permanent channel per branch: the per-PR preview covers the need (a reviewer who did not write the change sees it built) and dies with the PR.
- `develop` or an integration branch to keep unfinished code away from prod: the course tag already does it.

## Consequences

- A release is a course tag on `main` (`/publish`), which deploys the prod site and, on the maintainer's request, rebuilds the prod classroom.
- Every course has the three addresses from its first build, under its own sub-path.
- Amended 2026-10-31 (#344): the integration branch ruled out above is allowed for an epic (decision `epic-on-integration-branch`): cut from `main`, it lives as long as the epic and merges into `main` by its epic PR; it is not a channel. Every other branch is an issue branch.
- Amended 2026-11-11 (#832): a preview is built for a pull request to `main` only (an epic PR, a story without an epic), no longer for the PR of a story of an epic to its integration branch: a fresh agent reviews such a story and its orchestrator merges it, so its preview had no reader, and each one sent the maintainer an e-mail, or a failure while the epic's site was broken between two stories (epic #810).
