---
name: feyn-refine-option
description: "Run with the maintainer the option refinement of feyn (a moment of the work cycle of its own): one named option, an epic or a story in Status Option, analysed against the purpose of feyn (which product consumes it) and the repository (a staleness check and an overlap check, each run as a command, their results presented with their proof), then decided on its own: commit (set Ready), rework, merge, split, fold into an epic, close; the decision is executed. An idea is not treated here: it goes to `/feyn-triage`. It never reviews the Option column as a whole. With no number, it asks which option. Use for \"raffine l'option 435\", \"refine option 435\", \"/feyn-refine-option 435\"."
argument-hint: "<option number>"
---

# /feyn-refine-option <n>

One job: the **option refinement** of one option the maintainer names, as
[contributing](../../../docs/contributing.md), "How the work is organised", says: the work
session analyses it against the purpose of feyn (which product consumes it,
[vision.md](../../../docs/vision.md)) and the repository, presents it with the result of its
checks, the maintainer decides, the work session executes. It is not a replenishment: it never
reviews the Option column as a whole nor chooses among the options which enter Ready; feyn
commits its options one by one ([kanban](../../../docs/kanban.md), "The upstream"). The
Project's commands are in [project.md](../../reference/project.md), cited here, not copied; the
commands of the checks are written in step 2. Nothing is executed on the option before the
maintainer's decision on it.

An **option** (Status Option) is a work item, epic or story, defined and not committed: the
option refinement commits it, reworks it, merges it, splits it, folds it into an epic or closes
it (decision `idea-and-option-before-ready`). An **idea** (Status Idea) is not an option: it is
triaged (`/feyn-triage`), never refined here.

