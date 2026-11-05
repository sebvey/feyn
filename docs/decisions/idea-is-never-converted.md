---
date: 2026-11-02
issue: 395
status: accepted
area: repo
---

Without this, the work session running a triage would turn an idea into a work item by adding a Done when and a To do under its finding and changing its form, so a story's form would depend on its origin, and an idea that calls for several work items, or for an epic and a story, would have no way through: a change of form fits only the one-to-one case.

An idea stays independent: the triage never converts it, it creates from it the work items it calls for (stories, an epic), each with the form of its kind and citing the idea, then closes the idea as **completed**, its closing comment naming the work items created from it. An idea that calls for nothing is closed as **not planned**, with the reason. The finding stays as written. It is the pattern the triage already follows when it folds an idea into an epic, and the option refinement when it splits an option. No exception for the old format: an issue written before this decision whose body already defines a work (a Done when, a To do) is recreated at triage as a story or an epic and closed, about fifteen of them, once, rather than kept under a rule that expires; its blocked-by links are set again on the new work item. A brainstorm that opens from an idea is that idea's triage (decision `brainstorm-ends-in-options`).

## Options ruled out

- The decision (Done when, To do) added under the finding and the form changed: a story's form would depend on its origin, and it works one-to-one only.
- An idea taken up closed as not planned: it reads as a finding dismissed when it was taken up.
- Old-format issues kept as work items under a rule that expires: the rule outlives its use, where recreating them is done once.
