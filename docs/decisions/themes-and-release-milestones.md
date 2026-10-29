---
date: 2026-10-29
issue: 226
status: accepted
area: repo
---

Without this, an agent would write the whole plan of a stage in one shot (as the 27 issues of
2026-10-27 were, S2-01 to S4-07, replaying the old course end to end before anything was
learnt), or open a milestone per theme, so the work would be counted against a plan nobody
reads any more and a milestone would close on nothing.

Work is framed by **themes** and released by **milestones**. A theme is a GitHub issue with the
label `theme`, the parent of its slices (GitHub sub-issues; the Project's "Parent issue" and
"Sub-issues progress" fields show them). Its body has five sections and nothing else:
**Objective** (what is true when it is done, two to four lines), **Why now** (what it unblocks),
**Material** (files, decisions, closed drafts read when splitting), **Done when** (two or three
coarse verifiable statements), **Out of scope** (one line). A theme is split **one slice at a
time, when it is taken**: a slice is an ordinary issue (`/ticket`) attached to its theme; no
theme is planned in one shot. A theme may span releases. A milestone is a **release target**:
it is named after the tag that closes it (`linear-course/v1.0.0`, `parcours-po/v0.2.0`), holds
the issues that must close before that tag, and closes when the tag exists. Tooling (teacher,
site, skills, agentic layer) has no version and no milestone. This replaces decision
`milestones-per-stage-then-release`: the stage plan of the construction is abandoned on
2026-10-29, its open issues closed as not planned with a pointer to their theme, their bodies
kept as material; `stage-1` is renamed `linear-course/v1.0.0`, `stage-2` to `stage-4` are
closed.

## Options ruled out

- "Epic" for a theme: a word the course teaches (concept 4), which would mean one thing in the
  course and another in the repository.
- A milestone per theme: a theme already closes by its parent issue, and may span releases.
- A "Theme" single-select field of the Project: the parent issue carries it natively.

## Consequences

- The six themes of 2026-10-29: #220 the `linear-course` spec v1; #221 `parcours-po` conformity;
  #222 the teacher; #223 the site; #224 course quality; #225 the flow and the tooling.
- `construction/` no longer ends "at stage 4": its fate is a slice of #225.
- `/ticket` attaches a slice to its theme; `/finish` after-merge names the theme to close when
  its last slice closes (its step 7, the parent issue).
