---
date: 2026-11-02
issue: 395
status: accepted
area: repo
---

Without this, the work session creating standalone work would give it a third form of its own,
or pose a one-story epic for it, so one form of work would have two templates and a Done when
the reviewer holds two ways, or one change would cost an epic, an integration branch and two
PRs.

A **story** is a unit of work delivered in one PR, with or without a parent epic. With an epic,
its PR targets the epic's integration branch (decision `epic-on-integration-branch`); without
one, its PR targets `main` and the maintainer merges it. One body template serves both, and the
reviewer holds its Done when the same way. The agent workflow that delivers work already does
both: what it called its "observation mode" (no epic, a PR to `main`) is a story without an
epic, and the workflow is renamed after the story (`deliver-story.js`). The direct delivery is
unchanged: a story, alone or under an epic, may be named `direct` at its creation at today's
criterion (one edit with no behaviour), its To do opening with "Direct delivery", and is
delivered by the maintainer's work session with no contributor and no fresh-agent review. The
direct delivery is a delivery policy, not a form, and the vocabulary does not touch it. This
replaces the slice of an epic and the observation delivered alone as two forms of one work.

## Options ruled out

- A third kind for standalone work: two templates for one form.
- Every story under an epic, a one-story epic for standalone work: an epic, an integration
  branch and two PRs for one change.
