---
date: 2026-10-29
issue: 226
status: accepted
area: repo
---

Without this, an agent would write the whole plan of a stage in one shot (as the 27 issues of
2026-10-27 were, S2-01 to S4-07, replaying the old course end to end before anything was
learnt), or open a milestone per epic, so the work would be counted against a plan nobody
reads any more and a milestone would close on nothing.

Work is framed by **epics** and released by **milestones**. An epic is an objective that
closes: an issue labelled `epic`, titled "Epic: …", parent of its slices (GitHub sub-issues).
Its body has five sections, in order, and nothing else: **Objective** (what is true when it is
done, two to four lines), **Why now** (what it unblocks), **Material** (what is read when
splitting), **Done when** (two or three coarse verifiable statements), **Out of scope** (one
line, naming the epic that takes it). **No done-when, no epic**: what cannot get one is an
observation to triage, or a label; a heap of issues with no common objective has no parent.
An epic is split **one slice at a time, when it is taken**: no To do, no sub-issue posed in
advance; a slice is an ordinary issue (`/ticket`) attached to it, and its plan is a **plan
comment** rewritten at each slice. It is **Ready** when nothing blocks it (no open issue among
its blocked-by links) and its five sections are written; the maintainer sets Ready at triage.
An epic may span releases and may target a milestone. A milestone is a **release target**,
created when a release is in sight: named after the tag that closes it
(`linear-course/v1.0.0`), it holds the slices that must close before that tag. Tooling has no
version and no milestone. This replaces decision `milestones-per-stage-then-release`: the stage
plan is abandoned on 2026-10-29, its open issues closed as not planned with a pointer to their
epic, their bodies kept as material; `stage-1` is renamed `linear-course/v1.0.0`, `stage-2` to
`stage-4` are closed.

## Options ruled out

- "Theme", the word of this decision until its amendment: a theme need not close, so it held a
  heap (#225, whose Done when was "each slice has its issue") as readily as an objective. "Epic"
  had been ruled out because the course teaches it (concept 4), but each glossary applies in its
  own files, and a word may be reserved in both with two meanings.
- A milestone per epic: an epic already closes by its parent issue, and may span releases.
- An "Epic" field of the Project: the parent issue carries it natively.

## Consequences

- The epics of 2026-10-29: #220 the `linear-course` spec v1; #221 `parcours-po` conformity
  (blocked by #29); #222 the teacher and #223 the site (blocked by #221); #224 course quality
  (blocked by #222); #228 the work organisation.
- `construction/` no longer ends "at stage 4"; its fate is not decided yet.
- `/ticket` attaches a slice to its epic; `/finish` after-merge names the epic to close when
  its last slice closes (its step 7).
- Amended 2026-10-29 (#229): "theme" became "epic" (label renamed, #220 to #224 retitled);
  added the entry rule, the Definition of Ready, the plan comment, the milestone an epic may
  target; #225 (the flow and the tooling) dissolved as a heap, its six issues back in the
  Backlog without a parent.
