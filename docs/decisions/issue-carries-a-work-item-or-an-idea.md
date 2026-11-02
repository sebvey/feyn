---
date: 2026-11-02
issue: 395
status: accepted
area: repo
---

Without this, an agent would take the story form as the form of any issue and pour a finding
into it (#385), so a Done when and a To do would be asked of what was only seen in passing: its
writer would invent a solution the triage had not decided, or fill the sections with "To settle
at triage".

An issue is only the GitHub object: it carries a work item of one of two kinds, **epic** or
**story**, or an **idea**, which has no kind. The glossary defines the issue by that role, not
by a set of sections, and gives the two kinds and the idea their own definitions. Each form has
its own body template, and only its own: one for the epic, one for the story, one for the idea;
no template is named after the issue, and none is shared between forms, so no form inherits the
sections of another. An idea holds a finding and no solution, in three sections and nothing
else: **Where** (the area, then at most three words on what is touched; it gives the `area:`
label), **Why** (what the finding breaks or costs, in one sentence; the triage weighs it) and
**Observation** (the fact first, with its place: path, line, issue, PR; then the other facts,
one per line; the history last: the work session or PR where it was seen). No What, no Done
when, no To do, no Reads; no `type:` label either, since one finding may give a `bug` story and
a `decision` story: the triage sets the type on the work items it creates. An idea carries only
its `area:` label and the Status Idea (decision `idea-and-option-before-ready`). This replaces
the issue defined by the sections of `issue-body.md`, with the epic as an exception, and the
proposal's own template.

## Options ruled out

- "Issue" kept as the name of the default form, the epic as an exception: the finding stays
  confused with the story.
- A common template for every issue, with variants where a form departs from it: it brings back
  the default form this decision removes.
- The idea given the story's head (Where, What, Why) with Done when and To do optional: the What
  still asks for a deliverable, and optional sections fill with solutions.
