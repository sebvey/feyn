# The hand-over

A PR handed over to the maintainer, who merges it: its conditions, the PR marked ready, the
Status Ready for review, the notification. Its caller passes the path, and keeps what it does
before (its run, its review, its corrections) and after (the merge's cleanup). A story of an
epic, a direct story included, is never handed over: its orchestrator merges it into the
integration branch (decision `epic-on-integration-branch`).

## The parameters

- **The path**:
  - **a story without an epic, after its run** (`/feyn-deliver-story-alone` step 5): the PR, a
    draft, reviewed and corrected by the agent workflow `deliver-story.js`;
  - **a direct delivery or the direct path**: the work session that opened the PR with
    `/feyn-pull-request` (and, on the direct path, had it reviewed by `/feyn-pr-review` and
    corrected it, [sort.md](sort.md), "Corrections on the direct path");
  - **an epic PR** (`/feyn-deliver-epic` step 5): the issue is the epic;
  - **a draft whose decision is awaited**: a PR opened as a draft with `blocked:maintainer` on its
    issue (`/feyn-pull-request` step 6), on the direct path or after a run.
- **The PR** and **its issue** (several `Closes` lines: each issue).

## 1. The conditions

- The `Fresh-agent review:` line is in the PR's Checks (`mise exec -- gh pr view <pr> --json
  body`; its form: `/feyn-pull-request` step 5), `none, direct delivery` on a direct delivery;
  or the maintainer asked for a PR without a review, and the notification says so. An epic PR:
  in place of the line, the conditions of `/feyn-deliver-epic` step 5 (no open question, every
  story closed and Done; its review is the whole branch's, step 4).
- The issue carries no `blocked:maintainer`: otherwise, "A draft whose decision is awaited".

## 2. The PR marked ready

A PR still a draft (a story without an epic's always is): `mise exec -- gh pr ready <pr>`, then
`mise exec -- gh pr view <pr> --json isDraft` reads `false`.

## 3. Ready for review

For a `Closes` PR only (a `Refs` issue stays In progress), set the issue Ready for review (the
work claims done, the maintainer concludes: [glossary](../../docs/glossary.md), entry Status;
[project.md](project.md), "Commands", Set):
`mise exec -- gh project item-edit 4 --owner sebvey --url <issue url> --field Status --value "Ready for review"`,
then read it back (`mise exec -- gh issue view <n> --json projectItems`). A correction asked on
the PR returns the issue to In progress until it is handed over again
(`/feyn-deliver-story-alone` step 4 for a story without an epic).

## 4. The notification

The PR is the report: the notification does not restate its body nor its "Delivery notes". Its
form, by path, written in the language of the conversation:

- **A story without an epic, after its run**: this exact form, and nothing more (asked by the
  maintainer on 2026-11-01, #381):

  ```
  ## PR ready to merge

  - **PR**: sebvey/feyn#<pr>
  - **To read**: the PR's body and its "Delivery notes"
  - **Outside the PR**: <what you did on it after the run, or an anomaly of the run or its clean-up; or "nothing">
  - **After the merge**: <clean-up (/feyn-deliver-story-alone step 6), then the next topic if one is set>
  ```

  The PR is named only by its bare reference `sebvey/feyn#<pr>`, never in the heading nor as a
  Markdown link: the app renders that reference once, with the PR's state. "Outside the PR" is
  what the PR does not hold: a line you added to Checks, a body or "Delivery notes" edited after
  the run ([sort.md](sort.md)), an anomaly of the run or of its clean-up. A finding outside the
  PR that calls for follow-up work (an outdated section the PR did not make false, an issue to
  open) is not prose in the notification: it goes to the maintainer as a decision, in the form
  `CLAUDE.md`, "Working with the maintainer", gives; one the PR made false is corrected in it.
- **A direct delivery or the direct path**: the PR URL, the title, what the maintainer should
  look at first (the PR's Review first, in one line), and the merge command:
  `mise exec -- gh pr merge <pr> --squash --delete-branch`. The repository squashes with the PR
  title and body and allows squash only (GitHub, observed 2026-10-28, #135), so the PR title,
  followed by ` (#<pr>)`, becomes the subject on `main`: the command names no subject.
- **An epic PR**: a progress message (`/feyn-deliver-epic`, "Progress"): the link to the epic PR,
  what the maintainer has to do (the PR page, "Squash and merge"), what is left outside the epic.

The merge is the maintainer's. Stop there.

## A draft whose decision is awaited

The issue stays In progress, with its label; steps 2 and 3 do not run, and the notification
names the question instead of the merge command. The maintainer answers with a comment and
removes `blocked:maintainer` from the issue: one removal. Never remove the label yourself; if it
is still on the issue, the answer is not given: stop.
- On the direct path: apply the answer (the second-review rule of [sort.md](sort.md),
  "Corrections on the direct path", applies), remove the awaiting section from the body, then
  hand over again from step 1, as a direct path.
- After a run (`/feyn-deliver-story-alone`): the PR stays a draft, the orchestrator reruns its
  workflow with the answer (its step 4), then hands over as a story without an epic.
