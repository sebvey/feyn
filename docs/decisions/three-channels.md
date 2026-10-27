---
date: 2026-10-27
issue: null
status: accepted
area: repo
---

Without this, an agent would serve the learner whatever is on `main`, or add a permanent
deployment per branch, a `develop` branch or an integration branch to hold unfinished work away
from the learner.

A build is served from one of three channels, the same for the site and the classroom:

| Channel | Source | Site | Classroom |
|---|---|---|---|
| prod | the course tag `<id>/vX.Y.Z` | `/<course>/` | `~/classrooms/<course>/` |
| next | `main` | `/next/<course>/` | `~/classrooms/<course>-next/` |
| preview | a PR branch | `/pr-N/<course>/` | a disposable classroom (fresh tests) or a local one |

Prod is a tag, so `main` can move every day without reaching the learner. `main` is always
buildable (spec checks green, site builds), since it is the next channel. One branch per issue,
merged into `main` by PR with a squash; no long-lived branch besides `main`. The preview is the
next channel with one more prefix: one mechanism, not three.

## Options ruled out

- A permanent channel per branch: the per-PR preview covers the need (a reviewer who did not
  write the change sees it built) and dies with the PR.
- `develop` or an integration branch: they exist to keep unfinished code away from prod, which
  the course tag already does.

## Consequences

- A release is a course tag on `main` (`/publish`), which deploys the prod site and, on the
  maintainer's request, rebuilds the prod classroom.
- Every course has the three addresses from its first build, under its own sub-path.
