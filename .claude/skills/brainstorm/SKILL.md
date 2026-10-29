---
name: brainstorm
description: Run a brainstorm with the maintainer on how feyn works (the flow, the tooling, the organisation of the work) and end it in a proposal issue, the validated output the triage turns into work. Use for "/brainstorm", "let's brainstorm", "let's think about…", "wrap up this discussion".
argument-hint: "[topic | proposal number]"
---

# /brainstorm

One job: frame a brainstorm with the maintainer and end it in a **proposal**, an issue with the
label `proposal` whose body is the brainstorm's validated output. The proposal is the only
memory of the brainstorm: what is not in it is lost. The triage turns it into work later
([contributing](../../../docs/contributing.md), "How the work is organised"); the brainstorm
creates nothing else (no decision, no slice, no edit of the repository).

The argument is the topic, or the number of a proposal to rework: read it first
(`/issue <n>`); it is the input, and the new proposal cites it in its Material read.

## 1. The rules of the session

- **The maintainer decides.** The agent proposes, weighs, objects; a point is settled only
  when the maintainer says so.
- **One point at a time**: the next point opens when the current one is settled or left open.
- **Nothing written in the repository** during the session: no commit, no branch, no edit of a
  tracked file, no issue. Reading is free.
- **What is settled is restated** in one or two lines, with its why and the alternative
  rejected, before it goes into the working file; the maintainer confirms or corrects.

## 2. The working file

`tmp/brainstorm-<date>-<topic>.md` (date `YYYY-MM-DD`, topic two or three words), at the
repository root; `tmp/` is in `.gitignore`. It starts as a copy of
[proposal-body.md](proposal-body.md) and fills as points settle: Context and Question first,
then What we settled point by point, Open questions as they appear. It is disposable once the
issue exists.

## 3. End the session

1. Fill Proposed next and Material read, then show the whole file to the maintainer. Every
   comment of the template is replaced; the maintainer validates it as written or corrects it.
2. Load `/issue` and follow it with the kind `proposal` and the file as the body
   (`/issue proposal`). The body is pasted as validated: nothing is rewritten between the file
   and the issue.
3. A brainstorm that settled nothing still ends in a short proposal ("Proposed next: Nothing"
   and the reason), which the maintainer closes at once: it is the trace.
4. A reworked proposal (the argument was one): close it as completed with a comment naming the
   new one (`mise exec -- gh issue close <old> --reason completed --comment "Reworked into #<new>."`).
   It is never edited.
5. Delete the working file.

## 4. Reply

One line: the proposal's number, URL and title, the count of points settled and of open
questions, the proposal closed in favour of it if any. What the maintainer does next: triage
it (`docs/contributing.md`, "Triage the Backlog").
