---
name: feyn-brainstorm
description: "Run a brainstorm with the maintainer on how feyn works (the flow, the skills, the organisation of the work) and end it in options: the work items it defined, an epic or a story by size, created in Status Option with the body of their kind, what was settled in the epic's Material or the story's Context; a brainstorm that opens from an idea closes it as completed, being its triage. Use for \"on brainstorme sur les skills\", \"brainstormons sur le flow\", \"let's brainstorm the skills\", \"brainstorm idea 12\", \"wrap up this discussion\", \"on conclut le brainstorm\", \"/feyn-brainstorm\"."
argument-hint: "[topic | idea number | option number]"
---

# /feyn-brainstorm

One job: frame a brainstorm with the maintainer and end it in **options**, the work items it
defined, each an issue in Status Option with the body of its kind (decision
`brainstorm-ends-in-options`). What was settled lives in those work items: what is not in
them is lost. The maintainer commits an option (sets it Ready) at a triage, never during the
brainstorm (decision `idea-and-option-before-ready`). Besides the options, a brainstorm may
create the idea it opens from (step 1) or leave one (step 4); it creates nothing else (no
decision, no edit of the repository).

## 1. What it opens from

The argument is one of three things:
- **an idea** (an issue in Status Idea): read it first (`/feyn-issue <n>`); its finding is the
  question. The brainstorm is that idea's triage: it ends by closing it (step 4);
- **an option to rework** (a story or an epic in Status Option): read it first
  (`/feyn-issue <n>`); its body is the starting point, and the brainstorm refines it, or splits
  it, as `/feyn-triage` does an option (step 4);
- **a topic**, in a few words.

A brainstorm on the process (a skill, a workflow, a policy, the glossary, `contributing.md`)
opens from an idea that names the problem observed and where it was seen: a delivery, a
debrief, a triage, a teaching session (decision `process-change-from-an-observed-problem`;
[contributing](../../../docs/contributing.md), "How the work is organised", Policies). Given a
topic on the process with no such idea, a bare wish of design, say so in one line and ask the
maintainer which problem was observed, and where. Named: create the idea first
(`/feyn-issue idea <finding>`) and open from it. None: no brainstorm on the process; the wish
waits for an observed problem.

## 2. The rules of the brainstorm

- **The maintainer decides.** The agent proposes, weighs, objects; a point is settled only
  when the maintainer says so.
- **One point at a time**: the next point opens when the current one is settled or left open.
- **A point is one decision**, never a bundle: two decisions, two turns. Before asking
  "validated?", count what the maintainer is asked to validate; more than one decision, split.
- **A point names at most three objects** (files, issues, skills) and never refers to "point N
  above" nor to the numbering inside another issue: what it needs, it names again.
- **Nothing written in the repository** during the brainstorm: no commit, no branch, no edit of a
  tracked file, no issue. Reading is free.
- **What is settled is restated** in one sentence per decision, with its why and the alternative
  rejected, before it goes into the working file; the maintainer confirms or corrects. The
  detail (lists, verdicts per item, counts) goes into the working file, which the maintainer
  opens if they want: on 2026-10-30 (#259) one "validated?" asked on about twenty elements and
  three nested decisions could not be digested; split in three turns, it could.

## 3. The working file

`tmp/feyn-brainstorm-<date>-<topic>.md` (date `YYYY-MM-DD`, topic two or three words), at the
repository root; `tmp/` is in `.gitignore`. It opens with what the brainstorm opens from (the
idea or the option, by number, or the topic) and its question, then fills as points settle:
the points settled, numbered, each its content, then "Why: …" and "Rejected: <the
alternative weighed>, because …" (the form of an epic's Material,
[epic-body.md](../../reference/epic-body.md)); the open questions as they appear. It is
disposable once the options exist.

## 4. End the brainstorm

1. **Nothing settled**: a brainstorm that settled nothing creates nothing. Delete the working
   file, say so, and stop; the idea or the option it opened from stays as it is.
2. **A finding, its form not decided**: a brainstorm that surfaces a finding without deciding
   what work it calls for may leave an idea (`/feyn-issue idea <finding>`), and creates no
   option for it.
3. **Draft the options** in the working file, one per work item the brainstorm defined, by
   size: a **story** when the work is delivered in one PR (decision
   `story-with-or-without-an-epic`), an **epic** when it takes more, never cut into stories
   here (an epic is cut when taken, decision `themes-and-release-milestones`). A story goes
   under an open epic only when it is the next one that epic's plan comment names, as at a
   triage (`/feyn-triage`, step 4). Work of an open epic that is not its next story is no
   option: its settled points go into that epic's Material when the epic is still an option
   (refined in place, step 4), otherwise into an idea naming that epic (`/feyn-issue idea
   <finding>`; [contributing](../../../docs/contributing.md), Policies). Each is written from
   the template of its kind, every comment replaced, with its `type:` label:
   - a story, from [story-body.md](../../reference/story-body.md): the points it settled go in
     its Context, each with its why and the alternative rejected; the Context's last line is
     the origin: "From idea #<n>." when the brainstorm opened from an idea, "Story of epic
     #<n>." for a story under an epic, otherwise "From a brainstorm with the maintainer,
     <date>.";
   - an epic, from [epic-body.md](../../reference/epic-body.md): the points it settled go in
     its Material, numbered, each with its why and the alternative rejected, so that the epic
     reads alone; its Material names where they come from: "idea #<n>", or "a brainstorm with
     the maintainer, <date>".

   Show the drafts to the maintainer, who validates them as written or corrects them.
4. **Create them** with `/feyn-issue`, one call per option: `/feyn-issue story <what>`,
   `/feyn-issue story #<epic> <what>` or `/feyn-issue epic <objective>`, each in Status Option,
   always, with the validated draft as the body: nothing is rewritten between the file and the
   issue. The idea the brainstorm opened from is not a twin of the options created from it
   (`/feyn-issue` step 2). An option reworked is refined in place (its body, its kind label and
   title when its kind changes, the line `Refined <YYYY-MM-DD> (brainstorm)` at the end) or
   split, its parts created and it closed naming them, as `/feyn-triage` step 4 says for an
   option.
5. **Close the idea** it opened from, if any, as completed, naming the options created: it was
   that idea's triage (decision `brainstorm-ends-in-options`):
   `mise exec -- gh issue close <n> --reason completed --comment "Brainstormed <YYYY-MM-DD>: <the options created from it, each #<m>>."`.
   An idea from which the brainstorm created no option stays open, in Idea.
6. Delete the working file.

## 5. Reply

One line: each option created, its number, URL, kind and title; the option refined or split,
the idea closed in favour of them, if any; the idea left, if any; the count of points settled
and of open questions. What the maintainer does next: a triage commits the options, or
refines or closes them (`/feyn-triage`; [contributing](../../../docs/contributing.md), "How
the work is organised", moment 4, Triage).
