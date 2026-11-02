---
date: 2026-11-02
issue: 395
status: accepted
area: repo
---

Without this, an agent would tell a work item's kind from its parent link or from its body's
sections, so a story without an epic would read as an idea, the issue would have to be opened to
know its kind, and no view of the Project could show the epics or the stories apart.

Each kind carries its label: `epic` and `story`. A work item carries exactly one kind label,
set by `/feyn-issue` at its creation; the Project's views filter on it. The kind decides the
body template, the triage path and the delivery workflow, so it reads on the issue itself. An
idea carries none: its Status says what it is (decision `idea-and-option-before-ready`). Until
Ready, a work item may change kind (a story rewritten as an epic, or the reverse): its kind
label changes with it. The label `story` is created, and the label `epic` kept, by the
maintainer at the merge of the epic PR that lands this frame (decision
`kanban-frame-of-the-work`).

## Options ruled out

- The kind read from the body's sections: it needs the issue opened, and no view filter can do
  it.
- GitHub's native issue types: they are set per organisation and feyn is a personal repository,
  while labels already serve `epic`.
