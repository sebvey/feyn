---
name: ticket
description: Create a GitHub issue on feyn from an observation - a slice attached to its epic, an observation to triage, or an epic (type and area labels, a Status in the Project) - or read an existing issue and summarise it. Use for "/ticket <observation>", "/ticket <n>", "open an issue for…", "what is issue 12 about?".
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
   comments added or changed; its epic for a slice, its slices and plan comment for an epic
   ([project.md](project.md), "Epics"). Say plainly when a section is missing or the Done when
   is not verifiable.

The issue body is either the issue template's sections (`### Observation`, …) or the plan's
bullets (`- **Observation**: …`), or for an epic the five sections of
[epic-body.md](epic-body.md); read all three.

## Create an issue

1. **Say it back.** Restate the observation in two lines: what was seen, where (paths, issue,
   PR, work session). An observation with no place is not an issue yet: ask where it was seen.
2. **Look for a twin.** `mise exec -- gh issue list --state open --search "<two or three key words>"`.
   An open issue on the same point: add a comment to it instead
   (`mise exec -- gh issue comment <n> --body-file <file>`) and stop.
3. **Decide what it is** ([project.md](project.md), "Epics"), one of three:
   - a **slice**: the maintainer names its epic (Ready or In progress), or the observation
     serves the epic In progress. An epic with no plan comment is being taken: its first one
     or two slices are allowed, and the plan comment is written right after them. With a plan
     comment, a slice is created only if it is the next one it names; otherwise refuse, and
     say which slice is next, or that the epic's plan comment must be rewritten first;
   - an **epic**: the maintainer says so. Refuse it when its Done when cannot be written: no
     done-when, no epic; it is an observation;
   - an **observation**: anything else. No parent, Backlog, carrying its `area:` label,
     triaged later.

   Ask the maintainer when unsure which.
4. **Pick the Status, the labels and the links.**
   - Status `Backlog` (a Project workflow sets it), unless the maintainer said the work is
     decided (`Ready`, set at step 8): a slice is always Ready when posed (it is the next
     one), at take time or after a delivery; an observation stays Backlog; an epic is set
     Ready by the maintainer at triage. No state
     label: the Status replaced them ([project.md](project.md)).
   - `type:`: `bug` (something is broken), `course` (course files), `decision` (a decision to
     write), `improvement` (tooling, spec, process). An epic also carries `epic`.
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
   - The links: which open issues must close before this one can start (it is blocked by
     them), and which open issues cannot start before this one closes (it blocks them): those
     the observation names, and those whose work it changes (a file, a key, a format they rely
     on). Ask the maintainer when unsure; none is a normal answer. Two issues that only edit
     the same file are not linked. The links go on GitHub, never as a line in the body.
5. **Write the body** into a file made with `mktemp` (outside the repository), each comment of
   the template replaced. A slice or an observation, from [issue-body.md](issue-body.md):
   Observation (facts and places, no solution), To do (the work, numbered when the order
   matters), Done when (statements a reviewer can verify by reading or running something);
   Reads only when the work needs other files. An epic, from [epic-body.md](epic-body.md):
   Objective, Why now, Material, Done when, Out of scope; no To do, no slice posed in advance.
6. **Title**: imperative, like a commit summary, under 70 characters ("Fix the caption check
   on nested groups"), no issue prefix. An epic: "Epic: " and the objective in a few words.
7. **Create** it:
   `mise exec -- gh issue create --title "<title>" --body-file <file> --label type:<type> --label area:<area>`
   (add `--label epic` for an epic, `--milestone <name>` when the maintainer names one, on a
   slice or on an epic that targets a release). It prints the issue URL.
8. **Ready, when decided.** The Project workflows add the issue and set Backlog
   ([project.md](project.md)); nothing to do for a Backlog issue. When the maintainer said the
   work is decided, set its Status to Ready as [project.md](project.md), "Commands", says
   under "Set a Status on a new item".
9. **Attach a slice to its epic** and **set the links** found at step 4
   ([project.md](project.md), "Epics" and "Dependencies"). An observation and an epic have no
   parent.
10. Reply in one line with the issue number, its URL, what it is (slice, observation or epic),
    its epic for a slice, its Status, its labels and its links.

## Vocabulary

Issues use the reserved terms of `docs/glossary.md`. Write "issue", never "ticket" or "task",
in the body; the skill's name is the only exception.
