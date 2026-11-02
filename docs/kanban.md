# The frame: Kanban, with ADR and GitHub flow

What the frame of the work on feyn is: Kanban for the flow of work, ADR for the decisions,
GitHub flow for the branches. This file says what the frame is, and only that; how feyn applies
it (its workflow, its forms, its tooling) is described in [`contributing.md`](contributing.md).
The words below are the frame's own; their meaning in the repository is in
[`glossary.md`](glossary.md).

## Kanban

Kanban is a way to manage the flow of work through a process: the work is made visible as
items moving through the states of a workflow, an item is pulled into a state when there is
room for it rather than pushed there, and the process is improved from what its flow shows. It
assumes no team size, no iteration and no role; it starts from the process as it is.

Its principles:

- **Define the workflow.** The states a work item goes through, from the moment it is committed
  to the moment it is finished, are named and visible, and so are the points where it is said to
  start and to finish. What is not on the workflow is not managed.
- **Limit WIP.** The work in progress, the items started and not finished, is limited, per state
  or for the whole workflow: a **WIP limit**. A new item is pulled only when one leaves. Fewer
  items in progress means each one finishes sooner, and a blocked item shows at once instead of
  hiding behind others.
- **Manage flow.** Items are followed while they move: their age, how long they take to cross
  the workflow, how many finish over a period. An item that waits or ages is acted on; the aim
  is a smooth and predictable flow, not keeping everyone busy.
- **Make policies explicit.** The rules of the workflow, its **policies** (what an item must
  hold to enter a state or leave it, the WIP limits, what is done first, who decides what), are
  written down where everyone reads them. A policy can then be followed, questioned and
  changed; an unwritten one cannot.
- **Improve in small steps, through evolutionary change.** The process changes from what is
  observed in its flow, one small change at a time, each one checked against what it was meant
  to settle. No redesign from scratch: the current process is the starting point, and a change
  without an observed problem has nothing to be checked against.

## The upstream

Kanban as above manages the work once committed. **Upstream Kanban** manages what comes
before: deciding what to commit to. The workflow then has two parts, separated by the
**commitment point**.

- An **idea** is what enters the upstream: something seen or suggested, not yet shaped
  into work. Most ideas are cheap and many are dropped.
- An **option** is a work item defined but not committed: what it would deliver and how its
  completion is checked are known, but nobody has promised to do it. An option has value
  because it can be taken or left; refining it, reshaping it or discarding it is the upstream's
  normal work, not a failure.
- The **commitment point** is where an option is taken: from then on the work item is expected
  to be finished, it enters the downstream workflow and counts against its WIP limits, and its
  definition stops moving. In feyn this point is named **Ready**.

**Triage** is the act of reading the ideas that came in and deciding what each one calls for:
one or several options, or nothing, with the reason. The upstream keeps more options than the
downstream can deliver, so that the choice at the commitment point is a real one.

Kanban names no type of work item. The two used here come from the common vocabulary of agile
work and of GitHub: an **epic** is a large work item delivered in several parts, a **story** a
unit of work delivered in one piece. Both are options before the commitment point and committed
work after it.

## ADR

An **ADR** (Architecture Decision Record) records one significant decision in a short text file
kept with the code it binds, in the same repository and under the same version control. Each
record states the context that forced the decision, the decision itself, its status, and its
consequences, good and bad. Records are not rewritten when a later decision changes course:
the old one is marked superseded and points to the one that replaces it, so the history of why
the system is as it is stays readable. The practice is meant to be light: one decision per
file, a few paragraphs, written when the decision is taken.

## GitHub flow

**GitHub flow** is a branching model with one long-lived branch, `main`, which always holds
work that can be released. Every change is made on a short-lived branch created from `main`,
committed there, and proposed as a pull request; the pull request is where the change is
reviewed and discussed, and it is merged into `main` once approved, after which the branch is
deleted. Nothing reaches `main` except through a pull request.

feyn adds one complement to it: **an integration branch per epic**. The stories of an epic are
merged by pull request into a branch of the epic, created from `main`, and the epic reaches
`main` as one pull request of that branch, once whole. `main` thus never holds an epic half
delivered, and the rule that nothing reaches `main` without a pull request still holds.

## Sources

- Daniel Vacanti, Jim Coleman, *The Kanban Guide*, 2020 (kanbanguides.org): the definition of
  Kanban, the workflow and its states, WIP, flow and explicit policies.
- David J. Anderson, *Kanban: Successful Evolutionary Change for Your Technology Business*,
  2010: the Kanban Method, starting from the current process and evolutionary change.
- Patrick Steyaert, *Essential Upstream Kanban*, 2017: the upstream, ideas, options and the
  commitment point.
- Michael Nygard, "Documenting Architecture Decisions", 2011 (Cognitect blog): the ADR.
- GitHub, "GitHub flow", GitHub Docs (docs.github.com, "Get started", "Using GitHub"): GitHub
  flow.
