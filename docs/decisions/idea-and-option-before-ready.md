---
date: 2026-11-02
issue: 395
status: accepted
area: repo
---

Without this, the work session running a triage would leave raw findings and defined work items
in one Status, Backlog, so nothing would show what awaits a decision on its form and what
awaits a commitment; and a work item it just defined would wait for a second triage to be
committed, an extra pass for one decision.

The stages before commitment are two Statuses of the Project, in place of Backlog. **Idea** is
the inbox: an issue with no kind, holding a finding, never converted (decision
`idea-is-never-converted`). **Option** is a work item, epic or story, defined but not
committed: it has the body of its kind, Done when included, and waits for the maintainer to
commit it (set Ready) or close it; until Ready its kind and body may change, since refining an
option is what the upstream is for. **Ready** stays the commitment point, where the form
freezes and the Done when becomes the contract (decision `issue-defines-pr-verifies`).
Creating and committing are two acts: a work item the triage creates from an idea is born
Option, or Ready when the maintainer says at its creation that it is committed (the triage
asks, Option by default); a work item a brainstorm creates is always born Option, its
commitment decided at a triage; a story the maintainer asks for directly in a work session is
born Option, or Ready on the maintainer's word; a story posed by the orchestrator of a taken
epic is born Ready. The flow is Idea, Option, Ready, In progress, Ready for review, Done, and
nothing else: the Status Needs Decision, present and unused, is removed, and the label
`blocked:maintainer` says a decision is awaited, on any Status (decision
`blocked-is-a-label-not-a-state`). The maintainer changes the Project at the merge of the epic
PR that lands this frame: Backlog renamed Idea, its id and its items kept; Option added; Needs
Decision removed. This replaces Backlog and Needs Decision.

## Options ruled out

- A label for the stage, Backlog kept: two mechanisms for one axis.
- Idea and Option as stages of one issue that matures, its body growing: it is the conversion
  decision `idea-is-never-converted` rules out, and it fits only an idea that gives exactly one
  work item.
