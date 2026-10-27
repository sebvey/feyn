---
date: 2026-10-27
issue: 63
status: accepted
area: repo
---

Without this, an agent would open a milestone per theme or per month, or none, and the
50 issues of the construction would have no end to be counted against.

A milestone is a thing that closes. During the construction, one per stage (`stage-0` to
`stage-4`): they hold the plan's issues and die with `construction/` at S4-07. Afterwards, one
per release of what is versioned: a course version (`parcours-po/v0.2.0`) or a spec version
(`linear-course/v1.1.0`); the milestone closes when `/publish` tags it. The tooling (teacher,
site, skills) lives at HEAD and its issues carry no milestone. The sub-issues of a course batch
(one per concept) are the only grouping of everyday work.

## Consequences

- For a course in beta, the release milestone may be filled after the fact (what is ready is
  tagged); if that becomes the habit, a "Version" field of the GitHub Project does the job
  better, to be decided with it (decision state-labels-until-the-project).
