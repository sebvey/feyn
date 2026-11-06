# Rules for a Done when

Read by whoever writes a Done when (`/feyn-issue` at a triage, a brainstorm, an option refinement, the orchestrator of an epic, the maintainer), by the moments that use one (the commitment of a work item, [commitment.md](commitment.md); the start of a story, `/feyn-issue-branch`; the take of an epic, `/feyn-deliver-epic`), by the contributor and by the reviewers (`feyn-pr-reviewer`, `feyn-brainstorm-reviewer`). The Done when of an epic follows them as a story's does. Why: decision `done-when-run-at-writing`.

## A statement

- A reviewer verifies it by reading a file or running a command, one statement per bullet.
- Its command runs on the base: `origin/main`, or the epic's integration branch for a story of an epic.
- Running it on the base: `git grep <pattern> <base>` or `git show <base>:<path>` when that is enough; otherwise a detached worktree at the base (`git worktree add --detach <dir> <base>`), removed after as [run-cleanup.md](run-cleanup.md) says, with the dependencies the command needs (`node_modules` linked from the main checkout when the lockfile is unchanged). At the start, the branch just created holds the base: the commands run in it.
- A statement that compares the base and the head (a render before and after, a diff against the base): its baseline is the base side, written as such (`Baseline on <short sha>, base side: …`).
- A work item touching the agentic layer (`.claude/`, `CLAUDE.md`) follows the agentic rules of [agentic-rules.yaml](agentic-rules.yaml), its Done when included.

## The baseline, at writing

- The author runs each command of the Done when on the base and writes its output, the baseline, on the line under the statement: `Baseline on <short sha>:`, then the output pasted as the command prints it. The trace makes the check visible: a check done and a check skipped no longer look the same.
- An output too long is abridged by the command itself, written in the statement's command (a `| cut -d: -f1,2`, a `| wc -l`), never by a transcription: on epic #570, two baselines transcribed by hand from a cut output each missed a line (#582, `deliver-story.js:158`; #586, `deliver-story.js:77`), and the start of #582 went on past it.
- The author checks each line of it against the statement's intent: a line the work must change is one the statement targets; a line it must leave is a command too broad (on #554, `grep -i 'ADR'` matched « adresse »), corrected before the issue is posed.
- The author looks for what the command cannot see: a count right for the lines it matches can miss content in another shape (on #552, a count of 120 missed a table of 8 rules), and two statements can contradict each other.
- A statement with no command (a file to read, a replay) has no baseline.

## A search excludes the history

A statement that searches the repository (an `rg` or a `grep` that must print nothing, or only some lines) excludes the history: released CHANGELOG entries, dated amendments and superseded decisions, by path or named as exceptions. Otherwise the contributor rewrites the history to meet it, as #339's `rg` made its contributor split a string and rewrite an amendment.

## The files that cite content removed, moved or renamed

A work item that removes, moves or renames content (a file, a section, a rule) lists every file that refers to it (a story in its Context, an epic in its Material), and a To do item, or the story that removes it, treats each of them. They are found by searching the name of the file touched, not the section's name (`grep -rn '<file name>' .claude docs`), since a citation names the content as often as the heading, and every other name it is cited by (a skill's `/feyn-<name>`, not its `SKILL.md`); live decisions included, since a live decision is corrected in place when a mechanism it names changes (decision `decision-format`), superseded ones excluded (`status: superseded` in their frontmatter). #430's Context, built from the section's name, found one file of the four that cited it.

## A Done when with no baseline

A Done when written before these rules, or without them, gets its baselines at the first moment that uses it: the commitment of an option, the start of a Ready story, the take of an epic. Not before: baselines written on every open item at once would be stale by their start.

## The start reruns them

At the start (`/feyn-issue-branch`), each command is rerun on the base and its output compared with its baseline. The same lines are no change: a line number moved by an edit elsewhere in the file is tolerated, since a strict compare would stop every start whose file was touched above the matched line. An output that changed stops the start: the base moved under the statement, and its author (the orchestrator for a story of an epic, otherwise the maintainer) rewrites the statement and its baseline before the work begins. A line the baseline lacks is a changed output, even one the statement targets and the base did not move for: the start stops, and its author amends the baseline, since the start cannot tell a line left out of the baseline from a line the base gained.

A start that stops, on an output changed or on a baseline it writes that shows a statement wrong, posts nothing on the issue. Its stop message (under the agent workflow, the question of its `blocked` result) reports each statement, its baseline (or the one it would write) and its output now. The author then amends the statement and its baseline in one dated amendment.

## The intent prevails over the command

- The contributor never changes content to satisfy a command. A line the command catches that the statement's intent does not target is left as it is, and reported as a deviation "wrong command", with the corrected command.
- The reviewer checks that each line changed for a statement was in its baseline and serves its intent; rerunning a wrong command confirms it, so the output is held to the intent, never read as the verdict.
- A wrong command, or any instruction deviation found in delivery, corrects the issue's Done when, in an epic as for a story without one: its orchestrator sorts it ([sort.md](sort.md), "The four cases", case 1).

## A dated amendment

A baseline added to a committed Done when, and a statement corrected after an instruction deviation, are dated amendments of the issue: its body edited (`mise exec -- gh issue edit <n> --body-file <file>`), the line added or changed ending with `(amended <YYYY-MM-DD>: <why>)`, and the open PR's body amended with it. The issue stays the one contract (decision `issue-defines-pr-verifies`).
