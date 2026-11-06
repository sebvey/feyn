---
date: 2026-11-06
issue: 667
status: accepted
area: agentic
---

Without this, the orchestrator of a delivery would give each message to the maintainer the form it chooses, mixing a story's report, a review's log, an event and a question in one dense block, so a question to the maintainer is lost at the end of a long progress message: in the delivery of epic #647, the first open question went unseen until the maintainer asked whether anything was awaited from them.

Every message a delivery (of a story without an epic, of an epic) and its clean-up write to the maintainer in the work session is of one kind, in the fixed form of that kind, all held in one reference file that the delivery skills, their references and the clean-up cite: a progress message (a heading naming the event, at most three named bullets: done, running, for you), a stop message (a heading announcing the stop, then cause and for you), a hand-over (the form the maintainer asked for on 2026-11-01; the epic PR handed over by a progress message), a question (the form of the maintainer's instructions for a decision, in a message of its own). While a question is open, every message ends with the awaiting footer, one line per open question, which the plan comment head repeats in the same words. A run writes when it starts and when it ends, not in between. A choice the orchestrator settled without the maintainer goes to the plan comment's log and the PR's "Delivery notes", the progress message giving only their count. During a delivery no question goes through the wrap-up box, whose recap is one sentence at the count. A message names things in plain words. The other skills keep the maintainer's own instructions for their messages. It replaces a bound of three lines on content, given twice in two forms, that nothing checked.

## Options ruled out

- One form for every kind of message: a stop would read as progress.
- A heading and a separator added to the rules of content: the mix of kinds and the density stay.
- The open questions asked again through the wrap-up box at each turn, or through a dialog: the dialog blocks the orchestrator and hides the message.
- A reminder of the open questions at the top of the message: the top belongs to the event, and a message is read from its end.
- A message per stage of a run, or at fixed intervals: noise, a change of the agent workflow, and the app forbids polling background work.
- A hook checking each message: to decide after a delivery under these forms, if they still drift.
- The forms in the maintainer's global instructions: outside the repository, which no work item can write.

## Consequences

- The forms bind a delivery and its clean-up only; a triage, an option refinement, a brainstorm and the creation of an issue or a PR follow the maintainer's instructions, where no defect was seen.
- A form that drifts in a delivery is corrected in the reference file, not in the skill where it was seen.
