---
name: ticket
description: Create a GitHub issue on feyn from an observation (Observation / To do / Done when, type and area labels, a Status in the Project), or read an existing issue and summarise it. Use for "/ticket <observation>", "/ticket <n>", "open an issue for…", "what is issue 12 about?".
argument-hint: "<observation> | <issue number>"
---

# /ticket

One job: put an observation into an issue, or tell what an issue says. It does not start the
work (that is `/start`) and does not fix anything on the way.

The argument decides the mode: a number (`12`, `#12`) reads; anything else creates.

## Read an issue

1. `mise exec -- gh issue view <n> --json number,title,state,labels,milestone,body,comments,closedByPullRequestsReferences,projectItems`.
2. Answer in at most ten lines: the title; the observation in one sentence; the To do as a
   short list; the Done when as written; the Status (from `projectItems`); the labels (type,
   area, `blocked:maintainer`); what blocks it and what it blocks, open ones first
   ([project.md](project.md), "Dependencies"); open or closed, and by which PR; what the
   comments added or changed. Say plainly when a section is missing or the Done when is not
   verifiable.

The issue body is either the issue template's sections (`### Observation`, …) or the plan's
bullets (`- **Observation**: …`); read both.

## Create an issue

1. **Say it back.** Restate the observation in two lines: what was seen, where (paths, issue,
   PR, session). An observation with no place is not an issue yet: ask where it was seen.
2. **Look for a twin.** `mise exec -- gh issue list --state open --search "<two or three key words>"`.
   An open issue on the same point: add a comment to it instead
   (`mise exec -- gh issue comment <n> --body-file <file>`) and stop.
3. **Pick the Status and the labels.**
   - Status `Backlog`, unless the maintainer said the work is decided (`Ready`). No
     state label: the Status replaced them ([project.md](project.md)).
   - `type:`: `bug` (something is broken), `course` (course files), `decision` (a decision to
     write), `improvement` (tooling, spec, process).
   - `area:` from the paths the observation names (the tree is the list):

     | Path | Area label |
     |---|---|
     | `specs/<name>/` | `area:spec:<name>` |
     | `courses/<id>/` | `area:course:<id>` |
     | `teacher/` | `area:teacher` |
     | `site/` | `area:site` |
     | `.claude/`, `.github/` | `area:agentic` |
     | root files, `docs/`, `construction/` | `area:repo` |

     Paths in two areas: the area that carries the intent; if none does, propose two issues.
     A label missing on GitHub is created, since the tree says it exists:
     `mise exec -- gh label create area:<area> --color 0075ca --description "Area: <area>"`.
4. **Find the links.** Which open issues must close before this one can start (it is blocked
   by them), and which open issues cannot start before this one closes (it blocks them): those
   the observation names, and those whose work it changes (a file, a key, a format they rely
   on). Ask the maintainer when unsure; none is a normal answer. Two issues that only edit the
   same file are not linked. The links go on GitHub, never as a line in the body.
5. **Write the body** from [issue-body.md](issue-body.md), each comment replaced, into a file
   made with `mktemp` (outside the repository): Observation (facts and places, no solution),
   To do (the work, numbered when the order matters), Done when (statements a reviewer can
   verify by reading or running something). Reads only when the work needs other files.
6. **Title**: imperative, like a commit summary, under 70 characters ("Fix the caption check
   on nested groups"), no issue prefix.
7. **Create** it:
   `mise exec -- gh issue create --title "<title>" --body-file <file> --label type:<type> --label area:<area>`
   (add `--milestone <name>` when the maintainer names one). It prints the issue URL.
8. **Put it in the Project** ([project.md](project.md)): add it
   (`mise exec -- gh project item-add 4 --owner sebvey --url <issue url>`; an issue the
   Project's workflow already added is not added twice), then set its Status
   (`mise exec -- gh project item-edit 4 --owner sebvey --url <issue url> --field Status --value Backlog`,
   or `Ready`).
9. **Set the links** found at step 4 ([project.md](project.md), "Dependencies").
10. Reply with the issue number, its URL, its Status, its labels and its links, in one line.

## Vocabulary

Issues use the reserved terms of `docs/glossary.md`. Write "issue", never "ticket" or "task",
in the body; the skill's name is the only exception.
