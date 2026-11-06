# The messages of a delivery

Every message the orchestrator of a delivery writes to the maintainer in the work session takes one of four fixed forms, given here and nowhere else. Read by the delivery skills (`/feyn-deliver-story-alone`, `/feyn-deliver-epic`) and by the clean-up (`/feyn-merge-cleanup`, [run-cleanup.md](run-cleanup.md)). Why: decision `delivery-messages-in-fixed-forms`.

The labels of the forms (the headings, the bullet names, the footer's label) are given here in English and written in the language of the conversation. The maintainer's own instructions leave the form of a message to the skill that gives it: in a delivery, these forms are that form.

## Scope

A delivery (`/feyn-deliver-story-alone`, `/feyn-deliver-epic`) and its clean-up, whether the clean-up runs in a delivery or alone (`/feyn-merge-cleanup`). The other skills (triage, option refinement, brainstorm, issue and PR creation) follow the maintainer's instructions.

## Four kinds, one per message

A message is of one kind, never two: a progress message, a stop message, a hand-over or a question. Two events, or an event and a question, are two messages. The work's artefacts are the report (the PR's body and its "Delivery notes", the epic's plan comment): a message does not restate them, and names what they hold by a link.

### Progress message

An event of the delivery: a run started or ended, a story merged, a rerun launched, the epic PR handed over, a clean-up done. A `##` heading naming the event, then at most three bullets, each named, in this order, each left out when it has nothing to say:

- **Done**: what the event delivered, in plain words; the count of the choices settled without the maintainer, if any;
- **Running**: what runs now and what remains after it ("The rhythm");
- **For you**: the action awaited from the maintainer, with where to do it in the web interface.

A choice the orchestrator settled without the maintainer (a deviation or a choice sorted as [sort.md](sort.md) says, its maintainer "informed") is written in the plan comment's log (an epic) and in the PR's "Delivery notes", never described in the message: the **Done** bullet gives only their count.

```
## Story 2 of 3 delivered

- **Done**: the concept file now opens with its objective (sebvey/feyn#671); 1 choice settled without you, in its Delivery notes
- **Running**: story 3 of 3, the captions of the diagrams; then the review of the whole epic and the epic PR
```

### Stop message

The delivery or the clean-up stops on something it cannot settle: a run failed and its rerun too, a merge refused, a check of the clean-up that fails. A `##` heading announcing the stop, then two named bullets:

- **Cause**: what stopped it, in plain words;
- **For you**: what the maintainer does for it to go on.

```
## Delivery stopped

- **Cause**: GitHub refused the merge of story 3, the epic's branch having moved during its review
- **For you**: say "go" and story 3 is rerun on the branch as it is now
```

### Hand-over

The PR of a story without an epic, handed over as [hand-over.md](hand-over.md) says once its review and corrections are done: this exact form, and nothing more (asked by the maintainer on 2026-11-01, #381):

```
## PR ready to merge

- **PR**: sebvey/feyn#<pr>
- **To read**: the PR's body and its "Delivery notes"
- **Outside the PR**: <what you did on it after the run, or an anomaly of the run or its clean-up; or "nothing">
- **After the merge**: <clean-up (/feyn-deliver-story-alone step 6), then the next topic if one is set>
```

The PR is named only by its bare reference `sebvey/feyn#<pr>`, never in the heading nor as a Markdown link: the app renders that reference once, with the PR's state. "Outside the PR" is what the PR does not hold: a line you added to Checks, a body or "Delivery notes" edited after the run ([sort.md](sort.md)), an anomaly of the run or of its clean-up. A finding outside the PR that calls for follow-up work (an outdated section the PR did not make false, an issue to open) is not prose in the hand-over: it goes to the maintainer as a question; one the PR made false is corrected in it.

```
## PR ready to merge

- **PR**: sebvey/feyn#667
- **To read**: the PR's body and its "Delivery notes"
- **Outside the PR**: nothing
- **After the merge**: the clean-up, then nothing planned
```

The epic PR is handed over by a progress message:

```
## Epic PR ready to merge

- **Done**: the three stories of the epic are on its branch, reviewed as a whole (sebvey/feyn#672)
- **For you**: merge it (the PR page, "Squash and merge"); then I clean up
```

### Question

A decision only the maintainer can make: an open question of an epic, or a decision awaited on a story without an epic. A message of its own, nothing else in it, in the form the maintainer's instructions give a decision (one subject, its frame, a real example, the options in a table, the recommendation first, one question), with the link to the comment that holds it on GitHub; asked in the message itself, never through the wrap-up box ("The recap"). One question at a time: the next one once it is answered.

```
## Question 1: where the captions of the diagrams live

The concept file now holds each diagram; story 3 must decide where its caption goes. Example: the diagram of the cost of delay in concept 2.

| Option | What it changes |
|---|---|
| In the concept file, under the diagram (recommended) | one file to read; the caption check reads it there |
| In a file of captions per course | the concept file stays short; one more file to keep in step |

Which one? The frame and options are on the epic: <link to the comment>.
```

## The awaiting footer

While a question to the maintainer is open, every message ends with the awaiting footer: a rule (`---`), then the fixed label "Still awaiting you:", then one line per open question: its number, its title in plain words, the link to the comment that holds its frame and options (on the epic; on the issue, for a story without an epic). It does not ask the question again. The message that asks a question carries no line for it (the footer then lists only the other open questions, or is left out). No buttons. The plan comment head says what awaits the maintainer in the same words ([project.md](project.md), "The plan comment").

```
## Story 3 of 3 running

- **Running**: story 3 of 3, the captions of the diagrams; then the review of the whole epic and the epic PR

---
Still awaiting you:
- Question 1: where the captions of the diagrams live (<link to the comment>)
```

## The rhythm

- **One run**: one progress message when it starts, then nothing until it ends. Its **Running** bullet gives the story, its rank among the stories planned, and what remains after it (the next stories, the review of the whole epic, the epic PR), never a duration.
- **Several runs at once**: one message per event, its **Running** bullet naming every story still running.
- **The harness's reminder** during a run (a turn with no event): one fixed line on the same model, plus the awaiting footer when a question is open: `- **Running**: story 3 of 3, the captions of the diagrams; then the review of the whole epic and the epic PR`.

## The recap

During a delivery no question goes through the wrap-up box, so the app draws no box: its recap is the sidebar status only, one sentence at the count, never what awaits the maintainer (the footer says it). Example: "Epic 647: 2 stories of 3 delivered, the 3rd running"; for a story without an epic, "Story 667: PR handed over, merge awaited".

## Plain words

A message names things in plain words: no rule or decision slug, no sha, no file path, no sort case number, no internal term ("integration branch", "plan comment": "the epic's branch", "the epic's plan"); a story or PR number only where it serves as a link. The fixed forms limit the room, not the vocabulary copied from the log.

## The clean-up

The clean-up (`/feyn-merge-cleanup`, [run-cleanup.md](run-cleanup.md), and the clean-up steps of the delivery skills) tells the maintainer by these forms: an anomaly that stops the clean-up is a stop message; one that asks an action of the maintainer (a parent issue to close, a remote branch left, a Status the Project workflow did not set) goes in the **For you** bullet of the clean-up's progress message, whose **Done** bullet names what landed and the issues now free.

```
## Clean-up done

- **Done**: sebvey/feyn#640 is on main and closed, its branch deleted; sebvey/feyn#655 is now free (Ready)
- **For you**: close sebvey/feyn#612, whose stories are all closed (its page, "Close issue")
```