**The markers**: fixed lines, the last line of an option's body, each written by the act it
records and read as a marker, never as content to refine or a defect to correct; its body was
rewritten in place on that date, from which what changed in the repository is read:
- `Reworked <YYYY-MM-DD> (refinement)`, written by the action rework (step 4);
- `Refined <YYYY-MM-DD> (brainstorm)`, written by `/feyn-brainstorm`;
- `Refined <YYYY-MM-DD> (triage)`, on an option reworked before the option refinement had its
  own skill (#444): read as a marker, never edited into the new form; a rework replaces it with
  its own line, as it does any earlier marker.

## 1. The option named

The argument is one issue number. With no number, ask which option to refine and do nothing
until the answer: never list the Option column to pick one. With several numbers, refine the
first, and name the others at the end of the reply, each for its own `/feyn-refine-option`.

Read it: `mise exec -- gh issue view <n> --json number,title,url,state,labels,body,comments,updatedAt,projectItems`
(its Status: [project.md](../../reference/project.md), "Commands", Read). Then:
- Status Idea, an issue of the old format included: not refined; say so in one line and name
  `/feyn-triage <n>`, which treats it;
- closed, or any Status other than Option and Idea: not refined; say so in one line, with its
  Status.

An option named is refined whatever it holds: sound or stale, it goes through steps 2 to 4.

## 2. The checks, before it is presented

**Purpose**, first, before the staleness check: read
[vision.md](../../../docs/vision.md) and answer two questions from the option's body, each
with the line it rests on: which product consumes the option (the teacher, the site, or
neither: then which of them it serves, through what), and how it serves the purpose, measured
by the yardstick (for a change of `linear-course`: does `courses/po-essai/` follow it in the
same PR, and does the teacher teach it). An option that names no product it serves says so;
it is not refused here, the answer goes to the maintainer with the rest (step 3).

Each command run, not assumed; the option itself comes up in these lookups: it is not its own
neighbour.

**Staleness**: what changed on `origin/main` since the option's `updatedAt`, in the files its
body names.
1. `git fetch`.
2. The paths its body names:
   `mise exec -- gh issue view <n> --json body --jq .body | grep -oE '[A-Za-z0-9_.-]+(/[A-Za-z0-9_.-]+)+/?|[A-Za-z0-9_-]+\.(md|js|mjs|json|ya?ml|ts|astro)' | grep -v '^github\.com/' | sort -u`.
3. Which of them `origin/main` still holds:
   `git ls-tree -r --name-only origin/main -- <path> …`; a bare file name (no folder) is
   first looked up as a root path (`git ls-tree --name-only origin/main -- <name>`), then, not
   found there, anywhere, check fixtures left out:
   `git ls-tree -r --name-only origin/main | grep -E '(^|/)<name>$' | grep -v '/fixtures/'`. A path it no
   longer holds was moved or removed: `git log origin/main --format='%h %ad %s' --date=short -1 -- <path>`
   names the commit.
4. The commits since its `updatedAt` on those paths:
   `git log origin/main --since=<updatedAt> --format='%h %ad %s' --date=short -- <path> …`;
   then, for each commit listed, what it changed in them
   (`git show <hash> --stat -- <path> …`, `git show <hash> -- <path>` where the stat is not
   enough).
5. The issues its body cites (`#<m>`): `mise exec -- gh issue view <m> --json number,title,state`.

**Overlap**: the open options, epics and committed stories that cover or overlap it, and the
open ideas on the same files.
1. A **twin**, an open issue on the same point:
   `mise exec -- gh issue list --state open --search "<two or three key words of its title>" --json number,title --jq '.[] | [.number, .title] | @tsv'`.
2. The open **options, epics and committed stories**, with their Status and labels:
   `mise exec -- gh project item-list 4 --owner sebvey --limit 200 --format json -q '.items[] | select(.status != "Done" and .status != "Idea") | [.content.number, .status, (.labels // [] | join(",")), .content.title] | @tsv'`,
   then the body of each whose title or area meets the option's
   (`mise exec -- gh issue view <m>`).
3. An **open idea on the same files**: for each path of the staleness check,
   `mise exec -- gh issue list --state open --search "<path> in:body" --json number,title --jq '.[] | [.number, .title] | @tsv'`.

## 3. Present it

One message, under its own level-2 heading:
- its frame in one line: epic or story, what it is for, where it belongs;
- **Purpose**: the product that consumes it and how it serves the purpose, each with its line,
  or "Names no product it serves";
- **Staleness**: the paths read; the commits since its `updatedAt` on them, each `<hash> <date>
  <subject>` with what it changed for the option, or "No commit on <paths> since <date>"; the
  paths `origin/main` no longer holds, with the commit; the issues cited closed since;
- **Overlap**: each neighbour `#<m> <title>` with its Status and what it shares with the option
  (twin, covers it, overlaps it, same files), or "No neighbour" when the three lookups find
  none;
- what it still calls for, and what no longer holds, each with its proof (a commit, a file and
  line, an issue, each named);
- the choices in a table (choice, what it does, consequence), from the actions of step 4, in
  this order where they apply: close (done, moot, or a duplicate of a twin), fold into an epic,
  merge (into another option), split, rework, commit;
- one recommendation, with its reason.

The question the skill asks the maintainer, before it acts on the answer: commit, rework (what
changes), merge (into which option), split (into which work items), fold (into which epic), or
close (completed or not planned, and why).

An option the maintainer leaves open stays Option, and the reply says so. An option that waits
on an action of the maintainer (a label, a merge, an answer elsewhere): say what it waits on.

A requirement added to an epic's Done when, by a fold or otherwise, is the maintainer's decision:
propose it as a choice, never write it on the strength of another decision. An epic or a story
whose body names `courses/po-essai/` and whose Done when does not state that it records its
judgement calls in the Material of the migration epic #487: propose that line as a requirement
added to its Done when, the maintainer's decision too
([contributing](../../../docs/contributing.md), "Policies").

## 4. Execute the decision

As the maintainer decided. Which form an issue is in is read as `/feyn-issue` reads it
([its skill](../feyn-issue/SKILL.md), "Read an issue").

- **commit**: set its Status to Ready ([project.md](../../reference/project.md), "Commands",
  Set), on the maintainer's word only, once its Done when is verifiable and no open blocked-by
  link remains ([project.md](../../reference/project.md), "Dependencies", Read; an epic: its
  five sections written, [contributing](../../../docs/contributing.md), "How the work is
  organised"); an epic or a story whose body names `courses/po-essai/`, also once its Done when
  states that the Material of the migration epic #487 holds its judgement calls (the line
  proposed at step 3 when it was missing, written only on the maintainer's word, never on the
  skill's own authority);
- **rework**: its body rewritten (`mise exec -- gh issue edit <n> --body-file <file>`, from the
  template of its kind), or its kind changed, a story rewritten as an epic or the reverse, in
  the template of its new kind, its kind label with it
  (`mise exec -- gh issue edit <n> --remove-label <old kind> --add-label <new kind>`), and its
  title ("Epic: …" for an epic); a story becoming an epic is detached from its epic, if it had
  one ([project.md](../../reference/project.md), "Epics", Detach). The body ends with the line
  `Reworked <YYYY-MM-DD> (refinement)`, in place of any earlier marker. It stays Option;
- **merge**: the option it goes into gets what it lacked (rework, above), then close it as
  completed with a comment naming that option;
- **split**: one option per work item it holds (`/feyn-issue`, Option unless the maintainer
  says a part is committed), each citing it, then close it as completed with a comment naming
  them; a story created this way ends its Context with the origin line of the option it splits
  ("From idea #<n>.", "Story of epic #<n>.", "From a brainstorm with the maintainer, <date>."
  or "Asked by the maintainer, <date>."), never a new form. A story under an epic is created
  only when it is the next one the epic's plan comment names (the policies of
  [contributing](../../../docs/contributing.md)); otherwise that part is folded into the epic
  (below). The option split is not a twin of its parts: when `/feyn-issue`'s step 2, "Look for
  a twin", finds it, it goes on to create them;
- **fold into an epic**: close it as completed with a comment naming the epic that covers it;
  what it adds goes into the epic's Material when the epic is still an option, as decided (a
  requirement added to its Done when: step 3);
- **close**: done, moot or a duplicate, as not planned with the reason, or as completed when
  work already delivered settled it:
  `mise exec -- gh issue close <n> --reason <completed|"not planned"> --comment "<the reason, with the links: commit, PR, issue>"`.

A duplicate comment (posted twice by mistake) is hidden as duplicate, never deleted: on its
page, the comment's menu ⋯, "Hide", reason "Duplicate"; or `mise exec -- gh api graphql -f
query='mutation { minimizeComment(input: {subjectId: "<comment node id>", classifier:
DUPLICATE}) { clientMutationId } }'`, the node id read with `mise exec -- gh api
repos/sebvey/feyn/issues/<n>/comments --jq '.[] | [.node_id, .body[:60]] | @tsv'`.

## 5. End it

The reply that reports the decision executed ends the option refinement: what was committed,
reworked, closed or created, each with its link; the other numbers named, if any (step 1).
