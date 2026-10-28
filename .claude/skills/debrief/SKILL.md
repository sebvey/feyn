---
name: debrief
description: Distil a reflection session with the maintainer on feyn (how the project works, the flow, the tooling) into decisions (/decide), issues (/ticket), a docs/contributing.md diff and a session note, then list what was written and what was refused. Use for "/debrief", "distil this session", "wrap up this discussion".
argument-hint: "[topic]"
---

# /debrief

One job: at the end of a reflection session with the maintainer (a work session about how
feyn works, not a teaching session), turn the conversation into the four outputs below. They are
the only memory of the reflection session: what is not in them is lost. The maintainer rereads
`docs/contributing.md` cold afterwards, without the conversation.

## 1. The branch

`git status --short --branch` (its first line). On `<type>/<n>-<slug>` (made by
`/start`): every commit goes there. On `main`, or on a branch without an issue number: ask the maintainer which
branch, and create it as `/start` does; never commit on `main`. `<n>` is the issue that
started the reflection session.

## 2. List what the reflection session settled

Reread the conversation and list, one line each: the **choices** made (what is decided), the
**work** left (something to build or fix), the **open questions** (asked, not answered), and
the **questions answered** (asked and settled). Show the list to the maintainer before writing;
they may drop or rephrase a line.

## 3. Decisions

For each choice: does it have a counterfactual ("Without this, an agent would…", a concrete
wrong act) and does it span several files or cost much to undo? Then load `/decide` and
follow it, with the counterfactual the conversation gave. `/decide` refuses a choice without a
counterfactual or under the entry bar: report the refusal and its reason, do not argue it. A
refused choice that applies to one place becomes a paragraph of step 5 or nothing.

## 4. Issues

For each piece of work and each open question: load `/ticket` and follow it, one issue per
independent piece (two pieces that can be delivered apart are two issues). Its twin search
applies: a twin open issue gets a comment instead. The Observation names the reflection session (date,
issue `<n>`). A question waiting for the maintainer gets `blocked:maintainer`.

## 5. docs/contributing.md

Edit the paragraphs whose practice the reflection session changed, in place: keep the reader of
`docs/contributing.md` (someone who has never opened the repository), and keep each paragraph's
"Why: decision `<slug>`." ending, adding the slugs written at step 3. A new paragraph only for
a new step of the flow. Nothing changed: say so, write nothing.

## 6. Tool behaviours

A behaviour of GitHub or Claude Code found in the reflection session (a refusal, a side effect, something
the tool did not do) goes to its point of use, the skill step or document that depends on it,
in one line with its mark `(<tool>, <status> <date>, #<n>)` ([docs/contributing.md](../../../docs/contributing.md),
"Tool behaviours"). When no skill or document makes that move, comment on issue #115
(`mise exec -- gh issue comment 115 --body-file <file>`), with the same mark. A line the reflection session
disproves is corrected or removed. Nothing found: write nothing.

## 7. The session note

`construction/notes/<date>-<topic>.md` (date `YYYY-MM-DD`, topic two or three words, from the
argument or the reflection session). Ten lines, or a small table, as in
`construction/notes/2026-10-27-flow.md`:
- a title line `# Session note, <date>: <topic>`, then two lines: what the reflection session was, and
  that it is reread through `docs/contributing.md` and `docs/decisions/`;
- one row per question asked: the question, the answer in one line, where it went (decision
  `<slug>`, issue `#<n>`, contributing.md section, or "nowhere");
- a last line for issues opened or commented outside the table.

The note dies with `construction/` at stage 4. After that, it becomes a comment on the issue
that started the reflection session (`mise exec -- gh issue comment <n> --body-file <file>`), or nothing
when no issue started it.

## 8. Commit

`git add docs/contributing.md construction/notes/<file>` and the files edited at
step 6 (the decisions are
already committed by `/decide`), then `git commit -m "debrief <topic>"`. Never
on `main`, never a merge, never a push: the PR is `/finish`'s.

## 9. Reply

For the maintainer to reread, one line each:
- **Written**: each decision (path), each issue (number, title), the issues commented, the
  contributing.md sections edited, the tool-behaviour marks moved to their point of use (file,
  line) or commented on #115, the note (path), the commits;
- **Refused**: each choice `/decide` refused and why, each line of step 2 that went nowhere
  and why;
- what the maintainer still has to do (read `docs/contributing.md` cold, `/finish`).
