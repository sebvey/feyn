# The sort

What a delivery reports (a deviation, a structural choice made without the maintainer, a finding) is sorted at once, before anything reaches the maintainer, and the work goes on; it is never left as a line of Review first unless the path below says so. Its caller passes the path, and keeps what it does before (its run, its review) and after (its rerun, its hand-over). The corrections of a review on the direct path are sorted here too ("Corrections on the direct path").

## The parameters

- **The path**:
  - **an epic** (`/feyn-deliver-epic`): what a story's run or the review of the whole branch reports; the brief is the orchestrator's (a story's Done when, the epic's Objective, Material and plan comment); what nothing settles becomes an open question on the epic ("An open question");
  - **a story without an epic** (`/feyn-deliver-story-alone`): what its run reports (`deviations`, and the `choicesMade` that add structure: a new file, a category, a marker, an exception to a principle); the issue stands for the epic (its Done when and Context for the epic's Objective and Material, the workflow's `work` for the orchestrator's brief, no plan); what nothing settles is named in the PR's Review first;
  - **the direct path** (the work session that opened the PR with `/feyn-pull-request` and had it reviewed with `/feyn-pr-review`): the review's findings, which that work session corrects itself ("Corrections on the direct path").
- **The rerun**: how the caller changes a PR after a run (`/feyn-deliver-epic` step 2.4, `/feyn-deliver-story-alone` step 4).

## The four cases

1. A contradiction in the brief: a story's Done when against itself, or against the epic's Objective or Material (the issue's Context for a story without an epic); a wrong command among them (a deviation "wrong command": a line its command catches that its statement's intent does not target, [done-when.md](done-when.md)). Fix the brief, the Done when by a dated amendment ([done-when.md](done-when.md)), and what the run built on it (a rerun), and inform the maintainer. A story without an epic: a contradiction in `work` is fixed by a rerun, with no dated amendment, and the maintainer informed.
2. One already settled by a decision, the epic's Material, a rule (`CLAUDE.md`, a skill, a spec) or an answer the maintainer gave: apply it (by a rerun when the PR must change), and inform the maintainer.
3. One a story of the plan makes moot (an epic): a line in the plan, under that story.
4. The rest, when it is costly to undo or foundational (vocabulary, the structure of a file of reference, the teacher's behaviour):
   - an epic: an open question ("An open question");
   - a story without an epic: named in the PR's Review first (one bullet can name several), its options ruled out and its cost of going back in "Delivery notes"; the maintainer decides it by the merge, and the hand-over does not wait for an answer. One missing from them is added by a rerun or by the orchestrator's own edit of the body (`mise exec -- gh pr edit <pr> --body-file <file>`, within the limits of `/feyn-pull-request` step 5) and of "Delivery notes" (in place, `/feyn-pull-request` step 6); the hand-over message names that edit.

   A choice that is neither stays in its PR's "Delivery notes".

"Inform" is a line in the plan comment's log (an epic, [project.md](project.md), "Epics", "The plan comment") and in the PR's "Delivery notes" (in place, `/feyn-pull-request` step 6), not a question: the progress message gives only their count ([messages.md](messages.md), "Progress message").

## An open question

Of an epic only.

- **One that reports a defect** carries, with it: the correction; the cause (the instruction, skill step, brief or missing check that produced it or let it pass); the corrective action at that cause, or why it is not worth one (an isolated slip); and how the next occurrence will show that it held.
- **The trace** is on GitHub, at once: the line `Open question: <the choice>, <the options ruled out>, <the cost of going back> (#<story>)` in the log of the plan comment ([project.md](project.md), "Epics", "The plan comment"), and a comment on the epic, numbered, with its recommendation, ending "Answer here or in the work session; the plan comment records the answer.", each write's output read ([project.md](project.md), "GitHub writes").
- **The decision** is the message to the maintainer in the work session (GitHub notifies nobody of the maintainer's own comment, which the orchestrator posts): a question of [messages.md](messages.md), in a message of its own, one question at a time, with the link to the comment on the epic; the next one once it is answered. While it is open, every message to the maintainer ends with the awaiting footer ([messages.md](messages.md)), its line for that question.
- **The answer**, on the epic or in the work session, is recorded at once: the line `Answered: <the answer> (the maintainer, <where>, <date>)`, `<where>` being `on the epic` or `in the work session`, right under its `Open question:` line; then the answer is applied, by a story (posed next) when it needs work.
- **The count**: the log's lines starting with `Open question:` that no `Answered:` line follows. The epic PR is not handed over while one remains.

## Corrections on the direct path

The work session that did the work corrects its PR itself, since no other agent fixes on the direct path:
- remove the reviewer's worktree when `/feyn-pr-review` returns one, as [run-cleanup.md](run-cleanup.md) says (that worktree, its `HEAD` on the PR's head branch);
- apply the blocking findings, and the non-blocking ones worth fixing; commit, push, and update the body (`mise exec -- gh pr edit <pr> --body-file <file>`); the non-blocking findings left go in "Delivery notes" with their reason (`/feyn-pull-request` step 6), one in Review first only when it needs the maintainer's decision; a statement the PR makes false is never left, whatever its label (decision `pr-corrects-what-it-makes-false`);
- check each fix in the diff (`mise exec -- gh pr diff <pr>`);
- add to Checks the `Fresh-agent review:` line, in the form of `/feyn-pull-request` step 5.

**A second review**, `/feyn-pr-review <pr>` again, only when the correction goes beyond what the review asked: a change added on your own, or one that changes the meaning of a rule; the line then counts the blocking findings of all the reviews. A change the review prescribed, its text included, decision or check included: check it yourself in the diff against the review's words. The `Fresh-agent review:` line says when a decision or a check was touched without a second review (`/feyn-pull-request` step 5). The same holds for the maintainer's answer to a draft ([hand-over.md](hand-over.md), "A draft whose decision is awaited"). Under the agent workflow `deliver-story.js` and at the review of the whole branch of an epic, the same rule holds for the fixer (the project subagent `feyn-pr-fixer`), which corrects what its own review located: it checks each fix in the diff, and a correction beyond what it prescribed is left to its caller.
